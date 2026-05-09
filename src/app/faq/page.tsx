import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import FAQClient from '@/components/FAQClient';
import { translations, type Language } from '@/lib/i18n';
import { buildLanguageAlternates, getTranslationLocale, resolveLanguage } from '@/lib/language';

const zh = translations.zh.faq;
const en = translations.en.faq;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang);
  const locale = getTranslationLocale(language);
  const faq = locale === 'en' ? en : zh;
  return {
    title: faq.title,
    description: faq.seo.description,
    alternates: {
      canonical: '/faq',
      languages: buildLanguageAlternates('/faq'),
    },
    openGraph: {
      title: faq.seo.title,
      description: faq.seo.description,
    },
    twitter: {
      card: 'summary',
      title: faq.seo.title,
      description: faq.seo.description,
    },
    robots: faq.seo.indexable ? undefined : { index: false, follow: false },
  };
}

export default async function FAQPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const language: Language = resolveLanguage(resolvedSearchParams?.lang);
  const locale = getTranslationLocale(language);
  const dict = locale === 'en' ? en : zh;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (locale === 'en' ? en.groups : zh.groups)
      .flatMap((g) => g.items)
      .map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a.join('\n') },
      })),
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#123F3D]">
      <Script id="jsonld-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex border border-[#d1d8d2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">
            FAQ
          </div>
          <h1 className="mt-6 font-lora text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#123F3D] sm:text-5xl lg:text-[3.4rem]">
            {dict.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f7672]">
            {locale === 'en'
              ? 'Questions around Product Carbon Footprint, Scope 3, methodologies, data preparation, verification, and how Climate Seal fits different workflows.'
              : '围绕产品碳足迹、Scope 3、方法学、数据准备、第三方验证以及 Climate Seal 适用场景的常见问题。'}
          </p>
        </div>
        <div className="mt-10">
          <FAQClient zhGroups={zh.groups} enGroups={en.groups} />
        </div>
      </div>
    </div>
  );
}
