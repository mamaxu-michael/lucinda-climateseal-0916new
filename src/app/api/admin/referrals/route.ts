import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import {
  listReferralOwners,
  saveReferralOwner,
  updateReferralOwner,
  updateReferralUse,
} from '@/lib/admin-store';

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim().toLowerCase();
  const company = String(body?.company ?? '').trim();
  const role = String(body?.role ?? 'other').trim() as
    | 'expert'
    | 'consultant'
    | 'brand_manager'
    | 'procurement_manager'
    | 'other';
  const notes = String(body?.notes ?? '').trim();
  const referralCode = normalizeCode(String(body?.referralCode ?? ''));

  if (!name || !email || !referralCode) {
    return NextResponse.json({ error: 'Name, email, and referral code are required' }, { status: 400 });
  }

  const existingOwners = await listReferralOwners();
  if (existingOwners.some((owner) => owner.referralCode.toUpperCase() === referralCode)) {
    return NextResponse.json({ error: 'Referral code already exists' }, { status: 400 });
  }

  await saveReferralOwner({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    company,
    role,
    referralCode,
    status: 'active',
    notes,
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const targetType = String(body?.targetType ?? '');
  const id = String(body?.id ?? '');

  if (!targetType || !id) {
    return NextResponse.json({ error: 'Missing target type or id' }, { status: 400 });
  }

  if (targetType === 'owner') {
    const nextStatus = String(body?.status ?? '').trim();
    if (nextStatus !== 'active' && nextStatus !== 'inactive') {
      return NextResponse.json({ error: 'Invalid owner status' }, { status: 400 });
    }

    await updateReferralOwner(id, { status: nextStatus });
    return NextResponse.json({ success: true });
  }

  if (targetType === 'use') {
    const nextStatus = String(body?.status ?? '').trim();
    const notes = typeof body?.notes === 'string' ? body.notes.trim() : undefined;
    if (!['new', 'qualified', 'converted', 'credited', 'rejected'].includes(nextStatus)) {
      return NextResponse.json({ error: 'Invalid referral status' }, { status: 400 });
    }

    await updateReferralUse(id, { status: nextStatus as 'new' | 'qualified' | 'converted' | 'credited' | 'rejected', notes });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid target type' }, { status: 400 });
}
