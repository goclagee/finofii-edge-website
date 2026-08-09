'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Button } from '../design-system/Button';

export interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
}

/**
 * Full-screen mobile navigation overlay.
 * Expands/collapses within 300ms. Visible only at viewports <768px.
 * Closes on link click or close button tap.
 */
export function MobileNavOverlay({
  isOpen,
  onClose,
  links,
}: MobileNavOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when overlay opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      id="mobile-nav-overlay"
      className={[
        'fixed inset-0 z-[100] md:hidden',
        'bg-paper flex flex-col',
        'transition-all duration-300 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
    >
      {/* Header with close button */}
      <div className="container-content flex items-center justify-between h-18">
        <span className="font-display text-xl font-bold text-ink">
          Finofii<span className="text-accent">Edge</span>
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          className="flex items-center justify-center w-10 h-10"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation links */}
      <nav className="container-content flex-1 flex flex-col justify-center" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-6" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-2xl font-display font-semibold text-ink hover:text-accent transition-colors duration-150"
                onClick={onClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mt-10">
          <Button
            variant="accent"
            size="lg"
            href="/book"
            className="w-full"
            onClick={onClose}
          >
            Book a Free Audit
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default MobileNavOverlay;
