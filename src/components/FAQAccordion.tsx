'use client';

import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FaqItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="mx-auto w-full max-w-5xl border border-[#d7ddd6] bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`border-b border-[#dfe4de] px-5 py-5 sm:px-7 sm:py-6 ${index === items.length - 1 ? 'border-b-0' : ''}`}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="font-lora text-xl font-bold leading-8 tracking-[-0.02em] text-[#123F3D] sm:text-2xl">{item.question}</span>
              <svg
                className={`mt-1 h-5 w-5 flex-shrink-0 text-[#5f7672] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? 'mt-4 max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <p className="max-w-4xl whitespace-pre-line text-base leading-8 text-[#5f7672]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
