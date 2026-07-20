'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, localeNames, type Locale } from '@/lib/i18n';

/**
 * Swaps the locale segment of the current path, keeping the user on the
 * same page. Renders a compact EN / FR toggle.
 */
export default function LanguageSwitcher({
  current,
  variant = 'light',
}: {
  current: Locale;
  variant?: 'light' | 'dark';
}) {
  const pathname = usePathname();

  function pathForLocale(locale: Locale): string {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    // segments[0] is '' (leading slash), segments[1] is the current locale.
    segments[1] = locale;
    return segments.join('/') || `/${locale}`;
  }

  const base =
    variant === 'dark'
      ? 'border-bone/20 text-bone/60'
      : 'border-ink/15 text-ink-500';
  const activeCls =
    variant === 'dark' ? 'bg-bone text-ink' : 'bg-ink text-bone';

  return (
    <div
      className={`inline-flex items-center rounded-full border ${base} p-0.5 text-xs font-semibold`}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={pathForLocale(locale)}
            hrefLang={locale}
            aria-current={isActive ? 'true' : undefined}
            title={localeNames[locale]}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
              isActive ? activeCls : 'hover:text-current'
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
