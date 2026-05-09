import AdminArticleEditor from '@/components/AdminArticleEditor';
import { listManagedArticles } from '@/lib/article-admin-store';
import { getAllCategories } from '@/lib/content';
import { listUploadedAssets } from '@/lib/admin-store';

export default async function AdminArticlesPage() {
  return (
    <AdminArticleEditor
      categories={getAllCategories()}
      articles={listManagedArticles()}
      assets={await listUploadedAssets()}
    />
  );
}
