// Statement, Geneva, 8 November 2026 — "Ahmed Haroun's Reappearance Unveils the Islamic
// Movement's Dual Discourse and Exploitation of the War to Reclaim Power".
// Source: press/NOV/2/ (a cover card, six text cards, a PDF of the same seven cards) and the
// full text the client sent by WhatsApp on 9 November 2026.
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-ahmed-haroun.mjs
//               node --env-file=.env.local prisma/seed-statement-ahmed-haroun.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-ahmed-haroun.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-ahmed-haroun.mjs
//
// Covers: EN is the client's own card, re-encoded to cover.jpg. AR/FR are photo cards:
//   FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-ahmed-haroun.mjs
// Variants: node scripts/gen-image-variants.mjs statement-ahmed-haroun-reappearance-islamic-movement-november-2026
//
// EDITORIAL NOTES (9 November 2026):
//  - CLIENT INSTRUCTION, after the typo report: "Please edit and publish along with the
//    image. Leave the PDF file and the rest of the images." (WhatsApp, 9 Nov 2026, 8:21 pm).
//    So: the text is corrected here, the cover card is the only artwork, and there is no
//    gallery and no PDF.
//  - CORRECTIONS to the supplied text (cards and WhatsApp text alike):
//      "shared iests"                         -> "shared interests"
//      "Denying nterformal party membership"  -> "Denying formal party membership"
//      "humanhts abuses rig"                  -> "human rights abuses"
//      "confrontingobstructed the interests"  -> "confronting the interests"
//      "those who  its transition"            -> "those who obstructed its transition"
//    Light copy-edit, meaning unchanged: "Reclaim POWER" -> "Reclaim Power" (title);
//    "(ICHRO), is following" -> "(ICHRO) is following"; "In his interview … the Coalition
//    views" -> "Following his interview …"; two comma splices -> semicolons; "The Coalition
//    asks, who" -> "asks: who"; stray spaces removed. Paragraphs follow the cards.
//  - LETTER HEADER: the "To:" block becomes "Addressed to:" with five recipients; the ICC
//    street address and "Your Excellencies, Greetings." are dropped. "The Coalition's
//    demands" is an added lead-in (no new wording in the demands themselves). The contact
//    lines are dropped: they are in the site footer, and their emoji are non-BMP.
//  - HEDGES, load-bearing — keep them in any edit: the High Commissioner "warned of reports
//    regarding summary executions … attributed to the Al-Baraa Ibn Malik Battalion", against
//    individuals "accused of collaborating" with the RSF. AR: حذّر … من تقارير … نُسبت إلى /
//    متهمين بالتعاون. FR: des informations faisant état de … attribuées au / accusées de
//    collaborer.
//  - FACTUAL ANCHORS (not added to the body): Haroun is subject to ICC arrest warrants
//    (2007) and left Kober prison in April 2023; the US Treasury designated Ali Karti on
//    28 September 2023.
//  - AR and FR are our translations of the edited English.
//  - ARTWORK: the client's cover card still prints the old name line "The International
//    Coalition for Human Rights" above the headline. It is published as supplied, at the
//    client's instruction. The AR/FR band is the portrait from that card, composed to fit the
//    photo-card band (press/NOV/2/haroun-band.jpg, uncommitted).
//  - Category Statement. Dateline Geneva, 8 November 2026, as printed on the card.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'statement-ahmed-haroun-reappearance-islamic-movement-november-2026';
// Generated once, 9 November 2026. Never regenerate.
export const TRANSLATION_KEY = 'b8b3747d-4eab-4e04-8bbf-56f526ad1ae6';

const EN_BODY = `**Addressed to:**

- The European Parliament, including its Subcommittee on Human Rights (DROI) and Committee on Foreign Affairs (AFET)
- The European Commission
- The European External Action Service (EEAS)
- The International Criminal Court, The Hague
- The Independent International Fact-Finding Mission for the Sudan, UN Human Rights Council, Geneva

The International Coalition of Human Rights Organizations (ICHRO) is following with deep concern the media appearance of Ahmed Haroun—a prominent leader in the National Congress Party (NCP) and a fugitive wanted by the International Criminal Court (ICC). Following his interview regarding the war, the future of governance, and the Islamic Movement’s relationship with the Sudanese Armed Forces (SAF), the Coalition views his re-emergence as a deliberate attempt to reintroduce leaders of the former regime as key actors shaping Sudan’s future—all while civilians bear the tragic consequences of this struggle for power and persistent impunity.

The Coalition asserts that the content of the interview reinforces its long-standing position: the war in Sudan cannot be understood in isolation from the role of the Islamic Movement, its legacy of politicizing military and security institutions and its systemic efforts to obstruct the democratic transition to regain influence. Reducing the war to a purely military conflict ignores the political and organizational forces that laid the groundwork for its outbreak and are currently exploiting its continuation to reshape power dynamics, depriving the Sudanese people of their right to a civilian, democratic government.

This accountability extends beyond political debate. When the U.S. Department of the Treasury sanctioned Ali Karti in September 2023, it explicitly cited the leadership of the Islamic Movement for undermining the civilian transitional government, impeding the political process, contributing to the conditions that sparked the fighting, and hindering ceasefire efforts. These are established facts that demand accountability; they cannot be brushed aside by reframing the Movement’s political and military role as a defense of the state.

The dual nature of this discourse is evident in Haroun’s denial of any formal organizational link between the NCP and General Abdel Fattah al-Burhan, contrasted with his portrayal of their relationship as an alignment dictated by battle and shared interests. Denying formal party membership does not negate an active political and field alliance, nor does it address the extent of the Islamic Movement’s influence within state institutions or the military’s independence in decision-making.

The Coalition asks: who determines the choices of war and peace, under what mandate, and in whose interest?

Al-Burhan’s leadership cannot be treated as separate from these networks without scrutinizing their actual impact on the conduct and prolongation of the war.

Furthermore, Haroun’s proposal for a hybrid political system that incorporates the military into governance represents a direction that human rights organizations must firmly reject whenever civilian authority is subjected to armed guardianship.

Using the shortcomings of past political experiences to justify continued military intervention merely reproduces the crisis the Sudanese people fought to overcome. The right of citizens to choose and hold their leaders accountable cannot be reduced to power-sharing arrangements between armed factions and former regime networks, while civilians are expected to accept the war’s outcome as the foundation for the next political order.

This double standard reaches its peak when the protection of the state is invoked while citizens’ lives and rights are violated by armed groups fighting alongside the army.

The UN High Commissioner for Human Rights has previously warned of reports regarding summary executions in southern Khartoum attributed to the Al-Baraa Ibn Malik Battalion, targeting individuals accused of collaborating with the Rapid Support Forces (RSF).

These acts warrant an independent investigation and accountability for all responsible parties, including those who issued orders or facilitated them. They cannot be justified by military mobilization or by classifying civilians based on political loyalty or regional origin.

The Coalition emphasizes that civilians who lost their lives, homes, security and their children’s futures must not have their tragedy turned into the price for the Islamic Movement’s return to power.

The insistence of its leadership on regaining influence and resisting a transition that subjects state institutions to civilian oversight has deepened the catastrophe facing Sudan.

A state worthy of protection is one that safeguards its citizens and their rights; it is not protected by enabling a political organization to monopolize its institutions or use war to derail the democratic path opened by the sacrifices of the Sudanese people.

**The Coalition’s demands**

Haroun’s public appearance places direct responsibility on the authorities led by Al-Burhan to explain why he remains at large.

The Coalition demands a full disclosure of the circumstances surrounding his escape from prison, the entities that facilitated his movements, any political or security protection he receives, and his connections to active officers and decision-making centers.

The Coalition further calls for his immediate arrest and surrender to the ICC, along with an investigation into any official or party role that has prevented his transfer to international justice.

The Coalition urges international and regional partners to review their engagement with influence networks that impede a ceasefire and a civilian transition. It calls for tangible pressure to halt support for entities involved in human rights abuses and to hold perpetrators accountable.

The Coalition warns against any political settlement that grants former regime figures influence in exchange for stalling justice or re-establishing their control under military arrangements.

Ending the war requires confronting the interests that fuel it, protecting civilians and clearing the path for the free will of the Sudanese people.

The Coalition reaffirms its commitment to a professional army, independent of politics and subordinate to civilian authority, and to a democratic path that guarantees accountability and equal participation. Sudan’s destruction must not become a stepping stone for the return of those who obstructed its transition, nor should the sacrifices of its victims become leverage in a battle for control of the state.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 8 November 2026`;

const EN_EXCERPT =
  'The Coalition is following with deep concern the media reappearance of Ahmed Haroun, a National Congress Party leader wanted by the International Criminal Court, which it sees as an attempt to return former-regime figures to power. It calls for his immediate arrest and surrender to the ICC.';

const AR_BODY = `**موجَّه إلى:**

- البرلمان الأوروبي، بما في ذلك اللجنة الفرعية لحقوق الإنسان (DROI) ولجنة الشؤون الخارجية (AFET)
- المفوضية الأوروبية
- دائرة العمل الخارجي الأوروبي (EEAS)
- المحكمة الجنائية الدولية، لاهاي
- البعثة الدولية المستقلة لتقصي الحقائق بشأن السودان، مجلس حقوق الإنسان التابع للأمم المتحدة، جنيف

يتابع التحالف الدولي لمنظمات حقوق الإنسان (ICHRO) بقلق بالغ الظهور الإعلامي لأحمد هارون، القيادي البارز في حزب المؤتمر الوطني والفارّ المطلوب لدى المحكمة الجنائية الدولية. وفي ضوء مقابلته بشأن الحرب ومستقبل الحكم وعلاقة الحركة الإسلامية بالقوات المسلحة السودانية، يرى التحالف في عودته إلى الواجهة محاولةً متعمَّدة لإعادة تقديم قيادات النظام السابق بوصفهم فاعلين رئيسيين في رسم مستقبل السودان، في وقت يتحمّل فيه المدنيون العواقب المأساوية لهذا الصراع على السلطة ولاستمرار الإفلات من العقاب.

ويؤكد التحالف أن مضمون المقابلة يعزّز موقفه الثابت: لا يمكن فهم الحرب في السودان بمعزل عن دور الحركة الإسلامية، وإرثها في تسييس المؤسستين العسكرية والأمنية، وجهودها الممنهجة لعرقلة الانتقال الديمقراطي بهدف استعادة نفوذها. إن اختزال الحرب في صراع عسكري بحت يتجاهل القوى السياسية والتنظيمية التي مهّدت لاندلاعها وتستغل اليوم استمرارها لإعادة تشكيل موازين القوى، بما يحرم الشعب السوداني من حقه في حكم مدني ديمقراطي.

ولا تقتصر هذه المساءلة على الجدل السياسي. فعندما فرضت وزارة الخزانة الأمريكية عقوبات على علي كرتي في سبتمبر 2023، استندت صراحةً إلى دور قيادة الحركة الإسلامية في تقويض الحكومة الانتقالية المدنية، وعرقلة العملية السياسية، والإسهام في الظروف التي أشعلت القتال، وإعاقة جهود وقف إطلاق النار. وهذه وقائع ثابتة تستوجب المساءلة؛ ولا يمكن تجاوزها بإعادة تصوير الدور السياسي والعسكري للحركة على أنه دفاع عن الدولة.

وتتجلّى ازدواجية هذا الخطاب في نفي هارون وجود أي صلة تنظيمية رسمية بين حزب المؤتمر الوطني والفريق أول عبد الفتاح البرهان، في مقابل تصويره العلاقة بينهما على أنها تحالف تمليه المعركة والمصالح المشتركة. فنفي العضوية الحزبية الرسمية لا ينفي وجود تحالف سياسي وميداني فعلي، ولا يجيب عن مدى نفوذ الحركة الإسلامية داخل مؤسسات الدولة أو عن مدى استقلالية الجيش في اتخاذ القرار.

ويتساءل التحالف: من يحدّد خيارات الحرب والسلام، وبأي تفويض، ولمصلحة من؟

ولا يمكن التعامل مع قيادة البرهان بمعزل عن هذه الشبكات من دون التدقيق في أثرها الفعلي على إدارة الحرب وإطالة أمدها.

كما أن مقترح هارون بشأن نظام سياسي هجين يُشرك الجيش في الحكم يمثّل توجهًا يتعيّن على منظمات حقوق الإنسان رفضه بحزم كلما أُخضعت السلطة المدنية لوصاية السلاح.

إن توظيف إخفاقات التجارب السياسية السابقة لتبرير استمرار التدخل العسكري لا يؤدي إلا إلى إعادة إنتاج الأزمة التي ناضل الشعب السوداني لتجاوزها. فحق المواطنين في اختيار قادتهم ومساءلتهم لا يمكن اختزاله في ترتيبات لتقاسم السلطة بين الفصائل المسلحة وشبكات النظام السابق، بينما يُنتظر من المدنيين القبول بنتائج الحرب أساسًا للنظام السياسي المقبل.

ويبلغ هذا الكيل بمكيالين ذروته حين يُستدعى شعار حماية الدولة في الوقت الذي تُنتهك فيه أرواح المواطنين وحقوقهم على أيدي جماعات مسلحة تقاتل إلى جانب الجيش.

وقد سبق للمفوض السامي للأمم المتحدة لحقوق الإنسان أن حذّر من تقارير عن إعدامات بإجراءات موجزة في جنوب الخرطوم نُسبت إلى كتيبة البراء بن مالك، استهدفت أفرادًا متهمين بالتعاون مع قوات الدعم السريع.

وتستوجب هذه الأفعال تحقيقًا مستقلًا ومساءلة جميع المسؤولين عنها، بمن فيهم من أصدروا الأوامر أو سهّلوا تنفيذها. ولا يمكن تبريرها بالتعبئة العسكرية أو بتصنيف المدنيين على أساس الولاء السياسي أو الانتماء الجهوي.

ويشدّد التحالف على أن المدنيين الذين فقدوا أرواحهم ومنازلهم وأمنهم ومستقبل أطفالهم يجب ألا تتحول مأساتهم إلى ثمن لعودة الحركة الإسلامية إلى السلطة.

إن إصرار قيادتها على استعادة النفوذ ومقاومة انتقال يُخضع مؤسسات الدولة للرقابة المدنية قد عمّق الكارثة التي يواجهها السودان.

إن الدولة الجديرة بالحماية هي التي تصون مواطنيها وحقوقهم؛ ولا تُحمى بتمكين تنظيم سياسي من احتكار مؤسساتها أو من استخدام الحرب لإجهاض المسار الديمقراطي الذي فتحته تضحيات الشعب السوداني.

**مطالب التحالف**

إن ظهور هارون العلني يضع على عاتق السلطات التي يقودها البرهان مسؤولية مباشرة في تفسير أسباب بقائه طليقًا.

ويطالب التحالف بالكشف الكامل عن ملابسات فراره من السجن، والجهات التي سهّلت تنقلاته، وأي حماية سياسية أو أمنية يتمتع بها، وصلاته بضباط في الخدمة وبمراكز صنع القرار.

كما يدعو التحالف إلى القبض عليه فورًا وتسليمه إلى المحكمة الجنائية الدولية، وإلى التحقيق في أي دور رسمي أو حزبي حال دون تسليمه إلى العدالة الدولية.

ويحثّ التحالف الشركاء الدوليين والإقليميين على مراجعة تعاملهم مع شبكات النفوذ التي تعرقل وقف إطلاق النار والانتقال المدني، ويدعو إلى ممارسة ضغط ملموس لوقف الدعم المقدَّم للجهات المتورطة في انتهاكات حقوق الإنسان ولمحاسبة مرتكبيها.

ويحذّر التحالف من أي تسوية سياسية تمنح رموز النظام السابق نفوذًا مقابل تعطيل العدالة أو إعادة ترسيخ سيطرتهم في ظل ترتيبات عسكرية.

إن إنهاء الحرب يتطلب مواجهة المصالح التي تغذّيها، وحماية المدنيين، وتمهيد الطريق أمام الإرادة الحرة للشعب السوداني.

ويجدّد التحالف التزامه بجيش مهني مستقل عن السياسة وخاضع للسلطة المدنية، وبمسار ديمقراطي يضمن المساءلة والمشاركة المتساوية. ويجب ألا يصبح دمار السودان معبرًا لعودة من عرقلوا انتقاله، ولا أن تتحول تضحيات ضحاياه إلى ورقة ضغط في معركة السيطرة على الدولة.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 8 نوفمبر 2026`;

const AR_EXCERPT =
  'يتابع التحالف بقلق بالغ عودة أحمد هارون، القيادي في حزب المؤتمر الوطني والمطلوب لدى المحكمة الجنائية الدولية، إلى الظهور الإعلامي، ويرى فيها محاولة لإعادة رموز النظام السابق إلى السلطة. ويدعو إلى القبض عليه فورًا وتسليمه إلى المحكمة الجنائية الدولية.';

const FR_BODY = `**Destinataires :**

- Le Parlement européen, notamment sa sous-commission des droits de l'homme (DROI) et sa commission des affaires étrangères (AFET)
- La Commission européenne
- Le Service européen pour l'action extérieure (SEAE)
- La Cour pénale internationale, La Haye
- La Mission internationale indépendante d'établissement des faits pour le Soudan, Conseil des droits de l'homme des Nations Unies, Genève

La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) suit avec une vive préoccupation l'apparition médiatique d'Ahmed Haroun, dirigeant de premier plan du Parti du Congrès national (NCP) et fugitif recherché par la Cour pénale internationale (CPI). À la suite de son entretien consacré à la guerre, à l'avenir de la gouvernance et aux relations du Mouvement islamique avec les Forces armées soudanaises (FAS), la Coalition voit dans sa réapparition une tentative délibérée de réintroduire des dirigeants de l'ancien régime comme acteurs clés de l'avenir du Soudan, alors même que les civils subissent les conséquences tragiques de cette lutte pour le pouvoir et d'une impunité persistante.

La Coalition affirme que le contenu de l'entretien conforte sa position de longue date : la guerre au Soudan ne peut être comprise indépendamment du rôle du Mouvement islamique, de son héritage de politisation des institutions militaires et sécuritaires et de ses efforts systématiques pour entraver la transition démocratique afin de regagner de l'influence. Réduire la guerre à un conflit purement militaire revient à ignorer les forces politiques et organisationnelles qui ont préparé le terrain à son déclenchement et qui exploitent aujourd'hui sa poursuite pour remodeler les rapports de force, privant le peuple soudanais de son droit à un gouvernement civil et démocratique.

Cette exigence de responsabilité dépasse le débat politique. Lorsque le département du Trésor des États-Unis a sanctionné Ali Karti en septembre 2023, il a explicitement mis en cause la direction du Mouvement islamique pour avoir sapé le gouvernement civil de transition, entravé le processus politique, contribué aux conditions qui ont déclenché les combats et fait obstacle aux efforts de cessez-le-feu. Ce sont des faits établis qui appellent des comptes ; ils ne peuvent être écartés en présentant le rôle politique et militaire du Mouvement comme une défense de l'État.

La duplicité de ce discours apparaît clairement lorsque Haroun nie tout lien organisationnel formel entre le NCP et le général Abdel Fattah al-Burhan, tout en présentant leur relation comme une alliance dictée par la bataille et des intérêts communs. Nier une appartenance partisane formelle ne dément pas l'existence d'une alliance politique et militaire active sur le terrain, et ne répond pas à la question de l'influence du Mouvement islamique au sein des institutions de l'État ni de l'indépendance de l'armée dans la prise de décision.

La Coalition pose la question : qui décide des choix de guerre et de paix, en vertu de quel mandat, et dans l'intérêt de qui ?

La direction d'al-Burhan ne peut être considérée comme distincte de ces réseaux sans examiner leur influence réelle sur la conduite et la prolongation de la guerre.

En outre, la proposition de Haroun d'un système politique hybride associant l'armée à la gouvernance représente une orientation que les organisations de défense des droits de l'homme doivent rejeter fermement dès lors que l'autorité civile est placée sous tutelle armée.

Invoquer les insuffisances des expériences politiques passées pour justifier la poursuite de l'intervention militaire ne fait que reproduire la crise que le peuple soudanais s'est battu pour surmonter. Le droit des citoyens de choisir leurs dirigeants et de leur demander des comptes ne saurait être réduit à des arrangements de partage du pouvoir entre factions armées et réseaux de l'ancien régime, tandis que l'on attend des civils qu'ils acceptent l'issue de la guerre comme fondement du prochain ordre politique.

Ce double standard atteint son paroxysme lorsque la protection de l'État est invoquée alors que la vie et les droits des citoyens sont bafoués par des groupes armés combattant aux côtés de l'armée.

Le Haut-Commissaire des Nations Unies aux droits de l'homme a déjà mis en garde contre des informations faisant état d'exécutions sommaires dans le sud de Khartoum, attribuées au bataillon Al-Baraa Ibn Malik et visant des personnes accusées de collaborer avec les Forces de soutien rapide (FSR).

Ces actes appellent une enquête indépendante et l'établissement des responsabilités de toutes les parties concernées, y compris de ceux qui ont donné les ordres ou les ont facilités. Ils ne sauraient être justifiés par la mobilisation militaire ni par le classement des civils selon leur loyauté politique ou leur origine régionale.

La Coalition souligne que les civils qui ont perdu la vie, leur foyer, leur sécurité et l'avenir de leurs enfants ne doivent pas voir leur tragédie devenir le prix du retour au pouvoir du Mouvement islamique.

L'obstination de sa direction à regagner de l'influence et à résister à une transition soumettant les institutions de l'État au contrôle civil a aggravé la catastrophe que vit le Soudan.

Un État digne de protection est un État qui protège ses citoyens et leurs droits ; il n'est pas protégé en permettant à une organisation politique de monopoliser ses institutions ou d'utiliser la guerre pour faire dérailler la voie démocratique ouverte par les sacrifices du peuple soudanais.

**Les demandes de la Coalition**

L'apparition publique de Haroun fait peser sur les autorités dirigées par al-Burhan la responsabilité directe d'expliquer pourquoi il demeure en liberté.

La Coalition exige la pleine divulgation des circonstances de son évasion de prison, des entités qui ont facilité ses déplacements, de toute protection politique ou sécuritaire dont il bénéficie et de ses liens avec des officiers en activité et des centres de décision.

La Coalition appelle en outre à son arrestation immédiate et à sa remise à la CPI, ainsi qu'à une enquête sur tout rôle officiel ou partisan ayant empêché son transfert devant la justice internationale.

La Coalition exhorte les partenaires internationaux et régionaux à revoir leurs relations avec les réseaux d'influence qui entravent un cessez-le-feu et une transition civile. Elle appelle à des pressions concrètes pour mettre fin au soutien apporté aux entités impliquées dans des violations des droits de l'homme et pour que les auteurs répondent de leurs actes.

La Coalition met en garde contre tout règlement politique qui accorderait de l'influence à des figures de l'ancien régime en échange d'un blocage de la justice ou du rétablissement de leur contrôle dans le cadre d'arrangements militaires.

Mettre fin à la guerre exige d'affronter les intérêts qui l'alimentent, de protéger les civils et d'ouvrir la voie à la libre volonté du peuple soudanais.

La Coalition réaffirme son attachement à une armée professionnelle, indépendante de la politique et subordonnée à l'autorité civile, ainsi qu'à une voie démocratique garantissant la responsabilité et une participation égale. La destruction du Soudan ne doit pas devenir un tremplin pour le retour de ceux qui ont entravé sa transition, et les sacrifices de ses victimes ne doivent pas devenir un levier dans une lutte pour le contrôle de l'État.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 8 novembre 2026`;

const FR_EXCERPT =
  "La Coalition suit avec une vive préoccupation la réapparition médiatique d'Ahmed Haroun, dirigeant du Parti du Congrès national recherché par la Cour pénale internationale, qu'elle considère comme une tentative de ramener au pouvoir des figures de l'ancien régime. Elle appelle à son arrestation immédiate et à sa remise à la CPI.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-08',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title:
        'Ahmed Haroun’s Reappearance Unveils the Islamic Movement’s Dual Discourse and Exploitation of the War to Reclaim Power',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      // The client's own card. No gallery and no PDF, at the client's request.
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'عودة أحمد هارون إلى الظهور تكشف ازدواجية خطاب الحركة الإسلامية واستغلالها الحرب لاستعادة السلطة',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "La réapparition d'Ahmed Haroun révèle le double discours du Mouvement islamique et son exploitation de la guerre pour reprendre le pouvoir",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: client-style photo card (docs/runbooks/press/photo-card.md), AR and FR only — the
// English cover is the client's own card, and an `en` entry here would overwrite cover.jpg.
// The band is the portrait from that card, composed to sit above the diagonal; the source file
// stays in press/, uncommitted.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/2/haroun-band.jpg' };

export const PHOTO_CARDS = {
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يرى في عودة أحمد هارون كشفًا لازدواجية خطاب الحركة الإسلامية',
    dateline: 'جنيف',
    date: 'التاريخ: 8 نوفمبر 2026',
    lead: 'يدعو التحالف إلى القبض فورًا على أحمد هارون، المطلوب لدى المحكمة الجنائية الدولية، وتسليمه إلى المحكمة، وإلى الكشف الكامل عن ملابسات فراره من السجن.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: "voit dans la réapparition d'Ahmed Haroun le double discours du Mouvement islamique",
    dateline: 'GENÈVE',
    date: 'Date : 8 novembre 2026',
    lead: "La Coalition appelle à l'arrestation immédiate d'Ahmed Haroun, recherché par la CPI, à sa remise à la Cour et à la pleine divulgation des circonstances de son évasion.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
