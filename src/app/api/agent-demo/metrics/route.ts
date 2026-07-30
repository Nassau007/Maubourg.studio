// GET /api/agent-demo/metrics?token=… — the whole analytics story for this
// page. Counters held in process memory: runs, reveals, the run-to-reveal
// ratio that decides GATE_MODE, and errors by code. No cookies, no client-side
// tracking, no third party, nothing to consent to.
//
// It counts events, never content: no submitted URL, no email address and no
// page text passes through here. The numbers reset on redeploy; the per-event
// log lines in the Railway logs are the durable record.
//
// Unset AGENT_DEMO_METRICS_TOKEN and the endpoint 404s, so a missing
// configuration fails closed rather than publishing the numbers.

import { NextResponse } from 'next/server';
import { snapshot } from '@/lib/agent-demo/metrics';
import { limiterSnapshot } from '@/lib/agent-demo/rateLimit';
import { heldRunCount } from '@/lib/agent-demo/store';
import { GATE_MODE } from '@/lib/agent-demo/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const expected = process.env.AGENT_DEMO_METRICS_TOKEN;
  if (!expected) return new NextResponse('Not found', { status: 404 });

  const url = new URL(request.url);
  const provided =
    url.searchParams.get('token') ||
    (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');

  if (provided !== expected) return new NextResponse('Not found', { status: 404 });

  return NextResponse.json({
    gate_mode: GATE_MODE,
    ...snapshot(),
    tokens_held: heldRunCount(),
    limiter: limiterSnapshot(),
  });
}
