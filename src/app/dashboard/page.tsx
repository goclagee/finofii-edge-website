import { Metadata } from 'next';
import { generatePageSEO } from '@/lib/seo';
import DashboardClient from './DashboardClient';

/** ISR: revalidate every 60 seconds */
export const revalidate = 60;

export function generateMetadata(): Metadata {
  const seo = generatePageSEO({
    title: 'Sample Dashboard – Finofii Edge',
    description:
      'Explore interactive financial dashboards with live charts, month toggles, and industry presets.',
    path: '/dashboard',
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

export default function DashboardPage() {
  return <DashboardClient />;
}
