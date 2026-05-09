import fs from 'node:fs/promises';
import path from 'node:path';

export const ADMIN_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'admin');
const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
]);

export function sanitizeFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);
  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return `${safeName || 'asset'}${ext}`;
}

export function isAllowedUploadType(contentType: string): boolean {
  return ALLOWED_CONTENT_TYPES.has(contentType);
}

export function getMaxUploadSizeBytes(): number {
  return MAX_UPLOAD_SIZE_BYTES;
}

export async function ensureAdminUploadDir() {
  await fs.mkdir(ADMIN_UPLOAD_DIR, { recursive: true });
}

export async function writeUploadedFile(filename: string, bytes: Uint8Array) {
  await ensureAdminUploadDir();
  const filePath = path.join(ADMIN_UPLOAD_DIR, filename);
  await fs.writeFile(filePath, bytes);
  return `/uploads/admin/${filename}`;
}
