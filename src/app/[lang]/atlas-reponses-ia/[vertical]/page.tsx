// One vertical of the observatory, in French. Someone asking a model about
// mattresses needs a page about mattresses: one page cannot serve three
// categories, and this is also the URL pasted into an email to a prospect in
// that category. French only: no English twin is declared.
//
// dynamicParams is off, so a slug that is not in the panel 404s without the
// renderer ever running.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryVerticalScreen } from '@/components/observatory/ObservatoryScreens';
import { ObservatoryJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import {
  OBSERVATORY_VERTICALS,
  getVerticalBySlug,
  latestEdition,
  verticalHref,
} from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') return [];
  return OBSERVATORY_VERTICALS.map((vertical) => ({ vertical: vertical.slug.fr }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; vertical: string };
}): Promise<Metadata> {
  const vertical = getVerticalBySlug(params.vertical, 'fr');
  const edition = latestEdition();
  if (!vertical || !edition) return {};
  const doc = loadObservatoryDoc(edition, vertical.slug.fr, 'fr');
  return observatoryMetadata({
    lang: 'fr',
    path: verticalHref(vertical, 'fr'),
    title: doc.metaTitle,
    description: doc.description,
  });
}

export default function Page({ params }: { params: { lang: string; vertical: string } }) {
  if (params.lang !== 'fr') notFound();
  const vertical = getVerticalBySlug(params.vertical, 'fr');
  const edition = latestEdition();
  if (!vertical || !edition) notFound();
  const doc = loadObservatoryDoc(edition, vertical.slug.fr, 'fr');
  const o = getDictionary('fr').observatory;
  return (
    <>
      <ObservatoryJsonLd
        lang="fr"
        path={verticalHref(vertical, 'fr')}
        name={`${o.meta.title.replace(' - Maubourg Studio', '')} : ${o.verticals[vertical.id]}`}
        description={doc.description}
      />
      <ObservatoryVerticalScreen lang="fr" vertical={vertical} edition={edition} />
    </>
  );
}
