// Budget guard for the agent demo.
//
// The model call happens before the email gate, so someone can spend the
// studio's money without ever leaving an address. Two limits: a per-visitor
// one and a global daily one. Only successful runs count - a blocked URL or an
// unreadable page must not use up a visitor's two attempts.
//
// IN-MEMORY, same caveat as store.ts: it resets on redeploy and is not shared
// across instances. Set a hard spend limit in the Anthropic Console as well;
// application logic is not a backstop on its own.

import { createHash } from 'node:crypto';
import { DAILY_GLOBAL_CAP, RUNS_PER_IP_PER_DAY } from './config';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Hashed visitor key -> timestamps of successful runs in the last 24h. */
const perVisitor = new Map<string, number[]>();

let globalDay = '';
let globalCount = 0;

/**
 * Hashes the caller's address with a server-side salt. The raw IP is never
 * stored or logged; without the salt the hash of an IPv4 address would be
 * trivially reversible by brute force.
 */
export function visitorKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const ip =
    forwarded.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const salt = process.env.AGENT_DEMO_IP_SALT || 'maubourg-agent-demo';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function rollDay(): void {
  const day = today();
  if (day !== globalDay) {
    globalDay = day;
    globalCount = 0;
  }
}

/** True when this visitor may start another run. Does not consume anything. */
export function canRun(key: string): boolean {
  rollDay();
  if (globalCount >= DAILY_GLOBAL_CAP) return false;

  const cutoff = Date.now() - DAY_MS;
  const hits = (perVisitor.get(key) || []).filter((t) => t > cutoff);
  if (hits.length === 0) perVisitor.delete(key);
  else perVisitor.set(key, hits);

  return hits.length < RUNS_PER_IP_PER_DAY;
}

/** Call once a run has actually produced a result. Failures never count. */
export function recordRun(key: string): void {
  rollDay();
  globalCount += 1;
  const cutoff = Date.now() - DAY_MS;
  const hits = (perVisitor.get(key) || []).filter((t) => t > cutoff);
  hits.push(Date.now());
  perVisitor.set(key, hits);
}

export function limiterSnapshot() {
  rollDay();
  return {
    day: globalDay,
    runs_today: globalCount,
    daily_cap: DAILY_GLOBAL_CAP,
    visitors_tracked: perVisitor.size,
  };
}
