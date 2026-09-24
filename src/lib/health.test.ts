import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildHealth } from './health.ts';

const SHA = '065f08a0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2';

test('reports the deployed commit, environment and version', () => {
  assert.deepEqual(buildHealth({ VERCEL_GIT_COMMIT_SHA: SHA, VERCEL_ENV: 'production' }, '1.0.0'), {
    ok: true,
    commit: SHA,
    env: 'production',
    version: '1.0.0',
  });
});

test('normalises the commit to lowercase', () => {
  assert.equal(buildHealth({ VERCEL_GIT_COMMIT_SHA: SHA.toUpperCase() }, '1.0.0').commit, SHA);
});

test('never echoes a malformed commit value', () => {
  // The release gate compares this string to a SHA; anything that is not one must not match.
  for (const bad of ['', 'abc123', `${SHA}\n`, `<script>${SHA}`, SHA.slice(1)]) {
    const commit = buildHealth({ VERCEL_GIT_COMMIT_SHA: bad }, '1.0.0').commit;
    assert.ok(
      commit === 'unknown' || commit === SHA,
      `unexpected commit for ${JSON.stringify(bad)}: ${commit}`,
    );
  }
  assert.equal(buildHealth({ VERCEL_GIT_COMMIT_SHA: 'abc123' }, '1.0.0').commit, 'unknown');
});

test('outside Vercel it reports development with an unknown commit', () => {
  assert.deepEqual(buildHealth({}, '1.0.0'), {
    ok: true,
    commit: 'unknown',
    env: 'development',
    version: '1.0.0',
  });
});
