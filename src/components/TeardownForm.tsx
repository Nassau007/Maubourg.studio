'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function TeardownForm({
  dict,
  lang,
}: {
  dict: Dictionary['teardown'];
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const f = dict.form;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    setFieldErrors({});

    const form = e.currentTarget;
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
        return;
      }

      const payload = await res.json().catch(() => ({}));
      if (payload.fields) setFieldErrors(payload.fields);
      setErrorMsg(payload.error || dict.form.submit);
      setStatus('error');
    } catch {
      setErrorMsg(dict.form.submit);
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

                <div className="grid gap-4 sm:grid-cols-2">
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
                    {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="platform" className="field-label">
                      {f.platform}
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
                      {f.monthlyRevenue}
                    </label>
                    <select id="monthlyRevenue" name="monthlyRevenue" className="field" defaultValue="">
                      <option value="" disabled>
                        {f.select}
                      </option>
                      {f.revenueBands.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
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

                {status === 'error' && errorMsg && (
                  <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? f.submitting : f.submit}
                </button>

                <p className="text-center text-xs text-ink-500">{f.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
