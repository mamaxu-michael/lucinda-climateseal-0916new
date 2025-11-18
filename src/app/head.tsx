import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Climate Seal | 首页',
  description: '专注于环保与气候合规的数字化解决方案与产品碳足迹工具',
  alternates: { 
    canonical: '/',
    languages: {
      en: '/?lang=en',
      zh: '/?lang=zh'
    }
  },
  openGraph: {
    title: 'Climate Seal | 首页',
    description: '专注于环保与气候合规的数字化解决方案与产品碳足迹工具',
    images: [{ url: '/logo.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate Seal | 首页',
    description: '专注于环保与气候合规的数字化解决方案与产品碳足迹工具',
    images: ['/logo.jpg']
  }
};

export default function Head() {
  return null;
}


