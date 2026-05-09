import type { MetadataRoute } from 'next';

/**
 * 生成 robots.txt（仅影响爬虫，不影响视觉）
 * @returns robots 配置
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === 'production';
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  return {
    rules: isProd
      ? [{ userAgent: '*', allow: '/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}


