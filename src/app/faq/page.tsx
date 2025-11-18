import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import FAQClient from '@/components/FAQClient';
import { translations, DEFAULT_LANGUAGE } from '@/lib/i18n';

const zh = translations.zh.faq;
const en = translations.en.faq;

type FAQSearchParams = {
  lang?: string;
};

type FAQPageProps = {
  searchParams?: Promise<FAQSearchParams>;
};

const resolveLang = async (searchParams?: Promise<FAQSearchParams>): Promise<'en' | 'zh'> => {
  const params = searchParams ? await searchParams : undefined;
  return (params?.lang || DEFAULT_LANGUAGE) as 'en' | 'zh';
};

// Dynamic metadata so the browser tab matches current language
export async function generateMetadata({ searchParams }: FAQPageProps): Promise<Metadata> {
  const lang = await resolveLang(searchParams);
  const faq = lang === 'en' ? en : zh;
  return {
    title: faq.title,
    description: faq.seo.description,
    alternates: {
      canonical: '/faq',
      languages: {
        en: '/faq?lang=en',
        zh: '/faq?lang=zh',
      },
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

// 页面为服务端组件，实际分组渲染放在客户端组件

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const lang = await resolveLang(searchParams);
  const dict = lang === 'en' ? en : zh;

  // JSON-LD（FAQPage）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (lang === 'en' ? en.groups : zh.groups)
      .flatMap((g) => g.items)
      .map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a.join('\n') },
      })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="jsonld-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <div className="container mx-auto px-4 pt-28 sm:pt-32 pb-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">{dict.title}</h1>
        {/* 客户端块，按分组渲染 */}
        <FAQClient zhGroups={zh.groups} enGroups={en.groups} />
      </div>
    </div>
  );
}


