import type { Metadata } from 'next';
import { generatePageSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { EntityContent } from './EntityContent';

const pageData = PAGE_SEO_DATA['/services/entity'];

const seo = generatePageSEO({
  title: pageData?.title ?? 'Entity & Compliance – Finofii Edge',
  description:
    pageData?.description ??
    'Entity formation, state filings, and ongoing compliance management across multiple jurisdictions.',
  path: '/services/entity',
});

export function generateMetadata(): Metadata {
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

export default function EntityPage() {
  return <EntityContent />;
}
