// Dependency audit gate: fails on any HIGH or CRITICAL advisory in production dependencies
// that is not on the reviewed allowlist in .audit-allowlist.json.
//
// WHY NOT `npm audit --audit-level=high`: several advisories can only be fixed by major
// upgrades (Astro 7, @astrojs/vercel 11, sharp 0.35, @vercel/blob 2) that are scheduled as
// their own piece of work. A bare `npm audit` would be red on every run until then, and a gate
// that is always red is a gate nobody reads. The allowlist names each accepted advisory with a
// reason, so a NEW advisory still fails loudly.
//
// It also reports allowlist entries that no longer match anything, so the list shrinks as
// upgrades land instead of silently accumulating.
//
//   node scripts/ci/audit-deps.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const BLOCKING = new Set(['high', 'critical']);

const allowlist = JSON.parse(readFileSync(new URL('../../.audit-allowlist.json', import.meta.url), 'utf8'));
const allowed = new Map(allowlist.advisories.map((a) => [a.id, a]));

let raw;
try {
  raw = execFileSync('npm', ['audit', '--omit=dev', '--json'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
} catch (err) {
  // npm audit exits non-zero whenever it finds anything; the JSON is still on stdout.
  raw = err.stdout;
  if (!raw) throw err;
}
const report = JSON.parse(raw);

const seen = new Set();
const blocking = [];
for (const [pkg, vuln] of Object.entries(report.vulnerabilities ?? {})) {
  for (const via of vuln.via) {
    if (typeof via !== 'object') continue; // a string is a transitive pointer, reported on its own package
    const id = via.url?.split('/').pop();
    if (!id || !BLOCKING.has(via.severity)) continue;
    seen.add(id);
    if (!allowed.has(id)) blocking.push(`${via.severity.toUpperCase()} ${pkg} ${id} — ${via.title}`);
  }
}

const stale = [...allowed.keys()].filter((id) => !seen.has(id));
if (stale.length) {
  console.log(
    `::notice::${stale.length} allowlisted advisories no longer apply — remove them from .audit-allowlist.json: ${stale.join(', ')}`,
  );
}

console.log(`${seen.size} high/critical advisories found; ${seen.size - blocking.length} allowlisted.`);
if (blocking.length) {
  console.log(`::error::${blocking.length} high/critical advisories are not allowlisted:`);
  for (const b of blocking) console.log(`  ${b}`);
  process.exit(1);
}
