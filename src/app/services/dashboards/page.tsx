import type { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import { DashboardsContent } from './DashboardsContent';

const seo = generatePageSEO({
  title: 'Visual MIS & Dashboards – Finofii Edge',
  description:
    'Custom financial dashboards and report catalogues delivered within 5 business days of month-end.',
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
