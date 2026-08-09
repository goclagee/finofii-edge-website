import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { DPAContent } from './DPAContent';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/legal/dpa'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/legal/dpa',
  });
}

export default function DPAPage() {
  return <DPAContent />;
}
