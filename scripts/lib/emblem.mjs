// The ICHRO emblem, drawn in code (November 2026 refresh, at the client's request): the name
// written ONCE around the ring, the acronym once in the centre, and a real world-map globe at the
// foot of the ring where the old artwork had a clip-art dot.
//
// Two rules keep the artwork identical on every machine:
//   - There is no <text> anywhere. sharp/librsvg renders <text> with whatever fonts are
//     installed and exits 0 on a fallback, so every glyph is outlined from the vendored Cinzel
//     (SIL OFL, scripts/assets/logo/OFL.txt) and placed along the arc here, not by <textPath>.
//   - The globe is projected with d3-geo, whose orthographic clipping at the horizon is the
//     whole point: a hand-rolled projection draws far-side countries as streaks across the disc.
//
// Every layout limit is asserted (see EmblemError). A failure throws; it never ships a squeezed
// or clipped emblem.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { geoOrthographic, geoEquirectangular, geoPath, geoBounds } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import { ORG_NAME, ORG_ACRONYM } from './org-name.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const req = (p) => readFileSync(join(REPO, p));

export class EmblemError extends Error {}

/** The words on the ring. Upper-case of the official name — never retyped. */
export const RING_TEXT = `THE ${ORG_NAME.toUpperCase()}`;
export const TITLE = `The ${ORG_NAME} (${ORG_ACRONYM})`;

// Palette, sampled from the client's existing emblem and evened out.
export const C = {
  navy: '#12306a',
  navyDeep: '#0b2252',
  gold: '#c99a3b',
  goldDark: '#a67b25',
  goldLight: '#e2bf6a',
  blue: '#1f6fc4',
  green: '#2f8f22',
  scales: '#1d4f9a',
  navyBlade: '#1b2a78',
  mapTint: '#d5e6f5',
  paper: '#ffffff',
  paperTint: '#eef4fa',
  ocean: '#2e7cc4',
  oceanLight: '#64aee6',
  land: '#efe1b3',
  border: '#9a8656',
};

// Geometry, in a 1000-unit square. Ring band = INNER_R..OUTER_R.
const W = 1000;
const CX = 500;
const CY = 500;
const RIM_R = 500;
const OUTER_R = 488;
const INNER_R = 378;
const BAND_MID = (OUTER_R + INNER_R) / 2;
const RING_SWEEP_DEG = 292; // the name's arc; the remaining gap at 6 o'clock holds the two stars
const RING_TRACK_EM = 0.07;
const MIN_RING_CAP = 36; // below this the name stops reading at a 200px render
// Small, as on the printed emblem: it sits at the foot of the laurel, inside the white disc.
const GLOBE = { x: CX, y: 792, r: 50, keyline: 5, rotate: [-42, -12], borders: false };

let fonts;
function loadFonts() {
  if (fonts) return fonts;
  const parse = (f) => {
    const b = req(`scripts/assets/logo/${f}`);
    return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
  };
  fonts = { ring: parse('cinzel-latin-600-normal.woff'), word: parse('cinzel-latin-700-normal.woff') };
  return fonts;
}

const r2 = (n) => Math.round(n * 100) / 100;

/** Glyphs + advances (font units) for a string, refusing any character the font lacks. */
function shape(font, text, trackEm) {
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    if (text[i] !== ' ' && (!g || g.index === 0 || !g.path || g.path.commands.length === 0)) {
      throw new EmblemError(`font has no outline for "${text[i]}" in "${text}" (would render as tofu)`);
    }
  });
  const upm = font.unitsPerEm;
  const adv = glyphs.map((g, i) => {
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
    return g.advanceWidth + kern + (i < glyphs.length - 1 ? trackEm * upm : 0);
  });
  return { glyphs, adv, total: adv.reduce((a, b) => a + b, 0), upm, cap: font.tables.os2.sCapHeight };
}

/** The name around the ring, clockwise, centred on 12 o'clock. */
function ringText(fill) {
  const { ring } = loadFonts();
  const s = shape(ring, RING_TEXT, RING_TRACK_EM);
  // Solve the font size that makes the name span RING_SWEEP_DEG at the baseline radius, with
  // the cap height centred in the band. Two passes: the baseline depends on the cap height.
  let size = 50;
  let base = BAND_MID;
  for (let i = 0; i < 4; i++) {
    const cap = (s.cap / s.upm) * size;
    base = BAND_MID - cap / 2;
    size = (base * (RING_SWEEP_DEG * Math.PI)) / 180 / (s.total / s.upm);
  }
  const k = size / s.upm;
  const cap = s.cap * k;
  if (cap < MIN_RING_CAP)
    throw new EmblemError(`ring text cap height ${r2(cap)} < ${MIN_RING_CAP}: name too long for the ring`);
  if (base + cap > OUTER_R - 14 || base < INNER_R + 14) {
    throw new EmblemError(`ring text (baseline ${r2(base)}, cap ${r2(cap)}) does not sit inside the band`);
  }
  const sweep = ((s.total * k) / base) * (180 / Math.PI);
  if (sweep > RING_SWEEP_DEG + 0.5)
    throw new EmblemError(`ring text sweeps ${r2(sweep)}° > ${RING_SWEEP_DEG}°`);

  let cursor = -(s.total * k) / 2;
  const paths = [];
  s.glyphs.forEach((g, i) => {
    const w = g.advanceWidth * k;
    const theta = (cursor + w / 2) / base; // radians clockwise from 12 o'clock
    cursor += s.adv[i] * k;
    if (RING_TEXT[i] === ' ') return;
    const x = CX + base * Math.sin(theta);
    const y = CY - base * Math.cos(theta);
    const d = g.getPath(-w / 2, 0, size).toPathData(2);
    paths.push(
      `<path transform="translate(${r2(x)} ${r2(y)}) rotate(${r2((theta * 180) / Math.PI)})" d="${d}"/>`,
    );
  });
  return { svg: `<g fill="${fill}">${paths.join('')}</g>`, cap, sweep };
}

/** A straight, centred word (the acronym), fitted to a maximum width. */
function word(text, { y, size, maxWidth, fill }) {
  const { word: font } = loadFonts();
  const s = shape(font, text, 0.06);
  const k = size / s.upm;
  const width = s.total * k;
  if (width > maxWidth) throw new EmblemError(`"${text}" is ${r2(width)} wide, max ${maxWidth}`);
  let x = CX - width / 2;
  const d = s.glyphs.map((g, i) => {
    const p = g.getPath(x, y, size).toPathData(2);
    x += s.adv[i] * k;
    return p;
  });
  return `<path fill="${fill}" d="${d.join('')}"/>`;
}

let world;
// borders: country lines, which only read from about 150px up — the small marks leave them out.
function globe({ x, y, r, keyline, rotate, borders: withBorders = true, digits = 2 }) {
  world ??= JSON.parse(req('node_modules/world-atlas/countries-110m.json'));
  const proj = geoOrthographic().rotate(rotate).translate([x, y]).scale(r).clipAngle(90).precision(0.2);
  const path = geoPath(proj).digits(digits);
  const land = feature(world, world.objects.land);
  const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
  const landD = path(land);
  if (!landD) throw new EmblemError('globe: land path is empty');
  const [[x0, y0], [x1, y1]] = path.bounds(land);
  if (x0 < x - r - 1 || x1 > x + r + 1 || y0 < y - r - 1 || y1 > y + r + 1) {
    throw new EmblemError('globe: land escapes the disc (projection clipping failed)');
  }
  // Sudan must be on the visible face — the client's work centres on it.
  const sudan = world.objects.countries.geometries.find((g) => g.properties?.name === 'Sudan');
  if (sudan) {
    const [[lo0, la0], [lo1, la1]] = geoBounds(feature(world, sudan));
    const c = proj([(lo0 + lo1) / 2, (la0 + la1) / 2]);
    if (!c || Math.hypot(c[0] - x, c[1] - y) > r * 0.6)
      throw new EmblemError('globe: Sudan is not on the visible face');
  }
  const id = 'globe-ocean';
  return `
  <defs><radialGradient id="${id}" cx="0.36" cy="0.32" r="0.75">
    <stop offset="0" stop-color="${C.oceanLight}"/><stop offset="1" stop-color="${C.ocean}"/>
  </radialGradient></defs>
  <circle cx="${x}" cy="${y}" r="${r + keyline}" fill="${C.paper}"/>
  <circle cx="${x}" cy="${y}" r="${r + keyline}" fill="none" stroke="${C.gold}" stroke-width="3"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>
  <path d="${landD}" fill="${C.land}"/>
  ${withBorders ? `<path d="${path(borders)}" fill="none" stroke="${C.border}" stroke-width="0.7" stroke-linejoin="round"/>` : ''}
  <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C.navy}" stroke-width="2"/>`;
}

function star(cx, cy, R, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? R * 0.42 : R;
    pts.push(`${r2(cx + rr * Math.cos(a))},${r2(cy + rr * Math.sin(a))}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
}

/** Point on a circle around the centre; angle in degrees clockwise from 12 o'clock. */
const polar = (r, deg) => [
  CX + r * Math.sin((deg * Math.PI) / 180),
  CY - r * Math.cos((deg * Math.PI) / 180),
];

function laurel() {
  // Two full branches rising from either side of the globe to about 10 and 2 o'clock, with
  // broad leaves — the wreath is the emblem's main mass, as on the printed original.
  const R = 298;
  const from = 166; // degrees from 12 o'clock, at the foot
  const to = 50; // at the tip, clear of the acronym
  const leaves = [];
  const branch = (side) => {
    const s = side; // -1 left, +1 right
    const [ax, ay] = polar(R, s * from);
    const [bx, by] = polar(R, s * to);
    leaves.push(
      `<path d="M${r2(ax)} ${r2(ay)} A${R} ${R} 0 0 ${s < 0 ? 1 : 0} ${r2(bx)} ${r2(by)}" fill="none" stroke="${C.goldDark}" stroke-width="6" stroke-linecap="round"/>`,
    );
    const n = 10;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const deg = from - (from - to) * t;
      const len = 86 - 26 * t;
      const wid = len * 0.3; // half-width: a pointed olive leaf, not a round petal
      const [px, py] = polar(R, s * deg);
      // Tangent heading toward the tip, then splay each pair out and in.
      const heading = s * deg + (s < 0 ? 90 : -90);
      for (const [splay, r, fill] of [
        [-38, 0, C.gold],
        [38, 0, C.goldDark],
      ]) {
        const rot = heading + s * splay;
        // Widest a third of the way up, tapering to a sharp tip; a pale midrib gives it depth.
        leaves.push(
          `<g transform="translate(${r2(px)} ${r2(py)}) rotate(${r2(rot + r)})"><path fill="${fill}" d="M0 0C${r2(wid * 1.2)} ${r2(-len * 0.18)} ${r2(wid * 1.05)} ${r2(-len * 0.62)} 0 ${r2(-len)}C${r2(-wid * 1.05)} ${r2(-len * 0.62)} ${r2(-wid * 1.2)} ${r2(-len * 0.18)} 0 0Z"/><path d="M0 ${r2(-len * 0.08)}Q${r2(wid * 0.12)} ${r2(-len * 0.5)} 0 ${r2(-len * 0.86)}" fill="none" stroke="${C.goldLight}" stroke-width="2" stroke-linecap="round" opacity="0.7"/></g>`,
        );
      }
    }
    // A closing bud at the tip.
    const [tx, ty] = polar(R, s * (to - 3));
    const rot = s * to + (s < 0 ? 90 : -90);
    leaves.push(
      `<path transform="translate(${r2(tx)} ${r2(ty)}) rotate(${r2(rot)})" fill="${C.goldLight}" d="M0 0C14 -14 14 -36 0 -54C-14 -36 -14 -14 0 0Z"/>`,
    );
  };
  branch(-1);
  branch(1);
  return leaves.join('');
}

// The centre artwork is the client's own and is NOT redesigned here: the scales with their urn
// finial, three-string pans and tapering post; the blue and green figures, each with one arm
// raised and one reaching for the light between them; the torch of light. (The two navy blades
// at the foot are drawn by navyBlades(), fitted to the laurel.) It is re-drawn as clean vectors from the printed emblem — only made symmetric
// and level — on its own 960-unit grid (centre line x = 480), then placed by MOTIF.
const MOTIF = { top: 282, bottom: 742, gridTop: 40, gridBottom: 1040, gridCx: 480 };

function centreMotif() {
  const k = (MOTIF.bottom - MOTIF.top) / (MOTIF.gridBottom - MOTIF.gridTop);
  const tx = CX - MOTIF.gridCx * k;
  const ty = MOTIF.top - MOTIF.gridTop * k;
  const m = (x) => 960 - x; // mirror across the centre line, for the right-hand half
  const scale = C.scales;
  const pan = (x) => `
    <path d="M${x} 196L${x - 74} 386M${x} 196L${x} 386M${x} 196L${x + 74} 386" stroke="${scale}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M${x - 80} 384H${x + 80}A80 54 0 0 1 ${x - 80} 384Z" fill="${scale}"/>
    <circle cx="${x}" cy="196" r="15" fill="${scale}"/>`;
  // Left figure; the right one is its mirror image.
  const body = (f) =>
    `M${f(180)} 468C${f(200)} 560 ${f(235)} 625 ${f(300)} 662C${f(350)} 690 ${f(395)} 702 ${f(434)} 714C${f(386)} 730 ${f(342)} 748 ${f(320)} 790C${f(300)} 830 ${f(302)} 900 ${f(306)} 966C${f(258)} 880 ${f(205)} 760 ${f(186)} 640C${f(180)} 590 ${f(176)} 520 ${f(180)} 468Z`;
  const blade = (f) =>
    `M${f(34)} 886C${f(70)} 820 ${f(120)} 768 ${f(182)} 730C${f(188)} 758 ${f(193)} 784 ${f(198)} 806C${f(140)} 820 ${f(86)} 850 ${f(34)} 886Z`;
  const id = (x) => x;
  return `
  <defs><radialGradient id="motif-light" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#fbf4dc" stop-opacity="0.95"/><stop offset="0.55" stop-color="#f4ead0" stop-opacity="0.6"/><stop offset="1" stop-color="#f4ead0" stop-opacity="0"/>
  </radialGradient></defs>
  <g transform="translate(${r2(tx)} ${r2(ty)}) scale(${r2(k * 1000) / 1000})">
    <ellipse cx="480" cy="660" rx="120" ry="150" fill="url(#motif-light)"/>
    <path d="M430 640Q480 590 530 640L490 1040H470Z" fill="#f1e8cc" opacity="0.6"/>
    <path d="M471 860H489L486 1040H474Z" fill="${C.goldLight}" opacity="0.45"/>
    <path d="${blade(id)}" fill="${C.blue}"/><path d="${body(id)}" fill="${C.blue}"/>
    <circle cx="322" cy="582" r="52" fill="${C.blue}"/>
    <path d="${blade(m)}" fill="${C.green}"/><path d="${body(m)}" fill="${C.green}"/>
    <circle cx="${m(322)}" cy="582" r="52" fill="${C.green}"/>
    <path d="M462 190L498 190L496 236C494 310 488 400 484 492H476C472 400 466 310 464 236Z" fill="${scale}"/>
    <circle cx="480" cy="500" r="17" fill="${scale}"/>
    <path d="M250 188Q480 168 710 188L710 205Q480 190 250 205Z" fill="${scale}"/>
    ${pan(250)}${pan(710)}
    <path d="M480 40C496 62 530 76 532 106C534 136 506 150 500 166L506 178H454L460 166C454 150 426 136 428 106C430 76 464 62 480 40Z" fill="${scale}"/>
    <rect x="452" y="176" width="56" height="14" rx="6" fill="${scale}"/>
  </g>`;
}

/**
 * The two navy blades at the foot of the artwork, as on the original. They lie in the band
 * between the top of the laurel's lowest inner leaves and the figures' outer arms, following
 * the line of the leaves, so they sit beside the wreath rather than on it. assertClearances()
 * checks that nothing overlaps.
 */
function navyBlades() {
  const left = (f) =>
    `M${f(BLADE.tip[0])} ${BLADE.tip[1]}C${f(BLADE.c1[0])} ${BLADE.c1[1]} ${f(BLADE.c2[0])} ${BLADE.c2[1]} ${f(BLADE.end[0])} ${BLADE.end[1]}C${f(BLADE.c3[0])} ${BLADE.c3[1]} ${f(BLADE.c4[0])} ${BLADE.c4[1]} ${f(BLADE.tip[0])} ${BLADE.tip[1]}Z`;
  const id = (x) => x;
  const mirror = (x) => 2 * CX - x;
  return `<path d="${left(id)}" fill="${C.navyBlade}"/><path d="${left(mirror)}" fill="${C.navyBlade}"/>`;
}
// Left blade, in emblem units: a pointed outer tip, a fuller inner end.
const BLADE = {
  tip: [336, 676],
  c1: [360, 679],
  c2: [384, 688],
  end: [404, 701],
  c3: [388, 707],
  c4: [358, 693],
};

/** The faint world map behind the centre artwork, as on the original emblem. */
function backdropMap() {
  world ??= JSON.parse(req('node_modules/world-atlas/countries-110m.json'));
  const r = INNER_R - 14;
  const proj = geoEquirectangular()
    .rotate([-20, 0])
    .fitExtent(
      [
        [CX - r * 1.05, CY - r * 0.62],
        [CX + r * 1.05, CY + r * 0.78],
      ],
      { type: 'Sphere' },
    );
  const d = geoPath(proj).digits(1)(feature(world, world.objects.land));
  if (!d) throw new EmblemError('backdrop map: land path is empty');
  return `
  <defs><clipPath id="inner-disc"><circle cx="${CX}" cy="${CY}" r="${r}"/></clipPath></defs>
  <path d="${d}" fill="${C.mapTint}" clip-path="url(#inner-disc)"/>`;
}

/** The full emblem: ring with the name once, acronym, scales, figures, laurel, globe. */
export function emblemSvg() {
  const ring = ringText(C.paper);
  // Stars flank the globe in the ring's gap at 6 o'clock.
  const gap = (360 - ring.sweep) / 2; // half-gap, degrees each side of 6 o'clock
  const starDeg = 180 - Math.min(gap - 6, 21);
  const [s1x, s1y] = polar(BAND_MID, starDeg);
  const [s2x, s2y] = polar(BAND_MID, -starDeg);
  const globeAngle = (Math.asin((GLOBE.r + GLOBE.keyline) / (GLOBE.y - CY)) * 180) / Math.PI;
  if (180 - starDeg < globeAngle * 0.5) throw new EmblemError('stars collide with the globe');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" role="img" aria-labelledby="t">
  <title id="t">${TITLE}</title>
  <circle cx="${CX}" cy="${CY}" r="${RIM_R}" fill="${C.navyDeep}"/>
  <circle cx="${CX}" cy="${CY}" r="${OUTER_R}" fill="${C.navy}" stroke="${C.gold}" stroke-width="5"/>
  <circle cx="${CX}" cy="${CY}" r="${INNER_R}" fill="${C.paper}" stroke="${C.gold}" stroke-width="5"/>
  <circle cx="${CX}" cy="${CY}" r="${INNER_R - 14}" fill="${C.paperTint}"/>
  ${backdropMap()}
  ${ring.svg}
  ${star(s1x, s1y, 24, C.goldLight)}${star(s2x, s2y, 24, C.goldLight)}
  ${laurel()}
  ${word(ORG_ACRONYM, { y: 258, size: 88, maxWidth: 340, fill: C.navy })}
  ${centreMotif()}
  ${navyBlades()}
  ${globe(GLOBE)}
</svg>
`;
}

/**
 * The compact mark for 32–64px (the site header): the emblem's inner disc — laurel, scales,
 * figures, globe — without the ring lettering, the acronym or the faint backdrop map, which turn
 * to noise (and dead weight) at that size.
 */
export function markSvg() {
  const r = INNER_R + 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CX - r} ${CY - r} ${2 * r} ${2 * r}" role="img" aria-labelledby="t">
  <title id="t">${TITLE}</title>
  <circle cx="${CX}" cy="${CY}" r="${r}" fill="${C.navy}"/>
  <circle cx="${CX}" cy="${CY}" r="${INNER_R - 4}" fill="${C.paper}" stroke="${C.gold}" stroke-width="8"/>
  ${laurel()}
  ${centreMotif()}
  ${navyBlades()}
  ${globe({ ...GLOBE, digits: 1 })}
</svg>
`;
}

/** The favicon (16–32px): the globe medallion alone — the one shape that still reads that small. */
export function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" role="img" aria-labelledby="t">
  <title id="t">${TITLE}</title>
  <circle cx="${CX}" cy="${CY}" r="${RIM_R}" fill="${C.navy}"/>
  ${globe({ ...GLOBE, x: CX, y: CY, r: 400, keyline: 30, borders: false, digits: 0 })}
</svg>
`;
}

/**
 * Rasterises each layer on its own and fails if the navy blades touch the laurel, the figures or
 * the globe — "beside the wreath, not on it" is the client's explicit requirement. A geometric
 * check, so it holds whatever the blade or leaf coordinates become.
 */
export async function assertClearances(sharp) {
  const PX = 2; // pixels per unit
  const solo = (inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${W * PX}" height="${W * PX}">${inner}</svg>`;
  const alpha = async (inner) =>
    (
      await sharp(Buffer.from(solo(inner)))
        .ensureAlpha()
        .extractChannel(3)
        .raw()
        .toBuffer({ resolveWithObject: true })
    ).data;
  const blades = await alpha(navyBlades());
  const others = {
    laurel: await alpha(laurel()),
    'centre artwork': await alpha(centreMotif()),
    globe: await alpha(globe(GLOBE)),
  };
  const clearance = 3 * PX; // demand a visible gap, not just non-touching pixels
  const near = new Uint8Array(blades.length);
  const w = W * PX;
  for (let i = 0; i < blades.length; i++) {
    if (blades[i] < 128) continue;
    const x = i % w;
    const y = (i - x) / w;
    for (let dy = -clearance; dy <= clearance; dy++)
      for (let dx = -clearance; dx <= clearance; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx >= 0 && yy >= 0 && xx < w && yy < w) near[yy * w + xx] = 1;
      }
  }
  for (const [name, a] of Object.entries(others)) {
    let hits = 0;
    for (let i = 0; i < a.length; i++) if (near[i] && a[i] >= 128) hits++;
    if (hits)
      throw new EmblemError(`navy blades come within ${clearance / PX} units of the ${name} (${hits} px)`);
  }
}
