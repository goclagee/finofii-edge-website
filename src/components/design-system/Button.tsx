'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  magnetic?: boolean;
  href?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ink text-paper hover:bg-ink/90 focus-visible:ring-ink',
  secondary:
    'bg-paper text-ink border-2 border-ink hover:bg-ink/5 focus-visible:ring-ink',
  ghost: 'bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink',
  accent: 'bg-accent text-ink hover:bg-accent/90 focus-visible:ring-ink',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base font-medium',
};

/**
 * Button component with variant styling, sizes, loading/disabled states,
 * magnetic cursor effect prop, and automatic Link rendering when href is provided.
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    magnetic = false,
    href,
    children,
    ariaLabel,
    className = '',
    onClick,
    ...rest
  },
  ref
) {
  const baseStyles = [
    'inline-flex items-center justify-center gap-2',
    'rounded-[14px] font-medium',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const spinner = loading ? (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  ) : null;

  const content = (
    <>
      {spinner}
      {children}
    </>
  );

  // Render as Next.js Link when href is provided and not disabled
  if (href && !disabled && !loading) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        aria-label={ariaLabel}
        data-magnetic={magnetic || undefined}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={baseStyles}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      data-magnetic={magnetic || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
