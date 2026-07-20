'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TIMES = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'As soon as possible',
];

export default function CallForm() {
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
      const res = await fetch('/api/call', {
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

  if (status === 'success') {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-card border border-ink/10 bg-bone-100 p-8 text-center shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-2xl text-bone">
          ✓
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">We&rsquo;ll call you.</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-600">
          Thanks — we&rsquo;ve got your details and will call within one working day at the time you
          picked. No pitch, just a useful conversation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-6" type="button">
          Request another call
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-card border border-ink/10 bg-bone-100 p-6 shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)] md:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">
              Your name
            </label>
            <input id="name" name="name" type="text" className="field" placeholder="Jane Doe" />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="field-label">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="field"
              placeholder="+33 6 12 34 56 78"
            />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredTime" className="field-label">
              Best time to call
            </label>
            <select id="preferredTime" name="preferredTime" className="field" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              Email <span className="font-normal normal-case text-ink-500">(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field"
              placeholder="jane@brand.com"
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="storeUrl" className="field-label">
            Store URL <span className="font-normal normal-case text-ink-500">(optional)</span>
          </label>
          <input
            id="storeUrl"
            name="storeUrl"
            type="text"
            className="field"
            placeholder="brand.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            What&rsquo;s on your mind?{' '}
            <span className="font-normal normal-case text-ink-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="field resize-none"
            placeholder="A line on what you'd like to talk through."
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
          {status === 'submitting' ? 'Sending…' : 'Request my call →'}
        </button>

        <p className="text-center text-xs text-ink-500">
          A real 15-minute call. No obligation, no hard sell.
        </p>
      </div>
    </form>
  );
}
