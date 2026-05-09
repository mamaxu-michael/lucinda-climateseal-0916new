import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
import WhitepaperDownloadForm from '@/components/WhitepaperDownloadForm';
import { getAllWhitepapers, getWhitepaperById, type WhitepaperItem } from '@/lib/content';
import type { Language } from '@/lib/i18n';
import { isChineseLanguage, resolveLanguage } from '@/lib/language';
import {
  buildResourcePageUrl,
  createMissingResourceMetadata,
  createResourceArticleJsonLd,
  createResourceBreadcrumbJsonLd,
  createResourceDetailMetadata,
  formatResourceDate,
  getLocalizedTitle,
} from '@/lib/resource-detail';
import { getWhitepaperDownloadUrl, getWhitepaperThumbnailSrc, hasWhitepaperDownloadAsset } from '@/lib/whitepaper-assets';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

function getWhitepaperIntro(whitepaper: WhitepaperItem, language: Language): string {
  return isChineseLanguage(language) ? whitepaper.introZh : whitepaper.intro;
}

function getWhitepaperBenefits(whitepaper: WhitepaperItem, language: Language): string[] {
  return isChineseLanguage(language) ? whitepaper.whatYouGetZh : whitepaper.whatYouGet;
}

export function generateStaticParams() {
  return getAllWhitepapers().map((whitepaper) => ({ id: whitepaper.id }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const language = resolveLanguage(resolvedSearchParams?.lang);
  const whitepaper = getWhitepaperById(id);

  if (!whitepaper) {
    return createMissingResourceMetadata('Whitepaper Not Found');
  }

  const title = getLocalizedTitle(whitepaper, language);
  const description = getWhitepaperIntro(whitepaper, language);
  const canonical = `/resources/whitepapers/${id}`;
  const image = getWhitepaperThumbnailSrc(whitepaper);

  return createResourceDetailMetadata({
    canonical,
    language,
    title,
    description,
    image,
    missingTitle: 'Whitepaper Not Found',
  });
}

export default async function WhitepaperDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const language = resolveLanguage(resolvedSearchParams?.lang);
  const whitepaper = getWhitepaperById(id);

  if (!whitepaper) {
    notFound();
  }

  const title = getLocalizedTitle(whitepaper, language);
  const intro = getWhitepaperIntro(whitepaper, language);
  const benefits = getWhitepaperBenefits(whitepaper, language);
  const thumbnailSrc = getWhitepaperThumbnailSrc(whitepaper);
  const downloadUrl = getWhitepaperDownloadUrl(whitepaper);
  const instantDownloadAvailable = hasWhitepaperDownloadAsset(whitepaper);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
  const pageUrl = buildResourcePageUrl(`/resources/whitepapers/${whitepaper.id}`, language, baseUrl);

  const breadcrumbJsonLd = createResourceBreadcrumbJsonLd(language, baseUrl, pageUrl, title);

  const articleJsonLd = createResourceArticleJsonLd({
    baseUrl,
    pageUrl,
    language,
    title,
    description: intro,
    publishDate: whitepaper.publishDate,
    image: thumbnailSrc,
  });

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-6">
            <Link href="/resources" className="text-emerald-600 hover:text-emerald-700 underline text-sm">
              {isChineseLanguage(language) ? '← 返回资源中心' : '← Back to Resources'}
            </Link>
          </nav>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <SafeImage
                  src={thumbnailSrc}
                  alt={`${title} thumbnail`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#9ef894] text-black text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {isChineseLanguage(language) ? '白皮书' : 'Whitepaper'}
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-lora">{title}</h1>
                <p className="text-slate-600 text-sm mb-6">{formatResourceDate(whitepaper.publishDate, language)}</p>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">{intro}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  {isChineseLanguage(language) ? '下载可获得' : "What You'll Get"}
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 text-[#9ef894] text-xl">✓</span>
                      <span className="text-slate-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {whitepaper.topics.map((topic) => (
                  <span key={topic} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm uppercase tracking-wide">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <WhitepaperDownloadForm
                language={language}
                whitepaperId={whitepaper.id}
                whitepaperTitle={title}
                downloadUrl={downloadUrl}
                instantDownloadAvailable={instantDownloadAvailable}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
