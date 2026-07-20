'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav({ dict, lang }: { dict: Dictionary['nav']; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const home = `/${lang}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/10 bg-bone/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8">
        <Link href={home} className="group flex items-center gap-2.5" aria-label="Maubourg Studio">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-bone">
            <span className="font-display text-lg font-semibold leading-none">M</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Maubourg<span className="text-emerald">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {dict.links.map((item) => (
            <Link
              key={item.hash}
              href={`${home}${item.hash}`}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher current={lang} />
          <Link href={`${home}#teardown`} className="btn-primary">
            {dict.cta}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher current={lang} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-bone px-5 pb-5 pt-2 md:hidden">
          {dict.links.map((item) => (
            <Link
              key={item.hash}
              href={`${home}${item.hash}`}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-ink-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`${home}#teardown`}
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            {dict.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
