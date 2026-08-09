'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'pricing';
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-paper border border-ink/10 shadow-sm',
  elevated: 'bg-paper border border-ink/10 shadow-lg',
  interactive:
    'bg-paper border border-ink/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer',
  pricing:
    'bg-paper border-2 border-ink/10 shadow-md hover:border-accent transition-colors duration-300',
};

/**
 * Card component with variant styling and expandable support.
 * Supports default, elevated, interactive, and pricing variants.
 * When expandable, provides a toggle button with ARIA attributes.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'default',
    expandable = false,
    expanded = false,
    onToggle,
    children,
    ariaLabel,
    className = '',
    ...rest
  },
  ref
) {
  const baseStyles = [
    'rounded-[14px] p-6',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (expandable) {
    return (
      <div ref={ref} className={baseStyles} {...rest}>
        <button
          type="button"
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-[14px]"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle?.();
            }
          }}
          aria-expanded={expanded}
          aria-label={ariaLabel || 'Toggle card content'}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">{children}</div>
            <span
              className={`ml-2 transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </button>
        {expanded && (
          <div
            className="mt-4 animate-[fadeIn_300ms_ease-out]"
            role="region"
            aria-label="Expanded content"
          >
            {/* Expanded content slot managed by parent */}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseStyles}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Card;
