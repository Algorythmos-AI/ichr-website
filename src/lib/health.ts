// The body of GET /api/health — pure, so it can be tested without a server.
//
// The release pipeline polls this endpoint until production reports the commit it just
// merged. That is how a release proves it is live, and how a push that Vercel silently
// failed to deploy is caught (it happened once, on 28 July 2026).
//
// It deliberately does NOT touch the database: a Neon outage must not fail a deploy check,
// and a health endpoint that opens a connection on every probe is a load generator.

export interface HealthEnv {
  VERCEL_GIT_COMMIT_SHA?: string;
  VERCEL_ENV?: string;
}

export interface Health {
  ok: true;
  commit: string;
  env: string;
  version: string;
}

const SHA_RE = /^[0-9a-f]{40}$/;

export function buildHealth(env: HealthEnv, version: string): Health {
  const sha = env.VERCEL_GIT_COMMIT_SHA?.trim().toLowerCase() ?? '';
  return {
    ok: true,
    commit: SHA_RE.test(sha) ? sha : 'unknown',
    env: env.VERCEL_ENV?.trim() || 'development',
    version,
  };
}

/** Read the Vercel system variables at request time, the same way siteUrl.ts does. */
export function runtimeHealthEnv(): HealthEnv {
  if (typeof process === 'undefined' || !process.env) return {};
  const { VERCEL_GIT_COMMIT_SHA, VERCEL_ENV } = process.env;
  return { VERCEL_GIT_COMMIT_SHA, VERCEL_ENV };
}
