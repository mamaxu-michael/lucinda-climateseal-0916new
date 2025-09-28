'use client';

import React, { useEffect, useState } from 'react';
import FAQAccordion, { FaqItem } from '@/components/FAQAccordion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQGroup {
  name: string;
  items: { q: string; a: string[] }[];
}

interface FAQClientProps {
  zhGroups: FAQGroup[];
  enGroups: FAQGroup[];
}

export default function FAQClient({ zhGroups, enGroups }: FAQClientProps) {
  const { language } = useLanguage();
  const groups = language === 'zh' ? zhGroups : enGroups;

  const mapItems = (g: FAQGroup): FaqItem[] => g.items.map((it) => ({ question: it.q, answer: it.a.join('\n') }));

  const [active, setActive] = useState<number>(0);

  // 从 URL 读取 hash 或 query 作为初始分组
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const q = url.searchParams.get('group');
    const hash = window.location.hash.replace('#', '');
    const idxFromQuery = q ? groups.findIndex((g) => g.name.toLowerCase().includes(q.toLowerCase())) : -1;
    const idxFromHash = hash.startsWith('faq-') ? parseInt(hash.replace('faq-', ''), 10) : -1;
    const idx = idxFromQuery >= 0 ? idxFromQuery : idxFromHash >= 0 ? idxFromHash : 0;
    if (idx >= 0 && idx < groups.length) setActive(idx);
  }, [language, groups]);

  return (
    <div>
      {/* Tabs */}
      <div className="sticky top-20 z-10 bg-gray-50 shadow">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="flex gap-3 py-3" id="faq-tabs">
            {groups.map((g, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActive(idx);
                  if (history.pushState) {
                    history.pushState(null, '', `#faq-${idx}`);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  active === idx ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Only active group visible */}
      <div className="max-w-5xl mx-auto mt-4">
        <FAQAccordion items={mapItems(groups[active])} />
      </div>
    </div>
  );
}


