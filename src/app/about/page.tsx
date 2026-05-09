import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from '@/lib/language';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';

const content = {
  en: {
    title: 'About Climate Seal',
    description:
      'Learn how Climate Seal uses AI to automate Product Carbon Footprint, Scope 3, project carbon, and LCA workflows for faster compliance and verification-ready delivery.',
    eyebrow: 'About Climate Seal',
    heroTitle: 'We are building carbon accounting infrastructure that works like software, not consulting overhead.',
    heroBody:
      'Climate Seal helps teams move from files and fragmented requests to verification-ready carbon outputs with AI that handles more of the accounting, review, and delivery workload.',
    stats: [
      { value: 'PCF', label: 'Product Carbon Footprint workflows' },
      { value: 'Scope 3', label: 'Corporate carbon and supplier workflows' },
      { value: 'ISO 14067', label: 'Supported regulation and methodology coverage' },
    ],
    missionTitle: 'What we believe',
    missionBody:
      'Most carbon projects do not fail because teams do not care. They stall because methodology, boundary setting, file preparation, factor matching, review, and delivery are still too manual.',
    principlesEyebrow: 'How we think',
    principlesTitle: 'Built to reduce manual carbon work without reducing credibility',
    principles: [
      {
        title: 'Automate the heavy work',
        description:
          'Climate Seal is designed so teams can upload files, review AI guidance, and confirm only when needed instead of rebuilding methodology and calculations from scratch.',
      },
      {
        title: 'Keep every data point traceable',
        description:
          'Outputs are not only final numbers. They include the supporting logic, data trail, and review signals that make third-party verification easier to manage.',
      },
      {
        title: 'Leave more room for decarbonization',
        description:
          'When accounting and audit-style review become lighter, teams can spend more time on supplier action, operational change, and business follow-through.',
      },
    ],
    footprintEyebrow: 'Where we fit',
    footprintTitle: 'Climate Seal is built for teams that need carbon work to move faster and land more credibly.',
    footprintItems: [
      'Product Carbon Footprint, Scope 3 corporate carbon, project carbon, and LCA workflows',
      'Brand teams, manufacturers, consultants, suppliers, and export compliance teams',
      'Cradle-to-grave and cradle-to-cradle assessments with verification-ready delivery needs',
    ],
    ctaTitle: 'Want to see how that looks in practice?',
    ctaBody:
      'Explore the platform view, solution pages, or talk with the team about your accounting scope, data readiness, and delivery timeline.',
    ctaPrimary: 'Explore products',
    ctaSecondary: 'Contact the team',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About Climate Seal',
    orgDescription:
      'Climate Seal is an AI platform for Product Carbon Footprint, Scope 3, project carbon, LCA, and supply chain carbon workflows, helping teams deliver compliance and verification-ready carbon outputs faster.',
    missionLabel: 'Mission',
  },
  zh: {
    title: '关于 Climate Seal',
    description:
      '了解 Climate Seal 如何用 AI 自动化产品碳足迹、Scope 3、项目碳核算与 LCA 流程，帮助团队更快完成合规与审计交付。',
    eyebrow: 'About Climate Seal',
    heroTitle: '我们在做的，是一套更像软件基础设施、而不是传统顾问项目负担的碳核算系统。',
    heroBody:
      'Climate Seal 帮助团队从零散文件、重复问答和手工整理，转向由 AI 承担更多核算、复核与交付工作的流程，让结果更快进入可验证状态。',
    stats: [
      { value: 'PCF', label: '产品碳足迹工作流' },
      { value: 'Scope 3', label: '企业碳与供应链协同场景' },
      { value: 'ISO 14067', label: '已支持的法规与方法学覆盖' },
    ],
    missionTitle: '我们相信什么',
    missionBody:
      '很多碳项目推进缓慢，并不是因为团队不重视，而是因为方法学选择、边界设定、文件整理、因子匹配、复核与交付仍然太依赖人工。',
    principlesEyebrow: 'How we think',
    principlesTitle: '把人工负担降下来，同时把可信度留住',
    principles: [
      {
        title: '让 AI 承担重的部分',
        description:
          'Climate Seal 的设计目标，是让团队上传文件、查看 AI 引导、只在需要时确认，而不是每次都从零搭方法和算式。',
      },
      {
        title: '让每个数据点都可追溯',
        description:
          '输出不只是最后一个结果数字，还包括支撑逻辑、数据轨迹和复核信号，方便直接进入第三方验证或客户审阅。',
      },
      {
        title: '把时间和预算留给真正的减排',
        description:
          '当核算和审计式复核工作变轻，团队才能把更多资源放在供应商推进、运营改善和减排行动本身。',
      },
    ],
    footprintEyebrow: 'Where we fit',
    footprintTitle: 'Climate Seal 服务的是那些既想做快、也想做对的碳工作团队。',
    footprintItems: [
      '覆盖产品碳足迹、Scope 3 企业碳、项目碳核算与 LCA 工作流',
      '适合品牌方、制造企业、顾问团队、供应商与出口合规团队',
      '支持 cradle-to-grave、cradle-to-cradle 及审计交付要求更高的场景',
    ],
    ctaTitle: '想看看这些能力怎样落到实际项目里？',
    ctaBody:
      '你可以继续看产品页和解决方案页，也可以直接联系我们，根据你的核算范围、数据准备度和交付时间来判断起点。',
    ctaPrimary: '查看产品页',
    ctaSecondary: '联系团队',
    breadcrumbHome: '首页',
    breadcrumbCurrent: '关于 Climate Seal',
    orgDescription:
      'Climate Seal 是面向产品碳足迹、Scope 3、项目碳核算、LCA 与供应链碳管理的 AI 平台，帮助团队更快完成合规与审计就绪交付。',
    missionLabel: 'Mission',
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
      canonical: '/about',
      languages: buildLanguageAlternates('/about'),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      images: [{ url: '/about-logo.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: ['/about-logo.png'],
    },
  };
}

export default async function AboutPage() {
  const headerList = await headers();
  const locale = isChineseLanguage(resolveLanguage(headerList.get('x-language'))) ? 'zh' : 'en';
  const copy = content[locale];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.breadcrumbHome, item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: copy.breadcrumbCurrent, item: `${siteUrl}/about` },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Climate Seal',
    url: siteUrl,
    logo: `${siteUrl}/new-contact-logo.png`,
    description: copy.orgDescription,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'xuguang.ma@climateseal.net',
        telephone: '+86 15652618365',
      },
    ],
  };

  return (
    <main className="bg-[#F7F3EA] text-[#123F3D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="border-b border-[#d7ddd6] bg-[#F7F3EA]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="space-y-8">
            <div className="inline-flex border border-[#cfd7cf] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#496966]">
              {copy.eyebrow}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-lora text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
                {copy.heroTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#57716d]">{copy.heroBody}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.stats.map((item) => (
                <div key={item.label} className="border border-[#d6ddd6] bg-white p-5">
                  <div className="text-2xl font-semibold tracking-[-0.02em] text-[#123F3D]">{item.value}</div>
                  <p className="mt-2 text-sm leading-6 text-[#5f7672]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 self-start">
            <div className="relative min-h-[420px] overflow-hidden border border-[#d6ddd6] bg-[#0f4746]">
              <Image
                src="/polar-bears.png"
                alt="Climate Seal mission visual with polar bears"
                fill
                className="object-cover object-center"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f4746] via-[#0f4746]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0f4746]/92 p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BEE5DB]">{copy.missionLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{copy.missionTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/78">{copy.missionBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5d7b76]">{copy.principlesEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.principlesTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.principles.map((item, index) => (
              <article key={item.title} className="border border-[#d7ddd6] bg-[#FBF9F4] p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">0{index + 1}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#123F3D]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5f7672]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-[#F4EFE4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.footprintEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.footprintTitle}</h2>
          </div>
          <div className="grid gap-4">
            {copy.footprintItems.map((item) => (
              <div key={item} className="border border-[#d7ddd6] bg-white px-5 py-4 text-base leading-7 text-[#486662]">
                {item}
              </div>
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
              <Link href="/products" className="border border-[#123F3D] bg-[#123F3D] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#0f4a47]">
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
