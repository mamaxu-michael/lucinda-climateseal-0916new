'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ComparisonSection = () => {
  const { t } = useLanguage();
  const comparisonData = t?.comparison;

  if (!comparisonData) {
    return (
      <section className="bg-[var(--brand-bg-soft)] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-lora text-4xl font-bold text-[var(--brand-ink)]">
              Loading comparison data...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="advantages" className="bg-[var(--brand-bg-soft)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-lora text-3xl font-bold text-[var(--brand-ink)] sm:mb-8 sm:text-4xl">
            {comparisonData.title || 'The Climate Seal Advantage'}
          </h2>
          <p className="mx-auto max-w-5xl break-words text-base leading-relaxed text-[var(--brand-muted)] hyphens-auto sm:text-lg md:text-xl">
            {comparisonData.subtitle || 'From months to hours, from expensive to affordable'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          <TimelinePanel
            title={comparisonData.consultant?.title || 'Carbon Software + Carbon Experts'}
            meta={`${comparisonData.consultant?.time || '1-2 months'} · ${comparisonData.consultant?.steps || '11 steps'}`}
            steps={comparisonData.consultant?.stepList || []}
            isZh={t?.nav?.home === '首页'}
          />
          <TimelinePanel
            title={comparisonData.aiAgent?.title || 'Climate Seal AI'}
            meta={`${comparisonData.aiAgent?.time || '4 hours'} · ${comparisonData.aiAgent?.cost || '$100'} · ${comparisonData.aiAgent?.steps || '4 steps'}`}
            steps={comparisonData.aiAgent?.stepList || []}
            isZh={t?.nav?.home === '首页'}
            featured
          />
          <TimelinePanel
            title={comparisonData.traditional?.title || 'Traditional Consultancy'}
            meta={`${comparisonData.traditional?.time || '3-6 months'} · ${comparisonData.traditional?.cost || '$50K-100K'} · ${comparisonData.traditional?.steps || '12 steps'}`}
            steps={comparisonData.traditional?.stepList || []}
            isZh={t?.nav?.home === '首页'}
          />
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;

type TimelinePanelProps = {
  title: string;
  meta: string;
  steps: string[];
  isZh?: boolean;
  featured?: boolean;
};

const TimelinePanel = ({ title, meta, steps, isZh, featured }: TimelinePanelProps) => {
  const [open, setOpen] = useState<boolean>(featured ? true : false);
  const visible = open ? steps : steps.slice(0, 4);

  return (
    <div
      className={[
        'rounded-2xl border border-[var(--brand-border)] p-6 md:p-8',
        featured
          ? 'bg-[var(--brand-surface)] ring-2 ring-[color:rgba(33,91,87,0.24)] shadow-[0_20px_45px_rgba(18,63,61,0.1)]'
          : 'bg-[color:rgba(251,248,242,0.72)] shadow-[0_14px_36px_rgba(18,63,61,0.08)]',
      ].join(' ')}
    >
      <div className="mb-4">
        <h3 className="font-lora text-2xl font-bold text-[var(--brand-ink)] md:text-3xl">{title}</h3>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className={`text-sm md:text-base ${featured ? 'text-[var(--brand-ink)]' : 'text-[var(--brand-muted)]'}`}>
            {meta}
          </p>
          {steps.length > 4 && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg)] px-3 py-1 text-xs text-[var(--brand-ink)] transition hover:bg-[var(--brand-bg-soft)] md:text-sm"
            >
              {open ? (isZh ? '收起' : 'Show less') : (isZh ? `展开全部步骤(${steps.length})` : `Show all steps (${steps.length})`)}
            </button>
          )}
        </div>
      </div>

      <ol className="relative space-y-4 border-s border-[var(--brand-border)] ps-6">
        {visible.map((step, index) => (
          <li key={index} className="ms-2">
            <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-[var(--brand-accent-strong)] shadow-[0_0_0_4px_rgba(214,232,223,0.9)]" />
            <div className="text-sm leading-relaxed text-[var(--brand-ink)] md:text-base">{step}</div>
          </li>
        ))}

        {!open && steps.length > 4 && (
          <li className="ms-2">
            <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-[color:rgba(18,63,61,0.16)] shadow-[0_0_0_4px_rgba(236,231,220,0.9)]" />
            <div className="select-none text-base text-[var(--brand-muted)]">...</div>
          </li>
        )}
      </ol>
    </div>
  );
};
