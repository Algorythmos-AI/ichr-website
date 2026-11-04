// Generates the ICHRO emblem, the compact header mark and the favicon from code
// (scripts/lib/emblem.mjs), as SVG masters plus the PNG sizes the site and search engines use.
//
//   node scripts/gen-logo.mjs              # refuses to overwrite anything that exists
//   FORCE=1 node scripts/gen-logo.mjs      # regenerate in place
//
// Outputs (all referenced from the site — see src/lib/brand-assets.test.ts):
//   public/brand/ichro-emblem.svg, ichro-emblem-512.png, ichro-emblem-1024.png
//   public/brand/ichro-mark.svg                     header (32–64px)
//   public/brand/ichro-apple-touch-180.png          on white: iOS fills transparency with black
//   public/favicon.svg, public/favicon.png (32)     the globe medallion
//   public/logo.png (512)                           the old public URL, kept alive for links
//                                                   that already point at it
//
// The first run copies the pre-refresh public/logo.png to algorythmos/logo-legacy-2026.png
// (untracked) so the old artwork is never lost.
//
// Every layout limit is asserted inside emblem.mjs, and every PNG is checked for size and for
// not being blank here — but ALWAYS open the files and look at them: a renderer can draw a
// wrong shape at a perfectly legal size and still exit 0.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { emblemSvg, markSvg, faviconSvg, assertClearances } from './lib/emblem.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const FORCE = process.env.FORCE === '1';
const at = (p) => join(REPO, p);

await assertClearances(sharp); // the navy blades sit beside the laurel, never on it
const emblem = emblemSvg();
const mark = markSvg();
const favicon = faviconSvg();

const SVGS = [
  ['public/brand/ichro-emblem.svg', emblem],
  ['public/brand/ichro-mark.svg', mark],
  ['public/favicon.svg', favicon],
];
const PNGS = [
  ['public/brand/ichro-emblem-512.png', emblem, 512],
  ['public/brand/ichro-emblem-1024.png', emblem, 1024],
  ['public/brand/ichro-apple-touch-180.png', emblem, 180, '#ffffff'],
  ['public/favicon.png', favicon, 32],
  ['public/logo.png', emblem, 512],
];

const LEGACY = 'algorythmos/logo-legacy-2026.png';
if (!existsSync(at(LEGACY)) && existsSync(at('public/logo.png'))) {
  mkdirSync(dirname(at(LEGACY)), { recursive: true });
  copyFileSync(at('public/logo.png'), at(LEGACY));
  console.log(`kept the old emblem as ${LEGACY}`);
}

const targets = [...SVGS, ...PNGS].map(([p]) => p);
const existing = targets.filter((p) => existsSync(at(p)));
if (existing.length && !FORCE) {
  console.error(`ABORT: these exist — re-run with FORCE=1 to overwrite:\n  ${existing.join('\n  ')}`);
  process.exit(1);
}

mkdirSync(at('public/brand'), { recursive: true });

for (const [p, svg] of SVGS) {
  if (/<text[\s>]/.test(svg)) throw new Error(`${p}: contains <text> — glyphs must be outlined`);
  writeFileSync(at(p), svg);
  console.log(`wrote ${p} (${(svg.length / 1024).toFixed(0)} KB)`);
}

for (const [p, svg, size, background] of PNGS) {
  // Rasterise well above the target, then downsample: crisper edges than rendering at size.
  let img = sharp(Buffer.from(svg), { density: Math.max(72, (72 * size * 2) / 1000) }).resize(size, size);
  if (background) img = img.flatten({ background });
  const buf = await img.png({ compressionLevel: 9 }).toBuffer();

  const meta = await sharp(buf).metadata();
  if (meta.width !== size || meta.height !== size) {
    throw new Error(`${p}: rendered ${meta.width}×${meta.height}, expected ${size}×${size}`);
  }
  const { channels, isOpaque } = await sharp(buf).stats();
  const spread = channels.slice(0, 3).reduce((a, c) => a + c.stdev, 0);
  if (spread < 10) throw new Error(`${p}: rendered (nearly) blank`);
  if (background && !isOpaque) throw new Error(`${p}: expected an opaque background`);

  writeFileSync(at(p), buf);
  console.log(`wrote ${p} (${size}px, ${(buf.length / 1024).toFixed(0)} KB)`);
}
