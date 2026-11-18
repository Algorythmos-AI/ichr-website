// Statement, Brussels, 17 November 2026 — "Statement of Condemnation Regarding Violations
// Committed by the Sudanese Armed Forces-Affiliated Joint Force Against Women in Al-Saada
// Al-Douma, Kordofan".
// Source: press/NOV/7/ (notes.rtf, the client's text; two stills and the video, received
// 18 November 2026) and the Coalition's YouTube Short SzgaCAsPSm8, which this statement
// accompanies on /media (src/data/videos.ts, slug al-saada-al-douma-women-kordofan-2026).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-al-saada-al-douma-women.mjs
//               node --env-file=.env.local prisma/seed-statement-al-saada-al-douma-women.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-al-saada-al-douma-women.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-al-saada-al-douma-women.mjs
//
// Covers: FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-al-saada-al-douma-women.mjs
// Variants: FORCE=1 node scripts/gen-image-variants.mjs condemnation-violations-women-al-saada-al-douma-kordofan-november-2026
//
// EDITORIAL NOTES (18 November 2026):
//  - The client's text, published verbatim in substance. Copy-edit only: "The International
//    Coalition , condemns" -> "condemns"; the free-standing "(ICHRO)/NGOs" name line joined to
//    the opening sentence; zero-width and stray spaces removed; one run-on sentence split.
//  - HEDGES, load-bearing — keep them in every language and every edit: "reported violations";
//    "allegations of harassment, extortion and grave assaults"; "statements attributed to a member
//    of the Joint Force"; "any violations proven to have been committed"; "its potential
//    responsibility". AR: المُبلَّغ عنها / ادعاءات / منسوبة إلى / يثبت / مسؤوليتها المحتملة.
//    FR: signalées / allégations / attribuées à / dont la commission serait établie /
//    sa responsabilité potentielle.
//  - IMAGES, owner's choice: the band is the client's still (press/NOV/7), unblurred, in natural
//    colour. It shows the faces of women the statement describes as alleged victims; this was
//    raised and the owner chose to publish it as supplied. The /media poster is NOT the YouTube
//    frame but the English cover card (no face until play).
//  - Dateline Brussels, 17 November 2026, as written. The video was uploaded 18 November (UTC).
//  - Contact lines dropped (site footer; non-BMP emoji). AR and FR are our translations.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'condemnation-violations-women-al-saada-al-douma-kordofan-november-2026';
// Generated once, 18 November 2026. Never regenerate.
export const TRANSLATION_KEY = '5cf6f953-6cf7-4fd4-9e0d-ade0c90901c3';
export const VIDEO_URL = 'https://www.youtube.com/shorts/SzgaCAsPSm8';

// The statement paragraphs, shared with the /media entry (src/data/videos.ts) — change both.
export const PARAS = {
  en: [
    'The International Coalition of Human Rights Organizations (ICHRO)/NGOs condemns in the strongest and most unequivocal terms the reported violations committed against women in the village of Al-Saada Al-Douma, located in the Dar Hamar area of Kordofan, following the entry of elements belonging to the Joint Force—allied with the Sudanese Armed Forces (SAF)—into the village.',
    'These incidents were accompanied by degrading practices and allegations of harassment, extortion and grave assaults on the dignity of rural women.',
    'The Coalition expresses its profound outrage and condemnation regarding video footage circulating online featuring statements attributed to a member of the Joint Force. In the footage, the fighter calls upon combatants to travel to the village for the purpose of marriage, referring to its women in a derogatory and demeaning manner that reduces women to commodities accessible to combatants under the coercion of arms.',
    'The Coalition underscores that this incident cannot be dismissed as an isolated act of individual misconduct; rather, it necessitates an investigation into the military and media environment that enabled such rhetoric to emerge.',
    'The Coalition notes that these events raise serious concerns regarding the impact of hate speech and incitement propagated by certain pro-SAF propaganda platforms, which contribute to dehumanizing women and local communities and fostering a climate that normalizes and justifies their abuse and exploitation during armed conflict.',
    'The Coalition holds the Joint Force directly accountable for any violations proven to have been committed by its personnel and affirms the imperative of holding the leadership of the Sudanese Armed Forces accountable for its potential responsibility, given the military alliance and operational coordination between the two parties. Allied military formations must not be utilized as a mechanism to evade accountability. Investigations must examine the nature of military orders, the chain of command and the extent to which commanders had knowledge of these practices or failed to prevent them, and hold perpetrators to account.',
    'Targeting rural women for humiliation and moral subjugation, and treating local communities as spoils of war, constitutes an unacceptable assault on human dignity and a grave breach of fundamental principles governing the protection of civilians.',
    'Accordingly, the International Coalition of Human Rights Organizations calls upon the United Nations Human Rights Council and the Independent International Fact-Finding Mission for the Sudan to launch an urgent and independent investigation into this incident. This investigation must encompass the violations committed against the women of Al-Saada Al-Douma, the accountability of the Joint Force and relevant military commanders, and an examination of the role of hate speech and war propaganda in inciting or encouraging such practices.',
    'Furthermore, the Coalition stresses the urgent need to ensure the protection of rural women across Kordofan and Darfur, guarantee the safety and security of victims and witnesses, and hold accountable all individuals found responsible for perpetrating, ordering or concealing these violations.',
    'The dignity of Sudanese women is not a spoil of war, nor may women be reduced to commodities or instrumentalized as weapons to humiliate communities. Any military leadership that permits or condones such practices must be held fully accountable in accordance with international law.',
  ],
  ar: [
    'يدين التحالف الدولي لمنظمات حقوق الإنسان (ICHRO)/المنظمات غير الحكومية بأشد العبارات وأكثرها وضوحًا الانتهاكات المُبلَّغ عنها التي ارتُكبت بحق النساء في قرية السعادة الدومة، الواقعة في منطقة دار حمر بكردفان، عقب دخول عناصر تابعة للقوة المشتركة — المتحالفة مع القوات المسلحة السودانية — إلى القرية.',
    'وقد رافقت هذه الأحداث ممارسات مهينة وادعاءات بالتحرش والابتزاز والاعتداءات الجسيمة على كرامة النساء الريفيات.',
    'ويعرب التحالف عن بالغ استنكاره وإدانته لمقطع فيديو متداول على الإنترنت يتضمن تصريحات منسوبة إلى أحد عناصر القوة المشتركة. وفي المقطع، يدعو المقاتل المقاتلين إلى التوجه إلى القرية بغرض الزواج، متحدثًا عن نسائها بأسلوب مهين ومحقّر يختزل النساء إلى سلع متاحة للمقاتلين تحت إكراه السلاح.',
    'ويؤكد التحالف أن هذه الواقعة لا يمكن اعتبارها تصرفًا فرديًا معزولًا، بل تستوجب التحقيق في البيئة العسكرية والإعلامية التي سمحت بظهور مثل هذا الخطاب.',
    'ويشير التحالف إلى أن هذه الأحداث تثير مخاوف جدية بشأن أثر خطاب الكراهية والتحريض الذي تروّجه بعض المنصات الدعائية الموالية للقوات المسلحة السودانية، والتي تسهم في نزع الإنسانية عن النساء والمجتمعات المحلية، وفي تهيئة مناخ يطبّع الاعتداء عليهم واستغلالهم خلال النزاع المسلح ويبرّرهما.',
    'ويحمّل التحالف القوة المشتركة المسؤولية المباشرة عن أي انتهاكات يثبت ارتكابها من قبل أفرادها، ويؤكد ضرورة مساءلة قيادة القوات المسلحة السودانية عن مسؤوليتها المحتملة، بالنظر إلى التحالف العسكري والتنسيق العملياتي بين الطرفين. ولا يجوز استخدام التشكيلات العسكرية المتحالفة وسيلةً للإفلات من المساءلة. ويجب أن تتناول التحقيقات طبيعة الأوامر العسكرية، وتسلسل القيادة، ومدى علم القادة بهذه الممارسات أو تقصيرهم في منعها، وأن تحاسب الجناة.',
    'إن استهداف النساء الريفيات بالإذلال والإخضاع المعنوي، ومعاملة المجتمعات المحلية بوصفها غنائم حرب، يشكّل اعتداءً غير مقبول على الكرامة الإنسانية وانتهاكًا جسيمًا للمبادئ الأساسية التي تحكم حماية المدنيين.',
    'وبناءً على ذلك، يدعو التحالف الدولي لمنظمات حقوق الإنسان مجلس حقوق الإنسان التابع للأمم المتحدة والبعثة الدولية المستقلة لتقصي الحقائق بشأن السودان إلى فتح تحقيق عاجل ومستقل في هذه الواقعة. ويجب أن يشمل هذا التحقيق الانتهاكات المرتكبة بحق نساء السعادة الدومة، ومساءلة القوة المشتركة والقادة العسكريين المعنيين، وفحص دور خطاب الكراهية والدعاية الحربية في التحريض على مثل هذه الممارسات أو تشجيعها.',
    'كما يشدّد التحالف على الحاجة الملحّة إلى ضمان حماية النساء الريفيات في كردفان ودارفور، وكفالة سلامة الضحايا والشهود وأمنهم، ومحاسبة كل من يثبت مسؤوليته عن ارتكاب هذه الانتهاكات أو الأمر بها أو التستر عليها.',
    'إن كرامة المرأة السودانية ليست غنيمة حرب، ولا يجوز اختزال النساء إلى سلع أو توظيفهن سلاحًا لإذلال المجتمعات. وكل قيادة عسكرية تسمح بمثل هذه الممارسات أو تتغاضى عنها يجب أن تُساءل مساءلة كاملة وفقًا للقانون الدولي.',
  ],
  fr: [
    "La Coalition internationale des organisations de défense des droits de l'homme (ICHRO)/ONG condamne dans les termes les plus fermes et les plus clairs les violations signalées commises contre des femmes dans le village d'Al-Saada Al-Douma, situé dans la région de Dar Hamar, au Kordofan, à la suite de l'entrée dans le village d'éléments de la Force conjointe, alliée aux Forces armées soudanaises (FAS).",
    "Ces incidents se sont accompagnés de pratiques dégradantes et d'allégations de harcèlement, d'extorsion et de graves atteintes à la dignité des femmes rurales.",
    "La Coalition exprime sa profonde indignation et sa condamnation au sujet d'une vidéo circulant en ligne contenant des propos attribués à un membre de la Force conjointe. Dans cette vidéo, le combattant appelle des combattants à se rendre au village en vue de se marier, en parlant de ses femmes de manière dégradante et humiliante, réduisant les femmes à des marchandises accessibles aux combattants sous la contrainte des armes.",
    "La Coalition souligne que cet incident ne saurait être considéré comme un acte isolé de mauvaise conduite individuelle ; il exige au contraire une enquête sur l'environnement militaire et médiatique qui a permis l'émergence d'un tel discours.",
    "La Coalition relève que ces événements suscitent de graves préoccupations quant à l'impact du discours de haine et de l'incitation propagés par certaines plateformes de propagande favorables aux FAS, qui contribuent à déshumaniser les femmes et les communautés locales et à créer un climat qui banalise et justifie les abus et l'exploitation dont elles font l'objet pendant le conflit armé.",
    "La Coalition tient la Force conjointe directement responsable de toute violation dont la commission par ses membres serait établie et affirme la nécessité de demander des comptes à la direction des Forces armées soudanaises pour sa responsabilité potentielle, compte tenu de l'alliance militaire et de la coordination opérationnelle entre les deux parties. Les formations militaires alliées ne doivent pas servir de moyen d'échapper à la reddition de comptes. Les enquêtes doivent examiner la nature des ordres militaires, la chaîne de commandement et la mesure dans laquelle les commandants avaient connaissance de ces pratiques ou ont manqué de les prévenir, et faire répondre les auteurs de leurs actes.",
    "Prendre pour cible des femmes rurales afin de les humilier et de les soumettre moralement, et traiter les communautés locales comme un butin de guerre, constitue une atteinte inacceptable à la dignité humaine et une violation grave des principes fondamentaux régissant la protection des civils.",
    "En conséquence, la Coalition internationale des organisations de défense des droits de l'homme appelle le Conseil des droits de l'homme des Nations Unies et la Mission internationale indépendante d'établissement des faits pour le Soudan à ouvrir une enquête urgente et indépendante sur cet incident. Cette enquête doit porter sur les violations commises contre les femmes d'Al-Saada Al-Douma, sur la responsabilité de la Force conjointe et des commandants militaires concernés, et examiner le rôle du discours de haine et de la propagande de guerre dans l'incitation à de telles pratiques ou leur encouragement.",
    "En outre, la Coalition souligne l'urgence d'assurer la protection des femmes rurales dans tout le Kordofan et le Darfour, de garantir la sûreté et la sécurité des victimes et des témoins, et de demander des comptes à toutes les personnes reconnues responsables d'avoir commis, ordonné ou dissimulé ces violations.",
    "La dignité des femmes soudanaises n'est pas un butin de guerre, et les femmes ne sauraient être réduites à des marchandises ni instrumentalisées comme des armes pour humilier des communautés. Tout commandement militaire qui permet ou tolère de telles pratiques doit en répondre pleinement conformément au droit international.",
  ],
};

const SIGN = {
  en: `**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**\n\nAdvancing Human Rights • Peace • Justice\n\nBrussels, 17 November 2026`,
  ar: `**التحالف الدولي لمنظمات حقوق الإنسان**\n\nالنهوض بحقوق الإنسان • السلام • العدالة\n\nبروكسل، 17 نوفمبر 2026`,
  fr: `**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**\n\nPromouvoir les droits de l'homme • La paix • La justice\n\nBruxelles, 17 novembre 2026`,
};
const VIDEO_LINE = {
  en: `[Watch the video on the Coalition's YouTube channel](${VIDEO_URL}).`,
  ar: `[شاهد الفيديو على قناة التحالف على يوتيوب](${VIDEO_URL}).`,
  fr: `[Voir la vidéo sur la chaîne YouTube de la Coalition](${VIDEO_URL}).`,
};
const body = (l) => [...PARAS[l], VIDEO_LINE[l], '---', SIGN[l]].join('\n\n');

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-17',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title:
        'Statement of Condemnation Regarding Violations Committed by the Sudanese Armed Forces-Affiliated Joint Force Against Women in Al-Saada Al-Douma, Kordofan',
      excerpt:
        'The Coalition condemns the reported violations against women in Al-Saada Al-Douma, Dar Hamar, Kordofan, after the entry of the SAF-allied Joint Force, and calls on the UN Human Rights Council and the Fact-Finding Mission to investigate urgently.',
      body: body('en'),
      location: 'Brussels',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان إدانة للانتهاكات التي ارتكبتها القوة المشتركة المتحالفة مع القوات المسلحة السودانية بحق النساء في السعادة الدومة بكردفان',
      excerpt:
        'يدين التحالف الانتهاكات المُبلَّغ عنها بحق النساء في السعادة الدومة بدار حمر في كردفان عقب دخول القوة المشتركة المتحالفة مع القوات المسلحة السودانية، ويدعو مجلس حقوق الإنسان وبعثة تقصي الحقائق إلى تحقيق عاجل.',
      body: body('ar'),
      location: 'بروكسل',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "Déclaration de condamnation des violations commises par la Force conjointe alliée aux Forces armées soudanaises contre des femmes à Al-Saada Al-Douma, au Kordofan",
      excerpt:
        "La Coalition condamne les violations signalées contre des femmes à Al-Saada Al-Douma, à Dar Hamar (Kordofan), après l'entrée de la Force conjointe alliée aux FAS, et appelle le Conseil des droits de l'homme et la Mission d'établissement des faits à enquêter d'urgence.",
      body: body('fr'),
      location: 'Bruxelles',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: client-style photo card in natural colour; the band is the client's still (press/NOV/7,
// uncommitted), built to 1600 x 900 in press/NOV/7/al-saada-band.jpg.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/7/al-saada-band.jpg', tone: 'natural' };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Condemns the reported violations against women in Al‑Saada Al‑Douma, Kordofan',
    dateline: 'BRUSSELS',
    date: 'Date: 17 November 2026',
    lead: 'The Coalition calls on the UN Human Rights Council and the Fact-Finding Mission for the Sudan to investigate the Joint Force, its commanders and the role of hate speech.',
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يدين الانتهاكات المُبلَّغ عنها بحق النساء في السعادة الدومة بكردفان',
    dateline: 'بروكسل',
    date: 'التاريخ: 17 نوفمبر 2026',
    lead: 'يدعو التحالف مجلس حقوق الإنسان وبعثة تقصي الحقائق بشأن السودان إلى التحقيق مع القوة المشتركة وقادتها وفي دور خطاب الكراهية.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: 'condamne les violations signalées contre des femmes à Al‑Saada Al‑Douma, au Kordofan',
    dateline: 'BRUXELLES',
    date: 'Date : 17 novembre 2026',
    lead: "La Coalition appelle le Conseil des droits de l'homme et la Mission d'établissement des faits pour le Soudan à enquêter sur la Force conjointe, ses commandants et le rôle du discours de haine.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
