import { listWhitepaperSubmissions } from '@/lib/admin-store';

export default async function AdminDownloadsPage() {
  const submissions = await listWhitepaperSubmissions();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Whitepaper downloads</h1>
          <p className="mt-1 text-sm text-slate-600">Track every gated whitepaper request and its delivery mode.</p>
        </div>
        <a
          href="/api/admin/export?type=whitepapers"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="px-3 py-3 font-medium">Submitted</th>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Company</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Phone</th>
              <th className="px-3 py-3 font-medium">Whitepaper</th>
              <th className="px-3 py-3 font-medium">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-slate-100 align-top">
                <td className="px-3 py-4 text-slate-500">{new Date(submission.submittedAt).toLocaleString()}</td>
                <td className="px-3 py-4 font-medium text-slate-900">{submission.name}</td>
                <td className="px-3 py-4 text-slate-700">{submission.company}</td>
                <td className="px-3 py-4 text-slate-700">{submission.email}</td>
                <td className="px-3 py-4 text-slate-700">{submission.phone || '-'}</td>
                <td className="px-3 py-4 text-slate-700">{submission.whitepaperTitle}</td>
                <td className="px-3 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-700">
                    {submission.deliveryMode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No whitepaper requests yet.</p>
        ) : null}
      </div>
    </div>
  );
}
