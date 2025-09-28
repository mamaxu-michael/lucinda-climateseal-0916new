import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '解决方案资源中心',
  description: 'AI Agent产品碳足迹自动化指南。智能LCA计算教程，SBTi报告生成方法。Scope 1/2/3排放分析资源库。',
  alternates: { 
    canonical: '/resources',
    languages: {
      en: '/resources?lang=en',
      zh: '/resources?lang=zh'
    }
  }
};

export default function SolutionResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


