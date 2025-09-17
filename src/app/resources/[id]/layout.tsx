import type { Metadata } from 'next';
import articlesData from '@/data/articles.json';

interface ArticleItem {
  id: string;
  title?: string;
  titleZh?: string;
  excerpt?: string;
  excerptZh?: string;
  coverImage?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = (articlesData as { articles: ArticleItem[] }).articles.find((a) => a.id === id);
  const title = article ? (article.titleZh || article.title) : '文章详情';
  const description = article ? (article.excerptZh || article.excerpt) : '文章内容与行业洞察';
  const cover = article?.coverImage || '/logo.jpg';
  return {
    title,
    description,
    alternates: { 
      canonical: `/resources/${id}`,
      languages: {
        en: `/resources/${id}?lang=en`,
        zh: `/resources/${id}?lang=zh`
      }
    },
    openGraph: {
      title,
      description,
      images: [{ url: cover, width: 1200, height: 630 }],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cover]
    }
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}


