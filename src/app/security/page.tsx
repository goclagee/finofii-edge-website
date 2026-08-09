import type { Metadata } from 'next';
import { generateMetadataFromSEO, PAGE_SEO_DATA } from '@/lib/seo';
import { SecurityContent } from './SecurityContent';

const pageData = PAGE_SEO_DATA['/security'];

export const metadata: Metadata = generateMetadataFromSEO({
  title: pageData?.title ?? '',
  description: pageData?.description ?? '',
  path: '/security',
});

export default function SecurityPage() {
  return <SecurityContent />;
}
