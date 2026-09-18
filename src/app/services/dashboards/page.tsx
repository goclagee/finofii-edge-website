import type { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import { DashboardsContent } from './DashboardsContent';

const seo = generatePageSEO({
  title: 'Visual MIS & Dashboards – Finofiii Edge',
  description:
    'Custom Financial Dashboards And Report Catalogues Delivered Within 5 Business Days Of Month-End.',
  path: '/services/dashboards',
});

export const metadata: Metadata = {
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

export default function DashboardsPage() {
  return <DashboardsContent />;
}
