import AssetUploadForm from '@/components/AssetUploadForm';
import { listUploadedAssets } from '@/lib/admin-store';

export default async function AdminAssetsPage() {
  const assets = await listUploadedAssets();

  return (
    <div className="space-y-6">
      <AssetUploadForm />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Uploaded assets</h1>
        <p className="mt-1 text-sm text-slate-600">
          Files are stored in `public/uploads/admin` and can be referenced directly in content.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">Uploaded</th>
                <th className="px-3 py-3 font-medium">Original filename</th>
                <th className="px-3 py-3 font-medium">Content type</th>
                <th className="px-3 py-3 font-medium">Size</th>
                <th className="px-3 py-3 font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-100">
                  <td className="px-3 py-4 text-slate-500">{new Date(asset.uploadedAt).toLocaleString()}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{asset.originalFilename}</td>
                  <td className="px-3 py-4 text-slate-700">{asset.contentType}</td>
                  <td className="px-3 py-4 text-slate-700">{Math.round(asset.size / 1024)} KB</td>
                  <td className="px-3 py-4">
                    <a href={asset.url} target="_blank" rel="noreferrer" className="text-emerald-700 underline">
                      {asset.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {assets.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No uploaded assets yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
