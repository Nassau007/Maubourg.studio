// Paths of the link preview images drawn by src/app/[lang]/opengraph-image.tsx
// and twitter-image.tsx. A page that declares its own openGraph block replaces
// the layout's wholesale, so it has to restate the image: these keep every
// page pointing at the same, per-language picture.

import { getDictionary } from '@/lib/i18n';
import { shareImageSize } from '@/lib/share-image-size';

export function ogImage(lang: string) {
  return {
    url: `/${lang}/opengraph-image/card`,
    ...shareImageSize,
    alt: getDictionary(lang).meta.shareAlt,
  };
}

export function twitterImage(lang: string) {
  return {
    url: `/${lang}/twitter-image/card`,
    ...shareImageSize,
    alt: getDictionary(lang).meta.shareAlt,
  };
}
