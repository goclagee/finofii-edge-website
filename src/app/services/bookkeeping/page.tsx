import type { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import { BookkeepingContent } from './BookkeepingContent';

const seo = generatePageSEO({
  title: 'Bookkeeping & Accounting – Finofiii Edge',
  description:
    'Monthly Bookkeeping, Reconciliation And Accounting Services With Integrations For QuickBooks, Xero, Ramp, Brex, Mercury And Stripe.',
  path: '/services/bookkeeping',
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

export default function BookkeepingPage() {
  return <BookkeepingContent />;
}
