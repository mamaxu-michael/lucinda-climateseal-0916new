import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from 'next/script';
import TitleUpdater from "@/components/TitleUpdater";
import { buildLanguageAlternates, isChineseLanguage, resolveLanguage } from "@/lib/language";

const googleVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION as string | undefined;
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION as string | undefined;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const language = resolveLanguage(headerList.get('x-language'));
  const isZh = isChineseLanguage(language);

  const title = isZh
    ? 'Climate Seal | AI产品碳足迹与供应链碳管理平台'
    : 'AI Carbon Footprint Platform | Audit-Ready PCF in Hours | Climate Seal';
  const description = isZh
    ? 'Climate Seal 用 AI 自动化产品碳足迹、LCA、供应链碳数据协同与合规交付，帮助团队以更低成本完成审计级报告和客户交付。'
    : 'AI agent for Product Carbon Footprint (PCF) Accounting and Assurance. Parse BOMs, auto-build LCAs, pre-verify evidence and export ISO 14067/GHG-aligned reports. Slash time and cost with no expertise needed. Deploy as secure SaaS or fully on-premise. Free one report to start your decarbonization journey.';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://climate-seal.com"),
    title: {
      default: title,
      template: "%s | Climate Seal"
    },
    description,
    robots: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production'
    },
    alternates: {
      canonical: "/",
      languages: buildLanguageAlternates("/")
    },
    keywords: [
      "碳排放管理平台",
      "企业碳盘查工具",
      "供应链碳足迹核算",
      "Scope 3 排放核算",
      "CBAM 报告",
      "制造业碳足迹计算",
      "物流业碳排放管理",
      "AI碳管理",
      "GHG Protocol碳盘查",
      "carbon footprint",
      "产品碳足迹",
      "供应链碳管理",
      "气候合规",
      "ESG",
      "LCA",
      "SBTi",
      "GHG Protocol",
      "carbon accounting software",
      "enterprise carbon management",
      "supply chain carbon footprint",
      "scope 3 emissions calculation",
      "AI carbon management platform"
    ],
    openGraph: {
      type: "website",
      siteName: "Climate Seal",
      title,
      description,
      url: "/",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Climate Seal - Credibility Drives Better Climate."
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
      site: "@ClimateSeal",
      creator: "@ClimateSeal"
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification ? { other: { bing: bingVerification } } : {}),
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png"
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const initialLanguage = resolveLanguage(headerList.get('x-language'));

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <head>
        {/* Preconnect/DNS-Prefetch for critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload hero assets if needed (keep minimal to avoid over-preload) */}
        <link rel="preload" as="image" href="/favicon.png" />
        {/* RSS link for content discovery */}
        <link rel="alternate" type="application/rss+xml" title="Climate Seal RSS" href="/rss.xml" />
        {/* Organization JSON-LD（仅注入元信息，不影响视觉） */}
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Climate Seal",
            url: (process.env.NEXT_PUBLIC_APP_URL || "https://climate-seal.com"),
            logo: new URL("/logo.jpg", process.env.NEXT_PUBLIC_APP_URL || "https://climate-seal.com").toString(),
            description: "AI agent for Product Carbon Footprint (PCF) Accounting and Assurance. Parse BOMs, auto-build LCAs, pre-verify evidence and export ISO 14067/GHG-aligned reports.",
            foundingDate: "2024",
            sameAs: [
              "https://twitter.com/ClimateSeal",
              "https://linkedin.com/company/climate-seal"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "contact@climate-seal.com"
            }
          })}
        </Script>
        {/* SoftwareApplication JSON-LD */}
        <Script id="software-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Climate Seal AI Platform",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "AI agent for Product Carbon Footprint (PCF) Accounting and Assurance. Parse BOMs, auto-build LCAs, pre-verify evidence and export ISO 14067/GHG-aligned reports.",
            url: (process.env.NEXT_PUBLIC_APP_URL || "https://climate-seal.com"),
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free one report to start your decarbonization journey"
            },
            featureList: [
              "AI-powered carbon footprint calculation",
              "Automated LCA generation",
              "ISO 14067 compliance",
              "GHG Protocol alignment",
              "Audit-ready reporting",
              "BOM parsing",
              "Evidence pre-verification"
            ]
          })}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BM7079RZZH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BM7079RZZH', {
              page_title: document.title,
              page_location: window.location.href,
            });
            
            // 简单的关键事件追踪
            document.addEventListener('DOMContentLoaded', function() {
              // 联系按钮点击追踪
              document.addEventListener('click', function(e) {
                const target = e.target.closest('a, button');
                if (!target) return;
                
                // 联系相关按钮
                if (target.getAttribute('href') === '#contact' || 
                    target.textContent.includes('Contact') || 
                    target.textContent.includes('联系') ||
                    target.textContent.includes('Get Started')) {
                  gtag('event', 'contact_click', {
                    event_category: 'conversion',
                    event_label: target.textContent.trim()
                  });
                }
              });
              
              // 表单提交追踪
              document.addEventListener('submit', function(e) {
                gtag('event', 'form_submit', {
                  event_category: 'conversion',
                  event_label: 'contact_form'
                });
              });
            });
          `}
        </Script>
      </head>
      <body
        className="antialiased bg-[var(--brand-bg)] text-[var(--brand-ink)]"
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <TitleUpdater />
          <Navbar />
          <main className="min-h-screen bg-[var(--brand-bg)]">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
