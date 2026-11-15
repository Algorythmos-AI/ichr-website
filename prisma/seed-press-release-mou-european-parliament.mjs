// Press release, Brussels, 13 October 2026 — "From within the European Parliament: Signing of an
// International Memorandum of Understanding to Support the Human Rights Track and Protect
// Civilians in Sudan and South Asia".
// Source: press/NOV/6/ (notes.rtf, the headline only; two client cards, EN and AR, 1600 x 1600,
// received 15 November 2026).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-press-release-mou-european-parliament.mjs
//               node --env-file=.env.local prisma/seed-press-release-mou-european-parliament.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-press-release-mou-european-parliament.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-press-release-mou-european-parliament.mjs
//
// Images: the client's cards, re-encoded (cover.jpg = EN card, cover-ar.jpg = AR card).
// Variants: node scripts/gen-image-variants.mjs mou-european-parliament-sudan-south-asia-brussels-october-2026
//
// EDITORIAL NOTES (16 November 2026):
//  - The client sent a HEADLINE ONLY. The body is OURS, written at the owner's choice from what
//    the cards show and nothing more: the place (European Parliament, Brussels), the date
//    (13 October 2026, as printed on the cards), the headline's stated purpose, and the signatories
//    as their table name plates read. No terms, parties or commitments of the MoU are stated
//    beyond the headline. If the client sends the full text, replace the body with it.
//  - NAMES from the name plates: "Abdelrahim Grein, Representative of the International
//    Coalition…" (house spelling, settled); "Zilani Golam, Secretary General". His organisation's
//    name is illegible on the plate and is deliberately not given (owner's choice).
//  - Dated 13 October 2026, the date on the cards, so it sorts with October on /news.
//  - Category Press Release. AR and FR are our translations; the AR card is the client's own.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'mou-european-parliament-sudan-south-asia-brussels-october-2026';
// Generated once, 16 November 2026. Never regenerate.
export const TRANSLATION_KEY = 'a2072e57-4f50-46fd-b799-fe82b7c17520';

const EN_BODY = `On 13 October 2026, at the European Parliament in Brussels, an international Memorandum of Understanding was signed to support the human rights track and the protection of civilians in Sudan and South Asia.

Abdelrahim Grein signed on behalf of the International Coalition of Human Rights Organizations (ICHRO), alongside Zilani Golam, Secretary General, in the presence of fellow delegates.

The memorandum reflects the Coalition's commitment to working with international partners to keep the protection of civilians, accountability and the rights of victims at the centre of international attention.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Brussels, 13 October 2026`;

const EN_EXCERPT =
  'At the European Parliament in Brussels on 13 October 2026, the Coalition signed an international Memorandum of Understanding to support the human rights track and protect civilians in Sudan and South Asia.';

const AR_BODY = `في 13 أكتوبر 2026، وُقّعت داخل البرلمان الأوروبي في بروكسل مذكرة تفاهم دولية لدعم مسار حقوق الإنسان وحماية المدنيين في السودان وجنوب آسيا.

ووقّع عبد الرحيم قرين باسم التحالف الدولي لمنظمات حقوق الإنسان (ICHRO)، إلى جانب زيلاني غولام، الأمين العام، بحضور عدد من المندوبين.

وتعكس المذكرة التزام التحالف بالعمل مع الشركاء الدوليين لإبقاء حماية المدنيين والمساءلة وحقوق الضحايا في صدارة الاهتمام الدولي.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

بروكسل، 13 أكتوبر 2026`;

const AR_EXCERPT =
  'داخل البرلمان الأوروبي في بروكسل، وقّع التحالف في 13 أكتوبر 2026 مذكرة تفاهم دولية لدعم مسار حقوق الإنسان وحماية المدنيين في السودان وجنوب آسيا.';

const FR_BODY = `Le 13 octobre 2026, au Parlement européen à Bruxelles, un protocole d'accord international a été signé pour soutenir le volet des droits de l'homme et la protection des civils au Soudan et en Asie du Sud.

Abdelrahim Grein l'a signé au nom de la Coalition internationale des organisations de défense des droits de l'homme (ICHRO), aux côtés de Zilani Golam, secrétaire général, en présence d'autres délégués.

Ce protocole traduit l'engagement de la Coalition à travailler avec ses partenaires internationaux pour maintenir la protection des civils, la reddition de comptes et les droits des victimes au cœur de l'attention internationale.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Bruxelles, 13 octobre 2026`;

const FR_EXCERPT =
  "Au Parlement européen à Bruxelles, le 13 octobre 2026, la Coalition a signé un protocole d'accord international pour soutenir le volet des droits de l'homme et protéger les civils au Soudan et en Asie du Sud.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Press Release',
  date: '2026-10-13',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan'],
  locales: [
    {
      locale: 'en',
      title:
        'From within the European Parliament: Signing of an International Memorandum of Understanding to Support the Human Rights Track and Protect Civilians in Sudan and South Asia',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Brussels',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'من داخل البرلمان الأوروبي: توقيع مذكرة تفاهم دولية لدعم مسار حقوق الإنسان وحماية المدنيين في السودان وجنوب آسيا',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'بروكسل',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title:
        "Au sein du Parlement européen : signature d'un protocole d'accord international pour soutenir le volet des droits de l'homme et protéger les civils au Soudan et en Asie du Sud",
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Bruxelles',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
  ],
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
