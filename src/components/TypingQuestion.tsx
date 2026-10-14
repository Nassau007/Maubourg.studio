'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A chat bubble that types buying questions one after the other: type, hold,
 * clear, next. It starts when scrolled into view and stops when out of it.
 * The bubble fits its text and changes colour with each question; the block
 * keeps room for two lines, so the page never jumps.
 *
 * Screen readers and visitors who asked for less motion get the first
 * question, still.
 */
// The site's own colours, one per question in turn: forest, coral, mid
// green, white paper. Text colour picked for contrast on each.
const TONES = [
  'bg-ink text-bone',
  'bg-signal text-ink',
  'bg-emerald text-bone',
  'bg-white text-ink ring-1 ring-ink/10',
] as const;

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

  const tone = TONES[q % TONES.length];

  return (
    // The block keeps room for two lines so the steps below never move; the
    // bubble itself fits its text and grows as it types.
    <div ref={ref} className={`flex min-h-[5.5rem] items-start justify-end ${className}`}>
      <span className="sr-only">{open}{questions[0]}{close}</span>
      <p
        aria-hidden="true"
        className={`w-fit max-w-md rounded-3xl rounded-br-md px-6 py-4 text-[15.5px] font-medium transition-colors duration-500 ${tone}`}
      >
        <span className={`transition-opacity duration-300 ${phase === 'clear' ? 'opacity-0' : 'opacity-100'}`}>
          {open}
          {text}
          {phase === 'typing' ? (
            <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-pulse bg-current opacity-70" />
          ) : (
            close
          )}
        </span>
      </p>
    </div>
  );
}
