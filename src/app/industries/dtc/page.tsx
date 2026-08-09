import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { DTCContent } from './DTCContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/industries/dtc'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/industries/dtc',
  });
}

export default function DTCPage() {
  return <DTCContent />;
}
