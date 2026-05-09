import Link from 'next/link';

const items = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/whitepapers', label: 'Whitepapers' },
  { href: '/admin/referrals', label: 'Referrals' },
  { href: '/admin/forms', label: 'Contact Forms' },
  { href: '/admin/downloads', label: 'Whitepaper Downloads' },
  { href: '/admin/assets', label: 'Assets' },
];

export default function AdminNav() {
  return (
    <nav className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
