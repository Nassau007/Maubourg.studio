// Where a finished run waits for an email address.
//
// The whole point of the gate is that the full result never reaches the
// browser before the visitor identifies themselves, so it is held here, in
// process memory, keyed by a random token.
//
// IN-MEMORY, DELIBERATELY. It resets on every redeploy and it is not shared
// between instances: two Railway replicas would each hold half the tokens and
// roughly half of all reveals would come back TOKEN_EXPIRED. Railway runs a
// single instance today (one volume, one container). If that ever changes,
// this needs Redis or a table before the second instance starts.

import { randomUUID } from 'node:crypto';
import { TOKEN_TTL_MS } from './config';
import type { StoredRun } from './types';

const runs = new Map<string, StoredRun>();

function sweep(now: number): void {
  // Array.from rather than iterating the Map directly: this repo's tsconfig
  // targets ES5, where a for..of over a Map does not compile.
  Array.from(runs.keys()).forEach((token) => {
    const run = runs.get(token);
    if (run && run.expiresAt <= now) runs.delete(token);
  });
}

export function putRun(run: Omit<StoredRun, 'createdAt' | 'expiresAt'>): string {
  const now = Date.now();
  sweep(now);
  const token = randomUUID();
  runs.set(token, { ...run, createdAt: now, expiresAt: now + TOKEN_TTL_MS });
  return token;
}

/**
 * Single use: a successful take removes the token, so replaying it returns
 * TOKEN_EXPIRED rather than a second copy of the result.
 */
export function takeRun(token: string): StoredRun | null {
  const now = Date.now();
  sweep(now);
  const run = runs.get(token);
  if (!run) return null;
  runs.delete(token);
  if (run.expiresAt <= now) return null;
  return run;
}

/** Held tokens, for the metrics endpoint. */
export function heldRunCount(): number {
  sweep(Date.now());
  return runs.size;
}
