import type { Metadata } from 'next';
import type { PageSEO } from '@/types/seo';

export const SITE_NAME = 'Finofii Edge';
export const SITE_URL = 'https://finofii.com';
const DEFAULT_TITLE = 'Finofii Edge – Accounting & Bookkeeping for Growing Businesses';
const DEFAULT_DESCRIPTION = 'US-focused accounting, bookkeeping, and Virtual CFO Services for DTC brands, agencies, SaaS startups, and CPA firms.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Truncates a string to maxLength, appending "…" if truncated.
 * Ensures the result does not exceed maxLength characters.
 */
export function truncateWithEllipsis(text: string, maxLength: number): string {
  if (maxLength <= 0) return '';
  if (text.length <= maxLength) return text;
  if (maxLength <= 1) return '…';
  return text.slice(0, maxLength - 1) + '…';
}

/**
 * Generates SEO metadata for a given page.
 * Truncates title to 60 chars and description to 160 chars.
 * Falls back to site-wide defaults if inputs are empty/missing.
 */
export function generatePageSEO(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): PageSEO {
  const rawTitle = input.title.trim() || DEFAULT_TITLE;
  const rawDescription = input.description.trim() || DEFAULT_DESCRIPTION;
  const ogImage = input.ogImage?.trim() || DEFAULT_OG_IMAGE;
  const fullUrl = `${SITE_URL}${input.path}`;

  const title = truncateWithEllipsis(rawTitle, 60);
  const description = truncateWithEllipsis(rawDescription, 160);

  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: fullUrl,
    canonical: fullUrl,
  };
}

/**
 * Converts PageSEO output to Next.js Metadata object for use in generateMetadata.
 * Falls back to site-wide defaults when inputs are missing.
 */
export function generateMetadataFromSEO(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const seo = generatePageSEO(input);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.ogUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
    },
  };
}

/**
 * All public page routes for the Finofii Edge website (16 pages).
 */
export const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/services/bookkeeping',
  '/services/dashboards',
  '/services/cfo',
  '/services/entity',
  '/pricing',
  '/dashboard',
  '/security',
  '/book',
  '/legal/privacy',
  '/legal/terms',
  '/legal/dpa',
  '/legal/sub-processors',
  '/industries/dtc',
  '/industries/agencies',
  '/industries/saas',
  '/industries/cpa',
  '/how-it-works',
  '/case-studies',
  '/about',
  '/resources',
] as const;

/**
 * Page-specific SEO data for all public routes.
 * Each entry provides a unique title (≤60 chars), description (≤160 chars), and path.
 */
export const PAGE_SEO_DATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Finofii Edge – Accounting for Modern Businesses',
    description: 'Premium accounting, bookkeeping, and Virtual CFO Services for DTC brands, agencies, SaaS startups, and CPA firms.',
  },
  '/services': {
    title: 'Our Services – Finofii Edge',
    description: 'Bookkeeping, visual dashboards, virtual CFO advisory, and entity compliance services tailored for growing businesses.',
  },
  '/services/bookkeeping': {
    title: 'Bookkeeping & Close – Finofii Edge',
    description: 'Monthly bookkeeping, reconciliation, and close services with integrations for QuickBooks, Xero, Ramp, and more.',
  },
  '/services/dashboards': {
    title: 'Visual MIS & Dashboards – Finofii Edge',
    description: 'Custom financial dashboards and report catalogues delivered within 5 business days of month-end.',
  },
  '/services/cfo': {
    title: 'Virtual CFO & Advisory – Finofii Edge',
    description: 'Strategic financial guidance, cash flow forecasting, and advisory services for scaling businesses.',
  },
  '/services/entity': {
    title: 'Entity & Compliance – Finofii Edge',
    description: 'Entity formation, state filings, and ongoing compliance management across multiple jurisdictions.',
  },
  '/pricing': {
    title: 'Pricing Plans – Finofii Edge',
    description: 'Transparent pricing tiers for Essentials, Growth, and Scale plans. Find the right fit for your business.',
  },
  '/dashboard': {
    title: 'Sample Dashboard – Finofii Edge',
    description: 'Explore interactive financial dashboards with live charts, month toggles, and industry presets.',
  },
  '/security': {
    title: 'Security & Compliance – Finofii Edge',
    description: 'SOC 2 certified security controls, data handling policies, and sub-processor transparency.',
  },
  '/book': {
    title: 'Book a Free Audit – Finofii Edge',
    description: 'Schedule your free financial audit consultation. Quick intake form and calendar booking in minutes.',
  },
  '/legal/privacy': {
    title: 'Privacy Policy – Finofii Edge',
    description: 'How Finofii Edge collects, uses, and protects your personal information and business data.',
  },
  '/legal/terms': {
    title: 'Terms of Service – Finofii Edge',
    description: 'Terms and conditions governing your use of Finofii Edge accounting and advisory services.',
  },
  '/legal/dpa': {
    title: 'Data Processing Agreement – Finofii Edge',
    description: 'Our data processing agreement outlining responsibilities for handling your business data.',
  },
  '/legal/sub-processors': {
    title: 'Sub-Processors – Finofii Edge',
    description: 'Complete list of third-party sub-processors used by Finofii Edge for data processing.',
  },
  '/industries/dtc': {
    title: 'Accounting for DTC Brands – Finofii Edge',
    description: 'Specialized bookkeeping and financial services for direct-to-consumer e-commerce brands.',
  },
  '/industries/agencies': {
    title: 'Accounting for Agencies – Finofii Edge',
    description: 'Financial management tailored for creative and digital agencies with project-based revenue.',
  },
  '/industries/saas': {
    title: 'Accounting for SaaS Startups – Finofii Edge',
    description: 'Revenue recognition, MRR tracking, and compliance services for SaaS companies.',
  },
  '/industries/cpa': {
    title: 'Services for CPA Firms – Finofii Edge',
    description: 'Outsourced bookkeeping and back-office support designed for CPA firms scaling their practice.',
  },
  '/how-it-works': {
    title: 'How It Works – Finofii Edge',
    description: 'Our 14-day onboarding process: from signup to full financial visibility in two weeks.',
  },
  '/case-studies': {
    title: 'Case Studies – Finofii Edge',
    description: 'Real results from real businesses. Before-and-after metrics from our accounting clients.',
  },
  '/about': {
    title: 'About Us & Team – Finofii Edge',
    description: 'Meet the team behind Finofii Edge. Our story, values, and commitment to your financial clarity.',
  },
  '/resources': {
    title: 'Resources & Blog – Finofii Edge',
    description: 'Guides, blog posts, templates, and a tax calendar to help you stay on top of your finances.',
  },
};
