// The charts of an edition page, drawn in HTML and CSS from the CSV published
// beside each one (public/atlas/<edition>/graphiques/).
//
// No chart library: the site has none, and these are bars and a grid. Each
// visual is marked aria-hidden because the HTML table printed under it in the
// text carries the same figures, and a table is what an AI assistant (and a
// screen reader) actually reads. The one exception is the grid (chart 4),
// which is itself an HTML table, and is followed by the full flat table.
//
// Every number drawn here comes from the CSV, never from a constant, so a
// chart cannot drift from the file a reader downloads.

import { getDictionary, type Locale } from '@/lib/i18n';
import { loadChartData, type CsvRow } from '@/lib/observatory-content';
import { OBSERVATORY_VERTICALS, type ObservatoryEdition } from '@/lib/observatory';

type Labels = ReturnType<typeof getDictionary>['observatory']['charts'];

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}

const num = (row: CsvRow, key: string) => Number(row[key] ?? 0);
const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

function groupBy(rows: CsvRow[], key: string): [string, CsvRow[]][] {
  const groups: [string, CsvRow[]][] = [];
  for (const row of rows) {
    const found = groups.find(([name]) => name === row[key]);
    if (found) found[1].push(row);
    else groups.push([row[key], [row]]);
  }
  return groups;
}

/** A colour swatch and its label. */
function Legend({ items }: { items: { label: string; color: string; border?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-600">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            className={`inline-block h-3 w-3 rounded-sm ${item.border ? 'border border-ink/25' : ''}`}
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/** One stacked bar. A count is written in its segment when there is room. */
function StackedBar({
  segments,
  total,
  minLabelPct = 6,
}: {
  segments: { value: number; color: string; dark?: boolean }[];
  total: number;
  minLabelPct?: number;
}) {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-md bg-bone-200">
      {segments.map((segment, i) => {
        const width = pct(segment.value, total);
        if (width === 0) return null;
        return (
          <div
            key={i}
            className={`flex items-center justify-center text-[12px] font-semibold tabular-nums ${
              segment.dark ? 'text-bone' : 'text-ink'
            }`}
            style={{ width: `${width}%`, backgroundColor: segment.color }}
          >
            {width >= minLabelPct ? segment.value : ''}
          </div>
        );
      })}
    </div>
  );
}

const VisualFrame = ({ children }: { children: React.ReactNode }) => (
  <div aria-hidden="true" className="space-y-5 rounded-card border border-ink/10 bg-bone-100 p-5 md:p-7">
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Chart 1: the shape of the answers, per tool and per series.         */
/* ------------------------------------------------------------------ */

const SHAPE_KEYS = ['liste de marques', 'une seule marque', 'aucune marque', 'refus ou autre'];
// Chart colours follow the site palette (exploration B "Foret"): forest
// greens for the data, bone for "nothing", ink for "refused", coral as the one
// warm category. Hex rather than tokens because they are inline styles.
const SHAPE_COLORS = [
  { color: '#1E5E46', dark: true },
  { color: '#8CC5A6' },
  { color: '#D1D9CC' },
  { color: '#0F2A20', dark: true },
];

function ShapeChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  return (
    <VisualFrame>
      <Legend items={t.shapes.map((label, i) => ({ label, color: SHAPE_COLORS[i].color }))} />
      {groupBy(rows, 'serie').map(([serie, group]) => (
        <div key={serie}>
          <p className="text-sm font-semibold text-ink">
            {cap(serie)}{' '}
            <span className="font-normal text-ink-500">
              · {fill(t.perTool, { n: num(group[0], 'reponses') })}
            </span>
          </p>
          <div className="mt-3 space-y-2">
            {group.map((row) => (
              <div key={row.outil} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
                <span className="text-[13px] text-ink-600">{row.outil}</span>
                <StackedBar
                  total={num(row, 'reponses')}
                  minLabelPct={5}
                  segments={SHAPE_KEYS.map((key, i) => ({ value: num(row, key), ...SHAPE_COLORS[i] }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 2: how many times a brand comes back over 4 answers.          */
/* ------------------------------------------------------------------ */

const RETURN_KEYS = ['1_sur_4', '2_sur_4', '3_sur_4', '4_sur_4'];
const RETURN_COLORS = [
  { color: '#D7EBDF' },
  { color: '#8CC5A6' },
  { color: '#26755A', dark: true },
  { color: '#164735', dark: true },
];

function ReturnChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  return (
    <VisualFrame>
      <Legend
        items={RETURN_KEYS.map((_, i) => ({
          label: fill(t.outOf4, { k: i + 1 }),
          color: RETURN_COLORS[i].color,
        }))}
      />
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.marques}>
            <p className="text-[13px] text-ink-600">
              <span className="font-semibold text-ink">{cap(row.marques)}</span> ·{' '}
              {fill(t.cases, { n: num(row, 'cas') })}
            </p>
            <div className="mt-2">
              <StackedBar
                total={num(row, 'cas')}
                segments={RETURN_KEYS.map((key, i) => ({ value: num(row, key), ...RETURN_COLORS[i] }))}
              />
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 3: in how many tools a stable brand is stable.                */
/* ------------------------------------------------------------------ */

function StableToolsChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  const max = Math.max(...rows.map((row) => num(row, 'cas')));
  return (
    <VisualFrame>
      <div className="mx-auto flex h-56 max-w-md items-end justify-around gap-4 border-b border-ink/20 px-2">
        {rows.map((row) => {
          const value = num(row, 'cas');
          return (
            <div key={row.stable_dans_n_outils} className="flex h-full w-16 flex-col items-center justify-end">
              <span className="mb-1.5 text-sm font-semibold tabular-nums text-ink">{value}</span>
              <div className="w-full rounded-t-md bg-emerald" style={{ height: `${pct(value, max)}%` }} />
            </div>
          );
        })}
      </div>
      <div className="mx-auto flex max-w-md justify-around gap-4 px-2">
        {rows.map((row) => (
          <span key={row.stable_dans_n_outils} className="w-16 text-center text-[13px] text-ink-600">
            {t.tools[num(row, 'stable_dans_n_outils') - 1]}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 4: the grid. Brands by questions, one pill per tool.          */
/* ------------------------------------------------------------------ */

const TOOLS = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'];

function pillStyle(count: number): string {
  if (count >= 3) return 'bg-emerald text-bone';
  if (count >= 1) return 'bg-[#BFE0CD] text-ink';
  return 'border border-ink/20 bg-transparent text-ink-500';
}

function Pill({ tool, count, t }: { tool: string; count: number; t: Labels }) {
  const label = fill(t.pill, { tool, n: count });
  return (
    <span
      title={label}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11.5px] font-semibold tabular-nums ${pillStyle(count)}`}
    >
      <span aria-hidden="true">{count}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

function GridChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Legend
          items={[
            { label: t.legendStable, color: '#1E5E46' },
            { label: t.legendIntermittent, color: '#BFE0CD' },
            { label: t.legendAbsent, color: 'transparent', border: true },
          ]}
        />
        <p className="text-[13px] text-ink-600">{fill(t.pillOrder, { tools: TOOLS.join(', ') })}</p>
      </div>

      {groupBy(rows, 'verticale').map(([vertical, group]) => {
        const questions = groupBy(group, 'question_id').map(([id, qRows]) => ({ id, text: qRows[0].question }));
        const brands = groupBy(group, 'marque');
        return (
          <div key={vertical}>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">{vertical}</p>
            <div className="-mx-5 mt-3 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[44rem] border-collapse text-left text-[13px] leading-snug">
                <caption className="sr-only">{vertical}</caption>
                <thead>
                  <tr className="border-b border-ink/15">
                    <th scope="col" className="w-36 py-2 pr-3 align-bottom font-semibold text-ink">
                      {t.brand}
                    </th>
                    {questions.map((q) => (
                      <th key={q.id} scope="col" className="px-2 py-2 align-bottom font-normal text-ink-600">
                        <span className="block">{q.text}</span>
                        <span className="mt-0.5 block text-[11px] tracking-wide text-ink-500">{q.id}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {brands.map(([brand, bRows]) => (
                    <tr key={brand} className="border-b border-ink/8 last:border-b-0">
                      <th scope="row" className="py-2.5 pr-3 font-semibold text-ink">
                        {brand}
                      </th>
                      {questions.map((q) => {
                        const row = bRows.find((r) => r.question_id === q.id);
                        return (
                          <td key={q.id} className="px-2 py-2.5">
                            <span className="flex gap-1">
                              {TOOLS.map((tool) => (
                                <Pill key={tool} tool={tool} count={row ? num(row, `${tool}_sur_4`) : 0} t={t} />
                              ))}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* The same figures as one flat table, in the shape of the excerpt the
          text quotes below the chart. */}
      <details className="rounded-card border border-ink/10 bg-bone-100 p-4 md:p-5">
        <summary className="cursor-pointer text-sm font-semibold text-emerald">{t.fullGrid}</summary>
        <div className="-mx-4 mt-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[13px] leading-snug">
            <thead className="bg-bone-200">
              <tr>
                {[t.category, t.brand, t.question, ...TOOLS].map((head) => (
                  <th key={head} scope="col" className="border-b border-ink/10 px-3 py-2 font-semibold text-ink">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.marque}-${row.question_id}`} className="border-b border-ink/8">
                  <td className="px-3 py-1.5 text-ink-600">{row.verticale}</td>
                  <td className="px-3 py-1.5 text-ink">{row.marque}</td>
                  <td className="px-3 py-1.5 text-ink-600">
                    {row.question} ({row.question_id})
                  </td>
                  {TOOLS.map((tool) => (
                    <td key={tool} className="px-3 py-1.5 tabular-nums text-ink-600">
                      {num(row, `${tool}_sur_4`)}/4
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 5: types of sources per category, 100% stacked columns.       */
/* ------------------------------------------------------------------ */

const SOURCE_KEYS = [
  'presse',
  'site spécialisé',
  'site de marque',
  'boutique ou distributeur',
  'santé ou institution',
  'avis clients',
  'forum',
];
const SOURCE_COLORS = [
  { color: '#164735', dark: true },
  { color: '#5FAE8A' },
  { color: '#EE9278' },
  { color: '#4E6458', dark: true },
  { color: '#AEBBA8' },
  { color: '#E2E7DE' },
  { color: '#0F2A20', dark: true },
];

function SourceTypesChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  // One category (a category page): a single horizontal bar reads better
  // than one lone column.
  if (rows.length === 1) {
    const row = rows[0];
    const classified = SOURCE_KEYS.reduce((sum, key) => sum + num(row, key), 0);
    return (
      <VisualFrame>
        <Legend
          items={t.sourceTypes.map((label, i) => ({
            label,
            color: SOURCE_COLORS[i].color,
            border: i === 5,
          }))}
        />
        <div>
          <p className="text-[13px] text-ink-600">
            <span className="font-semibold text-ink">{row.verticale}</span> ·{' '}
            {fill(t.classified, { n: classified })} · {fill(t.unclassified, { n: num(row, 'non classé') })}
          </p>
          <div className="mt-2">
            <StackedBar
              total={classified}
              minLabelPct={4}
              segments={SOURCE_KEYS.map((key, i) => ({ value: num(row, key), ...SOURCE_COLORS[i] }))}
            />
          </div>
        </div>
      </VisualFrame>
    );
  }
  return (
    <VisualFrame>
      <Legend
        items={t.sourceTypes.map((label, i) => ({
          label,
          color: SOURCE_COLORS[i].color,
          border: i === 5,
        }))}
      />
      <div className="grid grid-cols-3 gap-4 md:gap-10">
        {rows.map((row) => {
          const classified = SOURCE_KEYS.reduce((sum, key) => sum + num(row, key), 0);
          return (
            <div key={row.verticale} className="flex flex-col items-center">
              <div className="flex h-72 w-full max-w-[9rem] flex-col-reverse overflow-hidden rounded-md border border-ink/10">
                {SOURCE_KEYS.map((key, i) => {
                  const value = num(row, key);
                  const height = pct(value, classified);
                  if (height === 0) return null;
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-center text-[12px] font-semibold tabular-nums ${
                        SOURCE_COLORS[i].dark ? 'text-bone' : 'text-ink'
                      }`}
                      style={{ height: `${height}%`, backgroundColor: SOURCE_COLORS[i].color }}
                    >
                      {height >= 6 ? value : ''}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-center text-[13px] font-semibold leading-tight text-ink">{row.verticale}</p>
              <p className="mt-1 text-center text-[12px] leading-tight text-ink-600">
                {fill(t.classified, { n: classified })}
              </p>
              <p className="mt-0.5 text-center text-[12px] leading-tight text-ink-500">
                {fill(t.unclassified, { n: num(row, 'non classé') })}
              </p>
            </div>
          );
        })}
      </div>
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 7: when the brand's own site is a source.                     */
/* ------------------------------------------------------------------ */

function OwnSiteChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  return (
    <VisualFrame>
      <div className="space-y-2.5">
        {rows.map((row) => {
          const own = num(row, 'reponses_citant_son_site');
          const total = num(row, 'reponses_qui_la_citent_avec_sources');
          return (
            <div key={row.marque} className="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-3">
              <span className="text-[13px] font-semibold text-ink">{row.marque}</span>
              <div className="h-5 overflow-hidden rounded bg-bone-300/70">
                <div className="h-full rounded bg-emerald" style={{ width: `${pct(own, total)}%` }} />
              </div>
              <span className="text-right text-[12.5px] tabular-nums text-ink-600">
                {fill(t.fraction, { a: own, b: total })}
              </span>
            </div>
          );
        })}
      </div>
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 8: the ten most cited brands per category, out of 64.         */
/* ------------------------------------------------------------------ */

function TopBrandsChart({ rows, t }: { rows: CsvRow[]; t: Labels }) {
  const single = groupBy(rows, 'verticale').length === 1;
  return (
    <VisualFrame>
      <div className={single ? 'max-w-xl' : 'grid gap-8 md:grid-cols-3 md:gap-6'}>
        {groupBy(rows, 'verticale').map(([vertical, group]) => {
          const total = num(group[0], 'reponses');
          const half = total / 2;
          return (
            <div key={vertical}>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">{vertical}</p>
              <div className="relative mt-3 grid grid-cols-[7.5rem_1fr] gap-x-2 gap-y-1.5">
                {group.map((row) => {
                  const value = num(row, 'reponses_qui_citent');
                  return (
                    <div key={row.marque} className="contents">
                      <span className="truncate text-[12.5px] text-ink">{row.marque}</span>
                      <div className="relative h-5">
                        <div
                          className={`h-full rounded ${value > half ? 'bg-emerald' : 'bg-[#8CC5A6]'}`}
                          style={{ width: `${pct(value, total)}%` }}
                        />
                        <span
                          className="absolute top-1/2 -translate-y-1/2 pl-1 text-[11.5px] font-semibold tabular-nums text-ink"
                          style={{ left: `${pct(value, total)}%` }}
                        >
                          {value}
                        </span>
                        {/* The half-way mark. */}
                        <span className="absolute inset-y-[-3px] left-1/2 border-l border-dashed border-ink/50" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 pl-[8rem] text-[11.5px] text-ink-500">
                <span className="ml-[calc(50%-0.25rem)] inline-block">↑ {fill(t.half, { n: half })}</span>
              </p>
            </div>
          );
        })}
      </div>
    </VisualFrame>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The rows of chart `id`, all of them, or only one category's when `vertical`
 * (a French category slug) is given. The CSVs name the category in a
 * `verticale` column, in French.
 */
function chartRows(edition: ObservatoryEdition, id: string, vertical: string | null): CsvRow[] {
  const rows = loadChartData(edition, id);
  if (!vertical) return rows;
  const found = OBSERVATORY_VERTICALS.find((v) => v.slug.fr === vertical);
  if (!found) throw new Error(`Observatory: unknown category "${vertical}"`);
  const label = getDictionary('fr').observatory.verticals[found.id];
  const kept = rows.filter((row) => row.verticale === label);
  if (kept.length === 0) throw new Error(`Observatory: chart ${id} has no rows for "${label}"`);
  return kept;
}

/** The visual for chart `id` (the data file's prefix), or nothing for a table-only figure. */
export default function ObservatoryChart({
  edition,
  id,
  lang,
  vertical = null,
}: {
  edition: ObservatoryEdition;
  id: string;
  lang: Locale;
  /** A French category slug: draw that category only. */
  vertical?: string | null;
}) {
  const t = getDictionary(lang).observatory.charts;
  switch (id) {
    case 'g1':
      return <ShapeChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g2':
      return <ReturnChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g3':
      return <GridChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g4':
      return <StableToolsChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g5':
      return <SourceTypesChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g7':
      return <TopBrandsChart rows={chartRows(edition, id, vertical)} t={t} />;
    case 'g8':
      return <OwnSiteChart rows={chartRows(edition, id, vertical)} t={t} />;
    // g6 is a table in the text, with no chart above it.
    default:
      return null;
  }
}
