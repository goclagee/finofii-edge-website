import { Metadata } from 'next';
import { generatePageSEO, PAGE_SEO_DATA } from '@/lib/seo';
import CaseStudiesClient from './CaseStudiesClient';

/** ISR: revalidate every 60 seconds */
export const revalidate = 60;

export function generateMetadata(): Metadata {
  const seoData = PAGE_SEO_DATA['/case-studies'];
  const seo = generatePageSEO({
    title: seoData.title,
    description: seoData.description,
    path: '/case-studies',
  });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
      url: seo.ogUrl,
    },
    alternates: {
      canonical: seo.canonical,
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
