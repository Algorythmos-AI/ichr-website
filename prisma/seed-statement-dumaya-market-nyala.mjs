// "Strongly-Worded Statement Condemning the Airstrike on the Civilian Dumaya Market in Nyala"
// — Geneva, 27 October 2026. Source: press/OCT/8/note.rtf (English only, no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-dumaya-market-nyala.mjs
//               node --env-file=.env.local prisma/seed-statement-dumaya-market-nyala.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-dumaya-market-nyala.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-dumaya-market-nyala.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-dumaya-market-nyala.mjs
//
// EDITORIAL NOTES (decided with the client, 28 October 2026):
//  - DATELINE: the source is dated 27 October 2026 and names no city; GENEVA at the client's
//    choice. Not the same event as the 16 October Nyala livestock-market statement: a different
//    market (the "Tangoj Station" night market, Dumaya area, west of Nyala) and attack (26 Oct).
//  - NAMED PERSON: "the leadership of the Sudanese Armed Forces (SAF), headed by
//    Commander-in-Chief Abdel Fattah al-Burhan" is held responsible for IHL compliance, with a
//    call to investigate command responsibility. Published as written, with the client's
//    approval, as the Coalition's own position — in all three languages.
//  - HEDGES, load-bearing — keep them in any edit: the strike is "attributed to the Sudanese
//    Air Force"; the toll ("exceeding 200 fatalities", "at least 113 injured") is from
//    circulating reports "not yet subject to independent verification". Carried into AR
//    (نُسبت / لم تخضع بعدُ لتحقق مستقل) and FR (attribuée / pas encore vérifiés de manière
//    indépendante).
//  - ADDED TEXT: "aerial attacks" links the 16 October Nyala statement (relative href per locale),
//    at the client's choice. Nothing else added.
//  - Light copy-edit: house name (ICHRO), paragraphs split at existing sentence breaks, the
//    closing demands set as a list. Substance unchanged. House sign-off and tagline added.
//  - ARABIC PLACE NAMES الدومايا (Dumaya) and محطة تنقوج (Tangoj Station) were our
//    transliterations; confirmed by the client on 28 October 2026. Al-Burhan is the standard عبد الفتاح البرهان.
//  - Covers: client-style photo card with a map band (see PHOTO_CARDS below). No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-airstrike-dumaya-market-nyala-october-2026';
// Generated once, 28 October 2026. Never regenerate.
export const TRANSLATION_KEY = '7cceea3b-8321-493e-a772-eed5b7cc2b0e';

const NYALA_16 = 'condemnation-nyala-livestock-market-october-2026';

const EN_BODY = `The International Coalition of Human Rights Organizations (ICHRO) condemns in the strongest possible terms the airstrike that targeted the "Tangoj Station" night market in the Dumaya area, west of Nyala, South Darfur State, on the evening of Monday, 26 October 2026.

The strike, attributed to the Sudanese Air Force, caused a large number of deaths and injuries, amid reports of horrific human losses in a market frequented by civilians trading and securing their essential livelihoods.

Initial circulating reports indicate that the toll may exceed 200 deaths, while other statements cite at least 113 injured — figures that have not yet been subject to independent verification. These losses raise profound concern about the scale of the humanitarian catastrophe, particularly the fate of women and children, who must be protected from the dangers of military operations, and about the urgent need to document the number and identities of the victims.

The Coalition considers the targeting of a civilian market a dangerous escalation in the series of [aerial attacks](/news/${NYALA_16}) against Sudanese cities and marketplaces. It reiterates its unequivocal condemnation of the ongoing military operations attributed to the Sudanese Armed Forces, which cause civilian casualties and destroy infrastructure vital to the population's daily survival.

The Coalition affirms that civilian markets, commercial establishments and residential neighbourhoods are protected under international humanitarian law. Direct attacks against civilians and civilian objects, as well as indiscriminate or disproportionate attacks, constitute grave violations that may amount to war crimes, and require thorough investigation and criminal accountability.

The Coalition holds the leadership of the Sudanese Armed Forces (SAF), headed by Commander-in-Chief Abdel Fattah al-Burhan, responsible for ensuring that all forces under its command comply with international humanitarian law. It calls for an immediate investigation into command and individual responsibility for this strike, including those who planned, ordered and carried it out, and stresses that war must never be used as a pretext to justify the loss of civilian lives or to foster impunity.

The Coalition urges the Office of the United Nations High Commissioner for Human Rights (OHCHR), the Independent International Fact-Finding Mission for the Sudan and the African Commission on Human and Peoples' Rights (ACHPR) to take urgent measures to document the attack, collect testimonies from survivors and medical personnel, verify in particular the number of women and children among the casualties, and preserve evidence in order to establish responsibility and refer the findings to competent justice mechanisms.

The recurring bombardment of markets and civilian areas in Sudan requires the international community to move beyond expressions of concern and condemnation towards effective measures to protect civilians and ensure accountability. The continued absence of accountability risks encouraging further violations and deepening the humanitarian tragedy.

Sudanese lives are not military targets, and the right to life and security must not be subjected to the calculus of war or the interests of the warring parties. The protection of women, children and vulnerable groups remains a non-negotiable legal and moral obligation.

**The Coalition reiterates its demand for:**

- an immediate cessation of attacks on civilians;
- unhindered access for medical and humanitarian aid;
- an independent international investigation into the airstrike on the Dumaya market and other attacks on civilian markets across Sudan;
- justice and reparations for the victims and their families, and accountability for all perpetrators.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 27 October 2026`;

const EN_EXCERPT =
  'ICHRO condemns in the strongest terms the airstrike, attributed to the Sudanese Air Force, on the "Tangoj Station" night market in the Dumaya area west of Nyala on 26 October 2026, where unverified reports suggest more than 200 dead, and calls for an independent international investigation and accountability.';

const AR_BODY = `يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الغارة الجوية التي استهدفت السوق الليلي في "محطة تنقوج" بمنطقة الدومايا، غرب مدينة نيالا بولاية جنوب دارفور، مساء الإثنين 26 أكتوبر 2026.

وقد أسفرت الغارة، التي نُسبت إلى سلاح الجو السوداني، عن عدد كبير من القتلى والجرحى، وسط تقارير عن خسائر بشرية مروّعة في سوق يرتاده المدنيون للتجارة وتأمين سبل عيشهم الأساسية.

وتشير التقارير الأولية المتداولة إلى أن الحصيلة قد تتجاوز 200 قتيل، فيما تتحدث بيانات أخرى عن 113 جريحًا على الأقل، وهي أرقام لم تخضع بعدُ لتحقق مستقل. وتثير هذه الخسائر قلقًا بالغًا إزاء حجم الكارثة الإنسانية، ولا سيما مصير النساء والأطفال الذين يجب أن يتمتعوا بالحماية من مخاطر العمليات العسكرية، وإزاء الحاجة الملحّة إلى توثيق أعداد الضحايا وهوياتهم.

ويعتبر التحالف استهداف سوق مدني تصعيدًا خطيرًا في سلسلة [الهجمات الجوية](/ar/news/${NYALA_16}) على المدن والأسواق السودانية، ويجدّد إدانته القاطعة للعمليات العسكرية المستمرة المنسوبة إلى القوات المسلحة السودانية، والتي تُوقع ضحايا مدنيين وتدمّر بنى تحتية حيوية لبقاء السكان اليومي.

ويؤكد التحالف أن الأسواق المدنية والمنشآت التجارية والأحياء السكنية مشمولة بحماية القانون الدولي الإنساني، وأن الهجمات المباشرة على المدنيين والأعيان المدنية، وكذلك الهجمات العشوائية أو غير المتناسبة، تشكّل انتهاكات جسيمة قد ترقى إلى جرائم حرب، وتستوجب تحقيقًا شاملًا ومساءلة جنائية.

ويحمّل التحالف قيادة القوات المسلحة السودانية، برئاسة القائد العام عبد الفتاح البرهان، مسؤولية ضمان امتثال جميع القوات الخاضعة لإمرتها للقانون الدولي الإنساني، ويطالب بتحقيق فوري في مسؤولية القيادة والمسؤولية الفردية عن هذه الغارة، بما يشمل من خطّطوا لها وأمروا بها ونفّذوها، مؤكدًا أن الحرب يجب ألّا تُتخذ ذريعة لتبرير إزهاق أرواح المدنيين أو لترسيخ الإفلات من العقاب.

ويحثّ التحالف مفوضية الأمم المتحدة السامية لحقوق الإنسان، والبعثة الدولية المستقلة لتقصي الحقائق بشأن السودان، واللجنة الأفريقية لحقوق الإنسان والشعوب، على اتخاذ تدابير عاجلة لتوثيق الهجوم، وجمع شهادات الناجين والكوادر الطبية، والتحقق تحديدًا من أعداد النساء والأطفال بين الضحايا، وحفظ الأدلة لتحديد المسؤوليات وإحالة النتائج إلى آليات العدالة المختصة.

إن القصف المتكرر للأسواق والمناطق المدنية في السودان يستوجب أن يتجاوز المجتمع الدولي عبارات القلق والإدانة إلى إجراءات فعّالة لحماية المدنيين وضمان المساءلة. فاستمرار غياب المساءلة يهدد بتشجيع مزيد من الانتهاكات وتعميق المأساة الإنسانية.

إن أرواح السودانيين ليست أهدافًا عسكرية، ولا يجوز أن يخضع الحق في الحياة والأمان لحسابات الحرب أو مصالح الأطراف المتحاربة. وتظل حماية النساء والأطفال والفئات الضعيفة التزامًا قانونيًا وأخلاقيًا غير قابل للتفاوض.

**ويجدّد التحالف مطالبته بما يلي:**

- الوقف الفوري للهجمات على المدنيين؛
- وصول المساعدات الطبية والإنسانية دون عوائق؛
- إجراء تحقيق دولي مستقل في الغارة على سوق الدومايا وفي سائر الهجمات على الأسواق المدنية في أنحاء السودان؛
- تحقيق العدالة وجبر الضرر للضحايا وأسرهم، ومحاسبة جميع الجناة.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 27 أكتوبر 2026`;

const AR_EXCERPT =
  'يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الغارة الجوية المنسوبة إلى سلاح الجو السوداني على السوق الليلي في "محطة تنقوج" بمنطقة الدومايا غرب نيالا في 26 أكتوبر 2026، حيث تشير تقارير لم يُتحقق منها إلى أكثر من 200 قتيل، ويطالب بتحقيق دولي مستقل ومحاسبة المسؤولين.';

const FR_BODY = `La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) condamne avec la plus grande fermeté la frappe aérienne qui a visé le marché de nuit de « Tangoj Station », dans le quartier de Dumaya, à l'ouest de Nyala, dans l'État du Darfour-Sud, le lundi 26 octobre 2026 au soir.

La frappe, attribuée à l'armée de l'air soudanaise, a fait un grand nombre de morts et de blessés, sur fond d'informations faisant état de pertes humaines effroyables dans un marché fréquenté par des civils venus commercer et assurer leurs moyens de subsistance essentiels.

Les premières informations en circulation indiquent un bilan qui pourrait dépasser 200 morts, tandis que d'autres sources font état d'au moins 113 blessés — des chiffres qui n'ont pas encore été vérifiés de manière indépendante. Ces pertes suscitent une profonde inquiétude quant à l'ampleur de la catastrophe humanitaire, en particulier quant au sort des femmes et des enfants, qui doivent être protégés des dangers des opérations militaires, et quant à l'urgence de documenter le nombre et l'identité des victimes.

La Coalition considère que le ciblage d'un marché civil constitue une escalade dangereuse dans la série d'[attaques aériennes](/fr/news/${NYALA_16}) contre les villes et les marchés soudanais. Elle réitère sa condamnation sans équivoque des opérations militaires en cours attribuées aux Forces armées soudanaises, qui font des victimes civiles et détruisent des infrastructures vitales à la survie quotidienne de la population.

La Coalition affirme que les marchés civils, les établissements commerciaux et les quartiers résidentiels sont protégés par le droit international humanitaire. Les attaques directes contre des civils et des biens de caractère civil, ainsi que les attaques indiscriminées ou disproportionnées, constituent des violations graves susceptibles de constituer des crimes de guerre, et exigent une enquête approfondie et l'établissement des responsabilités pénales.

La Coalition tient la direction des Forces armées soudanaises (FAS), sous l'autorité du commandant en chef Abdel Fattah al-Burhan, pour responsable de veiller à ce que toutes les forces placées sous son commandement respectent le droit international humanitaire. Elle demande une enquête immédiate sur la responsabilité du commandement et la responsabilité individuelle dans cette frappe, y compris de ceux qui l'ont planifiée, ordonnée et exécutée, et souligne que la guerre ne doit jamais servir de prétexte pour justifier la perte de vies civiles ou favoriser l'impunité.

La Coalition exhorte le Haut-Commissariat des Nations Unies aux droits de l'homme (HCDH), la Mission internationale indépendante d'établissement des faits pour le Soudan et la Commission africaine des droits de l'homme et des peuples (CADHP) à prendre des mesures urgentes pour documenter l'attaque, recueillir les témoignages des survivants et du personnel médical, vérifier en particulier le nombre de femmes et d'enfants parmi les victimes, et préserver les preuves afin d'établir les responsabilités et de transmettre les conclusions aux mécanismes judiciaires compétents.

Les bombardements répétés de marchés et de zones civiles au Soudan exigent que la communauté internationale dépasse les expressions de préoccupation et de condamnation pour adopter des mesures effectives de protection des civils et d'établissement des responsabilités. La persistance de l'impunité risque d'encourager de nouvelles violations et d'aggraver la tragédie humanitaire.

Les vies soudanaises ne sont pas des cibles militaires, et le droit à la vie et à la sécurité ne doit pas être soumis aux calculs de la guerre ni aux intérêts des parties belligérantes. La protection des femmes, des enfants et des groupes vulnérables demeure une obligation juridique et morale non négociable.

**La Coalition réitère sa demande :**

- d'une cessation immédiate des attaques contre les civils ;
- d'un accès sans entrave à l'aide médicale et humanitaire ;
- d'une enquête internationale indépendante sur la frappe contre le marché de Dumaya et sur les autres attaques contre des marchés civils au Soudan ;
- de justice et de réparations pour les victimes et leurs familles, et de l'établissement des responsabilités de tous les auteurs.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 27 octobre 2026`;

const FR_EXCERPT =
  "L'ICHRO condamne avec la plus grande fermeté la frappe aérienne, attribuée à l'armée de l'air soudanaise, contre le marché de nuit de « Tangoj Station », dans le quartier de Dumaya à l'ouest de Nyala, le 26 octobre 2026, où des informations non vérifiées font état de plus de 200 morts, et demande une enquête internationale indépendante.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-10-27',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Nyala', '#Darfur'],
  locales: [
    {
      locale: 'en',
      title: 'Statement of Condemnation: Airstrike on the Civilian Dumaya Market in Nyala',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة شديد للغارة الجوية على سوق الدومايا المدني في نيالا',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: 'Déclaration de condamnation : frappe aérienne contre le marché civil de Dumaya, à Nyala',
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Covers: the client's square photo-card layout (scripts/lib/photo-card.mjs), matching their
// own cards such as Al-Zawiya Ghara. No photo was supplied, so the band is a map of Sudan with
// Nyala marked — the client's choice, 28 October 2026. First published with the typographic
// oxblood card. The lead keeps the hedge "attributed to".
//   node scripts/gen-photo-card.mjs prisma/seed-statement-dumaya-market-nyala.mjs
export const PHOTO_CARD_BAND = { map: 'sudan', marker: { lon: 24.88, lat: 12.05 } };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Strongly condemns the airstrike on the civilian Dumaya market in Nyala, South Darfur',
    dateline: 'GENEVA',
    date: 'Date: 27 October 2026',
    lead: 'The International Coalition of Human Rights Organizations condemns in the strongest terms the airstrike, attributed to the Sudanese Air Force, on the "Tangoj Station" night market in the Dumaya area, west of Nyala, South Darfur, on the evening of 26 October 2026.',
    mapLabels: {
      country: 'SUDAN',
      marker: 'NYALA',
      markerSub: 'DUMAYA MARKET',
      neighbours: { EGY: 'EGYPT', LBY: 'LIBYA', TCD: 'CHAD', SDS: 'SOUTH SUDAN', CAF: 'C.A.R.', ETH: 'ETHIOPIA', ERI: 'ERITREA' },
    },
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يدين بشدة الغارة الجوية على سوق الدومايا المدني في نيالا بولاية جنوب دارفور',
    dateline: 'جنيف',
    date: 'التاريخ: 27 أكتوبر 2026',
    lead: 'يدين التحالف الدولي لمنظمات حقوق الإنسان بأشد العبارات الغارة الجوية، المنسوبة إلى سلاح الجو السوداني، على السوق الليلي في "محطة تنقوج" بمنطقة الدومايا غرب مدينة نيالا بولاية جنوب دارفور، مساء 26 أكتوبر 2026.',
    mapLabels: {
      country: 'السودان',
      marker: 'نيالا',
      markerSub: 'سوق الدومايا',
      neighbours: { EGY: 'مصر', LBY: 'ليبيا', TCD: 'تشاد', SDS: 'جنوب السودان', CAF: 'أفريقيا الوسطى', ETH: 'إثيوبيا', ERI: 'إريتريا' },
    },
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: 'condamne fermement la frappe aérienne contre le marché civil de Dumaya, à Nyala (Darfour-Sud)',
    dateline: 'GENÈVE',
    date: 'Date : 27 octobre 2026',
    lead: "La Coalition condamne avec la plus grande fermeté la frappe aérienne, attribuée à l'armée de l'air soudanaise, contre le marché de nuit de « Tangoj Station », dans le quartier de Dumaya, à l'ouest de Nyala (Darfour-Sud), le 26 octobre 2026 au soir.",
    mapLabels: {
      country: 'SOUDAN',
      marker: 'NYALA',
      markerSub: 'MARCHÉ DE DUMAYA',
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
