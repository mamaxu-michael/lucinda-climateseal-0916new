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
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#6161ff]/20 to-[rgb(0,52,50)] py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-lora"
            >
              {persona.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              {persona.needs}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-20 z-40 bg-[rgb(0,52,50)]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center gap-2 md:gap-3 py-4 overflow-x-auto">
            <a href="#challenges" className="text-white/80 hover:text-white px-4 py-2 text-base font-medium whitespace-nowrap transition-colors">
              {language === 'zh' ? '挑战' : 'Challenges'}
            </a>
            <a href="#features" className="text-white/80 hover:text-white px-4 py-2 text-base font-medium whitespace-nowrap transition-colors">
              {language === 'zh' ? '功能演示' : 'Key Features'}
            </a>
            <a href="#benefits" className="text-white/80 hover:text-white px-4 py-2 text-base font-medium whitespace-nowrap transition-colors">
              {language === 'zh' ? '关键数据' : 'Key Benefits'}
            </a>
          </nav>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-12 text-center font-lora">
            {language === 'zh' ? '面临的挑战' : 'Challenges You and Your Team May Face'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6161ff]/10 flex items-center justify-center text-[#6161ff] font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      {title && (
                        <h3 className="text-lg font-semibold text-[#333333] mb-2">{title}</h3>
                      )}
                      <p className="text-[#333333] leading-relaxed">{description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section id="solutions" className="pt-8 pb-8 lg:pt-12 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-6 text-center font-lora">
            {language === 'zh' ? '我们的解决方案' : 'Our Solution'}
          </h2>
          <p className="text-xl text-[#666666] text-center max-w-4xl mx-auto leading-relaxed">
            {language === 'zh' 
              ? '解锁AI驱动的碳解决方案，消除手动计算，降低合规成本，并在专家指导下加速实现您的可持续发展目标。'
              : 'Unlock AI-powered carbon solutions that eliminate manual calculations, reduce compliance costs, and accelerate your sustainability goals with expert guidance.'}
          </p>
        </div>
      </section>

      {/* Key Features Demo */}
      <section id="features" className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoTextLayout items={getCardsForRole()} />
        </div>
      </section>

      {/* Stats/Benefits */}
      <section id="benefits" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f7f9ff] rounded-3xl p-6 border border-[#e6e8f2] shadow-sm"
            >
              <div className="text-[#333333] text-2xl font-bold mb-3">{persona.stat}</div>
              <p className="text-[#333333] text-sm font-normal">{persona.statDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#f7f9ff] rounded-3xl p-6 border border-[#e6e8f2] shadow-sm"
            >
              <div className="text-[#333333] text-2xl font-bold mb-3">{persona.secondStatDescription}</div>
              <p className="text-[#333333] text-sm font-normal">{persona.thirdStatDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#f7f9ff] rounded-3xl p-6 border border-[#e6e8f2] shadow-sm"
            >
              <div className="text-[#333333] text-2xl font-bold mb-3">{persona.fourthStat}</div>
              <p className="text-[#333333] text-sm font-normal">{persona.fourthStatDescription}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#6161ff]/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-lora">
            {language === 'zh' ? '准备开始了吗？' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {language === 'zh' 
              ? '立即联系我们的团队，开启您的可持续发展之旅，首份报告由我们承担。'
              : 'Contact our team today to kickstart your sustainability journey with first report on us.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact" 
              className="bg-yellow-400 hover:bg-yellow-500 text-[rgb(0,52,50)] px-8 py-4 rounded-full font-semibold text-lg transition duration-300"
            >
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </Link>
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300 border border-white/20"
            >
              {language === 'zh' ? '返回首页' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

