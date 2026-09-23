import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

/**
 * Proof. A studio selling measurement has to show one, and there is no client
 * name, logo, figure or testimonial to show: none of that exists yet, and
 * inventing it is the one thing this site cannot do.
 *
 * So the proof is the site itself, which is checkable in a browser right now.
 * A second column, the anonymised example GEO audit, belongs here the day that
 * PDF exists. Until then this block stays one column rather than linking to
 * the conversion teardown, which is a different document.
 */
export default function Proof({ dict }: { dict: Dictionary['proof'] }) {
  return (
    <section className="hairline bg-bone-200/40 py-16 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">{dict.eyebrow}</span>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
              {dict.title}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">{dict.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
