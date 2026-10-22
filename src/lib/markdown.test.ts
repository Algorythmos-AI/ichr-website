// The 44px tap target belongs to a link that stands alone in its paragraph, never to a link
// inside a sentence. CSS cannot tell them apart (`p > a:only-child` ignores text nodes), so
// renderMarkdown marks the standalone ones; this pins which is which.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from './markdown.ts';

test('a link alone in its paragraph is marked as a call to action', () => {
  const html = renderMarkdown('[Watch the footage](/media/x)');
  assert.match(
    html,
    /<p><a class="cta-link" href="\/media\/x" rel="noopener noreferrer">Watch the footage<\/a><\/p>/,
  );
});

test('a link inside a sentence stays inline', () => {
  for (const md of [
    'The strike in the border area ([the North Wadi region](/news/x)).',
    'See [the statement](/news/x) for details.',
    'على الشريط الحدودي بين مصر والسودان ([منطقة وادي الشمال](/ar/news/x)).',
  ]) {
    assert.doesNotMatch(renderMarkdown(md), /cta-link/, md);
  }
});

test('two links in one paragraph are not a call to action', () => {
  assert.doesNotMatch(renderMarkdown('[One](/a) [Two](/b)'), /cta-link/);
});

test('the sanitizer still runs first: no class or script can be smuggled in', () => {
  const html = renderMarkdown('<a href="javascript:alert(1)" class="x" onclick="y">bad</a>');
  assert.doesNotMatch(html, /javascript:|onclick|class="x"/);
});
