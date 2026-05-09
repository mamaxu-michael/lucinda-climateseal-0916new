import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from '@/lib/language';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';

const content = {
  en: {
    title: 'Contact Climate Seal',
    description:
      'Talk with Climate Seal about Product Carbon Footprint, Scope 3, LCA, supplier data, project carbon accounting, and verification-ready delivery.',
    eyebrow: 'Contact',
    heroTitle: 'Send us the project context. We will help you find the lightest path to start.',
    heroBody:
      'If you are preparing Product Carbon Footprint delivery, Scope 3 collaboration, supplier data collection, export compliance, or a carbon pilot, we can help you assess scope, data readiness, and the right working model.',
    contactWays: [
      { label: 'Email', value: 'xuguang.ma@climateseal.net' },
      { label: 'Phone', value: '+86 15652618365' },
      { label: 'Locations', value: 'Beijing · Germany · Dubai · Singapore' },
    ],
    prepEyebrow: 'Best first message',
    prepTitle: 'What helps us give you a useful answer faster',
    prepItems: [
      'What kind of accounting you need: Product Carbon Footprint, Scope 3, project carbon, or LCA',
      'What the request is for: customer delivery, procurement, export compliance, supplier collaboration, or internal planning',
      'What data you already have: BOM, energy, logistics, supplier files, reports, or existing models',
      'Any deadline, market, regulation, or verification requirement you already know about',
    ],
    fastLabel: 'Fastest path',
    fastBody:
      'Email xuguang.ma@climateseal.net with your product type, target market, and current data readiness. That usually gives us enough to guide the next step quickly.',
    processEyebrow: 'How it works',
    processTitle: 'From first contact to project start, the path is usually simple',
    process: [
      {
        title: '1. Clarify the delivery goal',
        description: 'We start by understanding whether the need is customer response, compliance, supplier coordination, or an internal carbon program.',
      },
      {
        title: '2. Check data readiness',
        description: 'We align on what files and inputs already exist, what is still missing, and where AI can take more of the workload immediately.',
      },
      {
        title: '3. Choose the right start',
        description: 'Then we recommend the lightest starting point: self-service, done-for-you delivery, or a broader enterprise workflow.',
      },
    ],
    linksTitle: 'Not ready to contact us directly yet?',
    linksBody:
      'You can explore the product page, pricing, or resources first, then come back once your internal picture is clearer.',
    links: [
      { label: 'Explore products and solutions', href: '/products' },
      { label: 'See pricing options', href: '/pricing' },
      { label: 'Browse resources and whitepapers', href: '/resources' },
    ],
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Contact Climate Seal',
    contactDescription:
      'Contact Climate Seal about Product Carbon Footprint, LCA, Scope 3, supply chain carbon programs, and pilot or compliance delivery.',
  },
  zh: {
    title: '联系 Climate Seal',
    description:
      '联系 Climate Seal 团队，沟通产品碳足迹、Scope 3、LCA、供应链碳数据、项目碳核算与审计交付。',
    eyebrow: 'Contact',
    heroTitle: '把你的项目背景发给我们，我们一起判断最轻的启动路径。',
    heroBody:
      '如果你正在准备产品碳足迹交付、Scope 3 协同、供应商数据采集、出口合规或碳核算试点，我们可以先帮助你判断范围、数据准备度和更合适的合作方式。',
    contactWays: [
      { label: 'Email', value: 'xuguang.ma@climateseal.net' },
      { label: 'Phone', value: '+86 15652618365' },
      { label: 'Locations', value: 'Beijing · Germany · Dubai · Singapore' },
    ],
    prepEyebrow: 'Best first message',
    prepTitle: '第一次沟通时，哪些信息最能帮我们更快给出有效建议',
    prepItems: [
      '你要处理哪类核算：产品碳足迹、Scope 3、项目碳核算还是 LCA',
      '这个需求是为了客户交付、采购协同、出口合规、供应商协作还是内部减排规划',
      '你已经有哪些数据：BOM、能耗、物流、供应商文件、报告或已有模型',
      '你是否已经知道截止时间、目标市场、法规要求或第三方验证要求',
    ],
    fastLabel: 'Fastest path',
    fastBody:
      '直接发邮件到 xuguang.ma@climateseal.net，并附上产品类型、目标市场和当前数据准备情况，通常就足够我们快速给出下一步建议。',
    processEyebrow: 'How it works',
    processTitle: '从第一次接触到项目启动，路径通常并不复杂',
    process: [
      {
        title: '1. 先明确交付目标',
        description: '先判断这是客户响应、合规要求、供应商协同，还是内部碳项目，从而决定切入方式。',
      },
      {
        title: '2. 再对齐数据准备度',
        description: '一起确认目前已有的文件和输入、仍然缺的部分，以及哪些工作 AI 可以立即承担。',
      },
      {
        title: '3. 最后选择启动方式',
        description: '再判断更适合自助试点、代执行交付，还是更广的企业级协同工作流。',
      },
    ],
    linksTitle: '如果你还没准备好直接联系，也可以先看这些页面',
    linksBody:
      '你可以先看产品页、价格方案或资料库，等内部需求更清晰后再回来沟通。',
    links: [
      { label: '查看产品与解决方案', href: '/products' },
      { label: '查看价格方案', href: '/pricing' },
      { label: '查看资源与白皮书', href: '/resources' },
    ],
    breadcrumbHome: '首页',
    breadcrumbCurrent: '联系 Climate Seal',
    contactDescription:
      '联系 Climate Seal 团队，了解产品碳足迹、LCA、Scope 3、供应链碳项目、试点方案和合规交付。',
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
      canonical: '/contact',
      languages: buildLanguageAlternates('/contact'),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      images: [{ url: '/new-contact-logo.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: ['/new-contact-logo.png'],
    },
  };
}

export default async function ContactPage() {
  const headerList = await headers();
  const locale = isChineseLanguage(resolveLanguage(headerList.get('x-language'))) ? 'zh' : 'en';
  const copy = content[locale];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.breadcrumbHome, item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: copy.breadcrumbCurrent, item: `${siteUrl}/contact` },
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Climate Seal Contact',
    url: `${siteUrl}/contact`,
    description: copy.contactDescription,
    mainEntity: {
      '@type': 'Organization',
      name: 'Climate Seal',
      email: 'xuguang.ma@climateseal.net',
      telephone: '+86 15652618365',
    },
  };

  return (
    <main className="bg-[#F7F3EA] text-[#123F3D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <div className="inline-flex border border-[#d1d8d2] bg-[#F8F6F1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">
              {copy.eyebrow}
            </div>
            <h1 className="font-lora text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.45rem]">
              {copy.heroTitle}
            </h1>
            <p className="text-lg leading-8 text-[#5f7672]">{copy.heroBody}</p>

            <div className="grid gap-4 pt-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {copy.contactWays.map((item) => (
                <div key={item.label} className="border border-[#d7ddd6] bg-[#FBF9F4] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-[#486662]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#d7ddd6] bg-[#FBF9F4] p-8 text-[#123F3D]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.prepEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">{copy.prepTitle}</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5f7672]">
              {copy.prepItems.map((item) => (
                <li key={item} className="flex gap-3 border-b border-[#dde2dc] pb-3 last:border-b-0 last:pb-0">
                  <span className="mt-1 text-[#1d7c72]">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border border-[#123F3D] bg-[#123F3D] p-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BEE5DB]">{copy.fastLabel}</p>
              <p className="mt-3 text-sm leading-7 text-white/82">{copy.fastBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.processEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.processTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.process.map((step) => (
              <article key={step.title} className="border border-[#d7ddd6] bg-white p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5f7672]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <h2 className="font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.linksTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#5f7672]">{copy.linksBody}</p>
          </div>
          <div className="grid gap-4">
            {copy.links.map((item) => (
              <Link key={item.href} href={item.href} className="border border-[#d7ddd6] bg-[#FBF9F4] px-6 py-4 font-medium text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
