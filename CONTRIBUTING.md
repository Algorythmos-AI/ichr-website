# Contributing

## Branches

- **`integration`** — the default branch and trunk. Branch from it, and open pull requests into
  it. Pull requests are **squash-merged**.
- **`main`** — production. It receives `integration` only, through a release pull request that
  is merged with a **merge commit** (never squash or rebase — that rewrites SHAs and makes the
  two branches diverge).

Branch names: `<type>/<short-slug>`, e.g. `fix/sitemap-escaping`, `content/eu-delegation-september`.

## Commits and pull request titles

[Conventional Commits](https://www.conventionalcommits.org):

```
<type>(<optional scope>): <summary>
```

Types: `feat` `fix` `docs` `chore` `ci` `refactor` `perf` `test` `content` `build` `revert`
`release`. Use `content` for articles, artwork and videos.

The body says **what** changed, **why**, and **how it was verified**.

## Tooling

- **Node 24** recommended locally (what production runs; `.nvmrc`). The minimum is Node
  22.22.3 — the ESLint Astro plugin's floor; the app itself runs on 22.6+.
- **npm 11** (`npm install -g npm@11`), the version bundled with Node 24. Lockfiles written by
  npm 11 are rejected by npm 10's `npm ci`, so one npm version is used everywhere — including
  by Dependabot.
- `overrides` lets `eslint-plugin-jsx-a11y` 6.10 run on ESLint 10: it works (every rule was
  verified to fire) but has not yet declared ESLint 10 in its peer range. Remove the override
  once it does — tracked in #26.
- Dependency install scripts are allowed per package and version in `allowScripts`
  (`package.json`). After an update, `npm install-scripts ls` lists anything new to review.

## Before you open a pull request

```bash
npm run verify   # typecheck, astro check, lint, format check, tests, build — what CI runs
```

`npm run format` applies Prettier. `.astro` files and statement seeds are deliberately excluded
(see `.prettierignore`).

Stage named paths only — never `git add -A`. The working tree can hold client source material
and local environment files that must never be committed.

## Content

Publishing an article has its own procedure, including editorial questions that must be
answered before anything goes live: [`docs/runbooks/publishing.md`](docs/runbooks/publishing.md).
