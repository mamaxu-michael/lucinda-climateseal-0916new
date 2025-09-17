import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import FAQClient from '@/components/FAQClient';
import { translations, DEFAULT_LANGUAGE } from '@/lib/i18n';

const zh = translations.zh.faq;
const en = translations.en.faq;

export const metadata: Metadata = {
  title: zh.title,
  description: zh.seo.description,
  alternates: {
    canonical: '/faq',
    languages: {
      en: '/faq?lang=en',
      zh: '/faq?lang=zh',
    },
  },
  openGraph: {
    title: zh.seo.title,
    description: zh.seo.description,
  },
  twitter: {
    card: 'summary',
    title: zh.seo.title,
    description: zh.seo.description,
  },
  robots: zh.seo.indexable ? undefined : { index: false, follow: false },
};

// 用于获取多语言文案（页面为服务端组件，折叠为客户端组件）
function mapFaqToClientItems(grouped: { name: string; items: { q: string; a: string[] }[] }) {
  return grouped.items.map((it) => ({ question: it.q, answer: it.a.join('\n') }));
}

export default function FAQPage() {

  // JSON-LD（FAQPage）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: zh.groups
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
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">{zh.title}</h1>
        {/* 客户端块，依赖语言上下文 */}
        {/** 将分组展开为单一列表传入折叠组件，客户端依据语言切换显示 **/}
        <FAQClient
          zh={zh.groups.flatMap(mapFaqToClientItems)}
          en={en.groups.flatMap(mapFaqToClientItems)}
        />
      </div>
    </div>
  );
}


