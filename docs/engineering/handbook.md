# Engineering handbook

How this codebase works, and the handful of things in it that will silently do the wrong
thing if you don't know about them.

The site is the official web presence of the **International Coalition for Human Rights
(ICHR)**, a Geneva NGO. It is trilingual (English, Arabic, French) with a server-rendered
newsroom and a browser-based admin CMS, live at <https://www.ichr-international.org>.
Engineering and content operations are run by **Algorythmos**.

**Read the two "gotchas" sections before touching the database or publishing an article.**

---

## Stack

- **Astro 5** SSR (`output: 'server'`, `@astrojs/vercel` adapter) + TypeScript + Tailwind v4
- **React 19** islands: `AdminDashboard`, `WorldMap` (Leaflet)
- **Prisma 5** + **Neon Postgres**
- Markdown: `marked` + `sanitize-html` server-side; `DOMPurify` in the admin preview
- Image uploads: Vercel Blob

**Node 22.6+ locally; production runs Node 24** (Vercel project setting). The seed scripts use
`node --env-file`, and the tests use `--experimental-strip-types`; Node 20 runs neither.

Marketing pages are `prerender = true` (static). The newsroom (`/news`, `/news/:slug`) is
server-rendered per request, so articles ship real HTML with per-post OG tags, canonical,
hreflang and JSON-LD.

---

## Commands

```bash
npm install
npm run dev        # http://localhost:4321 — pages AND API on one origin
npm run build      # prisma generate && astro build
npm run check      # astro check
npm test           # node's built-in test runner over src/lib and prisma/lib
npm run typecheck  # astro sync && tsc --noEmit
npm run lint       # ESLint (correctness, hooks, accessibility)
npm run format     # Prettier
npm run verify     # everything CI runs, in order
```

A fresh clone has no `.astro/` directory, and `import.meta.env` is typed by the files
`astro sync` writes there — which is why `typecheck` syncs first; a bare `tsc` fails with `Property 'env' does not
exist on type 'ImportMeta'`.

---

## Branches and releases

- **`integration`** is the default branch and the trunk. Every change lands here by pull
  request, squash-merged, after the required checks pass.
- **`main`** is production. Vercel deploys it. It only ever receives `integration`, through a
  release pull request merged with a **merge commit** — squashing would rewrite SHAs and make the
  two branches diverge.
- Commit and PR titles follow Conventional Commits: `feat`, `fix`, `docs`, `chore`, `ci`,
  `refactor`, `perf`, `test`, `content`, `build`, `revert`, `release`.

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

---

## Gotcha 1: the database workflow is not what the Prisma docs imply

- **There is no `prisma/migrations/` directory.** `prisma migrate deploy` is a **silent
  no-op** — it appears to succeed and creates nothing. Schema changes are applied with
  `prisma db push`, or with a hand-written idempotent SQL script.
- **TCP 5432 may be blocked on your network.** `prisma db push` and any `PrismaClient`
  script then hang and fail with `P1001`. Vercel reaches Neon fine; only local tooling is
  affected.
- **The workaround** is Neon's HTTPS serverless driver (`@neondatabase/serverless`, port 443).
  Schema changes go through an idempotent script — see `prisma/migrate-i18n.mjs`
  (`CREATE TABLE/INDEX IF NOT EXISTS`, `ALTER TABLE … IF NOT EXISTS`). Content seeds do the
  same — see `prisma/lib/press-statement.mjs`.
- **All `prisma/*.mjs` run as** `node --env-file=.env.local prisma/<script>.mjs`. The operative
  env file for database work is **`.env.local`**, not `.env`.
- `schema.prisma` needs **both** `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct,
  for `directUrl`).

### Seed-script hazards

Every `prisma/seed-*.mjs` is a **one-shot importer that overwrites its own slug**. Re-running
one reverts any edit made to that post through `/admin` and rebuilds its gallery (`DELETE` +
re-`INSERT`, deliberately — appending would duplicate rows). They all:

- abort unless `DATABASE_URL` points at a `neon.tech` host,
- support `DRY_RUN=1` (no write) and `UNPUBLISH=1` (status → draft),
- assert a read-back after writing,
- export their content side-effect free, so a sibling script can import it.

`prisma/seed.mjs` (what `npm run db:seed` runs) is **admin-user only** and create-only:
re-running never touches an existing password. Rotation is explicit:
`RESET_ADMIN_PASSWORD=1 node --env-file=.env.local prisma/seed.mjs` — it re-hashes whatever
`ADMIN_PASSWORD` is in `.env.local`, so check that value first.

---

## Gotcha 2: article content lives in the database, not in git

`git grep` will not find the text of a published article. Posts are rows in Neon, authored
through `/admin`. The `prisma/seed-*.mjs` scripts mirror that content as the git
source-of-record — they are not the source of truth.

- Publishing or editing via `/admin` is **live immediately, with no deploy**.
- A deploy never changes article text.
- Re-running a seed **can** silently revert an editor's work.

### Data model

`Post` carries `locale` and `translationKey`. One story = up to three rows sharing a
`translationKey`, one per locale. `@@unique([slug, locale])` — a slug is unique **per locale**,
so the same slug is reused across languages. `hashtags` is a JSON-encoded string, not an array
column.

`translationKey` binds the language toggle, the `hreflang` alternates and the sitemap grouping.
**Never regenerate an existing one** — it orphans that story's translations. `createPost` has
an auto-link safety net: if no key is supplied it adopts a sibling's key by slug.

---

## Trilingual architecture

English at the root, Arabic under `/ar` (RTL), French under `/fr`. Configured in
`astro.config.mjs`: `defaultLocale: 'en'`, `prefixDefaultLocale: false`, plus `/en/* → /*`
redirects.

**Route files are ~5-line wrappers.** `src/pages/index.astro`, `src/pages/ar/index.astro` and
`src/pages/fr/index.astro` each render `<HomePage lang="…" />`. The page body lives once in
`src/components/pages/*Page.astro`.

**The exception: response control belongs to the route.** The three `news/[slug].astro`
wrappers load the article themselves (`loadArticle` in `src/server/article.ts`) and set
`Astro.response.status = 404` before rendering `<NotFoundPage>`. `Astro.rewrite()` /
`Astro.response.status` from inside a _component_ renders into an already-sent response, which
Astro reports as `ResponseSentError` and the adapter serves as "Internal server error" **with
HTTP 200**. That was a live bug on every missing slug and every draft.
`src/lib/pageComponents.test.ts` fails the build if a page component starts controlling the
response again.

> To change a page's content, edit `src/components/pages/<X>Page.astro` — **not** the three
> route files.

- UI strings: `src/i18n/strings/{en,ar,fr}.ts`. `en` is canonical; `export type Dict = typeof en`
  forces `ar` and `fr` to match, so a missing key is a **compile error**. Array lengths are
  _not_ type-enforced — keep them equal by hand.
- Helpers: `src/i18n/index.ts` — `stripLocale`, `localizedPath`, `localizeHref`,
  `localeAlternates`, `dir`, `ogLocale`.
- RTL: use logical CSS utilities (`ms/me/ps/pe/start/end`, `padding-inline-start`,
  `border-inline-start`, `text-align: start`) and the `.rtl-flip` class for directional icons.
  Never `ml/mr/left/right`.

---

## House style: names

**"Abdelrahim Grein"** — with an **L**. Settled 31 August 2026, **verified by Abdelrahim Grein
himself**. That confirmation is the authority: do not re-derive the spelling from a supplied
document, a press card or an older article.

The full name is **Abdelrahim Grein Sadam**; "Abdelrahim Grein" is the short form used in
bylines and body text.

| date            | spelling               | source                                                       |
| --------------- | ---------------------- | ------------------------------------------------------------ |
| source RTF      | `Abdel-Rahim Grein`    | the supplied press-9 document, hyphenated                    |
| 26 Aug 2026     | `Abderrahim Grein`     | chosen as house spelling; two live articles normalised to it |
| **31 Aug 2026** | **`Abdelrahim Grein`** | **confirmed by the subject — current and final**             |

- **The Arabic is unaffected.** عبد الرحيم قرين transliterates to both Latin forms; the Arabic
  copy must not be "fixed" to match a Latin edit.
- **The printed press cards still read "Abdel-Rahim Grein."** That artwork is the client's and
  is not retouched; only body text and captions follow the house spelling.
- **Re-importing press-9 from its source RTF reintroduces the hyphenated form.**
- Two `/media` slugs were published with the old spelling and corrected the same day;
  `astro.config.mjs` carries redirects from the old URLs. Keep them.

**Organisation name.** Body text and sign-offs use the house brand "International Coalition
for Human Rights (ICHR)". Some client-supplied artwork reads "International Coalition of Human
Rights Organizations"; artwork is never retouched.

---

## Publishing an article

**Route A — the admin CMS** (`/admin`): sign in, create the post, upload a cover and gallery,
publish. Live immediately. Use "+ Add \<language\>" on a story to create a translation
pre-linked to its `translationKey`.

**Route B — a seed script**, for press releases with designed artwork. The full procedure,
including the editorial questions that must be asked before publishing someone's signed
statement, is **[`docs/runbooks/publishing.md`](../runbooks/publishing.md)**. In short:

1. One file per statement, `prisma/seed-statement-<name>.mjs`, from
   [`docs/runbooks/press/statement-config-skeleton.mjs`](../runbooks/press/statement-config-skeleton.mjs).
   The mechanism — validation, the neon.tech guard, an **atomic** `sql.transaction` upsert, the
   gallery rebuild and the read-back asserts — lives in **`prisma/lib/press-statement.mjs`**.
   Don't re-implement it, and don't touch the two older hand-written seeds
   (`seed-statement-procedural-bias`, `seed-statement-cargo-trucks`): they are the record of
   what was executed against production.
2. Covers: `node scripts/gen-press-cover.mjs prisma/seed-statement-<name>.mjs` → measured,
   overflow-refusing cards. **Open every JPEG and look at it** — see
   [`press/cover-invariants.md`](../runbooks/press/cover-invariants.md).
3. Responsive variants: `node scripts/gen-image-variants.mjs <slug>` writes `-400/-800/-1200`
   files **and** `src/generated/blog-images.json`, which `src/lib/assets.ts` reads to build each
   `srcset`. `npm test` fails if a published image is missing from the manifest.
4. **The images must be in production before the article references them.** Merge to
   `integration`, release to `main`, confirm the deploy, _then_ seed as draft and publish.

---

## Adding a YouTube video to `/media`

Videos are **not** in the database. They are rows in `src/data/videos.ts`, committed to git (see
the header comment there for why). Revisit at ~20 videos, or when a non-developer needs to
publish one without a deploy.

```bash
node scripts/add-video.mjs <youtube-url-or-id> [slug]
```

It reads the real ID, duration and upload date off the watch page, downloads the poster to
`public/media/<slug>/poster.jpg`, runs `gen-image-variants.mjs`, and prints an entry for the
`VIDEOS` array. `DRY_RUN=1` prints without writing; `FORCE=1` re-downloads an existing poster.

Then, by hand: translate `title`, `speaker` and `summary` for **all three** locales; set
`eventDate` to when the footage was **recorded**; set `relatedPostSlug` and `playlist` (a new
`PlaylistId` needs a label in `media.playlists` in all three dictionaries); commit
`public/media/<slug>/**` **with** `src/generated/blog-images.json`.

`src/lib/videos.test.ts` fails the build on a malformed ID, a duplicate slug, a future or swapped
date, a poster missing from the image manifest, empty or placeholder copy, Arabic text with no
Arabic script, French text identical to the English, or a playlist with no label.

### Media gotchas (solved — don't regress them)

- **`resolveAssetUrl` has a path allow-list.** Without `/media/` in it, every poster silently
  resolves to `/og-image.png`.
- **The player is a facade.** `VideoEmbed.astro` renders a local poster and a real `<button>`,
  and builds the `youtube-nocookie.com` iframe only on click. Verify with the network panel:
  **zero** requests to `youtube.com` / `ytimg.com` / `googlevideo.com` until play.
- **Focus moves into the iframe on play**, or a keyboard user is dumped back at `<body>`.
- **Do NOT wrap Arabic titles, speakers or datelines in `<bdi>`.** `<bdi>` resolves its own
  direction from the first strong character, so a Latin-first string becomes an LTR island
  and reverses against the surrounding Arabic. `<html dir="rtl">` is already the correct base.
- **The play triangle never gets `.rtl-flip`.** It means "play", not "forward".
- `scripts/gen-image-variants.mjs` walks **two** roots (`public/blog`, `public/media`) into one
  manifest; a single-slug run still rebuilds the whole manifest.

---

## Environment variables

| var                                 | purpose                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `DATABASE_URL`                      | Neon **pooled** connection string (required)                                               |
| `DATABASE_URL_UNPOOLED`             | Neon **direct** connection; `schema.prisma` `directUrl`                                    |
| `JWT_SECRET`                        | signs admin tokens (required at runtime; read lazily, so builds don't need it)             |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | seeded admin credentials                                                                   |
| `PUBLIC_SITE_URL`                   | canonical/OG absolute base — **Production and Development only, deliberately not Preview** |
| `PUBLIC_API_URL`                    | optional origin override for the admin client; empty = same-origin                         |
| `BLOB_READ_WRITE_TOKEN`             | Vercel Blob (admin uploads); auto-set on Vercel                                            |

`.env` and `.env.local` are gitignored and must never be committed.

**Do not add `PUBLIC_SITE_URL` to the Preview environment.** A preview's hostname changes per
branch. `src/lib/siteUrl.ts` resolves the origin instead — `PUBLIC_SITE_URL` → (in production)
`VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_BRANCH_URL` → `VERCEL_URL` → `http://localhost:4321` —
and `astro.config.mjs`, `src/lib/site.ts` and `src/lib/assets.ts` all go through it. This
depends on **Project Settings → Environment Variables → "Enable access to System Environment
Variables"** staying on; the symptom if it is turned off is a preview `/sitemap.xml` listing
`http://localhost:4321/...`.

---

## Deploys

**Vercel cannot `require()` an ES module**, although local Node 22+ can. A CommonJS dependency
that `require()`s an ESM-only package therefore passes every local build and test and fails in
production with `ERR_REQUIRE_ESM` → HTTP 500. That happened to every article page during the
Astro 7 upgrade (`sanitize-html` → `htmlparser2` 12). The fix is to bundle the package **and its whole dependency
tree** through `vite.ssr.noExternal` in `astro.config.mjs` (bundling only the package leaves
runtime `__require` calls that Vercel's file tracer does not follow); `scripts/ci/check-server-bundle.mjs`, run after
every CI build, loads each traced dependency the way Vercel does and fails the build first.

Vercel deploys `main` to production and every other branch to a preview. The Vercel Git
integration is the only deploy path.

**A push can silently fail to deploy.** Observed once (28 July 2026): a push to the production
branch produced no Vercel deployment at all — no build, no error. The pushes on either side
built within seconds; configuration was audited and ruled out; the conclusion was a transient
dropped event.

- **Never assume a push deployed.** `GET /api/health` reports the commit production is
  serving, and the `release` workflow waits for it after every merge to `main` — see
  [`docs/runbooks/release.md`](../runbooks/release.md). Nothing that depends on a deploy
  (seeding an article that references new images, for example) runs before it is green.
- **Recovery:** an empty commit re-fires the event. Deployment appears within seconds.
- **Never deploy with `vercel --prod` from a working tree.** It uploads the directory, not the
  git tree, and would ship untracked local source material.

---

## Security invariants — preserve these

If a change would break one of these, it is wrong.

- **Every mutating API route calls `verifyRequest`** (`src/server/auth.ts`). Public `GET`s return
  published posts only.
- **JWT is pinned to HS256** and throws if `JWT_SECRET` is missing. No `alg:none`.
- **Prisma is parameterized everywhere.** Seed scripts use bound `$1` params, never string
  interpolation. The only `$executeRawUnsafe` is static DDL in `migrate-i18n.mjs`.
- **JSON-LD is escaped** via `safeJsonLd()` (`src/lib/jsonld.ts`). Never inline `JSON.stringify`
  into `set:html` — it does not escape `<`, and article titles are CMS-controlled.
- **Markdown is sanitized** (`src/lib/markdown.ts`): no `script`, no SVG, schemes limited to
  http/https/mailto, links forced to `rel="noopener noreferrer"`. Relative links are allowed.
- **Uploads** (`src/pages/api/content/posts/upload.ts`): auth + MIME allow-list + magic-byte
  sniff + 10 MB cap + server-generated filename. SVG rejected.
- **Locale filtering is mandatory on every post query** — otherwise an article is served in the
  wrong language, or a draft leaks. Drafts 404.
- **A DB outage degrades to a localized 404 / empty state, never a 500** on reader-facing pages
  (`src/lib/api.ts`). The **admin API is the opposite on purpose**: 503 + `Retry-After`, never a
  404, so an editor is never told a post was deleted when the database was merely unreachable
  (`src/lib/prismaErrorCodes.ts`, `src/server/http.ts`).
- **Query params are clamped before they reach Prisma** (`src/lib/pagination.ts`).
  `Math.max(1, Number('abc'))` is `NaN`, which reaches Prisma as `skip: NaN`.
- **bcrypt cost is shared** by `login.ts` and `prisma/seed.mjs` (`BCRYPT_COST`);
  `src/lib/bcryptCost.test.ts` fails the build if they drift, and a verified sign-in re-hashes a
  lower-cost stored hash (`needsRehash`, `src/lib/bcryptHash.ts`). Both login branches must do
  equal work, or response time becomes a username oracle.
- `robots.txt` disallows `/admin`; the sitemap emits published-only, XML-escaped URLs.

### Known gaps

- **Login throttling is enforced at the edge**, by a Vercel Firewall rule, not in application
  code. Do not remove or loosen that rule. Operational details are kept in the private
  Algorythmos operations repository.
- The admin JWT is stored in `localStorage`. A session expiry does not lose work: any 401
  stashes the draft in `sessionStorage` and restores it after re-login (`src/lib/draftStash.ts`).
- The CSP in `vercel.json` is `Content-Security-Policy-Report-Only` and reports to
  `/api/csp-report`. Enforcing it needs Astro's `experimental.csp` hashing: Astro emits its island
  bootstrap inline on every page with an island, so `script-src 'self'` alone breaks the
  WorldMap and `/admin`.
- **The Donate, Contact and Volunteer forms are inert** — no `action`, no endpoint. Submissions
  are discarded. Known and deliberate for now.
- Preview deployments use the production database.
