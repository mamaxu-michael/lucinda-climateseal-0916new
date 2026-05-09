import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from '@/lib/language';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';

const content = {
  en: {
    title: 'Products and Solutions',
    description:
      'Explore the Climate Seal platform for Product Carbon Footprint, Scope 3, project carbon, and LCA workflows with AI-assisted accounting, review, and delivery.',
    eyebrow: 'Platform Overview',
    heroTitle: 'One AI platform for Product Carbon Footprint, Scope 3, project carbon, and LCA delivery.',
    heroBody:
      'Climate Seal is built for teams that need more than a calculator. It supports accounting setup, document parsing, methodology-aligned modeling, risk review, and verification-ready delivery in one workflow.',
    heroHighlights: [
      'AI-assisted carbon accounting across multiple workflow types',
      'Support for ISO 14067, GHG Protocol, and evolving methodology coverage',
      'Traceable outputs ready for customer review or third-party verification',
    ],
    modulesEyebrow: 'Core capabilities',
    modulesTitle: 'What the platform is designed to automate',
    modules: [
      {
        title: 'Accounting setup and methodology support',
        description:
          'Start from product, corporate, or project carbon goals and let AI assist with scope definition, standards selection, and modeling structure.',
      },
      {
        title: 'Document parsing and data organization',
        description:
          'Upload BOMs, reports, and other source files so the platform can organize accounting inputs into a more usable workflow.',
      },
      {
        title: 'Factor matching and LCA modeling',
        description:
          'Reduce repetitive lookup and setup work with AI-assisted matching, modeling, and calculation support across multiple scenarios.',
      },
      {
        title: 'Risk review and verification handoff',
        description:
          'Keep data-point traceability, risk signals, and delivery packaging in one system so outputs are easier to review and verify.',
      },
    ],
    coverageTitle: 'Coverage that goes beyond one carbon workflow',
    coverageItems: [
      'Product Carbon Footprint, Scope 3 corporate carbon, project carbon, and LCA use cases',
      'Cradle-to-grave and cradle-to-cradle boundary settings',
      'Customer delivery, supplier collaboration, export compliance, and internal decarbonization programs',
      'Outputs designed for review, client handoff, and third-party verification workflows',
    ],
    useCasesEyebrow: 'Solution paths',
    useCasesTitle: 'Choose the path that matches how your team works',
    useCasesBody:
      'If you already know your priority is product delivery, supplier collaboration, or expert accounting execution, go directly to the solution page that fits.',
    useCases: [
      {
        title: 'For Carbon & ESG teams',
        summary: 'Move faster on PCF, LCA, and accounting delivery with less manual setup and more structured review.',
        href: '/solutions/carbon-expert',
        cta: 'See expert workflow',
      },
      {
        title: 'For Brands & Procurement',
        summary: 'Improve supplier data quality, buyer response readiness, and planning visibility across Scope 3 and product programs.',
        href: '/solutions/brand-owner',
        cta: 'See brand workflow',
      },
      {
        title: 'For Suppliers & Exporters',
        summary: 'Prepare traceable outputs, manage compliance requests, and respond faster to downstream carbon data demands.',
        href: '/solutions/supply-chain',
        cta: 'See supplier workflow',
      },
    ],
    ctaTitle: 'Want help choosing the right starting point?',
    ctaBody:
      'Tell us what kind of carbon accounting you need to deliver, how ready your data is, and what your timeline looks like. We can help you choose the lightest path in.',
    ctaPrimary: 'See pricing',
    ctaSecondary: 'Contact the team',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Products and Solutions',
    softwareDescription:
      'AI platform for Product Carbon Footprint, Scope 3, project carbon, LCA, factor matching, risk analysis, and verification-ready carbon delivery.',
  },
  zh: {
    title: '产品与解决方案',
    description:
      '查看 Climate Seal 如何用一套 AI 平台覆盖产品碳足迹、Scope 3、项目碳核算与 LCA 流程，完成更快的核算、复核与交付。',
    eyebrow: 'Platform Overview',
    heroTitle: '一套 AI 平台，覆盖产品碳足迹、Scope 3、项目碳核算与 LCA 交付。',
    heroBody:
      'Climate Seal 不是单点计算器，而是一套把核算设定、文件解析、方法学对齐建模、风险复核与审计交付连接起来的工作平台。',
    heroHighlights: [
      '覆盖多类碳核算场景的 AI 工作流',
      '支持 ISO 14067、GHG Protocol 及持续扩展的方法学覆盖',
      '输出可追溯、可审阅、可直接进入第三方验证',
    ],
    modulesEyebrow: 'Core capabilities',
    modulesTitle: '平台重点自动化的，不只是计算这一步',
    modules: [
      {
        title: '核算设定与方法学支持',
        description:
          '从产品碳、企业碳或项目碳目标出发，由 AI 协助范围设定、标准选择与建模结构搭建。',
      },
      {
        title: '文件解析与数据整理',
        description:
          '上传 BOM、报告和其他来源文件后，平台自动把输入整理成更适合核算的结构。',
      },
      {
        title: '因子匹配与 LCA 建模',
        description:
          '通过 AI 辅助因子匹配、建模与计算，减少重复查找和手工搭建工作。',
      },
      {
        title: '风险复核与验证交付',
        description:
          '把数据点追溯、风险信号和交付打包放在同一系统里，让审阅和第三方验证更容易推进。',
      },
    ],
    coverageTitle: '不只覆盖一种碳核算工作流',
    coverageItems: [
      '覆盖产品碳足迹、Scope 3 企业碳、项目碳核算与 LCA 场景',
      '支持 cradle-to-grave 与 cradle-to-cradle 边界设置',
      '适合客户交付、供应商协同、出口合规与内部减排项目',
      '输出面向客户审阅、项目交付与第三方验证工作流',
    ],
    useCasesEyebrow: 'Solution paths',
    useCasesTitle: '按团队工作方式选择更合适的切入点',
    useCasesBody:
      '如果你已经明确重点在产品交付、供应商协同或专业核算执行，可以直接进入对应解决方案页面。',
    useCases: [
      {
        title: '面向 Carbon / ESG 团队',
        summary: '用更少人工设定和更强复核能力推进 PCF、LCA 和专业核算交付。',
        href: '/solutions/carbon-expert',
        cta: '查看专业团队场景',
      },
      {
        title: '面向品牌方与采购团队',
        summary: '提升供应商数据质量、客户响应准备度，以及 Scope 3 与产品项目的推进效率。',
        href: '/solutions/brand-owner',
        cta: '查看品牌方场景',
      },
      {
        title: '面向供应商与出口团队',
        summary: '更快准备可追溯输出，处理合规要求，并应对下游客户的碳数据请求。',
        href: '/solutions/supply-chain',
        cta: '查看供应商场景',
      },
    ],
    ctaTitle: '想一起判断最合适的起点？',
    ctaBody:
      '告诉我们你要交付哪类碳核算、数据准备到什么程度、希望多快启动，我们可以帮你选择最轻的切入路径。',
    ctaPrimary: '查看价格',
    ctaSecondary: '联系团队',
    breadcrumbHome: '首页',
    breadcrumbCurrent: '产品与解决方案',
    softwareDescription:
      '用于产品碳足迹、Scope 3、项目碳核算、LCA、因子匹配、风险分析与审计交付的 AI 平台。',
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const locale = isChineseLanguage(resolveLanguage(headerList.get('x-language'))) ? 'zh' : 'en';
  const copy = content[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: '/products',
      languages: buildLanguageAlternates('/products'),
    },
    openGraph: {
      title: `${copy.title} | Climate Seal`,
      description: copy.description,
      images: [{ url: '/pcf-modeler.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${copy.title} | Climate Seal`,
      description: copy.description,
      images: ['/pcf-modeler.png'],
    },
  };
}

export default async function ProductsPage() {
  const headerList = await headers();
  const locale = isChineseLanguage(resolveLanguage(headerList.get('x-language'))) ? 'zh' : 'en';
  const copy = content[locale];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.breadcrumbHome, item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: copy.breadcrumbCurrent, item: `${siteUrl}/products` },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Climate Seal Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/products`,
    description: copy.softwareDescription,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/pricing`,
      price: '120',
      priceCurrency: 'USD',
    },
  };

  return (
    <main className="bg-[#F7F3EA] text-[#123F3D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-20">
          <div className="space-y-7">
            <div className="inline-flex border border-[#d1d8d2] bg-[#F8F6F1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">
              {copy.eyebrow}
            </div>
            <div className="space-y-5">
              <h1 className="font-lora text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
                {copy.heroTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5f7672]">{copy.heroBody}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.heroHighlights.map((item) => (
                <div key={item} className="border border-[#d7ddd6] bg-[#FBF9F4] px-5 py-4 text-sm leading-6 text-[#486662]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#d7ddd6] bg-[#0f4746] p-6 text-white">
            <div className="grid gap-4 border-b border-white/10 pb-5 sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Coverage</p>
                <p className="mt-2 text-sm font-semibold">PCF · Scope 3 · Project Carbon · LCA</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Methodology</p>
                <p className="mt-2 text-sm font-semibold">ISO 14067 · GHG Protocol</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Delivery</p>
                <p className="mt-2 text-sm font-semibold">Traceable outputs · Verification-ready</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {copy.coverageItems.map((item, index) => (
                <div key={item} className="border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#BEE5DB]">0{index + 1}</div>
                  <p className="mt-3 text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.modulesEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.modulesTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {copy.modules.map((module) => (
              <article key={module.title} className="border border-[#d7ddd6] bg-white p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#123F3D]">{module.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5f7672]">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.useCasesEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.useCasesTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#5f7672]">{copy.useCasesBody}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.useCases.map((item) => (
              <article key={item.title} className="border border-[#d7ddd6] bg-[#FBF9F4] p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#123F3D]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5f7672]">{item.summary}</p>
                <Link href={item.href} className="mt-6 inline-flex border border-[#123F3D] px-5 py-3 font-semibold text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white">
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="border border-[#d7ddd6] bg-white p-8 sm:p-10">
            <h2 className="font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#5f7672]">{copy.ctaBody}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/pricing" className="border border-[#123F3D] bg-[#123F3D] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#0f4a47]">
                {copy.ctaPrimary}
              </Link>
              <Link href="/contact" className="border border-[#123F3D] px-6 py-3 text-center font-semibold text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white">
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
