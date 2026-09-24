import type { APIRoute } from 'astro';
import { buildHealth, runtimeHealthEnv } from '../../lib/health';
import pkg from '../../../package.json';

export const prerender = false;

// Liveness and deployed-commit identity. See src/lib/health.ts for why it never touches
// the database.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildHealth(runtimeHealthEnv(), pkg.version)), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
