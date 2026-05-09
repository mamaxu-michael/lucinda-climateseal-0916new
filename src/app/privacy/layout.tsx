import type { Metadata } from 'next';
import { createLocalizedPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createLocalizedPageMetadata({
    canonical: '/privacy',
    title: {
      en: 'Privacy Policy',
      zh: '隐私政策',
    },
    description: {
      en: 'Read Climate Seal privacy, data handling, and contact details for website and product inquiries.',
      zh: '查看 Climate Seal 关于数据收集、使用、联系方式和隐私保护的说明。',
    },
    twitterCard: 'summary',
  });
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
