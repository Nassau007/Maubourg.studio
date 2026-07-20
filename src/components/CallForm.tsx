'use client';

import { useState } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function CallForm({ dict, lang }: { dict: Dictionary['call']; lang: Locale }) {
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
      const res = await fetch('/api/call', {
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
      setErrorMsg(payload.error || f.submit);
      setStatus('error');
    } catch {
      setErrorMsg(f.submit);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-card border border-ink/10 bg-bone-100 p-8 text-center shadow-[0_20px_50px_-30px_rgba(20,20,15,0.5)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-2xl text-bone">
          ✓
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{dict.success.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-600">{dict.success.body}</p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-6" type="button">
          {dict.success.again}
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
            <label htmlFor="phone" className="field-label">
              {f.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="field"
              placeholder={f.phonePlaceholder}
            />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredTime" className="field-label">
              {f.preferredTime}
            </label>
            <select id="preferredTime" name="preferredTime" className="field" defaultValue="">
              <option value="" disabled>
                {f.select}
              </option>
              {f.times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              {f.email}{' '}
              <span className="font-normal normal-case text-ink-500">{f.optional}</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field"
              placeholder={f.emailPlaceholder}
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="storeUrl" className="field-label">
            {f.storeUrl}{' '}
            <span className="font-normal normal-case text-ink-500">{f.optional}</span>
          </label>
          <input
            id="storeUrl"
            name="storeUrl"
            type="text"
            className="field"
            placeholder={f.storeUrlPlaceholder}
          />
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

        <p className="text-center text-xs text-ink-500">{f.note}</p>
      </div>
    </form>
  );
}
