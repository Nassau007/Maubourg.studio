'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Mirrors EMAIL_RE in src/app/api/teardown/route.ts. This is a gate between the
// two steps, not validation: the server still re-checks every field on submit
// and remains the only authority on what is valid.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TeardownForm({
  dict,
  errors,
  lang,
}: {
  dict: Dictionary['teardown'];
  errors: Dictionary['errors'];
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [step, setStep] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const f = dict.form;

  // Step 1 asks for the two things a teardown genuinely cannot be produced
  // without. Everything else waits for step 2 — revenue in particular reads as
  // being screened and priced, and it was the field most likely to lose people.
  function goToStep2(form: HTMLFormElement) {
    const data = new FormData(form);
    const storeUrl = String(data.get('storeUrl') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    const next: Record<string, string> = {};
    if (!storeUrl) next.storeUrl = errors.storeUrl;
    if (!EMAIL_RE.test(email)) next.email = errors.email;

    setFieldErrors(next);
    if (Object.keys(next).length === 0) {
      setErrorMsg('');
      setStep(2);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Enter on a step-1 input should advance, never submit a half-filled form.
    if (step === 1) {
      goToStep2(form);
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    setFieldErrors({});

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/teardown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setStep(1);
        return;
      }

      const payload = await res.json().catch(() => ({}));
      if (payload.fields) setFieldErrors(payload.fields);
      // A step-1 field failing server validation must send the user back to it,
      // or they see an error pointing at an input they cannot reach.
      if (payload.fields?.storeUrl || payload.fields?.email) setStep(1);
      setErrorMsg(payload.error || errors.generic);
      setStatus('error');
    } catch {
      setErrorMsg(errors.network);
      setStatus('error');
    }
  }

  return (
    <section id="teardown" className="hairline bg-bone-200/50 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Left: pitch */}
          <div>
            <span className="eyebrow">{dict.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {dict.title}
            </h2>
            <p className="mt-4 max-w-md text-ink-600">{dict.intro}</p>

            <ul className="mt-8 space-y-3">
              {dict.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald text-xs text-bone">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Proof the deliverable is worth an email address, right beside the ask. */}
            <div className="mt-8 max-w-md rounded-card border border-ink/10 bg-bone-100 p-5">
              <h3 className="font-display text-base font-semibold text-ink">{dict.sampleTitle}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{dict.sampleBody}</p>
              <a
                href="/example-teardown.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-emerald underline-offset-4 hover:underline"
              >
                {dict.sampleLink}
              </a>
            </div>

            <p className="mt-8 text-sm text-ink-500">
              {dict.talkPrefix}{' '}
              <Link
                href={`/${lang}/call`}
                className="font-semibold text-emerald underline-offset-4 hover:underline"
              >
                {dict.talkLink}
              </Link>
            </p>
          </div>

          {/* Right: form / success */}
          <div className="rounded-card border border-ink/10 bg-bone-100 p-6 shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)] md:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-2xl text-bone">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                  {dict.success.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600">{dict.success.body}</p>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-6" type="button">
                  {dict.success.again}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
                    {step === 1 ? f.step1Of2 : f.step2Of2}
                  </p>
                  <div className="flex flex-none gap-1.5" aria-hidden>
                    <span className="h-1 w-8 rounded-full bg-emerald" />
                    <span
                      className={`h-1 w-8 rounded-full ${step === 2 ? 'bg-emerald' : 'bg-ink/15'}`}
                    />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-ink">
                  {step === 1 ? f.step1Title : f.step2Title}
                </h3>

                {/* Step 1 stays mounted, just hidden, so its values are still in the
                    FormData when step 2 submits. */}
                <div className={step === 1 ? 'space-y-4' : 'hidden'}>
                  <div>
                    <label htmlFor="storeUrl" className="field-label">
                      {f.storeUrl}
                    </label>
                    <input
                      id="storeUrl"
                      name="storeUrl"
                      type="text"
                      className="field"
                      placeholder={f.storeUrlPlaceholder}
                    />
                    {fieldErrors.storeUrl && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.storeUrl}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="field-label">
                      {f.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field"
                      placeholder={f.emailPlaceholder}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className={step === 2 ? 'space-y-4' : 'hidden'}>
                  <p className="text-sm text-ink-600">{f.step2Intro}</p>

                  <div>
                    <label htmlFor="name" className="field-label">
                      {f.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="field"
                      placeholder={f.namePlaceholder}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="platform" className="field-label">
                        {f.platform}{' '}
                        <span className="font-normal normal-case text-ink-500">{f.optional}</span>
                      </label>
                      <select id="platform" name="platform" className="field" defaultValue="">
                        <option value="" disabled>
                          {f.select}
                        </option>
                        {f.platforms.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="monthlyRevenue" className="field-label">
                        {f.monthlyRevenue}{' '}
                        <span className="font-normal normal-case text-ink-500">{f.optional}</span>
                      </label>
                      <select
                        id="monthlyRevenue"
                        name="monthlyRevenue"
                        className="field"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {f.select}
                        </option>
                        {f.revenueBands.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-ink-500">{f.revenueHelp}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">
                      {f.message}{' '}
                      <span className="font-normal normal-case text-ink-500">{f.optional}</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="field resize-none"
                      placeholder={f.messagePlaceholder}
                    />
                  </div>
                </div>

                {status === 'error' && errorMsg && (
                  <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{errorMsg}</p>
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={(e) => goToStep2(e.currentTarget.form as HTMLFormElement)}
                    className="btn-primary w-full"
                  >
                    {f.continue}
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? f.submitting : f.submit}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-center text-sm text-ink-500 underline-offset-4 hover:text-ink hover:underline"
                    >
                      {f.back}
                    </button>
                  </>
                )}

                <p className="text-center text-xs text-ink-500">{f.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
