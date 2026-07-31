// Server-side counters. This is the whole of the analytics on this page.
//
// No GA4, no consent banner, no cookies, no client-side tracking: the one
// number this feature has to produce is the run-to-reveal ratio, which decides
// whether GATE_MODE stays on 'full'. A tag manager and a consent dialog to
// answer one ratio would cost the page more conversions than the ratio is
// worth.
//
// Counters live in process memory and reset on redeploy, like everything else
// here. Each run and each reveal also prints one line to the Railway logs, so
// the history survives a restart even though the totals do not. No URL, no
// email address and no page content is ever counted or logged.

import { GATE_MODE } from './config';
import type { ErrorCode } from './types';

/**
 * With the gate open a run and a result are the same event: the reveal route is
 * never called, so `reveals` stays at zero and a ratio computed from it would
 * read as a total collapse in conversion rather than as a mode with no second
 * step. It is reported as null instead, and `results_delivered` carries the
 * number that still means something.
 */
const GATE_OPEN = GATE_MODE === 'open';

type Counters = {
  since: string;
  runs: number;
  renders: number;
  reveals: number;
  errors: Record<string, number>;
};

const counters: Counters = {
  since: new Date().toISOString(),
  runs: 0,
  renders: 0,
  reveals: 0,
  errors: {},
};

export function countRun(meta: {
  platform: string;
  language: string;
  confidence: string;
  ms: number;
  /** Whether the rewrite could be put back into the page. The one number that says
   *  how often the main deliverable actually gets produced. */
  rendered: boolean;
}) {
  counters.runs += 1;
  if (meta.rendered) counters.renders += 1;
  console.log(
    `[agent-demo] run ok gate=${GATE_MODE} platform=${meta.platform} lang=${meta.language} confidence=${meta.confidence} rendered=${meta.rendered} ms=${meta.ms} runs=${counters.runs} renders=${counters.renders} reveals=${counters.reveals}`,
  );
}

export function countReveal(consent: boolean) {
  counters.reveals += 1;
  const ratio = counters.runs > 0 ? (counters.reveals / counters.runs).toFixed(2) : 'n/a';
  console.log(
    `[agent-demo] reveal ok consent=${consent} runs=${counters.runs} reveals=${counters.reveals} ratio=${ratio}`,
  );
}

export function countError(code: ErrorCode | 'BAD_REQUEST') {
  counters.errors[code] = (counters.errors[code] || 0) + 1;
  console.log(`[agent-demo] error code=${code} count=${counters.errors[code]}`);
}

export function snapshot() {
  return {
    ...counters,
    errors: { ...counters.errors },
    // How many visitors walked away with the whole result. Equal to runs while
    // the gate is open, since finishing a run is receiving it.
    results_delivered: GATE_OPEN ? counters.runs : counters.reveals,
    reveal_rate:
      GATE_OPEN || counters.runs === 0
        ? null
        : Number((counters.reveals / counters.runs).toFixed(3)),
    render_rate: counters.runs > 0 ? Number((counters.renders / counters.runs).toFixed(3)) : null,
    // Stated rather than inferred: with the gate open the demo captures no
    // leads at all, and this endpoint is the only place that would show it.
    leads_captured: GATE_OPEN ? 0 : counters.reveals,
  };
}
