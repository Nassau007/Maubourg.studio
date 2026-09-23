// The observatory's four page bodies: index, method, one vertical, one
// edition. Both languages render the same components, the way the service
// pages do.
//
// None of them holds a figure. A figure belongs to an edition, is written when
// a campaign has produced it, and carries the query ID it came from. Until then
// every page renders its heading and the empty state.

import Link from 'next/link';
import ObservatoryFrame, {
  ObservatoryEmpty,
  ObservatoryHead,
} from '@/components/observatory/ObservatoryFrame';
import { getDictionary, type Locale } from '@/lib/i18n';
import {
  OBSERVATORY_EDITIONS,
  OBSERVATORY_VERTICALS,
  editionHref,
  methodologyHref,
  verticalHref,
  type ObservatoryEdition,
  type ObservatoryVertical,
} from '@/lib/observatory';

export function ObservatoryIndexScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const o = dict.observatory;

  return (
    <ObservatoryFrame lang={lang}>
      <ObservatoryHead eyebrow={o.eyebrow} title={o.title} intro={o.intro} />

      <section className="mx-auto max-w-content px-5 pb-10 md:px-8">
        <Link
          href={methodologyHref(lang)}
          className="font-semibold text-emerald underline-offset-4 hover:underline"
        >
          {o.methodLink}
        </Link>
      </section>

      {OBSERVATORY_EDITIONS.length === 0 ? (
        <ObservatoryEmpty title={o.empty.title} body={o.empty.body} />
      ) : (
        <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {o.editionsHeading}
          </h2>
          <ul className="mt-5 space-y-3">
            {OBSERVATORY_EDITIONS.map((edition) => (
              <li key={edition.slug}>
                <Link
                  href={editionHref(edition, lang)}
                  className="card card-hover block"
                >
                  <p className="font-display text-lg font-semibold text-ink">{edition.slug}</p>
                  <p className="mt-1 text-sm text-ink-600">
                    {o.facts.engines}: {edition.engines.join(', ')} · {o.facts.queries}:{' '}
                    {edition.queries} · {o.facts.runsPerQuery}: {edition.runsPerQuery}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* The verticals. Listed from the index whether or not they have data:
          the page a reader wants is the one about their own category. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
          {o.verticalsHeading}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {OBSERVATORY_VERTICALS.map((vertical) => (
            <Link
              key={vertical.id}
              href={verticalHref(vertical, lang)}
              className="card card-hover group"
            >
              <p className="font-display text-lg font-semibold text-ink">
                {o.verticals[vertical.id]}{' '}
                <span
                  aria-hidden
                  className="inline-block text-emerald transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </ObservatoryFrame>
  );
}

export function ObservatoryMethodScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const o = dict.observatory;

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead eyebrow={o.eyebrow} title={o.methodHeading} />
      <ObservatoryEmpty title={o.empty.title} body={o.empty.body} />
    </ObservatoryFrame>
  );
}

export function ObservatoryVerticalScreen({
  lang,
  vertical,
}: {
  lang: Locale;
  vertical: ObservatoryVertical;
}) {
  const dict = getDictionary(lang);
  const o = dict.observatory;

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead eyebrow={o.eyebrow} title={o.verticals[vertical.id]} />
      <ObservatoryEmpty title={o.empty.title} body={o.empty.body} />
    </ObservatoryFrame>
  );
}

export function ObservatoryEditionScreen({
  lang,
  edition,
}: {
  lang: Locale;
  edition: ObservatoryEdition;
}) {
  const dict = getDictionary(lang);
  const o = dict.observatory;

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead eyebrow={o.eyebrow} title={`${o.facts.campaign} ${edition.slug}`} />

      {/* What the campaign was, in facts that come from the data file rather
          than from copy. The findings themselves are added per edition. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <dl className="max-w-2xl divide-y divide-ink/10 border-y border-ink/10">
          {[
            [o.facts.engines, edition.engines.join(', ')],
            [o.facts.queries, String(edition.queries)],
            [o.facts.runsPerQuery, String(edition.runsPerQuery)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 py-3.5">
              <dt className="text-sm text-ink-500">{label}</dt>
              <dd className="text-sm font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        {edition.aggregate && (
          <a
            href={edition.aggregate}
            className="mt-6 inline-block font-semibold text-emerald underline-offset-4 hover:underline"
          >
            {o.facts.download}
          </a>
        )}

        <p className="mt-6 text-[13px] italic text-ink-500">{o.licence}</p>
      </section>
    </ObservatoryFrame>
  );
}
