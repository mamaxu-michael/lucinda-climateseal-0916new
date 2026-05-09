import type { Metadata } from 'next';
import AdminLoginForm from '@/components/AdminLoginForm';
import { hasAdminCredentialsConfigured } from '@/lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin Login | Climate Seal',
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams?: Promise<{ setup?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const missingSetup = resolvedSearchParams?.setup === 'missing' || !hasAdminCredentialsConfigured();

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-4 py-16">
      <div className="mx-auto max-w-md border border-[#d7ddd6] bg-white p-8 shadow-[0_16px_32px_rgba(18,63,61,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#587671]">Climate Seal Admin</p>
        <h1 className="mt-3 font-lora text-3xl font-bold tracking-[-0.02em] text-[#123F3D]">Sign in</h1>
        <p className="mt-2 text-sm leading-6 text-[#5f7672]">
          Manage downloads, form submissions, and uploaded assets from one place.
        </p>

        {missingSetup ? (
          <div className="mt-5 border border-[#e6d7ab] bg-[#fbf4df] px-4 py-3 text-sm text-[#7a6332]">
            Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in your environment before using the admin.
          </div>
        ) : null}

        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
