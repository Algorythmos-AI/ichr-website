// Statement, Geneva, 10 November 2026 — the Coalition welcomes the Dutch House of
// Representatives' motion urging a ban on the Muslim Brotherhood, and calls for accountability
// in Sudan.
// Source: the text the client posted on X (@ICHRIntl, 10 November 2026) and a photograph of the
// Binnenhof, The Hague, in press/NOV/3/.
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-dutch-motion-muslim-brotherhood.mjs
//               node --env-file=.env.local prisma/seed-statement-dutch-motion-muslim-brotherhood.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-dutch-motion-muslim-brotherhood.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-dutch-motion-muslim-brotherhood.mjs
//
// Covers: photo cards in all three locales:
//   FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-dutch-motion-muslim-brotherhood.mjs
// Variants: node scripts/gen-image-variants.mjs statement-dutch-motion-ban-muslim-brotherhood-sudan-november-2026
//
// EDITORIAL NOTES (11 November 2026):
//  - The client's text is published as written, with one correction and a light copy-edit.
//  - CORRECTION: "obstructing cDepartment specifically identifying" is corrupted in the
//    source. Published as "obstructing civilian rule, with the Department specifically
//    identifying", which matches the US Treasury's designation of the Al-Baraa ibn Malik
//    Brigade (12 September 2025). Approved by the owner.
//  - COPY-EDIT, meaning unchanged: the free-standing name line and "Welcomes the adoption …"
//    are joined into one opening sentence; a stray leading space removed. The client's
//    "Al-Baraa ibn Malik Brigade" is kept in English (the Treasury's own name for it); AR uses
//    the house كتيبة البراء بن مالك, FR "la brigade Al-Baraa ibn Malik".
//  - No title in the source: the title is ours, built from the opening sentence.
//  - ATTRIBUTIONS, load-bearing — keep them in any edit: the Treasury "has attributed" a role
//    to Sudanese Islamist groups; the EU "cited" the commander's leadership responsibility.
//    AR: نسبت / استندت إلى. FR: a attribué / a invoqué.
//  - DATELINE: the source has none. Geneva, 10 November 2026 (the day it was posted on X),
//    at the owner's choice.
//  - FACTUAL ANCHORS (not added to the body): the Tweede Kamer adopted the motion (PVV, Boon
//    and Wilders) on 17 March 2026 with 76 votes; a motion is not itself a ban. The statement
//    is published as written, without the date, at the owner's choice. The EU listed the
//    brigade's commander, Al-Misbah Abu Zaid Talha, on 29 January 2026.
//  - The contact lines are dropped: they are in the site footer, and their emoji are non-BMP.
//  - AR and FR are our translations of the English.
//  - ARTWORK: the band is the client's photograph of the Binnenhof (480 x 321), upscaled to the
//    1600 x 900 band (press/NOV/3/binnenhof-band.jpg, uncommitted) at the owner's choice.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'statement-dutch-motion-ban-muslim-brotherhood-sudan-november-2026';
// Generated once, 11 November 2026. Never regenerate.
export const TRANSLATION_KEY = '67dff542-f712-48ab-bab7-c3c2d82bca70';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) welcomes the adoption of a motion by the Dutch House of Representatives urging the government to ban the Muslim Brotherhood and its affiliated organizations.

The Coalition views this step as an important political stance that warrants effective legal measures to counter organizations and networks involved in violence and the undermining of stability, while fully respecting judicial safeguards and fundamental freedoms.

The Coalition emphasizes that the situation in Sudan demands special attention in this context. The U.S. Department of the Treasury has attributed a role to Sudanese Islamist groups in disrupting the democratic transition and obstructing civilian rule, with the Department specifically identifying the involvement of the Al-Baraa ibn Malik Brigade in arbitrary arrests, torture and summary executions.

Furthermore, in imposing sanctions on the brigade’s commander, the European Union cited his leadership responsibility for the execution of civilians and the undermining of the political transition. These facts necessitate accountability that goes beyond statements of concern and condemnation.

The Coalition considers the weaponization of religion to mobilize fighters, justify violations and turn state institutions into instruments serving an organizational agenda as a direct threat to human rights and the prospects for peace. The blood of the Sudanese people is not an acceptable price for the return of any organization to power, nor should war be allowed to become a means for reproducing tyranny and impunity.

The Coalition calls upon the Netherlands and the European Union to monitor funding and arming networks linked to violations in Sudan, impose targeted measures against those responsible based on reliable evidence and support independent investigations and the prosecution of perpetrators of crimes. It reaffirms that sustainable peace requires the protection of civilians, the elimination of militia influence within state institutions and the building of a professional army separate from politics and subordinate to civilian authority without compromising on justice and the rights of victims.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 10 November 2026`;

const EN_EXCERPT =
  'The Coalition welcomes the Dutch House of Representatives’ motion urging a ban on the Muslim Brotherhood and calls on the Netherlands and the EU to act on Sudan: monitor funding and arming networks, impose targeted measures and support independent investigations.';

const AR_BODY = `يرحّب التحالف الدولي لمنظمات حقوق الإنسان (ICHRO) باعتماد مجلس النواب الهولندي اقتراحًا يحثّ الحكومة على حظر جماعة الإخوان المسلمين والمنظمات التابعة لها.

ويرى التحالف في هذه الخطوة موقفًا سياسيًا مهمًا يستدعي اتخاذ تدابير قانونية فعّالة لمواجهة التنظيمات والشبكات الضالعة في العنف وتقويض الاستقرار، مع الاحترام الكامل للضمانات القضائية والحريات الأساسية.

ويؤكد التحالف أن الوضع في السودان يستوجب اهتمامًا خاصًا في هذا السياق. فقد نسبت وزارة الخزانة الأمريكية إلى جماعات إسلامية سودانية دورًا في تعطيل الانتقال الديمقراطي وعرقلة الحكم المدني، وحدّدت الوزارة على وجه الخصوص تورّط كتيبة البراء بن مالك في الاعتقالات التعسفية والتعذيب والإعدامات بإجراءات موجزة.

وعلاوة على ذلك، استند الاتحاد الأوروبي، عند فرضه عقوبات على قائد الكتيبة، إلى مسؤوليته القيادية عن إعدام مدنيين وتقويض الانتقال السياسي. وتستوجب هذه الوقائع مساءلة تتجاوز بيانات القلق والإدانة.

ويعتبر التحالف أن توظيف الدين لتعبئة المقاتلين وتبرير الانتهاكات وتحويل مؤسسات الدولة إلى أدوات في خدمة أجندة تنظيمية يمثّل تهديدًا مباشرًا لحقوق الإنسان ولفرص السلام. فدماء السودانيين ليست ثمنًا مقبولًا لعودة أي تنظيم إلى السلطة، ولا ينبغي السماح بأن تصبح الحرب وسيلة لإعادة إنتاج الاستبداد والإفلات من العقاب.

ويدعو التحالف هولندا والاتحاد الأوروبي إلى رصد شبكات التمويل والتسليح المرتبطة بالانتهاكات في السودان، وفرض تدابير محددة الأهداف على المسؤولين عنها استنادًا إلى أدلة موثوقة، ودعم التحقيقات المستقلة وملاحقة مرتكبي الجرائم. ويؤكد أن السلام المستدام يتطلب حماية المدنيين، وإنهاء نفوذ الميليشيات داخل مؤسسات الدولة، وبناء جيش مهني بعيد عن السياسة وخاضع للسلطة المدنية، من دون التفريط في العدالة وحقوق الضحايا.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 10 نوفمبر 2026`;

const AR_EXCERPT =
  'يرحّب التحالف باعتماد مجلس النواب الهولندي اقتراحًا يحثّ على حظر جماعة الإخوان المسلمين، ويدعو هولندا والاتحاد الأوروبي إلى التحرك بشأن السودان: رصد شبكات التمويل والتسليح، وفرض تدابير محددة الأهداف، ودعم التحقيقات المستقلة.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) salue l'adoption par la Chambre des représentants des Pays-Bas d'une motion appelant le gouvernement à interdire les Frères musulmans et les organisations qui leur sont affiliées.

La Coalition considère cette démarche comme une prise de position politique importante, qui appelle des mesures juridiques efficaces pour contrer les organisations et réseaux impliqués dans la violence et la déstabilisation, dans le plein respect des garanties judiciaires et des libertés fondamentales.

La Coalition souligne que la situation au Soudan mérite une attention particulière dans ce contexte. Le département du Trésor des États-Unis a attribué à des groupes islamistes soudanais un rôle dans l'entrave à la transition démocratique et l'obstruction du pouvoir civil, le département citant en particulier l'implication de la brigade Al-Baraa ibn Malik dans des arrestations arbitraires, des actes de torture et des exécutions sommaires.

En outre, en sanctionnant le commandant de la brigade, l'Union européenne a invoqué sa responsabilité de commandement dans l'exécution de civils et l'atteinte à la transition politique. Ces faits exigent une reddition de comptes qui aille au-delà des déclarations de préoccupation et de condamnation.

La Coalition estime que l'instrumentalisation de la religion pour mobiliser des combattants, justifier des violations et transformer les institutions de l'État en instruments au service d'un agenda organisationnel constitue une menace directe pour les droits de l'homme et les perspectives de paix. Le sang du peuple soudanais n'est pas un prix acceptable pour le retour au pouvoir d'une quelconque organisation, et la guerre ne doit pas devenir un moyen de reproduire la tyrannie et l'impunité.

La Coalition appelle les Pays-Bas et l'Union européenne à surveiller les réseaux de financement et d'armement liés aux violations au Soudan, à imposer des mesures ciblées aux responsables sur la base de preuves fiables et à soutenir les enquêtes indépendantes et la poursuite des auteurs de crimes. Elle réaffirme qu'une paix durable exige la protection des civils, l'élimination de l'influence des milices au sein des institutions de l'État et la construction d'une armée professionnelle, séparée de la politique et subordonnée au pouvoir civil, sans transiger sur la justice et les droits des victimes.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 10 novembre 2026`;

const FR_EXCERPT =
  "La Coalition salue la motion de la Chambre des représentants des Pays-Bas appelant à interdire les Frères musulmans et demande aux Pays-Bas et à l'UE d'agir sur le Soudan : surveiller les réseaux de financement et d'armement, imposer des mesures ciblées et soutenir des enquêtes indépendantes.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-10',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title: 'ICHRO Welcomes Dutch Motion to Ban the Muslim Brotherhood and Calls for Accountability in Sudan',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'التحالف يرحّب بالاقتراح الهولندي لحظر جماعة الإخوان المسلمين ويدعو إلى المساءلة في السودان',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "L'ICHRO salue la motion néerlandaise visant à interdire les Frères musulmans et appelle à rendre des comptes au Soudan",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: client-style photo card (docs/runbooks/press/photo-card.md) in all three locales. The
// band is the client's photograph of the Binnenhof; the source file stays in press/, uncommitted.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/3/binnenhof-band.jpg' };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Welcomes the Dutch motion to ban the Muslim Brotherhood and calls for accountability in Sudan',
    dateline: 'GENEVA',
    date: 'Date: 10 November 2026',
    lead: 'The Coalition calls on the Netherlands and the European Union to monitor funding and arming networks linked to violations in Sudan, impose targeted measures and support independent investigations.',
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يرحّب بالاقتراح الهولندي لحظر جماعة الإخوان المسلمين ويدعو إلى المساءلة في السودان',
    dateline: 'جنيف',
    date: 'التاريخ: 10 نوفمبر 2026',
    lead: 'يدعو التحالف هولندا والاتحاد الأوروبي إلى رصد شبكات التمويل والتسليح المرتبطة بالانتهاكات في السودان، وفرض تدابير محددة الأهداف، ودعم التحقيقات المستقلة.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: 'salue la motion néerlandaise visant à interdire les Frères musulmans et appelle à rendre des comptes au Soudan',
    dateline: 'GENÈVE',
    date: 'Date : 10 novembre 2026',
    lead: "La Coalition appelle les Pays-Bas et l'Union européenne à surveiller les réseaux de financement et d'armement liés aux violations au Soudan, à imposer des mesures ciblées et à soutenir des enquêtes indépendantes.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
