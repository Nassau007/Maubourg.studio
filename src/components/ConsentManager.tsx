'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import {
  GA_MEASUREMENT_ID,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentValue,
} from '@/lib/consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** 13 months, the CNIL's ceiling for an audience-measurement cookie. */
const COOKIE_EXPIRES_SECONDS = 395 * 24 * 60 * 60;

const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

let gaLoaded = false;

/**
 * Loads the Google tag. Only ever called after the visitor clicked Accept, so
 * before that moment the page makes no request to Google at all.
 */
function loadGa() {
  (window as unknown as Record<string, unknown>)[DISABLE_FLAG] = false;

  if (gaLoaded) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the arguments object itself, not an array, so this has to
  // be a plain function and not an arrow.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  // Page views on client-side navigation come from GA4's enhanced
  // measurement ("page changes based on browser history events", on by
  // default), so a single config call is enough.
  window.gtag('config', GA_MEASUREMENT_ID, {
    cookie_expires: COOKIE_EXPIRES_SECONDS,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Stops measurement for the rest of the visit and removes the _ga cookies. */
function stopGa() {
  (window as unknown as Record<string, unknown>)[DISABLE_FLAG] = true;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  const host = window.location.hostname;
  const parts = host.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) {
    const d = parts.slice(i).join('.');
    domains.push(`; domain=${d}`, `; domain=.${d}`);
  }
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name !== '_ga' && !name.startsWith('_ga_')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    });
  });
}

/**
 * The two clicks worth counting: the free audit button and the call button.
 * Read from the link's target, so no component has to know about analytics.
 */
function ctaEvent(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.hash === '#audit') return 'click_free_audit';
  if (/^\/(en|fr)\/call\/?$/.test(url.pathname)) return 'click_book_call';
  return null;
}

export default function ConsentManager({
  dict,
  privacyHref,
}: {
  dict: Dictionary['consent'];
  privacyHref: string;
}) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored === 'granted') loadGa();
    else setOpen(stored === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (consent !== 'granted') return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!link || !window.gtag) return;
      const name = ctaEvent(link.getAttribute('href') ?? '');
      if (name) window.gtag('event', name, { link_url: link.getAttribute('href') });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [consent]);

  const choose = useCallback((value: ConsentValue) => {
    writeConsent(value);
    setConsent(value);
    setOpen(false);
    if (value === 'granted') loadGa();
    else stopGa();
  }, []);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={dict.label}
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
    >
      <div className="rounded-card bg-ink p-4 text-bone sm:p-5 shadow-[0_18px_40px_-18px_rgba(20,20,15,0.6)]">
        <p className="text-[13px] leading-snug text-bone/85 sm:text-sm sm:leading-relaxed">
          {dict.text}{' '}
          <Link
            href={privacyHref}
            className="font-medium text-bone underline underline-offset-4 decoration-bone/30 transition-colors hover:text-signal"
          >
            {dict.privacyLink}
          </Link>
        </p>
        {/* Same class, same size, side by side: refusing is exactly as easy
            as accepting, which is what the CNIL asks for. */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4">
          <button type="button" onClick={() => choose('granted')} className="btn-ghost-light py-2.5 sm:py-3">
            {dict.accept}
          </button>
          <button type="button" onClick={() => choose('denied')} className="btn-ghost-light py-2.5 sm:py-3">
            {dict.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
