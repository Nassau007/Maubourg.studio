// Diagrams for the five service pages.
//
// Inline SVG rather than images: no asset to license, nothing that looks like
// stock photography, and the text inside them comes from the dictionary so a
// French page gets French labels. Each vertical gets a different form on
// purpose - a funnel, a chain, a loop, a stack, a rail - so the five pages
// argue in visibly different shapes while sharing one palette.
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
/* Conversion: the measurement chain, one link highlighted             */
/* ------------------------------------------------------------------ */

export function MeasureChain({ chain }: { chain: readonly { step: string; note: string }[] }) {
  return (
    <ol className="relative space-y-0">
      {chain.map((link, i) => {
        const isBreak = i === 1; // consent: the link that is usually wrong
        return (
          <li key={link.step} className="relative flex gap-4 pb-7 last:pb-0">
            {i < chain.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[11px] top-6 h-full w-px bg-ink/15"
              />
            )}
            <span
              aria-hidden
              className={[
                'relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                isBreak
                  ? 'border-emerald bg-emerald text-bone'
                  : 'border-ink/20 bg-bone-100 text-ink-600',
              ].join(' ')}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{link.step}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-ink-500">{link.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Acquisition: a closed loop, because that is the argument            */
/* ------------------------------------------------------------------ */

export function AcquisitionLoop({ nodes }: { nodes: readonly Step[] }) {
  const count = nodes.length;
  const cx = 220;
  const cy = 165;
  const r = 118;

  const points = nodes.map((node, i) => {
    // Start at the top and go clockwise.
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { ...node, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
      <svg
        viewBox="0 0 440 330"
        className="h-auto w-full"
        role="img"
        aria-label={nodes.map((n) => n.label).join(' → ')}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="text-ink/25"
        />
        {points.map((p, i) => {
          const next = points[(i + 1) % count];
          // Midpoint pushed outward gives the connector a slight arc.
          const mx = (p.x + next.x) / 2;
          const my = (p.y + next.y) / 2;
          const bulge = 1.14;
          const qx = cx + (mx - cx) * bulge;
          const qy = cy + (my - cy) * bulge;
          return (
            <path
              key={`arc-${p.label}`}
              d={`M ${p.x} ${p.y} Q ${qx} ${qy} ${next.x} ${next.y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-emerald/40"
            />
          );
        })}
        {points.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r="30"
              fill="currentColor"
              className={i === 2 ? 'text-emerald' : 'text-ink'}
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              className="fill-bone text-[11px] font-semibold"
              style={{ fontSize: 11 }}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      <ul className="space-y-3">
        {nodes.map((node, i) => (
          <li key={node.label} className="flex gap-3">
            <span
              aria-hidden
              className={[
                'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                i === 2 ? 'bg-emerald' : 'bg-ink/30',
              ].join(' ')}
            />
            <p className="text-[13px] leading-snug text-ink-600">
              <span className="font-semibold text-ink">{node.label}.</span> {node.note}
            </p>
          </li>
        ))}
      </ul>
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

/* ------------------------------------------------------------------ */
/* Foundations: a numbered rail, phases running left to right          */
/* ------------------------------------------------------------------ */

export function PhaseTimeline({
  items,
}: {
  items: readonly { n: string; title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 md:grid-cols-5">
      {items.map((item) => (
        <li key={item.n} className="bg-bone-100 p-5">
          <span className="font-display text-2xl font-semibold text-emerald">{item.n}</span>
          <h3 className="mt-2 text-sm font-semibold text-ink">{item.title}</h3>
          <p className="mt-1.5 text-[12.5px] leading-snug text-ink-600">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
