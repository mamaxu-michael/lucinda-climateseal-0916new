'use client';

import React from 'react';
import FAQAccordion, { FaqItem } from '@/components/FAQAccordion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQClientProps {
  zh: FaqItem[];
  en: FaqItem[];
}

export default function FAQClient({ zh, en }: FAQClientProps) {
  const { language } = useLanguage();
  const items = language === 'zh' ? zh : en;
  return <FAQAccordion items={items} />;
}


