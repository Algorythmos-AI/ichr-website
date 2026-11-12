// Press release, Dakar, 12 November 2026 — "The International Coalition of Human Rights
// Organizations and the Rural Community Organization Participate in the 89th Session of the
// African Committee on Human and Peoples' Rights".
// Source: press/NOV/5/ (note.rtf, the client's text; J1–J4.jpg, the client's four designed
// cards with photographs from the session, 2000 x 2000).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-press-release-achpr-89th-session-dakar.mjs
//               node --env-file=.env.local prisma/seed-press-release-achpr-89th-session-dakar.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-press-release-achpr-89th-session-dakar.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-press-release-achpr-89th-session-dakar.mjs
//
// Images: the client's cards, re-encoded to 1600 px (cover.jpg = J4; card-1..3 = J1..J3).
// Variants: node scripts/gen-image-variants.mjs ichro-srco-89th-session-african-committee-dakar-november-2026
//
// EDITORIAL NOTES (13 November 2026):
//  - NAME, kept at the owner's choice: the client's text and all four cards say "African
//    Committee on Human and Peoples' Rights"; the body's official name is the African
//    COMMISSION (ACHPR), as the session backdrop in the photos shows. Published as "Committee"
//    so the text matches the cards. AR/FR follow the same choice (اللجنة / Comité).
//  - COPY-EDIT, meaning unchanged: "International Coalition for Human Rights Organizations"
//    -> "of" (house name); the fragment "From the perspective of victims' rights and the fight
//    against impunity." joined to the next sentence; stray spaces removed.
//  - HEDGE, keep in any edit: Haroun is wanted by the ICC for "alleged" war crimes and crimes
//    against humanity in Darfur (AR: المزعومة; FR: présumés).
//  - DATE: the source gives only the session dates (12–21 October 2026). Dated 12 November 2026,
//    the day the client sent it, dateline Dakar, at the owner's choice.
//  - Category Press Release. The contact lines are dropped (site footer; non-BMP emoji).
//  - AR and FR are our translations. The cards are English-only client artwork, used in every
//    locale; captions say so.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'ichro-srco-89th-session-african-committee-dakar-november-2026';
// Generated once, 13 November 2026. Never regenerate.
export const TRANSLATION_KEY = 'ca6b6d01-af26-4e06-9a04-b8b763bc3d7a';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO), alongside its member organization, the Sudanese Rural Community Organization (SRCO), is actively following up on the outcomes of its participation in the 89th Ordinary Session of the African Committee on Human and Peoples' Rights (ACHPR), held in Dakar from October 12 to 21, 2026.

This engagement aims to strengthen the protection of civilians and amplify the demands of war victims in Sudan before African and international institutions.

This follow-up comes amid ongoing attacks on civilians and vital infrastructure, escalating displacement and deepening humanitarian needs.

The Coalition underscores that safeguarding the rights to life, security, education and health, alongside ensuring unhindered humanitarian access, must remain at the forefront of the response to the crisis in Sudan.

From the perspective of victims' rights and the fight against impunity, the Coalition views the recent media appearance of Ahmed Haroun—who is wanted by the International Criminal Court (ICC) for alleged war crimes and crimes against humanity in Darfur—as a grave development. The Coalition stresses that this appearance underscores the urgent necessity of enforcing arrest warrants, cooperating with justice mechanisms and guaranteeing victims' right to redress.

Human rights organizations warn against complacency and the inadequacy of the African response in providing protection and monitoring violations.

The Coalition calls upon the African Union (AU) and regional bodies to stand unequivocally with victims, bolster independent monitoring and investigation efforts, protect witnesses and human rights defenders and ensure the meaningful inclusion of affected communities in decisions impacting their lives.

Furthermore, the Coalition urges European Union (EU) institutions to expand their civilian protection mechanisms, support investigations and accountability efforts, impose targeted measures against perpetrators of violations and their financiers and scale up humanitarian assistance while ensuring the protection of aid workers.

The President of the Sudanese Rural Community Organization emphasizes that the follow-up to the Dakar consultations must yield measurable outcomes: enhanced civilian protection, safe humanitarian access, rigorous documentation to preserve evidence and comprehensive accountability for all those proven responsible for violations, without selectivity.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Dakar, 12 November 2026`;

const EN_EXCERPT =
  'ICHRO and its member, the Sudanese Rural Community Organization, are following up on their participation in the 89th Ordinary Session in Dakar (12–21 October 2026), calling on the African Union and the EU to strengthen civilian protection and accountability in Sudan.';

const AR_BODY = `يتابع التحالف الدولي لمنظمات حقوق الإنسان (ICHRO)، إلى جانب عضوه منظمة المجتمع الريفي السودانية (SRCO)، بنشاط نتائج مشاركته في الدورة العادية التاسعة والثمانين للجنة الأفريقية لحقوق الإنسان والشعوب، التي عُقدت في داكار من 12 إلى 21 أكتوبر 2026.

وتهدف هذه المشاركة إلى تعزيز حماية المدنيين وإيصال مطالب ضحايا الحرب في السودان إلى المؤسسات الأفريقية والدولية.

وتأتي هذه المتابعة في ظل استمرار الهجمات على المدنيين والبنى التحتية الحيوية، وتصاعد النزوح، وتفاقم الاحتياجات الإنسانية.

ويؤكد التحالف أن صون الحق في الحياة والأمن والتعليم والصحة، إلى جانب ضمان وصول المساعدات الإنسانية دون عوائق، يجب أن يظل في صدارة الاستجابة للأزمة في السودان.

ومن منظور حقوق الضحايا ومكافحة الإفلات من العقاب، يرى التحالف في الظهور الإعلامي الأخير لأحمد هارون — المطلوب لدى المحكمة الجنائية الدولية بتهم جرائم حرب وجرائم ضد الإنسانية مزعومة في دارفور — تطورًا خطيرًا. ويشدّد التحالف على أن هذا الظهور يؤكد الضرورة الملحّة لتنفيذ أوامر القبض، والتعاون مع آليات العدالة، وضمان حق الضحايا في جبر الضرر.

وتحذّر منظمات حقوق الإنسان من التراخي ومن قصور الاستجابة الأفريقية في توفير الحماية ورصد الانتهاكات.

ويدعو التحالف الاتحاد الأفريقي والهيئات الإقليمية إلى الوقوف بوضوح إلى جانب الضحايا، وتعزيز جهود الرصد والتحقيق المستقلة، وحماية الشهود والمدافعين عن حقوق الإنسان، وضمان المشاركة الفعلية للمجتمعات المتضررة في القرارات التي تمس حياتها.

كما يحثّ التحالف مؤسسات الاتحاد الأوروبي على توسيع آليات حماية المدنيين، ودعم جهود التحقيق والمساءلة، وفرض تدابير محددة الأهداف على مرتكبي الانتهاكات وممّوليهم، وزيادة المساعدات الإنسانية مع ضمان حماية العاملين في المجال الإنساني.

ويؤكد رئيس منظمة المجتمع الريفي السودانية أن متابعة مشاورات داكار يجب أن تُفضي إلى نتائج قابلة للقياس: حماية معزّزة للمدنيين، ووصول إنساني آمن، وتوثيق دقيق يحفظ الأدلة، ومساءلة شاملة لكل من تثبت مسؤوليته عن الانتهاكات، دون انتقائية.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

داكار، 12 نوفمبر 2026`;

const AR_EXCERPT =
  'يتابع التحالف وعضوه منظمة المجتمع الريفي السودانية نتائج مشاركتهما في الدورة العادية التاسعة والثمانين في داكار (12–21 أكتوبر 2026)، داعيَين الاتحاد الأفريقي والاتحاد الأوروبي إلى تعزيز حماية المدنيين والمساءلة في السودان.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO), aux côtés de son organisation membre, l'Organisation soudanaise des communautés rurales (SRCO), assure activement le suivi des résultats de sa participation à la 89e session ordinaire du Comité africain des droits de l'homme et des peuples (CADHP), tenue à Dakar du 12 au 21 octobre 2026.

Cet engagement vise à renforcer la protection des civils et à porter les revendications des victimes de la guerre au Soudan devant les institutions africaines et internationales.

Ce suivi intervient dans un contexte d'attaques continues contre les civils et les infrastructures vitales, de déplacements croissants et de besoins humanitaires de plus en plus graves.

La Coalition souligne que la sauvegarde des droits à la vie, à la sécurité, à l'éducation et à la santé, ainsi qu'un accès humanitaire sans entrave, doivent rester au premier plan de la réponse à la crise au Soudan.

Du point de vue des droits des victimes et de la lutte contre l'impunité, la Coalition considère la récente apparition médiatique d'Ahmed Haroun — recherché par la Cour pénale internationale (CPI) pour des crimes de guerre et des crimes contre l'humanité présumés au Darfour — comme un développement grave. La Coalition souligne que cette apparition met en évidence l'urgence d'exécuter les mandats d'arrêt, de coopérer avec les mécanismes de justice et de garantir le droit des victimes à réparation.

Les organisations de défense des droits de l'homme mettent en garde contre la complaisance et l'insuffisance de la réponse africaine en matière de protection et de surveillance des violations.

La Coalition appelle l'Union africaine (UA) et les organismes régionaux à se tenir sans équivoque aux côtés des victimes, à renforcer la surveillance et les enquêtes indépendantes, à protéger les témoins et les défenseurs des droits de l'homme et à garantir la participation effective des communautés touchées aux décisions qui concernent leur vie.

En outre, la Coalition exhorte les institutions de l'Union européenne (UE) à étendre leurs mécanismes de protection des civils, à soutenir les enquêtes et les efforts de reddition de comptes, à imposer des mesures ciblées contre les auteurs de violations et leurs financiers et à accroître l'aide humanitaire tout en garantissant la protection des travailleurs humanitaires.

Le président de l'Organisation soudanaise des communautés rurales souligne que le suivi des consultations de Dakar doit produire des résultats mesurables : une protection renforcée des civils, un accès humanitaire sûr, une documentation rigoureuse pour préserver les preuves et une reddition de comptes complète pour tous ceux dont la responsabilité dans les violations est établie, sans sélectivité.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Dakar, 12 novembre 2026`;

const FR_EXCERPT =
  "L'ICHRO et son membre, l'Organisation soudanaise des communautés rurales, assurent le suivi de leur participation à la 89e session ordinaire à Dakar (12–21 octobre 2026) et appellent l'Union africaine et l'UE à renforcer la protection des civils et la reddition de comptes au Soudan.";

const cards = (caption) =>
  [1, 2, 3].map((n, i) => ({ url: `/blog/${SLUG}/card-${n}.jpg`, caption, order: i }));

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-11-12',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#ACHPR'],
  locales: [
    {
      locale: 'en',
      title:
        "The International Coalition of Human Rights Organizations and the Rural Community Organization Participate in the 89th Session of the African Committee on Human and Peoples' Rights",
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Dakar',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
      gallery: cards('ICHRO and SRCO delegates at the 89th Ordinary Session, Dakar, 12–21 October 2026.'),
    },
    {
      locale: 'ar',
      title:
        'التحالف الدولي لمنظمات حقوق الإنسان ومنظمة المجتمع الريفي يشاركان في الدورة التاسعة والثمانين للجنة الأفريقية لحقوق الإنسان والشعوب',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'داكار',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
      gallery: cards('وفد التحالف ومنظمة المجتمع الريفي في الدورة العادية التاسعة والثمانين، داكار، 12–21 أكتوبر 2026 (بطاقة بالإنجليزية).'),
    },
    {
      locale: 'fr',
      title:
        "La Coalition internationale des organisations de défense des droits de l'homme et l'Organisation des communautés rurales participent à la 89e session du Comité africain des droits de l'homme et des peuples",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Dakar',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
      gallery: cards("Délégués de l'ICHRO et de la SRCO à la 89e session ordinaire, Dakar, 12–21 octobre 2026 (carte en anglais)."),
    },
  ],
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
