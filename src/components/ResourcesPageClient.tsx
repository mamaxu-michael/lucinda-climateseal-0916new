'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ArticleCategory, ArticleItem, WhitepaperItem } from '@/lib/content';

type ResourcesPageClientProps = {
  categories: ArticleCategory[];
  articles: ArticleItem[];
  whitepapers: WhitepaperItem[];
};

export default function ResourcesPageClient({
  categories,
  articles,
  whitepapers,
}: ResourcesPageClientProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredArticles, setFilteredArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const hasArticles = (id: string) => articles.some((article) => article.category === id);

      if (cat && (cat === 'all' || (categories.some((category) => category.id === cat) && hasArticles(cat)))) {
        setSelectedCategory(cat);
      } else if (cat) {
        setSelectedCategory('all');
      }
    }
  }, [articles, categories]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((article) => article.category === selectedCategory));
    }
  }, [selectedCategory, articles]);

  const categoryDescriptions: Record<string, { en: string; zh: string }> = {
    'supply-chain-scope-3': {
      en: 'Practical guides for supplier data collection, value-chain modeling, and Scope 3 reporting.',
      zh: '聚焦供应商数据采集、价值链建模与范围3披露的实操指南。',
    },
    'cbam-csrd-pef-compliance': {
      en: 'How to meet CBAM, CSRD and PEF/DPP evidence requirements with ISO-aligned PCFs.',
      zh: '以符合 ISO 的方法、证据链与版本化披露满足 CBAM、CSRD 与 PEF/DPP 要求。',
    },
    'pcf-lca-methods': {
      en: 'Functional units, boundaries, allocation, data quality and uncertainty for credible PCFs.',
      zh: '功能单位、系统边界、分配、数据质量与不确定性，支撑可信 PCF。',
    },
    'data-factors-baselines': {
      en: 'Emission factors, provenance, baselines and data-quality management for defensible numbers.',
      zh: '排放因子来源、基线与数据质量管理，确保口径可辩护。',
    },
    'industry-playbooks': {
      en: 'Sector playbooks for food, textiles, manufacturing, logistics and construction.',
      zh: '面向食品、纺织、制造、物流与建材的行业方案。',
    },
    'case-studies': {
      en: 'Real implementations with before-after results and cycle-time reductions.',
      zh: '真实落地案例与前后对比，包含周期缩短效果。',
    },
    'research-insights': {
      en: 'Policy trends, methodology updates and market insights for carbon accounting and assurance.',
      zh: '政策趋势、方法更新与市场洞察，服务于碳核算与鉴证。',
    },
    'getting-started': {
      en: 'Foundational guides, checklists and FAQs to get started quickly with product carbon footprints.',
      zh: 'PCF 入门概念、清单与常见问题，帮助快速起步。',
    },
    technology: {
      en: 'Technology topics and implementation notes for building automation into carbon workflows.',
      zh: '碳核算自动化相关的技术主题与实现要点。',
    },
  };

  const getArticleTitle = (article: ArticleItem) => (language === 'zh' ? article.titleZh : article.title);
  const getArticleExcerpt = (article: ArticleItem) => (language === 'zh' ? article.excerptZh : article.excerpt);
  const getCategoryName = (category: ArticleCategory) => (language === 'zh' ? category.nameZh : category.name);
  const getWhitepaperTitle = (whitepaper: WhitepaperItem) => (language === 'zh' ? whitepaper.titleZh : whitepaper.title);
  const getWhitepaperIntro = (whitepaper: WhitepaperItem) => (language === 'zh' ? whitepaper.introZh : whitepaper.intro);
  const getWhitepaperBenefits = (whitepaper: WhitepaperItem) => (language === 'zh' ? whitepaper.whatYouGetZh : whitepaper.whatYouGet);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const displayArticles = filteredArticles.length ? filteredArticles : articles;

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#123F3D]">
      <Script id="jsonld-breadcrumb-sr" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: language === 'zh' ? '首页' : 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { '@type': 'ListItem', position: 2, name: language === 'zh' ? '解决方案资源中心' : 'Solution Resources', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources` },
          ],
        })}
      </Script>

      <Script id="jsonld-itemlist-sr" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: displayArticles.slice(0, 50).map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources/${article.id}`,
            name: language === 'zh' ? article.titleZh : article.title,
            image: article.coverImage || `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/logo.jpg`,
            datePublished: article.publishDate,
            description: language === 'zh' ? article.excerptZh : article.excerpt,
          })),
        })}
      </Script>

      <section className="border-b border-[#d7ddd6] bg-white px-4 pt-28 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex border border-[#d1d8d2] bg-[#F8F6F1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">
              {language === 'zh' ? '资源中心' : 'Resource Center'}
            </div>
            <h1 className="mt-6 font-lora text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#123F3D] sm:text-5xl lg:text-[3.5rem]">
              {language === 'zh' ? '解决方案资源中心' : 'Solution Resources'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f7672]">
              {language === 'zh'
                ? '围绕产品碳足迹、Scope 3、LCA、法规方法学、供应链协同与审计交付，持续整理更适合业务团队使用的资料。'
                : 'Explore practical resources for Product Carbon Footprint, Scope 3, LCA, methodology, supplier collaboration, and verification-ready carbon delivery.'}
            </p>
          </div>
        </div>
      </section>

      {whitepapers.length > 0 && (
        <section className="border-b border-[#d7ddd6] bg-[#F7F3EA] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">
                {language === 'zh' ? '精选白皮书' : 'Featured whitepapers'}
              </p>
              <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] text-[#123F3D] sm:text-4xl">
                {t.resourcesPage.whitepapers.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#5f7672]">{t.resourcesPage.whitepapers.subtitle}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {whitepapers.map((whitepaper) => {
                const benefits = getWhitepaperBenefits(whitepaper);
                const displayBenefits = benefits.slice(0, 3);
                const hasMore = benefits.length > 3;

                return (
                  <div
                    key={whitepaper.id}
                    className="group grid gap-4 border border-[#d7ddd6] bg-white p-4 transition-colors duration-200 hover:border-[#b7c5bc] lg:grid-cols-[160px_minmax(0,1fr)]"
                  >
                    <div className="relative h-40 overflow-hidden border border-[#d7ddd6] bg-[#F8F6F1]">
                      <SafeImage
                        src={whitepaper.thumbnail}
                        alt={`${getWhitepaperTitle(whitepaper)} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        fallbackSrc="/logo.jpg"
                      />
                      <div className="absolute top-2 left-2 border border-[#b7c5bc] bg-white px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#456864]">
                        {language === 'zh' ? '白皮书' : 'Whitepaper'}
                      </div>
                    </div>

                    <div className="min-w-0 space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-lora text-2xl font-bold leading-tight tracking-[-0.02em] text-[#123F3D]">{getWhitepaperTitle(whitepaper)}</h3>
                        <p className="text-sm text-[#6a817d]">{formatDate(whitepaper.publishDate)}</p>
                        <p className="text-sm leading-7 text-[#5f7672]">{getWhitepaperIntro(whitepaper)}</p>
                      </div>

                      <div className="border border-[#dde2dc] bg-[#FBF9F4] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5f7a76] mb-2">
                          {language === 'zh' ? '下载可获得' : "What you'll get"}
                        </p>
                        <ul className="space-y-1 text-sm text-[#5f7672]">
                          {displayBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="mt-0.5 text-[#1d7c72] flex-shrink-0">+</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                          {hasMore ? (
                            <li className="text-[#6a817d] italic">
                              {language === 'zh' ? `+ ${benefits.length - 3} 更多` : `+ ${benefits.length - 3} more`}
                            </li>
                          ) : null}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {whitepaper.topics.slice(0, 2).map((topic) => (
                          <span key={topic} className="border border-[#d7ddd6] bg-[#F8F6F1] px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[#5f7672]">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/resources/whitepapers/${whitepaper.id}`}
                        className="inline-flex items-center gap-2 border border-[#123F3D] px-4 py-2 text-sm font-semibold text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white"
                      >
                        {language === 'zh' ? '查看并下载' : 'View & download'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-[#d7ddd6] bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`border px-4 py-2 text-sm font-medium transition ${selectedCategory === 'all' ? 'border-[#123F3D] bg-[#123F3D] text-white' : 'border-[#d7ddd6] bg-[#F8F6F1] text-[#123F3D] hover:border-[#b7c5bc]'}`}
            >
              {language === 'zh' ? '全部' : 'All'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`border px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? 'border-[#123F3D] bg-[#123F3D] text-white' : 'border-[#d7ddd6] bg-[#F8F6F1] text-[#123F3D] hover:border-[#b7c5bc]'}`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>

          {selectedCategory !== 'all' ? (
            <div className="mt-6 max-w-4xl">
              <p className="text-base leading-7 text-[#5f7672]">
                {(categoryDescriptions[selectedCategory]?.[language === 'zh' ? 'zh' : 'en']) || ''}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#F7F3EA] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {displayArticles.map((article) => (
              <div
                key={article.id}
                className="group overflow-hidden border border-[#d7ddd6] bg-white transition-colors duration-200 hover:border-[#b7c5bc]"
              >
                <div className="relative h-52 border-b border-[#d7ddd6] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(239,236,229,0.92))]">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={`${getArticleTitle(article)} - cover image`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                    />
                  ) : null}

                  <div className="absolute top-4 left-4">
                    <span className="border border-[#b7c5bc] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#456864]">
                      {language === 'zh' ? article.categoryZh : article.category}
                    </span>
                  </div>

                  {article.featured ? (
                    <div className="absolute top-4 right-4">
                      <span className="border border-[#d6c47a] bg-[#fff7d8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5c1b]">
                        {language === 'zh' ? '推荐' : 'Featured'}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="p-6">
                  <p className="mb-3 text-sm text-[#6a817d]">{formatDate(article.publishDate)}</p>
                  <h3 className="mb-3 font-lora text-2xl font-bold leading-tight tracking-[-0.02em] text-[#123F3D]">{getArticleTitle(article)}</h3>
                  <p className="mb-5 text-sm leading-7 text-[#5f7672] line-clamp-4">{getArticleExcerpt(article)}</p>
                  <Link
                    href={`/resources/${article.id}`}
                    className="inline-flex items-center border border-[#123F3D] px-4 py-2 text-sm font-semibold text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white"
                  >
                    {language === 'zh' ? '阅读全文' : 'Read article'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {displayArticles.length === 0 ? (
            <p className="py-10 text-center text-[#6a817d]">
              {language === 'zh' ? '当前分类下暂无文章。' : 'No articles are available for this category yet.'}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
