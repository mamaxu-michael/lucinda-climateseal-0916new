'use client';

import { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import type { ManagedWhitepaper } from '@/lib/whitepaper-admin-store';
import type { UploadedAsset } from '@/lib/admin-store';

type Props = {
  whitepapers: ManagedWhitepaper[];
  assets: UploadedAsset[];
};

type EditorState = {
  id: string;
  title: string;
  titleZh: string;
  intro: string;
  introZh: string;
  thumbnail: string;
  whatYouGet: string;
  whatYouGetZh: string;
  topics: string;
  publishDate: string;
  downloadUrl: string;
  formRecipient: string;
  published: boolean;
};

const EMPTY_STATE: EditorState = {
  id: '',
  title: '',
  titleZh: '',
  intro: '',
  introZh: '',
  thumbnail: '',
  whatYouGet: '',
  whatYouGetZh: '',
  topics: '',
  publishDate: new Date().toISOString().slice(0, 10),
  downloadUrl: '',
  formRecipient: 'whitepapers@climateseal.com',
  published: true,
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminWhitepaperEditor({ whitepapers, assets }: Props) {
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState<EditorState>(EMPTY_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const imageAssets = assets.filter((asset) => asset.contentType.startsWith('image/'));
  const pdfAssets = assets.filter((asset) => asset.contentType === 'application/pdf');

  function updateField<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function loadWhitepaper(id: string) {
    setSelectedId(id);
    setMessage('');
    setError('');

    if (!id) {
      setForm(EMPTY_STATE);
      return;
    }

    const whitepaper = whitepapers.find((item) => item.id === id);
    if (!whitepaper) {
      return;
    }

    setForm({
      id: whitepaper.id,
      title: whitepaper.title,
      titleZh: whitepaper.titleZh,
      intro: whitepaper.intro,
      introZh: whitepaper.introZh,
      thumbnail: whitepaper.thumbnail,
      whatYouGet: whitepaper.whatYouGet.join('\n'),
      whatYouGetZh: whitepaper.whatYouGetZh.join('\n'),
      topics: whitepaper.topics.join(', '),
      publishDate: whitepaper.publishDate,
      downloadUrl: whitepaper.downloadUrl,
      formRecipient: whitepaper.formRecipient,
      published: whitepaper.published,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    const payload = {
      ...form,
      id: form.id || slugify(form.title),
      whatYouGet: form.whatYouGet.split('\n').map((item) => item.trim()).filter(Boolean),
      whatYouGetZh: form.whatYouGetZh.split('\n').map((item) => item.trim()).filter(Boolean),
      topics: form.topics.split(',').map((item) => item.trim()).filter(Boolean),
    };

    try {
      const response = await fetch('/api/admin/whitepapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to save whitepaper');
        return;
      }

      setMessage(payload.published ? 'Whitepaper saved and published.' : 'Whitepaper saved as draft.');
      setSelectedId(payload.id);
      setForm((current) => ({ ...current, id: payload.id }));
      window.location.reload();
    } catch {
      setError('Failed to save whitepaper');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Whitepapers</h1>
            <p className="mt-1 text-sm text-slate-600">Manage cover previews, downloadable PDFs, gated intro copy, and publish state.</p>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedId}
              onChange={(event) => loadWhitepaper(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
            >
              <option value="">New whitepaper</option>
              {whitepapers.map((whitepaper) => (
                <option key={whitepaper.id} value={whitepaper.id}>
                  {whitepaper.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => loadWhitepaper('')}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input value={form.title} onChange={(e) => updateField('title', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title (ZH)</label>
              <input value={form.titleZh} onChange={(e) => updateField('titleZh', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Publish date</label>
              <input type="date" value={form.publishDate} onChange={(e) => updateField('publishDate', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Form recipient</label>
              <input value={form.formRecipient} onChange={(e) => updateField('formRecipient', e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Topics</label>
              <input value={form.topics} onChange={(e) => updateField('topics', e.target.value)} placeholder="cbam, compliance, supplier" className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Intro</label>
              <textarea value={form.intro} onChange={(e) => updateField('intro', e.target.value)} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Intro (ZH)</label>
              <textarea value={form.introZh} onChange={(e) => updateField('introZh', e.target.value)} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">What you get</label>
              <textarea value={form.whatYouGet} onChange={(e) => updateField('whatYouGet', e.target.value)} rows={5} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">What you get (ZH)</label>
              <textarea value={form.whatYouGetZh} onChange={(e) => updateField('whatYouGetZh', e.target.value)} rows={5} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cover image URL</label>
              <input value={form.thumbnail} onChange={(e) => updateField('thumbnail', e.target.value)} placeholder="/uploads/admin/cover.jpg" className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">PDF download URL</label>
              <input value={form.downloadUrl} onChange={(e) => updateField('downloadUrl', e.target.value)} placeholder="/uploads/admin/whitepaper.pdf" className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(e) => updateField('published', e.target.checked)} />
            Published
          </label>

          {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
          {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div> : null}

          <button type="submit" disabled={isSaving} className="rounded-full bg-[#9ef894] px-5 py-3 font-semibold text-black transition hover:bg-[#8de485] disabled:opacity-60">
            {isSaving ? 'Saving...' : 'Save whitepaper'}
          </button>
        </form>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Cover image assets</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {imageAssets.slice(0, 8).map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => updateField('thumbnail', asset.url)}
                  className={`overflow-hidden rounded-2xl border text-left transition ${form.thumbnail === asset.url ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="relative aspect-[4/3] bg-slate-200">
                    <SafeImage src={asset.url} alt={asset.originalFilename} fill className="object-cover" fallbackSrc="/logo.jpg" />
                  </div>
                  <div className="bg-white p-3 text-xs text-slate-600 line-clamp-2">{asset.originalFilename}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">PDF assets</h2>
            <div className="mt-4 space-y-2">
              {pdfAssets.slice(0, 12).map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => updateField('downloadUrl', asset.url)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${form.downloadUrl === asset.url ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <p className="text-sm font-medium text-slate-900">{asset.originalFilename}</p>
                  <p className="mt-1 text-xs text-slate-500">{asset.url}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
