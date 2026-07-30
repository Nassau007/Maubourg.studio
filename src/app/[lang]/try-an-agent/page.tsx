// English slug of the live agent demo. The French one lives at
// /fr/essayer-un-agent; both render AgentDemoScreen. Any other locale 404s
// here rather than serving an English URL with French copy inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AgentDemoScreen from '@/components/AgentDemoScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const d = getDictionary('en').agentDemo;
  return localizedMetadata({
    page: 'agentDemo',
    lang: 'en',
    title: d.metaTitle,
    description: d.metaDescription,
  });
}

export default function TryAnAgentPage({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') notFound();
  return <AgentDemoScreen lang="en" />;
}
