import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_SESSION_COOKIE = 'climate-seal-admin-session';

type AdminSessionPayload = {
  username: string;
  expiresAt: number;
};

function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || 'admin';
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '';
}

function getAdminSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'development-admin-secret';
}

function encodePayload(payload: AdminSessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(payload: string): AdminSessionPayload | null {
  try {
    const raw = Buffer.from(payload, 'base64url').toString('utf8');
    const parsed = JSON.parse(raw) as Partial<AdminSessionPayload>;

    if (
      typeof parsed.username !== 'string' ||
      typeof parsed.expiresAt !== 'number' ||
      !Number.isFinite(parsed.expiresAt)
    ) {
      return null;
    }

    return {
      username: parsed.username,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

function signPayload(encodedPayload: string): string {
  return createHmac('sha256', getAdminSessionSecret()).update(encodedPayload).digest('base64url');
}

export function hasAdminCredentialsConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === getAdminUsername() && password === getAdminPassword();
}

export function createAdminSessionToken(username: string): string {
  const payload: AdminSessionPayload = {
    username,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  const encodedPayload = encodePayload(payload);
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): AdminSessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return null;
  }

  const payload = decodePayload(encodedPayload);
  if (!payload || payload.expiresAt < Date.now()) {
    return null;
  }

  return payload;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  if (!hasAdminCredentialsConfigured()) {
    redirect('/admin/login?setup=missing');
  }

  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return session;
}
