// The observatory's page bodies: index, method, one vertical, one edition.
//
// The words and the figures come from the edition's texts in
// content/atlas/<edition>/, rendered as written; the charts come from
// the CSVs published beside them. These components only lay them out. Edition
// 1 is French; the English side is the index alone, a summary.

import Link from 'next/link';
import ObservatoryFrame, { ObservatoryHead } from '@/components/observatory/ObservatoryFrame';
import { ObservatoryLead, ObservatorySections } from '@/components/observatory/ObservatoryDoc';
import { getDictionary, type Locale } from '@/lib/i18n';
import {
  OBSERVATORY_EDITIONS,
  OBSERVATORY_VERTICALS,
  editionHref,
  verticalHref,
  type ObservatoryEdition,
  type ObservatoryVertical,
} from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}

function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/**
 * One line that says what an edition covers. Built from the edition entry, so
 * it cannot say "5 runs per question" when only 12 of the 60 had five.
 */
export function editionFacts(edition: ObservatoryEdition, lang: Locale): string {
  const f = getDictionary(lang).observatory.facts;
  return [
    edition.engines.join(', '),
    fill(f.questions, {
      queries: edition.queries,
      repeated: edition.repeated.queries,
      runs: edition.repeated.runs,
    }),
    fill(f.answers, { answers: edition.answers }),
    fill(f.published, { date: formatDate(edition.published, lang) }),
  ].join(' · ');
}

export function ObservatoryIndexScreen({ lang, edition }: { lang: Locale; edition: ObservatoryEdition }) {
  const o = getDictionary(lang).observatory;
  const doc = loadObservatoryDoc(edition, 'index', lang);

  return (
    <ObservatoryFrame lang={lang}>
      <ObservatoryHead eyebrow={o.eyebrow} title={doc.title}>
        <ObservatoryLead parts={doc.lead} edition={edition} lang={lang} />
      </ObservatoryHead>

      <ObservatorySections sections={doc.sections} edition={edition} lang={lang} />

      {/* The French side lists what the section holds: the editions, then
          the page about the reader's own category. The English summary links
          to the French pages from its own text instead. */}
      {lang === 'fr' && (
        <section className="mx-auto max-w-content space-y-12 px-5 pb-16 md:px-8 md:pb-24">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
              {o.editionsHeading}
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {OBSERVATORY_EDITIONS.map((e) => (
                <li key={e.slug}>
                  <Link href={editionHref(e, lang)} className="card card-hover block">
                    <p className="font-display text-lg font-semibold text-ink">
                      {fill(o.edition, { n: e.number })}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">{editionFacts(e, lang)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
              {o.verticalsHeading}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {OBSERVATORY_VERTICALS.map((vertical) => (
                <Link key={vertical.id} href={verticalHref(vertical, lang)} className="card card-hover group">
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
          </div>
        </section>
      )}
    </ObservatoryFrame>
  );
}

export function ObservatoryMethodScreen({ lang, edition }: { lang: Locale; edition: ObservatoryEdition }) {
  const o = getDictionary(lang).observatory;
  const doc = loadObservatoryDoc(edition, 'methodologie', lang);

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead eyebrow={o.eyebrow} title={doc.title}>
        <ObservatoryLead parts={doc.lead} edition={edition} lang={lang} />
      </ObservatoryHead>
      <ObservatorySections sections={doc.sections} edition={edition} lang={lang} />
    </ObservatoryFrame>
  );
}

export function ObservatoryVerticalScreen({
  lang,
  vertical,
  edition,
}: {
  lang: Locale;
  vertical: ObservatoryVertical;
  edition: ObservatoryEdition;
}) {
  const o = getDictionary(lang).observatory;
  const doc = loadObservatoryDoc(edition, vertical.slug.fr, lang);

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead eyebrow={o.eyebrow} title={doc.title}>
        <ObservatoryLead parts={doc.lead} edition={edition} lang={lang} />
      </ObservatoryHead>
      <ObservatorySections sections={doc.sections} edition={edition} lang={lang} />
    </ObservatoryFrame>
  );
}

export function ObservatoryEditionScreen({ lang, edition }: { lang: Locale; edition: ObservatoryEdition }) {
  const o = getDictionary(lang).observatory;
  const doc = loadObservatoryDoc(edition, 'edition', lang);

  return (
    <ObservatoryFrame lang={lang} showBreadcrumb>
      <ObservatoryHead
        eyebrow={`${o.eyebrow} · ${fill(o.edition, { n: edition.number })}`}
        title={doc.title}
        facts={editionFacts(edition, lang)}
      >
        <ObservatoryLead parts={doc.lead} edition={edition} lang={lang} />
      </ObservatoryHead>
      <ObservatorySections
        sections={doc.sections}
        edition={edition}
        lang={lang}
        highlight={['en-bref']}
      />
    </ObservatoryFrame>
  );
}
