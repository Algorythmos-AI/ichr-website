# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/). Article content is not versioned here — see
[`docs/press-log-2026.md`](docs/press-log-2026.md).

## [Unreleased]

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
