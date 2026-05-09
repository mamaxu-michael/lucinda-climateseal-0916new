'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoTextLayout from '@/components/VideoTextLayout';
import { motion } from 'framer-motion';

export default function BrandOwnerSolutionPage() {
  const { t, language } = useLanguage();
  const persona = t.sections.personas.brandOwner;
  const assistants = t.sections.aiAssistants.assistants.brandOwner;
  const heroDescription = language === 'zh'
    ? '为品牌方和可持续发展负责人打造的 AI 工作流，帮助你更快掌握供应链碳数据、推进目标管理，并把减排计划讲清楚。'
    : 'An AI workflow for brand owners and sustainability leaders who need faster supplier carbon visibility, stronger target management, and clearer decarbonization planning.';
  const solutionIntro = language === 'zh'
    ? '把供应链数据追踪、范围管理、进度判断和减排规划整合进一个更清晰的系统，帮助品牌团队从催数据转向真正的决策与推进。'
    : 'Bring supplier follow-up, scope management, progress tracking, and abatement planning into one clearer system so brand teams spend less time chasing data and more time driving decisions.';
  const ctaTitle = language === 'zh' ? '让品牌团队从催数据转向推进结果' : 'Help brand teams move from chasing data to driving results';
  const ctaBody = language === 'zh'
    ? '如果你需要推动供应链净零、SBTi 规划或品牌级碳管理，Climate Seal 可以帮助团队更快拿到可行动的数据与计划。'
    : 'If you are leading supplier decarbonization, SBTi planning, or brand-wide carbon programs, Climate Seal can help your team get to actionable data and plans faster.';
  const heroHighlights = language === 'zh'
    ? [
        '品牌与供应链碳数据总览',
        '自动数据追踪与催收',
        'SBTi 计划优先级建议',
      ]
    : [
        'Portfolio-wide carbon visibility',
        'Automated supplier data follow-up',
        'Priority planning for SBTi programs',
      ];

  // Generate cards data for Brand Owner
  const getCardsForRole = () => {
    return [
      {
        title: assistants.brandAnalyzer.title,
        summary: assistants.brandAnalyzer.description,
        gradient: "from-pink-500/25 to-rose-500/25",
        background: "bg-gradient-to-b from-pink-600/70 to-pink-800/70",
        staticMediaSrc: "/brand-analyzer.png",
        dynamicMediaSrc: "/videos/brand-video1.mp4"
      },
      {
        title: assistants.scopeTracker.title,
        summary: assistants.scopeTracker.description,
        gradient: "from-indigo-500/25 to-purple-500/25",
        background: "bg-gradient-to-b from-indigo-600/70 to-indigo-800/70",
        staticMediaSrc: "/scope-tracker.png",
        dynamicMediaSrc: "/videos/brand-video2.mp4"
      },
      {
        title: language === 'zh' ? '消除数据追踪，按时完成每个截止日期' : 'Eliminate Data Chasing, Meet Every Deadline',
        summary: language === 'zh' 
          ? '自动跟踪和加快您的项目计划中的可持续发展数据收集。获得您所需的准确数据，确保您的净零和合规时间表锁定。'
          : 'Automatically track and expedite sustainability data collection against your project plan. Secure the accurate data you need to keep your net-zero and compliance timelines locked in.',
        gradient: "from-emerald-500/25 to-teal-500/25",
        background: "bg-gradient-to-b from-emerald-600/70 to-emerald-800/70",
        staticMediaSrc: "/sustainability-reporter.png",
        dynamicMediaSrc: "/videos/brand-video3.mp4"
      },
      {
        title: language === 'zh' ? '更快获得SBTi计划批准' : 'Get Your SBTi Plan Approved Faster',
        summary: language === 'zh' 
          ? '从您的供应商数据即时生成严谨的、基于科学的减排计划。我们的AI按ROI和每吨成本对项目进行优先级排序，为领导层构建无懈可击的商业案例。'
          : 'Instantly generate a rigorous, science-based abatement plan from your supplier data. Our AI prioritizes projects by ROI and cost-per-tonne to build a bulletproof business case for leadership.',
        gradient: "from-violet-500/25 to-purple-500/25",
        background: "bg-gradient-to-b from-violet-600/70 to-violet-800/70",
        staticMediaSrc: "/goal-manager.png",
        dynamicMediaSrc: "/videos/brand-video4.mp4"
      }
    ];
  };

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-ink)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--brand-bg-soft)] py-14 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(196,226,220,0.38),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(214,221,216,0.34),transparent_24%),linear-gradient(180deg,rgba(239,236,229,0.98)_0%,rgba(245,243,238,1)_100%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 border border-[var(--brand-border)] bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent-strong)] shadow-[0_10px_24px_rgba(18,63,61,0.05)] sm:px-4 sm:py-2 sm:text-[11px]">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-strong)]" />
                {language === 'zh' ? 'Brand Owner 解决方案' : 'Brand Owner Solution'}
              </div>
              <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 font-lora text-[2.3rem] font-bold leading-[0.96] tracking-[-0.03em] text-[var(--brand-ink)] sm:text-5xl lg:text-[4.15rem]"
              >
                {persona.title}
              </motion.h1>
              <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-3xl text-base leading-7 text-[var(--brand-muted)] sm:text-2xl lg:mx-0 lg:max-w-2xl lg:text-[1.65rem]"
            >
              {heroDescription}
            </motion.p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/#contact" className="inline-flex items-center justify-center border border-[var(--brand-accent-strong)] bg-[var(--brand-accent-strong)] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[color:rgba(18,63,61,0.88)]">
                  {language === 'zh' ? '预约演示' : 'Book a Demo'}
                </Link>
                <a href="#features" className="inline-flex items-center justify-center border border-[var(--brand-border)] bg-white/80 px-7 py-3.5 text-base font-semibold text-[var(--brand-ink)] transition hover:bg-white">
                  {language === 'zh' ? '查看功能演示' : 'See Key Features'}
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 shadow-[0_18px_36px_rgba(18,63,61,0.06)] sm:p-5"
            >
              <div className="overflow-hidden border border-[var(--brand-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(239,236,229,0.92))] p-4">
                <Image src="/goal-manager.png" alt="Brand Owner platform preview" width={960} height={640} className="h-auto w-full object-cover" />
              </div>
              <div className="mt-4 space-y-2.5">
                {heroHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--brand-muted)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-accent-strong)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-20 z-40 border-b border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.88)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-start gap-1.5 overflow-x-auto py-3 md:justify-center md:gap-3 md:py-4">
            <a href="#challenges" className="px-3 py-2 text-sm font-medium whitespace-nowrap text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-ink)] md:px-4 md:text-base">
              {language === 'zh' ? '挑战' : 'Challenges'}
            </a>
            <a href="#features" className="px-3 py-2 text-sm font-medium whitespace-nowrap text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-ink)] md:px-4 md:text-base">
              {language === 'zh' ? '功能演示' : 'Key Features'}
            </a>
            <a href="#benefits" className="px-3 py-2 text-sm font-medium whitespace-nowrap text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-ink)] md:px-4 md:text-base">
              {language === 'zh' ? '关键数据' : 'Key Benefits'}
            </a>
          </nav>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="bg-[var(--brand-bg)] py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-4xl">
            {language === 'zh' ? '品牌团队常见挑战' : 'Common challenges for brand teams'}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {persona.painPoints.map((painPoint, index) => {
              const title = typeof painPoint === 'string' ? '' : painPoint.title;
              const description = typeof painPoint === 'string' ? painPoint : painPoint.description;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-[0_12px_24px_rgba(18,63,61,0.04)] transition-shadow hover:shadow-[0_14px_28px_rgba(18,63,61,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[var(--brand-accent-strong)]/10 font-bold text-[var(--brand-accent-strong)]">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      {title && (
                        <h3 className="mb-2 text-lg font-semibold text-[var(--brand-ink)]">{title}</h3>
                      )}
                      <p className="leading-relaxed text-[var(--brand-muted)]">{description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section id="solutions" className="bg-[var(--brand-bg)] pt-4 pb-6 lg:pt-12 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-4xl">
            {language === 'zh' ? '面向品牌方的执行系统' : 'An execution system built for brand teams'}
          </h2>
          <p className="mx-auto max-w-4xl text-center text-base leading-7 text-[var(--brand-muted)] sm:text-xl">
            {solutionIntro}
          </p>
        </div>
      </section>

      {/* Key Features Demo */}
      <section id="features" className="bg-[var(--brand-bg)] pt-4 pb-12 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoTextLayout items={getCardsForRole()} />
        </div>
      </section>

      {/* Stats/Benefits */}
      <section id="benefits" className="bg-[var(--brand-bg)] py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-[0_12px_24px_rgba(18,63,61,0.04)]"
            >
              <div className="mb-3 text-2xl font-bold text-[var(--brand-ink)]">{persona.stat}</div>
              <p className="text-sm font-normal text-[var(--brand-muted)]">{persona.statDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-[0_12px_24px_rgba(18,63,61,0.04)]"
            >
              <div className="mb-3 text-2xl font-bold text-[var(--brand-ink)]">{persona.secondStatDescription}</div>
              <p className="text-sm font-normal text-[var(--brand-muted)]">{persona.thirdStatDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-[0_12px_24px_rgba(18,63,61,0.04)]"
            >
              <div className="mb-3 text-2xl font-bold text-[var(--brand-ink)]">{persona.fourthStat}</div>
              <p className="text-sm font-normal text-[var(--brand-muted)]">{persona.fourthStatDescription}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--brand-bg-soft)] py-12 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-4xl">
            {ctaTitle}
          </h2>
          <p className="mb-6 text-base leading-7 text-[var(--brand-muted)] sm:text-xl">
            {ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact" 
              className="border border-[var(--brand-accent-strong)] bg-[var(--brand-accent-strong)] px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[color:rgba(18,63,61,0.88)]"
            >
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </Link>
            <Link 
              href="/" 
              className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-8 py-4 text-lg font-semibold text-[var(--brand-ink)] transition duration-300 hover:bg-white"
            >
              {language === 'zh' ? '返回首页' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
