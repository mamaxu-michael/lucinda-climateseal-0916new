import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { listContactSubmissions, listReferralUses, listWhitepaperSubmissions } from '@/lib/admin-store';

function escapeCsv(value: unknown): string {
  const stringValue = String(value ?? '');
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function rowsToCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) {
    return '';
  }

  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(',')),
  ];

  return csvRows.join('\n');
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get('type');
  if (type !== 'contacts' && type !== 'whitepapers' && type !== 'referrals') {
    return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
  }

  const rows = type === 'contacts'
    ? await listContactSubmissions()
    : type === 'whitepapers'
      ? await listWhitepaperSubmissions()
      : await listReferralUses();

  const csv = rowsToCsv(rows as Record<string, unknown>[]);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${type}-export.csv"`,
    },
  });
}
