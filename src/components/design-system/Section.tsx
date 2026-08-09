import { forwardRef, type HTMLAttributes, type ElementType } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** HTML element to render as (default: 'section') */
  as?: ElementType;
  /** Whether to apply the 12-column grid layout */
  grid?: boolean;
  /** Whether to use full-width background (content still constrained) */
  fullBleed?: boolean;
  /** Additional padding override */
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

const paddingStyles: Record<NonNullable<SectionProps['padding']>, string> = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
};

/**
 * Section component — a layout wrapper providing consistent max-width (1180px),
 * gutters (28px), optional 12-column grid, and vertical padding.
 * Used as the primary structural block for page sections.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as: Component = 'section',
    grid = false,
    fullBleed = false,
    padding = 'md',
    children,
    ariaLabel,
    ariaLabelledBy,
    className = '',
    ...rest
  },
  ref
) {
  const styles = [
    'max-w-[1180px] mx-auto px-[28px]',
    paddingStyles[padding],
    grid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[28px]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={styles}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Section;
