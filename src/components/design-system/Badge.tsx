import { forwardRef, type HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'brass' | 'flag' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  ariaLabel?: string;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-ink/10 text-ink',
  accent: 'bg-accent/15 text-accent',
  brass: 'bg-brass/15 text-brass',
  flag: 'bg-flag/15 text-flag',
  outline: 'bg-transparent border border-ink/20 text-ink',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

/**
 * Badge component for category labels, status indicators, and tags.
 * Supports multiple color variants and sizes with a pill shape.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'default',
    size = 'md',
    children,
    ariaLabel,
    className = '',
    ...rest
  },
  ref
) {
  const styles = [
    'inline-flex items-center font-medium rounded-full whitespace-nowrap',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={ref}
      className={styles}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
      {...rest}
    >
      {children}
    </span>
  );
});

export default Badge;
