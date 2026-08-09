export interface GridContainerProps {
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Custom column configuration override. Defaults to responsive 12/2/1 */
  columns?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
  /** Gap between grid items. Defaults to gutter size (28px) */
  gap?: string;
}

/**
 * Responsive grid container that adapts columns based on viewport:
 * - Desktop (>1024px): 12 columns
 * - Tablet (768px–1024px): 2 columns
 * - Mobile (<768px): 1 column
 *
 * Uses the design system's content max-width and gutters.
 */
export function GridContainer({
  children,
  className = '',
  columns,
  gap,
}: GridContainerProps) {
  const desktopCols = columns?.desktop ?? 12;
  const tabletCols = columns?.tablet ?? 2;
  const mobileCols = columns?.mobile ?? 1;

  return (
    <div
      className={[
        'container-content',
        'grid',
        `grid-cols-${mobileCols}`,
        `md:grid-cols-${tabletCols}`,
        `lg:grid-cols-${desktopCols}`,
        gap ? `gap-[${gap}]` : 'gap-7',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export default GridContainer;
