// The link preview image (Open Graph and Twitter), drawn per language.
//
// src/app/[lang]/opengraph-image.tsx and twitter-image.tsx both call this, so
// the picture a shared link shows is in the language of the page shared. Both
// are prerendered at build time, which is when the fonts and the mark are read
// from src/assets/og/.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/i18n';
import { shareImageSize } from '@/lib/share-image-size';

export { shareImageSize };

const ASSETS = join(process.cwd(), 'src/assets/og');

// The site's tokens (tailwind.config.js). The background matches the mark's
// own paper so the PNG sits on it without a visible edge.
const PAPER = '#FCF9F5';
const INK = '#14140F';
const INK_600 = '#565646';
const EMERALD = '#0E6B4A';
const SIGNAL = '#CBF74A';

export async function renderShareImage(lang: string) {
  const dict = getDictionary(lang);
  const [mark, fraunces, inter, interBold] = await Promise.all([
    readFile(join(ASSETS, 'mark.png')),
    readFile(join(ASSETS, 'fraunces-latin-600-normal.woff')),
    readFile(join(ASSETS, 'inter-latin-400-normal.woff')),
    readFile(join(ASSETS, 'inter-latin-600-normal.woff')),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: PAPER,
          fontFamily: 'Inter',
        }}
      >
        <div style={{ width: 14, height: '100%', backgroundColor: EMERALD, display: 'flex' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 84px 0 56px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={300} height={300} alt="" style={{ flexShrink: 0 }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 44,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: EMERALD,
              }}
            >
              <div style={{ width: 36, height: 2, backgroundColor: EMERALD, marginRight: 14, display: 'flex' }} />
              Maubourg Studio
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: 'Fraunces',
                fontSize: 60,
                lineHeight: 1.08,
                letterSpacing: -1.5,
                color: INK,
              }}
            >
              {dict.meta.shareTitle}
            </div>
            <div style={{ marginTop: 26, fontSize: 27, lineHeight: 1.4, color: INK_600 }}>
              {dict.meta.shareLine}
            </div>
            <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', fontSize: 22, color: INK }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: SIGNAL, marginRight: 12, display: 'flex' }} />
              maubourg.studio
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...shareImageSize,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
        { name: 'Inter', data: inter, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 600, style: 'normal' },
      ],
    },
  );
}
