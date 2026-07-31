// One place that turns a DemoError into an HTTP response, so both routes fail
// the same way: the code the client switches on, a message already localized
// into the site language the visitor is browsing in, and never a stack trace.

import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/i18n';
import { countError } from './metrics';
import { DemoError, HTTP_STATUS, type ErrorCode } from './types';

export function demoErrorMessages(locale: string) {
  return getDictionary(locale).agentDemo.errors;
}

export function fail(code: ErrorCode, locale: string) {
  countError(code);
  const message = demoErrorMessages(locale)[code];
  return NextResponse.json({ ok: false, code, message }, { status: HTTP_STATUS[code] });
}

/**
 * Anything thrown inside a route. A DemoError carries its own code; anything
 * else is a bug and becomes MODEL_ERROR rather than leaking its message.
 */
export function failFrom(err: unknown, locale: string) {
  if (err instanceof DemoError) {
    console.error(`[agent-demo] ${err.code}: ${err.message}`);
    return fail(err.code, locale);
  }
  console.error('[agent-demo] unexpected error:', err);
  return fail('MODEL_ERROR', locale);
}
