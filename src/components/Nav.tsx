'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/10 bg-bone/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={site.name}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-bone">
            <span className="font-display text-lg font-semibold leading-none">M</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Maubourg<span className="text-emerald">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#teardown" className="btn-primary">
            Get a free teardown
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-bone px-5 pb-5 pt-2 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-ink-700"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#teardown"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Get a free teardown
          </a>
        </div>
      )}
    </header>
  );
}
