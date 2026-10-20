// The link preview image (Open Graph and Twitter), drawn per language.
//
// src/app/[lang]/opengraph-image.tsx and twitter-image.tsx both call this, so
// the picture a shared link shows is in the language of the page shared. Both
// are prerendered at build time, which is when the fonts are read from
// src/assets/og/ (the image renderer cannot use next/font, so it gets the same
// two families as the site, Bricolage Grotesque and Hanken Grotesk, as files).
//
// The look is the site's "Foret" hero: forest green ground, paper text, coral
// only as a fill. The logo is the one in Nav.tsx (rounded paper square with an
// "M", then "Maubourg" and a coral full stop), redrawn here in inline styles
// because the renderer does not read Tailwind classes.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/i18n';
import { shareImageSize } from '@/lib/share-image-size';

export { shareImageSize };

const ASSETS = join(process.cwd(), 'src/assets/og');

// The site's tokens (tailwind.config.js).
const INK = '#0F2A20';
const BONE = '#EEF0EA';
const BONE_85 = 'rgba(238, 240, 234, 0.85)';
const BONE_75 = 'rgba(238, 240, 234, 0.75)';
const BONE_DOT = 'rgba(238, 240, 234, 0.22)';
const SIGNAL = '#EE9278';

// The dot grid from the LinkedIn visuals: one coral dot among paper ones.
const GRID_COLS = 6;
const GRID_ROWS = 4;
const GRID_LIT = { row: 1, col: 4 };

export async function renderShareImage(lang: string) {
  const dict = getDictionary(lang);
  const [display600, display700, sans400, sans500] = await Promise.all([
    readFile(join(ASSETS, 'bricolage-grotesque-latin-600-normal.woff')),
    readFile(join(ASSETS, 'bricolage-grotesque-latin-700-normal.woff')),
    readFile(join(ASSETS, 'hanken-grotesk-latin-400-normal.woff')),
    readFile(join(ASSETS, 'hanken-grotesk-latin-500-normal.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: INK,
          color: BONE,
          fontFamily: 'Hanken Grotesk',
          padding: '64px 80px 60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 16,
                backgroundColor: BONE,
                color: INK,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Bricolage Grotesque',
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1,
              }}
            >
              M
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 20,
                fontFamily: 'Bricolage Grotesque',
                fontWeight: 700,
                fontSize: 42,
                lineHeight: 1,
                color: BONE,
              }}
            >
              Maubourg<span style={{ color: SIGNAL }}>.</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
            {Array.from({ length: GRID_ROWS }).map((_, row) => (
              <div key={row} style={{ display: 'flex', marginTop: row === 0 ? 0 : 18 }}>
                {Array.from({ length: GRID_COLS }).map((__, col) => {
                  const lit = row === GRID_LIT.row && col === GRID_LIT.col;
                  const size = lit ? 14 : 6;
                  return (
                    <div
                      key={col}
                      style={{
                        width: 14,
                        height: 14,
                        marginLeft: col === 0 ? 0 : 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: size,
                          height: size,
                          borderRadius: size / 2,
                          backgroundColor: lit ? SIGNAL : BONE_DOT,
                          display: 'flex',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -1.5,
              color: BONE,
              maxWidth: 980,
            }}
          >
            {dict.meta.shareTitle}
          </div>
          <div style={{ marginTop: 26, fontSize: 29, lineHeight: 1.4, color: BONE_85, maxWidth: 900 }}>
            {dict.meta.shareLine}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 500, color: BONE_75 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: SIGNAL, marginRight: 14, display: 'flex' }}
          />
          maubourg.studio
        </div>
      </div>
    ),
    {
      ...shareImageSize,
      fonts: [
        { name: 'Bricolage Grotesque', data: display600, weight: 600, style: 'normal' },
        { name: 'Bricolage Grotesque', data: display700, weight: 700, style: 'normal' },
        { name: 'Hanken Grotesk', data: sans400, weight: 400, style: 'normal' },
        { name: 'Hanken Grotesk', data: sans500, weight: 500, style: 'normal' },
      ],
    },
  );
}
