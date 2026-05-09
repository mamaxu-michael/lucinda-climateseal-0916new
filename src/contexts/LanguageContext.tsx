'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Language, translations, TranslationData } from '@/lib/i18n';
import { getTranslationLocale, LANGUAGE_COOKIE, LANGUAGE_OPTIONS, resolveLanguage } from '@/lib/language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [isLoading] = useState(false);

  useEffect(() => {
    const paramLanguage = searchParams.get('lang');
    const nextLanguage = resolveLanguage(paramLanguage);
    if (nextLanguage !== language) {
      setLanguage(nextLanguage);
    }
  }, [language, searchParams]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_COOKIE, language);
    document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; SameSite=Lax`;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[getTranslationLocale(language)],
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// 语言切换组件
export function LanguageSwitcher() {
  const { language, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const currentLang = LANGUAGE_OPTIONS.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <span>{currentLang?.nativeLabel || currentLang?.label || language}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 z-50 mb-2 max-h-80 w-40 overflow-y-auto overflow-hidden rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-[0_18px_40px_rgba(18,63,61,0.12)]">
          {LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                language === lang.code
                  ? 'bg-[var(--brand-bg-soft)] text-[var(--brand-ink)]'
                  : 'text-[var(--brand-muted)] hover:bg-[var(--brand-bg)]'
              }`}
            >
              <span>{lang.nativeLabel}</span>
              {language === lang.code && (
                <span className="text-[var(--brand-accent-strong)]" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
