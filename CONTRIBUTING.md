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
