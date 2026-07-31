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
import { PAGE_STORE_MAX_CHARS, PAGE_TTL_MS, TOKEN_TTL_MS } from './config';
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

/* ------------------------------------------------------------------ */
/* Rendered pages                                                      */
/* ------------------------------------------------------------------ */

/**
 * The rendered page is the reward, so unlike a run it is NOT single use: the
 * visitor previews it in an iframe, opens it in a tab and downloads it, which
 * is three reads of the same token. It expires on a timer instead.
 *
 * This is the one thing in the demo that is big. A run holds a few kilobytes
 * of JSON; a rendered page holds a whole HTML document. Same in-memory store,
 * so it carries a byte ceiling and drops the oldest pages when it is reached
 * rather than growing until the container is killed. The volume is not
 * involved and nothing is written to disk: a store's page is not ours to keep.
 */
type StoredPage = {
  html: string;
  /** Text of the ring label drawn around the substituted block, in the page's language. */
  label: string;
  filename: string;
  createdAt: number;
  expiresAt: number;
};

const pages = new Map<string, StoredPage>();

function pageBytes(): number {
  let total = 0;
  Array.from(pages.keys()).forEach((token) => {
    const page = pages.get(token);
    if (page) total += page.html.length;
  });
  return total;
}

function sweepPages(now: number): void {
  Array.from(pages.keys()).forEach((token) => {
    const page = pages.get(token);
    if (page && page.expiresAt <= now) pages.delete(token);
  });

  while (pageBytes() > PAGE_STORE_MAX_CHARS && pages.size > 1) {
    let oldest = '';
    let oldestAt = Infinity;
    Array.from(pages.keys()).forEach((token) => {
      const page = pages.get(token);
      if (page && page.createdAt < oldestAt) {
        oldestAt = page.createdAt;
        oldest = token;
      }
    });
    if (!oldest) break;
    pages.delete(oldest);
  }
}

export function putPage(page: { html: string; label: string; filename: string }): string {
  const now = Date.now();
  sweepPages(now);
  const token = randomUUID();
  pages.set(token, { ...page, createdAt: now, expiresAt: now + PAGE_TTL_MS });
  sweepPages(now);
  return token;
}

export function getPage(token: string): StoredPage | null {
  const now = Date.now();
  sweepPages(now);
  const page = pages.get(token);
  if (!page || page.expiresAt <= now) return null;
  return page;
}

/** Held pages and their size, for the metrics endpoint. */
export function heldPageStats(): { pages: number; chars: number } {
  sweepPages(Date.now());
  return { pages: pages.size, chars: pageBytes() };
}
