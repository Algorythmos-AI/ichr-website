# Runbook: rollback

Pick the smallest action that fixes what readers see.

## An article is wrong

Article text is in the database, so no deploy is involved:

- **Take it offline** (all three languages at once):
  `UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-<name>.mjs`
- **Correct it:** edit the seed file, then run it **without** flags. That plain run is the only
  one that writes text; `PUBLISH=1` never does.
- Admin-authored articles are unpublished or edited in `/admin`.

## A release broke the site

1. **Roll production back in Vercel** (seconds, no build): Vercel → project `ichr` →
   Deployments → the last good production deployment → **Instant Rollback**. `/api/health`
   reports which commit is live.
2. **Fix forward through a pull request** into `integration`, then release. After an instant
   rollback, Vercel keeps serving the rolled-back deployment until the next production deploy.
3. Close the `incident` issue with a note on the cause.

Prefer `git revert` of the offending change over rewriting history. `main` and `integration`
are protected against force-pushes.

## The database is unreachable

Reader pages degrade to a localized "not found" or empty state; the admin API answers `503`
with `Retry-After`. Nothing needs rolling back. Check the Neon status page, and do not run
seed scripts until it recovers.
