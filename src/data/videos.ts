// The video registry for /media.
//
// WHY A FILE AND NOT THE DATABASE: per docs/engineering/handbook.md, `prisma migrate deploy` is a silent
// no-op in this repo, TCP 5432 to Neon is blocked locally, and every schema change is a
// hand-written idempotent HTTPS script. None of that risk buys anything for a handful of
// rows that change monthly. Revisit at ~20 videos, or the first time a non-developer
// needs to publish one without a deploy.
//
// TO ADD A VIDEO: `node scripts/add-video.mjs <youtube-url>` — it extracts the ID, reads
// the real duration and upload date off the watch page, downloads the poster, generates
// the responsive variants and prints an entry to paste below. Then translate the three
// strings per locale. src/lib/videos.test.ts fails the build if anything is missing.
//
// One slug serves all three locales (/media/x, /ar/media/x, /fr/media/x), matching how
// Post already works — so the hreflang alternates are a 1:1 map with no lookup.

import type { Locale } from '@/i18n';

/** Playlists double as the filter facet on /media. Labels live in the i18n dicts under
 *  `media.playlists`; videos.test.ts asserts every id has a label in all three. */
export const PLAYLISTS = ['statements-2026', 'geneva-panel-2026', 'advocacy-2025'] as const;
export type PlaylistId = (typeof PLAYLISTS)[number];

export interface VideoCopy {
  /** A clean site headline — NOT the YouTube title, which is truncated and
   *  speaker-first. The speaker belongs in `speaker`. */
  title: string;
  /** Byline: "Name · Affiliation", or a description of the segment. */
  speaker: string;
  /** Dateline place, IN THIS LANGUAGE — "Geneva" / "جنيف" / "Genève". It lives here
   *  rather than on Video because a shared string rendered Latin "GENEVA" into the
   *  Arabic dateline, where every existing article says جنيف. */
  location?: string;
  /** 1–3 sentences. Also the meta description and the JSON-LD `description`. */
  summary: string;
  /** Optional full text of the statement the video accompanies, rendered on the detail page
   *  in place of the summary. A string is a paragraph; `{ lead, items }` is an introductory
   *  sentence followed by a bulleted list. Set it in all three locales or none, with the same
   *  block structure — videos.test.ts enforces both. */
  statement?: StatementBlock[];
  /** Sign-off under the statement, e.g. the organisation's name. Requires `statement`. */
  signOff?: string;
}

export type StatementBlock = string | { lead: string; items: string[] };

export interface Video {
  /** Shared across all three locales. Lowercase kebab-case. */
  slug: string;
  /** The 11-character YouTube ID. Extracted by the script, never retyped. */
  youtubeId: string;
  /** When it was published to YouTube (UTC). Schema.org `uploadDate`. */
  uploadDate: string;
  /** When the footage was recorded — what the reader actually cares about, and what
   *  the Dateline shows. Distinct from uploadDate: the Geneva panel was held on
   *  25 August and uploaded on the 29th. */
  eventDate: string;
  /** THE only duration field. Every format is derived in src/lib/duration.ts. */
  durationSeconds: number;
  playlist: PlaylistId;
  /** Site-absolute path under /media/<slug>/. Must have responsive variants. */
  poster: string;
  /** Slug of the related newsroom article, if any. Shared across locales. */
  relatedPostSlug?: string;
  /** Omit for a live video. `false` keeps the entry — copy, poster and manifest all stay
   *  validated by videos.test.ts — but hides it from /media, the homepage and the sitemap,
   *  and 404s its detail page. Delete the line to re-list it; nothing else is needed. */
  published?: boolean;
  /** Portrait (9:16) source — a YouTube Short. The detail player renders 9:16 instead of
   *  16:9, and videos.test.ts requires the poster to be portrait too. Omit for landscape. */
  vertical?: boolean;
  i18n: Record<Locale, VideoCopy>;
}

// The Geneva panel — "Women's Condition and Violence in Wartime: Focus on the Sudan
// Crisis", Club Suisse de la Presse, 25 August 2026. Jointly organised by ICHR, EADM,
// TYFA and Post Versa. Arabic name and venue forms are taken verbatim from the existing
// Arabic articles (عبد الرحيم قرين, آندي فيرمو, رامون راهانغميتان, النادي السويسري
// للصحافة) so the site never spells the same person two ways.
//
// THE EIGHT ENTRIES BELOW ARE CURRENTLY UNLISTED (`published: false`), at the client's request on
// 31 August 2026, pending a new batch of videos. Nothing has been deleted: the copy, posters,
// responsive variants and manifest entries are all still here and still test-validated, so
// re-listing a video is exactly one deleted line.
const VIDEOS: Video[] = [
  // Andy Vermaut's appeal on the North Wadi airstrike, a Short uploaded 14 October 2026. The
  // recording date is not stated, so eventDate is the upload date. His title here is the one
  // the client supplied for this video (member of the Coalition, Ambassador of the European
  // Climate Pact); the Geneva-panel entries below keep the affiliation he gave there. The
  // client's note says "Egyptian army" and the copy follows it in all three languages (the
  // statement article says "air force"), attributed to the Coalition. Arabic name آندي فيرمو, as on the
  // Geneva entries. No location: the client gave none.
  {
    slug: 'andy-vermaut-north-wadi-petition-2026',
    youtubeId: 'IIo3d_Cz5Y4',
    uploadDate: '2026-10-14',
    eventDate: '2026-10-14',
    durationSeconds: 175,
    playlist: 'statements-2026',
    poster: '/media/andy-vermaut-north-wadi-petition-2026/poster.jpg',
    relatedPostSlug: 'condemnation-airstrike-miners-north-wadi-october-2026',
    vertical: true,
    i18n: {
      en: {
        title: 'Andy Vermaut Calls for Justice for the Sudanese Miners Killed in North Wadi',
        speaker:
          'Andy Vermaut · Member, International Coalition for Human Rights; Ambassador of the European Climate Pact',
        summary:
          'Andy Vermaut speaks on the airstrike of 10 October 2026 that killed Sudanese miners in the North Wadi region, which the Coalition attributes to the Egyptian army. He calls on human rights organisations, African organisations in particular, to sign the Coalition’s joint petition for truth, justice and accountability for the civilian victims and their families.',
      },
      ar: {
        title: 'آندي فيرمو يطالب بالعدالة للمعدّنين السودانيين الذين قُتلوا في وادي الشمال',
        speaker: 'آندي فيرمو · عضو التحالف الدولي لحقوق الإنسان، وسفير الميثاق الأوروبي للمناخ',
        summary:
          'يتحدث آندي فيرمو عن الغارة الجوية التي استهدفت المعدّنين السودانيين في منطقة وادي الشمال في 10 أكتوبر 2026، والتي يحمّل التحالف الجيش المصري مسؤوليتها. ويدعو منظمات حقوق الإنسان، ولا سيما المنظمات الأفريقية، إلى التوقيع على العريضة المشتركة للتحالف من أجل الحقيقة والعدالة والمساءلة للضحايا المدنيين وأسرهم.',
      },
      fr: {
        title: 'Andy Vermaut demande justice pour les mineurs soudanais tués à North Wadi',
        speaker:
          'Andy Vermaut · membre de la Coalition internationale pour les droits de l’homme ; ambassadeur du Pacte européen pour le climat',
        summary:
          'Andy Vermaut revient sur la frappe aérienne du 10 octobre 2026 qui a tué des mineurs soudanais dans la région de North Wadi, et que la Coalition attribue à l’armée égyptienne. Il appelle les organisations de défense des droits humains, en particulier africaines, à signer la pétition commune de la Coalition pour la vérité, la justice et l’établissement des responsabilités en faveur des victimes civiles et de leurs familles.',
      },
    },
  },
  // Statement of condemnation, Brussels, 12 October 2026: the airstrike of 10 October on
  // Sudanese miners in the North Wadi region. A Short, so `vertical`. The filming date is not
  // known, so eventDate is the statement's date rather than the strike's. The attribution to
  // the Egyptian air force is the Coalition's own, worded as such, and was approved for
  // publication by the client on 14 October 2026. The poster is YouTube's portrait `oar2`
  // frame (the standard thumbnails for a Short are letterboxed 4:3), upscaled to 720px wide
  // so the variant pipeline produces a srcset.
  {
    slug: 'sudan-miners-airstrike-north-wadi-2026',
    youtubeId: 'nOMTA-D4szk',
    uploadDate: '2026-10-14',
    eventDate: '2026-10-12',
    durationSeconds: 104,
    playlist: 'statements-2026',
    poster: '/media/sudan-miners-airstrike-north-wadi-2026/poster.jpg',
    relatedPostSlug: 'condemnation-airstrike-miners-north-wadi-october-2026',
    vertical: true,
    i18n: {
      en: {
        title: 'ICHR Condemns the Airstrike on Sudanese Miners in North Wadi',
        speaker: 'International Coalition for Human Rights (ICHR)',
        location: 'Brussels',
        summary:
          'The International Coalition for Human Rights (ICHR) condemns the airstrike of 10 October 2026 on Sudanese miners in the North Wadi region, which according to information received by the Coalition killed more than one hundred civilians. The Coalition attributes the attack to the Egyptian air force and calls for an urgent, independent international investigation, accountability and justice for the victims’ families. Footage received by the Coalition.',
        statement: [
          'The International Coalition for Human Rights (ICHR) strongly condemns the airstrike that targeted Sudanese miners in the North Wadi region on 10 October 2026.',
          'According to information received by the Coalition, more than one hundred civilians were killed. They were working to earn a living. They leave behind bereaved families, and many of the injured are in urgent need of medical care.',
          'The Coalition attributes the attack to the Egyptian air force, which struck the site inside Sudanese territory. Targeting civilians is a grave violation of international humanitarian law. Allegations of mining or smuggling can never justify bombarding civilians or stripping them of the protection the law guarantees.',
          {
            lead: 'The Coalition calls for:',
            items: [
              'an urgent, independent international investigation to establish responsibility, document the casualties and preserve evidence;',
              'accountability for those responsible, and justice for the victims’ families;',
              'protection for witnesses, and unimpeded access for investigators and relief teams;',
              'prompt medical treatment for the injured.',
            ],
          },
          'The Coalition urges the United Nations, the African Union, the European Union and international human rights organisations to act without delay: to condemn the targeting of civilians, to press for an end to these attacks and to guarantee that they are not repeated. It invites human rights organisations to join a joint petition for truth, justice and accountability, and to carry the voices of the victims’ families to the international community.',
          'The killing of civilians can never be justified, nor treated as a passing news item. The victims and their families have a right to truth and redress, and the international community must act.',
        ],
        signOff: 'International Coalition for Human Rights (ICHR)',
      },
      ar: {
        title:
          'التحالف الدولي لحقوق الإنسان يدين الغارة الجوية على المعدّنين السودانيين في منطقة وادي الشمال',
        speaker: 'التحالف الدولي لحقوق الإنسان',
        location: 'بروكسل',
        summary:
          'يدين التحالف الدولي لحقوق الإنسان الغارة الجوية التي استهدفت المعدّنين السودانيين في منطقة وادي الشمال في 10 أكتوبر 2026، والتي أودت، وفق المعلومات الواردة إلى التحالف، بحياة أكثر من مئة مدني. ويحمّل التحالف سلاح الجو المصري مسؤولية الهجوم، ويطالب بتحقيق دولي مستقل وعاجل، وبالمساءلة وإنصاف أسر الضحايا. لقطات وردت إلى التحالف.',
        statement: [
          'يدين التحالف الدولي لحقوق الإنسان بشدة الغارة الجوية التي استهدفت المعدّنين السودانيين في منطقة وادي الشمال في 10 أكتوبر 2026.',
          'ووفق المعلومات الواردة إلى التحالف، تجاوز عدد القتلى مئة مدني كانوا يعملون لكسب أرزاقهم، وخلّفوا وراءهم أسرًا مكلومة وجرحى في حاجة ماسّة إلى الرعاية الطبية.',
          'ويحمّل التحالف سلاح الجو المصري مسؤولية الهجوم، إذ قصف الموقع داخل الأراضي السودانية. إن استهداف المدنيين انتهاك جسيم لقواعد القانون الدولي الإنساني، ولا يمكن لادعاءات التعدين أو التهريب أن تبرّر قصف المدنيين أو حرمانهم من الحماية التي يكفلها القانون.',
          {
            lead: 'ويطالب التحالف بما يلي:',
            items: [
              'إجراء تحقيق دولي مستقل وعاجل لتحديد المسؤوليات وتوثيق أعداد الضحايا وحفظ الأدلة؛',
              'محاسبة المسؤولين وتحقيق العدالة لأسر الضحايا؛',
              'حماية الشهود، وتيسير وصول فرق التحقيق والإغاثة دون عوائق؛',
              'تقديم العلاج الطبي العاجل للجرحى.',
            ],
          },
          'ويحثّ التحالف الأمم المتحدة والاتحاد الأفريقي والاتحاد الأوروبي والمنظمات الدولية لحقوق الإنسان على التحرك الفوري لإدانة استهداف المدنيين، والضغط لوقف هذه الهجمات، وضمان عدم تكرارها. كما يدعو منظمات حقوق الإنسان إلى الانضمام إلى عريضة مشتركة تطالب بالحقيقة والعدالة والمساءلة، وإلى إيصال أصوات أسر الضحايا إلى المجتمع الدولي.',
          'إن قتل المدنيين لا يمكن تبريره، ولا التعامل معه كخبر عابر. للضحايا وأسرهم الحق في الحقيقة والإنصاف، وعلى المجتمع الدولي أن يتحرك.',
        ],
        signOff: 'التحالف الدولي لحقوق الإنسان',
      },
      fr: {
        title: 'L’ICHR condamne la frappe aérienne contre des mineurs soudanais dans la région de North Wadi',
        speaker: 'Coalition internationale pour les droits de l’homme (ICHR)',
        location: 'Bruxelles',
        summary:
          'La Coalition internationale pour les droits de l’homme (ICHR) condamne la frappe aérienne du 10 octobre 2026 contre des mineurs soudanais dans la région de North Wadi, qui, selon les informations reçues par la Coalition, a tué plus de cent civils. La Coalition attribue l’attaque à l’armée de l’air égyptienne et demande une enquête internationale indépendante et urgente, l’établissement des responsabilités et la justice pour les familles des victimes. Images reçues par la Coalition.',
        statement: [
          'La Coalition internationale pour les droits de l’homme (ICHR) condamne fermement la frappe aérienne qui a visé des mineurs soudanais dans la région de North Wadi le 10 octobre 2026.',
          'Selon les informations reçues par la Coalition, plus de cent civils ont été tués. Ils travaillaient pour gagner leur vie. Ils laissent derrière eux des familles endeuillées, et de nombreux blessés ont un besoin urgent de soins médicaux.',
          'La Coalition attribue l’attaque à l’armée de l’air égyptienne, qui a frappé le site en territoire soudanais. Prendre des civils pour cible constitue une violation grave du droit international humanitaire. Des allégations d’activité minière ou de contrebande ne sauraient en aucun cas justifier le bombardement de civils ni les priver de la protection que leur garantit le droit.',
          {
            lead: 'La Coalition demande :',
            items: [
              'une enquête internationale indépendante et urgente pour établir les responsabilités, recenser les victimes et préserver les preuves ;',
              'que les responsables rendent des comptes, et que justice soit rendue aux familles des victimes ;',
              'la protection des témoins et un accès sans entrave pour les équipes d’enquête et de secours ;',
              'une prise en charge médicale rapide des blessés.',
            ],
          },
          'La Coalition exhorte les Nations unies, l’Union africaine, l’Union européenne et les organisations internationales de défense des droits humains à agir sans délai : condamner les attaques contre les civils, obtenir leur arrêt et garantir qu’elles ne se reproduiront pas. Elle invite les organisations de défense des droits humains à se joindre à une pétition commune pour la vérité, la justice et l’établissement des responsabilités, et à porter la voix des familles des victimes auprès de la communauté internationale.',
          'Le meurtre de civils ne peut être ni justifié ni traité comme un simple fait divers. Les victimes et leurs familles ont droit à la vérité et à réparation, et la communauté internationale doit agir.',
        ],
        signOff: 'Coalition internationale pour les droits de l’homme (ICHR)',
      },
    },
  },
  {
    slug: 'panel-final-statements-geneva-2026',
    youtubeId: 'KzzbAruFHWk',
    uploadDate: '2026-08-30',
    eventDate: '2026-08-25',
    durationSeconds: 292,
    playlist: 'geneva-panel-2026',
    poster: '/media/panel-final-statements-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'Final Statements: Justice, War Crimes and Women in Sudan',
        speaker: 'Closing remarks · Club Suisse de la Presse, Geneva',
        location: 'Geneva',
        summary:
          'Closing remarks and debate from the international civil society panel on women’s condition and violence in wartime, with concluding statements by Manel Msalmi, Abdelrahim Grein, Dr Mohamed Ali, Andy Vermaut and Elisabeth Saba. The speakers called for immediate international intervention, protection of journalists and civilians, ICC prosecution without immunity, and an urgent ceasefire.',
      },
      ar: {
        title: 'البيانات الختامية: العدالة وجرائم الحرب والنساء في السودان',
        speaker: 'الكلمات الختامية · النادي السويسري للصحافة، جنيف',
        location: 'جنيف',
        summary:
          'الملاحظات الختامية والنقاش في ندوة المجتمع المدني الدولية حول أوضاع النساء والعنف في زمن الحرب، مع كلمات ختامية لمنال مسلمي وعبد الرحيم قرين والدكتور محمد علي وآندي فيرمو وإليزابيث سابا. دعا المتحدثون إلى تدخل دولي فوري، وحماية الصحفيين والمدنيين، وملاحقة الجناة أمام المحكمة الجنائية الدولية دون حصانة، ووقف عاجل لإطلاق النار.',
      },
      fr: {
        title: 'Déclarations finales : justice, crimes de guerre et femmes au Soudan',
        speaker: 'Remarques de clôture · Club Suisse de la Presse, Genève',
        location: 'Genève',
        summary:
          'Remarques de clôture et débat du panel international de la société civile sur la condition des femmes et les violences en temps de guerre, avec les déclarations finales de Manel Msalmi, Abdelrahim Grein, du Dr Mohamed Ali, d’Andy Vermaut et d’Elisabeth Saba. Les intervenants ont appelé à une intervention internationale immédiate, à la protection des journalistes et des civils, à des poursuites devant la CPI sans immunité et à un cessez-le-feu urgent.',
      },
    },
  },
  {
    slug: 'abdelrahim-grein-icc-accountability-geneva-2026',
    youtubeId: 'dPDFlbBOr-I',
    uploadDate: '2026-08-29',
    eventDate: '2026-08-25',
    durationSeconds: 856,
    playlist: 'geneva-panel-2026',
    poster: '/media/abdelrahim-grein-icc-accountability-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'Violations Against Women and ICC Accountability in Sudan',
        speaker: 'Abdelrahim Grein · International Coalition for Human Rights',
        location: 'Geneva',
        summary:
          'Evidence of systematic human rights abuses in Sudan, with a call for an independent OPCW investigation, an ICC referral without immunity, the protection of civilians, and the direct inclusion of Sudanese women in every peace process.',
      },
      ar: {
        title: 'الانتهاكات ضد النساء والمساءلة أمام المحكمة الجنائية الدولية في السودان',
        speaker: 'عبد الرحيم قرين · التحالف الدولي لحقوق الإنسان',
        location: 'جنيف',
        summary:
          'عرض لأدلة على انتهاكات منهجية لحقوق الإنسان في السودان، مع الدعوة إلى تحقيق مستقل تجريه منظمة حظر الأسلحة الكيميائية، وإحالة إلى المحكمة الجنائية الدولية دون حصانة، وحماية المدنيين، وإشراك النساء السودانيات إشراكًا مباشرًا في كل مسارات السلام.',
      },
      fr: {
        title: 'Violations contre les femmes et responsabilité devant la CPI au Soudan',
        speaker: 'Abdelrahim Grein · Coalition internationale pour les droits de l’homme',
        location: 'Genève',
        summary:
          'Présentation de preuves de violations systématiques des droits humains au Soudan, avec un appel à une enquête indépendante de l’OIAC, à une saisine de la CPI sans immunité, à la protection des civils et à l’inclusion directe des femmes soudanaises dans tous les processus de paix.',
      },
    },
  },
  {
    slug: 'hiba-elwassilla-women-families-geneva-2026',
    youtubeId: '3WrVShqYa9Q',
    uploadDate: '2026-08-29',
    eventDate: '2026-08-25',
    durationSeconds: 589,
    playlist: 'geneva-panel-2026',
    poster: '/media/hiba-elwassilla-women-families-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'The Impact of the Sudan Conflict on Women and Families',
        speaker: 'Hiba Elwassilla · International Coalition for Human Rights',
        location: 'Geneva',
        summary:
          'The disproportionate toll of the conflict on Sudanese women and children — gender-based violence, the loss of healthcare and education, and widespread displacement — with a call for immediate international action and accountability before the ICC.',
      },
      ar: {
        title: 'أثر النزاع في السودان على النساء والأسر',
        speaker: 'هبة الوصيلة · التحالف الدولي لحقوق الإنسان',
        location: 'جنيف',
        summary:
          'الأثر غير المتناسب للنزاع على النساء والأطفال في السودان — من العنف القائم على النوع الاجتماعي، وفقدان الرعاية الصحية والتعليم، والنزوح الواسع — مع الدعوة إلى تحرك دولي فوري ومساءلة أمام المحكمة الجنائية الدولية.',
      },
      fr: {
        title: 'L’impact du conflit soudanais sur les femmes et les familles',
        speaker: 'Hiba Elwassilla · Coalition internationale pour les droits de l’homme',
        location: 'Genève',
        summary:
          'Le poids disproportionné du conflit sur les femmes et les enfants soudanais — violences fondées sur le genre, perte de l’accès aux soins et à l’éducation, déplacements massifs — avec un appel à une action internationale immédiate et à une responsabilité devant la CPI.',
      },
    },
  },
  {
    slug: 'andy-vermaut-icc-referral-geneva-2026',
    youtubeId: 'wORgNBFvnIs',
    uploadDate: '2026-08-29',
    eventDate: '2026-08-25',
    durationSeconds: 817,
    playlist: 'geneva-panel-2026',
    poster: '/media/andy-vermaut-icc-referral-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'Justice, ICC Referral and the Sudan Conflict',
        speaker: 'Andy Vermaut · Post Versa and EADM',
        location: 'Geneva',
        summary:
          'Systematic violations against civilians and women in Sudan, and the case for accountability through an ICC referral, an independent OPCW investigation, and the protection of essential infrastructure.',
      },
      ar: {
        title: 'العدالة والإحالة إلى المحكمة الجنائية الدولية والنزاع في السودان',
        speaker: 'آندي فيرمو · بوست فيرسا والرابطة الأوروبية للدفاع عن الأقليات',
        location: 'جنيف',
        summary:
          'الانتهاكات المنهجية ضد المدنيين والنساء في السودان، والحجة لصالح المساءلة عبر الإحالة إلى المحكمة الجنائية الدولية، وتحقيق مستقل تجريه منظمة حظر الأسلحة الكيميائية، وحماية البنية التحتية الأساسية.',
      },
      fr: {
        title: 'Justice, saisine de la CPI et conflit soudanais',
        speaker: 'Andy Vermaut · Post Versa et EADM',
        location: 'Genève',
        summary:
          'Les violations systématiques contre les civils et les femmes au Soudan, et les arguments en faveur d’une responsabilité par la saisine de la CPI, une enquête indépendante de l’OIAC et la protection des infrastructures essentielles.',
      },
    },
  },
  {
    slug: 'ramon-rahangmetan-gender-based-violence-geneva-2026',
    youtubeId: 's6zmoXIVuhI',
    uploadDate: '2026-08-29',
    eventDate: '2026-08-25',
    durationSeconds: 668,
    playlist: 'geneva-panel-2026',
    poster: '/media/ramon-rahangmetan-gender-based-violence-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'Gender-Based Violence and Justice in Sudan',
        speaker: 'Ramon Rahangmetan · Circle of Sustainable Europe',
        location: 'Geneva',
        summary:
          'Severe human rights violations against women in Sudan, and a call for accountability through an ICC referral, an independent OPCW investigation, and the active inclusion of women in all peace processes.',
      },
      ar: {
        title: 'العنف القائم على النوع الاجتماعي والعدالة في السودان',
        speaker: 'رامون راهانغميتان · دائرة أوروبا المستدامة',
        location: 'جنيف',
        summary:
          'انتهاكات جسيمة لحقوق الإنسان بحق النساء في السودان، ودعوة إلى المساءلة عبر الإحالة إلى المحكمة الجنائية الدولية، وتحقيق مستقل تجريه منظمة حظر الأسلحة الكيميائية، والإشراك الفاعل للنساء في جميع مسارات السلام.',
      },
      fr: {
        title: 'Violences fondées sur le genre et justice au Soudan',
        speaker: 'Ramon Rahangmetan · Circle of Sustainable Europe',
        location: 'Genève',
        summary:
          'De graves violations des droits humains à l’encontre des femmes au Soudan, et un appel à la responsabilité par la saisine de la CPI, une enquête indépendante de l’OIAC et l’inclusion active des femmes dans tous les processus de paix.',
      },
    },
  },
  {
    slug: 'mohamed-ali-violations-civilian-protection-geneva-2026',
    youtubeId: 'rqObnyqW52g',
    uploadDate: '2026-08-31',
    eventDate: '2026-08-25',
    durationSeconds: 801,
    playlist: 'geneva-panel-2026',
    poster: '/media/mohamed-ali-violations-civilian-protection-geneva-2026/poster.jpg',
    relatedPostSlug: 'civil-society-panel-women-sudan-geneva-august-2026',
    published: false,
    i18n: {
      en: {
        title: 'Human Rights Violations and Civilian Protection in Sudan',
        speaker: 'Dr. Mohamed Ali · International Coalition for Human Rights',
        location: 'Geneva',
        summary:
          'Key findings on human rights violations and the humanitarian deterioration in Sudan, with a call for an urgent ceasefire, the protection of civilians, and international accountability.',
      },
      ar: {
        title: 'انتهاكات حقوق الإنسان وحماية المدنيين في السودان',
        speaker: 'الدكتور محمد علي · التحالف الدولي لحقوق الإنسان',
        location: 'جنيف',
        summary:
          'أبرز النتائج المتعلقة بانتهاكات حقوق الإنسان والتدهور الإنساني في السودان، مع الدعوة إلى وقف فوري لإطلاق النار، وحماية المدنيين، والمساءلة الدولية.',
      },
      fr: {
        title: 'Violations des droits humains et protection des civils au Soudan',
        speaker: 'Dr Mohamed Ali · Coalition internationale pour les droits de l’homme',
        location: 'Genève',
        summary:
          'Les principaux constats sur les violations des droits humains et la dégradation humanitaire au Soudan, avec un appel à un cessez-le-feu immédiat, à la protection des civils et à la responsabilité internationale.',
      },
    },
  },
  // ---- Advocacy, 2025 ----
  // Deliberately NOT included from the channel: "Participation of the Peace in the joint
  // meeting…" (MkOllAEEwOo). Its description carries #UAE_supports_Sudan,
  // #UAE_welcomes_US_President and praise for a foundation "in the heart of the Emirates".
  // That is state-aligned political messaging, and publishing it here would undercut the
  // impartial-accountability position every other page on this site argues for. Decision
  // taken with the owner, 30 August 2026 — revisit only as a deliberate editorial choice.
  {
    slug: 'icj-stand-sudanese-civil-society-hague-2025',
    youtubeId: '5l9T6mcwwTk',
    uploadDate: '2025-07-25',
    eventDate: '2025-05-04',
    durationSeconds: 118,
    playlist: 'advocacy-2025',
    poster: '/media/icj-stand-sudanese-civil-society-hague-2025/poster.jpg',
    published: false,
    i18n: {
      en: {
        title: 'Outside the ICJ: Sudanese Civil Society Demands Justice',
        speaker: 'Delegation led by Abdelrahim Grein · Peace Palace, The Hague',
        location: 'The Hague',
        // "The delegation called for" — an attributed demand, not a statement of fact,
        // matching the hedging discipline the press statements already use.
        summary:
          'A Sudanese civil society delegation, led by Abdelrahim Grein Sadam, delivered a statement at the gates of the International Court of Justice on 4 May 2025. The delegation called for the Islamic Movement to be designated a terrorist organisation, for those responsible for atrocities in Sudan to be held accountable, and for concrete humanitarian, legal and diplomatic action to protect civilians.',
      },
      ar: {
        title: 'أمام محكمة العدل الدولية: المجتمع المدني السوداني يطالب بالعدالة',
        speaker: 'وفد بقيادة عبد الرحيم قرين · قصر السلام، لاهاي',
        location: 'لاهاي',
        summary:
          'وفد من المجتمع المدني السوداني، بقيادة عبد الرحيم قرين صدام، يدلي ببيان أمام بوابات محكمة العدل الدولية في 4 مايو 2025. دعا الوفد إلى تصنيف الحركة الإسلامية منظمةً إرهابية، ومحاسبة المسؤولين عن الفظائع في السودان، واتخاذ إجراءات إنسانية وقانونية ودبلوماسية ملموسة لحماية المدنيين.',
      },
      fr: {
        title: 'Devant la CIJ : la société civile soudanaise réclame justice',
        speaker: 'Délégation menée par Abdelrahim Grein · Palais de la Paix, La Haye',
        location: 'La Haye',
        summary:
          'Une délégation de la société civile soudanaise, menée par Abdelrahim Grein Sadam, a lu une déclaration devant les grilles de la Cour internationale de justice le 4 mai 2025. La délégation a demandé que le Mouvement islamique soit désigné organisation terroriste, que les responsables des atrocités au Soudan répondent de leurs actes, et que des mesures humanitaires, juridiques et diplomatiques concrètes protègent les civils.',
      },
    },
  },
  {
    slug: 'abdelrahim-grein-human-rights-2025',
    youtubeId: '51E407P1cNA',
    uploadDate: '2025-07-19',
    // No filming date is stated anywhere; the upload date is the only fact we have.
    eventDate: '2025-07-19',
    durationSeconds: 100,
    playlist: 'advocacy-2025',
    poster: '/media/abdelrahim-grein-human-rights-2025/poster.jpg',
    published: false,
    i18n: {
      en: {
        title: 'The Work of ICHR: Justice, Education and Dignity',
        speaker: 'Abdelrahim Grein Sadam · Founder, International Coalition for Human Rights',
        summary:
          'A short profile of the human rights work of Abdelrahim Grein Sadam, founder of the International Coalition for Human Rights — from advocacy for justice in Sudan to the defence of vulnerable communities, and a call for peace, education and dignity.',
      },
      ar: {
        title: 'عمل التحالف الدولي لحقوق الإنسان: العدالة والتعليم والكرامة',
        speaker: 'عبد الرحيم قرين صدام · مؤسس التحالف الدولي لحقوق الإنسان',
        summary:
          'لمحة قصيرة عن العمل الحقوقي لعبد الرحيم قرين صدام، مؤسس التحالف الدولي لحقوق الإنسان — من المناصرة من أجل العدالة في السودان إلى الدفاع عن المجتمعات الضعيفة، ودعوة إلى السلام والتعليم والكرامة.',
      },
      fr: {
        title: 'Le travail de l’ICHR : justice, éducation et dignité',
        speaker:
          'Abdelrahim Grein Sadam · fondateur de la Coalition internationale pour les droits de l’homme',
        summary:
          'Un court portrait du travail d’Abdelrahim Grein Sadam, fondateur de la Coalition internationale pour les droits de l’homme — de la défense de la justice au Soudan à la protection des communautés vulnérables, et un appel à la paix, à l’éducation et à la dignité.',
      },
    },
  },
];

/** Newest first, by the date the reader cares about (when it was recorded). */
function byDateDesc(a: Video, b: Video): number {
  return b.eventDate.localeCompare(a.eventDate) || b.uploadDate.localeCompare(a.uploadDate);
}

/** Every LISTED video, newest first, optionally narrowed to one playlist.
 *  `lang` is required so no call site can forget which language it is rendering. */
export function getVideos(lang: Locale, playlist?: PlaylistId | 'All'): Video[] {
  void lang; // copy is selected per-video by the caller; the parameter keeps that explicit
  const all = [...PUBLISHED_VIDEOS].sort(byDateDesc);
  return !playlist || playlist === 'All' ? all : all.filter((v) => v.playlist === playlist);
}

/** One LISTED video by its (locale-independent) slug, or undefined. An unpublished slug
 *  resolves to undefined, which the /media/[slug] routes turn into a real 404. */
export function getVideo(slug: string | undefined): Video | undefined {
  if (!slug) return undefined;
  return PUBLISHED_VIDEOS.find((v) => v.slug === slug);
}

/** The copy for a locale. Typed as total, so this can never return undefined. */
export function copyFor(video: Video, lang: Locale): VideoCopy {
  return video.i18n[lang];
}

/** The WHOLE registry, listed or not. This is what videos.test.ts validates: an unlisted
 *  video is still checked, so it is still correct on the day it comes back. Nothing
 *  reader-facing should use this — see PUBLISHED_VIDEOS. */
export const ALL_VIDEOS: readonly Video[] = VIDEOS;

/** What the site actually shows: the registry minus anything marked `published: false`.
 *  The listings, the detail routes and the sitemap all go through this. */
export const PUBLISHED_VIDEOS: readonly Video[] = VIDEOS.filter((v) => v.published !== false);
