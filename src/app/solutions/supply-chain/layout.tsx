import type { Metadata } from 'next';
import { createLocalizedPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createLocalizedPageMetadata({
    canonical: '/solutions/supply-chain',
    title: {
      en: 'Supply Chain Solution',
      zh: '供应链解决方案',
    },
    description: {
      en: 'Climate Seal for suppliers and exporters: compliant PCFs, pre-verification checks, and one-click sustainability submissions for buyers and audits.',
      zh: '面向供应商与出口团队的合规 PCF、预核验检查和一键式可持续发展提交流程。',
    },
    image: '/supply-chain-assessment.png',
    imageAlt: 'Climate Seal supply chain solution',
  });
}

export default function SupplyChainLayout({ children }: { children: React.ReactNode }) {
  return children;
}
