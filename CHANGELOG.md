# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/). Article content is not versioned here — see
[`docs/press-log-2026.md`](docs/press-log-2026.md).

## [Unreleased]

### Changed

- Astro 5 → 7, `@astrojs/vercel` 8 → 11, `@astrojs/react` 4 → 7. Prerendered pages are unchanged
  in visible text, head tags and scripts; the shared stylesheet bundle is renamed.
- bcryptjs 3, lucide-react 1, `@vercel/blob` 2 (upload URLs keep their random suffix explicitly).

### Security

- Clears the Astro, sharp and undici advisories; one build-time `path-to-regexp` advisory remains
  allowlisted pending an adapter release.

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

### Fixed

- Admin API client: responses are typed per endpoint instead of `any`.
- World map: the marker registry is captured for effect cleanup.
- Share buttons: modern variable declarations in the copy-link script.

### Security

- Non-breaking dependency updates applied (`npm audit fix`), clearing the `tar`, `js-yaml`,
  `nanoid`, `postcss`, `brace-expansion`, `smol-toml`, `svgo` and `browserslist` advisories.
