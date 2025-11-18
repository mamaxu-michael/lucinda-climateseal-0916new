"use client";

import { useMemo, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import articlesData from '@/data/articles.json';

type Whitepaper = {
  id: string;
  title: string;
  titleZh: string;
  intro: string;
  introZh: string;
  thumbnail: string;
  whatYouGet: string[];
  whatYouGetZh: string[];
  topics: string[];
  publishDate: string;
  downloadUrl: string;
  formRecipient: string;
};

export default function WhitepaperDetail() {
  const { language, t } = useLanguage();
  const params = useParams();
  const [routeId, setRouteId] = useState<string>(typeof (params as { id?: string })?.id === 'string' ? (params as { id: string }).id : '');

  const whitepapers: Whitepaper[] = articlesData.whitepapers || [];

  useEffect(() => {
    if (!routeId && typeof window !== 'undefined') {
      const path = window.location.pathname || '';
      const seg = path.split('/').filter(Boolean);
      const maybeId = seg[2] || '';
      if (maybeId) setRouteId(decodeURIComponent(maybeId));
    }
  }, [routeId]);

  const whitepaper = useMemo(() => {
    const id = routeId || ((params as { id?: string })?.id as string);
    return whitepapers.find(w => w.id === id) || null;
  }, [routeId, params, whitepapers]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);

  const getWhitepaperTitle = (wp: Whitepaper) => {
    return language === 'zh' ? wp.titleZh : wp.title;
  };

  const getWhitepaperIntro = (wp: Whitepaper) => {
    return language === 'zh' ? wp.introZh : wp.intro;
  };

  const getWhitepaperBenefits = (wp: Whitepaper) => {
    return language === 'zh' ? wp.whatYouGetZh : wp.whatYouGet;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'zh' 
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage(language === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-whitepaper-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          whitepaperId: whitepaper?.id,
          whitepaperTitle: getWhitepaperTitle(whitepaper!),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(language === 'zh' ? '提交成功！您现在可以下载白皮书。' : 'Success! You can now download the whitepaper.');
        setDownloadReady(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          jobTitle: '',
          phone: ''
        });
      } else {
        setSubmitMessage(data.message || (language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage(language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!whitepaper) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600 text-center">
          <h1 className="text-2xl font-bold mb-2 text-slate-800">{language === 'zh' ? '正在载入白皮书…' : 'Loading whitepaper…'}</h1>
          <Link href="/resources" className="text-emerald-600 hover:text-emerald-700 underline">
            {language === 'zh' ? '← 返回资源中心' : '← Back to Resources'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Script id="jsonld-breadcrumb-whitepaper" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: language === 'zh' ? '首页' : 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/` },
            { "@type": "ListItem", position: 2, name: language === 'zh' ? '解决方案资源中心' : 'Solution Resources', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources` },
            { "@type": "ListItem", position: 3, name: getWhitepaperTitle(whitepaper), item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com'}/resources/whitepapers/${whitepaper.id}` }
          ]
        })}
      </Script>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-6">
            <Link 
              href="/resources" 
              className="text-emerald-600 hover:text-emerald-700 underline text-sm"
            >
              {language === 'zh' ? '← 返回资源中心' : '← Back to Resources'}
            </Link>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side: Thumbnail & Benefits */}
            <div className="space-y-6">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={whitepaper.thumbnail}
                  alt={`${getWhitepaperTitle(whitepaper)} thumbnail`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#9ef894] text-black text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {language === 'zh' ? '白皮书' : 'Whitepaper'}
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-lora">
                  {getWhitepaperTitle(whitepaper)}
                </h1>
                <p className="text-slate-600 text-sm mb-6">
                  {formatDate(whitepaper.publishDate)}
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  {getWhitepaperIntro(whitepaper)}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  {language === 'zh' ? '下载可获得' : 'What You\'ll Get'}
                </h2>
                <ul className="space-y-3">
                  {getWhitepaperBenefits(whitepaper).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 text-[#9ef894] text-xl">✓</span>
                      <span className="text-slate-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {whitepaper.topics.map((topic) => (
                  <span key={topic} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm uppercase tracking-wide">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Download Form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-lora">
                  {language === 'zh' ? '下载白皮书' : 'Download Whitepaper'}
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  {language === 'zh' 
                    ? '请填写以下信息以获取下载链接' 
                    : 'Please fill in the form below to get the download link'}
                </p>

                {downloadReady ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-emerald-800 text-sm mb-4">
                        {submitMessage}
                      </p>
                      <a
                        href={whitepaper.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 bg-[#9ef894] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#8ee884] transition-colors w-full justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {language === 'zh' ? '立即下载' : 'Download Now'}
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        {language === 'zh' ? '姓名' : 'Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        {language === 'zh' ? '邮箱' : 'Email'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        {language === 'zh' ? '公司' : 'Company'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-700 mb-2">
                        {language === 'zh' ? '职位' : 'Job Title'}
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        {language === 'zh' ? '电话' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-sm ${
                        downloadReady 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9ef894] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#8ee884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting 
                        ? (language === 'zh' ? '提交中...' : 'Submitting...') 
                        : (language === 'zh' ? '提交并获取下载链接' : 'Submit & Get Download Link')
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

