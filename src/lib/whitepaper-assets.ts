import fs from 'node:fs';
import path from 'node:path';
import type { WhitepaperItem } from '@/lib/content';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DEFAULT_WHITEPAPER_THUMBNAIL = '/logo.jpg';

function getPublicAssetPath(assetUrl: string): string | null {
  if (!assetUrl || !assetUrl.startsWith('/')) {
    return null;
  }

  return path.join(PUBLIC_DIR, assetUrl.replace(/^\/+/, ''));
}

function publicAssetExists(assetUrl: string): boolean {
  const assetPath = getPublicAssetPath(assetUrl);
  return Boolean(assetPath && fs.existsSync(assetPath));
}

export function getWhitepaperThumbnailSrc(whitepaper: WhitepaperItem): string {
  return publicAssetExists(whitepaper.thumbnail) ? whitepaper.thumbnail : DEFAULT_WHITEPAPER_THUMBNAIL;
}

export function getWhitepaperDownloadUrl(whitepaper: WhitepaperItem): string | null {
  return publicAssetExists(whitepaper.downloadUrl) ? whitepaper.downloadUrl : null;
}

export function hasWhitepaperDownloadAsset(whitepaper: WhitepaperItem): boolean {
  return getWhitepaperDownloadUrl(whitepaper) !== null;
}
