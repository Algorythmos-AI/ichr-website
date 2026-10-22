// SERVER-SIDE Markdown → sanitized HTML (used by the SSR article page).
// The admin live preview uses its own client renderer (marked + DOMPurify);
// both share the same `marked` grammar.
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({ gfm: true, breaks: false });

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  // sanitize-html defaults EXCLUDE img + table tags — add them explicitly.
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'img',
    'figure',
    'figcaption',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'caption',
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'loading'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    // Keep a single <h1> per page (the article title) — downgrade body h1 → h2.
    h1: 'h2',
  },
};

// A paragraph that holds ONE link and nothing else is a call to action ("Read the full
// submission", "Watch the footage") and gets a 44px tap target in CSS (.cta-link). A link
// inside a sentence must stay inline: CSS cannot tell the two apart (`p > a:only-child`
// ignores the text around the link), which made in-sentence links jump onto their own line.
// Runs AFTER the sanitizer and only adds a fixed class name, so it cannot widen what the
// sanitizer allows.
const STANDALONE_LINK = /<p>\s*<a ((?:(?!>)[\s\S])*)>((?:(?!<\/?a\b)[\s\S])*)<\/a>\s*<\/p>/g;

export function renderMarkdown(md: string): string {
  const rawHtml = marked.parse(md ?? '', { async: false }) as string;
  return sanitizeHtml(rawHtml, SANITIZE_OPTIONS).replace(
    STANDALONE_LINK,
    '<p><a class="cta-link" $1>$2</a></p>',
  );
}
