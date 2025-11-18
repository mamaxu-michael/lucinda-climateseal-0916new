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
  const assistants = t.sections.aiAssistants.assistants.supplyChain;

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
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#3b82f6]/20 to-[rgb(0,52,50)] py-20 lg:py-32 overflow-hidden">
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] font-bold">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#3b82f6]/20 to-blue-900/20">
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

