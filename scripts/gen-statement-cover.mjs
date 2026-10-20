// Generates the branded typographic press cards used as covers for the Sudan
// procedural-bias statement — one per locale, in the same visual family as the
// photo cards. Portrait 1200x1600 (matches the FFM cover's 1198x1600).
//
//   node scripts/gen-statement-cover.mjs          # all locales
//   node scripts/gen-statement-cover.mjs ar       # just one
//
// Swap the cover for real photography by replacing the emitted JPEG, or by
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
//   FORCE=1 node scripts/gen-press-cover.mjs scripts/gen-statement-cover.mjs
// then FORCE=1 node scripts/gen-image-variants.mjs procedural-bias-selective-handling-sudan-july-2026

export const SLUG = 'procedural-bias-selective-handling-sudan-july-2026';

// Cover colour (scripts/lib/press-card.mjs THEMES).
export const COVER_THEME = 'oxblood';

const LATIN = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const ARABIC = "'Geeza Pro', 'Al Bayan', sans-serif";

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: LATIN,
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'IMPORTANT STATEMENT',
    headline: ['On Procedural Bias and the', 'Selective Handling of Human', 'Rights Violations in Sudan'],
    headSize: 62,
    headLh: 82,
    headTop: 470,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Geneva',
    date: '09 JULY 2026',
    chipW: 286,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: LATIN,
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION IMPORTANTE',
    headline: [
      'Sur la partialité procédurale',
      'et le traitement sélectif des',
      "violations des droits de l'homme",
      'au Soudan',
    ],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Genève',
    date: '09 JUILLET 2026',
    chipW: 300,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: ARABIC,
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان هام',
    headline: ['بشأن الانحياز الإجرائي والانتقائية', 'في التعامل مع انتهاكات حقوق الإنسان', 'في السودان'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'جنيف',
    date: '09 يوليو 2026',
    chipW: 240,
  },
};
