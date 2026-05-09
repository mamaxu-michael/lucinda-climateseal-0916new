import articlesData from '@/data/articles.json';
import { listManagedArticles } from '@/lib/article-admin-store';
import { listManagedWhitepapers } from '@/lib/whitepaper-admin-store';

export type ArticleItem = {
  id: string;
  title: string;
  titleZh: string;
  coverImage: string;
  excerpt: string;
  excerptZh: string;
  content: string;
  contentZh: string;
  publishDate: string;
  category: string;
  categoryZh: string;
  featured: boolean;
};

export type ArticleCategory = {
  id: string;
  name: string;
  nameZh: string;
};

export type WhitepaperItem = {
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
};

const PLACEHOLDER_ARTICLE_PATTERN =
  /This is a sample article|This is another sample article|这是示例文章内容|示例文章|示例文章内容|这是另一个关于/i;

export function getAllArticles(): ArticleItem[] {
  const baseArticles = ((articlesData as { articles?: ArticleItem[] }).articles || []).slice();
  const managedArticles = listManagedArticles()
    .filter((article) => article.published)
    .map<ArticleItem>((article) => ({
      id: article.id,
      title: article.title,
      titleZh: article.titleZh,
      coverImage: article.coverImage,
      excerpt: article.excerpt,
      excerptZh: article.excerptZh,
      content: article.content,
      contentZh: article.contentZh,
      publishDate: article.publishDate,
      category: article.category,
      categoryZh: article.categoryZh,
      featured: article.featured,
    }));

  return [...managedArticles, ...baseArticles];
}

export function isMeaningfulArticle(article: ArticleItem): boolean {
  const contentEn = (article.content || '').trim();
  const contentZh = (article.contentZh || '').trim();
  const excerptEn = (article.excerpt || '').trim();
  const excerptZh = (article.excerptZh || '').trim();
  const combined = `${contentEn}\n${contentZh}\n${excerptEn}\n${excerptZh}`;
  const hasSubstance = contentEn.length >= 120 || contentZh.length >= 120;

  return hasSubstance && !PLACEHOLDER_ARTICLE_PATTERN.test(combined);
}

export function getMeaningfulArticles(): ArticleItem[] {
  return getAllArticles().filter(isMeaningfulArticle);
}

export function getMeaningfulArticleById(id: string): ArticleItem | undefined {
  return getMeaningfulArticles().find((article) => article.id === id);
}

export function getAllWhitepapers(): WhitepaperItem[] {
  const baseWhitepapers = ((articlesData as { whitepapers?: WhitepaperItem[] }).whitepapers || []).slice();
  const managedWhitepapers = listManagedWhitepapers()
    .filter((whitepaper) => whitepaper.published)
    .map<WhitepaperItem>((whitepaper) => ({
      id: whitepaper.id,
      title: whitepaper.title,
      titleZh: whitepaper.titleZh,
      intro: whitepaper.intro,
      introZh: whitepaper.introZh,
      thumbnail: whitepaper.thumbnail,
      whatYouGet: whitepaper.whatYouGet,
      whatYouGetZh: whitepaper.whatYouGetZh,
      topics: whitepaper.topics,
      publishDate: whitepaper.publishDate,
      downloadUrl: whitepaper.downloadUrl,
      formRecipient: whitepaper.formRecipient,
    }));

  return [...managedWhitepapers, ...baseWhitepapers];
}

export function getAllCategories(): ArticleCategory[] {
  return ((articlesData as { categories?: ArticleCategory[] }).categories || []).slice();
}

export function getWhitepaperById(id: string): WhitepaperItem | undefined {
  return getAllWhitepapers().find((whitepaper) => whitepaper.id === id);
}
