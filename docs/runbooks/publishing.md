# Runbook: publishing a press statement

Publishing a press statement, press release or field update to the newsroom in English,
Arabic and French — from a client-supplied folder of text and designed cards.

Read the [engineering handbook](../engineering/handbook.md) first, especially the two gotchas.
The short version: **article text lives in Neon, not in git.** Publishing is instant and needs
no deploy — but the **images do**, so they always ship first.

Work through these gates in order. Each one exists because it failed once.

---

## 1. Read the source

Client material is kept outside the repository (it is never committed).

```bash
ls -la <source-folder>/ && textutil -convert txt -stdout <source-folder>/*.rtf
sips -g pixelWidth -g pixelHeight <source-folder>/*.jpg
```

**Open every image.** Know whether the artwork is a wide card (good cover and OG image), a
portrait card (gallery), an A4 document page (poor cover — generate one), or a photograph.

## 2. Editorial gate — stop and ask the client

Never guess on any of these. Ask in one batch, before writing anything:

- **The dateline city.** Read it off the statement. It has been Geneva, Paris and Brussels.
  Assuming Geneva is the single most likely mistake in this workflow.
- **Names.** Cross-check every proper name against the designed cards and earlier articles;
  client notes have carried misspellings the cards did not (e.g. "Tapiyo" vs "Tapio").
- **OCR-looking corruption.** One statement read "communities at heightened Latin" (for
  "risk"). Offer: correct it / keep verbatim / drop the phrase.
- **Named victims, minors, or attribution of responsibility or commitments to a named person
  or force.** Once live, the page is indexed and cached. Preserve every "reported" /
  "alleged" / "allegations" hedge, and check the AR/FR translations keep them.
- **The sign-off.** Statements end with the organisation name, tagline and dateline.
- **Any text added** that is not in the source (e.g. a link to an earlier meeting) — flag it.

Default to publishing the text **verbatim**. This is someone's signed statement.

## 3. Identifiers

- **slug**: lowercase, `^[a-z0-9-]+$`, ≤120, e.g. `condemnation-<subject>-<place>-<month>-<year>`.
  Check it is free: `ls public/blog/` and `grep -rn "SLUG = " prisma/`.
- **translationKey**: `node -e "console.log(require('crypto').randomUUID())"`, **once**. Hardcode
  it. Never regenerate it.
- **category**: exactly one of `Press Release | Statement | Field Update | News`.
- **date**: the statement's own date as a `'YYYY-MM-DD'` **string**, never a `Date`.

## 4. Branch

```bash
git switch integration && git pull --ff-only
git switch -c content/<slug>
```

## 5. Write the statement file

Copy [`press/statement-config-skeleton.mjs`](press/statement-config-skeleton.mjs) to
`prisma/seed-statement-<name>.mjs`: one file, three locales, content only. The mechanism lives in
`prisma/lib/press-statement.mjs`. Record every editorial decision in the file's header comment.

Gallery images hang off the locale whose language they are in; language-neutral photos go on
all three.

### Markdown rules

These render wrong rather than erroring. `validateStatement` catches all three:

- `---` needs a **blank line before and after**, or the line above becomes an `<h2>`.
- **No blank lines between `- ` bullets** — that produces a loose list (`<li><p>`).
- `- ` needs the space. `-Name (child).` is a paragraph, not a bullet.

No emoji or other non-BMP characters in a body: the read-back compares Postgres `length()` with
JavaScript `.length`, which only agree for BMP text. Hashtags go in `hashtags`.

## 6. Artwork

**Generated covers** (when the client supplied no usable wide card):

```bash
node scripts/gen-press-cover.mjs prisma/seed-statement-<name>.mjs
```

It refuses to write an overflowing card and never overwrites without `FORCE=1`. **Open every
JPEG** — the gate only sees geometry. See [`press/cover-invariants.md`](press/cover-invariants.md).
Generate covers on macOS; the Arabic font is not available on Linux.

**Supplied artwork** — re-encode it (`/blog/*` is served raw, with no image optimization):

```bash
node -e "import('sharp').then(async ({default:s})=>{const O='public/blog/<slug>';
for (const [src,dst] of [['<source>/1.jpg','card-1.jpg'],['<source>/2.jpg','card-2.jpg']])
  { await s(src).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).jpeg({quality:84,mozjpeg:true}).toFile(O+'/'+dst); console.log(dst); }})"
```

If sharp cannot read a file, it is usually macOS quarantine: `xattr -c <file>`.

**Responsive variants — required:**

```bash
node scripts/gen-image-variants.mjs <slug>
git diff --stat src/generated/blog-images.json   # additions only
```

### Supplied PDFs

Client PDFs are usually flattened pictures. Check for a text layer first; rebuild picture pages
from the published 1600px cards and splice any real text page through untouched. Name it
`<name>.<lang>.pdf` — `scripts/gen-attachments.mjs` reads the language from the suffix.

## 7. Gates

```bash
DRY_RUN=1 node --env-file=.env.local prisma/seed-statement-<name>.mjs
npm run check && npm test && npm run build
```

Render the three bodies through `src/lib/markdown.ts` and compare the structure across locales
(paragraph, list, `<hr>` and link counts) to catch translation-formatting drift.

## 8. Ship the images to production

1. Commit **named paths only** — the seed, `public/blog/<slug>/`, the manifest. Never
   `git add -A`.
2. Open a PR into `integration` titled `content: <summary>`. Wait for green; squash-merge.
3. Open the release PR `integration → main`; merge with a **merge commit**.
4. **Confirm production serves the images** before anything references them:

```bash
for f in card-1.jpg card-2.jpg card-1-800.jpg; do curl -sS -o /dev/null -w "%{http_code} %{content_type} $f\n" "https://www.ichr-international.org/blog/<slug>/$f"; done
```

Every file must be `200 image/jpeg`. A 404 fetched before the deploy landed can stay
edge-cached briefly — re-probe rather than trusting a single miss.

## 9. Seed, then publish

Two separate commands, on purpose. Never chain a database write behind another command with
`&&`.

```bash
node --env-file=.env.local prisma/seed-statement-<name>.mjs
```

This writes **drafts** — confirm the article URL still 404s. Then:

```bash
PUBLISH=1 node --env-file=.env.local prisma/seed-statement-<name>.mjs
```

Rollback drafts every locale at once:
`UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-<name>.mjs`.

### Correcting a story that is already published

| Run | What it does |
|---|---|
| plain | **Writes the text.** The only thing that ever does. Preserves the stored status. |
| `PUBLISH=1` | **Flips draft → published. Never writes content.** |

Every content change needs a plain run. `PUBLISH=1` on a live article reports success and
changes nothing. Verify corrections by grepping the live page for a string that must no longer
appear — never by the script's exit code.

## 10. Verify live

Follow [`press/verify-checklist.md`](press/verify-checklist.md): the `/news` card, the article in
all three locales, the language toggle, `hreflang` alternates, escaped JSON-LD, the gallery, and
the sitemap. Then add the article to [`docs/press-log-2026.md`](../press-log-2026.md).

Report anything flagged — a typo left in the artwork, a mismatch between the body and the cards
— so the client can re-export.
