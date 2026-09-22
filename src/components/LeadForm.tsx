'use client';

import { useState } from 'react';
import Link from 'next/link';
import Founder from './Founder';
import type { Dictionary, Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * The lead form, used twice on the site with the same fields and two different
 * asks: the free GEO audit on the homepage (#audit), and the free conversion
 * diagnostic on the conversion page (#diagnostic).
 *
 * Both post to /api/teardown, which is also the shape the sales machine parses
 * out of the notification email. `variant` decides the product category field,
 * which the GEO audit cannot be written without, and the request type recorded
 * against the lead.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormSection = {
  eyebrow: string;
  title: string;
  intro: string;
  points: readonly string[];
  success: { title: string; body: string; again: string };
};

export default function LeadForm({
  anchor,
  variant,
  section,
  form: f,
  submitLabel,
  talk,
  sample,
  founder,
  errors,
  lang,
}: {
  anchor: string;
  variant: 'audit' | 'diagnostic';
  section: LeadFormSection;
  form: Dictionary['audit']['form'];
  submitLabel: string;
  talk: { prefix: string; link: string } | null;
  sample: { title: string; body: string; link: string; href: string } | null;
  founder: Dictionary['founder'] | null;
  errors: Dictionary['errors'];
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [step, setStep] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const needsCategory = variant === 'audit';

  // Step 1 asks for the things the deliverable genuinely cannot be produced
  // without. Everything else waits for step 2 — revenue in particular reads as
  // being screened and priced, and it was the field most likely to lose people.
  function goToStep2(form: HTMLFormElement) {
    const data = new FormData(form);
    const storeUrl = String(data.get('storeUrl') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const category = String(data.get('category') ?? '').trim();

    const next: Record<string, string> = {};
    if (!storeUrl) next.storeUrl = errors.storeUrl;
    if (!EMAIL_RE.test(email)) next.email = errors.email;
    if (needsCategory && !category) next.category = errors.category;

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
        body: JSON.stringify({ ...data, lang, requestType: variant }),
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
      if (payload.fields?.storeUrl || payload.fields?.email || payload.fields?.category) {
        setStep(1);
      }
      setErrorMsg(payload.error || errors.generic);
      setStatus('error');
    } catch {
      setErrorMsg(errors.network);
      setStatus('error');
    }
  }

  return (
    <section id={anchor} className="hairline scroll-mt-24 bg-bone-200/50 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* On a phone this reads heading -> form -> proof: the nav CTA jumps to
            this section, so the ask has to be one screen away, not two. The
            order utilities only bite in the single-column stack; on lg the
            explicit row/column placement puts the pitch back on the left with
            the form beside it. */}
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Heading */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="eyebrow">{section.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-4 max-w-md text-ink-600">{section.intro}</p>
          </div>

          {/* Proof: under the heading on desktop, under the form on a phone */}
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-2">
            <ul className="space-y-3">
              {section.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald text-xs text-bone">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Proof the deliverable is worth an email address, right beside the
                ask. The GEO audit has no example PDF yet, so it renders none
                rather than linking to the conversion one. */}
            {sample && (
              <div className="mt-8 max-w-md rounded-card border border-ink/10 bg-bone-100 p-5">
                <h3 className="font-display text-base font-semibold text-ink">{sample.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{sample.body}</p>
                <a
                  href={sample.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-emerald underline-offset-4 hover:underline"
                >
                  {sample.link}
                </a>
              </div>
            )}

            {talk && (
              <p className="mt-8 text-sm text-ink-500">
                {talk.prefix}{' '}
                <Link
                  href={`/${lang}/call`}
                  className="font-semibold text-emerald underline-offset-4 hover:underline"
                >
                  {talk.link}
                </Link>
              </p>
            )}
          </div>

          {/* Form / success, with the founder card directly under the ask */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="rounded-card border border-ink/10 bg-bone-100 p-6 shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)] md:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-2xl text-bone">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                  {section.success.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600">{section.success.body}</p>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-6" type="button">
                  {section.success.again}
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

                  {/* The audit cannot be written without a category: it is what
                      the four buying questions are built from. */}
                  {needsCategory && (
                    <div>
                      <label htmlFor="category" className="field-label">
                        {f.category}
                      </label>
                      <input
                        id="category"
                        name="category"
                        type="text"
                        className="field"
                        placeholder={f.categoryPlaceholder}
                      />
                      <p className="mt-1 text-xs text-ink-500">{f.categoryHelp}</p>
                      {fieldErrors.category && (
                        <p className="mt-1 text-xs text-red-600">{fieldErrors.category}</p>
                      )}
                    </div>
                  )}
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
                      {status === 'submitting' ? f.submitting : submitLabel}
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

            {/* hasPhoto: flip to true once public/founder.jpg exists. */}
            {founder && <Founder dict={founder} hasPhoto={false} />}
          </div>
        </div>
      </div>
    </section>
  );
}
