import type { Metadata } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';
import { CompactHeader } from '@/components/layout/CompactHeader';
import { Footer } from '@/components/design-system/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { PageTransitionWrapper } from './PageTransitionWrapper';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Finofiii Edge — Accounting & Bookkeeping For Modern Businesses',
    template: '%s',
  },
  description:
    'Premium Accounting, Bookkeeping And Financial Advisory Services For DTC Brands, Agencies, SaaS Startups And CPA Firms.',
  metadataBase: new URL('https://finofii.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <CompactHeader />
        <main className="flex-1 pt-18">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
