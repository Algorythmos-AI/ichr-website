// Generates the client-style square "photo card" covers for one statement (layout and
// rationale: scripts/lib/photo-card.mjs), driven by the PHOTO_CARDS config the statement file
// exports, with the shared image band in PHOTO_CARD_BAND.
//
//   node scripts/gen-photo-card.mjs prisma/seed-statement-<name>.mjs        # every locale
//   node scripts/gen-photo-card.mjs prisma/seed-statement-<name>.mjs ar     # just one
//   FORCE=1 node scripts/gen-photo-card.mjs <file>                          # overwrite
//
// Then: FORCE=1 node scripts/gen-image-variants.mjs <slug>, and OPEN every JPEG.
//
// A statement uses EITHER this card (PHOTO_CARDS) or the typographic card (COVERS, via
// gen-press-cover.mjs) — never both, or one generator silently overwrites the other's files.
// The same two safety rules apply: no two locales may emit one filename, and an existing
// file is never overwritten without FORCE=1.
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';
import { renderPhotoCard } from './lib/photo-card.mjs';

const REPO = join(dirname(new URL(import.meta.url).pathname), '..');
const FORCE = process.env.FORCE === '1';

const [, , modulePath, onlyLocale] = process.argv;
if (!modulePath) {
  console.error('Usage: node scripts/gen-photo-card.mjs <statement-file.mjs> [locale]');
  process.exit(1);
}

const mod = await import(pathToFileURL(resolve(modulePath)).href);
const { SLUG, PHOTO_CARDS, PHOTO_CARD_BAND, COVERS } = mod;
if (!SLUG || !PHOTO_CARDS || !PHOTO_CARD_BAND) {
  console.error(`ABORT: ${modulePath} must export SLUG, PHOTO_CARDS and PHOTO_CARD_BAND.`);
  process.exit(1);
}
if (COVERS) {
  console.error(
    `ABORT: ${modulePath} also exports COVERS — pick one cover style, or the two generators overwrite each other.`,
  );
  process.exit(1);
}

const targets = onlyLocale ? [onlyLocale] : Object.keys(PHOTO_CARDS);
const byFile = new Map();
for (const [loc, c] of Object.entries(PHOTO_CARDS)) {
  if (byFile.has(c.file)) {
    console.error(`ABORT: locales "${byFile.get(c.file)}" and "${loc}" both emit ${c.file}.`);
    process.exit(1);
  }
  byFile.set(c.file, loc);
}

const band = { ...PHOTO_CARD_BAND };
if (band.photo && !isAbsolute(band.photo)) band.photo = join(REPO, band.photo);

const OUT_DIR = join(REPO, 'public', 'blog', SLUG);
mkdirSync(OUT_DIR, { recursive: true });

for (const loc of targets) {
  const c = PHOTO_CARDS[loc];
  if (!c) {
    console.error(
      `ABORT: unknown locale "${loc}" — PHOTO_CARDS defines ${Object.keys(PHOTO_CARDS).join(', ')}`,
    );
    process.exit(1);
  }
  const out = join(OUT_DIR, c.file);
  if (existsSync(out) && !FORCE) {
    console.error(`ABORT: ${out} already exists. Re-run with FORCE=1 to overwrite it deliberately.`);
    process.exit(1);
  }
  const fit = await renderPhotoCard({ lang: loc, band, ...c }, out);
  console.log(
    `✅ [${loc}] ${out}\n      text bottom ${fit.bottom}/${fit.limit}px  sizes ${JSON.stringify(fit.size)}  lines ${JSON.stringify(fit.lines)}`,
  );
}

console.log('\nNow OPEN every JPEG and look at it — the fit gate cannot see broken Arabic joins,');
console.log('a date in the wrong order, or a line that reads badly.');
