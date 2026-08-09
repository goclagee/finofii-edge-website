import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { PrivacyContent } from './PrivacyContent';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/legal/privacy'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/legal/privacy',
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
