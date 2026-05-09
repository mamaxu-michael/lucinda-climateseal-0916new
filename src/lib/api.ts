import { NextResponse } from 'next/server';

type FieldMap = Record<string, string | undefined>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s().-]{7,25}$/;

export function getRequestId(): string {
  return crypto.randomUUID();
}

export function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeHtmlWithLineBreaks(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

export function validateRequiredFields(fields: FieldMap, requiredKeys: string[]): string[] {
  return requiredKeys.filter((key) => !fields[key]);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone);
}

export function badRequest(requestId: string, error: string) {
  return NextResponse.json({ error, requestId }, { status: 400 });
}

export function serverError(requestId: string) {
  return NextResponse.json({ error: 'Internal server error', requestId }, { status: 500 });
}

export function logApiEvent(
  route: string,
  requestId: string,
  event: string,
  details?: Record<string, unknown>
) {
  const payload = details ? ` ${JSON.stringify(details)}` : '';
  console.info(`[api:${route}] [${requestId}] ${event}${payload}`);
}
