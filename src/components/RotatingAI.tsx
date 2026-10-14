'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AI_MARKS } from './aiMarks';

/**
 * One AI tool at a time, mark and name, swapping in place inside a sentence
 * ("... votre marque par [ChatGPT]. Avec ..."). The box eases to each name's
 * width so the words after it slide instead of jumping.
 *
 * Screen readers get the plain sentence with the four names (`full`); the
 * moving part is aria-hidden. Visitors who asked for less motion get the
 * plain sentence too, nothing moves.
 */
export default function RotatingAI({
  before,
  after,
  full,
  interval = 2400,
  nameClass = 'font-semibold text-ink',
  breakFromSm = false,
}: {
  before: string;
  after: string;
  full: string;
  interval?: number;
  nameClass?: string;
  /** From the sm breakpoint, start a new line before the word that leads
   *  into the name, so the line break never moves as the names change. */
  breakFromSm?: boolean;
}) {
  const [i, setI] = useState(0);
  const [still, setStill] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStill(mq.matches);
    if (mq.matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % AI_MARKS.length), interval);
    return () => window.clearInterval(t);
  }, [interval]);

  useLayoutEffect(() => {
    if (inner.current) setWidth(inner.current.offsetWidth);
  }, [i]);

  if (still) return <>{full}</>;

  const mark = AI_MARKS[i];
  // "... votre marque par " -> head "... votre marque ", lead "par ".
  const cut = before.trimEnd().lastIndexOf(' ') + 1;
  const head = before.slice(0, cut);
  const lead = before.slice(cut);
  // ". Avec notre propre agent." -> punct ".", tail " Avec notre propre agent."
  const p = after.match(/^[.,;:!?)]*/)?.[0] ?? '';
  const punct = p;
  const tail = after.slice(p.length);
  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {head}
        {breakFromSm ? (
          <span className="hidden sm:inline">
            <br />
          </span>
        ) : null}
        {/* The word before the name, the name and the punctuation after it
            stay on one line: no lone full stop at the start of a line. */}
        <span className="whitespace-nowrap">
          {lead}
          <span
            className="relative inline-block overflow-clip whitespace-nowrap align-baseline transition-[width] duration-300 ease-out"
            style={{ width }}
          >
            <span
              key={mark.name}
              ref={inner}
              className={`animate-ai-swap inline-block ${nameClass}`}
            >
              {/* Sized to the capitals and sat on the baseline, like a letter. */}
              <svg
                viewBox="0 0 24 24"
                width="0.82em"
                height="0.82em"
                fill="currentColor"
                className="mr-[0.28em] inline-block align-[-0.06em]"
              >
                <path d={mark.path} />
              </svg>
              {mark.name}
            </span>
          </span>
          {punct}
        </span>
        {tail}
      </span>
    </>
  );
}
