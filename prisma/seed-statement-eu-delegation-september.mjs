// Press release, 22 September 2026 — the Coalition meets Mrs. Katarina Tapio of the
// Delegation of the European Union to the UN in Geneva on the crisis in Sudan: protection
// of civilians, halting external interventions, expanding the arms embargo, and inquiries
// into allegations of chemical weapons use.
//
// Source: press/SEP/2 (notes.rtf — English only — and two designed cards: Geneva.jpg
// 2048x1152 landscape, Meeting.jpg 2480x3312 portrait). Re-encoded to card-1/2.jpg under
// public/blog/<slug>/. AR and FR are translations of the English notes.
//
// This is a FOLLOW-UP to the 2 June 2026 meeting with the same official
// (eu-delegation-geneva-sudan-june-2026, seed-eu-delegation.mjs) — not a duplicate.
//
// EDITORIAL DECISIONS (confirmed with the client — do not "improve" on a re-run):
//   * NAME: "Katarina Tapio" (AR كاتارينا تابيو, FR Mme Katarina Tapio). The notes spell it
//     "Tapiyo" — a typo: both supplied cards and the June seeds read "Tapio".
//   * NAME OF THE COALITION. Body and sign-off use the house brand "International Coalition
//     for Human Rights (ICHR)". The notes and cards read "International coalition of Human
//     Rights Organizations"; the artwork is the client's and is NOT retouched (HRC63 precedent).
//   * VERBATIM: the EU official's pledge on chemical-weapons inquiries is the coalition's own
//     account and is kept, with its hedge — "allegations" / ادعاءات / allégations — in all
//     three languages. "External interventions" names no state; do not add one.
//   * ADDED TEXT, not in the source: the one-line continuity link to the June meeting, just
//     above the sign-off. Relative href per locale; renderMarkdown keeps it and adds rel.
//   * COVER = supplied landscape card (card-1.jpg, Geneva.jpg) on all three locales — it suits
//     the 1200x630 og:image; the /news tile letterboxes it (object-contain). No COVERS export,
//     gen-press-cover.mjs is NOT run.
//   * Gallery = card-2 (Meeting.jpg, portrait) on all three locales. Caption is deliberately
//     GENERIC — the three coalition delegates are not named (not supplied by the client).
//   * Copy-edit limited to capitalisation, spacing and the house name. The source's
//     American spelling (centered, fueled) is kept. The source's third and fourth blocks
//     are split into paragraphs at their existing sentence breaks.
//   * ADDED 25 Sep 2026 (client, WhatsApp, French only): the "Coalition stressed that…"
//     paragraph after the FFM paragraph. FR is the client's wording with the lead-in added;
//     EN and AR are translations. Conditional mood kept — do not harden it into a statement
//     of fact.
//
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-eu-delegation-september.mjs
//               node --env-file=.env.local prisma/seed-statement-eu-delegation-september.mjs
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-eu-delegation-september.mjs
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-eu-delegation-september.mjs
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'eu-delegation-geneva-sudan-september-2026';
export const TRANSLATION_KEY = '6cc35ded-c10f-4591-97cd-a72b01f9efcf';

const JUNE_SLUG = 'eu-delegation-geneva-sudan-june-2026';

const EN_BODY = `GENEVA — A strategic and high-level meeting took place on 22 September 2026 between Mrs. Katarina Tapio, representative of the European Union Delegation to the United Nations in Geneva, and the International Coalition for Human Rights (ICHR).

The agenda centered primarily on the crisis in Sudan, prioritizing the urgent protection of civilians as an absolute imperative.

The Coalition delegation briefed Mrs. Tapio on the escalating humanitarian crisis and its profound impact on civilians across Sudan.

The meeting featured candid discussions regarding the critical necessity of halting external interventions which have directly fueled the conflict and diminished prospects for peace. To address the sharp deterioration of the humanitarian situation and rising indicators of famine, participants strongly emphasized the need to expand arms embargo mechanisms across all Sudanese territories to safeguard civilian lives.

The dialogue further underscored the importance of empowering civil society mechanisms and activating their pivotal role in halting the war and building sustainable peace. In this regard, the Coalition commended the European Union for its steadfast support of accountability and justice through the extension of the mandate of the Independent International Fact-Finding Mission for the Sudan.

The Coalition stressed that extending the mandate of the Fact-Finding Mission would allow it to continue its work, and that extending the arms embargo to the whole of the Sudanese territory would help put an end to external interference, thereby supporting the protection of the population, the cessation of the war and the return of displaced persons and refugees to their homes.

Concluding the meeting's outcomes, the European official pledged to work toward expanding investigative mechanisms to encompass inquiries into allegations of chemical weapons use during the conflict.

The meeting follows [the Coalition's talks with Mrs. Tapio on 2 June 2026](/news/${JUNE_SLUG}).

---

**THE INTERNATIONAL COALITION FOR HUMAN RIGHTS**

Advancing Human Rights • Peace • Justice

Geneva, 22 September 2026`;

const EN_EXCERPT =
  'The International Coalition for Human Rights met Mrs. Katarina Tapio of the EU Delegation to the UN in Geneva to discuss the crisis in Sudan, placing the urgent protection of civilians first and calling for arms embargo mechanisms to be expanded across all Sudanese territories.';

const AR_BODY = `جنيف — عُقد في 22 سبتمبر 2026 اجتماع استراتيجي رفيع المستوى بين السيدة كاتارينا تابيو، ممثلة بعثة الاتحاد الأوروبي لدى الأمم المتحدة في جنيف، والتحالف الدولي لحقوق الإنسان (ICHR).

وتمحور جدول الأعمال أساساً حول الأزمة في السودان، مع إعطاء الأولوية للحماية العاجلة للمدنيين باعتبارها ضرورة مطلقة.

وأطلع وفد التحالف السيدة تابيو على تفاقم الأزمة الإنسانية وتأثيرها العميق على المدنيين في جميع أنحاء السودان.

وشهد الاجتماع نقاشات صريحة حول الضرورة الملحّة لوقف التدخلات الخارجية التي أسهمت بشكل مباشر في تأجيج النزاع وتقليص فرص السلام. ولمواجهة التدهور الحاد في الوضع الإنساني وتزايد مؤشرات المجاعة، شدّد المشاركون بقوة على ضرورة توسيع آليات حظر الأسلحة لتشمل جميع الأراضي السودانية، حمايةً لأرواح المدنيين.

كما أكد الحوار أهمية تمكين آليات المجتمع المدني وتفعيل دورها المحوري في وقف الحرب وبناء سلام مستدام. وفي هذا الصدد، أشاد التحالف بالدعم الثابت الذي يقدمه الاتحاد الأوروبي للمساءلة والعدالة من خلال تمديد ولاية البعثة الدولية المستقلة لتقصي الحقائق بشأن السودان.

وشدّد التحالف على أن تمديد ولاية بعثة تقصي الحقائق من شأنه أن يتيح لها مواصلة أعمالها، وأن توسيع حظر الأسلحة ليشمل كامل الأراضي السودانية سيسهم في وضع حدّ للتدخلات الخارجية، بما يعزز حماية السكان ووقف الحرب وعودة النازحين واللاجئين إلى ديارهم.

وفي ختام الاجتماع، تعهّدت المسؤولة الأوروبية بالعمل على توسيع آليات التحقيق لتشمل التحقيق في ادعاءات استخدام الأسلحة الكيميائية خلال النزاع.

ويأتي هذا الاجتماع في أعقاب [المباحثات التي أجراها التحالف مع السيدة تابيو في 2 يونيو 2026](/ar/news/${JUNE_SLUG}).

---

**التحالف الدولي لحقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 22 سبتمبر 2026`;

const AR_EXCERPT =
  'التقى التحالف الدولي لحقوق الإنسان السيدة كاتارينا تابيو من بعثة الاتحاد الأوروبي لدى الأمم المتحدة في جنيف لبحث الأزمة في السودان، مع إعطاء الأولوية للحماية العاجلة للمدنيين والدعوة إلى توسيع آليات حظر الأسلحة لتشمل جميع الأراضي السودانية.';

const FR_BODY = `GENÈVE — Une réunion stratégique de haut niveau s'est tenue le 22 septembre 2026 entre Mme Katarina Tapio, représentante de la délégation de l'Union européenne auprès des Nations Unies à Genève, et la Coalition internationale pour les droits de l'homme (ICHR).

L'ordre du jour a porté principalement sur la crise au Soudan, la protection urgente des civils étant érigée en impératif absolu.

La délégation de la Coalition a informé Mme Tapio de l'aggravation de la crise humanitaire et de ses profondes répercussions sur les civils dans l'ensemble du Soudan.

La réunion a donné lieu à des échanges francs sur la nécessité impérieuse de mettre fin aux interventions extérieures, qui ont directement alimenté le conflit et réduit les perspectives de paix. Face à la forte détérioration de la situation humanitaire et à la multiplication des signes de famine, les participants ont fermement insisté sur la nécessité d'étendre les mécanismes d'embargo sur les armes à l'ensemble du territoire soudanais afin de protéger la vie des civils.

Le dialogue a en outre souligné l'importance de renforcer les mécanismes de la société civile et d'activer leur rôle essentiel pour mettre fin à la guerre et bâtir une paix durable. À cet égard, la Coalition a salué le soutien constant de l'Union européenne à la responsabilité et à la justice, à travers la prorogation du mandat de la Mission internationale indépendante d'établissement des faits pour le Soudan.

La Coalition a souligné que la prorogation du mandat de la Mission d'établissement des faits permettrait à celle-ci de poursuivre ses travaux, et que l'extension de l'embargo sur les armes à l'ensemble du territoire soudanais contribuerait à mettre fin aux ingérences extérieures, ce qui favoriserait la protection des populations, la cessation de la guerre ainsi que le retour des personnes déplacées et des réfugiés dans leurs foyers.

En conclusion de la réunion, la responsable européenne s'est engagée à œuvrer à l'élargissement des mécanismes d'enquête afin qu'ils couvrent les allégations d'emploi d'armes chimiques au cours du conflit.

Cette réunion fait suite aux [entretiens de la Coalition avec Mme Tapio le 2 juin 2026](/fr/news/${JUNE_SLUG}).

---

**LA COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, le 22 septembre 2026`;

const FR_EXCERPT =
  "La Coalition internationale pour les droits de l'homme a rencontré Mme Katarina Tapio, de la délégation de l'Union européenne auprès des Nations Unies à Genève, pour examiner la crise au Soudan, en plaçant la protection urgente des civils au premier plan et en appelant à étendre les mécanismes d'embargo sur les armes à l'ensemble du territoire soudanais.";

const CARD1 = `/blog/${SLUG}/card-1.jpg`; // cover: Geneva.jpg, landscape
const CARD2 = `/blog/${SLUG}/card-2.jpg`; // gallery: Meeting.jpg, portrait

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-09-22',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Geneva', '#EU', '#ProtectCivilians'],
  locales: [
    {
      locale: 'en',
      title: 'ICHR Meets Mrs. Katarina Tapio of the EU Delegation in Geneva on the Protection of Civilians in Sudan',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHR Communications',
      coverImageUrl: CARD1,
      gallery: [
        { url: CARD2, caption: 'Coalition representatives with Mrs. Katarina Tapio at the Delegation of the European Union to the UN in Geneva, 22 September 2026.', order: 0 },
      ],
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي لحقوق الإنسان يلتقي السيدة كاتارينا تابيو من بعثة الاتحاد الأوروبي في جنيف لبحث حماية المدنيين في السودان',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHR',
      coverImageUrl: CARD1,
      gallery: [
        { url: CARD2, caption: 'ممثلو التحالف الدولي لحقوق الإنسان مع السيدة كاتارينا تابيو في بعثة الاتحاد الأوروبي لدى الأمم المتحدة في جنيف، 22 سبتمبر 2026.', order: 0 },
      ],
    },
    {
      locale: 'fr',
      title: "L'ICHR rencontre Mme Katarina Tapio, de la délégation de l'Union européenne à Genève, sur la protection des civils au Soudan",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHR',
      coverImageUrl: CARD1,
      gallery: [
        { url: CARD2, caption: "Des représentants de la Coalition avec Mme Katarina Tapio à la délégation de l'Union européenne auprès des Nations Unies à Genève, le 22 septembre 2026.", order: 0 },
      ],
    },
  ],
};

// No COVERS export: all three locales are headed by supplied artwork (card-1.jpg), so
// scripts/gen-press-cover.mjs is not run for this statement.

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
