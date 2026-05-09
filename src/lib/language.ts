import type { Language } from '@/lib/i18n';
import { DEFAULT_LANGUAGE } from '@/lib/i18n';

export const LANGUAGE_COOKIE = 'preferred-language';
export const LANGUAGE_HEADER = 'x-language';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh', 'de', 'fr', 'ja', 'ko', 'it', 'es'];

export const LANGUAGE_OPTIONS: Array<{
  code: Language;
  label: string;
  nativeLabel: string;
}> = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
];

export function resolveLanguage(value?: string | null): Language {
  if (value && SUPPORTED_LANGUAGES.includes(value as Language)) {
    return value as Language;
  }
  return DEFAULT_LANGUAGE;
}

export function isChineseLanguage(language: Language): boolean {
  return language === 'zh';
}

export function getTranslationLocale(language: Language): 'en' | 'zh' {
  return isChineseLanguage(language) ? 'zh' : 'en';
}

export function buildLanguageAlternates(canonical: string): Record<Language, string> {
  return Object.fromEntries(
    SUPPORTED_LANGUAGES.map((language) => [language, `${canonical}?lang=${language}`])
  ) as Record<Language, string>;
}
