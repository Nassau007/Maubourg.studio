'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

// The four states of the page. 'gate' is reached the moment the agent finishes
// and must read as done, not as blocked: the completion marker comes first and
// the ask sits under it.
type Phase = 'idle' | 'running' | 'gate' | 'result';

type Gap = { label: string; detail: string };

type RunPayload = {
  ok: true;
  token: string;
  product_name: string;
  teaser: string;
  gaps_count: number;
  platform: string;
  detected_language: string;
  confidence: 'high' | 'low';
  // Whether the rebuilt page exists. Sent before the email so the ask can name
  // the reward, and false whenever the substitution was not certain.
  render_available: boolean;
  // Present only when the server runs GATE_MODE 'rewrite-only'. The client
  // reads the response rather than importing the constant, so the switch stays
  // a server decision and the bundle carries no copy of it.
  verdict?: string;
  gaps?: Gap[];
};

type Result = {
  verdict: string;
  before_excerpt: string;
  rewrite: string;
  gaps: Gap[];
  preview_url: string | null;
  download_url: string | null;
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

      setRun(payload as RunPayload);
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

  const gapsLine =
    run && run.gaps_count === 1
      ? dict.gate.gapsFoundOne
      : dict.gate.gapsFound.replace('{n}', String(run?.gaps_count ?? 0));

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

      {/* Gate */}
      {phase === 'gate' && run && (
        <div
          ref={gateRef}
          className="mt-10 max-w-2xl rounded-card border border-ink/10 bg-bone-100 p-6 shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)] md:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-sm text-bone">
              ✓
            </span>
            <h2 className="font-display text-2xl font-semibold text-ink">{dict.gate.ready}</h2>
          </div>

          <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5">
            <div>
              <dt className="field-label">{dict.gate.productLabel}</dt>
              <dd className="break-words text-base font-semibold text-ink">{run.product_name}</dd>
            </div>

            {/* Under GATE_MODE 'full' this is a truncated clause the server cut.
                Under 'rewrite-only' the server sends the whole verdict and the
                gaps, and they are shown before the ask. */}
            {run.verdict ? (
              <div>
                <dt className="field-label">{dict.result.verdictLabel}</dt>
                <dd className="text-base leading-relaxed text-ink">{run.verdict}</dd>
              </div>
            ) : (
              <div>
                <dt className="field-label">{dict.gate.verdictLabel}</dt>
                <dd className="text-base italic leading-relaxed text-ink-600">“{run.teaser}”</dd>
              </div>
            )}

            {run.gaps ? (
              <div>
                <dt className="field-label">{dict.result.gapsLabel}</dt>
                <dd>
                  <ul className="mt-1 space-y-2">
                    {run.gaps.map((g) => (
                      <li key={g.label} className="text-sm text-ink-600">
                        <span className="font-semibold text-ink">{g.label}</span> {g.detail}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : (
              <div>
                <dd className="inline-flex items-center gap-2 rounded-full bg-signal/40 px-3 py-1 text-xs font-semibold text-ink">
                  {gapsLine}
                </dd>
              </div>
            )}
          </dl>

          {/* The reward, named at the ask. Only when it exists: a promise we
              cannot keep costs more than the extra line earns. */}
          {run.render_available && (
            <p className="mt-6 rounded-xl border border-emerald/25 bg-emerald-50/60 px-4 py-3 text-sm leading-relaxed text-ink">
              {dict.gate.previewPromise}
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
      )}

      {/* Result */}
      {phase === 'result' && result && run && (
        <div ref={resultRef} className="mt-10 space-y-8">
          {run.confidence === 'low' && (
            <p className="rounded-xl border border-ink/10 bg-bone-200 px-4 py-3 text-sm text-ink-600">
              {dict.result.lowConfidence}
            </p>
          )}

          {/* 1. Verdict, largest text on the result: diagnosis before solution */}
          <div>
            <span className="eyebrow">{dict.result.verdictLabel}</span>
            <p className="mt-3 font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
              {result.verdict}
            </p>
          </div>

          {/* 2. The deliverable: their own page with the new copy in it.
              Sandboxed with no permissions at all - the document is a third
              party's markup, already stripped of scripts server side, and this
              is the second lock on that door. */}
          {result.preview_url ? (
            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <span className="eyebrow">{dict.result.previewLabel}</span>
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
                  title={dict.result.previewLabel}
                  className="h-[520px] w-full border-0 bg-white md:h-[640px]"
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-500">{dict.result.previewNote}</p>
              <p className="mt-1 text-xs text-ink-500">{dict.result.previewExpires}</p>
            </div>
          ) : (
            <p className="rounded-xl border border-ink/10 bg-bone-200 px-4 py-3 text-sm leading-relaxed text-ink-600">
              {dict.result.previewUnavailable}
            </p>
          )}

          {/* 3. Before / after. Stacked on mobile with the rewrite first. */}
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

          {/* 4. What is missing */}
          <div>
            <span className="eyebrow">{dict.result.gapsLabel}</span>
            <ul className="mt-4 space-y-3">
              {result.gaps.map((g) => (
                <li key={g.label} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden />
                  <p className="text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink">{g.label}.</span> {g.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. The frame */}
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
                  href={`/${lang}#teardown`}
                  className="font-medium text-bone underline underline-offset-4 decoration-bone/30 transition-colors hover:text-signal"
                >
                  {dict.frame.teardownLink}
                </Link>
              </p>
            </div>
          </div>

          <p className="text-sm text-ink-500">{dict.result.emailed}</p>

          <button type="button" onClick={reset} className="btn-ghost">
            {dict.result.again}
          </button>
        </div>
      )}
    </div>
  );
}
