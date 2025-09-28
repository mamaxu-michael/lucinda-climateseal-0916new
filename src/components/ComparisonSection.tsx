'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ComparisonSection = () => {
  const { t } = useLanguage();

  // Use top-level comparison block (not sections.comparison)
  const comparisonData = t?.comparison;

  // const [active, setActive] = useState<'ai' | 'consultant' | 'traditional'>('ai');
  
  if (!comparisonData) {
    return (
      <section className="py-16 bg-[rgb(0,52,50)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-lora">
              Loading comparison data...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="advantages" className="py-16 bg-[rgb(0,52,50)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 font-lora">
            {comparisonData.title || 'The Climate Seal Advantage'}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-5xl mx-auto leading-relaxed break-words hyphens-auto">
            {comparisonData.subtitle || 'From months to hours, from expensive to affordable'}
          </p>
        </div>

        {/* removed summary metrics to avoid duplication with Value section */}

        {/* 3-up side-by-side timelines for easier comparison on desktop; stack on mobile */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Carbon Software + Experts */}
          <TimelinePanel
            title={comparisonData.consultant?.title || 'Carbon Software + Carbon Experts'}
            meta={`${comparisonData.consultant?.time || '1-2 months'} · ${comparisonData.consultant?.steps || '11 steps'}`}
            steps={comparisonData.consultant?.stepList || []}
            collapsed
            isZh={t?.nav?.home === '首页'}
          />
          {/* Middle: Climate Seal AI (featured) */}
          <TimelinePanel
            title={comparisonData.aiAgent?.title || 'Climate Seal AI'}
            meta={`${comparisonData.aiAgent?.time || '4 hours'} · ${comparisonData.aiAgent?.cost || '$100'} · ${comparisonData.aiAgent?.steps || '4 steps'}`}
            steps={comparisonData.aiAgent?.stepList || []}
            collapsed
            isZh={t?.nav?.home === '首页'}
            featured
          />
          {/* Right: Traditional Consultancy */}
          <TimelinePanel
            title={comparisonData.traditional?.title || 'Traditional Consultancy'}
            meta={`${comparisonData.traditional?.time || '3-6 months'} · ${comparisonData.traditional?.cost || '$50K-100K'} · ${comparisonData.traditional?.steps || '12 steps'}`}
            steps={comparisonData.traditional?.stepList || []}
            collapsed
            isZh={t?.nav?.home === '首页'}
          />
        </div>

        {/* Removed bridge subtitle per request */}
      </div>
    </section>
  );
};

export default ComparisonSection;


type TimelinePanelProps = {
  title: string;
  meta: string;
  steps: string[];
  collapsed?: boolean;
  isZh?: boolean;
  featured?: boolean;
};

const TimelinePanel = ({ title, meta, steps, isZh, featured }: TimelinePanelProps) => {
  const [open, setOpen] = useState<boolean>(featured ? true : false);
  const visible = open ? steps : steps.slice(0, 4);
  return (
    <div className={`${featured ? 'bg-white/10 ring-2 ring-[#9ef894]/60 shadow-xl' : 'bg-white/5 shadow-md'} rounded-2xl p-6 md:p-8`}>
      <div className="mb-4">
        <h3 className={`text-2xl md:text-3xl font-bold text-white font-lora ${featured ? '' : ''}`}>{title}</h3>
        <div className="flex items-center justify-between gap-3 mt-1">
          <p className={`${featured ? 'text-white/95' : 'text-white/80'} text-sm md:text-base`}>{meta}</p>
          {steps.length > 4 && (
            <button onClick={() => setOpen((v) => !v)} className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
              {open ? (isZh ? '收起' : 'Show less') : (isZh ? `展开全部步骤(${steps.length})` : `Show all steps (${steps.length})`)}
            </button>
          )}
        </div>
      </div>
      <ol className="relative border-s border-white/15 ps-6 space-y-4">
        {visible.map((s, i) => (
          <li key={i} className="ms-2">
            <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
            <div className="text-white text-sm md:text-base leading-relaxed">{s}</div>
          </li>
        ))}
        {!open && steps.length > 4 && (
          <li className="ms-2">
            <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.06)]" />
            <div className="text-white/60 text-base select-none">…</div>
          </li>
        )}
      </ol>
    </div>
  );
};
