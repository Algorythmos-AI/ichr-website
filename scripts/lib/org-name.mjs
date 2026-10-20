// The organisation's name, as of 20 October 2026: "International Coalition of Human Rights
// Organizations (ICHRO)", at the client's request. It replaces the house brand
// "International Coalition for Human Rights (ICHR)" used since June.
//
// One set of rules, used for the site source, the seed files and the database, so the three
// can never disagree. Every rule is idempotent: running it twice changes nothing more.
//
// Deliberately NOT renamed: the domain (ichr-international.org), the social handles
// (@ICHRIntl, #international_coalition_for_h_rights), URL slugs, filenames, and the client's
// logo artwork, which carries "ICHR" in its lettering and is not ours to redraw.
export const ORG_RULES = [
  [/International Coalition for Human Rights/g, 'International Coalition of Human Rights Organizations'],
  [/INTERNATIONAL COALITION FOR HUMAN RIGHTS/g, 'INTERNATIONAL COALITION OF HUMAN RIGHTS ORGANIZATIONS'],
  [
    /Coalition internationale pour les droits de l(['’])homme/g,
    'Coalition internationale des organisations de défense des droits de l$1homme',
  ],
  [
    /COALITION INTERNATIONALE POUR LES DROITS DE L(['’])HOMME/g,
    'COALITION INTERNATIONALE DES ORGANISATIONS DE DÉFENSE DES DROITS DE L$1HOMME',
  ],
  [/التحالف الدولي لحقوق الإنسان/g, 'التحالف الدولي لمنظمات حقوق الإنسان'],
  // The bare abbreviation, but never inside a URL, a handle, a hashtag, a filename or a slug:
  // ichr-international.org, @ICHRIntl, #ICHR…, ICHR_Statement.pdf, ICHR-INTERNATIONAL.ORG.
  [/(?<![\w@#./-])ICHR(?![\w-])/g, 'ICHRO'],
];

export function renameOrg(text) {
  if (typeof text !== 'string') return text;
  return ORG_RULES.reduce((s, [re, to]) => s.replace(re, to), text);
}

/** Source files: rename on every line except comments, which record history. */
export function renameOrgInSource(src) {
  return src
    .split('\n')
    .map((line) => (/^\s*(\/\/|\*|\/\*|<!--)/.test(line) ? line : renameOrg(line)))
    .join('\n');
}
