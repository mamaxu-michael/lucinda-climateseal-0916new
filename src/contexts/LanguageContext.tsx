'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, DEFAULT_LANGUAGE, translations, TranslationData } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // 在客户端加载时读取本地存储的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage);
    } else {
      // 检测浏览器语言设置
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.includes('zh')) {
        setLanguage('zh');
      }
    }
    setIsLoading(false);
  }, []);

  // 当语言改变时保存到本地存储
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
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

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 bg-white bg-opacity-20 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-gray-800 shadow-md'
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'zh'
            ? 'bg-white text-gray-800 shadow-md'
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        中文
      </button>
    </div>
  );
}