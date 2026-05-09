'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoTextLayout from '@/components/VideoTextLayout';
import { motion } from 'framer-motion';

export default function SupplyChainSolutionPage() {
  const { t, language } = useLanguage();
  const persona = t.sections.personas.supplyChain;
  const heroDescription = language === 'zh'
    ? '为供应链企业与出口团队打造的 AI 工作流，更快生成合规 PCF、减少验证返工，并按买方要求完成提交。'
    : 'An AI workflow for suppliers and export teams that helps generate compliant PCFs faster, reduce verification rework, and meet buyer submission requirements.';
  const solutionIntro = language === 'zh'
    ? '把 PCF 计算、验证风险检查和提交材料整理整合进一个更高效的系统，帮助供应链团队更快响应 RFQ、投标与审查要求。'
    : 'Bring PCF calculation, verification checks, and submission packaging into one more efficient system so suppliers can respond faster to RFQs, tenders, and buyer reviews.';
  const ctaTitle = language === 'zh' ? '帮助供应链团队更快交付合规结果' : 'Help supplier teams deliver compliant results faster';
  const ctaBody = language === 'zh'
    ? '如果你正在响应品牌方、买方或欧盟出口要求，Climate Seal 可以帮助团队更快完成 PCF、预审查与提交准备。'
    : 'If your team is responding to buyer requests, brand requirements, or EU export pressure, Climate Seal can help you move faster through PCF delivery, pre-checks, and submission prep.';
  const heroHighlights = language === 'zh'
    ? [
        '更快生成合规 PCF',
        '预先识别验证风险',
        '一键生成提交材料',
      ]
    : [
        'Faster compliant PCF delivery',
        'Pre-check verification risk',
        'One-click submission packages',
      ];

  // Generate cards data for Supply Chain
  const getCardsForRole = () => {
    return [
      {
        title: language === 'zh' ? '自动化产品碳足迹（PCF）' : 'Automated Product Carbon Footprint (PCF)',
        summary: language === 'zh' 
          ? '从您的BOM、规格和公用事业数据即时生成可信、合规的PCF。满足欧盟出口和可持续采购的关键RFQ和投标截止日期。'
          : 'Instantly generate credible, compliant PCFs from your BOM, specs, and utility data. Meet critical RFQ and tender deadlines for EU exports and sustainable procurement.',
        gradient: "from-rose-500/25 to-pink-500/25",
        background: "bg-gradient-to-b from-rose-600/70 to-rose-800/70",
        staticMediaSrc: "/supply-chain-assessment.png",
        dynamicMediaSrc: "/videos/supplier-video1.mp4"
      },
      {
        title: language === 'zh' ? '确保您的PCF首次通过验证' : 'Ensure Your PCF Passes Verification The First Time',
        summary: language === 'zh' 
          ? '我们的AI预先检查您的碳足迹的质量和风险，大幅降低被拒绝的可能性，并防止代价高昂的运输延误。'
          : 'Our AI pre-checks your carbon footprint for quality and risk, slashing the chance of rejection and preventing costly shipping delays.',
        gradient: "from-slate-500/25 to-gray-500/25",
        background: "bg-gradient-to-b from-slate-600/70 to-slate-800/70",
        staticMediaSrc: "/export-compliance.png",
        dynamicMediaSrc: "/videos/supplier-video2.mp4"
      },
      {
        title: language === 'zh' ? '一键提交可持续发展报告' : 'Submit Sustainability Reports in One Click',
        summary: language === 'zh' 
          ? '自动将您的PCF数据和证据编译成定制的买方或审计师格式。实现一键、无错误的提交，节省时间并降低报告成本。'
          : 'Automatically compile your PCF data and evidence into custom buyer or auditor formats. Enable one-click, error-free submission to save time and lower reporting costs.',
        gradient: "from-lime-500/25 to-green-500/25",
        background: "bg-gradient-to-b from-lime-600/70 to-lime-800/70",
        staticMediaSrc: "/cost-optimizer.png",
        dynamicMediaSrc: "/videos/supplier-video3.mp4"
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
                {language === 'zh' ? 'Supply Chain 解决方案' : 'Supply Chain Solution'}
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
                <Image src="/supply-chain-assessment.png" alt="Supply Chain platform preview" width={960} height={640} className="h-auto w-full object-cover" />
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
            {language === 'zh' ? '供应链团队常见挑战' : 'Common challenges for supplier teams'}
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
            {language === 'zh' ? '面向供应链的合规交付系统' : 'A compliance delivery system for suppliers'}
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
