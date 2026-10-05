// Audience measurement consent, kept first-party in the visitor's browser.
//
// France: GA4 does not qualify for the CNIL exemption for audience
// measurement, so it needs prior consent. The rule this file serves is simple:
// no Google script, no Google request and no _ga cookie until the visitor has
// clicked "Accept". This is Google's consent mode in its basic form, where the
// tag is not loaded at all, not the advanced form that sends cookieless pings
// before consent.

export const GA_MEASUREMENT_ID = 'G-GJYM66HT8Q';

/** localStorage key. Holds { value, at } so an old answer can expire. */
const STORAGE_KEY = 'mb-consent';

/** The CNIL's guidance is to ask again after about 13 months. */
const MAX_AGE_MS = 395 * 24 * 60 * 60 * 1000;

/** Fired by the footer link to reopen the banner. */
export const OPEN_CONSENT_EVENT = 'mb:open-consent';

export type ConsentValue = 'granted' | 'denied';

export function readConsent(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value?: unknown; at?: unknown };
    if (parsed.value !== 'granted' && parsed.value !== 'denied') return null;
    if (typeof parsed.at !== 'number' || Date.now() - parsed.at > MAX_AGE_MS) return null;
    return parsed.value;
  } catch {
    // Storage blocked or garbage: treat as unanswered, so nothing loads.
    return null;
  }
}

export function writeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
