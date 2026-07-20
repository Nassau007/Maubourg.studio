'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const REVENUE_BANDS = [
  'Under €10k / month',
  '€10k–50k / month',
  '€50k–200k / month',
  '€200k–500k / month',
  '€500k+ / month',
];

const PLATFORMS = ['Shopify', 'WooCommerce', 'Other'];

export default function TeardownForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        return;
      }

      const payload = await res.json().catch(() => ({}));
      if (payload.fields) setFieldErrors(payload.fields);
      setErrorMsg(payload.error || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setErrorMsg('Network error — please try again, or email us directly.');
      setStatus('error');
    }
  }

  return (
    <section id="teardown" className="hairline bg-bone-200/50 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Left: pitch */}
          <div>
            <span className="eyebrow">Free store teardown</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Get 8–10 fixes ranked by revenue impact.
            </h2>
            <p className="mt-4 max-w-md text-ink-600">
              Tell us where your store lives and we&rsquo;ll send back a short teardown — the
              highest-ROI leaks first, plus the two or three you could ship this week. Free, and
              yours to keep.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                'A real audit of your live store — not a generic checklist',
                'Issues ranked by impact × effort, so you know what to do first',
                'No obligation — take the list and run, or we talk',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald text-xs text-bone">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-500">
              Prefer to talk first?{' '}
              <a
                href={site.bookingUrl}
                className="font-semibold text-emerald underline-offset-4 hover:underline"
              >
                Book a 15-minute call →
              </a>
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
                  Request received.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600">
                  We&rsquo;ll go through your store and send your teardown within a couple of working
                  days. Keep an eye on your inbox.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-6"
                  type="button"
                >
                  Submit another store
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
                      Your name
                    </label>
                    <input id="name" name="name" type="text" className="field" placeholder="Jane Doe" />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field"
                      placeholder="jane@brand.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="storeUrl" className="field-label">
                    Store URL
                  </label>
                  <input
                    id="storeUrl"
                    name="storeUrl"
                    type="text"
                    className="field"
                    placeholder="brand.com"
                  />
                  {fieldErrors.storeUrl && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.storeUrl}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="platform" className="field-label">
                      Platform
                    </label>
                    <select id="platform" name="platform" className="field" defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="monthlyRevenue" className="field-label">
                      Monthly revenue
                    </label>
                    <select
                      id="monthlyRevenue"
                      name="monthlyRevenue"
                      className="field"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {REVENUE_BANDS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Anything specific? <span className="font-normal normal-case text-ink-500">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="field resize-none"
                    placeholder="Where do you suspect you're losing sales?"
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
                  {status === 'submitting' ? 'Sending…' : 'Send me my free teardown →'}
                </button>

                <p className="text-center text-xs text-ink-500">
                  No spam. We&rsquo;ll only use this to send your teardown and follow up once.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
