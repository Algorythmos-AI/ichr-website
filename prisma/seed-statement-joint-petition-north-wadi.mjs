// Press release, Geneva, 21 October 2026 — the Coalition submits a joint petition to the UN
// Human Rights Council, the European Union and human rights institutions on the airstrike on
// Sudanese artisanal miners. Source: press/OCT/6/notes.rtf (English only, no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-joint-petition-north-wadi.mjs
//               node --env-file=.env.local prisma/seed-statement-joint-petition-north-wadi.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-joint-petition-north-wadi.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-joint-petition-north-wadi.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-joint-petition-north-wadi.mjs
//
// EDITORIAL NOTES (decided with the client, 22 October 2026):
//  - DATELINE: GENEVA, 21 October 2026. First published on 22 October as "22 October", because
//    the first source (press/OCT/6) said only "Today"; the client's second copy (press/OCT/7, same
//    text) dates it "Wednesday 21 October 2026", so the date was corrected the same day. Its
//    headline's "International Justice 6th Bodies" is taken as a typo and not reproduced.
//  - ATTRIBUTION: "the Egyptian airstrike" is published AS WRITTEN, stated as fact, at the
//    client's explicit choice — unlike the 12 October statement, which worded it as the
//    Coalition's attribution. Kept unhedged in AR (الغارة الجوية المصرية) and FR (la frappe
//    aérienne égyptienne) to match.
//  - PLACES: the client's names are kept — "Jabal Al-Uwaidat" and "the Al-Ansari market" in
//    northern Sudan — with "(the North Wadi region)" added and a link to the 12 October
//    statement, so readers see it is the same strike. "Al-Uwaidat" is the client's spelling and
//    could not be confirmed; AR transliterates it as جبل العويدات. Flag if the client corrects it.
//  - Light copy-edit: house name (ICHRO), third person ("we submitted" → "the Coalition has
//    submitted"). The facts (ten organisations, more than seven countries, ECOSOC-status members
//    and African regional bodies) are the client's account. Contact block dropped; house
//    sign-off added.
//  - Category Press Release. Covers generated in the 'unblue' theme (UN blue, the client's choice
//    on 22 October; first published in the light 'pearl' theme). No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'joint-petition-airstrike-sudanese-miners-october-2026';
// Generated once, 22 October 2026. Never regenerate.
export const TRANSLATION_KEY = '3f52b1af-4a85-41bb-9bd2-3c4236fb149d';

const NORTH_WADI = 'condemnation-airstrike-miners-north-wadi-october-2026';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) has submitted a petition to the United Nations Human Rights Council, the European Union and the relevant human rights institutions concerning the Egyptian airstrike targeting Sudanese artisanal miners in the Jabal Al-Uwaidat area and the Al-Ansari market in northern Sudan, along the Egypt–Sudan border ([the North Wadi region](/news/${NORTH_WADI})).

The petition was signed by ten organisations representing more than seven countries, including organisations holding consultative status with the United Nations as well as African regional organisations.

This joint human rights initiative seeks redress for the victims and their families, an independent investigation, and accountability for those responsible.

The Coalition reaffirms its commitment to pursuing this petition and to advocating for concrete measures that deliver justice and prevent impunity for the perpetrators.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 21 October 2026`;

const EN_EXCERPT =
  'ICHRO has submitted a joint petition, signed by ten organisations from more than seven countries, to the UN Human Rights Council, the European Union and human rights institutions on the Egyptian airstrike on Sudanese artisanal miners, seeking redress, an independent investigation and accountability.';

const AR_BODY = `قدّم التحالف الدولي لمنظمات حقوق الإنسان عريضةً إلى مجلس حقوق الإنسان التابع للأمم المتحدة، والاتحاد الأوروبي، والمؤسسات الحقوقية المعنية، بشأن الغارة الجوية المصرية التي استهدفت المعدّنين السودانيين التقليديين في منطقة جبل العويدات وسوق الأنصاري في شمال السودان، على الشريط الحدودي بين مصر والسودان ([منطقة وادي الشمال](/ar/news/${NORTH_WADI})).

ووقّعت على العريضة عشر منظمات تمثّل أكثر من سبع دول، من بينها منظمات تتمتع بالصفة الاستشارية لدى الأمم المتحدة، إلى جانب منظمات إقليمية أفريقية.

وتهدف هذه المبادرة الحقوقية المشتركة إلى إنصاف الضحايا وأسرهم، والمطالبة بتحقيق مستقل، وضمان محاسبة المسؤولين.

ويجدّد التحالف التزامه بمتابعة هذه العريضة، والدفع نحو إجراءات ملموسة تحقق العدالة وتمنع إفلات الجناة من العقاب.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 21 أكتوبر 2026`;

const AR_EXCERPT =
  'قدّم التحالف الدولي لمنظمات حقوق الإنسان عريضةً مشتركة، وقّعتها عشر منظمات من أكثر من سبع دول، إلى مجلس حقوق الإنسان والاتحاد الأوروبي والمؤسسات الحقوقية بشأن الغارة الجوية المصرية على المعدّنين السودانيين التقليديين، للمطالبة بالإنصاف وتحقيق مستقل ومحاسبة المسؤولين.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) a présenté une pétition au Conseil des droits de l'homme des Nations unies, à l'Union européenne et aux institutions de défense des droits humains concernées, au sujet de la frappe aérienne égyptienne qui a visé des orpailleurs artisanaux soudanais dans la zone de Jabal Al-Uwaidat et sur le marché d'Al-Ansari, dans le nord du Soudan, le long de la frontière entre l'Égypte et le Soudan ([la région de North Wadi](/fr/news/${NORTH_WADI})).

La pétition a été signée par dix organisations représentant plus de sept pays, dont des organisations dotées du statut consultatif auprès des Nations unies ainsi que des organisations régionales africaines.

Cette initiative conjointe de défense des droits humains vise à obtenir réparation pour les victimes et leurs familles, à exiger une enquête indépendante et à faire en sorte que les responsables rendent des comptes.

La Coalition réaffirme sa détermination à poursuivre cette pétition et à plaider pour des mesures concrètes qui rendent justice et empêchent l'impunité des auteurs.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 21 octobre 2026`;

const FR_EXCERPT =
  "L'ICHRO a présenté une pétition conjointe, signée par dix organisations de plus de sept pays, au Conseil des droits de l'homme, à l'Union européenne et aux institutions de défense des droits humains au sujet de la frappe aérienne égyptienne contre des orpailleurs soudanais, pour obtenir réparation, une enquête indépendante et l'établissement des responsabilités.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-10-21',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Geneva'],
  locales: [
    {
      locale: 'en',
      title: 'ICHRO Submits Joint Petition to International Bodies on the Airstrike on Sudanese Miners',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي لمنظمات حقوق الإنسان يقدّم عريضة مشتركة إلى الهيئات الدولية بشأن الغارة على المعدّنين السودانيين',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: "L'ICHRO présente une pétition conjointe aux instances internationales sur la frappe contre des mineurs soudanais",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover colour (scripts/lib/press-card.mjs THEMES): UN blue.
export const COVER_THEME = 'unblue';

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'PRESS RELEASE',
    headline: ['Joint Petition to', 'International Bodies', 'on the Airstrike on', 'Sudanese Miners'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Geneva',
    date: '21 OCTOBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'COMMUNIQUÉ DE PRESSE',
    headline: ['Pétition conjointe aux', 'instances internationales', 'sur la frappe contre', 'des mineurs soudanais'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Genève',
    date: '21 OCTOBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان صحفي',
    headline: ['عريضة مشتركة إلى الهيئات الدولية', 'بشأن الغارة على', 'المعدّنين السودانيين'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'جنيف',
    date: '21 أكتوبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
