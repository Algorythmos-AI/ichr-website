// Post-build guard: everything the server function loads with require() must be loadable
// without Node's require(esm) support — because Vercel's function loader does not have it.
//
// WHY: Vercel rejects require() of an ES module (ERR_REQUIRE_ESM) even on Node versions where
// plain `node` allows it, so a local build and every unit test pass while production answers
// HTTP 500. Upgrading to Astro 7 did exactly this to every article page: sanitize-html
// (CommonJS) stopped being bundled and require()d the ESM-only htmlparser2 12 at runtime. The
// fix is `vite.ssr.noExternal` in astro.config.mjs; this check keeps it fixed and catches the
// next dependency that goes ESM-only.
//
// HOW: copy each function to an isolated directory — as deployed to /var/task, with nothing
// above it to fall back on (inside the repo, Node would silently resolve a missing package from
// the project's own node_modules). Then load, with --no-experimental-require-module (the Vercel
// constraint): every package traced into the function, failing on ERR_REQUIRE_ESM; and every
// bare require() the bundle itself still makes, failing on ERR_REQUIRE_ESM *or* a missing
// module — Vercel's tracer does not follow a bundler's runtime `__require`, so a package reached
// only that way is never deployed.
//
//   npm run build && node scripts/ci/check-server-bundle.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { builtinModules } from 'node:module';
import { mkdtempSync, writeFileSync, cpSync, rmSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';

const FUNCTIONS = resolve('.vercel/output/functions');
if (!existsSync(FUNCTIONS)) {
  console.error('.vercel/output/functions not found — run `npm run build` first.');
  process.exit(2);
}

// Self-test: prove this Node can still simulate the Vercel loader. If the flag stopped working,
// every child would fail with some other error and the guard would silently pass.
const FLAG = '--no-experimental-require-module';
{
  const dir = mkdtempSync(join(tmpdir(), 'esm-probe-'));
  writeFileSync(join(dir, 'probe.mjs'), 'export default 1;\n');
  const probe = spawnSync(process.execPath, [FLAG, '-e', "require('./probe.mjs')"], {
    cwd: dir,
    encoding: 'utf8',
  });
  if (!`${probe.stderr}`.includes('ERR_REQUIRE_ESM')) {
    console.error(
      `::error::${process.version} cannot disable require(esm) with ${FLAG}; this guard cannot run.`,
    );
    console.error(`${probe.stderr}`.slice(0, 400));
    process.exit(2);
  }
}

const BUILTIN = new Set(builtinModules);
// Bundlers emit both `require(` and Vite's `__require(`; `\b` alone would miss the latter.
const REQUIRE_RE = /(?<![\w$.])(?:__)?require\(\s*['"]([^'"./][^'"]*)['"]\s*\)/g;

const packageName = (spec) =>
  spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];

function* bundleFiles(dir) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* bundleFiles(p);
    else if (/\.(m?js|cjs)$/.test(name)) yield p;
  }
}

function tracedPackages(funcDir) {
  const nm = join(funcDir, 'node_modules');
  if (!existsSync(nm)) return [];
  const out = [];
  for (const name of readdirSync(nm)) {
    if (name.startsWith('.')) continue;
    if (name.startsWith('@')) for (const sub of readdirSync(join(nm, name))) out.push(`${name}/${sub}`);
    else out.push(name);
  }
  return out;
}

// A package whose entry for require() is an ES module is loaded with import(), never
// require(), so it is not a candidate on its own — only its CommonJS dependents are.
function loadableAsCommonJS(funcDir, name) {
  const pkgPath = join(funcDir, 'node_modules', name, 'package.json');
  if (!existsSync(pkgPath)) return true;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const isCjsFile = (target) =>
    typeof target === 'string' &&
    (target.endsWith('.cjs') || (!target.endsWith('.mjs') && pkg.type !== 'module'));
  const root = pkg.exports?.['.'] ?? pkg.exports;
  if (typeof root === 'string') return isCjsFile(root);
  if (root && typeof root === 'object') {
    if ('require' in root) return true;
    // Without a `require` condition, CommonJS gets `node` or `default` — whose file format
    // decides it (a `.js` file in a "type": "module" package is an ES module).
    const target = root.node ?? root.default;
    const file = typeof target === 'object' && target ? (target.require ?? target.default) : target;
    return isCjsFile(file);
  }
  return pkg.type !== 'module';
}

const problems = [];
let checked = 0;

for (const func of readdirSync(FUNCTIONS)) {
  const funcDir = join(FUNCTIONS, func);
  if (!statSync(funcDir).isDirectory()) continue;

  const iso = realpathSync(mkdtempSync(join(tmpdir(), 'fn-')));
  cpSync(funcDir, iso, { recursive: true, dereference: true });
  try {
    const traced = new Set(tracedPackages(iso).filter((n) => loadableAsCommonJS(iso, n)));
    const required = new Set();
    for (const file of bundleFiles(iso)) {
      for (const [, spec] of readFileSync(file, 'utf8').matchAll(REQUIRE_RE)) {
        const name = packageName(spec);
        if (!spec.startsWith('node:') && !BUILTIN.has(name)) required.add(name);
      }
    }

    for (const name of new Set([...traced, ...required])) {
      checked++;
      const r = spawnSync(process.execPath, [FLAG, '-e', `require(${JSON.stringify(name)})`], {
        cwd: iso,
        encoding: 'utf8',
        timeout: 30_000,
      });
      const err = `${r.stderr ?? ''}`;
      if (r.status === 0) continue;
      if (err.includes('ERR_REQUIRE_ESM')) {
        const detail = err.match(/require\(\) of ES Module (\S+)/)?.[1]?.replace(iso, '') ?? '';
        problems.push(`${func}: require("${name}") fails — it requires an ES module ${detail}`);
      } else if (required.has(name) && err.includes('MODULE_NOT_FOUND')) {
        problems.push(
          `${func}: the bundle require()s "${name}" at runtime, but it is not deployed with the function`,
        );
      }
    }
  } finally {
    rmSync(iso, { recursive: true, force: true });
  }
}

console.log(`${checked} CommonJS packages loaded without require(esm) support.`);
if (problems.length) {
  for (const p of problems) console.log(`::error::${p}`);
  console.log('Bundle the failing package via vite.ssr.noExternal in astro.config.mjs.');
  process.exit(1);
}
