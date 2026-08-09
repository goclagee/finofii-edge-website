import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { AgenciesContent } from './AgenciesContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/industries/agencies'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/industries/agencies',
  });
}

export default function AgenciesPage() {
  return <AgenciesContent />;
}
