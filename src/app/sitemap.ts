import type { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

interface ArticleItem {
  id: string;
  publishDate: string;
}

/**
 * 生成 sitemap.xml（仅影响SEO抓取，不影响视觉）
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  const now = new Date().toISOString();
  const urls = [
    '/',
    '/about',
    '/products',
    '/pricing',
    '/contact',
    '/resources',
  ];
  const staticEntries = urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;

  const articles: ArticleItem[] = (articlesData as { articles: ArticleItem[] }).articles || [];
  const articleEntries = articles.map((a: ArticleItem) => ({
    url: `${base}/resources/${a.id}`,
    lastModified: new Date(a.publishDate).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...staticEntries, ...articleEntries] as MetadataRoute.Sitemap;
}


