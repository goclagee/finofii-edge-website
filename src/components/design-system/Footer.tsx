import Link from 'next/link';
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
  { label: 'Book a Free Audit', href: '/book' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'DPA', href: '/legal/dpa' },
  { label: 'Sub-processors', href: '/legal/sub-processors' },
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
            <Link href="/" className="inline-block mb-4" aria-label="Finofii Edge home">
              <span className="font-display text-xl font-bold text-paper">
                Finofii<span className="text-accent">Edge</span>
              </span>
            </Link>
            <p className="text-paper/70 text-sm mb-6">
              Premium accounting &amp; bookkeeping for modern businesses.
            </p>

            {/* Newsletter signup form */}
            <div className="max-w-[260px]">
              <NewsletterSignup />
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="lg:col-span-3">
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
          <div className="lg:col-span-3">
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

          {/* Social Media Icons */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-paper mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20 transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-paper/50">
            &copy; {currentYear} Finofii Edge. All rights reserved.
          </p>
          <p className="text-sm text-paper/50">
            Built with precision for modern businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
