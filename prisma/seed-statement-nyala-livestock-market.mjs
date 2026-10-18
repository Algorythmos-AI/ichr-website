// "Statement of Condemnation on the Shelling of the Nyala Livestock Market" — Paris,
// 16 October 2026. Source: text supplied in chat; no artwork.
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-nyala-livestock-market.mjs
//               node --env-file=.env.local prisma/seed-statement-nyala-livestock-market.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-nyala-livestock-market.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-nyala-livestock-market.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-nyala-livestock-market.mjs
//
// EDITORIAL NOTES (decided with the client, 18 October 2026):
//  - Dateline PARIS, 16 October 2026, from the statement — the same day as the attack.
//  - Attribution: the statement holds the Sudanese Armed Forces "fully responsible" and calls
//    the attack a "systematic crime". The client approved publishing it as written; both are
//    the Coalition's own position, worded as such, in all three languages.
//  - The death toll keeps its source: "according to reports from local organisations
//    contacted by the Coalition". Carried into AR (وفق تقارير…) and FR (selon des
//    informations…). Do not harden it into a statement of fact.
//  - Light copy-edit at the client's choice: the house name "International Coalition for
//    Human Rights (ICHR)" replaces "…of Human Rights Organizations"; the calls to the
//    Fact-Finding Mission and the Human Rights Council are set as a list; punctuation tidied.
//    The substance is unchanged.
//  - The source has no sign-off or tagline; the house sign-off is added, as on every other
//    statement.
//  - No artwork supplied: covers are generated. No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-nyala-livestock-market-october-2026';
// Generated once, 18 October 2026. Never regenerate.
export const TRANSLATION_KEY = 'aa0a4ef9-527d-40f9-9156-118f5775dbb3';

const EN_BODY = `The International Coalition for Human Rights (ICHR) condemns in the strongest possible terms the drone attack carried out by the Sudanese Armed Forces on the livestock market in the city of Nyala on Friday, 16 October 2026.

According to reports from local organisations contacted by the Coalition, the attack killed thirty civilians. It was a horrific assault on the lives of the population and on their primary source of livelihood.

The Coalition expresses its profound outrage at this systematic crime. The bombardment of markets and the endangerment of civilian lives cannot be justified under any military pretext.

The Coalition holds the Sudanese Armed Forces fully responsible for the attack, and demands that everyone who ordered or carried it out be held accountable.

**The Coalition calls upon:**

- the Independent International Fact-Finding Mission for the Sudan to urgently investigate the incident, document survivors' testimonies, preserve evidence and establish responsibility, including command responsibility;
- the Human Rights Council to take immediate action to support accountability, to press for an end to attacks on civilians, and to ensure the unhindered delivery of medical aid and humanitarian relief.

The blood of civilians in Nyala is not a statistic. Expressions of concern are no longer enough: civilians need urgent protection, and accountability is imperative to end impunity.

---

**INTERNATIONAL COALITION FOR HUMAN RIGHTS**

Advancing Human Rights • Peace • Justice

Paris, 16 October 2026`;

const EN_EXCERPT =
  'ICHR condemns in the strongest terms the drone attack by the Sudanese Armed Forces on the Nyala livestock market on 16 October 2026, which according to local organisations contacted by the Coalition killed thirty civilians, and calls on the UN Fact-Finding Mission and the Human Rights Council to act.';

const AR_BODY = `يدين التحالف الدولي لحقوق الإنسان بأشد العبارات الهجوم بالطائرات المسيّرة الذي نفّذته القوات المسلحة السودانية على سوق المواشي في مدينة نيالا يوم الجمعة 16 أكتوبر 2026.

ووفق تقارير منظمات محلية تواصل معها التحالف، أسفر الهجوم عن مقتل ثلاثين مدنيًا، في اعتداء مروّع على أرواح السكان وعلى مصدر رزقهم الأساسي.

ويعرب التحالف عن بالغ سخطه إزاء هذه الجريمة الممنهجة، مؤكدًا أن قصف الأسواق وتعريض حياة المدنيين للخطر لا يمكن تبريرهما بأي ذريعة عسكرية.

ويحمّل التحالف القوات المسلحة السودانية المسؤولية الكاملة عن الهجوم، ويطالب بمحاسبة كل من أمر به أو نفّذه.

**ويدعو التحالف:**

- البعثة الدولية المستقلة لتقصي الحقائق بشأن السودان إلى التحقيق العاجل في الحادثة، وتوثيق شهادات الناجين، وحفظ الأدلة، وتحديد المسؤوليات، بما في ذلك مسؤولية القيادة؛
- مجلس حقوق الإنسان إلى اتخاذ إجراءات فورية لدعم المساءلة، والضغط لوقف الهجمات على المدنيين، وضمان إيصال المساعدات الطبية والإغاثة الإنسانية دون عوائق.

إن دماء المدنيين في نيالا ليست مجرد أرقام. لم تعد عبارات القلق كافية؛ فالحماية العاجلة والمساءلة ضرورة لإنهاء الإفلات من العقاب.

---

**التحالف الدولي لحقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

باريس، 16 أكتوبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الدولي لحقوق الإنسان بأشد العبارات الهجوم بالطائرات المسيّرة الذي نفّذته القوات المسلحة السودانية على سوق المواشي في نيالا في 16 أكتوبر 2026، والذي أسفر، وفق منظمات محلية تواصل معها التحالف، عن مقتل ثلاثين مدنيًا، ويدعو بعثة تقصي الحقائق ومجلس حقوق الإنسان إلى التحرك.';

const FR_BODY = `La Coalition internationale pour les droits de l'homme (ICHR) condamne avec la plus grande fermeté l'attaque de drone menée par les Forces armées soudanaises contre le marché aux bestiaux de la ville de Nyala, le vendredi 16 octobre 2026.

Selon les informations d'organisations locales contactées par la Coalition, l'attaque a tué trente civils. Elle constitue une agression effroyable contre la vie de la population et contre sa principale source de subsistance.

La Coalition exprime sa profonde indignation face à ce crime systématique. Le bombardement de marchés et la mise en danger de vies civiles ne sauraient être justifiés par aucun prétexte militaire.

La Coalition tient les Forces armées soudanaises pour entièrement responsables de l'attaque, et exige que toutes les personnes qui l'ont ordonnée ou exécutée rendent des comptes.

**La Coalition appelle :**

- la Mission internationale indépendante d'établissement des faits pour le Soudan à enquêter d'urgence sur l'incident, à recueillir les témoignages des survivants, à préserver les preuves et à établir les responsabilités, y compris la responsabilité du commandement ;
- le Conseil des droits de l'homme à agir immédiatement pour soutenir l'établissement des responsabilités, obtenir l'arrêt des attaques contre les civils et garantir l'acheminement sans entrave de l'aide médicale et humanitaire.

Le sang des civils de Nyala n'est pas une statistique. Les expressions de préoccupation ne suffisent plus : une protection urgente et l'établissement des responsabilités sont indispensables pour mettre fin à l'impunité.

---

**COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Paris, 16 octobre 2026`;

const FR_EXCERPT =
  "L'ICHR condamne avec la plus grande fermeté l'attaque de drone des Forces armées soudanaises contre le marché aux bestiaux de Nyala, le 16 octobre 2026, qui selon des organisations locales contactées par la Coalition a tué trente civils, et appelle la Mission d'établissement des faits et le Conseil des droits de l'homme à agir.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-10-16',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Nyala'],
  locales: [
    {
      locale: 'en',
      title: 'Statement of Condemnation on the Shelling of the Nyala Livestock Market',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Paris',
      authorName: 'ICHR Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة لقصف سوق المواشي في نيالا',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'باريس',
      authorName: 'إعلام ICHR',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: 'Déclaration de condamnation du bombardement du marché aux bestiaux de Nyala',
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Paris',
      authorName: 'Communication ICHR',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION FOR HUMAN RIGHTS',
    eyebrow: 'STATEMENT OF CONDEMNATION',
    headline: ['Drone Attack on the', 'Livestock Market', 'in Nyala'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Paris',
    date: '16 OCTOBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION DE CONDAMNATION',
    headline: ['Attaque de drone contre', 'le marché aux bestiaux', 'de Nyala'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Paris',
    date: '16 OCTOBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لحقوق الإنسان',
    eyebrow: 'بيان إدانة',
    headline: ['الهجوم بالطائرات المسيّرة', 'على سوق المواشي', 'في نيالا'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'باريس',
    date: '16 أكتوبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
