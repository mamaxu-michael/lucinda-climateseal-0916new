import type { Metadata } from 'next';
import { createLocalizedPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createLocalizedPageMetadata({
    canonical: '/solutions/carbon-expert',
    title: {
      en: 'Carbon Expert Solution',
      zh: '碳专家解决方案',
    },
    description: {
      en: 'Climate Seal for carbon experts: automated compliance mapping, BOM processing, bulk PCF calculation, and audit-ready data quality checks.',
      zh: '面向碳专家团队的自动化合规映射、BOM 处理、批量 PCF 计算与审计级数据质量检查方案。',
    },
    image: '/pcf-modeler.png',
    imageAlt: 'Climate Seal carbon expert solution',
  });
}

export default function CarbonExpertLayout({ children }: { children: React.ReactNode }) {
  return children;
}
