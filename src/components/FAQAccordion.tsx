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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="w-full max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="p-4 sm:p-6">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-base sm:text-lg font-semibold text-gray-900">{item.question}</span>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
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
                isOpen ? 'mt-3 max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <p className="text-sm sm:text-base text-gray-600 leading-7">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


