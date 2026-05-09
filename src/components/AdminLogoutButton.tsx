'use client';

export default function AdminLogoutButton() {
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
    >
      Log out
    </button>
  );
}
