import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { CPAContent } from './CPAContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/industries/cpa'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/industries/cpa',
  });
}

export default function CPAPage() {
  return <CPAContent />;
}
