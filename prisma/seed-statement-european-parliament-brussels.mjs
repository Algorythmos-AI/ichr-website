// Press release, 30 September 2026 — a Coalition delegation meets four Members of the
// European Parliament in Brussels on the crisis in Sudan (arms embargo, the Fact-Finding
// Mission's mandate, the EU's role in peace), and the Sudanese Rural Community Organization
// presents the situation in rural regions.
//
// Source: press/OCT/1 (note.rtf — English only — and three designed social cards, 1080x1350:
// two with the English headline, one with the Arabic headline). Re-encoded to card-1.jpg,
// card-2.jpg and card-ar.jpg under public/blog/<slug>/. AR and FR are translations of the
// English note.
//
// EDITORIAL DECISIONS (confirmed with the client — do not "improve" on a re-run):
//   * DATE and DATELINE: 30 September 2026, Brussels. The note carries the city but no date;
//     the date was supplied separately by the client.
//   * ATTRIBUTION KEPT VERBATIM: "systematic violence and widespread abuses perpetrated by
//     the Armed Forces and allied ideological militias from factions of the Islamic Movement"
//     is the Sudanese Rural Community Organization's account, and stays framed as what its
//     "reports and testimonies" detail in all three languages. Do not turn it into a
//     statement of fact in the Coalition's own voice. "Grave allegations" of chemical weapons
//     use keeps its hedge — ادعاءات / allégations.
//   * NAME OF THE COALITION. Title, body and sign-off use the house brand "International
//     Coalition for Human Rights (ICHR)". The note and the cards read "International
//     Coalition of Human Rights Organizations"; the artwork is the client's and is NOT
//     retouched (HRC63 precedent).
//   * NAMES AND POSITIONS live in the group-photo caption, not on the artwork. The
//     left-to-right order was supplied by the client; the positions are those published by
//     the Sudanese Rural Community Organization. Only the first three people are named.
//     Abdelrahim Grein carries no title because none was supplied — do not invent one. The
//     two people on the right were not identified and stay unnamed. The MEPs are not named
//     (the note says "four Members of the European Parliament").
//   * ADDED TEXT, not in the source: the sign-off block with the dateline.
//   * Copy-edit limited to spacing, capitalisation, the ":-" marks, the house name, and
//     setting the three dossiers as a bullet list. American spelling is kept.
//   * COVER = supplied artwork: card-1 (group photo, English headline) on EN and FR,
//     card-ar (Arabic headline) on AR. No COVERS export, gen-press-cover.mjs is NOT run.
//     card-1 is repeated in every gallery because the cover has no caption and the caption
//     is where the names and positions are shown.
//
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-european-parliament-brussels.mjs
//               node --env-file=.env.local prisma/seed-statement-european-parliament-brussels.mjs
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-european-parliament-brussels.mjs
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-european-parliament-brussels.mjs
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'european-parliament-sudan-advocacy-brussels-september-2026';
export const TRANSLATION_KEY = '1c1eccff-840a-4eee-9c71-bc65e0eb753d';

const EN_BODY = `BRUSSELS — The corridors of the European Parliament witnessed intense international human rights advocacy as a delegation from the International Coalition for Human Rights (ICHR) held a series of critical meetings with four Members of the European Parliament (MEPs).

These discussions aimed to shed light on the deteriorating humanitarian situation in Sudan and urge European decision-makers to uphold their responsibilities regarding the ongoing violations faced by civilians, drawing upon a comprehensive review of documented human rights and field reports.

The talks between the human rights delegation and European parliamentarians focused on the urgent need to exert international pressure across three primary dossiers:

- **Comprehensive arms embargo.** A complete ban on weapons across all Sudanese territories topped the agenda as a decisive step to ensure civilian protection and halt the machinery of war.
- **Expanded fact-finding mandate.** The delegation demanded the expansion of the mandate and duties of the International Fact-Finding Mission to conduct immediate and transparent investigations into grave allegations concerning the use of chemical weapons.
- **Effective European role in peace.** The third pillar addressed pathways to comprehensive peace, emphasizing the necessity of activating a robust and decisive European Union role in enforcing a ceasefire and supporting stability efforts nationwide.

Providing a detailed context of the crisis, the Sudanese Rural Community Organization — a leading member of the Coalition focusing on rural issues — delivered an exhaustive overview of the catastrophe unfolding in rural regions. The organization explained how rural communities have paid the heaviest price in the ongoing conflict, presenting reports and testimonies detailing systematic violence and widespread abuses perpetrated by the Armed Forces and allied ideological militias from factions of the Islamic Movement, alongside other armed groups exploiting the state of lawlessness and profiting from acts of violence.

The meetings concluded with a mutual commitment to sustain coordination between international human rights institutions and the European Parliament. Both sides underscored the necessity of translating these demands into actionable European policies designed to end the suffering of the Sudanese people, combat impunity, and lay the foundation for a new phase of a just and sustainable peace.

---

**THE INTERNATIONAL COALITION FOR HUMAN RIGHTS**

Advancing Human Rights • Peace • Justice

Brussels, 30 September 2026`;

const EN_EXCERPT =
  'A delegation of the International Coalition for Human Rights met four Members of the European Parliament in Brussels to press for a comprehensive arms embargo on Sudan, an expanded fact-finding mandate and a decisive European role in peace, while the Sudanese Rural Community Organization presented reports and testimonies on abuses against civilians in rural regions.';

const AR_BODY = `بروكسل — شهدت أروقة البرلمان الأوروبي حراكاً حقوقياً دولياً مكثفاً، حيث عقد وفد من التحالف الدولي لحقوق الإنسان (ICHR) سلسلة من اللقاءات المهمة مع أربعة من أعضاء البرلمان الأوروبي.

وهدفت هذه المباحثات إلى تسليط الضوء على تدهور الوضع الإنساني في السودان، وحثّ صنّاع القرار الأوروبيين على تحمّل مسؤولياتهم إزاء الانتهاكات المستمرة التي يتعرض لها المدنيون، استناداً إلى استعراض شامل للتقارير الحقوقية والميدانية الموثقة.

وتركزت المحادثات بين الوفد الحقوقي والبرلمانيين الأوروبيين على الحاجة الملحّة إلى ممارسة ضغط دولي في ثلاثة ملفات رئيسية:

- **حظر شامل للأسلحة.** تصدّر جدول الأعمال فرض حظر كامل على الأسلحة في جميع الأراضي السودانية، باعتباره خطوة حاسمة لضمان حماية المدنيين ووقف آلة الحرب.
- **توسيع ولاية تقصي الحقائق.** طالب الوفد بتوسيع ولاية ومهام البعثة الدولية لتقصي الحقائق لإجراء تحقيقات فورية وشفافة في الادعاءات الخطيرة المتعلقة باستخدام الأسلحة الكيميائية.
- **دور أوروبي فاعل في السلام.** تناول المحور الثالث مسارات السلام الشامل، مع التأكيد على ضرورة تفعيل دور قوي وحاسم للاتحاد الأوروبي في فرض وقف إطلاق النار ودعم جهود الاستقرار في عموم البلاد.

وفي إطار تقديم سياق مفصّل للأزمة، قدّمت منظمة مجتمع الريف السوداني — وهي عضو بارز في التحالف يُعنى بقضايا الريف — عرضاً وافياً للكارثة التي تشهدها المناطق الريفية. وأوضحت المنظمة كيف دفعت المجتمعات الريفية الثمن الأفدح في النزاع الدائر، وعرضت تقارير وشهادات تفصّل العنف الممنهج والانتهاكات الواسعة التي ارتكبتها القوات المسلحة والمليشيات الأيديولوجية المتحالفة معها من فصائل الحركة الإسلامية، إلى جانب مجموعات مسلحة أخرى تستغل حالة الانفلات الأمني وتتربّح من أعمال العنف.

واختُتمت اللقاءات بالتزام متبادل بمواصلة التنسيق بين المؤسسات الحقوقية الدولية والبرلمان الأوروبي. وشدّد الجانبان على ضرورة ترجمة هذه المطالب إلى سياسات أوروبية قابلة للتنفيذ تهدف إلى إنهاء معاناة الشعب السوداني، ومكافحة الإفلات من العقاب، وإرساء أسس مرحلة جديدة من السلام العادل والمستدام.

---

**التحالف الدولي لحقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

بروكسل، 30 سبتمبر 2026`;

const AR_EXCERPT =
  'التقى وفد من التحالف الدولي لحقوق الإنسان أربعة من أعضاء البرلمان الأوروبي في بروكسل للمطالبة بحظر شامل للأسلحة في السودان وتوسيع ولاية تقصي الحقائق ودور أوروبي حاسم في السلام، فيما عرضت منظمة مجتمع الريف السوداني تقارير وشهادات عن الانتهاكات ضد المدنيين في المناطق الريفية.';

const FR_BODY = `BRUXELLES — Les couloirs du Parlement européen ont été le théâtre d'un intense plaidoyer international en faveur des droits humains : une délégation de la Coalition internationale pour les droits de l'homme (ICHR) y a tenu une série de réunions décisives avec quatre députés au Parlement européen.

Ces échanges visaient à mettre en lumière la détérioration de la situation humanitaire au Soudan et à exhorter les décideurs européens à assumer leurs responsabilités face aux violations que continuent de subir les civils, en s'appuyant sur un examen complet de rapports documentés relatifs aux droits humains et de rapports de terrain.

Les discussions entre la délégation et les parlementaires européens ont porté sur la nécessité urgente d'exercer une pression internationale sur trois dossiers principaux :

- **Embargo complet sur les armes.** L'interdiction totale des armes sur l'ensemble du territoire soudanais figurait en tête de l'ordre du jour, comme mesure décisive pour assurer la protection des civils et enrayer la machine de guerre.
- **Mandat d'établissement des faits élargi.** La délégation a demandé l'élargissement du mandat et des attributions de la Mission internationale d'établissement des faits, afin qu'elle mène des enquêtes immédiates et transparentes sur les graves allégations concernant l'emploi d'armes chimiques.
- **Rôle européen effectif pour la paix.** Le troisième volet a porté sur les voies menant à une paix globale, en soulignant la nécessité d'activer un rôle fort et décisif de l'Union européenne pour imposer un cessez-le-feu et soutenir les efforts de stabilisation dans tout le pays.

Pour replacer la crise dans son contexte, l'Organisation de la communauté rurale soudanaise (Sudanese Rural Community Organization) — membre de premier plan de la Coalition, spécialisé dans les questions rurales — a présenté un exposé exhaustif de la catastrophe qui se déroule dans les régions rurales. L'organisation a expliqué comment les communautés rurales ont payé le plus lourd tribut au conflit en cours, en présentant des rapports et des témoignages faisant état de violences systématiques et d'exactions généralisées commises par les Forces armées et des milices idéologiques alliées issues de factions du Mouvement islamique, ainsi que par d'autres groupes armés qui exploitent l'état de non-droit et tirent profit des actes de violence.

Les réunions se sont conclues par un engagement mutuel à maintenir la coordination entre les institutions internationales de défense des droits humains et le Parlement européen. Les deux parties ont souligné la nécessité de traduire ces demandes en politiques européennes concrètes destinées à mettre fin aux souffrances du peuple soudanais, à lutter contre l'impunité et à jeter les bases d'une nouvelle phase de paix juste et durable.

---

**LA COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Bruxelles, le 30 septembre 2026`;

const FR_EXCERPT =
  "Une délégation de la Coalition internationale pour les droits de l'homme a rencontré quatre députés au Parlement européen à Bruxelles pour réclamer un embargo complet sur les armes au Soudan, un mandat d'établissement des faits élargi et un rôle européen décisif pour la paix, tandis que l'Organisation de la communauté rurale soudanaise présentait des rapports et des témoignages sur les exactions contre les civils dans les régions rurales.";

const CARD1 = `/blog/${SLUG}/card-1.jpg`; // group photo, English headline
const CARD2 = `/blog/${SLUG}/card-2.jpg`; // meeting room, English headline
const CARD_AR = `/blog/${SLUG}/card-ar.jpg`; // meeting room, Arabic headline

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-09-30',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Brussels', '#EuropeanParliament', '#ProtectCivilians'],
  locales: [
    {
      locale: 'en',
      title:
        "ICHR Brings Sudan's Crisis to the European Parliament as the Sudanese Rural Community Organization Exposes Abuses Against Civilians",
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Brussels',
      authorName: 'ICHR Communications',
      coverImageUrl: CARD1,
      gallery: [
        { url: CARD1, caption: 'From left: Osman Ibrahim, Treasurer of the Sudanese Rural Community Organization; Abdelrahim Grein; and Musab Yousif, Secretary General of the Sudanese Rural Community Organization, with fellow members of the delegation at the European Parliament in Brussels, 30 September 2026.', order: 0 },
        { url: CARD2, caption: 'The delegation in a meeting at the European Parliament in Brussels, 30 September 2026.', order: 1 },
      ],
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي لحقوق الإنسان ينقل مأساة السودان إلى البرلمان الأوروبي ومنظمة مجتمع الريف السوداني تكشف تفاصيل الانتهاكات ضد المدنيين',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'بروكسل',
      authorName: 'إعلام ICHR',
      coverImageUrl: CARD_AR,
      gallery: [
        { url: CARD1, caption: 'من اليسار: عثمان إبراهيم، أمين المال في منظمة مجتمع الريف السوداني؛ وعبد الرحيم قرين؛ ومصعب يوسف، الأمين العام لمنظمة مجتمع الريف السوداني، مع أعضاء آخرين في الوفد في البرلمان الأوروبي ببروكسل، 30 سبتمبر 2026.', order: 0 },
        { url: CARD2, caption: 'الوفد خلال أحد اللقاءات في البرلمان الأوروبي ببروكسل، 30 سبتمبر 2026.', order: 1 },
      ],
    },
    {
      locale: 'fr',
      title:
        "L'ICHR porte la crise du Soudan devant le Parlement européen, tandis que l'Organisation de la communauté rurale soudanaise expose les exactions contre les civils",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Bruxelles',
      authorName: 'Communication ICHR',
      coverImageUrl: CARD1,
      gallery: [
        { url: CARD1, caption: "De gauche à droite : Osman Ibrahim, trésorier de l'Organisation de la communauté rurale soudanaise ; Abdelrahim Grein ; et Musab Yousif, secrétaire général de l'Organisation de la communauté rurale soudanaise, avec d'autres membres de la délégation au Parlement européen à Bruxelles, le 30 septembre 2026.", order: 0 },
        { url: CARD2, caption: 'La délégation en réunion au Parlement européen à Bruxelles, le 30 septembre 2026.', order: 1 },
      ],
    },
  ],
};

// No COVERS export: every locale is headed by supplied artwork, so
// scripts/gen-press-cover.mjs is not run for this statement.

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
