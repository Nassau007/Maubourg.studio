import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage } from '@/lib/routes';

export default function Services({
  dict,
  lang,
}: {
  dict: Dictionary['services'];
  lang: Locale;
}) {
  return (
    <section id="work" className="hairline bg-bone-200/40 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">{dict.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              {/* Every card belongs to one of the five service pages, so the
                  whole card is the link. The arrow only appears on hover, so a
                  grid of ten does not read as a wall of arrows. */}
              <Link
                href={localizedHref(s.page as VerticalPage, lang)}
                className="card card-hover group flex h-full flex-col"
              >
                <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald">
                  {s.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {s.title}
                  <span
                    aria-hidden
                    className="ml-1.5 inline-block text-emerald opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
