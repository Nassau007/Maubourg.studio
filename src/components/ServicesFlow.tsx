'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage } from '@/lib/routes';

/**
 * Exploration B. The offer as five steps on one line: the three GEO steps,
 * then the two moments of the agent. Once the strip is in view, a coral mark
 * walks from step to step and the line fills behind it; hovering or focusing
 * a step holds it there. Each step says one short thing (`short`); the longer
 * `body` stays in the JSON-LD for machines.
 *
 * Less motion asked: every step shown at full strength, nothing walks.
 */
export default function ServicesFlow({
  items,
  lang,
}: {
  items: Dictionary['services']['items'];
  lang: Locale;
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [held, setHeld] = useState(false);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLOListElement>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setStill(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRunning(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || held || still) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), 2600);
    return () => window.clearInterval(t);
  }, [running, held, still, n]);

  // Group bands (GEO 1 to 3, agent 4 to 5) from the tags, in order.
  const groups = items.reduce<{ tag: string; count: number }[]>((acc, it) => {
    const last = acc[acc.length - 1];
    if (last && last.tag === it.tag) last.count += 1;
    else acc.push({ tag: it.tag, count: 1 });
    return acc;
  }, []);

  const fill = still ? 100 : (active / (n - 1)) * 100;
  // Distance between the first and the last node centre: n columns with a
  // 1.5rem gap, each node at the start of its column.
  const span = `calc((100% + 1.5rem) * ${(n - 1) / n})`;

  return (
    <div className="rounded-card border border-ink/10 bg-white p-7 md:p-10">
      {/* Group labels over their steps (desktop) */}
      <div className="hidden gap-6 md:grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {groups.map((g, gi) => {
          const start = groups.slice(0, gi).reduce((s, x) => s + x.count, 0);
          const on = still || (active >= start && active < start + g.count);
          return (
            <p
              key={g.tag}
              style={{ gridColumn: `span ${g.count} / span ${g.count}` }}
              className={`font-display border-b-2 pb-3 text-xl font-bold transition-colors duration-500 ${
                on ? 'border-signal text-ink' : 'border-ink/10 text-ink/40'
              }`}
            >
              {g.tag}
            </p>
          );
        })}
      </div>

      <ol
        ref={ref}
        className="relative mt-0 grid gap-7 md:mt-8 md:gap-6"
        style={{ gridTemplateColumns: wide ? `repeat(${n}, minmax(0, 1fr))` : undefined }}
        onMouseLeave={() => setHeld(false)}
      >
        {/* The line: vertical on a phone, horizontal from md */}
        <span aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-ink/10 md:hidden" />
        <span
          aria-hidden="true"
          className="absolute left-[11px] top-3 w-[2px] bg-signal transition-[height] duration-700 ease-out md:hidden"
          style={{ height: `calc((100% - 1.5rem) * ${fill / 100})` }}
        />
        <span
          aria-hidden="true"
          className="absolute left-3 top-[11px] hidden h-[2px] bg-ink/10 md:block"
          style={{ width: span }}
        />
        <span
          aria-hidden="true"
          className="absolute left-3 top-[11px] hidden h-[2px] bg-signal transition-[width] duration-700 ease-out md:block"
          style={{ width: `calc(${span.slice(5, -1)} * ${fill / 100})` }}
        />
        {items.map((s, i) => {
          const on = still || i === active;
          const past = still || i <= active;
          return (
            <li
              key={s.title}
              className="relative pl-10 md:pl-0"
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
              onFocus={() => {
                setHeld(true);
                setActive(i);
              }}
              onBlur={() => setHeld(false)}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-500 md:relative ${
                  on
                    ? 'scale-110 border-signal bg-signal text-ink'
                    : past
                      ? 'border-signal bg-white text-ink'
                      : 'border-ink/15 bg-white text-ink/40'
                }`}
              >
                {i + 1}
              </span>
              <p className="md:mt-5">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-ink/45 md:hidden">{s.tag}</span>
              </p>
              <Link
                href={localizedHref(s.page as VerticalPage, lang)}
                className={`mt-1 block text-lg font-semibold leading-snug underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-500 hover:decoration-signal ${
                  on ? 'text-ink' : 'text-ink/60'
                }`}
              >
                {s.title}
              </Link>
              <p
                className={`mt-2 text-[15px] leading-relaxed transition-all duration-500 ${
                  on ? 'translate-y-0 text-ink-600' : 'translate-y-1 text-ink/55'
                }`}
              >
                {s.short}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
