import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { SubProcessorsContent } from './SubProcessorsContent';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/legal/sub-processors'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/legal/sub-processors',
  });
}

export default function SubProcessorsPage() {
  return <SubProcessorsContent />;
}
