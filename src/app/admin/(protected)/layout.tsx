import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminNav from '@/components/AdminNav';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import { requireAdminSession } from '@/lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin | Climate Seal',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Climate Seal Admin</p>
            <p className="mt-1 text-sm text-slate-600">Signed in as {session.username}</p>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <AdminNav />
        </div>
        {children}
      </main>
    </div>
  );
}
