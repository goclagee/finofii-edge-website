import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { SaaSContent } from './SaaSContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/industries/saas'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/industries/saas',
  });
}

export default function SaaSPage() {
  return <SaaSContent />;
}
