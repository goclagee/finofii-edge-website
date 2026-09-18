import type { Metadata } from 'next';
import type { PageSEO } from '@/types/seo';

export const SITE_NAME = 'Finofii Edge';
export const SITE_URL = 'https://finofii.com';
const DEFAULT_TITLE = 'Finofii Edge – Accounting & Bookkeeping For Growing Businesses';
const DEFAULT_DESCRIPTION = 'US-Focused Accounting, Bookkeeping And Virtual CFO Services For DTC Brands, Agencies, SaaS Startups And CPA Firms.';
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
    title: 'Finofii Edge – Accounting For Modern Businesses',
    description: 'Premium Accounting, Bookkeeping And Virtual CFO Services For DTC Brands, Agencies, SaaS Startups And CPA Firms.',
  },
  '/services': {
    title: 'Our Services – Finofii Edge',
    description: 'Bookkeeping, Visual Dashboards, Virtual CFO Advisory And Entity Compliance Services Tailored For Growing Businesses.',
  },
  '/services/bookkeeping': {
    title: 'Bookkeeping & Accounting – Finofii Edge',
    description: 'Monthly Bookkeeping, Reconciliation And Accounting Services With Integrations For QuickBooks, Xero, Ramp And More.',
  },
  '/services/dashboards': {
    title: 'Visual MIS & Dashboards – Finofii Edge',
    description: 'Custom Financial Dashboards And Report Catalogues Delivered Within 5 Business Days Of Month-End.',
  },
  '/services/cfo': {
    title: 'Virtual CFO & Advisory – Finofii Edge',
    description: 'Strategic Financial Guidance, Cash Flow Forecasting And Advisory Services For Scaling Businesses.',
  },
  '/services/entity': {
    title: 'Entity & Compliance – Finofii Edge',
    description: 'Entity Formation, State Filings And Ongoing Compliance Management Across Multiple Jurisdictions.',
  },
  '/pricing': {
    title: 'Pricing Plans – Finofii Edge',
    description: 'Transparent Pricing Tiers For Essentials, Growth And Scale Plans. Find The Right Fit For Your Business.',
  },
  '/dashboard': {
    title: 'Sample Dashboard – Finofii Edge',
    description: 'Explore Interactive Financial Dashboards With Live Charts, Month Toggles And Industry Presets.',
  },
  '/security': {
    title: 'Security & Compliance – Finofii Edge',
    description: 'SOC 2 Certified Security Controls, Data Handling Policies And Sub-Processor Transparency.',
  },
  '/book': {
    title: 'Book A Free Audit – Finofii Edge',
    description: 'Schedule Your Free Financial Audit Consultation. Quick Intake Form And Calendar Booking In Minutes.',
  },
  '/legal/privacy': {
    title: 'Privacy Policy – Finofii Edge',
    description: 'How Finofii Edge Collects, Uses And Protects Your Personal Information And Business Data.',
  },
  '/legal/terms': {
    title: 'Terms Of Service – Finofii Edge',
    description: 'Terms And Conditions Governing Your Use Of Finofii Edge Accounting And Advisory Services.',
  },
  '/legal/dpa': {
    title: 'Data Processing Agreement – Finofii Edge',
    description: 'Our Data Processing Agreement Outlining Responsibilities For Handling Your Business Data.',
  },
  '/legal/sub-processors': {
    title: 'Sub-Processors – Finofii Edge',
    description: 'Complete List Of Third-Party Sub-Processors Used By Finofii Edge For Data Processing.',
  },
  '/industries/dtc': {
    title: 'Accounting For DTC Brands – Finofii Edge',
    description: 'Specialized Bookkeeping And Financial Services For Direct-To-Consumer E-Commerce Brands.',
  },
  '/industries/agencies': {
    title: 'Accounting For Agencies – Finofii Edge',
    description: 'Financial Management Tailored For Creative And Digital Agencies With Project-Based Revenue.',
  },
  '/industries/saas': {
    title: 'Accounting For SaaS Startups – Finofii Edge',
    description: 'Revenue Recognition, MRR Tracking And Compliance Services For SaaS Companies.',
  },
  '/industries/cpa': {
    title: 'Services For CPA Firms – Finofii Edge',
    description: 'Outsourced Bookkeeping And Back-Office Support Designed For CPA Firms Scaling Their Practice.',
  },
  '/how-it-works': {
    title: 'How It Works – Finofii Edge',
    description: 'Our 14-Day Onboarding Process: From Signup To Full Financial Visibility In Two Weeks.',
  },
  '/case-studies': {
    title: 'Case Studies – Finofii Edge',
    description: 'Real Results From Real Businesses. Before-And-After Metrics From Our Accounting Clients.',
  },
  '/about': {
    title: 'About Us & Team – Finofii Edge',
    description: 'Meet The Team Behind Finofii Edge. Our Story, Values And Commitment To Your Financial Clarity.',
  },
  '/resources': {
    title: 'Resources & Blog – Finofii Edge',
    description: 'Guides, Blog Posts, Templates And A Tax Calendar To Help You Stay On Top Of Your Finances.',
  },
};
