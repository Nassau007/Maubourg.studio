// One archived edition, in English. An edition is never overwritten: a new
// campaign adds a page, it does not edit the previous one. That is the whole
// value of the dataset, the same queries tracked across model generations.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryEditionScreen } from '@/components/observatory/ObservatoryScreens';
import { getDictionary } from '@/lib/i18n';
import { OBSERVATORY_EDITIONS, editionHref, getEdition } from '@/lib/observatory';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') return [];
  return OBSERVATORY_EDITIONS.map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; edition: string };
}): Promise<Metadata> {
  const edition = getEdition(params.edition);
  if (!edition) return {};
  const o = getDictionary('en').observatory;

  return observatoryMetadata({
    lang: 'en',
    path: editionHref(edition, 'en'),
    title: `${o.facts.campaign} ${edition.slug} - ${o.meta.title}`,
    description: o.meta.description,
    alternates: {
      en: editionHref(edition, 'en'),
      fr: editionHref(edition, 'fr'),
      'x-default': editionHref(edition, 'fr'),
    },
  });
}

export default function Page({ params }: { params: { lang: string; edition: string } }) {
  if (params.lang !== 'en') notFound();
  const edition = getEdition(params.edition);
  if (!edition) notFound();
  return <ObservatoryEditionScreen lang="en" edition={edition} />;
}
