// Statement, Geneva, 5 November 2026 — the Coalition calls for transparency and an independent
// investigation after a Mail Talks (Daily Mail) report that gold from Sudan is helping fund the
// Sudanese military and Russia's war in Ukraine.
// Source: the Mail Talks video the Coalition shared at https://youtu.be/AbYsmnHQPgA, and the
// description on that upload (no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-sudan-gold-financing-war.mjs
//               node --env-file=.env.local prisma/seed-statement-sudan-gold-financing-war.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-sudan-gold-financing-war.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-sudan-gold-financing-war.mjs
//
// Covers: node scripts/gen-photo-card.mjs prisma/seed-statement-sudan-gold-financing-war.mjs
//
// EDITORIAL NOTES (decided with the client, 5 November 2026):
//  - DATELINE: GENEVA, 5 November 2026, the day the video was uploaded (01:09 UTC).
//  - ATTRIBUTION, load-bearing — keep it in any edit: every finding is the Daily Mail's
//    ("according to the report", "reported"); the Coalition "has not independently verified"
//    the findings or figures; the consequence is conditional ("if confirmed"). Carried into AR
//    (وفق التقرير / المُبلَّغ عنها / لم يتحقق التحالف بشكل مستقل / وإذا ثبتت) and FR (selon ce
//    reportage / signalé(es) / n'a pas vérifié … de manière indépendante / s'il était confirmé).
//  - FIGURES as shown in the video: ~70 tonnes produced in 2025, ~14 tonnes officially recorded.
//    "The Sudanese military" is the Coalition's own reading, from the YouTube description.
//  - ADDED TEXT, drafted by us: the third paragraph, the four demands and the closing appeal.
//    The full text in all three languages was approved by the client on 5 November 2026.
//  - THIRD-PARTY MATERIAL: the video is Mail Talks' (Daily Mail); the cover's image band is a
//    Reuters frame from it (press/NOV/2/frame.jpg, cropped clear of the Daily Mail caption and
//    the Reuters mark), used at the client's choice. Both are credited in the body.
//  - The same text is the `statement` of the video entry sudan-gold-russia-war-ukraine-2026 in
//    src/data/videos.ts — change both together.
//  - Category Statement. Covers: client-style photo card (PHOTO_CARDS). No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'statement-sudan-gold-financing-war-november-2026';
// Generated once, 5 November 2026. Never regenerate.
export const TRANSLATION_KEY = '4dd8002d-b348-45ac-9b58-48a41a02ce6b';

const VIDEO_URL = 'https://youtu.be/AbYsmnHQPgA';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) has taken note of a report by Mail Talks (Daily Mail) on the trade in Sudan's gold. According to the report, Sudan produced around 70 tonnes of gold in 2025, of which only around 14 tonnes were officially recorded, and gold from Sudan is helping to fund the Sudanese military and Russia's war in Ukraine.

The Coalition has not independently verified these findings or figures. If confirmed, a gap of this scale would mean that most of the country's gold leaves through unofficial channels, beyond any public oversight, while Sudan's civilians endure one of the gravest humanitarian crises in the world.

Revenues from natural resources must serve the people of Sudan. When they are diverted to finance armed conflict, at home or abroad, they prolong wars in which civilians pay the highest price.

**The Coalition calls for:**

- an independent investigation into the reported channels through which Sudan's gold is exported, and into any role of this trade in financing armed conflict in Sudan and in Ukraine;
- full transparency from the Sudanese authorities on gold production, exports and the use of the revenues;
- rigorous due diligence by refiners, traders and importing states, so that gold financing armed conflict does not enter international markets;
- accountability for any violations of international law, including applicable sanctions, by any party involved.

The Coalition urges the United Nations, the African Union and the European Union to examine these reports, and reaffirms that the wealth of Sudan belongs to its people, not to the war.

[Watch the video](${VIDEO_URL})

*Video: Mail Talks (Daily Mail). Cover photograph: Reuters, via Mail Talks.*

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 5 November 2026`;

const EN_EXCERPT =
  "A report by Mail Talks (Daily Mail) says gold from Sudan is helping fund the Sudanese military and Russia's war in Ukraine. The Coalition has not independently verified the findings, and calls for transparency on Sudan's gold revenues and an independent investigation into the trade.";

const AR_BODY = `اطّلع التحالف الدولي لمنظمات حقوق الإنسان على تقرير نشرته منصة Mail Talks التابعة لصحيفة ديلي ميل بشأن تجارة الذهب السوداني. ووفق التقرير، أنتج السودان نحو 70 طنًا من الذهب في عام 2025، لم يُسجَّل منها رسميًا سوى نحو 14 طنًا، ويُسهم الذهب السوداني في تمويل الجيش السوداني والحرب الروسية في أوكرانيا.

ولم يتحقق التحالف بشكل مستقل من هذه النتائج أو الأرقام. وإذا ثبتت، فإن فجوة بهذا الحجم تعني أن معظم ذهب البلاد يغادرها عبر قنوات غير رسمية بعيدًا عن أي رقابة عامة، في وقت يعاني فيه المدنيون في السودان واحدة من أشد الأزمات الإنسانية في العالم.

إن عائدات الموارد الطبيعية يجب أن تخدم شعب السودان، وحين تُحوَّل إلى تمويل النزاعات المسلحة، في الداخل أو في الخارج، فإنها تُطيل أمد حروب يدفع المدنيون ثمنها الأكبر.

**ويطالب التحالف بما يلي:**

- إجراء تحقيق مستقل في القنوات المُبلَّغ عنها لتصدير الذهب السوداني، وفي أي دور لهذه التجارة في تمويل النزاع المسلح في السودان وفي أوكرانيا؛
- الشفافية الكاملة من جانب السلطات السودانية بشأن إنتاج الذهب وصادراته وأوجه إنفاق عائداته؛
- بذل العناية الواجبة الصارمة من جانب المصافي والتجار والدول المستوردة، حتى لا يدخل الذهب الذي يموّل النزاعات المسلحة إلى الأسواق الدولية؛
- محاسبة أي طرف متورط في انتهاكات للقانون الدولي، بما في ذلك العقوبات المعمول بها.

ويحثّ التحالف الأمم المتحدة والاتحاد الأفريقي والاتحاد الأوروبي على النظر في هذه التقارير، ويؤكد أن ثروات السودان ملك لشعبه، لا للحرب.

[شاهد الفيديو](${VIDEO_URL})

*الفيديو: Mail Talks (ديلي ميل). صورة الغلاف: رويترز، عبر Mail Talks.*

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 5 نوفمبر 2026`;

const AR_EXCERPT =
  'يفيد تقرير لمنصة Mail Talks التابعة لصحيفة ديلي ميل بأن الذهب السوداني يُسهم في تمويل الجيش السوداني والحرب الروسية في أوكرانيا. ولم يتحقق التحالف بشكل مستقل من هذه النتائج، ويطالب بالشفافية بشأن عائدات الذهب وبتحقيق مستقل في هذه التجارة.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) a pris connaissance d'un reportage de Mail Talks (Daily Mail) sur le commerce de l'or soudanais. Selon ce reportage, le Soudan a produit environ 70 tonnes d'or en 2025, dont seulement 14 tonnes environ ont été officiellement enregistrées, et l'or soudanais contribue à financer l'armée soudanaise ainsi que la guerre de la Russie en Ukraine.

La Coalition n'a pas vérifié ces conclusions ni ces chiffres de manière indépendante. S'il était confirmé, un écart de cette ampleur signifierait que la majeure partie de l'or du pays le quitte par des circuits non officiels, hors de tout contrôle public, alors que les civils soudanais subissent l'une des crises humanitaires les plus graves au monde.

Les revenus des ressources naturelles doivent servir le peuple soudanais. Lorsqu'ils sont détournés pour financer des conflits armés, sur le territoire national ou à l'étranger, ils prolongent des guerres dont les civils paient le prix le plus lourd.

**La Coalition demande :**

- une enquête indépendante sur les filières signalées d'exportation de l'or soudanais et sur tout rôle de ce commerce dans le financement des conflits armés au Soudan et en Ukraine ;
- une transparence totale des autorités soudanaises sur la production d'or, les exportations et l'utilisation des revenus ;
- un devoir de diligence rigoureux de la part des affineurs, des négociants et des États importateurs, afin que l'or qui finance des conflits armés n'entre pas sur les marchés internationaux ;
- l'établissement des responsabilités pour toute violation du droit international, y compris des sanctions applicables, par toute partie impliquée.

La Coalition exhorte les Nations unies, l'Union africaine et l'Union européenne à examiner ces informations, et réaffirme que les richesses du Soudan appartiennent à son peuple, et non à la guerre.

[Voir la vidéo](${VIDEO_URL})

*Vidéo : Mail Talks (Daily Mail). Photographie de couverture : Reuters, via Mail Talks.*

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 5 novembre 2026`;

const FR_EXCERPT =
  "Selon un reportage de Mail Talks (Daily Mail), l'or soudanais contribue à financer l'armée soudanaise et la guerre de la Russie en Ukraine. La Coalition n'a pas vérifié ces conclusions de manière indépendante et demande la transparence sur les revenus de l'or soudanais ainsi qu'une enquête indépendante sur ce commerce.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-05',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Ukraine', '#SudanGold', '#Geneva'],
  locales: [
    {
      locale: 'en',
      title:
        "ICHRO Calls for Transparency and an Independent Investigation into the Reported Financing of War Through Sudan's Gold",
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي لمنظمات حقوق الإنسان يطالب بالشفافية وبتحقيق مستقل في التقارير عن تمويل الحرب بذهب السودان',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "L'ICHRO demande la transparence et une enquête indépendante sur le financement signalé de la guerre par l'or soudanais",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: client-style photo card (docs/runbooks/press/photo-card.md). The band is a frame of the
// video (Reuters footage), at the client's choice; the source file stays in press/, uncommitted.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/2/frame.jpg' };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: "Calls for transparency and an independent investigation into the reported financing of war through Sudan's gold",
    dateline: 'GENEVA',
    date: 'Date: 5 November 2026',
    lead: 'A report by Mail Talks (Daily Mail) says gold from Sudan is helping fund the Sudanese military and Russia’s war in Ukraine: around 70 tonnes produced in 2025, only about 14 officially recorded. The Coalition has not independently verified these figures.',
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يطالب بالشفافية وبتحقيق مستقل في التقارير عن تمويل الحرب بذهب السودان',
    dateline: 'جنيف',
    date: 'التاريخ: 5 نوفمبر 2026',
    lead: 'يفيد تقرير لصحيفة ديلي ميل بأن الذهب السوداني يُسهم في تمويل الجيش السوداني والحرب الروسية في أوكرانيا، إذ أُنتج نحو 70 طنًا في عام 2025 لم يُسجَّل منها رسميًا سوى نحو 14 طنًا. ولم يتحقق التحالف بشكل مستقل من هذه الأرقام.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: "demande la transparence et une enquête indépendante sur le financement signalé de la guerre par l'or soudanais",
    dateline: 'GENÈVE',
    date: 'Date : 5 novembre 2026',
    lead: "Selon un reportage de Mail Talks (Daily Mail), l'or soudanais contribue à financer l'armée soudanaise et la guerre de la Russie en Ukraine : environ 70 tonnes produites en 2025, dont 14 seulement enregistrées officiellement. La Coalition n'a pas vérifié ces chiffres.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
