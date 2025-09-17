'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* Header */}
      <header className="bg-[rgb(0,52,50)] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-block mb-8 text-[#9ef894] hover:text-white transition-colors duration-300"
            >
              ← {t.privacy?.backToHome || '返回首页'}
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.privacy?.title || 'Privacy Policy'}
            </h1>
            <p className="text-xl text-white/80">
              {t.privacy?.subtitle || '隐私政策'}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="prose prose-lg prose-invert max-w-none">
              
              {/* Last Updated */}
              <div className="mb-8 p-4 bg-[#9ef894]/10 rounded-lg border border-[#9ef894]/20">
                <p className="text-[#9ef894] font-semibold mb-1">
                  {t.privacy?.lastUpdated || 'Last Updated'}
                </p>
                <p className="text-white/80 text-sm">
                  {t.privacy?.updateDate || 'December 2024'}
                </p>
              </div>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.introduction?.title || '1. Introduction'}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t.privacy?.sections?.introduction?.content || 
                  'Climate Seal ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our carbon footprint services.'}
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.dataCollection?.title || '2. Information We Collect'}
                </h2>
                <div className="text-white/80 leading-relaxed space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {t.privacy?.sections?.dataCollection?.personalInfo || 'Personal Information'}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t.privacy?.sections?.dataCollection?.items?.name || 'Name and contact information'}</li>
                    <li>{t.privacy?.sections?.dataCollection?.items?.email || 'Email address'}</li>
                    <li>{t.privacy?.sections?.dataCollection?.items?.company || 'Company information'}</li>
                    <li>{t.privacy?.sections?.dataCollection?.items?.usage || 'Usage data and analytics'}</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.dataUsage?.title || '3. How We Use Your Information'}
                </h2>
                <div className="text-white/80 leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t.privacy?.sections?.dataUsage?.items?.service || 'To provide and maintain our services'}</li>
                    <li>{t.privacy?.sections?.dataUsage?.items?.communication || 'To communicate with you about our services'}</li>
                    <li>{t.privacy?.sections?.dataUsage?.items?.improvement || 'To improve our website and services'}</li>
                    <li>{t.privacy?.sections?.dataUsage?.items?.legal || 'To comply with legal obligations'}</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.dataSharing?.title || '4. Information Sharing'}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t.privacy?.sections?.dataSharing?.content || 
                  'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.'}
                </p>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.security?.title || '5. Data Security'}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t.privacy?.sections?.security?.content || 
                  'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'}
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.rights?.title || '6. Your Rights'}
                </h2>
                <div className="text-white/80 leading-relaxed space-y-4">
                  <p>{t.privacy?.sections?.rights?.intro || 'You have the right to:'}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t.privacy?.sections?.rights?.items?.access || 'Access your personal information'}</li>
                    <li>{t.privacy?.sections?.rights?.items?.correct || 'Correct inaccurate information'}</li>
                    <li>{t.privacy?.sections?.rights?.items?.delete || 'Request deletion of your information'}</li>
                    <li>{t.privacy?.sections?.rights?.items?.portability || 'Data portability'}</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.privacy?.sections?.contact?.title || '7. Contact Us'}
                </h2>
                <div className="text-white/80 leading-relaxed space-y-4">
                  <p>
                    {t.privacy?.sections?.contact?.content || 
                    'If you have any questions about this Privacy Policy, please contact us at:'}
                  </p>
                  <div className="bg-[#9ef894]/10 p-4 rounded-lg border border-[#9ef894]/20">
                    <p className="text-[#9ef894] font-semibold">Climate Seal</p>
                    <p className="text-white/80">Email: privacy@climateseal.com</p>
                    <p className="text-white/80">Website: www.climateseal.com</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[rgb(0,52,50)] py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Climate Seal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
