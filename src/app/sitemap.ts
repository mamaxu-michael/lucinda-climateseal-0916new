import type { MetadataRoute } from 'next';
import { getAllWhitepapers, getMeaningfulArticles } from '@/lib/content';

/**
 * 生成 sitemap.xml（仅影响SEO抓取，不影响视觉）
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  const now = new Date().toISOString();
  const urls = [
    '/',
    '/resources',
    '/faq',
    '/privacy',
    '/solutions/carbon-expert',
    '/solutions/brand-owner',
    '/solutions/supply-chain',
  ];
  const staticEntries = urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;

  const articleEntries = getMeaningfulArticles().map((article) => ({
    url: `${base}/resources/${article.id}`,
    lastModified: new Date(article.publishDate).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  const whitepaperEntries = getAllWhitepapers().map((whitepaper) => ({
    url: `${base}/resources/whitepapers/${whitepaper.id}`,
    lastModified: new Date(whitepaper.publishDate).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  })) as MetadataRoute.Sitemap;

  return [...staticEntries, ...articleEntries, ...whitepaperEntries] as MetadataRoute.Sitemap;
}
