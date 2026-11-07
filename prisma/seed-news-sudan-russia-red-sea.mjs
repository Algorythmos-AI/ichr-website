// News, Geneva, 7 November 2026 — the Coalition's summary of an analysis published by the
// Belgian news site In de Gazette on 3 November 2026: Abdel Fattah al-Burhan's offer to Vladimir
// Putin of access to the Red Sea, and the questions it raises about Sudan's military and
// intelligence ties with Russia. Source: https://www.indegazette.be/abdel-fattah-al-burhan-biedt-
// vladimir-poetin-toegang-tot-de-rode-zee-terwijl-soedanese-inlichtingendiensten-onder-vuur-liggen/
// (Dutch, by Andy Vermaut, editor-in-chief).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-news-sudan-russia-red-sea.mjs
//               node --env-file=.env.local prisma/seed-news-sudan-russia-red-sea.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-news-sudan-russia-red-sea.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-news-sudan-russia-red-sea.mjs
//
// Covers: node scripts/gen-photo-card.mjs prisma/seed-news-sudan-russia-red-sea.mjs
//
// EDITORIAL NOTES (7 November 2026):
//  - NOT A STATEMENT. Category News: a press summary, not a Coalition position. The body says so
//    and takes no position of its own; the card's label is IN THE PRESS / في الصحافة / REVUE DE
//    PRESSE, never STATEMENT.
//  - COPYRIGHT. The In de Gazette text is Andy Vermaut's. It is summarised section by section in
//    the Coalition's own words, much shorter than the original, and NOT translated or quoted at
//    length. The source is credited and linked at the foot of each locale. The lead photograph
//    (Maxim Shipenkov / Pool Photo via AP) is the Associated Press's and is NOT used; the cover is
//    our own photo card with a map (Port Sudan marked).
//  - DISCLOSURE. Mr Vermaut was a panellist at the August 2026 Geneva side event the Coalition
//    co-organised (seed-event-womens-condition-geneva.mjs); the credit says so, as that article did.
//  - HEDGES, load-bearing — keep them in any edit, in all three languages. Everything is
//    attributed to the article ("the article reports", "according to"), and every caveat the
//    article itself makes is carried: no final agreement; naval base not confirmed; embassy
//    staffing from unnamed Sudanese political sources, not independently confirmed; training
//    "reported"; veto-for-concessions "not shown"; the 1,700 toll's period and method not
//    established; the 15 % survival rate and the 1,780 estimate unverified; Brotherhood links
//    "allegations", not membership; surveillance of opponents without verified evidence; the
//    US "not legitimate" claim not confirmed. The video sentence has no source or date in the
//    article, and the summary says so.
//  - NAMED PEOPLE appear only with the titles the article gives them, and no allegation is
//    attached to a named individual (Jibril Ibrahim's US sanctions are a matter of record).
//    The article gives Mirghani Idris two wordings ("defence-industry system" / "complex");
//    the body uses "system".
//  - ADDED TEXT, not in the source: links to the Coalition's own statements of 27 October
//    (Dumaya market), 4 November (Sudanese soldier in Ukraine) and 5 November (gold), and to the
//    August event page in the disclosure. The closing "not a statement" line. House sign-off.
//  - No gallery. Card: ERITREA is left off the map — at this marker its label crosses the coast.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'in-the-press-sudan-russia-red-sea-november-2026';
// Generated once, 7 November 2026. Never regenerate.
export const TRANSLATION_KEY = '796eb03b-02bf-43cf-b00d-c3f44470f80f';

export const SOURCE_URL =
  'https://www.indegazette.be/abdel-fattah-al-burhan-biedt-vladimir-poetin-toegang-tot-de-rode-zee-terwijl-soedanese-inlichtingendiensten-onder-vuur-liggen/';
const SOURCE_TITLE =
  'Abdel Fattah al-Burhan biedt Vladimir Poetin toegang tot de Rode Zee terwijl Soedanese inlichtingendiensten onder vuur liggen';

const DUMAYA = 'condemnation-airstrike-dumaya-market-nyala-october-2026';
const SOLDIER = 'statement-sudanese-soldier-russian-forces-ukraine-november-2026';
const GOLD = 'statement-sudan-gold-financing-war-november-2026';
const GENEVA_EVENT = 'womens-condition-violence-wartime-geneva-august-2026';

const EN_BODY = `On 3 November 2026, the Belgian news site *In de Gazette* published an extensive analysis by its editor-in-chief, Andy Vermaut, of Sudan's rapprochement with Russia. The International Coalition of Human Rights Organizations (ICHRO) summarises its main points below. The full article, in Dutch, is linked at the end.

## The Kremlin meeting

According to the article, General Abdel Fattah al-Burhan, commander-in-chief of the Sudanese Armed Forces, was received by President Vladimir Putin at the Kremlin on Friday 30 October 2026, following the third Russia–Africa summit in Moscow. His delegation included Foreign Minister Mohieddin Salem; Finance Minister Jibril Ibrahim, who is under United States sanctions; Ahmed Ibrahim Mufaddal, Director-General of the General Intelligence Service; and Mirghani Idris, director of Sudan's defence-industry system.

Al-Burhan is reported to have offered Russian companies access to gold, copper and other mining areas; a free economic zone on the Red Sea, with fuel and grain storage; and a role in railway projects, including a possible line from Port Sudan to the interior and towards Chad. President Putin showed interest, but no final agreement was announced, and no terms on duration, ownership or revenue sharing are known. The article stresses that it is **not confirmed** that the zone would include a Russian naval base.

## Military and intelligence ties

Citing unnamed Sudanese political sources, the article describes separate military, intelligence and defence-industry sections at the Sudanese Embassy in Moscow: a military attaché of major-general rank supported by 14 officers; a General Intelligence Service representation led by a major-general; and a defence-industry team of a military-intelligence colonel, five engineers and a translator. These figures have **not been independently confirmed**.

The article also reports that Sudanese soldiers receive training in Russia in drone operation and leadership, and that senior officers and their families, including commanders wounded in the war, receive medical treatment there. Numbers, institutions and financial terms are not public. It places this cooperation in the context of Russia's Africa Corps, which has replaced the former Wagner structures.

## Russia's veto at the Security Council

On 18 November 2024, Russia vetoed a UN Security Council draft resolution on Sudan, tabled by the United Kingdom and Sierra Leone, which called for an immediate end to hostilities, better protection of civilians and unhindered humanitarian access. Fourteen of the fifteen members, including the three African members, voted in favour. The article reports that al-Burhan thanked President Putin for Russia's support in international bodies, but notes that a direct exchange of the veto for Red Sea concessions **has not been shown**.

## Civilians under bombardment

The Sudanese Armed Forces and the Rapid Support Forces have been at war since 15 April 2023, and both sides are accused of attacks on civilians. The article cites research data according to which at least 1,700 civilians were reportedly killed in bombardments of residential areas, [markets](/news/${DUMAYA}), schools and displacement camps, a figure whose period and method have not been independently established. It also describes the obstacles facing humanitarian access and displaced families.

## Recruitment for the war in Ukraine

According to a Sudanese research report cited by the article, recruitment networks use Facebook advertisements, travel agencies and visa services to draw young Sudanese into Russian military service, with promises of high salaries and Russian citizenship. Some are reported to have been sent to the front line in Ukraine. A survival rate of "at most 15 percent", given by a person allegedly involved in such networks, and an estimate of more than 1,780 African fighters in Russian service are both described in the article as unverified. The article notes that the presence of Sudanese officials in Moscow does not in itself prove cooperation with illegal recruitment.

The article also refers to a video which, it says, shows a Sudanese soldier linked to the Hajanah unit in El Obeid fighting alongside Russian forces against Ukrainian civilians; it gives no source or date for the footage. The Coalition addressed footage of this kind in [its statement of 4 November 2026](/news/${SOLDIER}).

## Islamist networks and European scrutiny

The article recalls that Islamist networks gained influence in the state under Omar al-Bashir, who took power in a coup in June 1989 and was ousted in April 2019, and that the transition towards civilian rule was interrupted by the military takeover of October 2021. It reports allegations that people linked to the Muslim Brotherhood retain influence in security structures under al-Burhan, including at diplomatic missions, while noting that this does not mean the current military leaders belong to such organisations.

On 8 October 2026, the European Parliament in Strasbourg adopted, by 381 votes to 167 with 15 abstentions, a resolution on a European strategy against Islamist infiltration and the influence of Muslim Brotherhood networks. It calls for investigation of how such organisations gain access to EU institutions and for assessment against the EU's terrorist-listing criteria; the article stresses that it does not automatically list the Brotherhood. It adds that a ban was also debated in the Netherlands, while a parliamentary motion is not in itself a legal ban.

## Diplomatic missions

The article recalls the protections of the Vienna Convention, and that they do not cover activities outside diplomatic functions. It raises questions about how many embassy staff have military, intelligence or defence-industry backgrounds. It reports allegations that opponents of the military leadership in Europe are monitored or pressured, noting that there is no independently verified evidence that the missions concerned are involved, and that investigating foreign interference is a matter for the competent security services.

## Sudan's international standing

The African Union has suspended Sudan since the October 2021 coup and ties its return to a civilian-led transition. The article notes that the authorities operating from Port Sudan exercise effective control over the areas held by the army, which cannot be equated with a democratic mandate. On the United States, it recalls reporting on 22 September 2026 that a visa for al-Burhan to attend the UN General Assembly had not been issued, and mentions Massad Boulos, adviser to the US President, in connection with diplomatic contacts. A claim that Washington formally declared al-Burhan's government not constitutionally legitimate could not be confirmed by an official statement.

## What is at stake

The article asks whether revenues from [mining](/news/${GOLD}), storage and railway concessions would fund public services and reconstruction, or mainly the institutions holding power during the war, noting that no financial terms are known. It places the Red Sea proposals within a wider international competition along a route vital to trade between Asia and Europe, and concludes that military cooperation with Russia does not remove the need for a political settlement: the return of civilian government, the safety of displaced people and humanitarian access.

---

**Source:** Andy Vermaut, "${SOURCE_TITLE}", *In de Gazette* (indegazette.be), 3 November 2026. [Read the full article](${SOURCE_URL}) (in Dutch).

This page is the Coalition's summary of third-party reporting; the analysis and its findings are the author's, and it is not a statement of the Coalition. Mr Vermaut took part as a panellist in the [Geneva side event](/news/${GENEVA_EVENT}) the Coalition co-organised in August 2026.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 7 November 2026`;

const EN_EXCERPT =
  'Belgian news site In de Gazette reports that Sudan’s army chief Abdel Fattah al-Burhan offered Vladimir Putin a free economic zone on the Red Sea, mining concessions and a role in railways at the Kremlin on 30 October 2026, and examines Sudan’s military and intelligence ties with Russia. ICHRO summarises the article.';

const AR_BODY = `نشر موقع «إن دي غازيت» (In de Gazette) الإخباري البلجيكي، في 3 نوفمبر 2026، تحليلاً موسّعاً لرئيس تحريره آندي فيرماوت حول التقارب بين السودان وروسيا. ويلخّص التحالف الدولي لمنظمات حقوق الإنسان (ICHRO) أدناه أبرز ما ورد فيه، مع رابط إلى المقال الكامل باللغة الهولندية في آخر الصفحة.

## اللقاء في الكرملين

وفقاً للمقال، استقبل الرئيس فلاديمير بوتين في الكرملين، يوم الجمعة 30 أكتوبر 2026، الفريق أول عبد الفتاح البرهان، القائد العام للقوات المسلحة السودانية، وذلك عقب القمة الروسية الأفريقية الثالثة في موسكو. وضمّ الوفد المرافق له وزير الخارجية محيي الدين سالم، ووزير المالية جبريل إبراهيم الخاضع لعقوبات أمريكية، وأحمد إبراهيم مفضل المدير العام لجهاز المخابرات العامة، وميرغني إدريس مدير منظومة الصناعات الدفاعية السودانية.

وأفاد المقال بأن البرهان عرض على الشركات الروسية الوصول إلى مناطق الذهب والنحاس ومعادن أخرى، وإنشاء منطقة اقتصادية حرة على البحر الأحمر تضم مستودعات للوقود والحبوب، والمشاركة في مشروعات للسكك الحديدية، منها خط محتمل يمتد من بورتسودان إلى الداخل وباتجاه تشاد. وأبدى الرئيس بوتين اهتماماً بذلك، غير أنه لم يُعلَن عن أي اتفاق نهائي، ولا تُعرف بعدُ أي شروط تتعلق بالمدة أو الملكية أو تقاسم العائدات. ويشدّد المقال على أنه **لم يتأكد** أن المنطقة ستشمل قاعدة بحرية روسية.

## الروابط العسكرية والاستخباراتية

نقلاً عن أوساط سياسية سودانية لم يسمّها، يصف المقال وجود أقسام منفصلة للشؤون العسكرية والاستخبارات والصناعات الدفاعية في السفارة السودانية بموسكو: ملحق عسكري برتبة لواء يعاونه 14 ضابطاً، وتمثيل لجهاز المخابرات العامة يرأسه لواء، وفريق للصناعات الدفاعية يضم عقيداً من الاستخبارات العسكرية وخمسة مهندسين ومترجماً. و**لم يجرِ التحقق بشكل مستقل** من هذه الأرقام.

ويفيد المقال كذلك بأن جنوداً سودانيين يتلقّون في روسيا تدريبات على تشغيل الطائرات المسيّرة وعلى القيادة، وبأن كبار الضباط وأسرهم، ومنهم قادة أصيبوا في الحرب، يتلقّون العلاج الطبي هناك. ولا تُعرف الأعداد ولا المؤسسات المعنية ولا الشروط المالية. ويضع المقال هذا التعاون في سياق «الفيلق الأفريقي» الروسي الذي حلّ محلّ هياكل «فاغنر» السابقة.

## الفيتو الروسي في مجلس الأمن

في 18 نوفمبر 2024، استخدمت روسيا حق النقض ضد مشروع قرار لمجلس الأمن الدولي بشأن السودان، قدّمته المملكة المتحدة وسيراليون، يدعو إلى وقف فوري للأعمال العدائية وتعزيز حماية المدنيين وضمان وصول المساعدات الإنسانية دون عوائق. وصوّت لصالحه أربعة عشر عضواً من أصل خمسة عشر، من بينهم الأعضاء الأفارقة الثلاثة. ويذكر المقال أن البرهان شكر الرئيس بوتين على الدعم الروسي في المحافل الدولية، لكنه يشير إلى أن وجود مقايضة مباشرة بين الفيتو وامتيازات البحر الأحمر **لم يثبت**.

## مدنيون تحت القصف

تدور الحرب بين القوات المسلحة السودانية وقوات الدعم السريع منذ 15 أبريل 2023، ويُتّهم الطرفان كلاهما بشنّ هجمات على المدنيين. ويستشهد المقال ببيانات بحثية تفيد بأن ما لا يقل عن 1,700 مدني قُتلوا، بحسب التقارير، في قصف أحياء سكنية و[أسواق](/ar/news/${DUMAYA}) ومدارس ومخيمات للنازحين، وهو رقم لم تُحدَّد فترته ولا منهجيته بشكل مستقل. كما يصف العقبات التي تواجه وصول المساعدات الإنسانية والأسر النازحة.

## التجنيد للحرب في أوكرانيا

بحسب تقرير بحثي سوداني يستند إليه المقال، تستخدم شبكات للتجنيد إعلانات على فيسبوك ووكالات سفر وشركات لخدمات التأشيرات لاستقطاب شبان سودانيين إلى الخدمة العسكرية الروسية، مع وعود برواتب مرتفعة وبالجنسية الروسية، ويُفاد بأن بعضهم أُرسل إلى خطوط القتال في أوكرانيا. ويصف المقال نسبة نجاة «لا تتجاوز 15 في المئة»، ذكرها شخص يُقال إنه ضالع في مثل هذه الشبكات، وتقديراً يتجاوز 1,780 مقاتلاً أفريقياً في الخدمة الروسية، بأنهما غير متحقق منهما. ويلاحظ المقال أن وجود مسؤولين سودانيين في موسكو لا يثبت في حدّ ذاته التعاون مع التجنيد غير القانوني.

ويشير المقال أيضاً إلى مقطع فيديو يقول إنه يُظهر جندياً سودانياً مرتبطاً بوحدة الهجانة في مدينة الأبيض يقاتل إلى جانب القوات الروسية ضد مدنيين أوكرانيين، دون أن يذكر مصدر المقطع أو تاريخه. وقد تناول التحالف مقطعاً من هذا النوع في [بيانه الصادر في 4 نوفمبر 2026](/ar/news/${SOLDIER}).

## الشبكات الإسلامية والتدقيق الأوروبي

يذكّر المقال بأن الشبكات الإسلامية اكتسبت نفوذاً داخل الدولة في عهد عمر البشير، الذي استولى على السلطة بانقلاب في يونيو 1989 وأُطيح به في أبريل 2019، وبأن الانتقال نحو الحكم المدني توقّف بالاستيلاء العسكري على السلطة في أكتوبر 2021. وينقل المقال اتهامات بأن أشخاصاً مرتبطين بجماعة الإخوان المسلمين ما زالوا يتمتعون بنفوذ في الأجهزة الأمنية في عهد البرهان، بما في ذلك في البعثات الدبلوماسية، مع التنويه بأن ذلك لا يعني أن القادة العسكريين الحاليين ينتمون إلى هذه التنظيمات.

وفي 8 أكتوبر 2026، اعتمد البرلمان الأوروبي في ستراسبورغ، بأغلبية 381 صوتاً مقابل 167 وامتناع 15 عن التصويت، قراراً بشأن استراتيجية أوروبية لمواجهة الاختراق الإسلاموي ونفوذ شبكات الإخوان المسلمين، يدعو إلى التحقيق في كيفية وصول هذه التنظيمات إلى مؤسسات الاتحاد الأوروبي وإلى تقييمها وفق معايير الإدراج على قائمة الاتحاد للإرهاب. ويشدّد المقال على أن القرار لا يُدرج الجماعة تلقائياً على هذه القائمة، ويضيف أن حظرها نوقش أيضاً في هولندا، وأن الاقتراح البرلماني لا يشكّل في حدّ ذاته حظراً قانونياً.

## البعثات الدبلوماسية

يذكّر المقال بالحماية التي توفّرها اتفاقية فيينا وبأنها لا تشمل الأنشطة الخارجة عن المهام الدبلوماسية، ويطرح تساؤلات حول عدد موظفي السفارة القادمين من خلفيات عسكرية أو استخباراتية أو من الصناعات الدفاعية. وينقل اتهامات بأن معارضين للقيادة العسكرية في أوروبا يخضعون للمراقبة أو الضغط، مشيراً إلى عدم وجود أدلة متحقق منها بشكل مستقل على تورّط البعثات المعنية، وإلى أن التحقيق في التدخل الأجنبي من اختصاص الأجهزة الأمنية المختصة.

## مكانة السودان الدولية

علّق الاتحاد الأفريقي عضوية السودان منذ انقلاب أكتوبر 2021، ويربط عودته بانتقال يقوده المدنيون. ويلاحظ المقال أن السلطات التي تعمل من بورتسودان تمارس سيطرة فعلية على المناطق الخاضعة للجيش، وهو ما لا يمكن مساواته بتفويض ديمقراطي. وفيما يخص الولايات المتحدة، يذكّر المقال بتقارير أفادت في 22 سبتمبر 2026 بعدم منح البرهان تأشيرة لحضور الجمعية العامة للأمم المتحدة، ويذكر مسعد بولس، مستشار الرئيس الأمريكي، في سياق الاتصالات الدبلوماسية. أما القول بأن واشنطن أعلنت رسمياً أن حكومة البرهان ليست شرعية دستورياً، فلم يتسنَّ تأكيده ببيان رسمي.

## ما الذي على المحك

يتساءل المقال عمّا إذا كانت عائدات امتيازات [التعدين](/ar/news/${GOLD}) والتخزين والسكك الحديدية ستموّل الخدمات العامة وإعادة الإعمار، أم ستذهب أساساً إلى المؤسسات الممسكة بالسلطة خلال الحرب، مشيراً إلى أن الشروط المالية غير معروفة. ويضع مقترحات البحر الأحمر ضمن تنافس دولي أوسع على طريق حيوي للتجارة بين آسيا وأوروبا، ويخلص إلى أن التعاون العسكري مع روسيا لا يُغني عن الحاجة إلى تسوية سياسية: عودة الحكم المدني، وسلامة النازحين، ووصول المساعدات الإنسانية.

---

**المصدر:** آندي فيرماوت، «${SOURCE_TITLE}»، موقع «إن دي غازيت» (indegazette.be)، 3 نوفمبر 2026. [اقرأ المقال الكامل](${SOURCE_URL}) (باللغة الهولندية).

هذه الصفحة تلخيص أعدّه التحالف لتقرير صادر عن جهة أخرى؛ والتحليل واستنتاجاته لكاتبه، وهي ليست بياناً صادراً عن التحالف. وقد شارك السيد فيرماوت متحدثاً في [الفعالية الجانبية في جنيف](/ar/news/${GENEVA_EVENT}) التي شارك التحالف في تنظيمها في أغسطس 2026.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 7 نوفمبر 2026`;

const AR_EXCERPT =
  'أفاد موقع «إن دي غازيت» البلجيكي بأن قائد الجيش السوداني عبد الفتاح البرهان عرض على فلاديمير بوتين، في الكرملين يوم 30 أكتوبر 2026، منطقة اقتصادية حرة على البحر الأحمر وامتيازات للتعدين ومشاركة في السكك الحديدية، وتناول الروابط العسكرية والاستخباراتية بين السودان وروسيا. ويلخّص التحالف المقال.';

const FR_BODY = `Le 3 novembre 2026, le site d'information belge *In de Gazette* a publié une analyse approfondie de son rédacteur en chef, Andy Vermaut, sur le rapprochement entre le Soudan et la Russie. La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) en résume ci-dessous les principaux points. L'article complet, en néerlandais, est en lien à la fin de la page.

## La rencontre au Kremlin

Selon l'article, le général Abdel Fattah al-Burhan, commandant en chef des Forces armées soudanaises, a été reçu par le président Vladimir Poutine au Kremlin le vendredi 30 octobre 2026, à l'issue du troisième sommet Russie–Afrique à Moscou. Sa délégation comprenait le ministre des Affaires étrangères Mohieddin Salem ; le ministre des Finances Jibril Ibrahim, visé par des sanctions des États-Unis ; Ahmed Ibrahim Mufaddal, directeur général du Service général de renseignement ; et Mirghani Idris, directeur du système soudanais des industries de défense.

Al-Burhan aurait offert aux entreprises russes l'accès à des zones aurifères, cuprifères et d'autres minerais ; une zone économique franche sur la mer Rouge, avec des installations de stockage de carburant et de céréales ; et une participation à des projets ferroviaires, dont une possible ligne reliant Port-Soudan à l'intérieur du pays et au Tchad. Le président Poutine s'est montré intéressé, mais aucun accord définitif n'a été annoncé, et aucune condition relative à la durée, à la propriété ou au partage des revenus n'est connue. L'article souligne qu'il **n'est pas confirmé** que la zone comprendrait une base navale russe.

## Liens militaires et de renseignement

Citant des milieux politiques soudanais qu'il ne nomme pas, l'article décrit des sections distinctes chargées des affaires militaires, du renseignement et des industries de défense à l'ambassade du Soudan à Moscou : un attaché militaire ayant rang de général de division, assisté de 14 officiers ; une représentation du Service général de renseignement dirigée par un général de division ; et une équipe des industries de défense composée d'un colonel du renseignement militaire, de cinq ingénieurs et d'un traducteur. Ces chiffres **n'ont pas été confirmés de manière indépendante**.

L'article indique également que des soldats soudanais seraient formés en Russie au pilotage de drones et au commandement, et que des officiers supérieurs et leurs familles, dont des commandants blessés pendant la guerre, y recevraient des soins médicaux. Les effectifs, les institutions concernées et les conditions financières ne sont pas publics. L'article replace cette coopération dans le contexte de l'Africa Corps russe, qui a remplacé les anciennes structures de Wagner.

## Le veto russe au Conseil de sécurité

Le 18 novembre 2024, la Russie a opposé son veto à un projet de résolution du Conseil de sécurité des Nations unies sur le Soudan, présenté par le Royaume-Uni et la Sierra Leone, qui appelait à la cessation immédiate des hostilités, à une meilleure protection des civils et à un accès humanitaire sans entrave. Quatorze des quinze membres, dont les trois membres africains, ont voté pour. L'article rapporte qu'al-Burhan a remercié le président Poutine pour le soutien de la Russie dans les enceintes internationales, mais relève qu'un échange direct du veto contre des concessions sur la mer Rouge **n'est pas démontré**.

## Les civils sous les bombardements

Les Forces armées soudanaises et les Forces de soutien rapide sont en guerre depuis le 15 avril 2023, et les deux parties sont accusées d'attaques contre des civils. L'article cite des données de recherche selon lesquelles au moins 1 700 civils auraient été tués lors de bombardements de quartiers résidentiels, de [marchés](/fr/news/${DUMAYA}), d'écoles et de camps de déplacés, un chiffre dont la période et la méthode n'ont pas été établies de manière indépendante. Il décrit aussi les obstacles à l'accès humanitaire et la situation des familles déplacées.

## Le recrutement pour la guerre en Ukraine

Selon un rapport de recherche soudanais cité par l'article, des réseaux de recrutement utilisent des publicités sur Facebook, des agences de voyages et des sociétés de services de visas pour attirer de jeunes Soudanais dans le service militaire russe, avec des promesses de salaires élevés et de nationalité russe. Certains auraient été envoyés sur la ligne de front en Ukraine. Un taux de survie « d'au plus 15 % », avancé par une personne qui serait impliquée dans ces réseaux, et une estimation de plus de 1 780 combattants africains au service de la Russie sont tous deux présentés par l'article comme non vérifiés. L'article note que la présence de responsables soudanais à Moscou ne prouve pas en soi une coopération avec un recrutement illégal.

L'article évoque également une vidéo qui, selon lui, montre un soldat soudanais lié à l'unité Hajanah d'El-Obeid combattant aux côtés des forces russes contre des civils ukrainiens ; il n'en indique ni la source ni la date. La Coalition s'est exprimée sur des images de ce type dans [sa déclaration du 4 novembre 2026](/fr/news/${SOLDIER}).

## Réseaux islamistes et vigilance européenne

L'article rappelle que les réseaux islamistes ont gagné en influence au sein de l'État sous Omar al-Bachir, arrivé au pouvoir par un coup d'État en juin 1989 et renversé en avril 2019, et que la transition vers un pouvoir civil a été interrompue par la prise de pouvoir militaire d'octobre 2021. Il fait état d'allégations selon lesquelles des personnes liées aux Frères musulmans conserveraient une influence dans les structures de sécurité sous al-Burhan, y compris dans des missions diplomatiques, tout en précisant que cela ne signifie pas que les dirigeants militaires actuels appartiennent à ces organisations.

Le 8 octobre 2026, le Parlement européen a adopté à Strasbourg, par 381 voix contre 167 et 15 abstentions, une résolution sur une stratégie européenne contre l'infiltration islamiste et l'influence des réseaux des Frères musulmans. Elle appelle à enquêter sur la manière dont ces organisations accèdent aux institutions de l'UE et à les évaluer au regard des critères d'inscription sur la liste terroriste de l'UE ; l'article souligne qu'elle n'inscrit pas automatiquement la confrérie sur cette liste. Il ajoute qu'une interdiction a également été débattue aux Pays-Bas, une motion parlementaire ne constituant pas en soi une interdiction légale.

## Les missions diplomatiques

L'article rappelle les protections prévues par la Convention de Vienne, qui ne couvrent pas les activités étrangères aux fonctions diplomatiques. Il s'interroge sur le nombre d'agents de l'ambassade issus de l'armée, du renseignement ou des industries de défense. Il fait état d'allégations selon lesquelles des opposants à la direction militaire en Europe seraient surveillés ou soumis à des pressions, en relevant qu'aucune preuve vérifiée de manière indépendante n'établit l'implication des missions concernées, et que les enquêtes sur l'ingérence étrangère relèvent des services de sécurité compétents.

## La place du Soudan sur la scène internationale

L'Union africaine a suspendu le Soudan depuis le coup d'État d'octobre 2021 et subordonne son retour à une transition dirigée par des civils. L'article note que les autorités qui opèrent depuis Port-Soudan exercent un contrôle effectif sur les zones tenues par l'armée, ce qui ne saurait être assimilé à un mandat démocratique. S'agissant des États-Unis, il rappelle que des informations ont fait état, le 22 septembre 2026, du refus de délivrer à al-Burhan un visa pour l'Assemblée générale des Nations unies, et mentionne Massad Boulos, conseiller du président américain, en lien avec les contacts diplomatiques. L'affirmation selon laquelle Washington aurait officiellement déclaré que le gouvernement d'al-Burhan n'était pas constitutionnellement légitime n'a pu être confirmée par aucune déclaration officielle.

## Les enjeux

L'article se demande si les revenus des concessions [minières](/fr/news/${GOLD}), de stockage et ferroviaires financeraient les services publics et la reconstruction, ou surtout les institutions qui détiennent le pouvoir pendant la guerre, en relevant qu'aucune condition financière n'est connue. Il inscrit les propositions sur la mer Rouge dans une concurrence internationale plus large, sur une route essentielle au commerce entre l'Asie et l'Europe, et conclut que la coopération militaire avec la Russie ne dispense pas d'un règlement politique : le retour d'un gouvernement civil, la sécurité des personnes déplacées et l'accès humanitaire.

---

**Source :** Andy Vermaut, « ${SOURCE_TITLE} », *In de Gazette* (indegazette.be), 3 novembre 2026. [Lire l'article complet](${SOURCE_URL}) (en néerlandais).

Cette page est le résumé, par la Coalition, d'un article publié par un tiers ; l'analyse et ses conclusions sont celles de l'auteur, et elle ne constitue pas une déclaration de la Coalition. M. Vermaut est intervenu comme panéliste lors de l'[événement parallèle de Genève](/fr/news/${GENEVA_EVENT}) coorganisé par la Coalition en août 2026.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 7 novembre 2026`;

const FR_EXCERPT =
  "Le site d'information belge In de Gazette rapporte que le chef de l'armée soudanaise, Abdel Fattah al-Burhan, a offert à Vladimir Poutine, au Kremlin le 30 octobre 2026, une zone économique franche sur la mer Rouge, des concessions minières et une participation ferroviaire, et examine les liens militaires et de renseignement entre le Soudan et la Russie. L'ICHRO résume l'article.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'News',
  date: '2026-11-07',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#RedSea', '#Russia'],
  locales: [
    {
      locale: 'en',
      title: 'In the Press: Sudan Offers Russia Access to the Red Sea as Questions Mount Over Intelligence Ties',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'في الصحافة: السودان يعرض على روسيا منفذاً إلى البحر الأحمر وسط تساؤلات حول الروابط الاستخباراتية',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: 'Revue de presse : le Soudan offre à la Russie un accès à la mer Rouge, les liens de renseignement en question',
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Covers: the client-style photo card (scripts/lib/photo-card.mjs), as for the recent
// statements, but labelled as press coverage. The band is a map of Sudan with Port Sudan, on the
// Red Sea coast, marked — the AP photograph in the source is not ours to use.
//   node scripts/gen-photo-card.mjs prisma/seed-news-sudan-russia-red-sea.mjs
export const PHOTO_CARD_BAND = { map: 'sudan', marker: { lon: 37.22, lat: 19.62 } };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'IN THE PRESS',
    org: 'Reported by In de Gazette',
    headline: 'Al-Burhan offers Putin access to the Red Sea as Sudan’s intelligence services face scrutiny',
    dateline: 'GENEVA',
    date: 'Date: 7 November 2026',
    lead: 'Belgian news site In de Gazette reports that Sudan’s army chief offered Russia a Red Sea free economic zone, mining concessions and a role in railways at the Kremlin on 30 October 2026. No final deal has been announced; a naval base is not confirmed.',
    mapLabels: {
      country: 'SUDAN',
      marker: 'PORT SUDAN',
      markerSub: 'RED SEA',
      neighbours: { EGY: 'EGYPT', LBY: 'LIBYA', TCD: 'CHAD', SDS: 'SOUTH SUDAN', CAF: 'C.A.R.', ETH: 'ETHIOPIA', SAU: 'SAUDI ARABIA' },
    },
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'في الصحافة',
    org: 'بحسب موقع «إن دي غازيت» البلجيكي',
    headline: 'البرهان يعرض على بوتين منفذاً إلى البحر الأحمر وسط تساؤلات حول الأجهزة الاستخباراتية السودانية',
    dateline: 'جنيف',
    date: 'التاريخ: 7 نوفمبر 2026',
    lead: 'أفاد موقع «إن دي غازيت» البلجيكي بأن قائد الجيش السوداني عرض على روسيا، في الكرملين يوم 30 أكتوبر 2026، منطقة اقتصادية حرة على البحر الأحمر وامتيازات للتعدين ومشاركة في السكك الحديدية. ولم يُعلَن أي اتفاق نهائي، ولم يتأكد إنشاء قاعدة بحرية.',
    mapLabels: {
      country: 'السودان',
      marker: 'بورتسودان',
      markerSub: 'البحر الأحمر',
      neighbours: { EGY: 'مصر', LBY: 'ليبيا', TCD: 'تشاد', SDS: 'جنوب السودان', CAF: 'أفريقيا الوسطى', ETH: 'إثيوبيا', SAU: 'السعودية' },
    },
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'REVUE DE PRESSE',
    org: 'Selon In de Gazette',
    headline: 'Al-Burhan offre à Poutine un accès à la mer Rouge, les services de renseignement soudanais mis en cause',
    dateline: 'GENÈVE',
    date: 'Date : 7 novembre 2026',
    lead: "In de Gazette rapporte que le chef de l'armée soudanaise a offert à la Russie, au Kremlin le 30 octobre 2026, une zone franche sur la mer Rouge, des concessions minières et un rôle dans le rail. Aucun accord n'est annoncé ; une base navale n'est pas confirmée.",
    mapLabels: {
      country: 'SOUDAN',
      marker: 'PORT-SOUDAN',
      markerSub: 'MER ROUGE',
      neighbours: { EGY: 'ÉGYPTE', LBY: 'LIBYE', TCD: 'TCHAD', SDS: 'SOUDAN DU SUD', CAF: 'RCA', ETH: 'ÉTHIOPIE', SAU: 'ARABIE SAOUDITE' },
    },
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
