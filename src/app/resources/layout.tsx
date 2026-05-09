import type { Metadata } from 'next';
import { createLocalizedPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createLocalizedPageMetadata({
    canonical: '/resources',
    title: {
      en: 'Climate Seal Resources',
      zh: '解决方案资源中心',
    },
    description: {
      en: 'Guides, compliance explainers, and carbon accounting playbooks for PCF, CBAM, Scope 3, and audit-ready sustainability reporting.',
      zh: '查看 Climate Seal 的产品碳足迹、CBAM、Scope 3 与审计级可持续发展报告相关指南、白皮书和合规解读。',
    },
    image: '/logo.jpg',
    imageAlt: 'Climate Seal resources library',
  });
}

export default function SolutionResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
