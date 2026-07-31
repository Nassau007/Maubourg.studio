// English slug of the privacy page. French: /fr/confidentialite.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivacyScreen from '@/components/PrivacyScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const p = getDictionary('en').privacy;
  return localizedMetadata({
    page: 'privacy',
    lang: 'en',
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') notFound();
  return <PrivacyScreen lang="en" />;
}
