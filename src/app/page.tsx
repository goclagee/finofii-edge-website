import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generatePageSEO } from '@/lib/seo';
import { HeroSection } from './home/HeroSection';

// Lazy-load below-fold sections to reduce initial bundle size
const SocialProofSection = dynamic(
  () => import('./home/SocialProofSection').then((mod) => ({ default: mod.SocialProofSection })),
  { loading: () => <div className="min-h-[400px]" /> }
);

const ServicesOverviewSection = dynamic(
  () => import('./home/ServicesOverviewSection').then((mod) => ({ default: mod.ServicesOverviewSection })),
  { loading: () => <div className="min-h-[300px]" /> }
);

const ComplianceTrustBar = dynamic(
  () => import('./home/ComplianceTrustBar').then((mod) => ({ default: mod.ComplianceTrustBar })),
  { loading: () => <div className="min-h-[100px]" /> }
);

const FinalCTASection = dynamic(
  () => import('./home/FinalCTASection').then((mod) => ({ default: mod.FinalCTASection })),
  { loading: () => <div className="min-h-[300px]" /> }
);

export function generateMetadata(): Metadata {
  const seo = generatePageSEO({
    title: 'Finofii Edge – Accounting & Bookkeeping For Growing Businesses',
    description:
      'US-Focused Accounting, Bookkeeping And Virtual CFO Services For DTC Brands, Agencies, SaaS Startups And CPA Firms.',
    path: '/',
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ServicesOverviewSection />
      <ComplianceTrustBar />
      <FinalCTASection />
    </>
  );
}
