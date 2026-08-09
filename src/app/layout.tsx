import type { Metadata } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';
import { CompactHeader } from '@/components/layout/CompactHeader';
import { Footer } from '@/components/design-system/Footer';
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
    default: 'Finofii Edge — Accounting & Bookkeeping for Modern Businesses',
    template: '%s',
  },
  description:
    'Premium accounting, bookkeeping, and financial advisory services for DTC brands, agencies, SaaS startups, and CPA firms.',
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
      </body>
    </html>
  );
}
