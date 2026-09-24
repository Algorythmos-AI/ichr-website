# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/). Article content is not versioned here — see
[`docs/press-log-2026.md`](docs/press-log-2026.md).

## [Unreleased]

### Added
- Continuous integration on every pull request: type-check, `astro check`, unit tests on
  Node 22 and 24, and a production build.
- Security scanning: gitleaks (working tree on every change, full history weekly), CodeQL,
  actionlint, and a dependency audit with a reviewed allowlist.
- Pull request hygiene: Conventional Commit titles; production only accepts the trunk.
- Dependabot for npm and GitHub Actions, targeting `integration`.
- Repository policy: code owners, pull request and issue templates, security policy.

### Changed
- Repository moved to `Algorythmos-AI/ichr-website`; `integration` is the default branch and
  `main` is production.

### Security
- Non-breaking dependency updates applied (`npm audit fix`), clearing the `tar`, `js-yaml`,
  `nanoid`, `postcss`, `brace-expansion`, `smol-toml`, `svgo` and `browserslist` advisories.
