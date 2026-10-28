# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/). Article content is not versioned here — see
[`docs/press-log-2026.md`](docs/press-log-2026.md).

## [Unreleased]

## [1.0.25] — 2026-10-28

### Fixed

- Faint horizontal stripes across the Arctic on the Global Presence map: land shapes crossing
  the 180° meridian were drawn with an edge spanning the whole world. They are now unwrapped
  before drawing (`src/lib/antimeridian.ts`).

## [1.0.24] — 2026-10-28

### Fixed

- The Global Presence map showed "API KEY REQUIRED" tiles: CARTO's free basemap now requires
  a key. The map now draws its own basemap from Natural Earth land data (public domain,
  bundled with the site), with no tile server, no key and no third-party request. Maximum
  zoom is 6.

## [1.0.23] — 2026-10-28

### Added

- Client-style square photo card for text-only statements: red-toned image band (a supplied
  photo of the event, or a map of Sudan with the place marked), the client's badge, red
  headline, dateline and lead (`scripts/gen-photo-card.mjs`, `docs/runbooks/press/photo-card.md`).

### Changed

- The Dumaya market statement's covers (EN/AR/FR) re-rendered in the photo-card layout, with
  a map band marking Nyala.

### Fixed

- `gen-photo-card.mjs` resolves the repository path correctly from a checkout whose path
  contains a space.

## [1.0.22] — 2026-10-28

### Changed

- README and CONTRIBUTING give Node 22.23.4 as the minimum (Astro 7.4's floor); Node 24 is
  recommended, as in production.
- The Dumaya statement's editorial record notes the client's confirmation of the Arabic place
  names. Published text unchanged.

## [1.0.21] — 2026-10-28

### Added

- Newsroom covers for the 27 October 2026 statement condemning the airstrike on the Dumaya
  market in Nyala.

### Security

- zod and undici advisories patched (GHSA-mrhx-c7xc-m3w5; GHSA-xjj6-f33q-929c,
  GHSA-2m5v-pch6-74hx, GHSA-qrxm-fqhp-jwvm). Vercel's packages pinned an old zod; a scoped
  override puts every copy on 4.6.7.

### Changed

- Dependency updates: astro 7.4.2, @astrojs/vercel 11.0.16, @astrojs/react 7.1.1, lucide-react
  1.63.0, @astrojs/check 0.9.12, typescript-eslint 8.72.1; CodeQL action 4.39.1. Astro 7.4
  needs Node 22.23.4+ locally (production runs 24).

## [1.0.20] — 2026-10-22

### Changed

- Joint petition article: dated 21 October 2026 (the client's corrected date), and its covers
  re-rendered in UN blue — a new 'unblue' cover theme, deepened from the official UN blue so
  white text stays readable.

## [1.0.19] — 2026-10-22

### Fixed

- Article links inside a sentence stay inline again. A selector meant only for link-only
  paragraphs also matched sentences with a single link, pushing the link onto its own line.

## [1.0.18] — 2026-10-22

### Added

- Newsroom covers for the 22 October 2026 joint petition on the airstrike on Sudanese miners,
  in a new light 'pearl' theme (couture grey, near-black type, antique gold). The cover
  generator now supports light themes.

## [1.0.17] — 2026-10-22

### Added

- Newsroom covers for the 22 October 2026 statement on the Geneva meeting for coordinating
  peace efforts in Sudan.

## [1.0.16] — 2026-10-21

### Added

- The Amiet market statement now carries the client's designed cards: card 1 heads the article
  in all three languages, card 2 is in the gallery, and the statement is downloadable as a
  0.46 MB PDF (rebuilt from the supplied 9.4 MB file).

### Security

- Removed the nested vite 6.4.3 pulled in by @tailwindcss/vite (GHSA-587h-7wmj-h5pm,
  dev server only); the project now uses a single vite 8.3.5.

## [1.0.15] — 2026-10-20

### Changed

- Newsroom: the Amiet market cover moves from azure to a new terracotta theme, so the featured
  card on `/news` no longer blends into the site's navy.

## [1.0.14] — 2026-10-20

### Fixed

- Rename follow-up: the bold sign-offs in the seed files now carry the new organisation name, and
  the Shirshar statement no longer reads "…Organizations Organizations". The live articles were
  already corrected by re-seeding; this brings the source of record in line.

## [1.0.13] — 2026-10-20

### Changed

- The organisation is renamed **International Coalition of Human Rights Organizations (ICHRO)**
  across the site in all three languages, at the client's request: page text and titles,
  structured data, the header and footer, video copy, generated press covers (re-rendered) and,
  through a one-off script and the seeds, every newsroom article.
- Dependency updates: astro 7.4.0, @astrojs/vercel 11.0.15, @astrojs/react 7.1.0, react 19.3.1,
  sanitize-html 2.18.1, dompurify 3.4.17, zod 4.6.7, and tooling; GitHub Actions updates.

## [1.0.12] — 2026-10-20

### Changed

- Newsroom: generated press covers now come in seven colour themes, one per statement, instead of a
  single navy; the seven existing text-only covers are re-rendered in their own colours.
- Newsroom: the letterbox around portrait and square covers (on `/news` and the article hero) is a
  blurred copy of the cover, so the frame matches each card instead of a fixed navy fill.

## [1.0.11] — 2026-10-20

### Added

- Newsroom covers for the 19 October 2026 statement on Amiet market, Abyei (Paris).

## [1.0.10] — 2026-10-18

### Added

- Newsroom covers for the 16 October 2026 statement on the Nyala livestock market (Paris).

## [1.0.9] — 2026-10-16

### Added

- Newsroom artwork for the 13 October 2026 meeting with The Church of Jesus Christ of
  Latter-day Saints (Brussels).

## [1.0.8] — 2026-10-15

### Changed

- `/media`: Andy Vermaut's North Wadi video says "Egyptian army", as the client wrote.

## [1.0.7] — 2026-10-15

### Added

- `/media`: Andy Vermaut's appeal on the North Wadi airstrike (EN/AR/FR), linked to the
  statement article.

## [1.0.6] — 2026-10-14

### Changed

- `/media`: the North Wadi video page links to its newsroom article in all three languages.

## [1.0.5] — 2026-10-14

### Added

- Newsroom covers for the 12 October 2026 North Wadi airstrike statement (Brussels).

## [1.0.4] — 2026-10-14

### Added

- `/media`: the North Wadi statement video page now carries the full statement (EN/AR/FR),
  with the Coalition's demands as a list and a sign-off. Videos can optionally carry a
  `statement`; the build fails if it is missing in a locale or structured differently.

### Changed

- Dependency updates: astro 7.3.8, @astrojs/vercel 11.0.13, @astrojs/react 7.0.1,
  sanitize-html 2.18.0, marked 18.1.0, @neondatabase/serverless 1.2.0, @vercel/blob 2.8.1,
  lucide-react 1.54.0, and development tooling.

## [1.0.3] — 2026-10-14

### Added

- `/media`: the 12 October 2026 statement video on the North Wadi airstrike (EN/AR/FR), in a
  new "Statements 2026" playlist.
- Portrait (9:16) player for YouTube Shorts, via an optional `vertical` flag on a video;
  the build fails if a vertical video's poster is not portrait.

### Fixed

- The `/media` filter row offers only playlists that have a listed video, so an unlisted
  playlist no longer leads to an empty grid.

## [1.0.2] — 2026-10-02

### Added

- Newsroom artwork for the 30 September 2026 European Parliament press release (Brussels).

### Changed

- Dependency updates: minor and patch npm packages, and GitHub Actions.

## [1.0.1] — 2026-09-24

### Changed

- Branch protection: organisation admins can bypass only by merging a pull request, never by
  pushing directly to `main` or `integration`. Every pull request preview is now smoke-tested.
- ESLint 9 → 10 (`@eslint/js` 10, `eslint-plugin-astro` 3). `eslint-plugin-jsx-a11y` runs on
  ESLint 10 through an `overrides` entry until it declares support; all its rules verified to fire.

### Fixed

- Smoke test: a network failure now keeps the original error as `cause`.
- Draft stash: removed a dead initial assignment.

### Security

- `path-to-regexp` 6.1.0 → 6.3.0 under the Vercel adapter's route compiler (an `overrides` pin,
  same major; the generated routing config is byte-identical). Production dependencies now have
  no high or critical advisories, and the audit allowlist is empty.

## [1.0.0] — 2026-09-24

First versioned release, on moving the site to the Algorythmos-AI organisation with a gated
release process.

### Added

- Continuous integration on every pull request: type-check, `astro check`, unit tests on
  Node 22 and 24, and a production build.
- Security scanning: gitleaks (working tree on every change, full history weekly), CodeQL,
  actionlint, and a dependency audit with a reviewed allowlist.
- Pull request hygiene: Conventional Commit titles; production only accepts the trunk.
- Dependabot for npm and GitHub Actions, targeting `integration`.
- Repository policy: code owners, pull request and issue templates, security policy.
- `GET /api/health`: liveness and the deployed commit, without touching the database.
- `scripts/ci/smoke.mjs`: end-to-end production checks — every locale, the newest article and
  all its language versions, real 404s, the sitemap, robots and the admin `noindex`.
- Release pipeline (`release.yml`): after each merge to `main`, verifies the required checks,
  waits for production to serve the merge commit, runs the smoke test, then tags the release.
  Failures open an `incident` issue. Preview deployments are smoke-tested (`deploy-verify.yml`)
  and production every 30 minutes (`uptime.yml`).
- Branch and tag rulesets as code (`.github/rulesets/`, `scripts/ci/apply-rulesets.sh`) and a
  release preflight (`scripts/release/preflight.sh`).
- Runbooks for releasing and rolling back.
- ESLint (TypeScript, Astro, React hooks, jsx-a11y) and Prettier, enforced in CI by a `lint`
  job; `npm run verify` runs the full CI set locally.

### Changed

- Repository moved to `Algorythmos-AI/ichr-website`; `integration` is the default branch and
  `main` is production.
- Framework: Astro 5 → 7, `@astrojs/vercel` 8 → 11, `@astrojs/react` 4 → 7. Verified against
  production route by route (status, headers, text, head tags, JSON-LD): no differences.
- Dependencies: zod 4, marked 18, bcryptjs 3, lucide-react 1, `@vercel/blob` 2 (upload URLs keep
  their random suffix explicitly), TypeScript 5.9. marked 18 renders all published articles
  byte-identically; zod 4 validates identically.
- Tooling: npm 11 everywhere (CI, Dependabot, production); dependency install scripts are
  approved explicitly.

### Fixed

- Admin API client: responses are typed per endpoint instead of `any`.
- World map: the marker registry is captured for effect cleanup.
- Share buttons: modern variable declarations in the copy-link script.
- Article pages under Astro 7 on Vercel: `sanitize-html` and its dependency tree are bundled into
  the server build (Vercel cannot `require()` an ES module, and does not trace bundler
  `__require` calls). A post-build CI check (`scripts/ci/check-server-bundle.mjs`) guards it.

### Security

- Non-breaking dependency updates applied (`npm audit fix`), clearing the `tar`, `js-yaml`,
  `nanoid`, `postcss`, `brace-expansion`, `smol-toml`, `svgo` and `browserslist` advisories.
- The framework and dependency upgrades clear the Astro, sharp and undici advisories. One
  build-time `path-to-regexp` advisory (inside the Vercel adapter's route compiler) remains
  allowlisted with its reason, pending an adapter release.
