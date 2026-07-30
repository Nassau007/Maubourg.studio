// French counterpart of the retired demo path. See try-an-agent/page.tsx.

import { redirect, permanentRedirect } from 'next/navigation';
import { localizedPaths } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export default function EssayerUnAgentRedirect({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') redirect('/fr' + localizedPaths.agents.fr);
  permanentRedirect('/fr' + localizedPaths.agents.fr);
}
