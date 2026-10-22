// The branded typographic press card: a portrait 1200x1600 statement cover (navy/gold by
// default, or one of THEMES),
// rendered as SVG and rasterized by sharp. Shared by every statement's cover generator.
//
// buildSvg() below was moved here VERBATIM from scripts/gen-statement-cover.mjs. Do not
// "tidy" it — it encodes rendering behaviour that is easy to break and whose breakage
// sharp reports as success (exit 0, wrong pixels):
//
//  1. logo.png has an opaque navy backdrop (#1D5277), not transparency — hence the white
//     chip behind the masthead mark and the circular clip on the watermark.
//  2. Arabic must lay out right-to-left. librsvg/Pango shapes the glyphs correctly, but
//     `text-anchor="end"` fights `direction="rtl"` and pushes lines off-canvas. The working
//     combination is direction="rtl" + text-anchor="start" anchored at the RIGHT margin.
//  3. Letter-spacing stays 0 for Arabic — spacing between clusters breaks the glyph joins.
//  4. Any string mixing digits with Arabic (a date) needs its own direction="rtl", or the
//     year binds to the month and "16 يوليو 2026" renders as "يوليو 2026 16".
//
// Headlines are hand-broken arrays: nothing here wraps. assertFits() below measures the
// rendered ink so an overlong line fails loudly instead of silently running off-canvas —
// but it CANNOT see mis-shaped joins, a wrong-direction date, or a missing Arabic font
// rendering tofu. Always open the JPEG and look at it.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const W = 1200;
export const H = 1600;
export const M = 88; // margin
export const USABLE_W = W - M * 2;

// Layout landmarks the headline must not collide with.
const GOLD_RULE_Y = 800;
const STANDFIRST_Y = 884;

// Colour themes. Each card is one deep gradient (from -> to) with a warm accent for the
// eyebrow and the rule, so a row of text-only covers on /news reads as a set without being
// identical. Every `from` keeps white text at WCAG AA or better (>= 4.5:1, most >= 7:1); the
// accent is only ever used for the bold eyebrow and a rule. `ink` is the city name on the
// white location chip. 'navy' is the house default and the original card.
export const THEMES = {
  navy: { from: '#1a4a68', to: '#0f2f49', accent: '#C9A227', ink: '#1a4a68' },
  oxblood: { from: '#7a1f2b', to: '#45101a', accent: '#E3B861', ink: '#7a1f2b' },
  azure: { from: '#16649e', to: '#0b3a62', accent: '#F2C55C', ink: '#16649e' },
  teal: { from: '#0f5c5a', to: '#073735', accent: '#DDB75E', ink: '#0f5c5a' },
  plum: { from: '#4e2a63', to: '#2a1639', accent: '#E0B866', ink: '#4e2a63' },
  graphite: { from: '#333f4b', to: '#161d24', accent: '#E8894A', ink: '#333f4b' },
  forest: { from: '#22533e', to: '#11301f', accent: '#D9B75E', ink: '#22533e' },
  terracotta: { from: '#9a3a1e', to: '#521a0b', accent: '#F4C86A', ink: '#9a3a1e' },
  // A LIGHT theme: pale warm grey ("couture grey") with near-black type and an antique-gold
  // accent. text 14.1:1 / 11.4:1, accent 4.8:1. `text` flips every white text and rule to dark;
  // the white chips get a hairline so they hold against the pale ground.
  pearl: { from: '#ece7e0', to: '#d8d0c5', accent: '#7d5f33', ink: '#1c1a18', text: '#1c1a18' },
};

function themeOf(c) {
  const name = c.theme ?? 'navy';
  const t = THEMES[name];
  if (!t) throw new Error(`unknown cover theme "${name}" — one of ${Object.keys(THEMES).join(', ')}`);
  return t;
}

export const LATIN = "'Helvetica Neue', Helvetica, Arial, sans-serif";
// Noto Sans Arabic (the site's webfont) is not installed locally; Geeza Pro is the
// macOS system naskh and carries a true bold. On Linux/CI fontconfig falls back
// silently — generate covers on macOS only.
export const ARABIC = "'Geeza Pro', 'Al Bayan', sans-serif";

// Resolved against the repo root, not the cwd, so the generator works from anywhere.
const logoUri = `data:image/png;base64,${readFileSync(join(REPO, 'public', 'logo.png')).toString('base64')}`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildSvg(c) {
  const { from: NAVY, to: NAVY_DARK, accent: GOLD, ink: INK, text: TEXT = '#ffffff' } = themeOf(c);
  // Light themes keep the white chips but outline them, or they dissolve into the background.
  const chipEdge = TEXT === '#ffffff' ? '' : `stroke="${TEXT}" stroke-opacity="0.18" stroke-width="2"`;
  const ax = c.rtl ? W - M : M; // inline-start anchor
  // In RTL, text-anchor="start" resolves to the right edge; see the header note.
  const flow = c.rtl ? `direction="rtl" text-anchor="start"` : '';
  const ls = (v) => (c.rtl ? '' : `letter-spacing="${v}"`); // spacing breaks Arabic joins

  const headline = c.headline
    .map(
      (line, i) =>
        `<text x="${ax}" y="${c.headTop + i * c.headLh}" ${flow} font-family="${c.font}" font-size="${c.headSize}" font-weight="700" fill="${TEXT}">${esc(line)}</text>`,
    )
    .join('\n  ');

  const standfirst = c.standfirst
    .map(
      (line, i) =>
        `<text x="${ax}" y="${884 + i * 44}" ${flow} font-family="${c.font}" font-size="31" fill="${TEXT}" opacity="0.86">${esc(line)}</text>`,
    )
    .join('\n  ');

  // masthead: logo chip, then wordmark + org line beside it
  const chipX = c.rtl ? W - M - 120 : M;
  const markX = c.rtl ? W - M - 148 : M + 148;

  // location chip: pin sits on the inline-start side, date trails on the inline-end side
  const locX = c.rtl ? W - M - c.chipW : M;
  const pinX = c.rtl ? W - M - 64 : M + 26;
  const cityX = c.rtl ? W - M - 82 : M + 82;
  // The date mixes digits with an Arabic month, so it MUST carry direction="rtl":
  // in an LTR paragraph the year binds to the month name and renders "يوليو 2026 09".
  const dateAttrs = c.rtl ? `x="${W - M - c.chipW - 34}" ${flow}` : `x="${M + c.chipW + 34}"`;

  // watermark seal bleeds off the inline-end bottom corner
  const wmX = c.rtl ? W - 620 - 880 : 620;
  const wmCx = c.rtl ? W - 1058 : 1058;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_DARK}"/>
    </linearGradient>
    <clipPath id="seal"><circle cx="${wmCx}" cy="1331" r="414"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <g clip-path="url(#seal)">
    <image href="${logoUri}" x="${wmX}" y="900" width="880" height="866" opacity="0.07"/>
  </g>

  <!-- masthead -->
  <rect x="${chipX}" y="92" width="120" height="118" rx="12" fill="#ffffff" ${chipEdge}/>
  <image href="${logoUri}" x="${chipX + 8}" y="100" width="104" height="102"/>
  <text x="${markX}" y="152" ${flow} font-family="${LATIN}" font-size="44" font-weight="700" fill="${TEXT}" letter-spacing="2">ICHRO</text>
  <text x="${markX}" y="185" ${flow} font-family="${c.font}" font-size="15" font-weight="500" fill="${TEXT}" opacity="0.62" ${ls(2.6)}>${esc(c.org)}</text>

  <rect x="${M}" y="288" width="${W - M * 2}" height="1.5" fill="${TEXT}" opacity="0.18"/>

  <!-- eyebrow -->
  <text x="${ax}" y="372" ${flow} font-family="${c.font}" font-size="25" font-weight="700" fill="${GOLD}" ${ls(6.5)}>${esc(c.eyebrow)}</text>

  <!-- headline -->
  ${headline}

  <rect x="${c.rtl ? W - M - 132 : M}" y="800" width="132" height="5" fill="${GOLD}"/>

  <!-- standfirst -->
  ${standfirst}

  <!-- location chip + date -->
  <rect x="${locX}" y="1042" width="${c.chipW}" height="74" rx="10" fill="#ffffff" ${chipEdge}/>
  <g transform="translate(${pinX}, 1060) scale(1.6)">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="none" stroke="#d64541" stroke-width="2.2"/>
    <circle cx="12" cy="10" r="3" fill="none" stroke="#d64541" stroke-width="2.2"/>
  </g>
  <text x="${cityX}" y="1092" ${flow} font-family="${c.font}" font-size="34" font-weight="700" fill="${INK}">${esc(c.city)}</text>
  <text ${dateAttrs} y="1092" font-family="${c.font}" font-size="26" font-weight="500" fill="${TEXT}" opacity="0.72" ${ls(3.2)}>${esc(c.date)}</text>

  <!-- footer -->
  <rect x="${M}" y="1430" width="${W - M * 2}" height="1.5" fill="${TEXT}" opacity="0.18"/>
  <text x="${W / 2}" y="1500" text-anchor="middle" font-family="${LATIN}" font-size="24" font-weight="500" fill="${TEXT}" opacity="0.68" letter-spacing="4">ICHR-INTERNATIONAL.ORG</text>
</svg>`;
}

// ---- overflow gate ----
// sharp exposes no text metrics, so measure the real thing: render the line alone,
// black on white, and trim to its ink bounding box. That reflects actual Pango shaping,
// including Arabic ligatures. Two traps: trim needs threshold:1 to survive antialiasing,
// and an RTL probe must be anchored at the RIGHT edge — anchored left it flows
// off-canvas and measures ~17px instead of ~700px.
export async function measureInk(text, { size, font, rtl = false, weight = 700, letterSpacing = 0 }) {
  if (!text.trim()) return 0;
  const x = rtl ? W - M : M;
  const flow = rtl ? 'direction="rtl" text-anchor="start"' : '';
  const ls = rtl || !letterSpacing ? '' : `letter-spacing="${letterSpacing}"`;
  const probeH = Math.ceil(size * 2.5);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${probeH}">
    <rect width="${W}" height="${probeH}" fill="#ffffff"/>
    <text x="${x}" y="${Math.round(size * 1.6)}" ${flow} font-family="${font}" font-size="${size}" font-weight="${weight}" fill="#000000" ${ls}>${esc(text)}</text>
  </svg>`;
  try {
    const { info } = await sharp(Buffer.from(svg))
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });
    return info.width;
  } catch {
    // sharp throws when trim finds a uniform image — i.e. nothing rendered at all.
    return 0;
  }
}

/**
 * Throws if a locale's card would overflow horizontally or collide vertically.
 * Returns the per-line measurements so the caller can log them.
 */
export async function assertFits(locale, c) {
  const problems = [];
  const lines = [];

  for (const line of c.headline) {
    const ink = await measureInk(line, { size: c.headSize, font: c.font, rtl: c.rtl });
    lines.push({ line, ink });
    if (ink > USABLE_W) {
      problems.push(
        `headline line "${line}" is ${ink}px wide, over the ${USABLE_W}px column — re-break it or drop headSize`,
      );
    }
    if (ink === 0) {
      problems.push(`headline line "${line}" rendered NOTHING — missing font, or an empty string`);
    }
  }

  // The masthead org line sits beside the logo chip, from M + 148 to the far margin. The
  // longer name (20 October 2026) made the French line a real overflow risk.
  const orgW = W - M * 2 - 148;
  const orgInk = await measureInk(c.org, {
    size: 15,
    font: c.font,
    rtl: c.rtl,
    weight: 500,
    letterSpacing: 2.6,
  });
  if (orgInk > orgW)
    problems.push(`masthead org line is ${orgInk}px wide, over the ${orgW}px beside the logo`);

  for (const line of c.standfirst ?? []) {
    const ink = await measureInk(line, { size: 31, font: c.font, rtl: c.rtl, weight: 400 });
    if (ink > USABLE_W) problems.push(`standfirst "${line}" is ${ink}px wide, over ${USABLE_W}px`);
  }

  const lastBaseline = c.headTop + (c.headline.length - 1) * c.headLh;
  const descender = Math.ceil(c.headSize * 0.3);
  if (lastBaseline + descender > GOLD_RULE_Y) {
    problems.push(
      `headline ends at y=${lastBaseline + descender} and collides with the gold rule at y=${GOLD_RULE_Y} — ` +
        `lower headTop (${c.headTop}), headLh (${c.headLh}) or the line count (${c.headline.length})`,
    );
  }
  if (lastBaseline + descender > STANDFIRST_Y)
    problems.push(`headline overlaps the standfirst at y=${STANDFIRST_Y}`);

  if (problems.length) {
    throw new Error(`[${locale}] cover card does not fit:\n  - ${problems.join('\n  - ')}`);
  }
  return lines;
}

/** Rasterize one locale's card. Callers own the overwrite policy. */
export async function renderCard(c, outPath) {
  await sharp(Buffer.from(buildSvg(c)))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);
  return sharp(outPath).metadata();
}

export { buildSvg };
