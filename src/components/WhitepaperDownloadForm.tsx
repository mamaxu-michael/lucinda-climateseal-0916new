'use client';

import { useState } from 'react';
import type { Language } from '@/lib/i18n';

type WhitepaperDownloadFormProps = {
  language: Language;
  whitepaperId: string;
  whitepaperTitle: string;
  downloadUrl: string | null;
  instantDownloadAvailable: boolean;
};

export default function WhitepaperDownloadForm({
  language,
  whitepaperId,
  whitepaperTitle,
  downloadUrl,
  instantDownloadAvailable,
}: WhitepaperDownloadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          whitepaperId,
          whitepaperTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const deliveryMode = data.deliveryMode || (instantDownloadAvailable ? 'download' : 'email');

        setSubmitMessage(
          deliveryMode === 'download'
            ? (language === 'zh' ? '提交成功！您现在可以下载白皮书。' : 'Success! You can now download the whitepaper.')
            : deliveryMode === 'email'
              ? (language === 'zh' ? '提交成功！我们的团队会尽快将白皮书发送给您。' : 'Success! Our team will send the whitepaper to you shortly.')
              : (language === 'zh' ? '提交成功！我们已收到您的请求，团队会尽快与您联系。' : 'Success! We received your request and our team will follow up shortly.')
        );
        setDownloadReady(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          jobTitle: '',
          phone: '',
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

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 font-lora">
        {language === 'zh' ? '下载白皮书' : 'Download Whitepaper'}
      </h2>
      <p className="text-slate-600 mb-6 text-sm">
        {instantDownloadAvailable
          ? (language === 'zh' ? '请填写以下信息以获取下载链接' : 'Please fill in the form below to get the download link')
          : (language === 'zh' ? '请填写以下信息，我们会尽快将白皮书发送给您' : 'Please fill in the form below and our team will send the whitepaper shortly')}
      </p>

      {downloadReady ? (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-emerald-800 text-sm mb-4">{submitMessage}</p>
            {instantDownloadAvailable && downloadUrl ? (
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center gap-2 bg-[#9ef894] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#8ee884] transition-colors w-full justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {language === 'zh' ? '立即下载' : 'Download Now'}
              </a>
            ) : (
              <p className="text-sm text-emerald-900">
                {language === 'zh'
                  ? '白皮书暂未提供即时下载文件，我们会根据您的请求尽快跟进。'
                  : 'The whitepaper is not yet available as an instant download, and we will follow up on your request shortly.'}
              </p>
            )}
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
            <div
              className={`p-3 rounded-lg text-sm ${
                downloadReady
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
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
              : (language === 'zh' ? '提交并获取下载链接' : 'Submit & Get Download Link')}
          </button>
        </form>
      )}
    </div>
  );
}
