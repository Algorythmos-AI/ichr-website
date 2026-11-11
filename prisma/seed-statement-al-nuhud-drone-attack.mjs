// Statement, Paris, 9 November 2026 — "The International Coalition Denounces Deadly Drone Attack
// on Al-Nuhud, Calls for Independent Investigation and Accountability".
// Source: press/NOV/4/ (notes.rtf, the client's text; image.jpeg, a photograph of the Al-Nuhud
// locality headquarters).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-al-nuhud-drone-attack.mjs
//               node --env-file=.env.local prisma/seed-statement-al-nuhud-drone-attack.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-al-nuhud-drone-attack.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-al-nuhud-drone-attack.mjs
//
// Covers: photo cards in all three locales:
//   FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-al-nuhud-drone-attack.mjs
// Variants: node scripts/gen-image-variants.mjs condemnation-drone-attack-al-nuhud-west-kordofan-november-2026
//
// EDITORIAL NOTES (11 November 2026):
//  - The client's text is published VERBATIM in substance, at the owner's choice. Its
//    attribution of the strike to the SAF, "unlawful killing" and the link to Islamist
//    factions are the Coalition's own position, stated without hedges in the source; none were
//    added. Do not soften or harden them in any edit without the client.
//  - DATE CHECK: no independent report of a 9 November 2026 strike on Al-Nuhud was found on
//    11 November. OCHA reported a drone strike on a building sheltering displaced families in
//    An Nuhud on 9 OCTOBER 2026 (at least 12 civilians killed). Published with the client's
//    date (Monday 9 November 2026, which is a Monday), at the owner's choice. If the client
//    corrects the month, re-run this file plainly after editing; PUBLISH=1 alone writes nothing.
//  - COPY-EDIT, meaning unchanged: zero-width spaces and stray spaces removed; the title's
//    capitals normalised ("ACCOUNTABILITY" -> "Accountability"); "ORGANIZATIONS, strongly
//    condemns" -> "Organizations strongly condemns"; the closing two-line paragraph split as in
//    the source. Dateline Paris, 9 November 2026, as printed.
//  - The contact lines are dropped: they are in the site footer, and their emoji are non-BMP.
//  - AR and FR are our translations of the English.
//  - ARTWORK: the band is the client's photograph of the Al-Nuhud locality headquarters
//    (640 x 480) — a picture of the town, not of the strike. Natural colour, as the client asked
//    for the previous statement (press/NOV/4/al-nuhud-band.jpg, uncommitted).
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-drone-attack-al-nuhud-west-kordofan-november-2026';
// Generated once, 11 November 2026. Never regenerate.
export const TRANSLATION_KEY = 'd34be752-e818-478d-bc30-a2cb84e256e2';

const EN_BODY = `The International Coalition of Human Rights Organizations strongly condemns, in the clearest possible terms, the deadly drone strike launched by the Sudanese Armed Forces (SAF) on the city of Al-Nuhud, West Kordofan State, on the morning of Monday, 9 November 2026. The attack resulted in the unlawful killing of at least twenty civilians and injured dozens more, alongside the destruction of a commercial transport truck and critical civilian property. The Coalition holds the executing authorities and their command structure fully responsible for these casualties and demands an immediate, independent and impartial investigation to establish criminal liability and ensure all perpetrators are held to account.

The Coalition considers this strike a direct manifestation of the influence exerted by Islamist factions over strategic decision-making within the SAF leadership, which continues to instrumentally deploy military capabilities to serve a political project aimed at retaining power and thwarting the transition to civilian governance. Furthermore, the targeted direction of armed violence against communities in western Sudan reflects a punitive approach that treats local populations as adversaries based on their geographic location or perceived political affiliations, effectively weaponizing civilian lives and livelihoods for military and political leverage.

The Coalition reiterates that the residents of Al-Nuhud and all communities across western Sudan are entitled to equal rights to life, security and protection, regardless of the party exercising de facto control over their territories. No community may be subjected to collective punishment, targeted due to geographical location or presumed to hold specific political loyalties.

The Coalition stresses that deliberate attacks directed against civilians constitute war crimes under international law, and the destruction of civilian objects entails strict accountability under the rules of International Humanitarian Law (IHL).

Accordingly, the Coalition calls upon the Office of the High Commissioner for Human Rights (OHCHR) and the Independent International Fact-Finding Mission for the Sudan to urgently investigate this attack, preserve relevant evidence, and examine the individual and command responsibility of those who ordered, facilitated, or executed the strike.

The Coalition further urges the international community to take effective, concrete measures to enhance civilian protection, halt unlawful attacks, ensure the prompt medical evacuation of the injured and facilitate unhindered humanitarian access.

The Coalition extends its deepest condolences to the victims' families and reiterates that civilian lives must not be sacrificed for political power.

Any path toward terminating the conflict must be inextricably linked to international justice, redress for victims and structural guarantees of non-repetition.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Paris, 9 November 2026`;

const EN_EXCERPT =
  'The Coalition condemns the drone strike on Al-Nuhud, West Kordofan, on 9 November 2026, which killed at least twenty civilians, and calls on the OHCHR and the UN Fact-Finding Mission for the Sudan to investigate urgently and establish individual and command responsibility.';

const AR_BODY = `يدين التحالف الدولي لمنظمات حقوق الإنسان بشدة، وبأوضح العبارات الممكنة، الغارة الدامية بطائرة مسيّرة التي شنّتها القوات المسلحة السودانية على مدينة النهود بولاية غرب كردفان صباح يوم الاثنين 9 نوفمبر 2026. وقد أسفر الهجوم عن القتل غير المشروع لما لا يقل عن عشرين مدنيًا وإصابة العشرات، إلى جانب تدمير شاحنة نقل تجارية وممتلكات مدنية حيوية. ويحمّل التحالف الجهات المنفّذة وهيكل قيادتها المسؤولية الكاملة عن هذه الخسائر، ويطالب بتحقيق فوري ومستقل ونزيه لتحديد المسؤولية الجنائية وضمان محاسبة جميع الجناة.

ويرى التحالف في هذه الغارة تجليًا مباشرًا لنفوذ الفصائل الإسلامية على القرار الاستراتيجي داخل قيادة القوات المسلحة السودانية، التي تواصل توظيف القدرات العسكرية لخدمة مشروع سياسي يهدف إلى الاحتفاظ بالسلطة وإجهاض الانتقال إلى الحكم المدني. كما أن توجيه العنف المسلح بصورة متعمدة ضد المجتمعات في غرب السودان يعكس نهجًا عقابيًا يعامل السكان المحليين كخصوم على أساس موقعهم الجغرافي أو انتماءاتهم السياسية المفترضة، ويحوّل فعليًا أرواح المدنيين وسبل عيشهم إلى ورقة ضغط عسكرية وسياسية.

ويؤكد التحالف مجددًا أن سكان النهود وجميع المجتمعات في غرب السودان يتمتعون بحقوق متساوية في الحياة والأمن والحماية، بصرف النظر عن الطرف الذي يمارس السيطرة الفعلية على مناطقهم. ولا يجوز إخضاع أي مجتمع للعقاب الجماعي، أو استهدافه بسبب موقعه الجغرافي، أو افتراض ولاءات سياسية بعينها لديه.

ويشدّد التحالف على أن الهجمات المتعمدة ضد المدنيين تشكّل جرائم حرب بموجب القانون الدولي، وأن تدمير الأعيان المدنية يستوجب مساءلة صارمة وفق قواعد القانون الدولي الإنساني.

وبناءً على ذلك، يدعو التحالف مفوضية الأمم المتحدة السامية لحقوق الإنسان والبعثة الدولية المستقلة لتقصي الحقائق بشأن السودان إلى التحقيق العاجل في هذا الهجوم، وحفظ الأدلة ذات الصلة، وفحص المسؤولية الفردية ومسؤولية القيادة لمن أمروا بالغارة أو سهّلوها أو نفّذوها.

ويحثّ التحالف كذلك المجتمع الدولي على اتخاذ تدابير فعّالة وملموسة لتعزيز حماية المدنيين، ووقف الهجمات غير المشروعة، وضمان الإجلاء الطبي العاجل للجرحى، وتيسير وصول المساعدات الإنسانية دون عوائق.

ويتقدّم التحالف بأحرّ التعازي إلى أسر الضحايا، ويؤكد مجددًا أن أرواح المدنيين يجب ألا تُضحّى بها في سبيل السلطة السياسية.

إن أي مسار لإنهاء النزاع يجب أن يرتبط ارتباطًا وثيقًا بالعدالة الدولية، وجبر ضرر الضحايا، وضمانات هيكلية بعدم التكرار.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

باريس، 9 نوفمبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الغارة بطائرة مسيّرة على النهود بولاية غرب كردفان في 9 نوفمبر 2026، التي قُتل فيها ما لا يقل عن عشرين مدنيًا، ويدعو المفوضية السامية لحقوق الإنسان وبعثة تقصي الحقائق بشأن السودان إلى تحقيق عاجل وتحديد المسؤولية الفردية ومسؤولية القيادة.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme condamne avec la plus grande fermeté, dans les termes les plus clairs, la frappe meurtrière de drone menée par les Forces armées soudanaises (FAS) contre la ville d'Al-Nuhud, dans l'État du Kordofan-Occidental, le matin du lundi 9 novembre 2026. L'attaque a causé la mort illégale d'au moins vingt civils et blessé des dizaines d'autres, et a détruit un camion de transport commercial ainsi que des biens civils essentiels. La Coalition tient les autorités exécutantes et leur chaîne de commandement pleinement responsables de ces pertes et exige une enquête immédiate, indépendante et impartiale afin d'établir les responsabilités pénales et de garantir que tous les auteurs répondent de leurs actes.

La Coalition considère cette frappe comme une manifestation directe de l'influence exercée par des factions islamistes sur la prise de décision stratégique au sein de la direction des FAS, qui continue d'utiliser les capacités militaires au service d'un projet politique visant à conserver le pouvoir et à faire échouer la transition vers un gouvernement civil. En outre, l'orientation délibérée de la violence armée contre les communautés de l'ouest du Soudan traduit une approche punitive qui traite les populations locales en adversaires en raison de leur situation géographique ou de leurs affiliations politiques supposées, faisant de la vie et des moyens de subsistance des civils un levier militaire et politique.

La Coalition rappelle que les habitants d'Al-Nuhud et de toutes les communautés de l'ouest du Soudan ont un droit égal à la vie, à la sécurité et à la protection, quelle que soit la partie qui exerce un contrôle de fait sur leur territoire. Aucune communauté ne peut être soumise à une punition collective, ciblée en raison de sa situation géographique ou présumée détenir des loyautés politiques particulières.

La Coalition souligne que les attaques délibérées contre des civils constituent des crimes de guerre au regard du droit international, et que la destruction de biens civils engage une stricte responsabilité au titre des règles du droit international humanitaire (DIH).

En conséquence, la Coalition appelle le Haut-Commissariat des Nations Unies aux droits de l'homme (HCDH) et la Mission internationale indépendante d'établissement des faits pour le Soudan à enquêter d'urgence sur cette attaque, à préserver les éléments de preuve et à examiner la responsabilité individuelle et de commandement de ceux qui ont ordonné, facilité ou exécuté la frappe.

La Coalition exhorte en outre la communauté internationale à prendre des mesures concrètes et efficaces pour renforcer la protection des civils, mettre fin aux attaques illégales, assurer l'évacuation médicale rapide des blessés et faciliter un accès humanitaire sans entrave.

La Coalition présente ses plus sincères condoléances aux familles des victimes et rappelle que la vie des civils ne doit pas être sacrifiée au pouvoir politique.

Toute voie vers la fin du conflit doit être indissociable de la justice internationale, de la réparation pour les victimes et de garanties structurelles de non-répétition.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Paris, 9 novembre 2026`;

const FR_EXCERPT =
  "La Coalition condamne la frappe de drone contre Al-Nuhud, au Kordofan-Occidental, le 9 novembre 2026, qui a tué au moins vingt civils, et appelle le HCDH et la Mission d'établissement des faits pour le Soudan à enquêter d'urgence et à établir les responsabilités individuelles et de commandement.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-09',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title:
        'The International Coalition Denounces Deadly Drone Attack on Al-Nuhud, Calls for Independent Investigation and Accountability',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Paris',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي يدين الهجوم الدامي بطائرة مسيّرة على النهود ويطالب بتحقيق مستقل ومحاسبة',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'باريس',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "La Coalition internationale dénonce la frappe de drone meurtrière sur Al-Nuhud et appelle à une enquête indépendante et à rendre des comptes",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Paris',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: client-style photo card (docs/runbooks/press/photo-card.md) in all three locales, the
// band in natural colour. The band is the client's photograph of the Al-Nuhud locality
// headquarters; the source file stays in press/, uncommitted.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/4/al-nuhud-band.jpg', tone: 'natural' };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Denounces the deadly drone attack on Al-Nuhud and calls for an independent investigation',
    dateline: 'PARIS',
    date: 'Date: 9 November 2026',
    lead: 'At least twenty civilians were killed and dozens injured. The Coalition calls on the OHCHR and the UN Fact-Finding Mission for the Sudan to investigate urgently and establish command responsibility.',
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يدين الهجوم الدامي بطائرة مسيّرة على النهود ويطالب بتحقيق مستقل',
    dateline: 'باريس',
    date: 'التاريخ: 9 نوفمبر 2026',
    lead: 'قُتل ما لا يقل عن عشرين مدنيًا وأُصيب العشرات. ويدعو التحالف مفوضية حقوق الإنسان وبعثة تقصي الحقائق بشأن السودان إلى تحقيق عاجل وتحديد مسؤولية القيادة.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    // U+2011 (non-breaking hyphen) keeps "Al‑Nuhud" on one line of the card.
    headline: 'dénonce la frappe de drone meurtrière sur Al\u2011Nuhud et appelle à une enquête indépendante',
    dateline: 'PARIS',
    date: 'Date : 9 novembre 2026',
    lead: "Au moins vingt civils tués et des dizaines de blessés. La Coalition appelle le HCDH et la Mission d'établissement des faits pour le Soudan à enquêter d'urgence et à établir les responsabilités de commandement.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
