import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getRequestId, normalizeText } from '@/lib/api';
import { getManagedWhitepaperById, removeManagedWhitepaper, type ManagedWhitepaper, upsertManagedWhitepaper } from '@/lib/whitepaper-admin-store';

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId();
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized', requestId }, { status: 401 });
  }

  const body = await request.json();
  const title = normalizeText(body?.title);
  const titleZh = normalizeText(body?.titleZh);
  const intro = normalizeText(body?.intro);
  const introZh = normalizeText(body?.introZh);
  const thumbnail = normalizeText(body?.thumbnail);
  const publishDate = normalizeText(body?.publishDate);
  const downloadUrl = normalizeText(body?.downloadUrl);
  const formRecipient = normalizeText(body?.formRecipient);
  const id = normalizeText(body?.id) || slugify(title);
  const whatYouGet = Array.isArray(body?.whatYouGet) ? body.whatYouGet.map((item: unknown) => normalizeText(item)).filter(Boolean) : [];
  const whatYouGetZh = Array.isArray(body?.whatYouGetZh) ? body.whatYouGetZh.map((item: unknown) => normalizeText(item)).filter(Boolean) : [];
  const topics = Array.isArray(body?.topics) ? body.topics.map((item: unknown) => normalizeText(item)).filter(Boolean) : [];

  if (!title || !titleZh || !intro || !introZh || !thumbnail || !publishDate || !downloadUrl || !formRecipient || whatYouGet.length === 0 || whatYouGetZh.length === 0 || topics.length === 0) {
    return NextResponse.json({ error: 'Missing required fields', requestId }, { status: 400 });
  }

  const existing = getManagedWhitepaperById(id);
  const whitepaper: ManagedWhitepaper = {
    id,
    title,
    titleZh,
    intro,
    introZh,
    thumbnail,
    whatYouGet,
    whatYouGetZh,
    topics,
    publishDate,
    downloadUrl,
    formRecipient,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: body?.published !== false,
  };

  upsertManagedWhitepaper(whitepaper);
  return NextResponse.json({ success: true, whitepaperId: whitepaper.id }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const requestId = getRequestId();
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized', requestId }, { status: 401 });
  }

  const id = normalizeText(request.nextUrl.searchParams.get('id'));
  if (!id) {
    return NextResponse.json({ error: 'Missing id', requestId }, { status: 400 });
  }

  removeManagedWhitepaper(id);
  return NextResponse.json({ success: true }, { status: 200 });
}
