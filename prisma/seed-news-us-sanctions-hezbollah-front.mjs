// News, Geneva, 18 November 2026 — the Coalition's summary of a U.S. Department of State press
// statement of 18 November 2026, "U.S. Sanctions Hizballah Front Organization and Iran-Backed
// Financial Network" (Thomas "Tommy" Pigott, Spokesman), forwarded by the client as the
// @StateDept_NEA post on X, and of the Treasury press release it points to (sb0692).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-news-us-sanctions-hezbollah-front.mjs
//               node --env-file=.env.local prisma/seed-news-us-sanctions-hezbollah-front.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-news-us-sanctions-hezbollah-front.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-news-us-sanctions-hezbollah-front.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-news-us-sanctions-hezbollah-front.mjs
// Variants: node scripts/gen-image-variants.mjs us-sanctions-lebanese-relief-association-hezbollah-november-2026
//
// EDITORIAL NOTES (19 November 2026):
//  - NOT A STATEMENT. The client forwarded the post with no instruction; the owner chose an
//    attributed News brief. Category News; the body takes no position and says so. The only
//    Coalition framing is why it is published: the case concerns relief work used as cover.
//    If the client sends words of his own, they can be added as a separate, signed paragraph.
//  - ATTRIBUTION, load-bearing — keep it in any edit, in all three languages. Every claim about
//    the association, Mr Chouman, the Khechen brothers and the two companies is the State
//    Department's ("according to", "the statement says", "it accuses"). They are designations by
//    the U.S. government, not findings of a court, and the Coalition has not verified them.
//  - SUMMARY, NOT A REPRINT. The text is summarised in the Coalition's own words and not quoted.
//  - NO SEAL. The card the client forwarded carries the Great Seal of the United States; it is
//    not used or imitated. The covers are the house text cards, no photographs of named people.
//  - SPELLING. The State Department writes "Hizballah"; the body uses the common "Hezbollah"
//    (AR حزب الله, FR Hezbollah) and keeps "Hizballah" only inside the source title. The Arabic
//    spellings of the names (جمعية وتعاونوا، عفيف عبد الرضا شومان، حسن وإبراهيم خشن، سنكري غولد)
//    are our transliterations, not confirmed against an Arabic source.
//  - SOURCES. The Treasury release URL was checked (200, dated 18 November 2026). The State
//    Department statement's own URL was not found on state.gov at the time of writing; it is
//    cited by title, office and date. Add the link if it turns up.
//  - Dateline Geneva, as for the Coalition's other News items. No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'us-sanctions-lebanese-relief-association-hezbollah-november-2026';
// Generated once, 19 November 2026. Never regenerate.
export const TRANSLATION_KEY = '2362febf-1c11-42d6-88f7-25376234430d';

const STATE_TITLE = 'U.S. Sanctions Hizballah Front Organization and Iran-Backed Financial Network';
const TREASURY_URL = 'https://home.treasury.gov/news/press-releases/sb0692';
const TREASURY_TITLE = 'Operation Economic Outcast Targets Iran’s Proxy Networks';

const EN_BODY = `On 18 November 2026, the United States Department of State announced sanctions against a Lebanese association that, it says, presents itself as an emergency relief organisation while serving Hezbollah, and against a network it accuses of moving funds for the group. The announcement was made by the Department's spokesman, Thomas Pigott; the designations are set out in a Treasury Department press release of the same day.

## A relief association used as cover

According to the State Department, the Wa Ta'awanu Association says it only delivers emergency relief in southern Lebanon, but in fact transports Hezbollah operatives, stores the group's weapons and channels donor funds towards its activities. The statement says the association's founder, Afif Abdel Rida Chouman, runs it at Hezbollah's direction, and that its conduct undermines Lebanon's sovereignty and puts genuine aid to the people of southern Lebanon at risk.

## A gold and cash network

The same action targets the brothers Hassan and Ibrahim Khechen. The State Department says they have worked with Hezbollah to move significant funds from Iran's Islamic Revolutionary Guard Corps–Qods Force, using the Lebanon-based Gold Global Company, the Türkiye-based Sankari Gold and cash couriers to carry gold bullion and currency across borders, including from Africa.

## Legal basis

The designations are made under the United States' counterterrorism authority, Executive Order 13224, as amended. The State Department says the United States will continue to block attempts to exploit humanitarian groups and the private sector, while encouraging legitimate aid and investment in Lebanon.

---

**Sources:** U.S. Department of State, Office of the Spokesman, "${STATE_TITLE}", press statement, 18 November 2026. U.S. Department of the Treasury, "[${TREASURY_TITLE}](${TREASURY_URL})", 18 November 2026.

This page is the Coalition's summary of a government announcement, published because the case concerns relief work used as cover. The allegations and designations are those of the United States government; the Coalition has not verified them independently, and this is not a statement of the Coalition.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 18 November 2026`;

const EN_EXCERPT =
  'The U.S. State Department announced sanctions on 18 November 2026 against Wa Ta’awanu, a Lebanese association it says posed as an emergency relief group while serving Hezbollah, and against a gold and cash network it accuses of moving funds from Iran’s Qods Force. A summary, with sources.';

const AR_BODY = `أعلنت وزارة الخارجية الأمريكية، في 18 نوفمبر 2026، فرض عقوبات على جمعية لبنانية تقول إنها تقدّم نفسها منظمةً للإغاثة الطارئة بينما تعمل لصالح حزب الله، وعلى شبكة تتهمها بنقل الأموال إلى الحزب. وصدر الإعلان عن المتحدث باسم الوزارة توماس بيغوت، فيما تَرِد تفاصيل التصنيفات في بيان صحفي لوزارة الخزانة الأمريكية صدر في اليوم نفسه.

## جمعية إغاثة تُستخدم غطاءً

بحسب وزارة الخارجية الأمريكية، تقول جمعية «وتعاونوا» إنها تقتصر على تقديم الإغاثة الطارئة في جنوب لبنان، لكنها في الواقع تنقل عناصر من حزب الله وتخزّن أسلحته وتوجّه أموال المانحين نحو أنشطته. ويفيد البيان بأن مؤسس الجمعية، عفيف عبد الرضا شومان، يديرها بتوجيه من حزب الله، وبأن نشاطها يقوّض سيادة لبنان ويعرّض للخطر المساعدات الحقيقية الموجّهة إلى سكان جنوب لبنان.

## شبكة للذهب والأموال النقدية

ويستهدف الإجراء نفسه الشقيقين حسن وإبراهيم خشن. وتقول وزارة الخارجية إنهما عملا مع حزب الله على نقل مبالغ كبيرة من فيلق القدس التابع للحرس الثوري الإيراني، مستخدمَين شركة «غولد غلوبال» ومقرها لبنان، وشركة «سنكري غولد» ومقرها تركيا، وسعاةً لنقل الأموال، لتمرير سبائك الذهب والعملات عبر الحدود، بما في ذلك من أفريقيا.

## الأساس القانوني

تستند التصنيفات إلى صلاحيات مكافحة الإرهاب الأمريكية بموجب الأمر التنفيذي رقم 13224 بصيغته المعدّلة. وتقول وزارة الخارجية إن الولايات المتحدة ستواصل التصدي لمحاولات استغلال المنظمات الإنسانية والقطاع الخاص، مع تشجيع المساعدات والاستثمارات المشروعة في لبنان.

---

**المصادر:** وزارة الخارجية الأمريكية، مكتب المتحدث الرسمي، «${STATE_TITLE}»، بيان صحفي، 18 نوفمبر 2026 (بالإنجليزية). وزارة الخزانة الأمريكية، «[${TREASURY_TITLE}](${TREASURY_URL})»، 18 نوفمبر 2026 (بالإنجليزية).

هذه الصفحة ملخّص أعدّه التحالف لإعلان حكومي، ويُنشر لأن القضية تتعلق باستخدام العمل الإغاثي غطاءً. والاتهامات والتصنيفات الواردة فيها هي اتهامات حكومة الولايات المتحدة وتصنيفاتها، ولم يتحقق منها التحالف بصورة مستقلة، وهي ليست بياناً صادراً عن التحالف.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 18 نوفمبر 2026`;

const AR_EXCERPT =
  'أعلنت وزارة الخارجية الأمريكية في 18 نوفمبر 2026 فرض عقوبات على جمعية «وتعاونوا» اللبنانية، التي تقول إنها تظاهرت بأنها منظمة إغاثة طارئة بينما تعمل لصالح حزب الله، وعلى شبكة للذهب والأموال النقدية تتهمها بنقل أموال من فيلق القدس الإيراني. ملخّص مع المصادر.';

const FR_BODY = `Le 18 novembre 2026, le département d'État des États-Unis a annoncé des sanctions contre une association libanaise qui, selon lui, se présente comme une organisation de secours d'urgence tout en servant le Hezbollah, ainsi que contre un réseau qu'il accuse de transférer des fonds pour ce groupe. L'annonce a été faite par le porte-parole du département, Thomas Pigott ; les désignations sont détaillées dans un communiqué du département du Trésor publié le même jour.

## Une association de secours utilisée comme couverture

Selon le département d'État, l'association Wa Ta'awanu affirme se limiter aux secours d'urgence dans le sud du Liban, mais transporte en réalité des membres du Hezbollah, stocke ses armes et oriente les fonds de donateurs vers ses activités. Le communiqué indique que le fondateur de l'association, Afif Abdel Rida Chouman, la dirige sur instruction du Hezbollah, et que ses agissements portent atteinte à la souveraineté du Liban et mettent en péril l'aide véritable destinée à la population du sud du pays.

## Un réseau d'or et d'argent liquide

La même mesure vise les frères Hassan et Ibrahim Khechen. Selon le département d'État, ils ont travaillé avec le Hezbollah pour transférer des sommes importantes provenant de la Force Al-Qods du Corps des gardiens de la révolution islamique d'Iran, en s'appuyant sur la société libanaise Gold Global Company, la société turque Sankari Gold et des passeurs de fonds pour faire franchir les frontières à des lingots d'or et à des devises, y compris depuis l'Afrique.

## Base juridique

Les désignations sont prises en vertu de l'autorité antiterroriste des États-Unis, le décret présidentiel (Executive Order) 13224, tel que modifié. Le département d'État affirme que les États-Unis continueront de faire échec aux tentatives d'exploiter les organisations humanitaires et le secteur privé, tout en encourageant l'aide et les investissements légitimes au Liban.

---

**Sources :** département d'État des États-Unis, bureau du porte-parole, « ${STATE_TITLE} », communiqué, 18 novembre 2026 (en anglais). Département du Trésor des États-Unis, « [${TREASURY_TITLE}](${TREASURY_URL}) », 18 novembre 2026 (en anglais).

Cette page est le résumé, établi par la Coalition, d'une annonce gouvernementale, publié parce que l'affaire concerne l'utilisation de l'action humanitaire comme couverture. Les accusations et les désignations sont celles du gouvernement des États-Unis ; la Coalition ne les a pas vérifiées de manière indépendante, et cette page n'est pas une déclaration de la Coalition.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 18 novembre 2026`;

const FR_EXCERPT =
  "Le département d'État américain a annoncé le 18 novembre 2026 des sanctions contre Wa Ta'awanu, une association libanaise qui, selon lui, se faisait passer pour une organisation de secours d'urgence tout en servant le Hezbollah, et contre un réseau d'or et d'argent liquide qu'il accuse de transférer des fonds de la Force Al-Qods iranienne. Un résumé, avec les sources.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'News',
  date: '2026-11-18',
  hashtags: ['#international_coalition_for_h_rights', '#Lebanon', '#HumanitarianAid'],
  locales: [
    {
      locale: 'en',
      title: 'United States Sanctions a Lebanese Relief Association It Accuses of Serving as a Hezbollah Front',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'الولايات المتحدة تفرض عقوبات على جمعية إغاثة لبنانية تتهمها بالعمل واجهةً لحزب الله',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: "Les États-Unis sanctionnent une association de secours libanaise qu'ils accusent de servir de façade au Hezbollah",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Covers: the house text card (scripts/lib/press-card.mjs). No seal, no photograph.
//   node scripts/gen-press-cover.mjs prisma/seed-news-us-sanctions-hezbollah-front.mjs
export const COVER_THEME = 'navy';

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'NEWS',
    headline: ['U.S. Sanctions a', 'Lebanese Relief Group', 'It Accuses of Serving', 'as a Hezbollah Front'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Summary of a U.S. State Department statement'],
    city: 'Geneva',
    date: '18 NOVEMBER 2026',
    chipW: 260,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'ACTUALITÉ',
    headline: ['Les États-Unis', 'sanctionnent une', 'association libanaise', 'accusée de servir le Hezbollah'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ["Résumé d'un communiqué du département d'État"],
    city: 'Genève',
    date: '18 NOVEMBRE 2026',
    chipW: 260,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'أخبار',
    headline: ['عقوبات أمريكية على جمعية', 'إغاثة لبنانية تتهمها واشنطن', 'بالعمل واجهةً لحزب الله'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['ملخّص بيان لوزارة الخارجية الأمريكية'],
    city: 'جنيف',
    date: '18 نوفمبر 2026',
    chipW: 250,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
