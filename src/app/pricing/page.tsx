import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '价格方案',
  description: 'AI Agent产品碳足迹自动化定价。免费试用智能LCA计算，企业级SBTi报告生成。Scope 1/2/3排放分析订阅方案。',
  alternates: { 
    canonical: '/pricing',
    languages: {
      en: '/pricing?lang=en',
      zh: '/pricing?lang=zh'
    }
  },
  openGraph: {
    title: '价格方案 | Climate Seal',
    description: 'AI Agent产品碳足迹自动化定价。免费试用智能LCA计算，企业级SBTi报告生成。Scope 1/2/3排放分析订阅方案。',
    images: [{ url: '/goal-manager.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '价格方案 | Climate Seal',
    description: 'AI Agent产品碳足迹自动化定价。免费试用智能LCA计算，企业级SBTi报告生成。Scope 1/2/3排放分析订阅方案。',
    images: ['/goal-manager.png']
  }
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD: Breadcrumb（仅元信息，不渲染 UI） */}
      <Script id="jsonld-breadcrumb-pricing" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: '首页', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { "@type": "ListItem", position: 2, name: '价格方案', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/pricing` }
          ]
        })}
      </Script>
      {/* JSON-LD: FAQ（仅元信息，不渲染 UI） */}
      <Script id="jsonld-faq-pricing" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: '是否提供企业版方案？',
              acceptedAnswer: { "@type": "Answer", text: '支持，企业可按需定制，详情见联系我们。' }
            },
            {
              "@type": "Question",
              name: '是否支持试用？',
              acceptedAnswer: { "@type": "Answer", text: '支持，具体试用权益与时长以当前活动为准。' }
            }
          ]
        })}
      </Script>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          价格方案
        </h1>
        <div className="text-center text-gray-600">
          <p className="text-lg">价格页面正在建设中...</p>
        </div>
      </div>
    </div>
  );
}