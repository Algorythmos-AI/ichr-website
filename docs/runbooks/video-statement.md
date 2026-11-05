# Runbook: a video on /media with a statement in the newsroom

A video the Coalition has uploaded to its YouTube channel, published on `/media` with the
Coalition's statement on it, and the same statement as a `/news` article with a photo-card
cover — in English, Arabic and French. First done for the Sudanese-soldier video (4 November
2026, releases 1.0.26–1.0.29) and the Mail Talks gold report (5 November 2026).

It combines three procedures; read them for the detail behind each step:
[publishing.md](publishing.md) (the article), [press/photo-card.md](press/photo-card.md) (the
cover) and the handbook's "Adding a YouTube video to `/media`".

**Why two releases.** `MediaDetailPage.astro` always links a video to its `relatedPostSlug`,
and article covers must be in production before the article references them. So: release 1
ships the covers and the video **unlisted**; then the article is seeded and published; release
2 lists the video. Listing it any earlier links to a 404.

---

## 1. Read the video

```bash
DRY_RUN=1 node scripts/add-video.mjs <youtube-url-or-id> <slug>
```

- **The date is the UTC upload day**, which is what Studio shows. If the channel feed is down
  the script falls back to the watch page's local date and says so — then read the exact
  timestamp (`"uploadDate":"…T17:09:22-08:00"` on the watch page) and convert it to UTC.
- **Know what the video says.** Scripts cannot read YouTube captions; get the narration or key
  claims from the client, or from frames, before drafting. Never write a claim you have not seen.
- **Third-party footage** (a broadcaster's report re-uploaded): flag the copyright risk once —
  a claim or takedown is a strike on the channel — and credit the source in the body.

## 2. Editorial gate — one batched question

Ask the client, before writing anything:

- **Article:** an ICHRO statement (drafted by us, with demands) or a summary-only news item.
- **Dateline and date:** usually Geneva, the upload day.
- **Card image band:** a still the client supplied of this event, or the map of Sudan with a
  place marked. Advise against a frame that identifies an unverified private individual; for a
  third-party photo, say whose it is.
- **Attribution:** every claim stays hedged ("appears to show", "according to", "has not
  independently verified", "if confirmed") — in all three languages, with the same words each
  time (record them in the seed header).

## 3. Build — one branch from `integration`

1. `node scripts/add-video.mjs <id> <slug>` writes the poster and variants. A **portrait**
   Short gets a pillarboxed 16:9 thumbnail: crop its 9:16 centre strip, upscale to 720 wide,
   set `vertical: true`, then `FORCE=1 node scripts/gen-image-variants.mjs <slug>`.
2. Paste the entry at the top of `VIDEOS` in `src/data/videos.ts` with **`published: false`**,
   `relatedPostSlug`, `location` in all three languages, the `statement` blocks and `signOff`.
3. Write `prisma/seed-statement-<name>.mjs`, modelled on the newest seed (not the skeleton,
   whose names may be stale). New `TRANSLATION_KEY` from `crypto.randomUUID()`, hardcoded.
   The body is the same text as the video's `statement`, plus the video link and credits.
4. Covers: `PHOTO_CARD_BAND` + `PHOTO_CARDS` in the seed, then
   `FORCE=1 node scripts/gen-photo-card.mjs <seed>` and
   `FORCE=1 node scripts/gen-image-variants.mjs <article-slug>`. A band photo lives in
   `press/` (never committed). **Open all three JPEGs** and check Arabic joins, the date's
   direction, orphan words, and map labels inside the borders.
5. `docs/press-log-2026.md`, `CHANGELOG.md` and a version bump (`npm version X --no-git-tag-version`).

## 4. Gates, then approval

```bash
DRY_RUN=1 node --env-file=.env.local prisma/seed-statement-<name>.mjs
npm run verify
```

Then send the client the three texts and the three covers. **The repository is public: nothing
is pushed until the client approves the wording.**

## 5. Ship

1. Commit named paths only; PR into `integration`; the owner squash-merges.
2. Release PR `integration → main` (merge commit). Confirm `/api/health` reports the merge
   commit, every cover returns `200 image/jpeg`, and `/media/<slug>` is still 404.
3. Seed as draft, confirm `/news/<slug>` is 404, then `PUBLISH=1`. One command each — never
   chained with `&&`.
4. A second PR deletes the `published: false` line (plus bump and CHANGELOG), and a second
   release lists the video.

## 6. Verify live

- `/media`, `/ar/media`, `/fr/media`: the video is first, with the right date and duration.
- The detail page: dateline, statement, sign-off, a working link to the article, and **no
  requests to YouTube before play**.
- The article in all three languages: the hedges present, the cover loads, `og:image` is that
  locale's cover, and the JSON-LD parses.

## Later changes

- **An update to a published statement** (new information from the client): add one dated
  paragraph, attributed and hedged, to both the seed and the video entry. Check that the live
  rows still match the seed (no `/admin` edits) before re-seeding: a plain run updates the text
  in place and keeps it published. The video page follows in a release.
- **A new cover:** same filenames, so a release is enough and no re-seed is needed.
- **Rollback:** `UNPUBLISH=1` drafts every locale; put back `published: false` and release.
