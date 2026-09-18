import Link from 'next/link';
import Image from 'next/image';
import { NewsletterSignup } from '../forms/NewsletterSignup';

export interface FooterProps {
  /** Override current year for testing */
  year?: number;
}

const sitemapLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Book A Free Audit', href: '/book' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms Of Service', href: '/legal/terms' },
  { label: 'DPA', href: '/legal/dpa' },
  { label: 'Sub-Processors', href: '/legal/sub-processors' },
];

/**
 * Footer component with sitemap links, social media icons (LinkedIn, Twitter/X),
 * legal page links, and a newsletter signup placeholder.
 * Rendered on all pages via the root layout.
 */
export function Footer({ year }: FooterProps) {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper mt-auto" role="contentinfo">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4" aria-label="Finofiii Edge home">
              <Image
                src="/images/logos/finofii-edge-white.svg"
                alt="Finofiii Edge"
                width={160}
                height={46}
                unoptimized
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-paper/70 text-sm mb-6">
              Premium Accounting &amp; Bookkeeping For Modern Businesses.
            </p>

            {/* Newsletter signup form */}
            <div className="max-w-[260px]">
              <NewsletterSignup />
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-paper mb-4 uppercase tracking-wider">
              Pages
            </h3>
            <ul className="space-y-2" role="list">
              {sitemapLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/70 hover:text-paper transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-paper mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/70 hover:text-paper transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-paper/50">
            &copy; {currentYear} Finofiii Edge. All Rights Reserved.
          </p>
          <p className="text-sm text-paper/50">
            Built With Precision For Modern Businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
