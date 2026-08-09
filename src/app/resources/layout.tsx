import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const pageData = PAGE_SEO_DATA['/resources'];
  return generateMetadataFromSEO({
    title: pageData?.title ?? '',
    description: pageData?.description ?? '',
    path: '/resources',
  });
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
