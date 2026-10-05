'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { descriptionWordsLabel, fill } from '@/lib/agent-demo/checkText';
import type { Checks, FactPlace, ProductBlock } from '@/lib/agent-demo/types';

// The four states of the page. 'gate' is only reached when the server is
// running an email gate. Under 'rewrite-only' (live) the free half is already
// on screen in 'gate': the verdict, the gaps and the three checks. The ask sits
// under it and names what it opens. After the reveal, 'result' shows the same
// free half followed by the deliverables. With the gate open the run goes
// straight from 'running' to 'result' and no form appears.
type Phase = 'idle' | 'running' | 'gate' | 'result';

type Gap = { label: string; detail: string };

type RunPayload = {
  ok: true;
  // Absent when the server is running no gate: there is no second step.
  token?: string;
  product_name: string;
  teaser: string;
  gaps_count: number;
  platform: string;
  detected_language: string;
  confidence: 'high' | 'low';
  // Whether the rebuilt page exists. Sent before the email so the ask can name
  // the reward, and false whenever the substitution was not certain.
  render_available: boolean;
  // 'inserted' when the page HTML had no description to replace and the new
  // one was added under the title. The labels follow it: never "in place of"
  // for a block that replaced nothing.
  render_mode?: 'substituted' | 'inserted' | null;
  // Present when the server runs GATE_MODE 'rewrite-only' or 'open'. The client
  // reads the response rather than importing the constant, so the switch stays
  // a server decision and the bundle carries no copy of it.
  verdict?: string;
  gaps?: Gap[];
  checks?: Checks;
  // Present only with no gate: the whole result arrives with the run.
  rewrite?: string;
  product_block?: ProductBlock;
  before_excerpt?: string;
  preview_url?: string | null;
  download_url?: string | null;
};

type Result = {
  verdict: string;
  before_excerpt: string;
  rewrite: string;
  gaps: Gap[];
  // Optional on the client: the honeypot answer carries neither, and a result
  // without them must still render.
  checks?: Checks;
  product_block?: ProductBlock;
  preview_url: string | null;
  download_url: string | null;
};

const PLACE_DOT: Record<FactPlace, string> = {
  text: 'bg-emerald',
  meta: 'bg-amber-500',
  absent: 'bg-red-600',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AgentDemo({
  dict,
  lang,
  privacyHref,
}: {
  dict: Dictionary['agentDemo'];
  lang: Locale;
  privacyHref: string;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [url, setUrl] = useState('');
  const [step, setStep] = useState(0);
  const [run, setRun] = useState<RunPayload | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [expired, setExpired] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState(false);
  // Whether a result was paid for with an email address, which is the only
  // case where we may say a copy is on its way to an inbox.
  const [emailedCopy, setEmailedCopy] = useState(false);
  const gateRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Progress text on a timer. Real stages, not a fake percentage: the run is a
  // single request and inventing a progress bar for it would be theatre.
  useEffect(() => {
    if (phase !== 'running') return;
    setStep(0);
    const a = setTimeout(() => setStep(1), 5_000);
    const b = setTimeout(() => setStep(2), 14_000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'gate') gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (phase === 'result') resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [phase]);

  async function startRun(target: string) {
    setError('');
    setExpired(false);
    setResult(null);
    setPhase('running');

    try {
      const res = await fetch('/api/agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target, locale: lang }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok || !payload?.ok) {
        setError(payload?.message || dict.errors.MODEL_ERROR);
        setPhase('idle');
        return;
      }

      const run = payload as RunPayload;
      setRun(run);

      // No gate on the server: the result is already here, so show it. The
      // presence of the rewrite is the signal, not a flag the client keeps.
      if (typeof run.rewrite === 'string' && run.verdict && run.gaps) {
        setEmailedCopy(false);
        setResult({
          verdict: run.verdict,
          before_excerpt: run.before_excerpt ?? '',
          rewrite: run.rewrite,
          gaps: run.gaps,
          checks: run.checks,
          product_block: run.product_block,
          preview_url: run.preview_url ?? null,
          download_url: run.download_url ?? null,
        });
        setPhase('result');
        return;
      }

      setPhase('gate');
    } catch {
      setError(dict.errors.MODEL_ERROR);
      setPhase('idle');
    }
  }

  function handleRun(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = url.trim();
    if (!target) {
      setError(dict.errors.INVALID_URL);
      return;
    }
    void startRun(target);
  }

  async function handleReveal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!run) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();

    setFieldError('');
    setError('');

    // A gate before the request, not validation: the server re-checks both and
    // stays the only authority.
    if (!name) {
      setFieldError(dict.gate.name);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setFieldError(dict.errors.INVALID_EMAIL);
      return;
    }

    setRevealing(true);
    try {
      const res = await fetch('/api/agent-demo/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: run.token,
          name,
          email,
          consent: data.consent === 'on',
          company: data.company || '',
          locale: lang,
        }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok || !payload?.ok) {
        if (payload?.code === 'TOKEN_EXPIRED') setExpired(true);
        setError(payload?.message || dict.errors.MODEL_ERROR);
        setRevealing(false);
        return;
      }

      setEmailedCopy(true);
      setResult(payload as Result);
      setPhase('result');
    } catch {
      setError(dict.errors.MODEL_ERROR);
    } finally {
      setRevealing(false);
    }
  }

  function reset() {
    setPhase('idle');
    setRun(null);
    setResult(null);
    setError('');
    setExpired(false);
    setCopied(false);
    setCopiedBlock(false);
    setEmailedCopy(false);
  }

  async function copyRewrite() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.rewrite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2_500);
    } catch {
      setCopied(false);
    }
  }

  async function copyBlock() {
    if (!result?.product_block) return;
    try {
      await navigator.clipboard.writeText(result.product_block.snippet);
      setCopiedBlock(true);
      setTimeout(() => setCopiedBlock(false), 2_500);
    } catch {
      setCopiedBlock(false);
    }
  }

  const gapsLine =
    run && run.gaps_count === 1
      ? dict.gate.gapsFoundOne
      : dict.gate.gapsFound.replace('{n}', String(run?.gaps_count ?? 0));

  // The rebuilt page added the new description rather than replacing one.
  const inserted = run?.render_mode === 'inserted';

  /* ---------------------------------------------------------------- */
  /* The free half: verdict, gaps, the three checks                   */
  /* ---------------------------------------------------------------- */

  const c = dict.checks;

  function renderChecks(checks: Checks) {
    const cr = checks.crawler;
    const rb = checks.robots;
    const st = checks.structured;
    const facts: { key: 'name' | 'price' | 'availability' | 'description'; place: FactPlace }[] = [
      { key: 'name', place: cr.name },
      { key: 'price', place: cr.price },
      { key: 'availability', place: cr.availability },
      { key: 'description', place: cr.description },
    ];
    const anyAbsent = facts.some((f) => f.place === 'absent');

    const botRows = (kind: 'answer' | 'training') =>
      rb.bots
        .filter((b) => b.kind === kind)
        .map((b) => (
          <li key={b.bot} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-1.5">
            <span className="font-mono text-[13px] text-ink">{b.bot}</span>
            <span className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${
                  b.allowed ? 'text-emerald' : 'text-red-700'
                }`}
              >
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${b.allowed ? 'bg-emerald' : 'bg-red-600'}`}
                />
                {b.allowed ? c.robots.allowed : c.robots.blocked}
              </span>
              {!b.allowed && b.rule && (
                <span className="block text-[12px] text-ink-500">
                  {c.robots.byRule} <code className="font-mono">{b.rule}</code>
                </span>
              )}
            </span>
          </li>
        ));

    return (
      <div>
        <span className="eyebrow">{c.heading}</span>
        <p className="mt-2 text-sm text-ink-500">{c.intro}</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* What an AI crawler sees */}
          <div className="card">
            <h3 className="font-display text-lg font-semibold text-ink">{c.crawler.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{c.crawler.intro}</p>
            <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
              {facts.map((f) => (
                <div key={f.key} className="flex items-start justify-between gap-3 py-2.5">
                  <dt className="text-[13.5px] font-semibold text-ink">{c.crawler.facts[f.key]}</dt>
                  <dd className="flex items-start gap-2 text-right text-[13px] text-ink-600">
                    <span>
                      {c.crawler.places[f.place]}
                      {f.key === 'description' && f.place !== 'absent' && (
                        <span className="block text-[12px] text-ink-500">
                          {descriptionWordsLabel(c, cr.descriptionWords)}
                        </span>
                      )}
                    </span>
                    <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${PLACE_DOT[f.place]}`} />
                  </dd>
                </div>
              ))}
            </dl>
            {anyAbsent && (
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">{c.crawler.absentNote}</p>
            )}
          </div>

          {/* AI bots and robots.txt */}
          <div className="card">
            <h3 className="font-display text-lg font-semibold text-ink">{c.robots.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{c.robots.intro}</p>
            {rb.status === 'read' ? (
              <>
                <p className="mt-3 break-words text-[12px] text-ink-500">
                  {fill(c.robots.fileRead, { host: rb.host })}
                </p>
                <p className="mt-4 text-[13px] font-semibold text-ink">{c.robots.answerGroup}</p>
                <ul className="mt-1 divide-y divide-ink/10 border-y border-ink/10">{botRows('answer')}</ul>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">{c.robots.answerNote}</p>
                <p className="mt-4 text-[13px] font-semibold text-ink">{c.robots.trainingGroup}</p>
                <ul className="mt-1 divide-y divide-ink/10 border-y border-ink/10">{botRows('training')}</ul>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">{c.robots.trainingNote}</p>
              </>
            ) : (
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink">
                {rb.status === 'missing'
                  ? fill(c.robots.missing, { status: rb.httpStatus ?? 404 })
                  : fill(c.robots.unreadable, {
                      reason: rb.httpStatus
                        ? fill(c.robots.reasonStatus, { status: rb.httpStatus })
                        : c.robots.reasonNoAnswer,
                    })}
              </p>
            )}
            <p className="mt-4 border-t border-ink/10 pt-3 text-[12px] italic leading-relaxed text-ink-500">
              {c.robots.firewall}
            </p>
          </div>

          {/* Product structured data */}
          <div className="card">
            <h3 className="font-display text-lg font-semibold text-ink">{c.structured.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{c.structured.intro}</p>
            {st.status === 'found' ? (
              <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                {st.fields.map((f) => (
                  <div key={f.field} className="flex items-center justify-between gap-3 py-2">
                    <dt className="text-[13.5px] text-ink">{c.structured.fields[f.field]}</dt>
                    <dd
                      className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${
                        f.present ? 'text-emerald' : 'text-red-700'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${f.present ? 'bg-emerald' : 'bg-red-600'}`}
                      />
                      {f.present ? c.structured.present : c.structured.missing}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink">{c.structured[st.status]}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderDiagnosis(verdict: string, gaps: Gap[], checks?: Checks) {
    return (
      <div className="space-y-8">
        {run?.confidence === 'low' && (
          <p className="rounded-xl border border-ink/10 bg-bone-200 px-4 py-3 text-sm text-ink-600">
            {dict.result.lowConfidence}
          </p>
        )}

        {/* Verdict, largest text on the result: diagnosis before solution */}
        <div>
          <span className="eyebrow">{dict.result.verdictLabel}</span>
          <p className="mt-3 font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
            {verdict}
          </p>
        </div>

        <div>
          <span className="eyebrow">{dict.result.gapsLabel}</span>
          <ul className="mt-4 space-y-3">
            {gaps.map((g) => (
              <li key={g.label} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden />
                <p className="text-sm leading-relaxed text-ink-600">
                  <span className="font-semibold text-ink">{g.label}.</span> {g.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {checks && renderChecks(checks)}
      </div>
    );
  }

  /* ---------------------------------------------------------------- */

  return (
    <div className="mt-10">
      {/* URL form — visible until a result is on screen */}
      {phase !== 'result' && (
        <form onSubmit={handleRun} noValidate className="max-w-xl">
          <label htmlFor="demo-url" className="field-label">
            {dict.form.label}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="demo-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="off"
              className="field flex-1"
              placeholder={dict.form.placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={phase === 'running' || phase === 'gate'}
            />
            <button
              type="submit"
              disabled={phase === 'running' || phase === 'gate'}
              className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === 'running' ? dict.form.running : dict.form.submit}
            </button>
          </div>
          <p className="mt-3 text-sm text-ink-500">{dict.form.note}</p>
          <p className="mt-1 text-xs text-ink-500">{dict.form.privacy}</p>

          {error && phase !== 'gate' && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
        </form>
      )}

      {/* Loading */}
      {phase === 'running' && (
        <div className="mt-8 flex max-w-xl items-center gap-3 rounded-card border border-ink/10 bg-bone-100 px-5 py-4">
          <span
            className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald"
            aria-hidden
          />
          <p className="text-sm text-ink-600" aria-live="polite">
            {dict.loading.steps[step]}
          </p>
        </div>
      )}

      {/* Gate. Under 'rewrite-only' the free half is on screen first and the
          ask sits under it, naming what it opens. Under 'full' only the
          product name and a teaser clause are known here. */}
      {phase === 'gate' && run && (
        <div ref={gateRef} className="mt-10 scroll-mt-24 space-y-10">
          {run.verdict && run.gaps && renderDiagnosis(run.verdict, run.gaps, run.checks)}

          <div
            className="max-w-2xl rounded-card border border-ink/10 bg-bone-100 p-6 shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-sm text-bone">
                ✓
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink">{dict.gate.ready}</h2>
            </div>

            {run.verdict ? (
              <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5">
                {dict.gate.whatOpens.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5">
                <div>
                  <dt className="field-label">{dict.gate.productLabel}</dt>
                  <dd className="break-words text-base font-semibold text-ink">{run.product_name}</dd>
                </div>
                <div>
                  <dt className="field-label">{dict.gate.verdictLabel}</dt>
                  <dd className="text-base italic leading-relaxed text-ink-600">“{run.teaser}”</dd>
                </div>
                <div>
                  <dd className="inline-flex items-center gap-2 rounded-full bg-signal/40 px-3 py-1 text-xs font-semibold text-ink">
                    {gapsLine}
                  </dd>
                </div>
              </dl>
            )}

            {/* The reward, named at the ask. Only when it exists: a promise we
                cannot keep costs more than the extra line earns. */}
            {run.render_available && (
              <p className="mt-5 rounded-xl border border-emerald/25 bg-emerald-50/60 px-4 py-3 text-sm leading-relaxed text-ink">
                {run.render_mode === 'inserted' ? dict.gate.previewPromiseInserted : dict.gate.previewPromise}
              </p>
            )}

            <p className="mt-6 text-sm text-ink-600">{dict.gate.intro}</p>

            <form onSubmit={handleReveal} noValidate className="mt-4 space-y-4">
              {/* Honeypot, same contract as the lead forms. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-name" className="field-label">
                    {dict.gate.name}
                  </label>
                  <input
                    id="demo-name"
                    name="name"
                    type="text"
                    className="field"
                    placeholder={dict.gate.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="field-label">
                    {dict.gate.email}
                  </label>
                  <input
                    id="demo-email"
                    name="email"
                    type="email"
                    className="field"
                    placeholder={dict.gate.emailPlaceholder}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-ink-600">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 text-emerald focus:ring-emerald"
                />
                <span>{dict.gate.consent}</span>
              </label>

              {(fieldError || error) && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {fieldError || error}
                </p>
              )}

              {expired ? (
                <button type="button" onClick={() => void startRun(url)} className="btn-primary w-full">
                  {dict.form.submit}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={revealing}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {revealing ? dict.gate.submitting : dict.gate.submit}
                </button>
              )}

              <p className="text-xs leading-relaxed text-ink-500">
                {dict.gate.use}{' '}
                <Link href={privacyHref} className="underline underline-offset-2 hover:text-ink">
                  {dict.gate.privacyLink}
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Result: the free half again, then the deliverables under it. */}
      {phase === 'result' && result && run && (
        // After a reveal the visitor has already read the free half, so the
        // page lands on what the email opened. With no gate it lands on top.
        <div ref={emailedCopy ? undefined : resultRef} className="mt-10 scroll-mt-24 space-y-10">
          {renderDiagnosis(result.verdict, result.gaps, result.checks)}

          <div
            ref={emailedCopy ? resultRef : undefined}
            className="scroll-mt-24 space-y-8 border-t border-ink/10 pt-10"
          >
            {/* The rebuilt page: their own page with the new description in it.
                Sandboxed with no permissions at all - the document is a third
                party's markup, already stripped of scripts server side, and
                this is the second lock on that door. */}
            {result.preview_url ? (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <span className="eyebrow">
                    {inserted ? dict.result.previewLabelInserted : dict.result.previewLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={result.preview_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
                    >
                      {dict.result.previewOpen}
                    </a>
                    {result.download_url && (
                      <a
                        href={result.download_url}
                        className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
                      >
                        {dict.result.previewDownload}
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-card border border-ink/15 bg-white shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)]">
                  <iframe
                    src={`${result.preview_url}#maubourg-rewrite`}
                    sandbox=""
                    title={inserted ? dict.result.previewLabelInserted : dict.result.previewLabel}
                    className="h-[520px] w-full border-0 bg-white md:h-[640px]"
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-500">
                  {inserted ? dict.result.previewNoteInserted : dict.result.previewNote}
                </p>
                <p className="mt-1 text-xs text-ink-500">{dict.result.previewExpires}</p>
              </div>
            ) : (
              <p className="rounded-xl border border-ink/10 bg-bone-200 px-4 py-3 text-sm leading-relaxed text-ink-600">
                {/* Same answer as the crawler check: no description in the
                    page text means nothing was there to put back. */}
                {result.checks && result.checks.crawler.description !== 'text'
                  ? dict.result.previewUnavailableNoHtml
                  : dict.result.previewUnavailable}
              </p>
            )}

            {/* Before / after. Stacked on mobile with the new description first. */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="card order-1 md:order-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="field-label mb-0">{dict.result.afterLabel}</span>
                  <button
                    type="button"
                    onClick={() => void copyRewrite()}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
                  >
                    {copied ? dict.result.copied : dict.result.copy}
                  </button>
                </div>
                <p className="mt-4 whitespace-pre-line break-words text-[15px] leading-relaxed text-ink">
                  {result.rewrite}
                </p>
              </div>

              <div className="order-2 rounded-card border border-dashed border-ink/15 p-7 md:order-1">
                <span className="field-label mb-0">{dict.result.beforeLabel}</span>
                <p className="mt-4 break-words text-[15px] italic leading-relaxed text-ink-500">
                  {result.before_excerpt}…
                </p>
              </div>
            </div>

            {/* The Product block, built in code from the page's own facts. */}
            {result.product_block && (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <span className="eyebrow">{dict.productBlock.label}</span>
                  <button
                    type="button"
                    onClick={() => void copyBlock()}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
                  >
                    {copiedBlock ? dict.productBlock.copied : dict.productBlock.copy}
                  </button>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
                  {dict.productBlock.intro}
                </p>
                <pre className="mt-4 max-h-[420px] overflow-auto rounded-card bg-ink p-5 font-mono text-[12px] leading-relaxed text-bone/90">
                  <code>{result.product_block.snippet}</code>
                </pre>
                {result.product_block.toComplete.length ? (
                  <div className="mt-4">
                    <p className="text-sm text-ink-600">{dict.productBlock.toComplete}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {result.product_block.toComplete.map((gap) => (
                        <li
                          key={gap}
                          className="rounded-full border border-ink/15 bg-bone-100 px-3 py-1 text-xs font-semibold text-ink"
                        >
                          {dict.productBlock.fields[gap]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-ink-600">{dict.productBlock.complete}</p>
                )}
              </div>
            )}
          </div>

          {/* The frame */}
          <div className="rounded-card bg-ink p-7 text-bone md:p-9">
            <h2 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
              {dict.frame.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/70">{dict.frame.body}</p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={`/${lang}/call`} className="btn-signal w-full sm:w-auto">
                {dict.frame.ctaPrimary}
              </Link>
              <p className="text-sm text-bone/60">
                {dict.frame.teardownPrefix}{' '}
                <Link
                  href={`/${lang}#audit`}
                  className="font-medium text-bone underline underline-offset-4 decoration-bone/30 transition-colors hover:text-signal"
                >
                  {dict.frame.teardownLink}
                </Link>
              </p>
            </div>
          </div>

          {emailedCopy && <p className="text-sm text-ink-500">{dict.result.emailed}</p>}

          <button type="button" onClick={reset} className="btn-ghost">
            {dict.result.again}
          </button>
        </div>
      )}
    </div>
  );
}
