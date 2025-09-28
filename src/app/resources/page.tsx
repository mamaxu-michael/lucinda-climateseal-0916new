"use client";

import { useState, useEffect, useMemo } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import articlesData from '@/data/articles.json';

type Article = {
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

type Category = {
  id: string;
  name: string;
  nameZh: string;
};

export default function SolutionResources() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const articles: Article[] = articlesData.articles;
  const categories: Category[] = articlesData.categories;

  // Hide empty/placeholder articles from viewers (memoized to avoid re-creating on each render)
  const meaningfulArticles = useMemo(() => {
    const isMeaningful = (article: Article) => {
      const contentEn = (article.content || '').trim();
      const contentZh = (article.contentZh || '').trim();
      const excerptEn = (article.excerpt || '').trim();
      const excerptZh = (article.excerptZh || '').trim();
      const combined = `${contentEn}\n${contentZh}\n${excerptEn}\n${excerptZh}`;
      const looksPlaceholder = /This is a sample article|This is another sample article|这是示例文章内容|示例文章|示例文章内容|这是另一个关于/i.test(combined);
      const minLen = 120; // require some substance in either language
      const hasSubstance = contentEn.length >= minLen || contentZh.length >= minLen;
      return !looksPlaceholder && hasSubstance;
    };
    return articles.filter(isMeaningful);
  }, [articles]);

  useEffect(() => {
    // 支持 ?category= 预选
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      // 仅允许选择存在且非空的分类
      const hasArticles = (id: string) => meaningfulArticles.some(a => a.category === id);
      if (cat && (cat === 'all' || ((categories || []).some(c => c.id === cat) && hasArticles(cat)))) {
        setSelectedCategory(cat);
      } else if (cat) {
        // 空分类或不存在 → 回退到 all（静默处理）
        setSelectedCategory('all');
      }
    }
  }, [categories, meaningfulArticles]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArticles(meaningfulArticles);
    } else {
      setFilteredArticles(meaningfulArticles.filter(article => article.category === selectedCategory));
    }
  }, [selectedCategory, meaningfulArticles]);

  const categoryDescriptions: Record<string, { en: string; zh: string }> = {
    'supply-chain-scope-3': {
      en: 'Practical guides for supplier data collection, value‑chain modeling, and Scope 3 reporting—covering RFQs, quality scoring, and audit‑ready evidence.',
      zh: '聚焦供应商数据采集、价值链建模与范围3披露的实操指南，兼顾RFQ流程、质量评分与可审计证据。'
    },
    'cbam-csrd-pef-compliance': {
      en: 'How to meet CBAM, CSRD and PEF/DPP evidence requirements with ISO‑aligned PCFs, data lineage, and versioned disclosures—so shipments and filings stay compliant.',
      zh: '以符合ISO的方法、证据链与版本化披露满足CBAM、CSRD与PEF/DPP要求，确保发运与申报顺利合规。'
    },
    'pcf-lca-methods': {
      en: 'ISO 14067 and GHG Product–aligned methods: functional units, boundaries, allocation, data quality and uncertainty for credible PCFs.',
      zh: '对齐 ISO 14067/GHG 产品标准的方法论：功能单位、系统边界、分配、数据质量与不确定性，支撑可信 PCF。'
    },
    'data-factors-baselines': {
      en: 'Emission factors, provenance and versions; baselines and data‑quality management for defensible numbers.',
      zh: '排放因子来源与版本、基线与数据质量管理，确保口径可辩护。'
    },
    'industry-playbooks': {
      en: 'Sector playbooks for food, textiles, manufacturing, logistics and construction—hotspots and abatement options.',
      zh: '面向食品、纺织、制造、物流与建材的行业手册：热点与减排路径。'
    },
    'case-studies': {
      en: 'Real implementations with before‑after results, ROI/MACC and cycle‑time reductions.',
      zh: '真实落地案例与前后对比，包含ROI/MACC与周期缩短效果。'
    },
    'research-insights': {
      en: 'Policy trends, methodology updates and market insights for carbon accounting and assurance.',
      zh: '政策趋势、方法更新与市场洞察，服务于碳核算与鉴证。'
    },
    'getting-started': {
      en: 'Foundational guides, checklists and FAQs to get started quickly with product carbon footprints.',
      zh: 'PCF 入门概念、清单与常见问题，帮助快速起步。'
    },
    'technology': {
      en: 'Technology topics and implementation notes for building automation into carbon workflows.',
      zh: '碳核算自动化相关的技术主题与实现要点。'
    }
  };

  const getArticleTitle = (article: Article) => {
    return language === 'zh' ? article.titleZh : article.title;
  };

  const getArticleExcerpt = (article: Article) => {
    return language === 'zh' ? article.excerptZh : article.excerpt;
  };

  const getCategoryName = (category: Category) => {
    return language === 'zh' ? category.nameZh : category.name;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'zh' 
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Map old CBAM article to the new content for display while keeping the old id for the link
  const replacement = articles.find(a => a.id === 'stop-using-default-values-cbam-one-time-pcf');
  const sourceList = filteredArticles.length ? filteredArticles : meaningfulArticles;
  const displayArticles = sourceList.map(a => (a.id === 'cbam-default-values-vs-pcf' && replacement)
    ? ({ ...replacement, id: a.id } as Article)
    : a
  );

  return (
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* JSON-LD: Breadcrumb + FAQ（仅元信息，不渲染 UI）*/}
      <Script id="jsonld-breadcrumb-sr" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: language === 'zh' ? '首页' : 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { "@type": "ListItem", position: 2, name: language === 'zh' ? '解决方案资源中心' : 'Solution Resources', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources` }
          ]
        })}
      </Script>
      {/* JSON-LD: ItemList for article collection */}
      <Script id="jsonld-itemlist-sr" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": (displayArticles || articles).slice(0, 50).map((a: Article, idx: number) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources/${a.id}`,
            "name": language === 'zh' ? a.titleZh : a.title,
            "image": a.coverImage || `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/logo.jpg`,
            "datePublished": a.publishDate,
            "description": language === 'zh' ? a.excerptZh : a.excerpt
          }))
        })}
      </Script>
      <Script id="jsonld-faq-sr" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: language === 'zh' ? '如何添加新的文章？' : 'How to add a new article?',
              acceptedAnswer: { "@type": "Answer", text: language === 'zh' ? '编辑 /src/data/articles.json 并上传封面图到 /public/images/articles/。' : 'Edit /src/data/articles.json and upload cover image to /public/images/articles/.' }
            }
          ]
        })}
      </Script>
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-lora">
            {language === 'zh' ? '解决方案资源中心' : 'Solution Resources'}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {language === 'zh' 
              ? '探索最新的碳足迹解决方案、行业见解和最佳实践，帮助您的企业实现可持续发展目标。'
              : 'Explore the latest carbon footprint solutions, industry insights, and best practices to help your business achieve sustainability goals.'
            }
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#9ef894] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'zh' ? '全部' : 'All'}
            </button>
            {(categories || []).filter(cat => meaningfulArticles.some(a => a.category === cat.id)).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#9ef894] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
          {/* Category SEO intro */}
          {selectedCategory !== 'all' && (
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {(categoryDescriptions[selectedCategory]?.[language === 'zh' ? 'zh' : 'en']) || ''}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                {/* Article Cover */}
                <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={`${getArticleTitle(article)} - cover image`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                      onLoad={(e) => {
                        // Show image if it loads successfully
                        (e.target as HTMLImageElement).style.display = 'block';
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#9ef894] text-black px-3 py-1 rounded-full text-sm font-medium">
                      {language === 'zh' ? article.categoryZh : article.category}
                    </span>
                  </div>
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                        {language === 'zh' ? '推荐' : 'Featured'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-white/60 text-sm">
                      {formatDate(article.publishDate)}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-3 line-clamp-2 group-hover:text-[#9ef894] transition-colors">
                    <Link href={`/resources/${article.id}`} className="hover:underline">
                      {getArticleTitle(article)}
                    </Link>
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
                    {getArticleExcerpt(article)}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/resources/${article.id}`}
                      className="text-[#9ef894] font-medium hover:underline text-sm"
                    >
                      {language === 'zh' ? '阅读更多 →' : 'Read More →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State - Placeholder Cards for Market Team */}
            {process.env.NODE_ENV !== 'production' && displayArticles.length < 6 && (
              <>
                {Array.from({ length: 6 - displayArticles.length }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 border-dashed"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
                      <div className="text-center text-white/40">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                        </svg>
                        <p className="text-sm">
                          {language === 'zh' ? '添加新文章' : 'Add New Article'}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-white/40 text-sm">
                          {language === 'zh' ? '发布日期' : 'Publish Date'}
                        </span>
                      </div>
                      <h3 className="text-white/40 text-xl font-semibold mb-3">
                        {language === 'zh' ? '文章标题' : 'Article Title'}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">
                        {language === 'zh' 
                          ? '文章摘要将显示在这里...'
                          : 'Article excerpt will be displayed here...'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Instructions for Market Team (dev only) */}
          {process.env.NODE_ENV !== 'production' && (
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {language === 'zh' ? '📝 市场团队使用指南' : '📝 Marketing Team Guide'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
              <div>
                <h3 className="font-semibold mb-2">
                  {language === 'zh' ? '添加新文章：' : 'Adding New Articles:'}
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>1. {language === 'zh' ? '编辑 /src/data/articles.json 文件' : 'Edit /src/data/articles.json file'}</li>
                  <li>2. {language === 'zh' ? '在 articles 数组中添加新对象' : 'Add new object to articles array'}</li>
                  <li>3. {language === 'zh' ? '上传封面图到 /public/images/articles/' : 'Upload cover image to /public/images/articles/'}</li>
                  <li>4. {language === 'zh' ? '重新部署网站' : 'Redeploy website'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  {language === 'zh' ? '必需字段：' : 'Required Fields:'}
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• title & titleZh</li>
                  <li>• excerpt & excerptZh</li>
                  <li>• content & contentZh</li>
                  <li>• coverImage (path)</li>
                  <li>• publishDate (YYYY-MM-DD)</li>
                  <li>• category</li>
                </ul>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Back to Home */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#9ef894] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#8ee884] transition-colors"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </div>
  );
}