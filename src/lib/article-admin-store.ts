import fs from 'node:fs';
import path from 'node:path';

export type ManagedArticle = {
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
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

const ADMIN_ARTICLES_FILE = path.join(process.cwd(), 'data', 'admin', 'articles.json');

function ensureArticleStoreDir() {
  fs.mkdirSync(path.dirname(ADMIN_ARTICLES_FILE), { recursive: true });
}

export function listManagedArticles(): ManagedArticle[] {
  ensureArticleStoreDir();

  try {
    const content = fs.readFileSync(ADMIN_ARTICLES_FILE, 'utf8');
    return JSON.parse(content) as ManagedArticle[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function writeManagedArticles(articles: ManagedArticle[]) {
  ensureArticleStoreDir();
  fs.writeFileSync(ADMIN_ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
}

export function upsertManagedArticle(article: ManagedArticle) {
  const articles = listManagedArticles();
  const index = articles.findIndex((item) => item.id === article.id);

  if (index >= 0) {
    articles[index] = article;
  } else {
    articles.unshift(article);
  }

  writeManagedArticles(articles);
}

export function getManagedArticleById(id: string): ManagedArticle | undefined {
  return listManagedArticles().find((article) => article.id === id);
}

export function removeManagedArticle(id: string) {
  const articles = listManagedArticles().filter((article) => article.id !== id);
  writeManagedArticles(articles);
}
