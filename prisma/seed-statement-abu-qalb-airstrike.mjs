// Statement, Paris, 15 November 2026 — "Statement of Condemnation and Denunciation": the
// airstrike on civilians in Abu Qalb, Kordofan.
// Source: press/NOV/8/ (notes.rtf, the client's text, received 18 November 2026) and the
// Coalition's YouTube Short 6DrASK2S4C0, which this statement accompanies on /media
// (src/data/videos.ts, slug abu-qalb-airstrike-kordofan-2026).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-abu-qalb-airstrike.mjs
//               node --env-file=.env.local prisma/seed-statement-abu-qalb-airstrike.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-abu-qalb-airstrike.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-abu-qalb-airstrike.mjs
//
// Covers: FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-abu-qalb-airstrike.mjs
// Variants: FORCE=1 node scripts/gen-image-variants.mjs airstrike-civilians-abu-qalb-kordofan-november-2026
//
// EDITORIAL NOTES (18 November 2026):
//  - The client's text, published verbatim in substance (owner's choice). Copy-edit only:
//    "The International Coalition (ICHRO), Condemns" -> "condemns"; a comma splice in the last
//    paragraph -> semicolon; zero-width and stray spaces removed; line-broken paragraphs split.
//  - ATTRIBUTION, owner's choice: kept as the client wrote it. The text attributes the strike to
//    the SAF air force "based on eyewitness testimonies"; keep that phrase in every language.
//    AFP (16 November 2026) reported an army drone strike on Abu Qalb, West Kordofan, on
//    15 November, killing 15 people, citing the Kordofan Observatory.
//  - Title follows the client's YouTube title. Dateline Paris, 15 November 2026, as written.
//  - IMAGES, at the client's request: the band is a still taken from the video (press/NOV/8,
//    uncommitted), in natural colour. The /media poster is the English cover card.
//  - Contact lines dropped (site footer; non-BMP emoji). AR and FR are our translations.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'airstrike-civilians-abu-qalb-kordofan-november-2026';
// Generated once, 18 November 2026. Never regenerate.
export const TRANSLATION_KEY = '046e6b2b-89c4-43b6-ad0a-67f02b87d58a';
export const VIDEO_URL = 'https://www.youtube.com/shorts/6DrASK2S4C0';

// The statement paragraphs, shared with the /media entry (src/data/videos.ts) — change both.
export const PARAS = {
  en: [
    "The International Coalition of Human Rights Organizations (ICHRO) condemns in the strongest terms the massacre committed by the Sudanese Armed Forces (SAF) air force against unarmed civilians in the Abu Qalb area of the Kordofan region, based on eyewitness testimonies confirming the military's responsibility for the airstrike.",
    'Video footage reveals fires, widespread destruction amid residential areas, and harrowing scenes reflecting the gravity of the atrocities suffered by the local population.',
    'The Coalition and its member organizations express profound outrage over the deliberate targeting of civilians in rural villages and demand full accountability for the military leadership, led by Abdel Fattah al-Burhan, as well as a thorough investigation into the role of the Islamic Movement in these violations.',
    'The Coalition issues an urgent appeal to the Independent International Fact-Finding Mission for the Sudan to investigate the Abu Qalb massacre, hear testimonies from survivors and witnesses and establish the criminal responsibility of both the direct perpetrators and those who issued the orders.',
    'The Coalition will submit all available visual documentation and eyewitness accounts to the Mission to support the documentation of the crime, preserve evidence and ensure the prosecution of those responsible.',
    'The Coalition calls upon the United Nations and international human rights bodies to take immediate action to protect civilians, halt attacks on villages and residential areas and guarantee unhindered humanitarian and medical access. The ongoing killing and terrorizing of civilians require decisive measures that go beyond mere expressions of concern; there can be no genuine protection without accountability, and the victims must not be abandoned in the face of such violence.',
  ],
  ar: [
    'يدين التحالف الدولي لمنظمات حقوق الإنسان (ICHRO) بأشد العبارات المجزرة التي ارتكبها سلاح الجو التابع للقوات المسلحة السودانية بحق مدنيين عُزّل في منطقة أبو قلب بإقليم كردفان، استنادًا إلى شهادات شهود عيان تؤكد مسؤولية الجيش عن الغارة الجوية.',
    'ويُظهر مقطع الفيديو حرائق ودمارًا واسعًا وسط المناطق السكنية، ومشاهد مروّعة تعكس فداحة الفظائع التي تعرّض لها السكان المحليون.',
    'ويعرب التحالف والمنظمات الأعضاء فيه عن بالغ غضبهم إزاء الاستهداف المتعمّد للمدنيين في القرى الريفية، ويطالبون بالمساءلة الكاملة للقيادة العسكرية بقيادة عبد الفتاح البرهان، وبتحقيق شامل في دور الحركة الإسلامية في هذه الانتهاكات.',
    'ويوجّه التحالف نداءً عاجلًا إلى البعثة الدولية المستقلة لتقصي الحقائق بشأن السودان للتحقيق في مجزرة أبو قلب، والاستماع إلى شهادات الناجين والشهود، وتحديد المسؤولية الجنائية لكلٍّ من الجناة المباشرين ومن أصدروا الأوامر.',
    'وسيقدّم التحالف إلى البعثة جميع ما يتوفر من توثيق مصوّر وشهادات شهود العيان، دعمًا لتوثيق الجريمة وحفظ الأدلة وضمان ملاحقة المسؤولين عنها.',
    'ويدعو التحالف الأمم المتحدة والهيئات الدولية لحقوق الإنسان إلى اتخاذ إجراءات فورية لحماية المدنيين، ووقف الهجمات على القرى والمناطق السكنية، وضمان وصول المساعدات الإنسانية والطبية دون عوائق. إن استمرار قتل المدنيين وترويعهم يستوجب تدابير حاسمة تتجاوز مجرد التعبير عن القلق؛ فلا حماية حقيقية دون مساءلة، ولا يجوز التخلي عن الضحايا في مواجهة هذا العنف.',
  ],
  fr: [
    "La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) condamne dans les termes les plus fermes le massacre commis par l'armée de l'air des Forces armées soudanaises (FAS) contre des civils non armés dans la zone d'Abou Qalb, dans la région du Kordofan, sur la foi de témoignages oculaires confirmant la responsabilité de l'armée dans la frappe aérienne.",
    "Les images vidéo montrent des incendies, des destructions étendues au milieu des zones d'habitation et des scènes déchirantes qui reflètent la gravité des atrocités subies par la population locale.",
    "La Coalition et ses organisations membres expriment leur profonde indignation face au ciblage délibéré de civils dans des villages ruraux et exigent que la direction militaire, conduite par Abdel Fattah al-Burhan, réponde pleinement de ses actes, ainsi qu'une enquête approfondie sur le rôle du Mouvement islamique dans ces violations.",
    "La Coalition lance un appel urgent à la Mission internationale indépendante d'établissement des faits pour le Soudan afin qu'elle enquête sur le massacre d'Abou Qalb, entende les témoignages des survivants et des témoins et établisse la responsabilité pénale tant des auteurs directs que de ceux qui ont donné les ordres.",
    "La Coalition transmettra à la Mission l'ensemble de la documentation visuelle et des témoignages oculaires disponibles, afin de contribuer à documenter le crime, à préserver les preuves et à garantir la poursuite des responsables.",
    "La Coalition appelle les Nations unies et les organes internationaux de défense des droits de l'homme à agir immédiatement pour protéger les civils, mettre fin aux attaques contre les villages et les zones d'habitation et garantir un accès humanitaire et médical sans entrave. La poursuite des meurtres et de la terreur infligée aux civils exige des mesures décisives qui aillent au-delà de simples expressions de préoccupation ; il ne peut y avoir de protection réelle sans reddition de comptes, et les victimes ne doivent pas être abandonnées face à une telle violence.",
  ],
};

const SIGN = {
  en: `**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**\n\nAdvancing Human Rights • Peace • Justice\n\nParis, 15 November 2026`,
  ar: `**التحالف الدولي لمنظمات حقوق الإنسان**\n\nالنهوض بحقوق الإنسان • السلام • العدالة\n\nباريس، 15 نوفمبر 2026`,
  fr: `**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**\n\nPromouvoir les droits de l'homme • La paix • La justice\n\nParis, 15 novembre 2026`,
};
const VIDEO_LINE = {
  en: `[Watch the video on the Coalition's YouTube channel](${VIDEO_URL}).`,
  ar: `[شاهد الفيديو على قناة التحالف على يوتيوب](${VIDEO_URL}).`,
  fr: `[Voir la vidéo sur la chaîne YouTube de la Coalition](${VIDEO_URL}).`,
};
const body = (l) => [...PARAS[l], VIDEO_LINE[l], '---', SIGN[l]].join('\n\n');

export const EXCERPTS = {
  en: 'Citing eyewitness testimonies, the Coalition condemns the SAF airstrike on unarmed civilians in Abu Qalb, Kordofan, and appeals to the UN Fact-Finding Mission for the Sudan to investigate and establish criminal responsibility.',
  ar: 'استنادًا إلى شهادات شهود عيان، يدين التحالف الغارة الجوية للقوات المسلحة السودانية على مدنيين عُزّل في أبو قلب بكردفان، ويناشد بعثة تقصي الحقائق بشأن السودان التحقيق وتحديد المسؤولية الجنائية.',
  fr: "Sur la foi de témoignages oculaires, la Coalition condamne la frappe aérienne des FAS contre des civils non armés à Abou Qalb, au Kordofan, et appelle la Mission d'établissement des faits pour le Soudan à enquêter et à établir les responsabilités pénales.",
};

export const TITLES = {
  en: 'ICHRO Condemns the Airstrike on Civilians in Abu Qalb, Kordofan, Sudan',
  ar: 'التحالف الدولي لمنظمات حقوق الإنسان يدين الغارة الجوية على المدنيين في أبو قلب بكردفان، السودان',
  fr: "L'ICHRO condamne la frappe aérienne contre des civils à Abou Qalb, au Kordofan (Soudan)",
};

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-11-15',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title: TITLES.en,
      excerpt: EXCERPTS.en,
      body: body('en'),
      location: 'Paris',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: TITLES.ar,
      excerpt: EXCERPTS.ar,
      body: body('ar'),
      location: 'باريس',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: TITLES.fr,
      excerpt: EXCERPTS.fr,
      body: body('fr'),
      location: 'Paris',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover: photo card in natural colour; the band is a still from the client's video (press/NOV/8,
// uncommitted), built to 1600 x 900 in press/NOV/8/abu-qalb-band.jpg.
export const PHOTO_CARD_BAND = { photo: 'press/NOV/8/abu-qalb-band.jpg', tone: 'natural' };

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Condemns the airstrike on civilians in Abu Qalb, Kordofan',
    dateline: 'PARIS',
    date: 'Date: 15 November 2026',
    lead: 'The Coalition appeals to the UN Fact-Finding Mission for the Sudan to investigate, hear survivors and witnesses, and establish criminal responsibility.',
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    label: 'بيان',
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    headline: 'يدين الغارة الجوية على المدنيين في أبو قلب بكردفان',
    dateline: 'باريس',
    date: 'التاريخ: 15 نوفمبر 2026',
    lead: 'يناشد التحالف بعثة تقصي الحقائق بشأن السودان التحقيق والاستماع إلى الناجين والشهود وتحديد المسؤولية الجنائية.',
  },
  fr: {
    file: 'cover-fr.jpg',
    label: 'DÉCLARATION',
    org: "La Coalition internationale des organisations de défense des droits de l'homme",
    headline: 'condamne la frappe aérienne contre des civils à Abou Qalb, au Kordofan',
    dateline: 'PARIS',
    date: 'Date : 15 novembre 2026',
    lead: "La Coalition appelle la Mission d'établissement des faits pour le Soudan à enquêter, à entendre survivants et témoins et à établir les responsabilités pénales.",
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
