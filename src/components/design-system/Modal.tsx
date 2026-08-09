'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';

export interface ModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Title displayed in the modal header */
  title: string;
  /** Content rendered inside the modal body */
  children: ReactNode;
  /** Whether to trap focus within the modal (default: true) */
  trapFocus?: boolean;
  /** Whether to return focus to trigger on close (default: true) */
  returnFocus?: boolean;
  /** Whether clicking the overlay closes the modal (default: true) */
  closeOnOverlay?: boolean;
  /** Whether pressing Escape closes the modal (default: true) */
  closeOnEscape?: boolean;
  /** Additional class name for the modal panel */
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
 * Modal component with focus trap, Escape close, overlay close, and
 * focus restoration. Accessible with proper ARIA attributes.
 *
 * - Focus is trapped within the modal when open (Tab/Shift+Tab cycle)
 * - Escape key closes the modal
 * - Clicking the overlay backdrop closes the modal
 * - Focus returns to the triggering element on close
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    isOpen,
    onClose,
    title,
    children,
    trapFocus = true,
    returnFocus = true,
    closeOnOverlay = true,
    closeOnEscape = true,
    className = '',
  },
  ref
) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element when opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus the first focusable element in the modal when opened
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        panelRef.current.focus();
      }
    }
  }, [isOpen]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && returnFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen, returnFocus]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
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
      if (!trapFocus || e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements =
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [trapFocus]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlay && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlay, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 transition-opacity duration-200"
        aria-hidden="true"
        onClick={handleOverlayClick}
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={[
          'relative z-10 w-full max-w-lg mx-4',
          'bg-paper rounded-[14px] shadow-2xl',
          'animate-[fadeIn_200ms_ease-out]',
          className,
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-ink m-0"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={[
              'inline-flex items-center justify-center',
              'h-8 w-8 rounded-full',
              'text-ink/60 hover:text-ink hover:bg-ink/5',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
            ].join(' ')}
          >
            <svg
              className="h-5 w-5"
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
        </div>

        {/* Body */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
