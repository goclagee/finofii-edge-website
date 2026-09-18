import type { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import { BookkeepingContent } from './BookkeepingContent';

const seo = generatePageSEO({
  title: 'Bookkeeping & Accounting – Finofii Edge',
  description:
    'Monthly bookkeeping, reconciliation and accounting services with integrations for QuickBooks, Xero, Ramp, Brex, Mercury and Stripe.',
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
