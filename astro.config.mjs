import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { resolveSiteUrl } from './src/lib/siteUrl.ts';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Every package `name` depends on, transitively, resolved the way Node would.
function dependencyClosure(name, from = dirname(fileURLToPath(import.meta.url)), seen = new Set()) {
  if (seen.has(name)) return seen;
  for (let dir = from; ; dir = dirname(dir)) {
    const pkgDir = join(dir, 'node_modules', name);
    if (existsSync(join(pkgDir, 'package.json'))) {
      seen.add(name);
      const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
      for (const dep of Object.keys(pkg.dependencies ?? {})) dependencyClosure(dep, pkgDir, seen);
      return seen;
    }
    if (dirname(dir) === dir) return seen;
  }
}

// Canonical absolute origin (no trailing slash) for canonical + OG URLs.
// Same resolver the runtime uses, so `Astro.site` and SITE_URL can never
// disagree. Matters most on Preview, where PUBLIC_SITE_URL is unset and this
// used to hardcode localhost into the sitemap of every preview deploy.
const SITE = resolveSiteUrl(process.env);

export default defineConfig({
  site: SITE,
  output: 'server', // SSR by default; marketing pages opt into static via `export const prerender = true`
  adapter: vercel(),
  // English lives at the root (`/`); Arabic and French are served under `/ar` and `/fr`.
  // `prefixDefaultLocale: false` keeps every existing English URL unchanged.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  // Stray `/en/*` links redirect to the canonical root path.
  redirects: {
    '/en': '/',
    '/en/[...rest]': '/[...rest]',
    // The two /media slugs published on 31 August 2026 spelled the name "abderrahim".
    // The subject confirmed it is "Abdelrahim", so the slugs were corrected the same day.
    // These keep the already-published URLs alive rather than 404ing anyone who saved or
    // shared one in the hours they were live. Cheap to keep; do not remove.
    '/media/abderrahim-grein-icc-accountability-geneva-2026':
      '/media/abdelrahim-grein-icc-accountability-geneva-2026',
    '/ar/media/abderrahim-grein-icc-accountability-geneva-2026':
      '/ar/media/abdelrahim-grein-icc-accountability-geneva-2026',
    '/fr/media/abderrahim-grein-icc-accountability-geneva-2026':
      '/fr/media/abdelrahim-grein-icc-accountability-geneva-2026',
    '/media/abderrahim-grein-human-rights-2025': '/media/abdelrahim-grein-human-rights-2025',
    '/ar/media/abderrahim-grein-human-rights-2025': '/ar/media/abdelrahim-grein-human-rights-2025',
    '/fr/media/abderrahim-grein-human-rights-2025': '/fr/media/abdelrahim-grein-human-rights-2025',
  },
  // The admin API authenticates with Bearer tokens (not cookies), so CSRF is not
  // a threat. Astro's checkOrigin would otherwise 403 same-origin POST/DELETE
  // requests that omit a form Content-Type (publish/unpublish/delete/upload).
  security: { checkOrigin: false },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Bundle sanitize-html and its whole dependency tree into the server build.
      //
      // sanitize-html is CommonJS and require()s htmlparser2 12, which is ESM-only. Left in
      // node_modules, Vercel's function loader rejects that (ERR_REQUIRE_ESM) — which took down
      // every article page on the Astro 7 preview; local Node allows it, so nothing else caught
      // it. Bundling only sanitize-html is not enough either: its remaining require()s become
      // runtime `__require(...)` calls that Vercel's file tracer does not follow, so those
      // packages are never deployed ("Cannot find module 'is-plain-object'"). Astro 5 bundled
      // the tree implicitly. The closure is computed, not listed, so it cannot go stale.
      // Guarded by scripts/ci/check-server-bundle.mjs in the CI `build` job.
      noExternal: [...dependencyClosure('sanitize-html')],
    },
  },
});
