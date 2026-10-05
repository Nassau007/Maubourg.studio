'use client';

import { openConsentSettings } from '@/lib/consent';

/** Footer link that reopens the consent banner, so a choice can be changed. */
export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-bone/70 transition-colors hover:text-bone"
    >
      {label}
    </button>
  );
}
