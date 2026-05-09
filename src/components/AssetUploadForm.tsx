'use client';

import { useState } from 'react';

type UploadResult = {
  filename: string;
  url: string;
};

export default function AssetUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<UploadResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('Choose a file first.');
      return;
    }

    setIsUploading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Upload failed');
        return;
      }

      setResult({ filename: data.filename, url: data.url });
      setFile(null);
      window.location.reload();
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Upload Asset</h2>
      <p className="mt-2 text-sm text-slate-600">
        Upload PDFs or image assets for downloads, whitepapers, and marketing pages.
      </p>

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.svg"
        className="mt-4 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
        onChange={(event) => setFile(event.target.files?.[0] || null)}
      />

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Uploaded `{result.filename}` to `{result.url}`
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isUploading}
        className="mt-4 rounded-full bg-[#9ef894] px-5 py-3 font-semibold text-black transition hover:bg-[#8de485] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isUploading ? 'Uploading...' : 'Upload asset'}
      </button>
    </form>
  );
}
