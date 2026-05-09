import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from '@/lib/language';

type LocalizedText = {
  en: string;
  zh: string;
};

type LocalizedPageMetadataOptions = {
  canonical: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  imageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image';
};

export async function createLocalizedPageMetadata(
  options: LocalizedPageMetadataOptions
): Promise<Metadata> {
  const headerList = await headers();
  const language = resolveLanguage(headerList.get('x-language'));
  const isZh = isChineseLanguage(language);
  const title = isZh ? options.title.zh : options.title.en;
  const description = isZh ? options.description.zh : options.description.en;
  const image = options.image;

  return {
    title,
    description,
    alternates: {
      canonical: options.canonical,
      languages: buildLanguageAlternates(options.canonical),
    },
    openGraph: image
      ? {
          title,
          description,
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: options.imageAlt || title,
            },
          ],
        }
      : {
          title,
          description,
        },
    twitter: image
      ? {
          card: options.twitterCard || 'summary_large_image',
          title,
          description,
          images: [image],
        }
      : {
          card: options.twitterCard || 'summary',
          title,
          description,
        },
  };
}
