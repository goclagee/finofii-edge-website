import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { HowItWorksContent } from './HowItWorksContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/how-it-works'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/how-it-works',
  });
}

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
