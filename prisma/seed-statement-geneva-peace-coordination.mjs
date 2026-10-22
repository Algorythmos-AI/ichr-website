// "Statement on the Outcomes of the Geneva Meeting for Coordinating Peace Efforts in Sudan"
// — Geneva, 22 October 2026. Source: press/OCT/5/notes.rtf (English only, no artwork).
//
// One file, three locales. The mechanism lives in prisma/lib/press-statement.mjs.
//
// Usage:
//   DRY_RUN=1   node --env-file=.env.local prisma/seed-statement-geneva-peace-coordination.mjs
//               node --env-file=.env.local prisma/seed-statement-geneva-peace-coordination.mjs   # DRAFT
//   PUBLISH=1   node --env-file=.env.local prisma/seed-statement-geneva-peace-coordination.mjs   # live
//   UNPUBLISH=1 node --env-file=.env.local prisma/seed-statement-geneva-peace-coordination.mjs
//
// Covers: node scripts/gen-press-cover.mjs prisma/seed-statement-geneva-peace-coordination.mjs
//
// EDITORIAL NOTES (decided with the client, 22 October 2026):
//  - DATELINE: the source is dated 22 October 2026 but names no city. Published as GENEVA, at
//    the client's choice — where the meeting was held, and the Coalition's head office.
//  - The meeting facts (the sixth consultative meeting, 21 October 2026, UN headquarters in
//    Geneva, co-hosted by Switzerland and the UN, 22 countries) are the client's account, kept
//    as stated.
//  - ATTRIBUTION: "the record of violations committed by the Sudanese army throughout the
//    history of conflicts" is the Coalition's own position, published as written with the
//    client's approval. The chemical-weapons sentence asks for an independent investigation and
//    names no perpetrator; it must stay that way in AR and FR too.
//  - Light copy-edit at the client's choice: house name (ICHRO), third person throughout ("We
//    call for" → "The Coalition calls for"), paragraphs split at their existing sentence breaks,
//    a doubled space removed. Substance unchanged. The contact block is dropped (site footer);
//    the house sign-off and tagline are added.
//  - No artwork supplied: covers are generated, azure theme. No gallery.
import { pathToFileURL } from 'node:url';
import { publishStatement, envOpts } from './lib/press-statement.mjs';

export const SLUG = 'geneva-meeting-sudan-peace-coordination-october-2026';
// Generated once, 22 October 2026. Never regenerate.
export const TRANSLATION_KEY = '9ad5ea45-d017-4f8a-b88e-301ccd450742';

const EN_BODY = `The sixth consultative meeting to enhance the coordination of peace initiatives and efforts in Sudan was held at the United Nations headquarters in Geneva on Wednesday, 21 October 2026. Co-hosted by Switzerland and the United Nations, with representatives of 22 countries and of the relevant international and regional organisations, the meeting discussed de-escalation, the protection of civilians, facilitating the delivery of aid, supporting a humanitarian truce that paves the way for a permanent ceasefire, halting the external supplies that fuel the war, and advancing an inclusive, Sudanese-led political process.

The International Coalition of Human Rights Organizations (ICHRO) welcomes this continued international coordination to end the war, and appreciates the earnest effort to address the roots of violence and terror.

The Coalition emphasises that the humanitarian and human rights question is the foundation of any settlement, and that the value of these efforts will be measured by the actual protection they bring to Sudanese women and men — safeguarding their dignity and their right to life and peace.

## Peace built on the will of the people

Peoples are the primary source of peace. Sustainable peace cannot be forged through a superficial consensus among elites. Peace must not bypass the will and the rights of the people; it must rest on the consent of the Sudanese people, through a social contract that rejects violence as a means of governance and competition.

The peace the Sudanese people aspire to will build institutions through which the State holds the monopoly on the legitimate use of force — under the rule of law and democratic civilian oversight — to protect everyone, without cultural, geographical or ethnic discrimination.

## No peace without justice

The Coalition affirms that accountability is a gateway to peace, and that peace is not a substitute for justice.

The record of violations committed by the Sudanese army throughout the history of conflicts, together with all crimes committed against civilians, requires accountability without immunity or selectivity, and an independent investigation into the use of chemical weapons and the determination of responsibility — while upholding the rights of victims to truth, redress, reparation and guarantees of non-repetition.

The hope of the Sudanese people to return to their homes must go hand in hand with the return of their civic dream: a legitimate authority that draws its strength from their will and from their movement for freedom, peace and justice; the return of the military to the barracks; and a professional army, separate from politics and subordinate to civilian authority.

## From outcomes to protection

The Coalition calls for the outcomes of the Geneva meeting to be translated into tangible measures that protect civilians, secure relief and open a political pathway in which victims and affected communities take part — making social justice and an end to marginalisation the basis for the country's unity and stability.

The peace the Sudanese people deserve is one that safeguards humanity, restores rights and prevents the recurrence of tragedy.

---

**INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS**

Advancing Human Rights • Peace • Justice

Geneva, 22 October 2026`;

const EN_EXCERPT =
  'ICHRO welcomes the sixth Geneva meeting on coordinating peace efforts in Sudan, held at the United Nations on 21 October 2026, and calls for its outcomes to become tangible protection for civilians, with accountability, justice for victims and an inclusive, civilian-led political process.';

const AR_BODY = `عُقد الاجتماع التشاوري السادس لتعزيز تنسيق مبادرات وجهود السلام في السودان في مقر الأمم المتحدة بجنيف يوم الأربعاء 21 أكتوبر 2026، برئاسة مشتركة من سويسرا والأمم المتحدة، وبمشاركة ممثلين عن 22 دولة وعن المنظمات الدولية والإقليمية المعنية. وناقش الاجتماع خفض التصعيد، وحماية المدنيين، وتيسير إيصال المساعدات، ودعم هدنة إنسانية تمهّد لوقف دائم لإطلاق النار، ووقف الإمدادات الخارجية التي تغذّي الحرب، والمضيّ في عملية سياسية شاملة يقودها السودانيون.

ويرحّب التحالف الدولي لمنظمات حقوق الإنسان بهذا التنسيق الدولي المتواصل لإنهاء الحرب، ويقدّر المسعى الجادّ لمعالجة جذور العنف والإرهاب.

ويؤكد التحالف أن القضية الإنسانية والحقوقية هي أساس أي تسوية، وأن قيمة هذه الجهود تُقاس بما تحققه من حماية فعلية للسودانيات والسودانيين، صونًا لكرامتهم وحقهم في الحياة والسلام.

## سلام يقوم على إرادة الشعب

الشعوب هي المصدر الأول للسلام، ولا يمكن صناعة سلام مستدام عبر توافق سطحي بين النخب. ويجب ألّا يتجاوز السلام إرادة الشعب وحقوقه، بل أن يقوم على رضا الشعب السوداني، عبر عقد اجتماعي يرفض العنف وسيلةً للحكم والتنافس.

والسلام الذي يتطلّع إليه السودانيون يؤسّس لمؤسسات تحتكر فيها الدولة الاستخدام المشروع للقوة، في ظل سيادة القانون والرقابة المدنية الديمقراطية، لحماية الجميع دون تمييز ثقافي أو جغرافي أو عرقي.

## لا سلام بلا عدالة

ويؤكد التحالف أن المساءلة بوابة للسلام، وأن السلام ليس بديلًا عن العدالة.

إن سجلّ الانتهاكات التي ارتكبها الجيش السوداني عبر تاريخ النزاعات، إلى جانب جميع الجرائم المرتكبة بحق المدنيين، يستوجب المساءلة دون حصانة أو انتقائية، وإجراء تحقيق مستقل في استخدام الأسلحة الكيميائية وتحديد المسؤوليات، مع صون حقوق الضحايا في الحقيقة والإنصاف وجبر الضرر وضمانات عدم التكرار.

ويجب أن يقترن أمل السودانيين في العودة إلى ديارهم بعودة حلمهم المدني: سلطة شرعية تستمدّ قوتها من إرادتهم ومن حراكهم المطالب بالحرية والسلام والعدالة، وعودة العسكر إلى الثكنات، وبناء جيش مهني منفصل عن السياسة وخاضع للسلطة المدنية.

## من المخرجات إلى الحماية

ويدعو التحالف إلى ترجمة مخرجات اجتماع جنيف إلى إجراءات ملموسة تحمي المدنيين، وتؤمّن الإغاثة، وتفتح مسارًا سياسيًا يشارك فيه الضحايا والمجتمعات المتضررة، بما يجعل العدالة الاجتماعية وإنهاء التهميش أساسًا لوحدة البلاد واستقرارها.

إن السلام الذي يستحقه السودانيون هو سلام يصون الإنسان، ويعيد الحقوق، ويمنع تكرار المأساة.

---

**التحالف الدولي لمنظمات حقوق الإنسان**

النهوض بحقوق الإنسان • السلام • العدالة

جنيف، 22 أكتوبر 2026`;

const AR_EXCERPT =
  'يرحّب التحالف الدولي لمنظمات حقوق الإنسان باجتماع جنيف السادس لتنسيق جهود السلام في السودان، المنعقد في الأمم المتحدة في 21 أكتوبر 2026، ويدعو إلى ترجمة مخرجاته إلى حماية فعلية للمدنيين، مع المساءلة والعدالة للضحايا وعملية سياسية شاملة بقيادة مدنية.';

const FR_BODY = `La sixième réunion consultative visant à renforcer la coordination des initiatives et des efforts de paix au Soudan s'est tenue au siège des Nations unies à Genève le mercredi 21 octobre 2026. Coorganisée par la Suisse et les Nations unies, avec des représentants de 22 pays et des organisations internationales et régionales concernées, la réunion a porté sur la désescalade, la protection des civils, la facilitation de l'acheminement de l'aide, le soutien à une trêve humanitaire ouvrant la voie à un cessez-le-feu permanent, l'arrêt des approvisionnements extérieurs qui alimentent la guerre et la promotion d'un processus politique inclusif mené par les Soudanais.

La Coalition internationale des organisations de défense des droits de l'homme (ICHRO) salue cette coordination internationale continue pour mettre fin à la guerre, et apprécie la volonté sincère de s'attaquer aux racines de la violence et de la terreur.

La Coalition souligne que la question humanitaire et des droits humains est le fondement de tout règlement, et que la valeur de ces efforts se mesurera à la protection effective qu'ils apporteront aux Soudanaises et aux Soudanais — en préservant leur dignité et leur droit à la vie et à la paix.

## Une paix fondée sur la volonté du peuple

Les peuples sont la première source de la paix. Une paix durable ne peut naître d'un consensus superficiel entre élites. La paix ne doit pas contourner la volonté et les droits du peuple ; elle doit reposer sur le consentement du peuple soudanais, au moyen d'un contrat social qui rejette la violence comme mode de gouvernement et de compétition.

La paix à laquelle aspire le peuple soudanais bâtira des institutions par lesquelles l'État détient le monopole de l'usage légitime de la force — dans le respect de l'État de droit et sous un contrôle civil démocratique — pour protéger chacun, sans discrimination culturelle, géographique ou ethnique.

## Pas de paix sans justice

La Coalition affirme que l'établissement des responsabilités est une porte vers la paix, et que la paix ne saurait remplacer la justice.

Le bilan des violations commises par l'armée soudanaise tout au long de l'histoire des conflits, ainsi que l'ensemble des crimes commis contre des civils, exige que les responsables rendent des comptes, sans immunité ni sélectivité, ainsi qu'une enquête indépendante sur l'utilisation d'armes chimiques et l'établissement des responsabilités — dans le respect des droits des victimes à la vérité, à la réparation, à l'indemnisation et aux garanties de non-répétition.

L'espoir des Soudanais de retrouver leurs foyers doit aller de pair avec le retour de leur rêve civique : une autorité légitime qui tire sa force de leur volonté et de leur mouvement pour la liberté, la paix et la justice ; le retour des militaires dans les casernes ; et une armée professionnelle, séparée de la politique et subordonnée à l'autorité civile.

## Des conclusions à la protection

La Coalition demande que les conclusions de la réunion de Genève se traduisent par des mesures concrètes pour protéger les civils, garantir les secours et ouvrir une voie politique à laquelle participent les victimes et les communautés touchées — faisant de la justice sociale et de la fin de la marginalisation le socle de l'unité et de la stabilité du pays.

La paix que méritent les Soudanais est une paix qui préserve l'humain, rétablit les droits et empêche que la tragédie ne se reproduise.

---

**COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME**

Promouvoir les droits de l'homme • La paix • La justice

Genève, 22 octobre 2026`;

const FR_EXCERPT =
  "L'ICHRO salue la sixième réunion de Genève sur la coordination des efforts de paix au Soudan, tenue aux Nations unies le 21 octobre 2026, et demande que ses conclusions se traduisent par une protection effective des civils, l'établissement des responsabilités, la justice pour les victimes et un processus politique inclusif mené par des civils.";

export const STATEMENT = {
  slug: SLUG,
  translationKey: TRANSLATION_KEY,
  category: 'Statement',
  date: '2026-10-22',
  hashtags: ['#international_coalition_for_h_rights', '#Sudan', '#Geneva'],
  locales: [
    {
      locale: 'en',
      title: 'Statement on the Outcomes of the Geneva Meeting for Coordinating Peace Efforts in Sudan',
      excerpt: EN_EXCERPT,
      body: EN_BODY,
      location: 'Geneva',
      authorName: 'ICHRO Communications',
      coverImageUrl: `/blog/${SLUG}/cover.jpg`,
    },
    {
      locale: 'ar',
      title: 'بيان بشأن مخرجات اجتماع جنيف لتنسيق جهود السلام في السودان',
      excerpt: AR_EXCERPT,
      body: AR_BODY,
      location: 'جنيف',
      authorName: 'إعلام ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-ar.jpg`,
    },
    {
      locale: 'fr',
      title: 'Déclaration sur les conclusions de la réunion de Genève pour la coordination des efforts de paix au Soudan',
      excerpt: FR_EXCERPT,
      body: FR_BODY,
      location: 'Genève',
      authorName: 'Communication ICHRO',
      coverImageUrl: `/blog/${SLUG}/cover-fr.jpg`,
    },
  ],
};

// Cover colour (scripts/lib/press-card.mjs THEMES): UN blue, for a UN Geneva meeting.
export const COVER_THEME = 'azure';

export const COVERS = {
  en: {
    file: 'cover.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS',
    eyebrow: 'STATEMENT',
    headline: ['Outcomes of the', 'Geneva Meeting on', 'Peace Efforts in Sudan'],
    headSize: 58,
    headLh: 78,
    headTop: 452,
    standfirst: ['Statement on the situation in Sudan'],
    city: 'Geneva',
    date: '22 OCTOBER 2026',
    chipW: 248,
  },
  fr: {
    file: 'cover-fr.jpg',
    rtl: false,
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    org: "COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L'HOMME",
    eyebrow: 'DÉCLARATION',
    headline: ['Conclusions de la', 'réunion de Genève sur', 'la paix au Soudan'],
    headSize: 54,
    headLh: 74,
    headTop: 452,
    standfirst: ['Déclaration sur la situation au Soudan'],
    city: 'Genève',
    date: '22 OCTOBRE 2026',
    chipW: 248,
  },
  ar: {
    file: 'cover-ar.jpg',
    rtl: true,
    font: "'Geeza Pro', 'Al Bayan', sans-serif",
    org: 'التحالف الدولي لمنظمات حقوق الإنسان',
    eyebrow: 'بيان',
    headline: ['مخرجات اجتماع جنيف', 'لتنسيق جهود السلام', 'في السودان'],
    headSize: 56,
    headLh: 88,
    headTop: 468,
    standfirst: ['بيان بشأن الوضع في السودان'],
    city: 'جنيف',
    date: '22 أكتوبر 2026',
    chipW: 240,
  },
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishStatement(STATEMENT, envOpts()).catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
