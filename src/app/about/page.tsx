import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们',
  description: 'Climate Seal专业团队，专注AI Agent产品碳足迹自动化。智能LCA技术与SBTi报告生成，零专业知识碳核算解决方案。',
  alternates: { 
    canonical: '/about',
    languages: {
      en: '/about?lang=en',
      zh: '/about?lang=zh'
    }
  },
  openGraph: {
    title: '关于我们 | Climate Seal',
    description: 'Climate Seal专业团队，专注AI Agent产品碳足迹自动化。智能LCA技术与SBTi报告生成，零专业知识碳核算解决方案。',
    images: [{ url: '/about-logo.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 | Climate Seal',
    description: 'Climate Seal专业团队，专注AI Agent产品碳足迹自动化。智能LCA技术与SBTi报告生成，零专业知识碳核算解决方案。',
    images: ['/about-logo.png']
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD: Breadcrumb（仅元信息，不渲染 UI） */}
      <Script id="jsonld-breadcrumb-about" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: '首页', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { "@type": "ListItem", position: 2, name: '关于我们', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/about` }
          ]
        })}
      </Script>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          关于我们
        </h1>
        <div className="text-center text-gray-600">
          <p className="text-lg">关于我们页面正在建设中...</p>
        </div>
      </div>
    </div>
  );
}