import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { type ManagedArticle, getManagedArticleById, removeManagedArticle, upsertManagedArticle } from '@/lib/article-admin-store';
import { getAllCategories } from '@/lib/content';
import { getRequestId, normalizeText } from '@/lib/api';

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
  const categories = getAllCategories();

  const title = normalizeText(body?.title);
  const titleZh = normalizeText(body?.titleZh);
  const excerpt = normalizeText(body?.excerpt);
  const excerptZh = normalizeText(body?.excerptZh);
  const content = normalizeText(body?.content);
  const contentZh = normalizeText(body?.contentZh);
  const coverImage = normalizeText(body?.coverImage);
  const category = normalizeText(body?.category);
  const categoryZh = normalizeText(body?.categoryZh) || categories.find((item) => item.id === category)?.nameZh || '';
  const publishDate = normalizeText(body?.publishDate);
  const id = normalizeText(body?.id) || slugify(title);

  if (!title || !titleZh || !excerpt || !excerptZh || !content || !contentZh || !coverImage || !category || !publishDate) {
    return NextResponse.json({ error: 'Missing required fields', requestId }, { status: 400 });
  }

  if (!categories.some((item) => item.id === category)) {
    return NextResponse.json({ error: 'Invalid category', requestId }, { status: 400 });
  }

  const existing = getManagedArticleById(id);
  const article: ManagedArticle = {
    id,
    title,
    titleZh,
    coverImage,
    excerpt,
    excerptZh,
    content,
    contentZh,
    publishDate,
    category,
    categoryZh,
    featured: Boolean(body?.featured),
    published: body?.published !== false,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  upsertManagedArticle(article);

  return NextResponse.json({ success: true, articleId: article.id }, { status: 200 });
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

  removeManagedArticle(id);
  return NextResponse.json({ success: true }, { status: 200 });
}
