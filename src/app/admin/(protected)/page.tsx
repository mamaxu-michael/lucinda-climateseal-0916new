import Link from 'next/link';
import { listContactSubmissions, listReferralOwners, listReferralUses, listUploadedAssets, listWhitepaperSubmissions } from '@/lib/admin-store';

export default async function AdminOverviewPage() {
  const [contacts, whitepapers, assets, referralOwners, referralUses] = await Promise.all([
    listContactSubmissions(),
    listWhitepaperSubmissions(),
    listUploadedAssets(),
    listReferralOwners(),
    listReferralUses(),
  ]);

  const cards = [
    {
      label: 'Contact forms',
      value: contacts.length,
      href: '/admin/forms',
    },
    {
      label: 'Whitepaper requests',
      value: whitepapers.length,
      href: '/admin/downloads',
    },
    {
      label: 'Uploaded assets',
      value: assets.length,
      href: '/admin/assets',
    },
    {
      label: 'Referral uses',
      value: referralUses.length,
      href: '/admin/referrals',
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">{card.value}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent contact form</h2>
          {contacts[0] ? (
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p><strong>Name:</strong> {contacts[0].name}</p>
              <p><strong>Company:</strong> {contacts[0].company}</p>
              <p><strong>Email:</strong> {contacts[0].email}</p>
              <p><strong>Submitted:</strong> {new Date(contacts[0].submittedAt).toLocaleString()}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No contact forms submitted yet.</p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent whitepaper request</h2>
          {whitepapers[0] ? (
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p><strong>Name:</strong> {whitepapers[0].name}</p>
              <p><strong>Whitepaper:</strong> {whitepapers[0].whitepaperTitle}</p>
              <p><strong>Delivery:</strong> {whitepapers[0].deliveryMode}</p>
              <p><strong>Submitted:</strong> {new Date(whitepapers[0].submittedAt).toLocaleString()}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No whitepaper requests submitted yet.</p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Referral snapshot</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p><strong>Active referrers:</strong> {referralOwners.filter((owner) => owner.status === 'active').length}</p>
            <p><strong>Total referral uses:</strong> {referralUses.length}</p>
            <p><strong>Credited:</strong> {referralUses.filter((use) => use.status === 'credited').length}</p>
            <p><strong>Open review:</strong> {referralUses.filter((use) => use.status === 'new' || use.status === 'qualified').length}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
