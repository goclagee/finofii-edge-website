'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

export interface LightboxProps {
  /** Whether the lightbox is open */
  isOpen: boolean;
  /** Called when the lightbox should close */
  onClose: () => void;
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** Additional class name */
  className?: string;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Lightbox component for displaying images at full resolution.
 * Closes on:
 * - Overlay background click
 * - Close button click
 * - Escape key press
 *
 * Includes focus trap within the lightbox when open.
 * Prevents body scroll when open.
 */
export function Lightbox({
  isOpen,
  onClose,
  src,
  alt,
  className = '',
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store previously focused element when opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus close button when opened
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const closeBtn = panelRef.current.querySelector<HTMLElement>(
        'button[aria-label="Close lightbox"]'
      );
      if (closeBtn) {
        closeBtn.focus();
      }
    }
  }, [isOpen]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements =
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    []
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={[
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        className,
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${alt}`}
      onKeyDown={handleKeyDown}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-ink/80 transition-opacity duration-200"
        aria-hidden="true"
        onClick={handleOverlayClick}
      />

      {/* Content */}
      <div className="relative z-10 max-w-full max-h-full flex flex-col items-center">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className={[
            'absolute -top-12 right-0 inline-flex items-center justify-center',
            'h-10 w-10 rounded-full',
            'text-white/80 hover:text-white hover:bg-white/10',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink/80',
          ].join(' ')}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative max-w-full max-h-[80vh] w-[90vw] h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain rounded-lg shadow-2xl"
            sizes="90vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
