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
      <div className="sticky top-20 z-10 border-b border-[#d7ddd6] bg-[#F7F3EA]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <div className="flex gap-3 py-4" id="faq-tabs">
            {groups.map((g, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActive(idx);
                  if (history.pushState) {
                    history.pushState(null, '', `#faq-${idx}`);
                  }
                }}
                className={`border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  active === idx ? 'border-[#123F3D] bg-[#123F3D] text-white' : 'border-[#d7ddd6] bg-white text-[#123F3D] hover:border-[#b7c5bc]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl">
        <FAQAccordion items={mapItems(groups[active])} />
      </div>
    </div>
  );
}
