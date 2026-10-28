// The client's "photo card": the square 1600x1600 statement cover the client designs
// themselves (see the Al-Zawiya Ghara statement, August 2026) — a red-toned image band cut
// by a diagonal, the client's badge on the cut, a navy label, the organisation in black, the
// headline in red, a dateline, a rule and the lead paragraph. This module reproduces that
// layout for statements that arrive as text only, so the newsroom stays consistent.
//
// The image band is either
//   - a PHOTO the client supplied (greyscaled and toned red, as the client does), or
//   - a MAP of Sudan with the place of the event marked (`band.map = 'sudan'`), drawn from
//     Natural Earth (public domain) — used when there is no photo. Disputed areas (Hala'ib,
//     Bir Tawil) are hatched and attributed to neither state, as on UN maps.
// Never put an unrelated photo in the band: the card is read as a picture of the event.
//
// Rendering is HTML through headless Chrome (macOS: /Applications/Google Chrome.app), not
// SVG through sharp: the card needs wrapped, justified paragraphs in Arabic and French,
// which librsvg cannot lay out. Fonts (Poppins, Cairo — both OFL) and the badge are inlined
// as data URIs, so the page loads nothing from the network or the filesystem.
//
// Fitting: the page shrinks the lead, then the headline, then the organisation line until
// the text clears the footer marks, and reports what it did. A card that still overflows at
// the minimum sizes fails loudly. That gate only sees geometry — OPEN EVERY JPEG and look
// at it (Arabic joins, the date's direction, a line that reads badly).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ASSETS = join(REPO, 'scripts', 'assets', 'photo-card');
export const SIZE = 1600;

export const CHROME =
  process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// The client's palette, sampled from their cards.
const RED = '#e3262d';
const NAVY = '#182b5c';
const INK = '#1d1d1d';
const PAPER = '#f2f2f2';

// The diagonal: from (0, CUT_L) on the left edge to (SIZE, CUT_R) on the right.
const CUT_L = 860;
const CUT_R = 530;
// The badge sits on the cut, right of centre, exactly where the client puts it.
const BADGE = { cx: 1125, cy: 728, d: 306 };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dataUri = (file, mime) => `data:${mime};base64,${readFileSync(file).toString('base64')}`;

// ---------------------------------------------------------------------------------- map
// Equirectangular, scaled for the band: Sudan spans x≈380–1130, y≈70–660, which keeps it
// above the cut and clear of the badge, with Darfur in the deep left of the band.
const PROJ = { lon0: 21.8, lat0: 22, k: 44.6, x0: 380, y0: 70 };
const px = (lon, lat) => [PROJ.x0 + (lon - PROJ.lon0) * PROJ.k, PROJ.y0 + (PROJ.lat0 - lat) * PROJ.k];
const ringPath = (ring) =>
  'M' +
  ring
    .map(([lo, la]) =>
      px(lo, la)
        .map((v) => v.toFixed(1))
        .join(','),
    )
    .join('L') +
  'Z';

// Where each neighbour's name goes (lon, lat). Only those listed in `mapLabels.neighbours`
// are drawn, so a locale can leave one out.
const NEIGHBOUR_AT = {
  EGY: [29.2, 25.2],
  LBY: [19.4, 25.2],
  TCD: [17.9, 16.2],
  SDS: [29.5, 8.9],
  CAF: [20.6, 7.4],
  ETH: [38.7, 11.9],
  ERI: [39.1, 16.0],
  SAU: [43.3, 22.6],
};

function mapSvg(band, labels, rtl, font) {
  const geo = JSON.parse(readFileSync(join(ASSETS, 'sudan-region.json'), 'utf8'));
  const focus = band.focus ?? 'SDN';
  const others = Object.entries(geo.countries)
    .filter(([a]) => a !== focus)
    .map(([, rings]) => rings.map(ringPath).join(''))
    .join('');
  const sudan = geo.countries[focus].map(ringPath).join('');
  const disputed = Object.values(geo.disputed)
    .map((rings) => rings.map(ringPath).join(''))
    .join('');

  let grid = '';
  for (let lon = 10; lon <= 50; lon += 5) {
    const [x] = px(lon, 0);
    grid += `M${x.toFixed(1)},0V${SIZE}`;
  }
  for (let lat = 0; lat <= 30; lat += 5) {
    const [, y] = px(0, lat);
    grid += `M0,${y.toFixed(1)}H${SIZE}`;
  }

  const lsp = rtl ? 0 : 6;
  const names = Object.entries(labels.neighbours ?? {})
    .filter(([a]) => NEIGHBOUR_AT[a])
    .map(([a, name]) => {
      const [x, y] = px(...NEIGHBOUR_AT[a]);
      return `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" font-size="24" font-weight="600" letter-spacing="${lsp}" fill="rgba(255,255,255,.34)">${esc(name)}</text>`;
    })
    .join('');

  const [cx, cy] = px(30.0, 15.7);
  const country = `<text x="${cx.toFixed(0)}" y="${cy.toFixed(0)}" text-anchor="middle" font-size="72" font-weight="700" letter-spacing="${rtl ? 0 : 22}" fill="rgba(255,255,255,.26)">${esc(labels.country)}</text>`;

  const m = band.marker;
  const [mx, my] = px(m.lon, m.lat);
  // Label to the right of the pin, toward the open map. With direction="rtl", text-anchor
  // "end" is the LEFT edge of the text — so RTL anchors "end" there, LTR anchors "start".
  const lx = mx + 46;
  const anchor = rtl ? 'end' : 'start';
  const marker = `
    <circle cx="${mx}" cy="${my}" r="150" fill="url(#glow)"/>
    <circle cx="${mx}" cy="${my}" r="70" fill="none" stroke="${RED}" stroke-opacity=".45" stroke-width="2"/>
    <circle cx="${mx}" cy="${my}" r="42" fill="none" stroke="${RED}" stroke-opacity=".8" stroke-width="3"/>
    <circle cx="${mx}" cy="${my}" r="15" fill="#fff" stroke="${RED}" stroke-width="7"/>
    <text x="${lx}" y="${my - 4}" text-anchor="${anchor}" font-size="40" font-weight="800" letter-spacing="${rtl ? 0 : 5}" fill="#fff">${esc(labels.marker)}</text>
    ${labels.markerSub ? `<text x="${lx}" y="${my + 34}" text-anchor="${anchor}" font-size="25" font-weight="600" letter-spacing="${rtl ? 0 : 2}" fill="rgba(255,255,255,.82)">${esc(labels.markerSub)}</text>` : ''}`;

  return `
  <svg class="band" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg" font-family="${font}" direction="${rtl ? 'rtl' : 'ltr'}">
    <defs>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a0a0d"/><stop offset="1" stop-color="#3a1217"/>
      </linearGradient>
      <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a8343c"/><stop offset="1" stop-color="#7b2128"/>
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="#ff5a5f" stop-opacity=".55"/><stop offset="1" stop-color="#ff5a5f" stop-opacity="0"/></radialGradient>
      <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="12" height="12" fill="#5b1d24"/><line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255,255,255,.45)" stroke-width="3"/>
      </pattern>
    </defs>
    <rect width="${SIZE}" height="${SIZE}" fill="url(#sea)"/>
    <path d="${grid}" stroke="rgba(255,255,255,.05)" stroke-width="1.5" fill="none"/>
    <path d="${others}" fill="#4a1a20" stroke="rgba(255,255,255,.16)" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="${sudan}" fill="url(#land)" stroke="rgba(255,255,255,.6)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="${disputed}" fill="url(#hatch)" stroke="rgba(255,255,255,.6)" stroke-width="1.6" stroke-dasharray="6 5"/>
    ${names}${country}${marker}
  </svg>`;
}

function photoSvg(photoFile) {
  const mime = photoFile.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
  // Greyscale, then a red multiply — the client's treatment of their own photos.
  return `
  <svg class="band" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="grey"><feColorMatrix type="saturate" values="0"/></filter></defs>
    <image href="${dataUri(photoFile, mime)}" x="0" y="0" width="${SIZE}" height="${CUT_L + 40}" preserveAspectRatio="xMidYMid slice" filter="url(#grey)"/>
    <rect width="${SIZE}" height="${CUT_L + 40}" fill="#e0484c" style="mix-blend-mode:multiply"/>
  </svg>`;
}

// ---------------------------------------------------------------------------------- page
export function buildHtml(c) {
  const rtl = !!c.rtl;
  const font = rtl ? 'Cairo' : 'Poppins';
  const f = (name) => dataUri(join(ASSETS, 'fonts', name), 'font/ttf');
  const band = c.band.photo ? photoSvg(c.band.photo) : mapSvg(c.band, c.mapLabels ?? {}, rtl, font);

  // Faint red slashes behind everything below the cut, as on the client's cards.
  const slash = (x, y, w, h, o) =>
    `<polygon points="${x + h * 0.36},${y} ${x + h * 0.36 + w},${y} ${x + w},${y + h} ${x},${y + h}" fill="${RED}" fill-opacity="${o}"/>`;

  return `<!doctype html>
<html lang="${c.lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8">
<style>
@font-face{font-family:Poppins;font-weight:400;src:url(${f('Poppins-Regular.ttf')})}
@font-face{font-family:Poppins;font-weight:600;src:url(${f('Poppins-SemiBold.ttf')})}
@font-face{font-family:Poppins;font-weight:700;src:url(${f('Poppins-Bold.ttf')})}
@font-face{font-family:Poppins;font-weight:800;src:url(${f('Poppins-ExtraBold.ttf')})}
@font-face{font-family:Cairo;font-weight:200 1000;src:url(${f('Cairo-Variable.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${SIZE}px;height:${SIZE}px;overflow:hidden;background:${PAPER}}
body{position:relative;font-family:${font},sans-serif;color:${INK};-webkit-font-smoothing:antialiased}
.layer{position:absolute;inset:0}
.band{position:absolute;inset:0;width:${SIZE}px;height:${SIZE}px}
#bandclip{clip-path:polygon(0 0,${SIZE}px 0,${SIZE}px ${CUT_R}px,0 ${CUT_L}px)}
.badge{position:absolute;left:${BADGE.cx - BADGE.d / 2}px;top:${BADGE.cy - BADGE.d / 2}px;width:${BADGE.d}px;height:${BADGE.d}px;border-radius:50%;box-shadow:0 10px 34px rgba(0,0,0,.35)}
#text{position:absolute;left:105px;right:105px;top:900px;display:flex;flex-direction:column;align-items:center}
.label{background:${NAVY};color:#fff;font-weight:800;font-size:40px;line-height:1.3;padding:6px 26px;letter-spacing:${rtl ? 0 : '.02em'}}
.org{margin-top:20px;text-wrap:balance;font-weight:700;font-size:var(--org,40px);line-height:1.22;text-align:center;letter-spacing:${rtl ? 0 : '.01em'}}
.head{margin-top:6px;text-wrap:balance;font-weight:${rtl ? 800 : 700};color:${RED};font-size:var(--head,46px);line-height:1.28;text-align:center}
.meta{align-self:stretch;margin-top:30px;font-weight:700;font-size:38px;line-height:1.3;text-align:start}
.rule{align-self:flex-start;width:220px;height:7px;background:${INK};margin:12px 0 22px}
.lead{align-self:stretch;font-weight:400;font-size:var(--lead,36px);line-height:1.4;text-align:justify;text-align-last:start;color:#2a2a2a}
${rtl ? '' : '.org,.head{text-transform:uppercase}'}
</style></head>
<body>
<svg class="layer" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  ${slash(1300, 560, 120, 190, 0.17)}${slash(1450, 600, 90, 160, 0.17)}${slash(120, 800, 100, 140, 0.15)}
  ${slash(660, 700, 110, 120, 0.15)}${slash(960, 930, 230, 670, 0.06)}${slash(330, 1100, 140, 500, 0.05)}
</svg>
<div class="layer" id="bandclip">${band}
  <svg class="band" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="edge" gradientUnits="userSpaceOnUse" x1="800" y1="${(CUT_L + CUT_R) / 2}" x2="772" y2="${(CUT_L + CUT_R) / 2 - 150}">
      <stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
    <rect width="${SIZE}" height="${SIZE}" fill="url(#edge)"/>
  </svg>
</div>
<img class="badge" src="${dataUri(join(ASSETS, 'badge.png'), 'image/png')}" alt="">
<div id="text">
  <div class="label">${esc(c.label)}</div>
  <div class="org">${esc(c.org)}</div>
  <div class="head">${esc(c.headline)}</div>
  <div class="meta"><div>${esc(c.dateline)}</div><div>${esc(c.date)}</div></div>
  <div class="rule"></div>
  <div class="lead">${esc(c.lead)}</div>
</div>
<svg class="layer" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  ${[0, 1, 2].map((i) => `<polygon points="${1414 + i * 30},1524 ${1436 + i * 30},1524 ${1430 + i * 30},1542 ${1408 + i * 30},1542" fill="${RED}"/>`).join('')}
</svg>
<script>
// Shrink to fit above the footer marks: lead first, then headline, then organisation line.
(async () => {
  await document.fonts.ready;
  const LIMIT = 1496, text = document.getElementById('text'), root = document.documentElement.style;
  const steps = [['--lead', 36, 30], ['--head', 46, 40], ['--org', 40, 34]];
  const size = Object.fromEntries(steps.map(([k, v]) => [k, v]));
  const bottom = () => text.getBoundingClientRect().bottom;
  for (const [k, , min] of steps) {
    while (bottom() > LIMIT && size[k] > min) { size[k] -= 1; root.setProperty(k, size[k] + 'px'); }
  }
  const lines = (el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
  document.body.dataset.fit = JSON.stringify({
    bottom: Math.round(bottom()), limit: LIMIT, ok: bottom() <= LIMIT, size,
    lines: { org: lines(document.querySelector('.org')), head: lines(document.querySelector('.head')), lead: lines(document.querySelector('.lead')) },
    fonts: [...document.fonts].filter((x) => x.status === 'loaded').map((x) => x.family + ' ' + x.weight),
  });
})();
</script>
</body></html>`;
}

function chrome(args) {
  if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME} — set CHROME_BIN.`);
  return execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${SIZE},${SIZE}`,
      '--virtual-time-budget=10000',
      ...args,
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 },
  );
}

// Renders one card to `out` (JPEG). Returns the fit report; throws if the text overflows.
export async function renderPhotoCard(c, out) {
  const dir = mkdtempSync(join(tmpdir(), 'photo-card-'));
  try {
    const html = join(dir, 'card.html');
    writeFileSync(html, buildHtml(c));
    const url = `file://${html}`;

    const dom = chrome(['--dump-dom', url]);
    const m = dom.match(/data-fit="([^"]*)"/);
    if (!m) throw new Error('the page never reported its fit — did the fonts load?');
    const fit = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
    if (!fit.ok) {
      throw new Error(
        `text overflows: bottom ${fit.bottom}px > ${fit.limit}px even at the minimum sizes ${JSON.stringify(fit.size)} — shorten the lead or the headline.`,
      );
    }
    const want = c.rtl ? ['Cairo'] : ['Poppins'];
    for (const fam of want) {
      if (!fit.fonts.some((x) => x.startsWith(fam)))
        throw new Error(`${fam} did not load: ${fit.fonts.join(', ')}`);
    }

    const png = join(dir, 'card.png');
    chrome([`--screenshot=${png}`, url]);
    const meta = await sharp(png).metadata();
    if (meta.width !== SIZE || meta.height !== SIZE) {
      throw new Error(`Chrome returned ${meta.width}x${meta.height}, expected ${SIZE}x${SIZE}.`);
    }
    await sharp(png).flatten({ background: PAPER }).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
    return fit;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
