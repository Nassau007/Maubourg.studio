'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { ServiceMenuItem } from '@/lib/routes';
import LanguageSwitcher from './LanguageSwitcher';

// Plain objects, no filesystem access, so calling this again here (rather
// than threading one more label through every page that renders Nav) is
// cheap. Unlike src/lib/articles.ts, which reads content/ from disk and
// cannot be imported into a client component at all.
//
// French only, same as the section itself: the answers are French, and a
// link from the English site into French content with no warning reads as
// broken rather than bilingual.
const ANSWERS_HREF = '/fr/reponses';

export default function Nav({
  dict,
  lang,
  services,
  servicesLabel,
}: {
  dict: Dictionary['nav'];
  lang: Locale;
  services: ServiceMenuItem[];
  servicesLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A dropdown that only closes on a second click on the trigger is a dropdown
  // that gets left open behind the page. Close on outside click and on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const home = `/${lang}`;
  const answersLabel = getDictionary(lang).articles.index.eyebrow;

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
          {dict.links.slice(0, 1).map((item) => (
            <Link
              key={item.hash}
              href={`${home}${item.hash}`}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}

          {/* Services menu. Sits where the old "what we do" anchor was, since
              the five pages are now the real answer to that question. */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-ink"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              {servicesLabel}
              <span
                aria-hidden
                className={`text-[10px] transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              >
                ▾
              </span>
            </button>

            {menuOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 overflow-hidden rounded-card border border-ink/10 bg-bone-100 shadow-[0_28px_60px_-30px_rgba(20,20,15,0.45)]">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-ink/8 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-bone-200"
                  >
                    <span className="block text-[14px] font-semibold text-ink">{item.label}</span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-500">
                      {item.blurb}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {lang === 'fr' && (
            <Link
              href={ANSWERS_HREF}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink"
            >
              {answersLabel}
            </Link>
          )}

          {dict.links.slice(1).map((item) => (
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

        {/* On a phone the bar is the only CTA a visitor sees for most of the page,
            so the button lives here and the language toggle moves into the menu. */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={`${home}#teardown`}
            className="btn-primary px-4 py-2.5 text-xs"
          >
            {dict.ctaShort}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-ink/15"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-bone px-5 pb-5 pt-2 md:hidden">
          {dict.links.slice(0, 1).map((item) => (
            <Link
              key={item.hash}
              href={`${home}${item.hash}`}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-ink-700"
            >
              {item.label}
            </Link>
          ))}

          {/* Accordion rather than a nested dropdown: on a phone there is no
              hover and no room for a floating panel. */}
          <button
            onClick={() => setMobileServices((v) => !v)}
            className="flex w-full items-center justify-between py-2.5 text-left text-base font-medium text-ink-700"
            aria-expanded={mobileServices}
          >
            {servicesLabel}
            <span aria-hidden className={`text-xs transition-transform ${mobileServices ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>
          {mobileServices && (
            <div className="mb-1 ml-3 border-l border-ink/10 pl-4">
              {services.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[15px] font-medium text-ink-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {lang === 'fr' && (
            <Link
              href={ANSWERS_HREF}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-ink-700"
            >
              {answersLabel}
            </Link>
          )}

          {dict.links.slice(1).map((item) => (
            <Link
              key={item.hash}
              href={`${home}${item.hash}`}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-ink-700"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-4">
            <span className="text-sm font-medium text-ink-500">{dict.languageLabel}</span>
            <LanguageSwitcher current={lang} />
          </div>
        </div>
      )}
    </header>
  );
}
