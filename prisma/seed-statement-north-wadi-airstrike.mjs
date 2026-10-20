// "Statement of Condemnation: Airstrike Targeting Sudanese Miners in the North Wadi Region"
// — Brussels, 12 October 2026. Source: supplied as plain text with a YouTube Short
// (nOMTA-D4szk), which is on /media at sudan-miners-airstrike-north-wadi-2026.
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-north-wadi-airstrike.mjs
//               node --env-file=.env.local prisma/seed-statement-north-wadi-airstrike.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-north-wadi-airstrike.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-north-wadi-airstrike.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-north-wadi-airstrike.mjs
//
// EDITORIAL NOTES (decided with the client, 14 October 2026):
//  - Dateline BRUSSELS, from the statement ("BRUXELLES, October 12,2026").
//  - The body is a light copy-edit, NOT verbatim, at the client's choice, so the article
//    reads exactly as the statement on the /media page does: the house name "International
//    Coalition for Human Rights (ICHR)" replaces "…of Human Rights Organizations", long
//    sentences are split, and the demands are set as a list. The substance is unchanged.
//  - Attribution: the statement attributes the strike to the Egyptian air force. It stays
//    the Coalition's own attribution ("The Coalition attributes…"), as in the source, and the
//    client approved publishing it. The death toll keeps its source: "according to
//    information received by the Coalition". Both hedges are carried into AR and FR.
//  - "North Wadi" is kept as written; the Arabic is وادي الشمال, confirmed by the client.
//  - No designed artwork was supplied: covers are generated. No gallery. The video is linked
//    from the body rather than embedded (the body is sanitized Markdown, no iframes).
//  - The contact block (website, email) is dropped from the body, as with every earlier
//    statement: it is in the site footer and on /contact. Sign-off and tagline are kept.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-airstrike-miners-north-wadi-october-2026';
// Generated once, 14 October 2026. Never regenerate.
export const TRANSLATION_KEY = '5b6ad0cc-e04c-48f4-be45-3e32d97afaab';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) strongly condemns the airstrike that targeted Sudanese miners in the North Wadi region on 10 October 2026.

According to information received by the Coalition, more than one hundred civilians were killed. They were working to earn a living. They leave behind bereaved families, and many of the injured are in urgent need of medical care.

The Coalition attributes the attack to the Egyptian air force, which struck the site inside Sudanese territory. Targeting civilians is a grave violation of international humanitarian law. Allegations of mining or smuggling can never justify bombarding civilians or stripping them of the protection the law guarantees.

**The Coalition calls for:**

- an urgent, independent international investigation to establish responsibility, document the casualties and preserve evidence;
- accountability for those responsible, and justice for the victims’ families;
- protection for witnesses, and unimpeded access for investigators and relief teams;
- prompt medical treatment for the injured.

The Coalition urges the United Nations, the African Union, the European Union and international human rights organisations to act without delay: to condemn the targeting of civilians, to press for an end to these attacks and to guarantee that they are not repeated. It invites human rights organisations to join a joint petition for truth, justice and accountability, and to carry the voices of the victims’ families to the international community.

The killing of civilians can never be justified, nor treated as a passing news item. The victims and their families have a right to truth and redress, and the international community must act.

[Watch the footage received by the Coalition](/media/sudan-miners-airstrike-north-wadi-2026)

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Brussels, 12 October 2026`;

const EN_EXCERPT =
  'ICHRO strongly condemns the airstrike of 10 October 2026 on Sudanese miners in the North Wadi region, which according to information received by the Coalition killed more than one hundred civilians. The Coalition attributes the attack to the Egyptian air force and calls for an urgent, independent international investigation.';

const AR_BODY = `يدين التحالف الدولي لمنظمات حقوق الإنسان بشدة الغارة الجوية التي استهدفت المعدّنين السودانيين في منطقة وادي الشمال في 10 أكتوبر 2026.

ووفق المعلومات الواردة إلى التحالف، تجاوز عدد القتلى مئة مدني كانوا يعملون لكسب أرزاقهم، وخلّفوا وراءهم أسرًا مكلومة وجرحى في حاجة ماسّة إلى الرعاية الطبية.

ويحمّل التحالف سلاح الجو المصري مسؤولية الهجوم، إذ قصف الموقع داخل الأراضي السودانية. إن استهداف المدنيين انتهاك جسيم لقواعد القانون الدولي الإنساني، ولا يمكن لادعاءات التعدين أو التهريب أن تبرّر قصف المدنيين أو حرمانهم من الحماية التي يكفلها القانون.

**ويطالب التحالف بما يلي:**

- إجراء تحقيق دولي مستقل وعاجل لتحديد المسؤوليات وتوثيق أعداد الضحايا وحفظ الأدلة؛
- محاسبة المسؤولين وتحقيق العدالة لأسر الضحايا؛
- حماية الشهود، وتيسير وصول فرق التحقيق والإغاثة دون عوائق؛
- تقديم العلاج الطبي العاجل للجرحى.

ويحثّ التحالف الأمم المتحدة والاتحاد الأفريقي والاتحاد الأوروبي والمنظمات الدولية لحقوق الإنسان على التحرك الفوري لإدانة استهداف المدنيين، والضغط لوقف هذه الهجمات، وضمان عدم تكرارها. كما يدعو منظمات حقوق الإنسان إلى الانضمام إلى عريضة مشتركة تطالب بالحقيقة والعدالة والمساءلة، وإلى إيصال أصوات أسر الضحايا إلى المجتمع الدولي.

إن قتل المدنيين لا يمكن تبريره، ولا التعامل معه كخبر عابر. للضحايا وأسرهم الحق في الحقيقة والإنصاف، وعلى المجتمع الدولي أن يتحرك.

[شاهد اللقطات التي وردت إلى التحالف](/ar/media/sudan-miners-airstrike-north-wadi-2026)

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

بروكسل، 12 أكتوبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الدولي لمنظمات حقوق الإنسان بشدة الغارة الجوية التي استهدفت المعدّنين السودانيين في منطقة وادي الشمال في 10 أكتوبر 2026، والتي أودت، وفق المعلومات الواردة إلى التحالف، بحياة أكثر من مئة مدني. ويحمّل التحالف سلاح الجو المصري مسؤولية الهجوم، ويطالب بتحقيق دولي مستقل وعاجل.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l’homme (ICHRO) condamne fermement la frappe aérienne qui a visé des mineurs soudanais dans la région de North Wadi le 10 octobre 2026.

Selon les informations reçues par la Coalition, plus de cent civils ont été tués. Ils travaillaient pour gagner leur vie. Ils laissent derrière eux des familles endeuillées, et de nombreux blessés ont un besoin urgent de soins médicaux.

La Coalition attribue l’attaque à l’armée de l’air égyptienne, qui a frappé le site en territoire soudanais. Prendre des civils pour cible constitue une violation grave du droit international humanitaire. Des allégations d’activité minière ou de contrebande ne sauraient en aucun cas justifier le bombardement de civils ni les priver de la protection que leur garantit le droit.

**La Coalition demande :**

- une enquête internationale indépendante et urgente pour établir les responsabilités, recenser les victimes et préserver les preuves ;
- que les responsables rendent des comptes, et que justice soit rendue aux familles des victimes ;
- la protection des témoins et un accès sans entrave pour les équipes d’enquête et de secours ;
- une prise en charge médicale rapide des blessés.

La Coalition exhorte les Nations unies, l’Union africaine, l’Union européenne et les organisations internationales de défense des droits humains à agir sans délai : condamner les attaques contre les civils, obtenir leur arrêt et garantir qu’elles ne se reproduiront pas. Elle invite les organisations de défense des droits humains à se joindre à une pétition commune pour la vérité, la justice et l’établissement des responsabilités, et à porter la voix des familles des victimes auprès de la communauté internationale.

Le meurtre de civils ne peut être ni justifié ni traité comme un simple fait divers. Les victimes et leurs familles ont droit à la vérité et à réparation, et la communauté internationale doit agir.

[Voir les images reçues par la Coalition](/fr/media/sudan-miners-airstrike-north-wadi-2026)

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L’HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Bruxelles, 12 octobre 2026`;

const FR_EXCERPT =
  'L’ICHRO condamne fermement la frappe aérienne du 10 octobre 2026 contre des mineurs soudanais dans la région de North Wadi, qui, selon les informations reçues par la Coalition, a tué plus de cent civils. La Coalition attribue l’attaque à l’armée de l’air égyptienne et demande une enquête internationale indépendante et urgente.';

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-10-12',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title: 'Statement of Condemnation: Airstrike Targeting Sudanese Miners in the North Wadi Region',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Brussels',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة: الغارة الجوية على المعدّنين السودانيين في منطقة وادي الشمال',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'بروكسل',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: 'Déclaration de condamnation : frappe aérienne contre des mineurs soudanais dans la région de North Wadi',
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Bruxelles',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover colour (scripts/lib/press-card.mjs THEMES). Each text-only cover has its own, so
// they read as a set on /news without being identical. Re-render with FORCE=1.
export const COVER_THEME = 'oxblood';

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'STATEMENT OF CONDEMNATION',
    headline: ['Airstrike Targeting', 'Sudanese Miners in', 'the North Wadi Region'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Brussels',
    date: '12 OCTOBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION DE CONDAMNATION',
    headline: ['Frappe aérienne contre', 'des mineurs soudanais', 'dans la région de North Wadi'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Bruxelles',
    date: '12 OCTOBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان إدانة',
    headline: ['الغارة الجوية على', 'المعدّنين السودانيين', 'في منطقة وادي الشمال'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'بروكسل',
    date: '12 أكتوبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
