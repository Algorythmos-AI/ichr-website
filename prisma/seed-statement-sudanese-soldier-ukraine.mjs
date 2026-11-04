// Statement, Geneva, 4 November 2026 — the Coalition calls for an independent investigation into
// the reported recruitment of Sudanese fighters into the war in Ukraine, after receiving footage
// that appears to show a Sudanese Armed Forces soldier fighting alongside Russian forces.
// Source: the Coalition's own YouTube description of https://youtu.be/tAwyoJdM6c0 (no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-sudanese-soldier-ukraine.mjs
//               node --env-file=.env.local prisma/seed-statement-sudanese-soldier-ukraine.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-sudanese-soldier-ukraine.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-sudanese-soldier-ukraine.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-sudanese-soldier-ukraine.mjs
//
// EDITORIAL NOTES (decided with the client, 4 November 2026):
//  - DATELINE: GENEVA, 4 November 2026, the day the video was uploaded. The source names no city.
//  - HEDGES, load-bearing — keep them in any edit: the video "appears to show" a man "identified
//    as" an SAF soldier; the targeting of civilians is "according to the information received";
//    the Coalition "has not independently verified" the identity of the person, his unit, or the
//    date and place of filming. Carried into AR (يبدو أنه يُظهر / يُعرَّف بأنه / وفق المعلومات
//    الواردة / لم يتحقق التحالف بشكل مستقل) and FR (semble montrer / présenté comme / selon les
//    informations reçues / n'a pas vérifié de manière indépendante).
//  - NAMED FORCE: the Hajanah (Camel Corps) unit in El Obeid is named as reported, not as fact.
//    AR وحدة الهجانة في مدينة الأبيض; FR unité Hajanah (corps des méharistes) d'El-Obeid. No
//    individual is named.
//  - ADDED TEXT, drafted by us from the description: the third paragraph (the legal concern,
//    conditional "if confirmed"), the four demands, and the closing appeal to the UN, AU and EU.
//    The video link at the end is also added. House sign-off and tagline added. The full text
//    in all three languages was approved by the client on 4 November 2026.
//  - The same text is the `statement` of the video entry sudanese-soldier-russian-forces-ukraine-2026
//    in src/data/videos.ts — change both together.
//  - Category Statement. Covers generated in the 'unblue' theme, typographic only: no frame of
//    the unverified individual in the OG image. No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'statement-sudanese-soldier-russian-forces-ukraine-november-2026';
// Generated once, 4 November 2026. Never regenerate.
export const TRANSLATION_KEY = 'a80cd557-29f5-4cda-af03-edf4eb8af39f';

const VIDEO_URL = 'https://youtu.be/tAwyoJdM6c0';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) has received a video that appears to show a man in military uniform, identified as a soldier of the Sudanese Armed Forces affiliated with the Hajanah (Camel Corps) unit in El Obeid, fighting alongside Russian military forces in Ukraine.

According to the information received by the Coalition, these operations target civilians in Ukraine. The Coalition has not independently verified the identity of the person shown, his unit, or the date and place of filming.

If confirmed, the involvement of Sudanese soldiers in a foreign armed conflict would raise serious concerns under international humanitarian law and international human rights law. It is all the more grave while Sudan's own civilians endure a devastating war.

**The Coalition calls for:**

- an independent investigation into the reported recruitment and deployment of Sudanese fighters to the war in Ukraine, including the channels and parties involved;
- full transparency from the Sudanese authorities on whether any members of their armed forces are serving in a foreign conflict;
- accountability for any violations committed against civilians, whoever the perpetrators;
- protection for any Sudanese nationals who may have been recruited through deception or coercion.

The Coalition urges the United Nations, the African Union and the European Union to examine these reports without delay. Civilians, in Ukraine and in Sudan alike, must never be targeted.

[Watch the video](${VIDEO_URL})

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 4 November 2026`;

const EN_EXCERPT =
  'A video received by ICHRO appears to show a man identified as a Sudanese Armed Forces soldier fighting alongside Russian forces in Ukraine. The Coalition has not independently verified the footage and calls for an independent investigation into the reported recruitment of Sudanese fighters into the war.';

const AR_BODY = `تلقّى التحالف الدولي لمنظمات حقوق الإنسان مقطع فيديو يبدو أنه يُظهر رجلًا بزي عسكري، يُعرَّف بأنه جندي في القوات المسلحة السودانية تابع لوحدة الهجانة في مدينة الأبيض، يقاتل إلى جانب القوات العسكرية الروسية في أوكرانيا.

ووفق المعلومات الواردة إلى التحالف، تستهدف هذه العمليات مدنيين في أوكرانيا. ولم يتحقق التحالف بشكل مستقل من هوية الشخص الظاهر في المقطع، أو من وحدته، أو من تاريخ التصوير ومكانه.

وإذا ثبتت مشاركة جنود سودانيين في نزاع مسلح خارجي، فإن ذلك يثير مخاوف جدية بموجب القانون الدولي الإنساني والقانون الدولي لحقوق الإنسان، ويزداد الأمر خطورة في وقت يعاني فيه المدنيون في السودان ويلات حرب مدمّرة.

**ويطالب التحالف بما يلي:**

- إجراء تحقيق مستقل في التقارير عن تجنيد مقاتلين سودانيين ونشرهم في الحرب في أوكرانيا، بما في ذلك القنوات والأطراف المتورطة؛
- الشفافية الكاملة من جانب السلطات السودانية بشأن ما إذا كان أيٌّ من أفراد قواتها المسلحة يقاتل في نزاع خارجي؛
- محاسبة مرتكبي أي انتهاكات بحق المدنيين، أيًّا كانوا؛
- حماية أي مواطنين سودانيين ربما جرى تجنيدهم عن طريق الخداع أو الإكراه.

ويحثّ التحالف الأمم المتحدة والاتحاد الأفريقي والاتحاد الأوروبي على النظر في هذه التقارير دون تأخير. ويجب ألّا يكون المدنيون هدفًا أبدًا، في أوكرانيا كما في السودان.

[شاهد الفيديو](${VIDEO_URL})

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 4 نوفمبر 2026`;

const AR_EXCERPT =
  'تلقّى التحالف الدولي لمنظمات حقوق الإنسان مقطع فيديو يبدو أنه يُظهر رجلًا يُعرَّف بأنه جندي في القوات المسلحة السودانية يقاتل إلى جانب القوات الروسية في أوكرانيا. ولم يتحقق التحالف بشكل مستقل من المقطع، ويطالب بتحقيق مستقل في التقارير عن تجنيد مقاتلين سودانيين في هذه الحرب.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) a reçu une vidéo qui semble montrer un homme en uniforme militaire, présenté comme un soldat des Forces armées soudanaises rattaché à l'unité Hajanah (corps des méharistes) d'El-Obeid, combattant aux côtés des forces militaires russes en Ukraine.

Selon les informations reçues par la Coalition, ces opérations visent des civils en Ukraine. La Coalition n'a pas vérifié de manière indépendante l'identité de la personne filmée, son unité, ni la date et le lieu du tournage.

Si elle était confirmée, la participation de soldats soudanais à un conflit armé étranger soulèverait de graves préoccupations au regard du droit international humanitaire et du droit international des droits de l'homme. Elle serait d'autant plus grave que les civils soudanais subissent eux-mêmes une guerre dévastatrice.

**La Coalition demande :**

- une enquête indépendante sur le recrutement et le déploiement signalés de combattants soudanais dans la guerre en Ukraine, y compris sur les filières et les parties impliquées ;
- une transparence totale des autorités soudanaises sur la présence éventuelle de membres de leurs forces armées dans un conflit étranger ;
- l'établissement des responsabilités pour toute violation commise contre des civils, quels qu'en soient les auteurs ;
- la protection de tout ressortissant soudanais qui aurait pu être recruté par la tromperie ou la contrainte.

La Coalition exhorte les Nations unies, l'Union africaine et l'Union européenne à examiner ces informations sans délai. Les civils, en Ukraine comme au Soudan, ne doivent jamais être pris pour cible.

[Voir la vidéo](${VIDEO_URL})

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 4 novembre 2026`;

const FR_EXCERPT =
  "Une vidéo reçue par l'ICHRO semble montrer un homme présenté comme un soldat des Forces armées soudanaises combattant aux côtés des forces russes en Ukraine. La Coalition n'a pas vérifié ces images de manière indépendante et demande une enquête indépendante sur le recrutement signalé de combattants soudanais dans cette guerre.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-04',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Ukraine', '#Geneva'],
  locales: [
    {
      locale: 'en',
      title:
        'ICHRO Calls for an Independent Investigation into the Reported Recruitment of Sudanese Fighters into the War in Ukraine',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title:
        'التحالف الدولي لمنظمات حقوق الإنسان يطالب بتحقيق مستقل في التقارير عن تجنيد مقاتلين سودانيين في الحرب في أوكرانيا',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "L'ICHRO demande une enquête indépendante sur le recrutement signalé de combattants soudanais dans la guerre en Ukraine",
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
    eyebrow: 'STATEMENT',
    headline: ['Call for an Independent', 'Investigation into', 'Sudanese Fighters', 'Reported in Ukraine'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Geneva',
    date: '4 NOVEMBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION',
    headline: ['Appel à une enquête', 'indépendante sur des', 'combattants soudanais', 'signalés en Ukraine'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Genève',
    date: '4 NOVEMBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان',
    headline: ['مطالبة بتحقيق مستقل', 'في التقارير عن مقاتلين', 'سودانيين في أوكرانيا'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'جنيف',
    date: '4 نوفمبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
