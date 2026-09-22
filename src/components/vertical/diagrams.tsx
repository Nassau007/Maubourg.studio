// Diagrams for the three service pages.
//
// Inline SVG rather than images: no asset to license, nothing that looks like
// stock photography, and the text inside them comes from the dictionary so a
// French page gets French labels. Each page gets a different form on purpose -
// a funnel, a chain, a workflow - so they argue in visibly different shapes
// while sharing one palette.
//
// Colour comes from the Tailwind tokens via currentColor where possible, so
// these stay correct if the palette moves.

type Step = { label: string; note: string };

/* ------------------------------------------------------------------ */
/* Conversion: a funnel that narrows, because that is the argument     */
/* ------------------------------------------------------------------ */

export function FunnelDiagram({ steps }: { steps: readonly Step[] }) {
  // Widths shrink down the funnel. Deliberately not labelled with percentages:
  // inventing a drop-off rate for a store we have not audited would be a
  // number the reader could take as ours.
  const widths = [100, 78, 52, 38, 26];

  return (
    <div className="space-y-2.5">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.label} className="flex items-center gap-4">
            <div className="w-full max-w-[62%] sm:max-w-[58%]">
              <div
                className={[
                  'flex h-14 items-center rounded-lg px-4 text-sm font-semibold transition-colors',
                  isLast
                    ? 'bg-emerald text-bone'
                    : i === 0
                      ? 'bg-ink text-bone'
                      : 'bg-bone-300/80 text-ink',
                ].join(' ')}
                style={{ width: `${widths[i] ?? 24}%`, minWidth: '7.5rem' }}
              >
                {step.label}
              </div>
            </div>
            <p className="flex-1 text-[13px] leading-snug text-ink-500">{step.note}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GEO: a retrieval chain, with the two steps you can move marked      */
/* ------------------------------------------------------------------ */

export function RetrievalChain({
  query,
  steps,
  influenceLabel,
}: {
  query: string;
  steps: readonly { step: string; note: string; influence: string }[];
  influenceLabel: string;
}) {
  return (
    <div>
      <div className="rounded-2xl rounded-bl-sm border border-ink/12 bg-ink px-5 py-4 text-bone shadow-[0_18px_40px_-28px_rgba(20,20,15,0.55)]">
        <p className="text-[15px] font-medium leading-snug">{query}</p>
      </div>

      <div className="mt-6 space-y-3">
        {steps.map((step, i) => {
          const movable = i === 1 || i === 2;
          return (
            <div
              key={step.step}
              className={[
                'flex flex-col gap-2 rounded-card border p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6',
                movable ? 'border-emerald/35 bg-emerald-50/60' : 'border-ink/10 bg-bone-100',
              ].join(' ')}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{step.step}</p>
                <p className="mt-1 text-[13px] leading-snug text-ink-500">{step.note}</p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  {influenceLabel}
                </p>
                <p
                  className={[
                    'text-[13px] font-semibold',
                    movable ? 'text-emerald' : 'text-ink-500',
                  ].join(' ')}
                >
                  {step.influence}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Agents: a rail of stages with the guardrail sitting under it        */
/* ------------------------------------------------------------------ */

export function AgentWorkflow({ nodes }: { nodes: readonly Step[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[42rem] items-stretch gap-3">
        {nodes.map((node, i) => {
          const isGuard = i === 3;
          return (
            <div key={node.label} className="flex flex-1 items-stretch gap-3">
              <div
                className={[
                  'flex-1 rounded-card border p-4',
                  isGuard
                    ? 'border-signal-dark/50 bg-signal/25'
                    : 'border-ink/10 bg-bone-100',
                ].join(' ')}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{node.label}</p>
                <p className="mt-1 text-[12px] leading-snug text-ink-600">{node.note}</p>
              </div>
              {i < nodes.length - 1 && (
                <span aria-hidden className="flex items-center text-ink/30">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
