# Runbook: releasing to production

Production is `main`. It changes only through a **release pull request** from `integration`,
merged with a **merge commit**. Vercel deploys `main`; the `release` workflow then proves the
deploy and tags it.

## 1. Preflight

```bash
bash scripts/release/preflight.sh
```

It fails with a reason unless:

- `integration` is ahead of `main`,
- every check passed on `integration`'s tip,
- `package.json`'s version has a `## [X.Y.Z]` section in `CHANGELOG.md`,
- no release pull request is already open.

It warns if the version is already tagged. That is fine for an infrastructure-only release
(the deploy is still verified; tagging is skipped). For a user-visible change, bump the
version and add the CHANGELOG section first, through a normal pull request into
`integration`. Content releases (`content:`) use a patch bump.

## 2. Open the release pull request

```bash
gh pr create --repo Algorythmos-AI/ichr-website --base main --head integration \
  --title "release: vX.Y.Z — <summary>" --body "<commits going out, from preflight>"
```

The `main-source-guard` check fails any pull request into `main` that is not from
`integration`.

## 3. Merge with a merge commit

```bash
gh pr merge <number> --repo Algorythmos-AI/ichr-website --merge --admin
```

Never squash or rebase a release: it rewrites the SHAs, so `main` and `integration` diverge
and every later release conflicts.

## 4. Watch the release workflow

The `release` workflow runs on the push to `main`:

| Job            | Proves                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `gates`        | every required check passed on the merge commit itself                                                     |
| `await-deploy` | `https://www.ichr-international.org/api/health` reports the merge commit (or a newer one that contains it) |
| `smoke`        | `scripts/ci/smoke.mjs` passes against production                                                           |
| `release`      | tags `vX.Y.Z` and publishes a GitHub Release from the CHANGELOG section                                    |

Any failure opens (or updates) an `incident` issue.

```bash
gh run watch --repo Algorythmos-AI/ichr-website "$(gh run list --repo Algorythmos-AI/ichr-website --workflow release --limit 1 --json databaseId --jq '.[0].databaseId')"
```

## When a job fails

| Job            | Meaning                                                  | Action                                                          |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| `gates`        | a required check failed or never ran on the merge commit | fix on `integration` through a pull request, then release again |
| `await-deploy` | production never reported the commit                     | see "A release never goes live" below                           |
| `smoke`        | production is live but wrong                             | [rollback](rollback.md) first, then fix through a pull request  |
| `release`      | tagging failed; **the deploy is already verified**       | tag by hand (below), then fix the job                           |

### A release never goes live

Vercel has, once, silently dropped a deploy event (28 July 2026): no build, no error.

1. Check the Vercel dashboard for a deployment of the merge commit.
2. If there is none, re-fire the event with an empty commit **through a pull request** into
   `integration` and a new release. Protected branches accept nothing else.
3. **Never deploy with `vercel --prod` from a working tree.** It uploads the directory, not
   the git tree, and would ship untracked client material.

### Tagging by hand (only after the deploy is verified)

```bash
git fetch origin main --tags
git tag -a vX.Y.Z -m vX.Y.Z <merge-commit-sha>
git push origin vX.Y.Z
gh release create vX.Y.Z --repo Algorythmos-AI/ichr-website --title vX.Y.Z --notes "<CHANGELOG section>" --verify-tag
```
