import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { TermsContent } from './TermsContent';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/legal/terms'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/legal/terms',
  });
}

export default function TermsPage() {
  return <TermsContent />;
}
