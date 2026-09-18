import type { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import { ServicesContent } from './ServicesContent';

const seo = generatePageSEO({
  title: 'Services — Finofiii Edge',
  description:
    'Explore Our Four Core Capabilities: Bookkeeping & Accounting, Visual MIS & Dashboards, Virtual CFO & Advisory And Entity & Compliance.',
  path: '/services',
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

export default function ServicesPage() {
  return <ServicesContent />;
}
