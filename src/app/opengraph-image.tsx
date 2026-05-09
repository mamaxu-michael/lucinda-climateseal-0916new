import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Climate Seal';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function getIconDataUri() {
  const iconPath = path.join(process.cwd(), 'public', 'favicon.png');
  const iconBuffer = await readFile(iconPath);
  return `data:image/png;base64,${iconBuffer.toString('base64')}`;
}

export default async function OpenGraphImage() {
  const iconSrc = await getIconDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#003f3a',
          color: 'white',
          padding: '64px 72px',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            width: '100%',
            maxWidth: 1040,
          }}
        >
          <img
            src={iconSrc}
            alt="Climate Seal emblem"
            width={180}
            height={180}
            style={{
              width: 180,
              height: 180,
              objectFit: 'contain',
            }}
          />

          <div
            style={{
              width: 4,
              height: 220,
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 999,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Arial, sans-serif',
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              Climate Seal
            </div>

            <div
              style={{
                width: 420,
                height: 4,
                background: 'rgba(255,255,255,0.88)',
                borderRadius: 999,
                marginBottom: 24,
              }}
            />

            <div
              style={{
                display: 'flex',
                fontFamily: 'Arial, sans-serif',
                fontSize: 30,
                fontWeight: 500,
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Credibility Drives Better Climate.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
