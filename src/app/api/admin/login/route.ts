import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  hasAdminCredentialsConfigured,
  verifyAdminCredentials,
} from '@/lib/admin-auth';
import { badRequest, getRequestId, normalizeText } from '@/lib/api';

export async function POST(request: NextRequest) {
  const requestId = getRequestId();
  const body = await request.json();
  const username = normalizeText(body?.username);
  const password = normalizeText(body?.password);

  if (!hasAdminCredentialsConfigured()) {
    return badRequest(requestId, 'Admin credentials are not configured');
  }

  if (!username || !password) {
    return badRequest(requestId, 'Username and password are required');
  }

  if (!verifyAdminCredentials(username, password)) {
    return badRequest(requestId, 'Invalid username or password');
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
