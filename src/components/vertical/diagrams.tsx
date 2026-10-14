// Diagrams for the service pages.
//
// Inline SVG rather than images: no asset to license, nothing that looks like
// stock photography, and the text inside them comes from the dictionary so a
// French page gets French labels. Each page gets a different form on purpose -
// a chain, a workflow - so they argue in visibly different shapes while
// sharing one palette.
//
// Colour comes from the Tailwind tokens via currentColor where possible, so
// these stay correct if the palette moves.

type Step = { label: string; note: string };

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
      <div className="rounded-2xl rounded-bl-sm bg-ink px-5 py-4 text-bone">
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
                movable ? 'border-signal bg-signal-50' : 'border-ink/10 bg-bone',
              ].join(' ')}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{step.step}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-ink-600">{step.note}</p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-[12px] font-medium text-ink-600">
                  {influenceLabel}
                </p>
                <p
                  className={[
                    'text-[13px] font-semibold',
                    movable ? 'text-ink' : 'text-ink-600',
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
                    ? 'border-signal bg-signal-50'
                    : 'border-ink/10 bg-bone',
                ].join(' ')}
              >
                <p className="figure text-[13px] font-bold text-ink-600">
                  {i + 1}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{node.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-ink-600">{node.note}</p>
              </div>
              {i < nodes.length - 1 && (
                <span aria-hidden className="flex items-center text-ink-500">
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
