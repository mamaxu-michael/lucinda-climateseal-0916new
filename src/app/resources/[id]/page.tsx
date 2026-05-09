import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMeaningfulArticleById, getMeaningfulArticles, type ArticleItem } from '@/lib/content';
import { extractToc, renderMarkdown } from '@/lib/article-markdown';
import type { Language } from '@/lib/i18n';
import { isChineseLanguage, resolveLanguage } from '@/lib/language';
import {
  buildResourcePageUrl,
  createMissingResourceMetadata,
  createResourceArticleJsonLd,
  createResourceBreadcrumbJsonLd,
  createResourceDetailMetadata,
  formatResourceDate,
  getLocalizedSummary,
  getLocalizedTitle,
} from '@/lib/resource-detail';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

function getArticleContent(article: ArticleItem, language: Language): string {
  return isChineseLanguage(language) ? article.contentZh : article.content;
}

export function generateStaticParams() {
  return getMeaningfulArticles().map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const language = resolveLanguage(resolvedSearchParams?.lang);
  const article = getMeaningfulArticleById(id);

  if (!article) {
    return createMissingResourceMetadata('Article Not Found');
  }

  const title = getLocalizedTitle(article, language);
  const description = getLocalizedSummary(article, language);
  const canonical = `/resources/${id}`;
  const image = article.coverImage || '/logo.jpg';

  return createResourceDetailMetadata({
    canonical,
    language,
    title,
    description,
    image,
    missingTitle: 'Article Not Found',
  });
}

export default async function ArticleDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const language = resolveLanguage(resolvedSearchParams?.lang);
  const article = getMeaningfulArticleById(id);

  if (!article) {
    notFound();
  }

  const articleTitle = getLocalizedTitle(article, language);
  const articleDescription = getLocalizedSummary(article, language);
  const cleanedContent = getArticleContent(article, language).replace(/^CTA:?\s*$/gim, '');
  const toc = extractToc(cleanedContent);
  const html = renderMarkdown(cleanedContent);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  const pageUrl = buildResourcePageUrl(`/resources/${article.id}`, language, baseUrl);
  const relatedArticles = getMeaningfulArticles()
    .filter((item) => item.id !== article.id && item.category === article.category)
    .slice(0, 3);

  const breadcrumbJsonLd = createResourceBreadcrumbJsonLd(language, baseUrl, pageUrl, articleTitle);

  const articleJsonLd = createResourceArticleJsonLd({
    baseUrl,
    pageUrl,
    language,
    title: articleTitle,
    description: articleDescription,
    publishDate: article.publishDate,
    image: article.coverImage || '/logo.jpg',
  });

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link href="/resources" className="text-emerald-600 hover:text-emerald-700 underline text-sm">
              {language === 'zh' ? '← 返回资源中心' : '← Back to Resources'}
            </Link>
          </nav>

          <div className="mb-6">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                {isChineseLanguage(language) ? article.categoryZh : article.category}
              </span>
              <span className="text-slate-500 text-sm">{formatResourceDate(article.publishDate, language)}</span>
              {article.featured && (
                <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {isChineseLanguage(language) ? '推荐' : 'Featured'}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight font-lora">
            {articleTitle}
          </h1>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.coverImage || '/logo.jpg'}
              alt={`${articleTitle} - cover image`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
            {toc.length > 0 && (
              <nav aria-label={isChineseLanguage(language) ? '目录' : 'Table of contents'} className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-slate-800 font-semibold mb-3 text-lg">{isChineseLanguage(language) ? '目录' : 'Contents'}</h2>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 2 ? 'pl-0' : 'pl-4'}>
                      <a href={`#${item.id}`} className="text-emerald-600 hover:text-emerald-700 underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="prose prose-xl max-w-none prose-slate">
              <div className="text-slate-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {isChineseLanguage(language) ? '分享这篇文章' : 'Share this article'}
                </h2>
                <p className="text-slate-600 text-sm">
                  {isChineseLanguage(language) ? '帮助更多人了解碳核算的最新发展' : 'Help others stay informed about carbon accounting developments'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#0077B5] hover:bg-[#005885] text-white font-medium transition-all duration-300 flex items-center gap-2"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(articleTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-black hover:bg-gray-800 text-white font-medium transition-all duration-300 flex items-center gap-2"
                >
                  X
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${articleTitle} ${pageUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-medium transition-all duration-300 flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="pb-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              {isChineseLanguage(language) ? '相关文章' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/resources/${relatedArticle.id}${isChineseLanguage(language) ? '?lang=zh' : ''}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-200 transition-all duration-300 group shadow-sm"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image
                      src={relatedArticle.coverImage || '/logo.jpg'}
                      alt={`${getLocalizedTitle(relatedArticle, language)} - cover image`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-slate-900 text-lg font-semibold mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {getLocalizedTitle(relatedArticle, language)}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {formatResourceDate(relatedArticle.publishDate, language)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
