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
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#8b5cf6]/20 to-[rgb(0,52,50)] py-20 lg:py-32 overflow-hidden">
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] font-bold">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#8b5cf6]/20 to-pink-900/20">
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

