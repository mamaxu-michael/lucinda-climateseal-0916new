import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们',
  description: '免费试用AI Agent产品碳足迹自动化。智能LCA计算演示，SBTi报告生成咨询。Scope 1/2/3排放分析支持服务。',
  alternates: { 
    canonical: '/contact',
    languages: {
      en: '/contact?lang=en',
      zh: '/contact?lang=zh'
    }
  },
  openGraph: {
    title: '联系我们 | Climate Seal',
    description: '免费试用AI Agent产品碳足迹自动化。智能LCA计算演示，SBTi报告生成咨询。Scope 1/2/3排放分析支持服务。',
    images: [{ url: '/new-contact-logo.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '联系我们 | Climate Seal',
    description: '免费试用AI Agent产品碳足迹自动化。智能LCA计算演示，SBTi报告生成咨询。Scope 1/2/3排放分析支持服务。',
    images: ['/new-contact-logo.png']
  }
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD: FAQ（仅元信息，不渲染 UI） */}
      <Script id="jsonld-faq-contact" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: '如何获取产品演示？',
              acceptedAnswer: { "@type": "Answer", text: '填写联系信息后，我们会在1个工作日内与您沟通安排演示。' }
            },
            {
              "@type": "Question",
              name: '支持哪些集成能力？',
              acceptedAnswer: { "@type": "Answer", text: '支持主流数据源与导入方式，具体请在沟通中说明需求。' }
            }
          ]
        })}
      </Script>
      {/* JSON-LD: Breadcrumb（仅元信息，不渲染 UI） */}
      <Script id="jsonld-breadcrumb-contact" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: '首页', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { "@type": "ListItem", position: 2, name: '联系我们', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/contact` }
          ]
        })}
      </Script>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          联系我们
        </h1>
        <div className="text-center text-gray-600">
          <p className="text-lg">联系我们页面正在建设中...</p>
        </div>
      </div>
    </div>
  );
}