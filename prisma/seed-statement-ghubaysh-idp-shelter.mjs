// Statement, Geneva, 18 November 2026 — "Statement of Condemnation Regarding the Targeting of an
// Internally Displaced Persons (IDP) Shelter in Ghubaysh, West Kordofan".
// Source: press/NOV/9/notes.rtf (text only, no image; received 19 November 2026).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-ghubaysh-idp-shelter.mjs
//               node --env-file=.env.local prisma/seed-statement-ghubaysh-idp-shelter.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-ghubaysh-idp-shelter.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-ghubaysh-idp-shelter.mjs
//
// Covers: node scripts/gen-photo-card.mjs prisma/seed-statement-ghubaysh-idp-shelter.mjs
// Variants: node scripts/gen-image-variants.mjs condemnation-drone-strike-idp-shelter-ghubaysh-west-kordofan-november-2026
//
// EDITORIAL NOTES (19 November 2026):
//  - VERBATIM in substance, at the owner's choice. The client's hedges are kept in all three
//    languages: the toll is "according to field information documented by the Sudanese Rural
//    Community Organization … alongside testimonies"; the SAF attribution is "local testimonies
//    indicate"; the legal finding is "may amount to a war crime".
//  - REPAIRS to garbled source text, not changes of meaning: "accountability fordisplaced the
//    perpetAccrs" → "accountability for the perpetrators"; "prevent imThety" → "prevent
//    impunity"; "assistance to the , ensure" → "assistance to the displaced, ensure" (the word
//    "displaced" had slipped into the earlier sentence); "thethe" → "the"; "(UNHRC),  Independent"
//    → "(UNHRC), the Independent"; a comma before "and take"; the toll's two lines joined into one
//    paragraph. Stray zero-width characters removed.
//  - NOT INDEPENDENTLY CONFIRMED: on 19 November no outside report of a November strike on a
//    school shelter in Ghubaysh was found (a May 2026 drone strike on the Ghubaysh market was
//    reported). Published with the client's date and figures (17 killed, 13 injured), owner's choice.
//  - The Sudanese Rural Community Organization (SRCO) is a Coalition member (see the Dakar and
//    Brussels seeds); AR منظمة مجتمع الريف السوداني, FR Organisation de la communauté rurale soudanaise.
//  - Dateline: the source names none; Geneva at the owner's choice. The 🌐/✉️ contact lines are
//    dropped (they are in the footer); house sign-off.
//  - Cover: no photograph was supplied. Photo card with the map of Sudan and Ghubaysh marked
//    (approx. 12.15 N, 27.35 E). Never an unrelated photo.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-drone-strike-idp-shelter-ghubaysh-west-kordofan-november-2026';
// Generated once, 19 November 2026. Never regenerate.
export const TRANSLATION_KEY = '5b53032b-d856-468d-bd3b-bb6747d95fbd';

const EN_BODY = `The International Coalition of Human Rights Organizations condemns in the strongest possible terms the attack targeting the Musab bin Umair School in the city of Ghubaysh, West Kordofan State — a civilian facility serving as a shelter for internally displaced families fleeing the armed conflict in areas adjacent to Al-Khuway and surrounding regions.

According to field information documented by the Sudanese Rural Community Organization, a local organization monitoring and documenting violations in the region, alongside testimonies from other local organizations and entities, the drone strike resulted in the killing of 17 civilians and the injury of 13 others. This tragic incident reflects the grave risks facing civilians and internally displaced persons (IDPs) in conflict zones.

Local testimonies indicate that a drone operated by the Sudanese Armed Forces (SAF) was responsible for the attack.

The Coalition expresses its profound concern over the continued attacks affecting populated areas and civilian infrastructure, including displacement shelters, at a time when the region is experiencing an extremely dire humanitarian situation, with Ghubaysh hosting tens of thousands of IDPs facing acute shortages in basic services and humanitarian protection.

The Coalition underscores that targeting civilians and IDP shelters constitutes a grave violation of International Humanitarian Law (IHL), and that intentionally directing attacks against civilians or civilian objects may amount to a war crime, necessitating independent and transparent investigations to establish responsibility and ensure accountability for the perpetrators.

Accordingly, the International Coalition of Human Rights Organizations calls upon the United Nations Human Rights Council (UNHRC), the Independent International Fact-Finding Mission for the Sudan and the Office of the High Commissioner for Human Rights (OHCHR) to take urgent action to investigate this incident, collect relevant evidence, hear testimonies from victims and witnesses, and take the necessary measures to ensure accountability and prevent impunity.

The Coalition further urges international humanitarian organizations to intensify their efforts to provide urgent protection and assistance to the displaced, ensure access to medical services for the injured, and work toward safeguarding schools, shelters and civilian facilities from military attacks.

The Coalition emphasizes that the protection of civilians is not subject to political or military considerations, but is a binding legal and humanitarian obligation upon all parties to the conflict. The continued targeting of civilian areas amidst a climate of impunity threatens to exacerbate the humanitarian catastrophe and widen waves of forced displacement.

Shelters must remain a safe haven for those fleeing war, not targets for military attacks. The protection of civilians and the accountability of those responsible for violations represent an international responsibility that brooks no further delay.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 18 November 2026`;

const EN_EXCERPT =
  'The Coalition condemns the drone strike on the Musab bin Umair School, a shelter for displaced families in Ghubaysh, West Kordofan, which according to local documentation killed 17 civilians and injured 13, and calls on the Human Rights Council, the Fact-Finding Mission and the OHCHR to investigate.';

const AR_BODY = `يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الممكنة الهجوم الذي استهدف مدرسة مصعب بن عمير في مدينة غبيش بولاية غرب كردفان، وهي منشأة مدنية تُستخدم مأوى للأسر النازحة الفارّة من النزاع المسلح في المناطق المجاورة للخوي والمناطق المحيطة بها.

ووفقاً لمعلومات ميدانية وثّقتها منظمة مجتمع الريف السوداني، وهي منظمة محلية ترصد الانتهاكات في المنطقة وتوثّقها، إلى جانب شهادات من منظمات وجهات محلية أخرى، أسفرت الغارة بطائرة مسيّرة عن مقتل 17 مدنياً وإصابة 13 آخرين. وتعكس هذه الحادثة المأساوية المخاطر الجسيمة التي يواجهها المدنيون والنازحون داخلياً في مناطق النزاع.

وتشير شهادات محلية إلى أن طائرة مسيّرة تابعة للقوات المسلحة السودانية كانت مسؤولة عن الهجوم.

ويعرب التحالف عن قلقه البالغ إزاء استمرار الهجمات التي تطال المناطق المأهولة والبنية التحتية المدنية، بما فيها مراكز إيواء النازحين، في وقت تشهد فيه المنطقة أوضاعاً إنسانية بالغة السوء، إذ تستضيف غبيش عشرات الآلاف من النازحين الذين يعانون نقصاً حاداً في الخدمات الأساسية والحماية الإنسانية.

ويؤكد التحالف أن استهداف المدنيين ومراكز إيواء النازحين يشكّل انتهاكاً جسيماً للقانون الدولي الإنساني، وأن تعمّد توجيه الهجمات ضد المدنيين أو الأعيان المدنية قد يرقى إلى جريمة حرب، ما يستوجب إجراء تحقيقات مستقلة وشفافة لتحديد المسؤوليات وضمان محاسبة الجناة.

وبناءً على ذلك، يدعو التحالف الدولي لمنظمات حقوق الإنسان مجلس حقوق الإنسان التابع للأمم المتحدة، والبعثة الدولية المستقلة لتقصي الحقائق بشأن السودان، ومفوضية الأمم المتحدة السامية لحقوق الإنسان، إلى اتخاذ إجراءات عاجلة للتحقيق في هذه الحادثة، وجمع الأدلة ذات الصلة، والاستماع إلى شهادات الضحايا والشهود، واتخاذ التدابير اللازمة لضمان المساءلة ومنع الإفلات من العقاب.

كما يحثّ التحالف المنظمات الإنسانية الدولية على تكثيف جهودها لتوفير الحماية والمساعدة العاجلتين للنازحين، وضمان حصول الجرحى على الخدمات الطبية، والعمل على حماية المدارس ومراكز الإيواء والمنشآت المدنية من الهجمات العسكرية.

ويشدّد التحالف على أن حماية المدنيين لا تخضع لاعتبارات سياسية أو عسكرية، بل هي التزام قانوني وإنساني ملزم لجميع أطراف النزاع. ويهدّد استمرار استهداف المناطق المدنية في ظل مناخ الإفلات من العقاب بتفاقم الكارثة الإنسانية واتساع موجات النزوح القسري.

يجب أن تظل مراكز الإيواء ملاذاً آمناً للفارّين من الحرب، لا أهدافاً للهجمات العسكرية. إن حماية المدنيين ومحاسبة المسؤولين عن الانتهاكات مسؤولية دولية لا تحتمل مزيداً من التأخير.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 18 نوفمبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الغارة بطائرة مسيّرة على مدرسة مصعب بن عمير، مأوى الأسر النازحة في غبيش بولاية غرب كردفان، التي أسفرت وفق توثيق محلي عن مقتل 17 مدنياً وإصابة 13 آخرين، ويدعو مجلس حقوق الإنسان وبعثة تقصي الحقائق والمفوضية السامية إلى التحقيق.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme condamne dans les termes les plus forts l'attaque qui a visé l'école Musab bin Umair, dans la ville de Ghubaysh, au Kordofan-Occidental — une installation civile servant d'abri à des familles déplacées fuyant le conflit armé dans les zones voisines d'Al-Khuway et les régions environnantes.

Selon les informations de terrain documentées par l'Organisation de la communauté rurale soudanaise, une organisation locale qui surveille et documente les violations dans la région, ainsi que des témoignages d'autres organisations et entités locales, la frappe de drone a fait 17 morts et 13 blessés parmi les civils. Ce tragique incident illustre les risques graves auxquels sont exposés les civils et les personnes déplacées à l'intérieur de leur propre pays dans les zones de conflit.

Des témoignages locaux indiquent qu'un drone opéré par les Forces armées soudanaises (FAS) est à l'origine de l'attaque.

La Coalition exprime sa profonde préoccupation face à la poursuite des attaques touchant des zones habitées et des infrastructures civiles, y compris des abris pour personnes déplacées, alors que la région traverse une situation humanitaire extrêmement grave : Ghubaysh accueille des dizaines de milliers de déplacés confrontés à de graves pénuries de services de base et de protection humanitaire.

La Coalition souligne que prendre pour cible des civils et des abris de personnes déplacées constitue une violation grave du droit international humanitaire (DIH), et que le fait de diriger intentionnellement des attaques contre des civils ou des biens de caractère civil peut constituer un crime de guerre, ce qui exige des enquêtes indépendantes et transparentes afin d'établir les responsabilités et de garantir que les auteurs rendent des comptes.

En conséquence, la Coalition internationale des organisations de défense des droits de l'homme appelle le Conseil des droits de l'homme des Nations unies, la Mission internationale indépendante d'établissement des faits pour le Soudan et le Haut-Commissariat aux droits de l'homme (HCDH) à agir d'urgence pour enquêter sur cet incident, recueillir les éléments de preuve pertinents, entendre les témoignages des victimes et des témoins, et prendre les mesures nécessaires pour garantir la reddition de comptes et prévenir l'impunité.

La Coalition exhorte en outre les organisations humanitaires internationales à intensifier leurs efforts pour apporter une protection et une assistance urgentes aux déplacés, garantir l'accès des blessés aux soins médicaux et œuvrer à la protection des écoles, des abris et des installations civiles contre les attaques militaires.

La Coalition souligne que la protection des civils ne saurait être soumise à des considérations politiques ou militaires : elle constitue une obligation juridique et humanitaire contraignante pour toutes les parties au conflit. La poursuite des attaques contre des zones civiles, dans un climat d'impunité, menace d'aggraver la catastrophe humanitaire et d'amplifier les vagues de déplacements forcés.

Les abris doivent rester un refuge sûr pour ceux qui fuient la guerre, et non des cibles d'attaques militaires. La protection des civils et la reddition de comptes des responsables de violations relèvent d'une responsabilité internationale qui ne souffre plus aucun retard.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 18 novembre 2026`;

const FR_EXCERPT =
  "La Coalition condamne la frappe de drone contre l'école Musab bin Umair, abri de familles déplacées à Ghubaysh, au Kordofan-Occidental, qui selon une documentation locale a fait 17 morts et 13 blessés parmi les civils, et appelle le Conseil des droits de l'homme, la Mission d'établissement des faits et le HCDH à enquêter.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-18',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title: 'Statement of Condemnation Regarding the Targeting of an IDP Shelter in Ghubaysh, West Kordofan',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة لاستهداف مركز لإيواء النازحين في غبيش بولاية غرب كردفان',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: "Déclaration de condamnation de l'attaque contre un abri de personnes déplacées à Ghubaysh, au Kordofan-Occidental",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Covers: the client-style photo card with the map of Sudan, Ghubaysh marked.
//   node scripts/gen-photo-card.mjs prisma/seed-statement-ghubaysh-idp-shelter.mjs
export const PHOTO_CARD_BAND = { map: 'sudan', marker: { lon: 27.35, lat: 12.15 } };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Condemns the targeting of a shelter for displaced families in Ghubaysh, West Kordofan',
    dateline: 'GENEVA',
    date: 'Date: 18 November 2026',
    lead: 'The Coalition condemns in the strongest possible terms the drone strike on the Musab bin Umair School, a shelter for displaced families, which according to local documentation killed 17 civilians and injured 13, and calls for an urgent, independent investigation.',
    mapLabels: {
      country: 'SUDAN',
      marker: 'GHUBAYSH',
      markerSub: 'WEST KORDOFAN',
      neighbours: { EGY: 'EGYPT', LBY: 'LIBYA', TCD: 'CHAD', SDS: 'SOUTH SUDAN', CAF: 'C.A.R.', ETH: 'ETHIOPIA', ERI: 'ERITREA' },
    },
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يدين استهداف مركز لإيواء الأسر النازحة في غبيش بولاية غرب كردفان',
    dateline: 'جنيف',
    date: 'التاريخ: 18 نوفمبر 2026',
    lead: 'يدين التحالف بأشد العبارات الممكنة الغارة بطائرة مسيّرة على مدرسة مصعب بن عمير، مأوى الأسر النازحة، التي أسفرت وفق توثيق محلي عن مقتل 17 مدنياً وإصابة 13 آخرين، ويدعو إلى تحقيق عاجل ومستقل.',
    mapLabels: {
      country: 'السودان',
      marker: 'غبيش',
      markerSub: 'غرب كردفان',
      neighbours: { EGY: 'مصر', LBY: 'ليبيا', TCD: 'تشاد', SDS: 'جنوب السودان', CAF: 'أفريقيا الوسطى', ETH: 'إثيوبيا', ERI: 'إريتريا' },
    },
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: "condamne l'attaque contre un abri de familles déplacées à Ghubaysh (Kordofan-Occidental)",
    dateline: 'GENÈVE',
    date: 'Date : 18 novembre 2026',
    lead: "La Coalition condamne dans les termes les plus forts la frappe de drone contre l'école Musab bin Umair, abri de familles déplacées, qui selon une documentation locale a fait 17 morts et 13 blessés parmi les civils, et appelle à une enquête urgente et indépendante.",
    mapLabels: {
      country: 'SOUDAN',
      marker: 'GHUBAYSH',
      markerSub: 'KORDOFAN-OCCIDENTAL',
      neighbours: { EGY: 'ÉGYPTE', LBY: 'LIBYE', TCD: 'TCHAD', SDS: 'SOUDAN DU SUD', CAF: 'RCA', ETH: 'ÉTHIOPIE', ERI: 'ÉRYTHRÉE' },
    },
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
