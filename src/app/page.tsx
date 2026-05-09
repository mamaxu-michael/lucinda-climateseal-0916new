'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: '',
    referralCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const solutionCards = [
    {
      href: '/solutions/brand-owner',
      label: language === 'zh' ? '品牌与采购团队' : 'Brands & Procurement',
      title: language === 'zh' ? '管理供应商碳数据与减排计划' : 'Manage supplier carbon data and abatement planning',
      summary:
        language === 'zh'
          ? '帮助品牌、采购与可持续团队更快收集供应商数据、识别质量风险，并推进可执行的减排计划。'
          : 'Help brand, procurement, and sustainability teams collect supplier data faster, identify quality risks, and move credible abatement plans forward.',
      cta: language === 'zh' ? '查看品牌方案' : 'See brand solution',
    },
    {
      href: '/solutions/supply-chain',
      label: language === 'zh' ? '供应商与出口企业' : 'Suppliers & Exporters',
      title: language === 'zh' ? '更快交付可信的产品碳足迹结果' : 'Deliver credible product carbon footprints faster',
      summary:
        language === 'zh'
          ? '帮助工厂、供应商与出口企业用更低的执行成本准备审计就绪的 PCF、证据包与客户交付材料。'
          : 'Help factories, suppliers, and exporters produce audit-ready PCFs, evidence packs, and buyer submissions with less manual work.',
      cta: language === 'zh' ? '查看供应商方案' : 'See supplier solution',
    },
    {
      href: '/solutions/carbon-expert',
      label: language === 'zh' ? '碳与 ESG 专业团队' : 'Carbon & ESG Teams',
      title: language === 'zh' ? '提升建模、因子匹配与质量审查效率' : 'Speed up modeling, factor matching, and quality review',
      summary:
        language === 'zh'
          ? '帮助碳顾问、LCA 与 ESG 专业团队减少重复计算工作，把时间投入到高价值判断、审核与交付质量。'
          : 'Help consultants and in-house carbon teams reduce repetitive calculation work and focus expert time on judgment, review, and delivery quality.',
      cta: language === 'zh' ? '查看专家方案' : 'See expert solution',
    },
  ];
  const platformCoverage = language === 'zh'
    ? {
        eyebrow: 'Platform coverage',
        title: '一套平台，覆盖不止一种碳核算工作流',
        description: 'Climate Seal 不只服务 Product Carbon Footprint。它也支持 Scope 3 企业碳核算与 Project Carbon 场景，并把标准支持和生命周期边界能力放进同一套 AI 工作流里。',
        cards: [
          {
            label: 'Accounting coverage',
            title: '覆盖多类碳核算场景',
            description: '支持 Product Carbon Footprint、Scope 3 企业碳核算与 Project Carbon，不需要为不同交付场景切换不同工具。',
            items: ['Product Carbon Footprint', 'Scope 3 企业碳核算', 'Project Carbon'],
          },
          {
            label: 'Standards supported',
            title: '围绕主流方法学和合规框架交付',
            description: '当前支持 ISO 14067 与 GHG Protocol，并为后续标准扩展预留统一的建模与复核逻辑。',
            items: ['ISO 14067', 'GHG Protocol'],
          },
          {
            label: 'Lifecycle boundaries',
            title: '支持不同生命周期边界',
            description: '无论是 cradle-to-grave 还是 cradle-to-cradle，团队都可以在同一系统里推进边界设定、建模和交付。',
            items: ['Cradle-to-grave', 'Cradle-to-cradle'],
          },
        ],
      }
    : {
        eyebrow: 'Platform coverage',
        title: 'One platform for more than one carbon accounting workflow',
        description: 'Climate Seal does not only support Product Carbon Footprints. It also covers Scope 3 corporate carbon accounting and Project Carbon workflows, while keeping standards support and lifecycle boundaries inside the same AI-led system.',
        cards: [
          {
            label: 'Accounting coverage',
            title: 'Cover multiple carbon accounting scenarios',
            description: 'Support Product Carbon Footprint, Scope 3 corporate carbon accounting, and Project Carbon work without switching between disconnected tools.',
            items: ['Product Carbon Footprint', 'Scope 3 Carbon Accounting', 'Project Carbon'],
          },
          {
            label: 'Standards supported',
            title: 'Deliver around mainstream methods and compliance frameworks',
            description: 'Today the platform supports ISO 14067 and GHG Protocol-aligned workflows, with a shared system for modeling and review as coverage expands.',
            items: ['ISO 14067', 'GHG Protocol'],
          },
          {
            label: 'Lifecycle boundaries',
            title: 'Handle different lifecycle boundaries in one place',
            description: 'Whether the work is cradle-to-grave or cradle-to-cradle, teams can move through boundary setup, modeling, and delivery inside the same system.',
            items: ['Cradle-to-grave', 'Cradle-to-cradle'],
          },
        ],
      };
  const whyNowCards = language === 'zh'
    ? [
        {
          title: '市场准入与合规压力',
          description: '客户、采购方和法规要求正在把产品级碳数据从可选项变成必需项。',
        },
        {
          title: '供应链协同成本高',
          description: '跨供应商收集、整理和复核数据仍然高度依赖 Excel、邮件和人工推进。',
        },
        {
          title: '可信交付难度高',
          description: '边界、因子、缺口和风险点一旦处理不清晰，就会放大返工和审查成本。',
        },
      ]
    : [
        {
          title: 'Market access and compliance pressure',
          description: 'Customers, procurement teams, and regulations are turning product-level carbon data from optional into required.',
        },
        {
          title: 'Supplier coordination is expensive',
          description: 'Collecting, organizing, and reviewing supplier inputs still depends heavily on spreadsheets, email, and manual follow-up.',
        },
        {
          title: 'Credible delivery is hard',
          description: 'When boundaries, factors, gaps, and risks are handled poorly, rework and assurance costs rise quickly.',
        },
      ];
  const impactCards = language === 'zh'
    ? [
        {
          title: '更快的流程与结果交付',
          description: '把从原始数据到可审阅结果的流程推进得更快，同时减少返工和反复确认。',
        },
        {
          title: '更少人工核算',
          description: '减少手工查因子、整理文件、来回确认和重复建模的工作量。',
        },
        {
          title: '更可信的输出',
          description: '通过结构化建模、风险提示和审计留痕提高交付一致性与可复核性。',
        },
        {
          title: '更好的供应链协同',
          description: '让品牌方、制造商与供应商围绕同一套更清晰的碳数据流程协作。',
        },
      ]
    : [
        {
          title: 'Faster workflow and result delivery',
          description: 'Move from raw data to review-ready outputs faster while reducing rework and repeated back-and-forth.',
        },
        {
          title: 'Less manual carbon work',
          description: 'Reduce manual factor lookup, document cleanup, repetitive coordination, and spreadsheet-heavy modeling work.',
        },
        {
          title: 'More credible outputs',
          description: 'Deliver traceable reports and complete supporting data packages that are ready to send for third-party verification.',
        },
        {
          title: 'Better supplier collaboration',
          description: 'Help brands, manufacturers, and suppliers work from a clearer shared carbon workflow.',
        },
      ];
  const referralProgram = language === 'zh'
    ? {
        title: '认识适合试用 Climate Seal 的人？',
        description: '邀请专家、顾问或品牌/采购经理来试用 Climate Seal。如果他们符合条件并开始与我们合作，你将获得价值 200 美元的 Climate Seal credits。',
        cta: '联系团队生成邀请码',
      }
    : {
        title: 'Know someone who should try Climate Seal?',
        description: 'We generate a unique invite code for you. Send it to an expert, consultant, or brand/procurement manager, and they can register using your code so the referral is tracked to you.',
        cta: 'Ask about the referral program',
      };
  const resourceCards = language === 'zh'
    ? [
        {
          href: '/resources',
          label: '法规与方法',
          title: '围绕 PCF、Scope 3 与碳合规持续学习',
          description: '查看产品碳足迹、边界定义、因子使用、供应链协同与合规交付相关的文章和白皮书。',
          cta: '进入资源中心',
        },
        {
          href: '/resources/whitepapers/ai-carbon-operations-playbook',
          label: '精选白皮书',
          title: '获取 AI Carbon Operations Playbook',
          description: '了解团队如何用 AI 改善数据收集、建模复核与碳交付节奏。',
          cta: '查看白皮书',
        },
      ]
    : [
        {
          href: '/resources',
          label: 'Methods and compliance',
          title: 'Keep learning across PCF, Scope 3, and carbon compliance',
          description: 'Explore articles and whitepapers on product carbon footprints, boundaries, factor usage, supplier engagement, and audit-ready delivery.',
          cta: 'Visit the resource center',
        },
        {
          href: '/resources/whitepapers/ai-carbon-operations-playbook',
          label: 'Featured whitepaper',
          title: 'Read the AI Carbon Operations Playbook',
          description: 'See how teams can use AI to improve data collection, modeling review, and carbon delivery workflows.',
          cta: 'View whitepaper',
        },
      ];
  const finalCta = language === 'zh'
    ? {
        title: '看看 Climate Seal 如何适配你的碳核算流程',
        description: '无论你是在交付首份 PCF、推进 Scope 3 数据协同，还是希望把更多建模与复核工作交给 AI，我们都可以帮你找到合适的起点。',
        primary: '预约演示',
        secondary: '联系团队',
      }
    : {
        title: 'See how Climate Seal fits your carbon workflow',
        description: 'Whether you are delivering a first PCF, scaling supplier engagement, or handing more modeling and review work to AI, we can help you find the right starting point.',
        primary: 'Book a Demo',
        secondary: 'Talk to the team',
      };
  const heroStages = language === 'zh'
    ? ['Targets & Scope', 'Raw Data', 'Accounting Model', 'Data Risk', 'Results & Output']
    : ['Targets & Scope', 'Raw Data', 'Accounting Model', 'Data Risk', 'Results & Output'];
  const heroTaskFeed = language === 'zh'
    ? [
        '补全核算范围',
        '解析 BOM 与原始文件',
        '标记高风险数据点',
        '整理审计就绪输出',
      ]
    : [
        'Complete accounting scope',
        'Parse BOM and source files',
        'Flag higher-risk data points',
        'Prepare audit-ready output',
      ];
  const heroCopilotMeta = language === 'zh'
    ? [
        { label: 'Active tasks', value: '04' },
        { label: 'Missing fields', value: '03' },
        { label: 'Risk flags', value: '07' },
      ]
    : [
        { label: 'Active tasks', value: '04' },
        { label: 'Missing fields', value: '03' },
        { label: 'Risk flags', value: '07' },
      ];
  const heroRightPanel = language === 'zh'
    ? {
        title: 'Accounting Requirements & Standards',
        cardTitle: 'Accounting Object',
        object: 'pen',
        formTitle: 'Regulation & Accounting Scope',
        fields: [
          { label: 'ISO 14067 (2018)', value: 'Selected' },
          { label: 'Accounting Boundary', value: 'Cradle-to-grave' },
          { label: 'Functional Unit', value: '1 pen' },
          { label: 'Benchmark Value', value: '0.082 kg CO2e' },
        ],
        tabs: ['Requirement', 'Raw Data', 'BOM Structure', 'Data Risk'],
      }
    : {
        title: 'Accounting Requirements & Standards',
        cardTitle: 'Accounting Object',
        object: 'pen',
        formTitle: 'Regulation & Accounting Scope',
        fields: [
          { label: 'ISO 14067 (2018)', value: 'Selected' },
          { label: 'Accounting Boundary', value: 'Cradle-to-grave' },
          { label: 'Functional Unit', value: '1 pen' },
          { label: 'Benchmark Value', value: '0.082 kg CO2e' },
        ],
        tabs: ['Requirement', 'Raw Data', 'BOM Structure', 'Data Risk'],
      };
  const heroAiSignals = language === 'zh'
    ? ['Document parsing', 'Factor matching', 'Risk scoring']
    : ['Document parsing', 'Factor matching', 'Risk scoring'];
  const heroWorkspaceRows = language === 'zh'
    ? [
        { label: 'BOM rows imported', value: '19', status: 'Parsed' },
        { label: 'Scope stages selected', value: '5', status: 'Ready' },
        { label: 'High-risk points', value: '7', status: 'Review' },
      ]
    : [
        { label: 'BOM rows imported', value: '19', status: 'Parsed' },
        { label: 'Scope stages selected', value: '5', status: 'Ready' },
        { label: 'High-risk points', value: '7', status: 'Review' },
      ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必需字段
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.industry || !formData.message) {
      setSubmitMessage(t.contact.messages.validation);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 使用服务器返回的消息，如果没有则使用默认成功消息
        setSubmitMessage(data.message || t.contact.messages.success);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          message: '',
          referralCode: '',
        });
      } else {
        // 使用服务器返回的错误消息，如果没有则使用默认错误消息
        setSubmitMessage(data.message || t.contact.messages.error);
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setSubmitMessage(t.contact.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productSection = language === 'zh'
    ? {
        title: '上传文件，让 AI 完成碳核算重活',
        subtitle:
          '上传产品、供应商或项目相关文件后，AI 会自动解析数据、辅助 LCA 建模、完成因子匹配，并标记缺失信息与风险点。团队需要做的更多是回答问题、补充缺口、确认关键判断，而不是手工推进整套碳核算流程。',
        summaryTitle: '为什么企业选择 Climate Seal',
        summaryItems: [
          '从上传文件开始，而不是从空白模型和人工整理开始',
          'AI 负责解析、建模支持、因子匹配和缺口识别',
          '团队只在 AI 要求补充、确认或复核时介入',
        ],
        cta: '预约演示',
        learnMore: '查看资源',
        capabilitiesTitle: '核心能力',
        capabilities: [
          {
            number: '01',
            title: '自动文件解析与数据整理',
            description:
              '支持多种文档与数据来源，自动整理成更适合碳核算与复核的结构化输入。',
          },
          {
            number: '02',
            title: 'AI 辅助 LCA 建模与边界设置',
            description:
              '围绕产品类型、交付场景、生命周期边界和方法学要求，帮助团队更快推进建模。',
          },
          {
            number: '03',
            title: '自动化因子匹配与风险评分',
            description:
              '结合产品、工艺、材料和地区语境支持更可信的因子筛选，并对关键数据点给出风险与复核信号。',
          },
          {
            number: '04',
            title: '缺口识别与审计就绪交付',
            description:
              '当信息缺失时引导团队补充或确认，并沉淀更适合客户、采购方和第三方复核的交付结果。',
          },
        ],
      }
    : {
        title: 'Upload files. Let AI do the carbon accounting work.',
        subtitle:
          'Upload product, supplier, or project files, and the AI agent parses the data, supports LCA modeling, automates factor matching, and flags missing pieces. Teams spend more time answering questions, filling gaps, and confirming key assumptions instead of pushing the whole carbon accounting process manually.',
        summaryTitle: 'Why teams choose Climate Seal',
        summaryItems: [
          'Start from uploaded files instead of blank models and manual cleanup',
          'Let AI handle parsing, modeling support, factor matching, and gap detection',
          'Bring people in only when confirmation, supplementation, or review is needed',
        ],
        cta: 'Book a Demo',
        learnMore: 'Explore Resources',
        capabilitiesTitle: 'Core capabilities',
        capabilities: [
          {
            number: '01',
            title: 'Automated document parsing',
            description:
              'Organize different document types into more structured accounting inputs without manual reformatting.',
          },
          {
            number: '02',
            title: 'AI-assisted LCA modeling and boundaries',
            description:
              'Move faster through lifecycle boundaries, methodology choices, and model setup across different carbon accounting scenarios.',
          },
          {
            number: '03',
            title: 'Automated factor matching and risk review',
            description:
              'Use product, process, material, and regional context for more credible factor selection, with review signals on higher-risk data points.',
          },
          {
            number: '04',
            title: 'Gap detection and audit-ready outputs',
            description:
              'When information is missing, the platform asks for confirmation or additional inputs and helps teams move toward review-ready delivery faster.',
          },
        ],
      };
  return (
    <>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden bg-[#f3f0e8]" data-theme="home" data-section="home-hero" data-category="landing">
        {/* Background overlay - removed for unified color */}
        
        {/* Contrast gradient overlay to improve text readability over media */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(196,226,220,0.42),transparent_18%),radial-gradient(circle_at_82%_30%,rgba(214,221,216,0.4),transparent_22%),linear-gradient(180deg,rgba(239,238,235,0.98)_0%,rgba(239,238,235,1)_100%)]"></div>
        
        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1480px] items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(560px,1.12fr)] lg:gap-10 lg:py-20">
          <div className="px-1 text-center text-[var(--brand-ink)] sm:px-2 lg:pr-4 lg:text-left">
            <div className="mx-auto max-w-[38rem] lg:mx-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[0.55rem] border border-[rgba(18,63,61,0.12)] bg-white/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent-strong)] shadow-[0_8px_18px_rgba(18,63,61,0.05)] backdrop-blur-sm sm:px-3.5 sm:text-[10px]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-strong)]" />
              {language === 'zh' ? '你的下一位碳足迹 AI 助手' : 'Your Next Carbon Footprint AI Agent'}
            </div>
            <h1 className="relative z-20 mb-4 font-lora text-[clamp(2rem,8vw,48px)] font-bold leading-[0.98] tracking-[-0.03em] text-[var(--brand-ink)] sm:mb-5">
              {language === 'zh' ? '审计就绪的产品碳足迹' : 'Audit-Ready Product Carbon Footprints'}
            </h1>
            <h2 className="mb-5 max-w-[32rem] whitespace-pre-line text-[14px] font-medium leading-[1.5] text-[var(--brand-ink)] sm:text-[16px] md:text-[1rem] lg:mb-8 lg:mx-0">
              {language === 'zh'
                ? '用 AI 在几天内而不是几个月内生成审计就绪的 PCF，并减少数据收集、建模、计算和审计工作。'
                : 'Generate audit-ready PCFs in days, not months, with AI that cuts data collection, modeling, calculation and audit work.'}
            </h2>
            {/* Mobile: show only short headings */}
            <div className="mb-6 space-y-1.5 text-center text-sm font-light opacity-90 sm:text-base md:hidden">
              {t.hero.description.split('\n').map((line, idx) => (
                <div key={idx} className="inline-flex items-center justify-center gap-2 w-full">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-accent-strong)]"></span>
                  <span className="block">{line.split(' - ')[0]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 whitespace-pre-line rounded-[0.7rem] bg-[var(--brand-accent-strong)] px-6 py-3 text-center text-sm font-semibold leading-none text-white shadow-[0_18px_32px_rgba(18,63,61,0.16)] transition duration-300 hover:bg-[color:rgba(18,63,61,0.88)] sm:px-8 sm:text-base"
                data-cta="hero-get-started"
                data-section="home-hero"
              >
                {t.hero.getStarted}
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-ink)] transition hover:text-[var(--brand-accent-strong)] sm:text-base"
              >
                {language === 'zh' ? '查看方案' : 'See Pricing'}
                <span aria-hidden>+</span>
              </a>
            </div>
            <div className="mt-5 max-w-[34rem] rounded-[0.7rem] border border-[rgba(18,63,61,0.1)] bg-white/70 px-4 py-3 text-left shadow-[0_8px_18px_rgba(18,63,61,0.04)] backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent-strong)]">
                {language === 'zh' ? 'Referral program' : 'Referral program'}
              </p>
              <p className="mt-1.5 text-[13px] leading-5 text-[var(--brand-muted)] sm:text-[14px]">
                {language === 'zh'
                  ? '我们会为你生成唯一的邀请码。你可以把邀请码发给专家、顾问或品牌/采购负责人，对方注册时使用你的邀请码即可进入推荐记录。'
                  : 'We generate a unique invite code for you. Send it to an expert, consultant, or brand/procurement manager, and they can register using your code so the referral is tracked to you.'}
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--brand-accent-strong)] transition hover:text-[var(--brand-ink)]"
              >
                <span>{language === 'zh' ? '生成邀请码' : 'Generate invite code'}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-6 inset-y-10 bg-[radial-gradient(circle_at_50%_35%,rgba(15,75,73,0.08),transparent_42%)]" />
            <div className="relative overflow-hidden rounded-[0.65rem] border border-[rgba(18,63,61,0.12)] bg-white shadow-[0_18px_42px_rgba(18,63,61,0.1)]">
              <div className="border-b border-[rgba(18,63,61,0.1)] bg-[#fcfbf8] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2.5 text-[12px] font-semibold text-[var(--brand-muted)]">
                  <span className="text-[var(--brand-ink)]">{language === 'zh' ? '核算任务' : 'Accounting Task'}</span>
                  <span className="rounded-[0.45rem] bg-[#0f6a63] px-2.5 py-1 text-white">{language === 'zh' ? 'Data Processing' : 'Data Processing'}</span>
                  <span>{language === 'zh' ? 'Progress 62%' : 'Progress 62%'}</span>
                  <span className="rounded-[0.45rem] border border-[rgba(18,63,61,0.12)] px-2.5 py-1 text-[var(--brand-accent-strong)]">ISO 14067 (2018)</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {heroStages.map((stage, index) => (
                    <span
                      key={stage}
                      className={`rounded-[0.45rem] border px-2.5 py-1 text-[11px] font-semibold ${
                        index === 2
                          ? 'border-[rgba(18,63,61,0.18)] bg-[var(--brand-bg-soft)] text-[var(--brand-ink)]'
                          : 'border-[rgba(18,63,61,0.08)] bg-white text-[var(--brand-muted)]'
                      }`}
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                <div className="border-b border-[rgba(18,63,61,0.1)] bg-white px-4 py-4 lg:flex lg:h-full lg:flex-col lg:border-b-0 lg:border-r">
                  <div className="mb-3 min-h-[52px] flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8e61d7]">
                        {language === 'zh' ? 'AI Copilot' : 'AI Copilot'}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                        {language === 'zh' ? 'Task queue' : 'Task queue'}
                      </p>
                    </div>
                    <div className="max-w-[52%] flex flex-wrap justify-end gap-1.5">
                      {heroAiSignals.map((signal) => (
                        <span
                          key={signal}
                          className="rounded-[0.35rem] border border-[rgba(113,74,222,0.12)] bg-[rgba(245,239,255,0.76)] px-2 py-1 text-[9px] font-semibold tracking-[0.04em] text-[#8e61d7]"
                        >
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {heroCopilotMeta.map((item) => (
                      <div key={item.label} className="rounded-[0.45rem] border border-[rgba(18,63,61,0.08)] bg-[#fbfaf7] px-2.5 py-2">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[14px] font-semibold text-[var(--brand-ink)]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2.5">
                    {heroTaskFeed.map((item, index) => (
                      <div key={item} className="rounded-[0.45rem] border border-[rgba(18,63,61,0.08)] bg-[#fcfbf8] px-3 py-2.5">
                        <div className="flex items-center justify-between gap-4 text-[11px] font-semibold text-[var(--brand-muted)]">
                          <span>{language === 'zh' ? `Task ${index + 1}` : `Task ${index + 1}`}</span>
                          <span className="text-[#0f6a63]">{language === 'zh' ? 'AI processing' : 'AI processing'}</span>
                        </div>
                        <p className="mt-2 text-[12px] font-semibold leading-5 text-[var(--brand-ink)]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[0.75rem] border border-[rgba(18,63,61,0.1)] bg-[#fbfaf7] px-3.5 py-2.5 text-[12px] text-[var(--brand-muted)] lg:mt-auto">
                    <div className="flex items-center justify-between gap-3">
                      <span>{language === 'zh' ? '仅在需要人工确认时介入。' : 'Only brings people in when confirmation is needed.'}</span>
                      <span className="rounded-[0.4rem] bg-[#0f6a63] px-2 py-1 text-[10px] font-semibold text-white">
                        {language === 'zh' ? 'AI active' : 'AI active'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f7f4ee] px-4 py-4 lg:flex lg:h-full lg:flex-col">
                  <div className="rounded-[0.65rem] border border-[rgba(18,63,61,0.12)] bg-white p-3.5 shadow-[0_10px_22px_rgba(18,63,61,0.05)] lg:flex lg:h-full lg:flex-col">
                    <div className="flex min-h-[52px] items-start justify-between gap-4">
                      <div className="pt-[2px]">
                        <h3 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-[var(--brand-ink)]">
                          {heroRightPanel.title}
                        </h3>
                      </div>
                      <button className="rounded-[0.45rem] border border-[rgba(113,74,222,0.16)] bg-[rgba(245,239,255,0.9)] px-2.5 py-1 text-[11px] font-semibold text-[#8e61d7]">
                        {language === 'zh' ? 'Auto Factor Matching' : 'Auto Factor Matching'}
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 border-b border-[rgba(18,63,61,0.08)] pb-3">
                      {heroRightPanel.tabs.map((tab, index) => (
                        <span
                          key={tab}
                          className={`rounded-[0.4rem] border px-2.5 py-1 text-[10px] font-semibold ${
                            index === 0
                              ? 'border-[rgba(18,63,61,0.14)] bg-[#f3f0e8] text-[var(--brand-ink)]'
                              : 'border-[rgba(18,63,61,0.08)] bg-white text-[var(--brand-muted)]'
                          }`}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 rounded-[0.7rem] bg-[linear-gradient(90deg,rgba(214,232,223,0.75),rgba(255,255,255,0.95))] px-3.5 py-3.5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2f8f8a]">
                        {heroRightPanel.cardTitle}
                      </p>
                      <p className="mt-2 text-[16px] font-semibold text-[var(--brand-ink)]">
                        {heroRightPanel.object}
                      </p>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-[0.6rem] border border-[rgba(18,63,61,0.08)]">
                      <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] border-b border-[rgba(18,63,61,0.08)] bg-[#fcfbf8] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                        <span>{language === 'zh' ? 'Process signal' : 'Process signal'}</span>
                        <span>{language === 'zh' ? 'Value' : 'Value'}</span>
                        <span>{language === 'zh' ? 'Status' : 'Status'}</span>
                      </div>
                      {heroWorkspaceRows.map((row) => (
                        <div
                          key={row.label}
                          className="grid grid-cols-[1.5fr_0.7fr_0.8fr] items-center border-b border-[rgba(18,63,61,0.06)] px-3 py-2 text-[11px] text-[var(--brand-ink)] last:border-b-0"
                        >
                          <span className="font-medium">{row.label}</span>
                          <span className="font-semibold">{row.value}</span>
                          <span className={`inline-flex w-fit rounded-[0.35rem] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                            row.status === 'Review'
                              ? 'bg-[rgba(255,233,190,0.8)] text-[#8b5b00]'
                              : 'bg-[rgba(214,232,223,0.8)] text-[#0f6a63]'
                          }`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {heroRightPanel.fields.map((field) => (
                        <div key={field.label} className="rounded-[0.7rem] border border-[rgba(18,63,61,0.1)] bg-[#fcfbf8] px-3 py-2.5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
                            {field.label}
                          </p>
                          <div className="mt-2.5 rounded-[0.5rem] border border-[rgba(18,63,61,0.08)] bg-white px-2.5 py-2 text-[11px] font-medium text-[var(--brand-ink)]">
                            {field.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-[0.6rem] border border-[rgba(18,63,61,0.08)] bg-[#fcfbf8] p-3 lg:mt-auto">
                      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                        <span>{language === 'zh' ? 'Process status' : 'Process status'}</span>
                        <span>{language === 'zh' ? '4/5 passed' : '4/5 passed'}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[rgba(18,63,61,0.08)]">
                        <div className="h-full w-4/5 bg-[#0f6a63]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 transform text-[var(--brand-muted)] opacity-80 sm:bottom-8">
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f5ef_0%,#f1eee6_100%)] py-12 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_20%_0%,rgba(17,92,88,0.08),transparent_48%),radial-gradient(circle_at_80%_10%,rgba(194,226,220,0.3),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:items-stretch">
            <div className="rounded-[0.7rem] bg-[#0f4b49] p-5 text-white shadow-[0_18px_40px_rgba(15,75,73,0.18)] sm:p-6 lg:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                {platformCoverage.eyebrow}
              </p>
              <h2 className="mt-4 font-lora text-[2rem] font-bold leading-tight text-white sm:text-[2.2rem]">
                {platformCoverage.title}
              </h2>
              <p className="mt-4 text-[15px] leading-6 text-white/78 sm:text-[16px]">
                {platformCoverage.description}
              </p>
              <div className="mt-6 space-y-2.5">
                {platformCoverage.cards.map((card) => (
                  <div
                    key={`${card.label}-summary`}
                    className="rounded-[0.8rem] border border-white/10 bg-white/6 px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {card.label}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-white/90">
                      {card.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {platformCoverage.cards.map((card, index) => (
                <article
                  key={card.title}
                  className="group flex h-full flex-col rounded-[0.7rem] border border-[var(--brand-border)] bg-white/88 p-5 shadow-[0_12px_26px_rgba(18,63,61,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(18,63,61,0.1)]"
                >
                  <div className={`h-1.5 w-16 rounded-full ${
                    index === 0
                      ? 'bg-[#2f8f8a]'
                      : index === 1
                        ? 'bg-[#7da78a]'
                        : 'bg-[#0f4b49]'
                  }`} />
                  <div className="mt-4 inline-flex w-fit rounded-[0.5rem] bg-[var(--brand-highlight)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-accent-strong)]">
                    {card.label}
                  </div>
                  <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight text-[var(--brand-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">
                    {card.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-[0.45rem] border border-[var(--brand-border)] bg-[var(--brand-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-accent-strong)] sm:px-3 sm:text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Value Section */}
      <section id="products" className="relative overflow-hidden bg-[var(--brand-bg-soft)] py-12 lg:py-16" data-theme="products" data-section="product-accounting-workflow" data-category="product">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_78%_10%,rgba(15,75,73,0.08),transparent_34%),radial-gradient(circle_at_12%_24%,rgba(194,226,220,0.35),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[0.75rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 shadow-[0_20px_46px_rgba(18,63,61,0.07)] sm:p-5 lg:p-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
            <div className="rounded-[0.7rem] bg-[#0f4b49] p-5 text-white shadow-[0_16px_36px_rgba(15,75,73,0.2)] sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">
                  {language === 'zh' ? 'AI-led workflow' : 'AI-led workflow'}
                </p>
                <h2 className="mt-4 max-w-xl font-lora text-[2rem] font-bold leading-[1] text-white sm:text-[2.2rem] lg:text-[2.75rem]">
                  {productSection.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-6 text-white/78 sm:text-[16px]">
                  {productSection.subtitle}
                </p>

                <div className="mt-6 rounded-[0.65rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                  <h3 className="text-[16px] font-semibold text-white sm:text-[18px]">
                    {productSection.summaryTitle}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {productSection.summaryItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-white/78 sm:text-[15px]">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#9ddad6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-[0.65rem] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f4b49] transition hover:bg-[var(--brand-bg)]"
                  >
                    {productSection.cta}
                  </a>
                  <Link
                    href="/resources"
                    className="inline-flex items-center justify-center rounded-[0.65rem] border border-white/16 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12"
                  >
                    {productSection.learnMore}
                  </Link>
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 sm:auto-rows-fr">
                {productSection.capabilities.map((item, index) => (
                  <article
                    key={item.number}
                    className="flex h-full flex-col rounded-[0.7rem] border border-[var(--brand-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,244,237,0.88))] p-4 shadow-[0_10px_22px_rgba(18,63,61,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(18,63,61,0.09)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-[0.75rem] text-[12px] font-semibold ${
                        index % 2 === 0
                          ? 'bg-[rgba(15,75,73,0.08)] text-[var(--brand-accent-strong)]'
                          : 'bg-[rgba(125,167,138,0.12)] text-[#3f6c56]'
                      }`}>
                        {item.number}
                      </div>
                      <span className="rounded-[0.45rem] bg-[var(--brand-bg)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] sm:px-2.5 sm:text-[10px]">
                        {language === 'zh' ? '核心能力' : 'Core capability'}
                      </span>
                    </div>
                    <h4 className="mt-4 text-[16px] font-semibold leading-[1.3] text-[var(--brand-ink)] sm:text-[1.05rem]">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 flex-1 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
              {language === 'zh' ? 'Why now' : 'Why now'}
            </p>
            <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
              {language === 'zh' ? '为什么产品级碳数据正在变成业务关键能力' : 'Why product carbon data is becoming business-critical'}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whyNowCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[0.7rem] border border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.8)] p-5 shadow-[0_10px_22px_rgba(18,63,61,0.05)]"
              >
                <h3 className="text-[1.1rem] font-semibold text-[var(--brand-ink)]">{card.title}</h3>
                <p className="mt-2.5 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistants Section */}
      <section id="solutions" className="relative overflow-hidden bg-[var(--brand-bg)] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
              {language === 'zh' ? '解决方案导航' : 'Solution Paths'}
            </p>
            <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem] lg:text-[2.5rem]">
              {language === 'zh' ? '按你的角色进入最相关的方案页面' : 'Go straight to the solution that fits your role'}
            </h2>
            <p className="mt-4 text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
              {language === 'zh'
                ? '如果你已经知道自己更接近品牌方、供应商，或碳专业团队，可以直接进入对应页面查看更具体的使用场景、功能重点和交付方式。'
                : 'If you already know whether you are closer to a brand team, a supplier, or a carbon expert team, jump into the page built for your workflow, priorities, and delivery needs.'}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10 lg:gap-5">
            {solutionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-[0.7rem] border border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.88)] p-5 shadow-[0_12px_26px_rgba(18,63,61,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(18,63,61,0.1)] sm:p-6"
              >
                <div className="inline-flex w-fit rounded-[0.5rem] bg-[var(--brand-highlight)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent-strong)]">
                  {card.label}
                </div>
                <h3 className="mt-4 text-[1.4rem] font-semibold leading-tight text-[var(--brand-ink)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">
                  {card.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-accent-strong)] sm:text-[15px]">
                  <span>{card.cta}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-[0.7rem] bg-[var(--brand-accent-strong)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:rgba(18,63,61,0.88)] sm:text-base"
            >
              {language === 'zh' ? '预约演示' : 'Book a demo'}
            </a>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-[0.7rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] px-7 py-3 text-sm font-semibold text-[var(--brand-ink)] transition hover:bg-[var(--brand-bg-soft)] sm:text-base"
            >
              {language === 'zh' ? '查看资源中心' : 'Visit resource center'}
            </Link>
          </div>
        </div>
      </section>
      {/* Difference Section */}
      <section className="relative overflow-hidden bg-[var(--brand-bg-soft)] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 pb-6 pt-8 text-center sm:px-6 lg:px-8">
          <h2 className="font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
            {t.sections.difference.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
            {language === 'zh'
              ? 'Climate Seal 不只是做文件整理或单点匹配。它把咨询型核算工作、审计前复核、多方法学支持、风险分析与大量计算执行自动化，让团队更快交付更可信的碳核算结果。'
              : 'Climate Seal does more than organize files or automate one step. It helps automate consultancy-style accounting work, audit-ready review work, support across regulations and methodologies, and risk analysis, so teams can deliver more credible carbon results much faster.'}
          </p>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              t.sections.difference.cards.flexible,
              t.sections.difference.cards.products,
              t.sections.difference.cards.fastValue,
            ].map((card, index) => (
              <motion.article
                key={card.title}
                className="rounded-[0.7rem] border border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.84)] p-5 shadow-[0_10px_22px_rgba(18,63,61,0.05)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="inline-flex rounded-[0.45rem] bg-[var(--brand-highlight)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent-strong)]">
                  {index === 0 ? (language === 'zh' ? 'Automated' : 'Automated') : index === 1 ? (language === 'zh' ? 'Review' : 'Review') : (language === 'zh' ? 'Delivery' : 'Delivery')}
                </div>
                <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-[var(--brand-ink)]">{card.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>



      {/* Products Section - Stacked Cards */}
      <section id="products" className="relative bg-[var(--brand-bg)] -mt-px" data-theme="products" data-section="what-we-do" data-category="product">
        {/* Scrolling Text removed here to avoid duplication; kept under pricing */}
      </section>




      {/* Impact Section */}
      <section id="value-for-user" className="bg-[var(--brand-bg-soft)] py-12 sm:py-14 lg:py-16" data-theme="value-for-user" data-section="value-overview" data-category="value">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
              {language === 'zh' ? 'Business impact' : 'Business impact'}
            </p>
            <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
              {language === 'zh' ? '团队最终得到什么' : 'What teams get with Climate Seal'}
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
              {language === 'zh'
                ? '目标不仅是更快计算，更是更快交付、更少人工负担，以及更适合跨团队与供应链使用的碳数据。'
                : 'The goal is not just faster calculation. It is faster delivery, less manual workload, and more usable carbon data across teams and suppliers.'}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {impactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[0.7rem] border border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.82)] p-5 shadow-[0_10px_22px_rgba(18,63,61,0.05)]"
              >
                <h3 className="text-[1.1rem] font-semibold text-[var(--brand-ink)]">{card.title}</h3>
                <p className="mt-2.5 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
                {language === 'zh' ? 'Resources' : 'Resources'}
              </p>
              <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
                {language === 'zh' ? '给碳核算、采购与合规团队的实用内容' : 'Resources for carbon, procurement, and compliance teams'}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
                {language === 'zh'
                  ? '把资源中心作为你的持续学习层：围绕 Product Carbon Footprint、Scope 3、边界、方法学与供应链协同获取更实用的内容。'
                  : 'Use the resource center as your ongoing learning layer for Product Carbon Footprints, Scope 3, boundaries, methodologies, and supplier collaboration.'}
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-[0.7rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-ink)] transition hover:bg-[var(--brand-bg-soft)] sm:text-[15px]"
              >
                {language === 'zh' ? '进入资源中心' : 'Visit resource center'}
              </Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[0.7rem] border border-[var(--brand-border)] bg-[color:rgba(251,248,242,0.86)] p-5 shadow-[0_12px_26px_rgba(18,63,61,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(18,63,61,0.09)] sm:p-6"
              >
                <div className="inline-flex rounded-[0.45rem] bg-[var(--brand-highlight)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent-strong)]">
                  {card.label}
                </div>
                <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-[var(--brand-ink)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px]">
                  {card.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-accent-strong)] sm:text-[15px]">
                  <span>{card.cta}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[var(--brand-bg-soft)] py-12 lg:py-16" data-theme="pricing" data-section="pricing-overview" data-category="conversion">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="mb-5 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:mb-6 sm:text-[2.2rem]">{t.sections.pricing.title}</h2>
            <p className="mx-auto max-w-3xl text-[15px] text-[var(--brand-muted)] opacity-90 sm:text-[17px]">
              {t.sections.pricing.subtitle}
            </p>
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 sm:gap-6 lg:flex-row">
            {/* Free Plan Card - Enhanced Design */}
            <div className="flex h-[200px] w-full flex-col justify-between rounded-[0.7rem] border-2 border-[#9bccce] bg-[#F4F1E9] p-3 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-[430px] sm:p-6 lg:w-1/3 lg:scale-[1.02]">
              <div>
                <div className="h-2 sm:h-8 mb-1 sm:mb-4"></div>
                <h3 className="text-base sm:text-2xl font-semibold mb-1 sm:mb-2 text-gray-800 text-center">{t.sections.pricing.plans.free.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-4">{t.sections.pricing.plans.free.description}</p>
                <div className="mb-2 sm:mb-6 text-center">
                  <span className="text-xl font-bold text-[#013432] sm:text-[2rem]">{t.sections.pricing.plans.free.price}</span>
                  <span className="text-xs text-gray-600 sm:text-sm">/month</span>
                </div>
                <div className="min-h-[35px] sm:min-h-[108px]">
                  <ul className="space-y-0.5 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
                    {t.sections.pricing.plans.free.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#9bccce] mr-2 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href="#contact"
                className="block w-full rounded-[0.65rem] bg-[#9bccce] py-1 text-center text-xs font-semibold text-[#013432] transition-all duration-300 hover:bg-[#7ed080] hover:text-white sm:py-2.5 sm:text-sm"
              >
                {t.sections.pricing.plans.free.button}
              </a>
            </div>

            {/* Standard Plan Card - Enhanced Design */}
            <div className="flex h-[200px] w-full flex-col justify-between rounded-[0.7rem] border-2 border-[#7ed080] bg-[#F4F1E9] p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-[430px] sm:p-7 lg:w-1/3 lg:scale-[1.02]">
              <div>
                <div className="h-2 sm:h-8 mb-1 sm:mb-4"></div>
                <h3 className="text-base sm:text-2xl font-semibold mb-1 sm:mb-2 text-gray-800 text-center">{t.sections.pricing.plans.standard.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-4">{t.sections.pricing.plans.standard.description}</p>
                <div className="mb-2 sm:mb-6 text-center">
                  <span className="text-xl font-bold text-[#013432] sm:text-[2rem]">{t.sections.pricing.plans.standard.price}</span>
                  <span className="text-xs text-gray-600 sm:text-sm">/report</span>
                </div>
                <div className="min-h-[35px] sm:min-h-[108px]">
                  <ul className="space-y-0.5 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
                    {t.sections.pricing.plans.standard.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#7ed080] mr-2 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href="#contact"
                className="block w-full rounded-[0.65rem] bg-[#7ed080] py-1 text-center text-xs font-semibold text-[#013432] transition-all duration-300 hover:bg-[#013432] hover:text-white sm:py-2.5 sm:text-sm"
              >
                {t.sections.pricing.plans.standard.button}
              </a>
            </div>

            {/* Enterprise Plan Card - Enhanced Design */}
            <div className="flex h-[200px] w-full flex-col justify-between rounded-[0.7rem] border-2 border-[#013432] bg-[#F4F1E9] p-3 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-[430px] sm:p-6 lg:w-1/3 lg:scale-[1.02]">
              <div>
                <div className="h-2 sm:h-8 mb-1 sm:mb-4"></div>
                <h3 className="text-base sm:text-2xl font-semibold mb-1 sm:mb-2 text-gray-800 text-center">{t.sections.pricing.plans.enterprise.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-4">{t.sections.pricing.plans.enterprise.description}</p>
                <div className="mb-2 sm:mb-6 text-center">
                  <span className="text-xl font-bold text-[#013432] sm:text-[2rem]">{t.sections.pricing.plans.enterprise.price}</span>
                </div>
                <div className="min-h-[35px] sm:min-h-[108px]">
                  <ul className="space-y-0.5 sm:space-y-3 text-gray-700 text-xs sm:text-sm">
                    {t.sections.pricing.plans.enterprise.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#013432] mr-2 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href="#contact"
                className="block w-full rounded-[0.65rem] bg-[#013432] py-1 text-center text-xs font-semibold text-white transition-all duration-300 hover:bg-[#7ed080] hover:text-[#013432] sm:py-2.5 sm:text-sm"
              >
                {t.sections.pricing.plans.enterprise.button}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[var(--brand-bg)] py-6 lg:py-10" data-theme="about" data-section="about-main" data-category="info">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2">
            {/* Left side - Polar Bear Image */}
            <div className="relative order-2 h-[220px] overflow-hidden rounded-[0.7rem] sm:h-[280px] md:h-[330px] lg:order-1 lg:h-[380px] xl:h-[420px]" style={{transform: 'translateY(0cm)'}}>
              <Image
                src="/polar-bears.png"
                alt="Polar bears on ice - Climate Seal carbon accounting platform visual"
                fill
                className="object-cover object-center"
                quality={100}
                unoptimized={true}
              />
            </div>
            
            {/* Right side - Content */}
            <div className="order-1 flex h-full flex-col justify-center text-[var(--brand-ink)] lg:order-2" style={{transform: 'translateY(0cm)'}}>
              {/* Centered content */}
              <div className="text-center space-y-5 sm:space-y-6 md:space-y-6">
                {/* About Us title - centered */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <h2 className="font-lora text-[1.9rem] font-bold sm:text-[2.1rem] md:text-[2.2rem]">{t.sections.aboutUs.title}</h2>
                </div>
                
                {/* First section - centered */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-[1.15rem] font-bold leading-tight sm:text-[1.45rem] md:text-[1.7rem]">
                    {t.sections.aboutUs.subtitle1}
                  </h3>
                  <h3 className="text-[1.15rem] font-bold leading-tight sm:text-[1.45rem] md:text-[1.7rem]">
                    {t.sections.aboutUs.subtitle2}
                  </h3>
                </div>
                
                {/* White Divider Line */}
                <div className="flex justify-center py-2 sm:py-3">
                  <svg width="220" height="10" viewBox="0 0 300 12" className="text-[var(--brand-accent-strong)] sm:w-[250px] md:w-[280px]">
                    <path 
                      d="M3 8 Q75 2 150 6 Q225 10 297 4" 
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M8 10 Q82 4 157 8 Q232 12 292 6" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                
                {/* Second section - centered with green highlight */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-[1.4rem] font-bold leading-tight sm:text-[1.7rem] md:text-[2rem]">
                    {t.sections.aboutUs.subtitle3}
                  </h3>
                  <div className="relative inline-block">
                    <h3 className="text-[1.4rem] font-bold leading-tight text-[var(--brand-accent-strong)] sm:text-[1.7rem] md:text-[2rem]">
                      {t.sections.aboutUs.highlightText}
                    </h3>
                    {/* Hand-drawn style underline */}
                    <div className="absolute -bottom-2 left-0 right-0 flex justify-center sm:-bottom-2.5 md:-bottom-3">
                      <svg width="150" height="8" viewBox="0 0 200 12" className="text-[var(--brand-accent-strong)] sm:w-[180px] sm:h-[10px] md:w-[250px] md:h-[10px]">
                        <path 
                          d="M2 8 Q50 2 100 6 Q150 10 198 4" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path 
                          d="M5 10 Q55 4 105 8 Q155 12 195 6" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="mx-auto max-w-2xl text-[14px] leading-6 text-[var(--brand-muted)] sm:text-[15px] sm:leading-6">
                  {language === 'zh'
                    ? 'Climate Seal 让团队在上传现有文件后，把更多碳核算重活交给 AI 完成，包括数据整理、LCA 建模支持、因子匹配与缺口识别，从而把时间留给更高价值的复核与减排行动。'
                    : 'Climate Seal helps teams hand off more of the carbon accounting heavy lifting to AI after uploading the files they already have, from data organization and LCA modeling support to factor matching and gap detection.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (compact) */}
      <section id="faq" className="bg-[var(--brand-bg-soft)] py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="mb-5 text-center font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:mb-6 sm:text-[2.2rem]">{t.faq?.title || (language === 'zh' ? '常见问题' : 'FAQ')}</h2>
          <div className="space-y-3">
            {t.faq?.groups
              ?.flatMap((g) => g.items)
              .slice(7, 10)
              .map((item, idx) => (
                <details key={idx} className="group rounded-[0.65rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 shadow-[0_8px_18px_rgba(18,63,61,0.05)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[var(--brand-ink)]">
                    {item.q}
                    <span className="transition-transform group-open:rotate-180 text-[var(--brand-muted)]">⌄</span>
                  </summary>
                  <div className="mt-2 text-[var(--brand-muted)] text-sm whitespace-pre-line">
                    {Array.isArray(item.a) ? item.a[0] : item.a}
                  </div>
                </details>
              ))}
          </div>
          <div className="text-center mt-6">
            <a href="/faq" className="inline-block rounded-[0.7rem] bg-[var(--brand-accent-strong)] px-5 py-2.5 font-medium text-white">{language === 'zh' ? '查看更多问题' : 'View all FAQs'}</a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[0.7rem] border border-[var(--brand-border)] bg-[linear-gradient(135deg,rgba(251,248,242,0.92),rgba(244,241,233,0.82))] p-6 text-center shadow-[0_14px_30px_rgba(18,63,61,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
              {language === 'zh' ? 'Next step' : 'Next step'}
            </p>
            <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
              {finalCta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-[0.6rem] bg-[var(--brand-accent-strong)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:rgba(18,63,61,0.88)] sm:text-[15px]"
              >
                {finalCta.primary}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-[0.6rem] border border-[var(--brand-border)] bg-white/70 px-6 py-2.5 text-sm font-semibold text-[var(--brand-ink)] transition hover:bg-white sm:text-[15px]"
              >
                {finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[0.7rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 text-center shadow-[0_14px_30px_rgba(18,63,61,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-strong)]">
              {language === 'zh' ? 'Referral program' : 'Referral program'}
            </p>
            <h2 className="mt-3 font-lora text-[2rem] font-bold text-[var(--brand-ink)] sm:text-[2.2rem]">
              {referralProgram.title}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-6 text-[var(--brand-muted)] sm:text-[16px]">
              {referralProgram.description}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center rounded-[0.6rem] bg-[var(--brand-accent-strong)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:rgba(18,63,61,0.88)] sm:text-[15px]"
            >
              {referralProgram.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[var(--brand-surface)] py-6 text-[var(--brand-ink)] sm:py-8" data-theme="contact" data-section="contact-form" data-category="conversion">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-10">
            <h2 className="mb-5 font-lora text-[2rem] font-bold sm:mb-6 sm:text-[2.2rem]">{t.contact.title}</h2>
            <p className="mx-auto max-w-3xl text-[15px] opacity-90 sm:text-[17px]">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-3">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-3 sm:mr-4">📧</span>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Email</h4>
                    <p className="opacity-80 text-sm sm:text-base">xuguang.ma@climateseal.net</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-3 sm:mr-4">📞</span>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Phone</h4>
                    <p className="opacity-80 text-sm sm:text-base">+86 15652618365</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-3 sm:mr-4">🏢</span>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Location</h4>
                    <p className="opacity-80 text-sm sm:text-base">Beijing, Germany, Dubai, Singapore</p>
                  </div>
                </div>
                
                {/* New Contact Logo */}
<div className="mt-6 sm:mt-4 pt-4 sm:pt-3">
  <div className="flex justify-start">
    <Image
      src="/new-contact-logo.png"
      alt="Climate Seal Contact Logo"
      width={280}
      height={84}
      className="object-contain w-full max-w-[210px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]"
      unoptimized={true}
      style={{
        clipPath: 'inset(0 0.5% 2% 0)'
      }}
    />
  </div>
</div>
              </div>
            </div>

            <div className="order-1 self-start rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-strong)] p-4 shadow-[0_18px_40px_rgba(18,63,61,0.08)] backdrop-blur-sm sm:p-6 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-1.5" data-form="contact-form" data-section="contact-form">
                {/* 姓名和邮箱 - 两栏布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.name}*</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] text-sm"
                      placeholder={t.contact.form.placeholder.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.email}*</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] text-sm"
                      placeholder={t.contact.form.placeholder.email}
                      required
                    />
                  </div>
                </div>
                {/* 电话和公司 - 两栏布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.phone}*</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] text-sm"
                      placeholder={t.contact.form.placeholder.phone}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.company}*</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] text-sm"
                      placeholder={t.contact.form.placeholder.company}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.industry || '行业'}*</label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] text-sm max-h-32 overflow-y-auto"
                    required
                  >
                    <option value="">{t.contact.form.placeholder?.industry || '请选择您的行业'}</option>
                    <option value="automotive">{t.contact.form.industries?.automotive || '汽车制造业'}</option>
                    <option value="electronics">{t.contact.form.industries?.electronics || '电子电器'}</option>
                    <option value="textiles">{t.contact.form.industries?.textiles || '纺织服装'}</option>
                    <option value="chemicals">{t.contact.form.industries?.chemicals || '化工化学'}</option>
                    <option value="food-beverage">{t.contact.form.industries?.foodBeverage || '食品饮料'}</option>
                    <option value="construction">{t.contact.form.industries?.construction || '建筑建材'}</option>
                    <option value="metals">{t.contact.form.industries?.metals || '钢铁金属'}</option>
                    <option value="plastics">{t.contact.form.industries?.plastics || '塑料橡胶'}</option>
                    <option value="packaging">{t.contact.form.industries?.packaging || '包装印刷'}</option>
                    <option value="pharmaceuticals">{t.contact.form.industries?.pharmaceuticals || '医药医疗'}</option>
                    <option value="energy">{t.contact.form.industries?.energy || '能源电力'}</option>
                    <option value="manufacturing">{t.contact.form.industries?.manufacturing || '机械制造'}</option>
                    <option value="furniture">{t.contact.form.industries?.furniture || '家具家居'}</option>
                    <option value="cosmetics">{t.contact.form.industries?.cosmetics || '美妆个护'}</option>
                    <option value="toys">{t.contact.form.industries?.toys || '玩具用品'}</option>
                    <option value="agriculture">{t.contact.form.industries?.agriculture || '农业食品'}</option>
                    <option value="transportation">{t.contact.form.industries?.transportation || '交通运输'}</option>
                    <option value="retail">{t.contact.form.industries?.retail || '零售贸易'}</option>
                    <option value="other">{t.contact.form.industries?.other || '其他'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 text-black">{t.contact.form.message}*</label>
                  <textarea 
                    rows={1}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-1.5 sm:p-2 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-50 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] resize-none text-sm"
                    placeholder={t.contact.form.placeholder.message}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black sm:text-sm">
                    {language === 'zh' ? '推荐码（可选）' : 'Referral code (optional)'}
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white border-opacity-50 bg-white bg-opacity-90 p-1.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-strong)] sm:p-2"
                    placeholder={language === 'zh' ? '如果有人推荐你，请输入推荐码' : 'Enter a referral code if someone invited you'}
                  />
                </div>
                
                {submitMessage && (
                  <div className={`text-sm p-2 rounded-lg ${
                    submitMessage.includes('成功') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-1.5 sm:py-2 rounded-lg font-semibold transition duration-300 text-center text-sm ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                      : 'bg-[var(--brand-accent-strong)] hover:bg-[color:rgba(18,63,61,0.88)] text-white'
                  }`}
                >
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </button>
                
                {/* Privacy Disclaimer */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t.contact.form.privacyDisclaimer}{' '}
                    <Link 
                      href="/privacy" 
                      className="text-[rgb(0,52,50)] underline hover:text-[rgb(0,42,40)] transition-colors"
                    >
                      {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Page-level footer removed: using global Footer component instead */}
    </div>
    </>
  );
}
