'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A chat bubble that types buying questions one after the other: type, hold,
 * clear, next. It starts when scrolled into view and stops when out of it.
 * The bubble is sized by the longest question, so the page never jumps.
 *
 * Screen readers and visitors who asked for less motion get the first
 * question, still.
 */
export default function TypingQuestion({
  questions,
  lang = 'fr',
  className = '',
}: {
  questions: readonly string[];
  lang?: 'fr' | 'en';
  className?: string;
}) {
  // French quotes with non-breaking spaces, English curly quotes.
  const [open, close] = lang === 'fr' ? ['«\u00a0', '\u00a0»'] : ['“', '”'];
  const [q, setQ] = useState(0);
  const [chars, setChars] = useState(questions[0].length);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'hold' | 'clear'>('idle');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const longest = questions.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    // The first question is shown whole; the loop starts after a first hold.
    setPhase('hold');
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || phase === 'idle') return;
    const text = questions[q];
    let t: number;
    if (phase === 'typing') {
      t = window.setTimeout(
        () => (chars < text.length ? setChars(chars + 1) : setPhase('hold')),
        chars < text.length ? 34 : 0,
      );
    } else if (phase === 'hold') {
      t = window.setTimeout(() => setPhase('clear'), 2600);
    } else {
      t = window.setTimeout(() => {
        setQ((q + 1) % questions.length);
        setChars(0);
        setPhase('typing');
      }, 320);
    }
    return () => window.clearTimeout(t);
  }, [visible, phase, chars, q, questions]);

  const text = questions[q].slice(0, chars);

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{open}{questions[0]}{close}</span>
      <p
        aria-hidden="true"
        className="ml-auto grid max-w-md rounded-3xl rounded-br-md bg-ink px-6 py-4 text-[15.5px] font-medium text-bone"
      >
        {/* Invisible longest question: holds the bubble's size. */}
        <span className="invisible col-start-1 row-start-1">{open}{longest}{close}</span>
        <span
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            phase === 'clear' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {open}{text}
          {phase === 'typing' ? (
            <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-pulse bg-bone/80" />
          ) : (
            close
          )}
        </span>
      </p>
    </div>
  );
}
