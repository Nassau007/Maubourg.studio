// Renders one observatory text (see src/lib/observatory-content.ts): its
// sections, its figures, and the few blocks the page draws itself.

import Link from 'next/link';
import Prose, { Spans } from '@/components/article/Prose';
import ObservatoryChart from '@/components/observatory/ObservatoryCharts';
import { getDictionary, type Locale } from '@/lib/i18n';
import { editionHref, type ObservatoryEdition } from '@/lib/observatory';
import type { CaptureLayout, DocPart, DocSection } from '@/lib/observatory-content';

// The chat screenshots keep their own proportions: a grid cell never crops an
// answer, it only scales it. A single picture is never drawn wider than its
// file, so a small crop stays sharp.
const CAPTURE_GRID: Record<CaptureLayout, string> = {
  seule: 'grid grid-cols-1',
  paire: 'grid items-start gap-5 md:grid-cols-2',
  grille: 'grid items-start gap-5 sm:grid-cols-2',
  bande: 'grid items-start gap-4 grid-cols-2 md:grid-cols-4',
};

/** The three files of an edition and their licence. */
export function ObservatoryDataLinks({ edition, lang }: { edition: ObservatoryEdition; lang: Locale }) {
  const d = getDictionary(lang).observatory.data;
  if (!edition.aggregate) return null;
  const files = [
    [d.questions, edition.aggregate.questions],
    [d.citations, edition.aggregate.citations],
    [d.sources, edition.aggregate.sources],
    [d.readme, edition.aggregate.readme],
  ];
  return (
    <div className="rounded-card border border-ink/10 bg-bone-100 p-5 md:p-6">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {files.map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              className="font-semibold text-emerald underline underline-offset-4 decoration-emerald/30 hover:decoration-emerald"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[14px] text-ink-600">{d.licence}</p>
    </div>
  );
}

function Parts({
  parts,
  edition,
  lang,
}: {
  parts: DocPart[];
  edition: ObservatoryEdition;
  lang: Locale;
}) {
  const o = getDictionary(lang).observatory;
  return (
    <div className="space-y-6">
      {parts.map((part, i) => {
        if (part.kind === 'blocks') return <Prose key={i} blocks={part.blocks} className="max-w-3xl" />;

        if (part.kind === 'figure') {
          return (
            <figure key={i} id={`graphique-${part.id}`} className="max-w-5xl space-y-5 pt-2">
              {part.caption && part.caption.kind === 'p' && (
                <figcaption className="max-w-3xl text-[15px] leading-relaxed text-ink-600">
                  <Spans content={part.caption.content} />
                </figcaption>
              )}
              <ObservatoryChart edition={edition} id={part.id} lang={lang} vertical={part.vertical} />
              {part.blocks.length > 0 && <Prose blocks={part.blocks} />}
            </figure>
          );
        }

        if (part.kind === 'captures') {
          return (
            <figure key={i} className="max-w-5xl space-y-5 pt-2">
              {part.caption && part.caption.kind === 'p' && (
                <figcaption className="max-w-3xl text-[15px] leading-relaxed text-ink-600">
                  <Spans content={part.caption.content} />
                </figcaption>
              )}
              <div className={CAPTURE_GRID[part.layout]}>
                {part.images.map((image) => (
                  <div
                    key={image.src}
                    className="space-y-2"
                    style={part.layout === 'seule' ? { maxWidth: image.width } : undefined}
                  >
                    <a
                      href={image.href}
                      className="block overflow-hidden rounded-card border border-ink/10 bg-white transition-colors hover:border-emerald/40"
                    >
                      {/* A plain img: the files are already sized and compressed,
                          and the site has no image optimiser to route them through. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </a>
                    <p className="text-[13px] leading-snug text-ink-500">
                      {image.label && <span>{image.label} · </span>}
                      <a
                        href={image.href}
                        className="font-medium text-emerald underline underline-offset-4 decoration-emerald/30 hover:decoration-emerald"
                      >
                        {image.crop ? o.captureWhole : o.captureOpen}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </figure>
          );
        }

        // A takeaway: what a finding implies, drawn as a sober report insert
        // (warm grey ground, thin ink rule) so it reads as part of the study,
        // with one sentence in bold for the reader who only scans.
        if (part.kind === 'takeaway') {
          return (
            <aside
              key={i}
              className="max-w-3xl rounded-l-none rounded-r-[4px] border-l-2 border-ink bg-[rgba(20,20,15,0.045)] px-5 py-4 md:px-6 md:py-5"
            >
              {part.label && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b6b5e]">{part.label}</p>
              )}
              <div className="space-y-3 text-[17px] font-normal leading-[1.65] text-ink md:text-[18px] [&_strong]:font-[650] [&_strong]:text-ink">
                {part.blocks.map((block, j) => {
                  if (block.kind === 'p') {
                    return (
                      <p key={j}>
                        <Spans content={block.content} />
                      </p>
                    );
                  }
                  if (block.kind === 'ul') {
                    return (
                      <ul key={j} className="space-y-3 pl-5">
                        {block.items.map((item, k) => (
                          <li key={k} className="list-disc marker:text-ink">
                            <Spans content={item} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <Prose key={j} blocks={[block]} />;
                })}
              </div>
            </aside>
          );
        }

        // Directives.
        if (part.name === 'detail' && part.arg) {
          return (
            <p key={i}>
              <Link
                href={`${editionHref(edition, lang === 'en' ? 'fr' : lang)}#${part.arg}`}
                className="text-[15px] font-semibold text-emerald underline-offset-4 hover:underline"
              >
                {o.detailLink}
              </Link>
            </p>
          );
        }
        if (part.name === 'donnees') return <ObservatoryDataLinks key={i} edition={edition} lang={lang} />;
        return null;
      })}
    </div>
  );
}

/** The lead of a text: everything between its title and its first section. */
export function ObservatoryLead({
  parts,
  edition,
  lang,
}: {
  parts: DocPart[];
  edition: ObservatoryEdition;
  lang: Locale;
}) {
  return <Parts parts={parts} edition={edition} lang={lang} />;
}

export function ObservatorySections({
  sections,
  edition,
  lang,
  highlight = [],
}: {
  sections: DocSection[];
  edition: ObservatoryEdition;
  lang: Locale;
  /** Section ids drawn as a card (the "En bref" of the edition). */
  highlight?: string[];
}) {
  return (
    <div className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-20">
      <div className="space-y-14 md:space-y-16">
        {sections.map((section, i) => {
          const card = section.id !== null && highlight.includes(section.id);
          return (
            <section
              key={i}
              id={section.id ?? undefined}
              className={`scroll-mt-28 ${card ? 'max-w-3xl rounded-card border border-emerald/20 bg-emerald-50 p-6 md:p-8' : ''}`}
            >
              <h2 className="max-w-3xl font-display text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5">
                <Parts parts={section.parts} edition={edition} lang={lang} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
