import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('t') || 'Climate Seal';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#003432"/>
          <stop offset="100%" stop-color="#1E1F22"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="60" y="330" font-size="72" font-family="Helvetica, Arial, sans-serif" fill="#9ef894">
        ${title.replace(/</g, '&lt;')}
      </text>
    </svg>`;
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}


