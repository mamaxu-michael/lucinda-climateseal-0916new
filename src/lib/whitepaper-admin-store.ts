import fs from 'node:fs';
import path from 'node:path';

export type ManagedWhitepaper = {
  id: string;
  title: string;
  titleZh: string;
  intro: string;
  introZh: string;
  thumbnail: string;
  whatYouGet: string[];
  whatYouGetZh: string[];
  topics: string[];
  publishDate: string;
  downloadUrl: string;
  formRecipient: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

const ADMIN_WHITEPAPERS_FILE = path.join(process.cwd(), 'data', 'admin', 'whitepapers.json');

function ensureWhitepaperStoreDir() {
  fs.mkdirSync(path.dirname(ADMIN_WHITEPAPERS_FILE), { recursive: true });
}

export function listManagedWhitepapers(): ManagedWhitepaper[] {
  ensureWhitepaperStoreDir();

  try {
    const content = fs.readFileSync(ADMIN_WHITEPAPERS_FILE, 'utf8');
    return JSON.parse(content) as ManagedWhitepaper[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function writeManagedWhitepapers(whitepapers: ManagedWhitepaper[]) {
  ensureWhitepaperStoreDir();
  fs.writeFileSync(ADMIN_WHITEPAPERS_FILE, JSON.stringify(whitepapers, null, 2), 'utf8');
}

export function upsertManagedWhitepaper(whitepaper: ManagedWhitepaper) {
  const whitepapers = listManagedWhitepapers();
  const index = whitepapers.findIndex((item) => item.id === whitepaper.id);

  if (index >= 0) {
    whitepapers[index] = whitepaper;
  } else {
    whitepapers.unshift(whitepaper);
  }

  writeManagedWhitepapers(whitepapers);
}

export function getManagedWhitepaperById(id: string): ManagedWhitepaper | undefined {
  return listManagedWhitepapers().find((whitepaper) => whitepaper.id === id);
}

export function removeManagedWhitepaper(id: string) {
  const whitepapers = listManagedWhitepapers().filter((whitepaper) => whitepaper.id !== id);
  writeManagedWhitepapers(whitepapers);
}
