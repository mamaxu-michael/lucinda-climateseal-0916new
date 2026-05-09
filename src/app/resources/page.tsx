import ResourcesPageClient from '@/components/ResourcesPageClient';
import { getAllCategories, getAllWhitepapers, getMeaningfulArticles } from '@/lib/content';

export default function ResourcesPage() {
  return (
    <ResourcesPageClient
      categories={getAllCategories()}
      articles={getMeaningfulArticles()}
      whitepapers={getAllWhitepapers()}
    />
  );
}
