import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { LANGUAGE_COOKIE, LANGUAGE_HEADER, resolveLanguage } from '@/lib/language';

export function middleware(request: NextRequest) {
  const queryLanguage = request.nextUrl.searchParams.get('lang');
  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const language = resolveLanguage(queryLanguage || cookieLanguage);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANGUAGE_HEADER, language);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set(LANGUAGE_COOKIE, language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|rss.xml).*)'],
};
