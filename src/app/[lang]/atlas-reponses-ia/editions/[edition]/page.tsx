// One edition, in French: the full study, with its charts and their tables.
// An edition is never overwritten: a new campaign adds a page, it does not
// edit the previous one. That is the whole value of the dataset, the same
// queries tracked across model generations. French only: no English twin is
// declared.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryEditionScreen } from '@/components/observatory/ObservatoryScreens';
import { ObservatoryJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { OBSERVATORY_EDITIONS, editionHref, getEdition } from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') return [];
  return OBSERVATORY_EDITIONS.map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; edition: string };
}): Promise<Metadata> {
  const edition = getEdition(params.edition);
  if (!edition) return {};
  const doc = loadObservatoryDoc(edition, 'edition', 'fr');
  return observatoryMetadata({
    lang: 'fr',
    path: editionHref(edition, 'fr'),
    title: doc.metaTitle,
    description: doc.description,
  });
}

export default function Page({ params }: { params: { lang: string; edition: string } }) {
  if (params.lang !== 'fr') notFound();
  const edition = getEdition(params.edition);
  if (!edition) notFound();
  const doc = loadObservatoryDoc(edition, 'edition', 'fr');
  return (
    <>
      <ObservatoryJsonLd
        lang="fr"
        path={editionHref(edition, 'fr')}
        name={getDictionary('fr').observatory.dataset.name.replace('{n}', String(edition.number))}
        description={doc.description}
      />
      <ObservatoryEditionScreen lang="fr" edition={edition} />
    </>
  );
}
