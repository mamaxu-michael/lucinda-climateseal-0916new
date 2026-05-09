'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoTextLayout from '@/components/VideoTextLayout';
import { motion } from 'framer-motion';

export default function CarbonExpertSolutionPage() {
  const { t, language } = useLanguage();
  const persona = t.sections.personas.carbonExpert;
  const assistants = t.sections.aiAssistants.assistants.carbonExpert;
  const heroDescription = language === 'zh'
    ? '为碳咨询师、LCA 团队和企业碳专家打造的 AI 工作流，更快完成建模、因子匹配、质量检查与报告交付。'
    : 'An AI workflow for carbon experts, LCA teams, and advisory groups that speeds up modeling, factor matching, QA, and report delivery.';
  const solutionIntro = language === 'zh'
    ? '把方法学判断、BOM 处理、PCF 计算和预审查整合进一个更可追溯的系统，帮助专家团队减少重复劳动，把时间用在高价值判断上。'
    : 'Bring methodology decisions, BOM processing, PCF calculation, and pre-verification checks into one traceable system so expert teams spend less time on repetitive execution and more time on high-value judgment.';
  const ctaTitle = language === 'zh' ? '让专家团队把时间花在关键判断上' : 'Give expert teams more time for high-value judgment';
  const ctaBody = language === 'zh'
    ? '如果你正在交付复杂 PCF、LCA 或审计准备项目，Climate Seal 可以帮助团队更快完成建模、核验与交付。'
    : 'If your team delivers complex PCF, LCA, or audit-prep work, Climate Seal can help you move faster through modeling, review, and delivery.';
  const heroHighlights = language === 'zh'
    ? [
        'AI 引导方法学与建模',
        '核验级因子匹配',
        '结构化风险与审计留痕',
      ]
    : [
        'AI-guided methodology and modeling',
        'Verification-grade factor matching',
        'Structured risk and audit trail',
      ];

  // Generate cards data for Carbon Expert
  const getCardsForRole = () => {
    return [
      {
        title: language === 'zh' ? '自动化合规映射' : 'Automated Compliance Mapping',
        summary: language === 'zh' 
          ? '即时将您的运营映射到正确的法规（如GHG协议或ISO 14067）。锁定您的规则集，以加速审核并确保准确的报告。'
          : 'Instantly map your operations to the right regulations (such as GHG protocol or ISO 14067). Lock in your rule set to accelerate audits and ensure accurate reporting.',
        gradient: "from-purple-500/25 to-violet-500/25",
        background: "bg-gradient-to-b from-purple-600/70 to-purple-800/70",
        staticMediaSrc: "/reg-advisor.png",
        dynamicMediaSrc: "/videos/video1-card.mp4"
      },
      {
        title: language === 'zh' ? '自动化BOM数据处理' : 'Automated BOM Data Processing',
        summary: language === 'zh' 
          ? '智能解析和标准化物料清单（BOM）和供应链数据。消除手动数据清理，每次都能按时收到可用于分析的信息。'
          : 'Intelligently parse and standardize Bill of Materials (BOM) and supply chain data. Eliminate manual data cleaning and receive analysis-ready information on time, every time.',
        gradient: "from-emerald-500/25 to-green-600/25",
        background: "bg-gradient-to-b from-green-600/70 to-green-800/70",
        staticMediaSrc: "/data-intake-steward.png",
        dynamicMediaSrc: "/videos/video2-card.mp4"
      },
      {
        title: language === 'zh' ? '批量PCF计算' : 'Bulk PCF Calculation',
        summary: language === 'zh' 
          ? '自动批量匹配排放因子，并根据BOM、能源和物流数据计算您的产品碳足迹（PCF）。超越手动计算，实现批量、可审计的结果。'
          : 'Automatically batch-match emission factors and compute your Product Carbon Footprint (PCF) from BOM, energy, and logistics data. Move beyond manual calculations to bulk, auditable results.',
        gradient: "from-sky-500/25 to-blue-600/25",
        background: "bg-gradient-to-b from-blue-600/70 to-blue-800/70",
        staticMediaSrc: "/pcf-modeler.png",
        dynamicMediaSrc: "/videos/video3-card.mp4"
      },
      {
        title: language === 'zh' ? '风险与数据质量检查' : 'Risk & Data Quality Check',
        summary: language === 'zh' 
          ? '对您的产品碳报告执行自动化的字段级风险检查和不确定性分析。获得可操作的修复提示，一次性通过验证，建立利益相关者信任。'
          : 'Perform automated field-level risk checks and uncertainty analysis on your product carbon reports. Get actionable fix hints to pass verification the first time and build stakeholder trust.',
        gradient: "from-orange-500/25 to-amber-600/25",
        background: "bg-gradient-to-b from-orange-600/70 to-orange-800/70",
        staticMediaSrc: "/qa-anomaly-detector.png",
        dynamicMediaSrc: "/videos/video4-card.mp4"
      },
      ...(assistants.reportGenerator ? [{
        title: assistants.reportGenerator.title,
        summary: assistants.reportGenerator.description,
        gradient: "from-indigo-500/25 to-purple-500/25",
        background: "bg-gradient-to-b from-indigo-600/70 to-indigo-800/70",
        staticMediaSrc: "/external-verifier.png",
        dynamicMediaSrc: "/videos/video1-card.mp4"
      }] : []),
      ...(assistants.dataValidator ? [{
        title: language === 'zh' ? '从风险盲点到清晰行动方案，仅需几分钟' : 'From Risk Blind Spots to a Clear Action Plan in Minutes',
        summary: language === 'zh' 
          ? '我们的AI风险筛查工具识别并排名您的前10个可持续发展风险敞口，然后提供优先排序的90天计划，包含成本和ROI数据（USD/tCO₂e），帮助您将支出集中在最重要的事项上。'
          : 'Our AI Risk Screener identifies and ranks your top 10 sustainability exposures, then delivers a prioritized 90-day plan with cost and ROI data (USD/tCO₂e) to focus your spending on what matters most.',
        gradient: "from-rose-500/25 to-pink-500/25",
        background: "bg-gradient-to-b from-rose-600/70 to-rose-800/70",
        staticMediaSrc: "/risk-screener.png",
        dynamicMediaSrc: "/videos/video2-card.mp4"
      }] : [])
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
                {language === 'zh' ? 'Carbon Expert 解决方案' : 'Carbon Expert Solution'}
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
                <Image src="/pcf-modeler.png" alt="Carbon Expert platform preview" width={960} height={640} className="h-auto w-full object-cover" />
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
            {language === 'zh' ? '专家团队常见挑战' : 'Common challenges for expert teams'}
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
            {language === 'zh' ? '面向专家的交付系统' : 'A delivery system built for experts'}
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
