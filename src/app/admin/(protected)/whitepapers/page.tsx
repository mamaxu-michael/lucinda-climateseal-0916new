import AdminWhitepaperEditor from '@/components/AdminWhitepaperEditor';
import { listUploadedAssets } from '@/lib/admin-store';
import { listManagedWhitepapers } from '@/lib/whitepaper-admin-store';

export default async function AdminWhitepapersPage() {
  return (
    <AdminWhitepaperEditor
      whitepapers={listManagedWhitepapers()}
      assets={await listUploadedAssets()}
    />
  );
}
