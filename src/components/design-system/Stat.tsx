'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** The numeric value to display */
  value: string | number;
  /** Label describing the metric */
  label: string;
  /** Prefix before the value (e.g., "$") */
  prefix?: string;
  /** Suffix after the value (e.g., "%", "+") */
  suffix?: string;
  /** Trend direction for optional indicator */
  trend?: 'up' | 'down' | 'flat';
  /** Trend value (e.g., percentage change) */
  trendValue?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: { value: 'text-2xl', label: 'text-sm' },
  md: { value: 'text-4xl', label: 'text-base' },
  lg: { value: 'text-5xl', label: 'text-lg' },
};

const trendIcons: Record<NonNullable<StatProps['trend']>, { icon: string; color: string }> = {
  up: { icon: '↑', color: 'text-accent' },
  down: { icon: '↓', color: 'text-flag' },
  flat: { icon: '→', color: 'text-ink/60' },
};

/**
 * Stat component for metric callouts. Renders numeric values in IBM Plex Mono
 * (via the font-data class / data-numeric attribute) for consistent number
 * presentation. Supports trend indicators and multiple sizes.
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  {
    value,
    label,
    prefix = '',
    suffix = '',
    trend,
    trendValue,
    size = 'md',
    className = '',
    ...rest
  },
  ref
) {
  const sizes = sizeStyles[size];

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-1 ${className}`}
      {...rest}
    >
      {/* Numeric value in IBM Plex Mono */}
      <div
        className={[
          sizes.value,
          'font-semibold tracking-tight',
          'font-data',
        ].join(' ')}
        data-numeric="true"
        aria-label={`${label}: ${prefix}${value}${suffix}`}
      >
        {prefix && <span className="text-ink/70">{prefix}</span>}
        <span>{value}</span>
        {suffix && <span className="text-ink/70">{suffix}</span>}
      </div>

      {/* Label */}
      <p className={`${sizes.label} text-ink/70 font-medium m-0`}>
        {label}
      </p>

      {/* Trend indicator */}
      {trend && trendValue && (
        <div
          className={`flex items-center gap-1 text-sm ${trendIcons[trend].color}`}
          aria-label={`Trend: ${trend} ${trendValue}`}
        >
          <span aria-hidden="true">{trendIcons[trend].icon}</span>
          <span className="font-data" data-numeric="true">
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
});

export default Stat;
