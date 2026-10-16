// Press release, Brussels, 13 October 2026 — the Coalition meets a delegation of The Church
// of Jesus Christ of Latter-day Saints, headed by Mr. Francesco Di Lillo, Director of EU &
// International Affairs, on Sudan and humanitarian cooperation.
//
// Source: press/OCT/2 (notes.rtf — English only — and two square 1600x1600 designed cards:
// the same photograph with an English caption, and with an Arabic one). Re-encoded to
// card-1.jpg (English card) and card-2.jpg (Arabic card). AR and FR are translations.
//
// EDITORIAL DECISIONS (confirmed with the client, 16 October 2026):
//   * NAME OF THE CHURCH. The notes and cards say "The Church of Jesus Christ"; the article
//     uses the full name, "The Church of Jesus Christ of Latter-day Saints", on first mention
//     (as printed on the wall in the photograph), then "the Church". AR كنيسة يسوع المسيح
//     لقديسي الأيام الأخيرة, FR l'Église de Jésus-Christ des Saints des Derniers Jours.
//     The cards are the client's artwork and are NOT retouched.
//   * NAME: Francesco Di Lillo — AR فرانشيسكو دي ليلو, as printed on the Arabic card.
//   * NAME OF THE COALITION: body and sign-off use the house brand "International Coalition
//     for Human Rights (ICHR)"; the notes read "…of Human Rights Organizations".
//   * The notes' first person ("we provided a briefing") is put in the third person.
//   * ADDED TEXT, not in the source: "attacks targeting Sudanese miners" links to the
//     Coalition's own 12 October statement (relative href per locale). Nothing else added.
//     A third-party article on the miners (indegazette.be) was offered by the client and
//     deliberately NOT used: it is about the strikes, not this meeting.
//   * COVER: the English card on en and fr (there is no French card), the Arabic card on ar.
//     Square cards letterbox in the 1200x630 og:image; accepted, as for earlier cards. No
//     gallery: both cards carry the same photograph. The people in the photograph other
//     than Mr. Di Lillo are not named (not supplied by the client).
//
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-church-of-jesus-christ-brussels.mjs
//               node --env-file=.env.local prisma/seed-statement-church-of-jesus-christ-brussels.mjs
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-church-of-jesus-christ-brussels.mjs
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-church-of-jesus-christ-brussels.mjs
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'church-of-jesus-christ-meeting-brussels-october-2026';
// Generated once, 16 October 2026. Never regenerate.
export const TRANSLATION_KEY = '1ac5cac4-892c-4c8c-bc05-6bb98b354bf0';

const MINERS = 'condemnation-airstrike-miners-north-wadi-october-2026';
const CARD_EN = `/blog/${SLUG}/card-1.jpg`;
const CARD_AR = `/blog/${SLUG}/card-2.jpg`;

const EN_BODY = `The International Coalition for Human Rights (ICHR) held a meeting with a delegation of The Church of Jesus Christ of Latter-day Saints, headed by Mr. Francesco Di Lillo, Director of EU & International Affairs.

The meeting addressed a number of humanitarian issues and the prospects for joint cooperation. The Coalition provided a briefing on the situation in Sudan, including the [attacks targeting Sudanese miners](/news/${MINERS}).

The discussions also addressed the need to end the war and achieve peace in Sudan, and the importance of protecting civilians and alleviating humanitarian suffering.

Both sides exchanged views on ways to strengthen cooperation on humanitarian issues, and emphasised the importance of maintaining dialogue and communication in support of efforts to end the war and achieve peace.

---

**INTERNATIONAL COALITION FOR HUMAN RIGHTS**

Advancing Human Rights • Peace • Justice

Brussels, 13 October 2026`;

const EN_EXCERPT =
  'ICHR met a delegation of The Church of Jesus Christ of Latter-day Saints, headed by Mr. Francesco Di Lillo, Director of EU & International Affairs, to discuss the situation in Sudan, the protection of civilians and cooperation on humanitarian issues.';

const AR_BODY = `عقد التحالف الدولي لحقوق الإنسان اجتماعًا مع وفد من كنيسة يسوع المسيح لقديسي الأيام الأخيرة، برئاسة السيد فرانشيسكو دي ليلو، مدير الشؤون الأوروبية والدولية.

وتناول الاجتماع عددًا من القضايا الإنسانية وآفاق التعاون المشترك. وقدّم التحالف إحاطة حول الوضع في السودان، بما في ذلك [الهجمات التي استهدفت المعدّنين السودانيين](/ar/news/${MINERS}).

كما تناولت المباحثات ضرورة إنهاء الحرب وتحقيق السلام في السودان، وأهمية حماية المدنيين وتخفيف المعاناة الإنسانية.

وتبادل الجانبان وجهات النظر حول سبل تعزيز التعاون في القضايا الإنسانية، وأكّدا أهمية استمرار الحوار والتواصل دعمًا للجهود الرامية إلى إنهاء الحرب وتحقيق السلام.

---

**التحالف الدولي لحقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

بروكسل، 13 أكتوبر 2026`;

const AR_EXCERPT =
  'التقى التحالف الدولي لحقوق الإنسان وفدًا من كنيسة يسوع المسيح لقديسي الأيام الأخيرة برئاسة السيد فرانشيسكو دي ليلو، مدير الشؤون الأوروبية والدولية، لبحث الوضع في السودان وحماية المدنيين والتعاون في القضايا الإنسانية.';

const FR_BODY = `La Coalition internationale pour les droits de l'homme (ICHR) a rencontré une délégation de l'Église de Jésus-Christ des Saints des Derniers Jours, conduite par M. Francesco Di Lillo, directeur des affaires européennes et internationales.

La réunion a porté sur plusieurs questions humanitaires et sur les perspectives de coopération. La Coalition a présenté un point sur la situation au Soudan, notamment les [attaques visant des mineurs soudanais](/fr/news/${MINERS}).

Les discussions ont également porté sur la nécessité de mettre fin à la guerre et de parvenir à la paix au Soudan, ainsi que sur l'importance de protéger les civils et d'atténuer les souffrances humanitaires.

Les deux parties ont échangé leurs vues sur les moyens de renforcer leur coopération sur les questions humanitaires, et ont souligné l'importance de maintenir le dialogue et la communication pour soutenir les efforts visant à mettre fin à la guerre et à instaurer la paix.

---

**COALITION INTERNATIONALE POUR LES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Bruxelles, 13 octobre 2026`;

const FR_EXCERPT =
  "L'ICHR a rencontré une délégation de l'Église de Jésus-Christ des Saints des Derniers Jours, conduite par M. Francesco Di Lillo, directeur des affaires européennes et internationales, pour évoquer la situation au Soudan, la protection des civils et la coopération humanitaire.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-10-13',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Brussels'],
  locales: [
    {
      locale: 'en',
      title: 'ICHR Meets The Church of Jesus Christ of Latter-day Saints in Brussels on Sudan and Humanitarian Cooperation',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Brussels',
      authorName: 'ICHR Communications',
      coverImageUrl: CARD_EN,
    },
    {
      locale: 'ar',
      title: 'التحالف الدولي لحقوق الإنسان يلتقي وفدًا من كنيسة يسوع المسيح لقديسي الأيام الأخيرة في بروكسل لبحث الوضع في السودان والتعاون الإنساني',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'بروكسل',
      authorName: 'إعلام ICHR',
      coverImageUrl: CARD_AR,
    },
    {
      locale: 'fr',
      title: "L'ICHR rencontre l'Église de Jésus-Christ des Saints des Derniers Jours à Bruxelles sur le Soudan et la coopération humanitaire",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Bruxelles',
      authorName: 'Communication ICHR',
      coverImageUrl: CARD_EN,
    },
  ],
};

// No COVERS export: every locale is headed by supplied artwork, so gen-press-cover.mjs is
// not run for this statement.

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
