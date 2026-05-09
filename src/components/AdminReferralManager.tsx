'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { ReferralOwner, ReferralUse } from '@/lib/admin-store';

type Props = {
  owners: ReferralOwner[];
  uses: ReferralUse[];
};

const roleLabels: Record<ReferralOwner['role'], string> = {
  expert: 'Expert',
  consultant: 'Consultant',
  brand_manager: 'Brand manager',
  procurement_manager: 'Procurement manager',
  other: 'Other',
};

export default function AdminReferralManager({ owners, uses }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: 'expert',
    referralCode: '',
    notes: '',
  });

  const summary = useMemo(() => {
    return {
      activeOwners: owners.filter((owner) => owner.status === 'active').length,
      totalUses: uses.length,
      qualified: uses.filter((use) => ['qualified', 'converted', 'credited'].includes(use.status)).length,
      credited: uses.filter((use) => use.status === 'credited').length,
    };
  }, [owners, uses]);

  async function createOwner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMessage(payload.error || 'Failed to create referral owner');
        return;
      }

      setForm({
        name: '',
        email: '',
        company: '',
        role: 'expert',
        referralCode: '',
        notes: '',
      });
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function updateStatus(targetType: 'owner' | 'use', id: string, status: string) {
    setIsSaving(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/referrals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetType, id, status }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMessage(payload.error || 'Failed to update referral status');
        return;
      }

      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Active referrers', value: summary.activeOwners },
          { label: 'Code uses', value: summary.totalUses },
          { label: 'Qualified', value: summary.qualified },
          { label: 'Credited', value: summary.credited },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Referral program</h1>
          <p className="mt-1 text-sm text-slate-600">
            Register approved referrers here, issue unique codes, and track every referred contact from the website form.
          </p>
        </div>

        <form onSubmit={createOwner} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Referrer name"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500"
            required
          />
          <input
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="Referrer email"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500"
            required
          />
          <input
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            placeholder="Company"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500"
          />
          <select
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500"
          >
            <option value="expert">Expert</option>
            <option value="consultant">Consultant</option>
            <option value="brand_manager">Brand manager</option>
            <option value="procurement_manager">Procurement manager</option>
            <option value="other">Other</option>
          </select>
          <input
            value={form.referralCode}
            onChange={(event) => setForm((current) => ({ ...current, referralCode: event.target.value.toUpperCase() }))}
            placeholder="Referral code"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 outline-none focus:border-emerald-500"
            required
          />
          <input
            value={form.notes}
            onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Notes (optional)"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500"
          />

          <div className="md:col-span-2 xl:col-span-3 flex items-center justify-between gap-3">
            {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : <div />}
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSaving ? 'Saving...' : 'Create referrer'}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Registered referrers</h2>
            <p className="mt-1 text-sm text-slate-600">Only active referrers can have their codes accepted on the website.</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Role</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Code</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-4 font-medium text-slate-900">{owner.name}</td>
                  <td className="px-3 py-4 text-slate-700">{roleLabels[owner.role]}</td>
                  <td className="px-3 py-4 text-slate-700">{owner.email}</td>
                  <td className="px-3 py-4 text-slate-700">{owner.company || '—'}</td>
                  <td className="px-3 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold tracking-[0.12em] text-slate-900">
                      {owner.referralCode}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <select
                      value={owner.status}
                      onChange={(event) => updateStatus('owner', owner.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {owners.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No referral owners registered yet.</p>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Referral uses</h2>
            <p className="mt-1 text-sm text-slate-600">Every time someone submits the contact form with a valid code, it appears here.</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">Submitted</th>
                <th className="px-3 py-3 font-medium">Referred person</th>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Referrer</th>
                <th className="px-3 py-3 font-medium">Code</th>
                <th className="px-3 py-3 font-medium">Reward</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {uses.map((use) => (
                <tr key={use.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-4 text-slate-500">{new Date(use.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-4">
                    <p className="font-medium text-slate-900">{use.referredName}</p>
                    <p className="mt-1 text-slate-600">{use.referredEmail}</p>
                  </td>
                  <td className="px-3 py-4 text-slate-700">{use.referredCompany}</td>
                  <td className="px-3 py-4 text-slate-700">{use.referralOwnerName}</td>
                  <td className="px-3 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold tracking-[0.12em] text-slate-900">
                      {use.referralCode}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-slate-700">${use.rewardValueUsd}</td>
                  <td className="px-3 py-4">
                    <select
                      value={use.status}
                      onChange={(event) => updateStatus('use', use.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                    >
                      <option value="new">new</option>
                      <option value="qualified">qualified</option>
                      <option value="converted">converted</option>
                      <option value="credited">credited</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {uses.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No referral uses yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
