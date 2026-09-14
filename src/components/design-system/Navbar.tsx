'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { MobileNavOverlay } from '../layout/MobileNavOverlay';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  /** Override default nav links */
  links?: NavLink[];
  /** Whether the navbar is in compact/condensed state */
  compact?: boolean;
  /** Scroll progress (0–1) for progressive background transition */
  scrollProgress?: number;
}

const defaultLinks: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
];

/**
 * Navbar component with logo, page links, and primary CTA button.
 * Fixed at the top of the viewport. Transitions to compact state on scroll.
 * Renders a hamburger menu on viewports below 768px.
 */
export function Navbar({ links = defaultLinks, compact = false, scrollProgress = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Progressive background opacity based on scroll progress (0 to 1)
  const bgOpacity = 0.9 + scrollProgress * 0.05; // 0.90 → 0.95
  const blurAmount = scrollProgress > 0.5 ? 'backdrop-blur-md' : 'backdrop-blur-sm';

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-200 ease-out',
          blurAmount,
          compact
            ? 'h-14 shadow-sm'
            : 'h-18',
        ].join(' ')}
        style={{
          backgroundColor: `rgb(244 242 236 / ${bgOpacity})`,
        }}
        role="banner"
      >
        <nav
          className="container-content flex items-center justify-between h-full"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Finofii Edge home"
          >
            <Image
              src="/images/logos/finofii-edge-navy.svg"
              alt="Finofii Edge"
              width={140}
              height={40}
              priority
              unoptimized
              className={[
                'w-auto transition-all duration-200 ease-out',
                compact ? 'h-7' : 'h-9',
              ].join(' ')}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    'text-ink/80 hover:text-ink transition-colors duration-150',
                    'text-sm font-medium',
                    compact ? 'text-xs' : '',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button
                variant="accent"
                size={compact ? 'sm' : 'md'}
                href="/book"
              >
                Book a Free Audit
              </Button>
            </div>

            {/* Hamburger Menu Button (mobile only) */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-overlay"
            >
              <span className="block w-6 h-0.5 bg-ink rounded-full transition-transform" />
              <span className="block w-6 h-0.5 bg-ink rounded-full transition-transform" />
              <span className="block w-4 h-0.5 bg-ink rounded-full transition-transform" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={links}
      />
    </>
  );
}

export default Navbar;
