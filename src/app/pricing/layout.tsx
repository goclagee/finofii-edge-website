import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/pricing'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/pricing',
  });
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
