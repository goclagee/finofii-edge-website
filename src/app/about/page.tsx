import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { AboutContent } from './AboutContent';

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/about'];
  return generateMetadataFromSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/about',
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
