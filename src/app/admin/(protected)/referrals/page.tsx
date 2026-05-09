import AdminReferralManager from '@/components/AdminReferralManager';
import { listReferralOwners, listReferralUses } from '@/lib/admin-store';

export default async function AdminReferralsPage() {
  const [owners, uses] = await Promise.all([listReferralOwners(), listReferralUses()]);

  return <AdminReferralManager owners={owners} uses={uses} />;
}
