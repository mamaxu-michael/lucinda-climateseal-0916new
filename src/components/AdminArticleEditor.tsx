'use client';

import { useMemo, useState } from 'react';
import SafeImage from '@/components/SafeImage';
import { renderMarkdown } from '@/lib/article-markdown';
import type { ArticleCategory } from '@/lib/content';
import type { ManagedArticle } from '@/lib/article-admin-store';
import type { UploadedAsset } from '@/lib/admin-store';

type AdminArticleEditorProps = {
  categories: ArticleCategory[];
  articles: ManagedArticle[];
  assets: UploadedAsset[];
};

type EditorState = {
  id: string;
  title: string;
  titleZh: string;
  coverImage: string;
  excerpt: string;
  excerptZh: string;
  content: string;
  contentZh: string;
  publishDate: string;
  category: string;
  categoryZh: string;
  featured: boolean;
  published: boolean;
};

const EMPTY_STATE: EditorState = {
  id: '',
  title: '',
  titleZh: '',
  coverImage: '',
  excerpt: '',
  excerptZh: '',
  content: '',
  contentZh: '',
  publishDate: new Date().toISOString().slice(0, 10),
  category: '',
  categoryZh: '',
  featured: false,
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

export default function AdminArticleEditor({ categories, articles, assets }: AdminArticleEditorProps) {
  const [form, setForm] = useState<EditorState>(EMPTY_STATE);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const previewHtml = useMemo(() => renderMarkdown(form.content || '# Article preview\n\nStart writing to see a preview.'), [form.content]);
  const imageAssets = useMemo(
    () => assets.filter((asset) => asset.contentType.startsWith('image/')),
    [assets]
  );

  function updateField<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function loadArticle(articleId: string) {
    setSelectedArticleId(articleId);
    setMessage('');
    setError('');

    if (!articleId) {
      setForm(EMPTY_STATE);
      return;
    }

    const article = articles.find((item) => item.id === articleId);
    if (!article) {
      return;
    }

    setForm({
      id: article.id,
      title: article.title,
      titleZh: article.titleZh,
      coverImage: article.coverImage,
      excerpt: article.excerpt,
      excerptZh: article.excerptZh,
      content: article.content,
      contentZh: article.contentZh,
      publishDate: article.publishDate,
      category: article.category,
      categoryZh: article.categoryZh,
      featured: article.featured,
      published: article.published,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    const category = categories.find((item) => item.id === form.category);
    const payload = {
      ...form,
      id: form.id || slugify(form.title),
      categoryZh: form.categoryZh || category?.nameZh || '',
    };

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to save article');
        return;
      }

      setMessage(payload.published ? 'Article saved and published.' : 'Article saved as draft.');
      setSelectedArticleId(payload.id);
      setForm((current) => ({
        ...current,
        id: payload.id,
        categoryZh: payload.categoryZh,
      }));
      window.location.reload();
    } catch {
      setError('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedArticleId) {
      return;
    }

    const confirmed = window.confirm('Delete this admin article? This only affects admin-created articles.');
    if (!confirmed) {
      return;
    }

    setError('');
    setMessage('');

    const response = await fetch(`/api/admin/articles?id=${encodeURIComponent(selectedArticleId)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setError('Failed to delete article');
      return;
    }

    setForm(EMPTY_STATE);
    setSelectedArticleId('');
    setMessage('Article deleted.');
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
            <p className="mt-1 text-sm text-slate-600">
              Create or update markdown articles, set the preview image, and publish straight into the resources center.
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedArticleId}
              onChange={(event) => loadArticle(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
            >
              <option value="">New article</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => loadArticle('')}
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
              <input
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title (ZH)</label>
              <input
                value={form.titleZh}
                onChange={(event) => updateField('titleZh', event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Publish date</label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(event) => updateField('publishDate', event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(event) => {
                  const category = categories.find((item) => item.id === event.target.value);
                  updateField('category', event.target.value);
                  updateField('categoryZh', category?.nameZh || '');
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cover image URL</label>
              <input
                value={form.coverImage}
                onChange={(event) => updateField('coverImage', event.target.value)}
                placeholder="/uploads/admin/article-cover.jpg"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Choose from uploaded images</h2>
                <p className="mt-1 text-xs text-slate-600">
                  Pick an existing image from Assets to fill the cover URL automatically.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {imageAssets.length} images
              </span>
            </div>

            {imageAssets.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {imageAssets.slice(0, 12).map((asset) => {
                  const isSelected = form.coverImage === asset.url;

                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => updateField('coverImage', asset.url)}
                      className={`overflow-hidden rounded-2xl border text-left transition ${
                        isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="relative aspect-[4/3] bg-slate-200">
                        <SafeImage
                          src={asset.url}
                          alt={asset.originalFilename}
                          fill
                          className="object-cover"
                          fallbackSrc="/logo.jpg"
                        />
                      </div>
                      <div className="bg-white p-3">
                        <p className="line-clamp-1 text-sm font-medium text-slate-900">{asset.originalFilename}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">{asset.url}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No uploaded images yet. Add a cover image in the Assets tab first.
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(event) => updateField('excerpt', event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt (ZH)</label>
              <textarea
                value={form.excerptZh}
                onChange={(event) => updateField('excerptZh', event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(event) => updateField('content', event.target.value)}
                rows={18}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content (ZH Markdown)</label>
              <textarea
                value={form.contentZh}
                onChange={(event) => updateField('contentZh', event.target.value)}
                rows={18}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => updateField('featured', event.target.checked)}
              />
              Featured article
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => updateField('published', event.target.checked)}
              />
              Published
            </label>
          </div>

          {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
          {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div> : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-[#9ef894] px-5 py-3 font-semibold text-black transition hover:bg-[#8de485] disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save article'}
            </button>
            <p className="text-sm text-slate-500">
              Upload your cover image first in Assets, then paste the public URL here.
            </p>
            {selectedArticleId ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                Delete article
              </button>
            ) : null}
          </div>
        </form>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Preview card</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <div className="relative aspect-[16/9] bg-slate-100">
                {form.coverImage ? (
                  <SafeImage
                    src={form.coverImage}
                    alt="Article cover preview"
                    fill
                    className="object-cover"
                    fallbackSrc="/logo.jpg"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">{form.category || 'category'}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{form.title || 'Article title preview'}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{form.excerpt || 'Article excerpt preview'}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Markdown preview</h2>
            <div className="prose prose-slate mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </section>
        </aside>
      </div>
    </div>
  );
}
