// Generates the branded typographic press cards used as the ARABIC and FRENCH
// covers for the 16 July 2026 statement of condemnation (cargo trucks on the
// El Fasher–Al Koma road). Portrait 1200x1600, same visual family as the
// procedural-bias cards.
//
//   node scripts/gen-cargo-trucks-cover.mjs       # ar + fr
//   node scripts/gen-cargo-trucks-cover.mjs ar    # just one
//
// There is deliberately NO `en` entry: the English cover is the supplied press
// card (press/press-1/1.jpg → cover.jpg), and an `en` entry here would emit the
// same filename and silently overwrite it.
//
// Swap a cover for real photography by replacing the emitted JPEG, or by
// uploading a new cover through /admin (which mints its own URL).
//
// Two rendering constraints worth knowing before you edit this file:
//  1. logo.png has an opaque navy backdrop (#1D5277), not transparency — hence the
//     white chip behind the masthead mark and the circular clip on the watermark.
//  2. Arabic must lay out right-to-left. librsvg/Pango shapes the glyphs correctly,
//     but `text-anchor="end"` fights `direction="rtl"` and pushes lines off-canvas.
//     The working combination is direction="rtl" + text-anchor="start" anchored at
//     the RIGHT margin. Letter-spacing is also left at 0 for Arabic, since spacing
//     between clusters visually breaks the joins.
//
// Since 20 October 2026 this file is CONFIG ONLY: the card is drawn by the shared generator
// (scripts/lib/press-card.mjs), which also carries the colour themes and the overflow gate.
// Render with:
//   FORCE=1 node scripts/gen-press-cover.mjs scripts/gen-cargo-trucks-cover.mjs
// then FORCE=1 node scripts/gen-image-variants.mjs condemnation-cargo-trucks-el-fasher-al-koma-july-2026

export const SLUG = 'condemnation-cargo-trucks-el-fasher-al-koma-july-2026';

// Cover colour (scripts/lib/press-card.mjs THEMES).
export const COVER_THEME = 'azure';

const LATIN = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const ARABIC = "'Geeza Pro', 'Al Bayan', sans-serif";

export const COVERS = {
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: LATIN,
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION DE CONDAMNATION',
    headline: ['Ciblage de camions de fret', 'commerciaux sur la route', 'El Fasher–Al Koma, au Soudan'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Genève',
    date: '16 JUILLET 2026',
    chipW: 300,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: ARABIC,
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان إدانة',
    headline: ['استهداف شاحنات نقل البضائع', 'التجارية على طريق', 'الفاشر – الكومة في السودان'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'جنيف',
    date: '16 يوليو 2026',
    chipW: 240,
  },
};
