// Statement of condemnation: the drone strike on Amiet market in the Abyei region — Paris,
// 19 October 2026. Source: press/OCT/3/notes.rtf (English only, no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-amiet-market-abyei.mjs
//               node --env-file=.env.local prisma/seed-statement-amiet-market-abyei.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-amiet-market-abyei.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-amiet-market-abyei.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-amiet-market-abyei.mjs
//
// EDITORIAL NOTES (decided with the client, 20 October 2026):
//  - Dateline PARIS, 19 October 2026, from the statement.
//  - MARKET NAME: the source reads "the Na'am market (Amit)". Published as "Amiet market",
//    the common English spelling of the Abyei market, at the client's choice (AR سوق أميت,
//    FR marché d'Amiet). "Na'am" is not used.
//  - ATTRIBUTION IS HEDGED and must stay so: the strike is "attributed to the Sudanese Armed
//    Forces according to a statement by the Ministry of Foreign Affairs of South Sudan" — the
//    Coalition reports that attribution, it does not make it. Casualties are "according to
//    available information". Both hedges are carried into AR (وفق / بحسب) and FR (selon).
//  - Light copy-edit at the client's choice: house name "International Coalition for Human
//    Rights (ICHR)"; the calls to the HRC/OHCHR, the FFM and the military leadership set as a
//    list; house sign-off added (the source ends with a contact block, which is dropped as on
//    every statement — the site footer carries it). Substance unchanged.
//  - No artwork supplied: covers are generated. No gallery.
//  - press/OCT/3 first held a byte-identical copy of press/OCT/2 (the 13 Oct Brussels
//    meeting, already published); it was replaced by the client before this was written.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-drone-strike-amiet-market-abyei-october-2026';
// Generated once, 20 October 2026. Never regenerate.
export const TRANSLATION_KEY = 'fe150bab-30b2-4111-b604-48c3d54a6a3f';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) condemns in the strongest terms the drone strike on Amiet market in the Abyei region which, according to available information, caused civilian casualties and damage to property.

According to a statement by the Ministry of Foreign Affairs of South Sudan, the attack was attributed to the Sudanese Armed Forces (SAF). This requires the accountability of the military leadership, and an investigation into the responsibility of both those who carried out the attack and those who ordered it.

The Coalition emphasises that the protection of civilians and civilian markets is a binding obligation under international humanitarian law, and that claims of military objectives in the area cannot justify indiscriminate or disproportionate attacks. It also warns of the consequences of the strike for the livelihoods of the population, for peaceful coexistence and for stability in the Abyei region.

**The Coalition calls upon:**

- the Human Rights Council and the Office of the United Nations High Commissioner for Human Rights (OHCHR) to take urgent action;
- the Independent International Fact-Finding Mission for the Sudan to investigate the incident within its mandate, preserve evidence and establish responsibility;
- the military leadership to halt any attacks that violate the protection of civilians, and to guarantee the delivery of humanitarian aid and the evacuation of the wounded.

The Coalition reaffirms that those responsible must be held accountable, and that the victims are owed justice and reparation.

---

**INTERNATIONAL COALITION FOR HUMAN RIGHTS**

Advancing Human Rights • Peace • Justice

Paris, 19 October 2026`;

const EN_EXCERPT =
  'ICHRO condemns in the strongest terms the drone strike on Amiet market in the Abyei region, which according to available information caused civilian casualties, and which the Ministry of Foreign Affairs of South Sudan attributed to the Sudanese Armed Forces. The Coalition calls for an investigation and accountability.';

const AR_BODY = `يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الهجوم بالطائرات المسيّرة على سوق أميت في منطقة أبيي، والذي أسفر، وفق المعلومات المتاحة، عن سقوط ضحايا مدنيين وأضرار في الممتلكات.

وبحسب بيان صادر عن وزارة الخارجية في جنوب السودان، نُسب الهجوم إلى القوات المسلحة السودانية، وهو ما يستوجب مساءلة القيادة العسكرية، والتحقيق في مسؤولية كلٍّ من المنفّذين ومن أصدروا الأوامر.

ويؤكد التحالف أن حماية المدنيين والأسواق المدنية التزام مُلزِم بموجب القانون الدولي الإنساني، وأن أي ادعاءات بوجود أهداف عسكرية لا تبرّر الهجمات العشوائية أو غير المتناسبة. كما يحذّر من تداعيات القصف على سبل عيش السكان والتعايش السلمي والاستقرار في منطقة أبيي.

**ويدعو التحالف:**

- مجلس حقوق الإنسان ومفوضية الأمم المتحدة السامية لحقوق الإنسان إلى اتخاذ إجراءات عاجلة؛
- البعثة الدولية المستقلة لتقصي الحقائق بشأن السودان إلى التحقيق في الحادثة في إطار ولايتها، وحفظ الأدلة، وتحديد المسؤوليات؛
- القيادة العسكرية إلى وقف أي هجمات تنتهك حماية المدنيين، وضمان إيصال المساعدات الإنسانية وإجلاء الجرحى.

ويجدّد التحالف التأكيد على ضرورة محاسبة المسؤولين، وتحقيق العدالة وجبر الضرر للضحايا.

---

**التحالف الدولي لحقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

باريس، 19 أكتوبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الهجوم بالطائرات المسيّرة على سوق أميت في منطقة أبيي، والذي أسفر وفق المعلومات المتاحة عن سقوط ضحايا مدنيين، ونسبته وزارة الخارجية في جنوب السودان إلى القوات المسلحة السودانية، ويطالب بالتحقيق والمساءلة.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) condamne avec la plus grande fermeté la frappe de drone contre le marché d'Amiet, dans la région d'Abyei, qui selon les informations disponibles a fait des victimes civiles et causé des dégâts matériels.

Selon une déclaration du ministère des Affaires étrangères du Soudan du Sud, l'attaque a été attribuée aux Forces armées soudanaises (FAS). Cela exige que le commandement militaire rende des comptes, et qu'une enquête établisse la responsabilité des auteurs comme de ceux qui ont donné les ordres.

La Coalition souligne que la protection des civils et des marchés civils est une obligation contraignante en vertu du droit international humanitaire, et que l'invocation d'objectifs militaires ne saurait justifier des attaques indiscriminées ou disproportionnées. Elle met également en garde contre les conséquences de cette frappe sur les moyens de subsistance de la population, la coexistence pacifique et la stabilité dans la région d'Abyei.

**La Coalition appelle :**

- le Conseil des droits de l'homme et le Haut-Commissariat des Nations Unies aux droits de l'homme (HCDH) à agir d'urgence ;
- la Mission internationale indépendante d'établissement des faits pour le Soudan à enquêter sur l'incident dans le cadre de son mandat, à préserver les preuves et à établir les responsabilités ;
- le commandement militaire à cesser toute attaque contraire à la protection des civils, et à garantir l'acheminement de l'aide humanitaire et l'évacuation des blessés.

La Coalition réaffirme que les responsables doivent rendre des comptes, et que les victimes ont droit à la justice et à réparation.

---

**COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Paris, 19 octobre 2026`;

const FR_EXCERPT =
  "L'ICHRO condamne avec la plus grande fermeté la frappe de drone contre le marché d'Amiet, dans la région d'Abyei, qui selon les informations disponibles a fait des victimes civiles, et que le ministère des Affaires étrangères du Soudan du Sud a attribuée aux Forces armées soudanaises. La Coalition demande une enquête et l'établissement des responsabilités.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-10-19',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Abyei'],
  locales: [
    {
      locale: 'en',
      title: 'Statement of Condemnation: Drone Strike on Amiet Market in the Abyei Region',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Paris',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة: الهجوم بالطائرات المسيّرة على سوق أميت في منطقة أبيي',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'باريس',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: "Déclaration de condamnation : frappe de drone contre le marché d'Amiet, dans la région d'Abyei",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Paris',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover colour (scripts/lib/press-card.mjs THEMES). Each text-only cover has its own, so
// they read as a set on /news without being identical. Re-render with FORCE=1.
export const COVER_THEME = 'azure';

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'STATEMENT OF CONDEMNATION',
    headline: ['Drone Strike on', 'Amiet Market in', 'the Abyei Region'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Paris',
    date: '19 OCTOBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION DE CONDAMNATION',
    headline: ['Frappe de drone contre', "le marché d'Amiet,", "région d'Abyei"],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Paris',
    date: '19 OCTOBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان إدانة',
    headline: ['الهجوم بالطائرات المسيّرة', 'على سوق أميت', 'في منطقة أبيي'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'باريس',
    date: '19 أكتوبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
