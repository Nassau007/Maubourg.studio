// Link preview image for every page under /en and /fr, in the page's language.
// Drawn by src/lib/share-image.tsx; this file only declares the route.

import { getDictionary, locales } from '@/lib/i18n';
import { renderShareImage, shareImageSize } from '@/lib/share-image';

export const contentType = 'image/png';

// Drawn once per language at build time rather than on each request.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang, __metadata_id__: ['card'] }));
}

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  return [
    {
      id: 'card',
      alt: getDictionary(params.lang).meta.shareAlt,
      size: shareImageSize,
      contentType,
    },
  ];
}

export default function Image({ params }: { params: { lang: string } }) {
  return renderShareImage(params.lang);
}
