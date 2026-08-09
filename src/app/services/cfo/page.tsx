import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { CFOContent } from './CFOContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/services/cfo'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/services/cfo',
  });
}

export default function CFOPage() {
  return <CFOContent />;
}
