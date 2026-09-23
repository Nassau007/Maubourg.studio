import Link from 'next/link';
import Reveal from './Reveal';
import { OBSERVATORY_LIVE, observatoryHref } from '@/lib/observatory';
import { getDictionary, type Dictionary, type Locale } from '@/lib/i18n';

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
export default function Proof({ dict, lang }: { dict: Dictionary['proof']; lang: Locale }) {
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
            {/* Technical hygiene is proof of care, not proof of results. The
                observatory is the figure a reader can weigh, so it is linked
                from here the day it has one. */}
            {OBSERVATORY_LIVE && (
              <Link
                href={observatoryHref(lang)}
                className="mt-5 inline-block font-semibold text-emerald underline-offset-4 hover:underline"
              >
                {getDictionary(lang).observatory.nav} →
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
