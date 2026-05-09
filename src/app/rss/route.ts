import { NextResponse } from 'next/server';
import articlesData from '@/data/articles.json';

interface ArticleItem {
  id: string;
  title?: string;
  titleZh?: string;
  excerpt?: string;
  excerptZh?: string;
  publishDate: string;
}

export const dynamic = 'force-static';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  const items: ArticleItem[] = (articlesData as { articles: ArticleItem[] }).articles || [];
  const feedItems = items.map((a: ArticleItem) => `
    <item>
      <title><![CDATA[${a.titleZh || a.title}]]></title>
      <link>${base}/resources/${a.id}</link>
      <guid>${base}/resources/${a.id}</guid>
      <pubDate>${new Date(a.publishDate).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerptZh || a.excerpt}]]></description>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Climate Seal 解决方案资源中心</title>
      <link>${base}/solution-resources</link>
      <description>精选碳足迹方法、行业洞察与最佳实践</description>
      ${feedItems}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}


