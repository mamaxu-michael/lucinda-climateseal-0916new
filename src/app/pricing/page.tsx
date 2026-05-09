import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from '@/lib/language';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';

const content = {
  en: {
    title: 'Pricing',
    description:
      'View Climate Seal pricing for self-service, done-for-you delivery, and enterprise carbon accounting workflows across Product Carbon Footprint, Scope 3, and LCA use cases.',
    eyebrow: 'Pricing',
    heroTitle: 'Choose the lightest way to start, then scale into deeper carbon workflows.',
    heroBody:
      'Climate Seal pricing is designed around project maturity, data readiness, and collaboration complexity, not one generic SaaS box.',
    plans: [
      {
        name: 'Self-Service',
        price: '$120 / month',
        description: 'For teams that want to run a first Product Carbon Footprint or accounting pilot themselves.',
        features: [
          'AI-guided accounting setup, parsing, matching, and review flow',
          'Good fit for first internal pilots or early customer delivery needs',
          'Best when a team wants to learn the workflow while keeping cost light',
        ],
        accent: 'border-[#b9d9d8]',
        cta: 'Talk about self-service',
      },
      {
        name: 'Done-For-You',
        price: '$300 / report',
        description: 'For project-based delivery when speed matters more than building internal execution first.',
        features: [
          'Share product, BOM, energy, logistics, or supplier inputs and we move faster',
          'Best for RFQs, customer requests, export response, and urgent reporting',
          'Useful when teams want credible outputs without carrying the full workload internally',
        ],
        accent: 'border-[#8ece8f]',
        cta: 'Talk about done-for-you',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For multi-product, multi-team, or supplier-network programs that need a long-term operating system.',
        features: [
          'Supports supplier coordination, broader data governance, and ongoing delivery',
          'Better fit for Scope 3, procurement, cross-factory programs, and integrations',
          'Designed for teams that need traceability, repeatability, and scale over time',
        ],
        accent: 'border-[#123F3D]',
        cta: 'Talk about enterprise',
      },
    ],
    fitEyebrow: 'How to choose',
    fitTitle: 'If you are unsure where to start, this is usually the right logic.',
    fitNotes: [
      {
        title: 'Start small when the goal is to prove the workflow',
        description: 'If your first priority is delivering one PCF or testing a first carbon workflow internally, self-service or done-for-you is usually enough.',
      },
      {
        title: 'Move faster when time matters more than internal bandwidth',
        description: 'If deadlines are tight, done-for-you often creates the quickest path because it reduces coordination overhead inside the team.',
      },
      {
        title: 'Move enterprise when the challenge becomes coordination',
        description: 'Once multiple products, suppliers, sites, or teams are involved, the problem becomes governance and collaboration, not only reporting.',
      },
    ],
    leversTitle: 'What usually changes price, speed, and implementation shape',
    levers: [
      {
        title: 'Data readiness',
        description: 'The clearer the BOM, energy, logistics, and supplier inputs are, the easier it is to move quickly into higher-quality delivery.',
      },
      {
        title: 'Delivery goal',
        description: 'Customer response, export compliance, procurement collaboration, and internal decarbonization planning require different levels of depth.',
      },
      {
        title: 'Collaboration complexity',
        description: 'Once multiple teams or suppliers are involved, the project starts to need a shared operating workflow, not just a one-off output.',
      },
    ],
    ctaTitle: 'Want help choosing the right entry point?',
    ctaBody:
      'Send us your carbon accounting scope, target market, and current data readiness. We can help you decide whether to start with a pilot, a delivery project, or a broader enterprise setup.',
    ctaPrimary: 'Contact the team',
    ctaSecondary: 'Read resources first',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Pricing',
    faq1q: 'How do I choose the right plan?',
    faq1a:
      'If you need to validate a first carbon workflow, start with Self-Service or Done-For-You. If you need supplier coordination, multiple products, or integration, Enterprise is usually the better fit.',
    faq2q: 'Do you support pilots or demos?',
    faq2a:
      'Yes. We can help evaluate your product complexity, target market, and data readiness to recommend a lighter pilot path before scaling up.',
  },
  zh: {
    title: '价格方案',
    description:
      '查看 Climate Seal 面向自助试点、代执行交付和企业级碳核算协同的价格方案，覆盖产品碳足迹、Scope 3 与 LCA 场景。',
    eyebrow: 'Pricing',
    heroTitle: '先选择最轻的启动方式，再逐步扩展到更深的碳工作流。',
    heroBody:
      'Climate Seal 的定价不是把所有情况塞进一个 SaaS 盒子，而是根据项目成熟度、数据准备度和协同复杂度来设计起点。',
    plans: [
      {
        name: 'Self-Service',
        price: '$120 / month',
        description: '适合希望自己先跑通首个产品碳足迹或核算试点的团队。',
        features: [
          'AI 引导完成核算设定、解析、匹配与复核流程',
          '适合内部首个试点或早期客户交付需求',
          '适合希望先学会流程、同时保持较轻预算的团队',
        ],
        accent: 'border-[#b9d9d8]',
        cta: '咨询自助方案',
      },
      {
        name: 'Done-For-You',
        price: '$300 / report',
        description: '适合更看重交付速度、暂时不想先搭内部执行能力的项目型需求。',
        features: [
          '提供产品、BOM、能耗、物流或供应商输入后，由我们更快推进',
          '适合 RFQ、客户要求、出口响应与紧急报告任务',
          '适合想拿到可信结果、又不想把全部工作量留在内部的团队',
        ],
        accent: 'border-[#8ece8f]',
        cta: '咨询代执行方案',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: '适合多产品、多团队或供应商网络项目，需要长期运行机制的场景。',
        features: [
          '支持供应商协同、更广的数据治理与持续交付',
          '更适合 Scope 3、采购协同、跨工厂项目与系统集成',
          '适合需要追溯性、可重复性和长期规模化能力的团队',
        ],
        accent: 'border-[#123F3D]',
        cta: '咨询企业方案',
      },
    ],
    fitEyebrow: 'How to choose',
    fitTitle: '如果你不确定从哪一个开始，通常可以这样判断。',
    fitNotes: [
      {
        title: '先证明流程时，先从轻的方式开始',
        description: '如果你的第一目标是交付一个 PCF 或在内部证明流程可行，自助或代执行通常就足够。',
      },
      {
        title: '当时间比内部带宽更紧时，优先追求速度',
        description: '如果时间压力大，Done-For-You 往往更快，因为它能减少团队内部的协调负担。',
      },
      {
        title: '当问题变成协同治理时，就进入企业级模式',
        description: '一旦涉及多产品、多供应商、多工厂或多团队，问题就不只是交报告，而是建立协同治理机制。',
      },
    ],
    leversTitle: '通常真正影响价格、速度和实施方式的是这几件事',
    levers: [
      {
        title: '数据准备度',
        description: 'BOM、能耗、物流与供应商数据越清晰，越容易更快进入高质量交付。',
      },
      {
        title: '交付目标',
        description: '客户响应、出口合规、采购协同和内部减排规划，对输出深度和节奏的要求并不相同。',
      },
      {
        title: '协同复杂度',
        description: '一旦涉及多团队或多供应商，项目就更需要共享工作流，而不只是一次性交付结果。',
      },
    ],
    ctaTitle: '想一起判断最合适的起点？',
    ctaBody:
      '把你的核算范围、目标市场和当前数据准备情况告诉我们，我们可以帮你判断更适合试点、按报告交付，还是进入企业级协同。',
    ctaPrimary: '联系团队',
    ctaSecondary: '先看资料库',
    breadcrumbHome: '首页',
    breadcrumbCurrent: '价格方案',
    faq1q: '如何选择合适的方案？',
    faq1a:
      '如果你要验证首个碳工作流，可从 Self-Service 或 Done-For-You 开始；如果涉及供应商协同、多产品线或系统集成，Enterprise 通常更合适。',
    faq2q: '是否支持试点或演示？',
    faq2a:
      '支持。我们可以根据你的产品复杂度、目标市场和数据准备情况，建议更轻的试点路径，再决定是否扩展。',
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
      canonical: '/pricing',
      languages: buildLanguageAlternates('/pricing'),
    },
    openGraph: {
      title: `${copy.title} | Climate Seal`,
      description: copy.description,
      images: [{ url: '/goal-manager.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${copy.title} | Climate Seal`,
      description: copy.description,
      images: ['/goal-manager.png'],
    },
  };
}

export default async function PricingPage() {
  const headerList = await headers();
  const locale = isChineseLanguage(resolveLanguage(headerList.get('x-language'))) ? 'zh' : 'en';
  const copy = content[locale];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.breadcrumbHome, item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: copy.breadcrumbCurrent, item: `${siteUrl}/pricing` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: copy.faq1q,
        acceptedAnswer: { '@type': 'Answer', text: copy.faq1a },
      },
      {
        '@type': 'Question',
        name: copy.faq2q,
        acceptedAnswer: { '@type': 'Answer', text: copy.faq2a },
      },
    ],
  };

  return (
    <main className="bg-[#F7F3EA] text-[#123F3D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex border border-[#d1d8d2] bg-[#F8F6F1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">
              {copy.eyebrow}
            </div>
            <h1 className="mt-6 font-lora text-4xl font-bold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">{copy.heroTitle}</h1>
            <p className="mt-6 text-lg leading-8 text-[#5f7672]">{copy.heroBody}</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {copy.plans.map((plan) => (
              <article key={plan.name} className={`flex h-full flex-col border ${plan.accent} bg-[#FBF9F4] p-7`}>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">{plan.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5f7672]">{plan.description}</p>
                  <div className="mt-6 text-4xl font-semibold tracking-[-0.03em]">{plan.price}</div>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5f7672]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-1 text-[#1d7c72]">+</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="mt-8 border border-[#123F3D] bg-[#123F3D] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#0f4a47]">
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-[#F7F3EA]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a76]">{copy.fitEyebrow}</p>
            <h2 className="mt-4 font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.fitTitle}</h2>
          </div>
          <div className="grid gap-4">
            {copy.fitNotes.map((note) => (
              <article key={note.title} className="border border-[#d7ddd6] bg-white p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{note.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5f7672]">{note.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="font-lora text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{copy.leversTitle}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.levers.map((item) => (
              <article key={item.title} className="border border-[#d7ddd6] bg-[#FBF9F4] p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f7672]">{item.description}</p>
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
              <Link href="/contact" className="border border-[#123F3D] bg-[#123F3D] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#0f4a47]">
                {copy.ctaPrimary}
              </Link>
              <Link href="/resources" className="border border-[#123F3D] px-6 py-3 text-center font-semibold text-[#123F3D] transition hover:bg-[#123F3D] hover:text-white">
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
