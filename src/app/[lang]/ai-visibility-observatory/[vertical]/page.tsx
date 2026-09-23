// One vertical of the observatory, in English. Someone asking a model about
// mattresses needs a page about mattresses: one page cannot serve three
// categories, and this is also the URL pasted into an email to a prospect in
// that category.
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
  verticalHref,
} from '@/lib/observatory';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') return [];
  return OBSERVATORY_VERTICALS.map((vertical) => ({ vertical: vertical.slug.en }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; vertical: string };
}): Promise<Metadata> {
  const vertical = getVerticalBySlug(params.vertical, 'en');
  if (!vertical) return {};
  const o = getDictionary('en').observatory;
  const name = o.verticals[vertical.id];

  return observatoryMetadata({
    lang: 'en',
    path: verticalHref(vertical, 'en'),
    title: `${name} - ${o.meta.title}`,
    description: o.meta.description,
    alternates: {
      en: verticalHref(vertical, 'en'),
      fr: verticalHref(vertical, 'fr'),
      'x-default': verticalHref(vertical, 'fr'),
    },
  });
}

export default function Page({ params }: { params: { lang: string; vertical: string } }) {
  if (params.lang !== 'en') notFound();
  const vertical = getVerticalBySlug(params.vertical, 'en');
  if (!vertical) notFound();
  return (
    <>
      <ObservatoryJsonLd lang="en" vertical={vertical} />
      <ObservatoryVerticalScreen lang="en" vertical={vertical} />
    </>
  );
}
