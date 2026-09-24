// Production smoke test: proves a deployment serves the site correctly, end to end.
//
//   node scripts/ci/smoke.mjs https://www.ichr-international.org
//   node scripts/ci/smoke.mjs <preview-url> --bypass <token>   # Vercel-protected previews
//
// Zero dependencies (Node 22+ fetch). Every check names exactly what failed. It encodes the
// manual verify checklist that caught real regressions: missing locales, a sitemap listing
// localhost, and missing articles answering "Internal server error" with HTTP 200.
const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith('--')) ?? '').replace(/\/+$/, '');
const bypassIdx = args.indexOf('--bypass');
const bypass = bypassIdx >= 0 ? args[bypassIdx + 1] : process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
if (!/^https?:\/\//.test(base)) {
  console.error('usage: node scripts/ci/smoke.mjs <base-url> [--bypass <token>]');
  process.exit(2);
}

const headers = { 'user-agent': 'ichr-smoke/1.0' };
if (bypass) headers['x-vercel-protection-bypass'] = bypass;

const failures = [];
let passed = 0;
const fail = (msg) => failures.push(msg);
const ok = () => passed++;

async function get(path, { redirect = 'follow' } = {}) {
  const url = path.startsWith('http') ? path : `${base}${path}`;
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers, redirect, signal: AbortSignal.timeout(20_000) });
      return { res, body: await res.text(), url };
    } catch (err) {
      if (attempt >= 3) throw new Error(`${url}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function expectStatus(path, want) {
  const { res, body } = await get(path);
  if (res.status !== want) fail(`${path} → ${res.status} (want ${want})`);
  else ok();
  return body;
}

// 1. Every locale's home and newsroom answers 200.
const pages = ['/', '/ar', '/fr', '/news', '/ar/news', '/fr/news', '/about', '/media'];
const bodies = Object.fromEntries(await Promise.all(pages.map(async (p) => [p, await expectStatus(p, 200)])));

// 2. Arabic is served right-to-left.
if (/<html[^>]*\bdir="rtl"/.test(bodies['/ar'] ?? '')) ok();
else fail('/ar is not <html dir="rtl">');

// 3. The newest article, and every language version it declares, answers 200.
const newest = (bodies['/news'] ?? '').match(/href="(\/news\/[a-z0-9-]+)"/)?.[1];
if (!newest) {
  fail('/news lists no article');
} else {
  const article = await expectStatus(newest, 200);
  const alternates = [...article.matchAll(/<link rel="alternate" hreflang="([a-z-]+)" href="([^"]+)"/g)];
  if (alternates.length === 0) fail(`${newest} declares no hreflang alternates`);
  for (const [, lang, href] of alternates) {
    const path = new URL(href).pathname;
    const { res } = await get(path);
    if (res.status === 200) ok();
    else fail(`${newest} alternate [${lang}] ${path} → ${res.status}`);
  }
  if (/<script type="application\/ld\+json">[^<]*<\//.test(article)) ok();
  else fail(`${newest} has no escaped JSON-LD block (a raw "<" inside it, or none at all)`);
}

// 4. A missing article is a real 404 — not "Internal server error" with HTTP 200.
await expectStatus('/news/smoke-test-no-such-article', 404);

// 5. The sitemap parses, points at this site, and every URL for the newest story resolves.
{
  const { res, body } = await get('/sitemap.xml');
  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (res.status !== 200 || locs.length === 0) fail(`/sitemap.xml → ${res.status}, ${locs.length} URLs`);
  else ok();
  if (locs.some((l) => l.includes('localhost'))) fail('/sitemap.xml lists localhost URLs');
  else ok();
  const slug = newest?.split('/').pop();
  const storyLocs = slug ? locs.filter((l) => l.endsWith(`/news/${slug}`)) : [];
  if (slug && storyLocs.length === 0) fail(`/sitemap.xml has no entry for ${slug}`);
  for (const loc of storyLocs) {
    const { res: r } = await get(new URL(loc).pathname);
    if (r.status === 200) ok();
    else fail(`sitemap URL ${loc} → ${r.status}`);
  }
}

// 6. The admin stays out of search engines.
{
  const { body } = await get('/robots.txt');
  if (/^Disallow:\s*\/admin/im.test(body)) ok();
  else fail('/robots.txt does not disallow /admin');
  const admin = await expectStatus('/admin', 200);
  if (/<meta name="robots" content="[^"]*noindex/.test(admin)) ok();
  else fail('/admin is not noindex');
}

// 7. The health endpoint answers, uncached.
{
  const { res, body } = await get('/api/health');
  let health = null;
  try {
    health = JSON.parse(body);
  } catch {
    /* reported below */
  }
  if (res.status === 200 && health?.ok === true) ok();
  else fail(`/api/health → ${res.status} ${body.slice(0, 80)}`);
  if ((res.headers.get('cache-control') ?? '').includes('no-store')) ok();
  else fail('/api/health is cacheable');
  if (health) console.log(`deployed: commit=${health.commit} env=${health.env} version=${health.version}`);
}

console.log(`${passed} checks passed, ${failures.length} failed — ${base}`);
if (failures.length) {
  for (const f of failures) console.log(`::error::smoke: ${f}`);
  process.exit(1);
}
