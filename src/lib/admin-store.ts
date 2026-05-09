import fs from 'node:fs/promises';
import path from 'node:path';

export type ContactSubmission = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
  referralCode?: string;
  referralOwnerId?: string;
  referralOwnerName?: string;
};

export type WhitepaperSubmission = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  whitepaperId: string;
  whitepaperTitle: string;
  instantDownloadAvailable: boolean;
  deliveryMode: 'download' | 'email' | 'manual';
};

export type UploadedAsset = {
  id: string;
  uploadedAt: string;
  filename: string;
  originalFilename: string;
  url: string;
  contentType: string;
  size: number;
};

export type ReferralOwner = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  role: 'expert' | 'consultant' | 'brand_manager' | 'procurement_manager' | 'other';
  company: string;
  referralCode: string;
  status: 'active' | 'inactive';
  notes?: string;
};

export type ReferralUse = {
  id: string;
  createdAt: string;
  referralCode: string;
  referralOwnerId: string;
  referralOwnerName: string;
  referredName: string;
  referredEmail: string;
  referredCompany: string;
  source: 'contact_form';
  contactSubmissionId: string;
  status: 'new' | 'qualified' | 'converted' | 'credited' | 'rejected';
  rewardValueUsd: number;
  notes?: string;
};

const ADMIN_DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const CONTACTS_FILE = path.join(ADMIN_DATA_DIR, 'contact-submissions.json');
const WHITEPAPERS_FILE = path.join(ADMIN_DATA_DIR, 'whitepaper-submissions.json');
const ASSETS_FILE = path.join(ADMIN_DATA_DIR, 'uploaded-assets.json');
const REFERRAL_OWNERS_FILE = path.join(ADMIN_DATA_DIR, 'referral-owners.json');
const REFERRAL_USES_FILE = path.join(ADMIN_DATA_DIR, 'referral-uses.json');

async function ensureAdminDir() {
  await fs.mkdir(ADMIN_DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  await ensureAdminDir();

  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeJsonFile<T>(filePath: string, rows: T[]) {
  await ensureAdminDir();
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2), 'utf8');
}

async function appendJsonRow<T>(filePath: string, row: T) {
  const rows = await readJsonFile<T>(filePath);
  rows.unshift(row);
  await writeJsonFile(filePath, rows);
}

export async function saveContactSubmission(submission: ContactSubmission) {
  await appendJsonRow(CONTACTS_FILE, submission);
}

export async function saveWhitepaperSubmission(submission: WhitepaperSubmission) {
  await appendJsonRow(WHITEPAPERS_FILE, submission);
}

export async function saveUploadedAsset(asset: UploadedAsset) {
  await appendJsonRow(ASSETS_FILE, asset);
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  return readJsonFile<ContactSubmission>(CONTACTS_FILE);
}

export async function listWhitepaperSubmissions(): Promise<WhitepaperSubmission[]> {
  return readJsonFile<WhitepaperSubmission>(WHITEPAPERS_FILE);
}

export async function listUploadedAssets(): Promise<UploadedAsset[]> {
  return readJsonFile<UploadedAsset>(ASSETS_FILE);
}

export async function saveReferralOwner(owner: ReferralOwner) {
  const owners = await readJsonFile<ReferralOwner>(REFERRAL_OWNERS_FILE);
  owners.unshift(owner);
  await writeJsonFile(REFERRAL_OWNERS_FILE, owners);
}

export async function listReferralOwners(): Promise<ReferralOwner[]> {
  return readJsonFile<ReferralOwner>(REFERRAL_OWNERS_FILE);
}

export async function findReferralOwnerByCode(referralCode: string): Promise<ReferralOwner | null> {
  const owners = await listReferralOwners();
  const normalized = referralCode.trim().toUpperCase();
  return owners.find((owner) => owner.referralCode.toUpperCase() === normalized && owner.status === 'active') ?? null;
}

export async function updateReferralOwner(
  ownerId: string,
  updates: Partial<Omit<ReferralOwner, 'id' | 'createdAt'>>
) {
  const owners = await listReferralOwners();
  const nextOwners = owners.map((owner) => (owner.id === ownerId ? { ...owner, ...updates } : owner));
  await writeJsonFile(REFERRAL_OWNERS_FILE, nextOwners);
}

export async function saveReferralUse(referralUse: ReferralUse) {
  await appendJsonRow(REFERRAL_USES_FILE, referralUse);
}

export async function listReferralUses(): Promise<ReferralUse[]> {
  return readJsonFile<ReferralUse>(REFERRAL_USES_FILE);
}

export async function updateReferralUse(
  referralUseId: string,
  updates: Partial<Omit<ReferralUse, 'id' | 'createdAt'>>
) {
  const uses = await listReferralUses();
  const nextUses = uses.map((use) => (use.id === referralUseId ? { ...use, ...updates } : use));
  await writeJsonFile(REFERRAL_USES_FILE, nextUses);
}
