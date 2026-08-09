'use client';

import React from 'react';
import { AccessibleTable, type AccessibleTableRow } from './AccessibleTable';
import type { ChartDataPoint } from '@/types/dashboard';

export interface ChartContainerProps {
  /** Title displayed above the chart */
  title: string;
  /** Optional description text below the title */
  description?: string;
  /** Chart data points (used for ARIA labeling) */
  data: ChartDataPoint[];
  /** Data rows for the hidden accessible table */
  accessibleTableData: AccessibleTableRow[];
  /** Chart component(s) to render inside the container */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

/**
 * ChartContainer wraps chart components with:
 * - A title and optional description
 * - A responsive wrapper that adapts from 320px to 1440px
 * - A visually hidden accessible data table for screen readers
 *
 * Requirements: 8.1, 8.6, 22.3
 */
export function ChartContainer({
  title,
  description,
  data,
  accessibleTableData,
  children,
  className,
}: ChartContainerProps) {
  const chartId = `chart-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      className={`relative w-full ${className ?? ''}`}
      aria-labelledby={`${chartId}-title`}
      role="group"
    >
      {/* Header */}
      <div className="mb-4">
        <h3
          id={`${chartId}-title`}
          className="text-h4 text-ink"
        >
          {title}
        </h3>
        {description && (
          <p className="text-small text-ink/70 mt-1">{description}</p>
        )}
      </div>

      {/* Responsive chart wrapper */}
      <div
        className="w-full min-h-[200px]"
        style={{ minWidth: '100%', maxWidth: '100%' }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Accessible data table (visually hidden, available to screen readers) */}
      <AccessibleTable
        caption={`Data table for ${title}${description ? `: ${description}` : ''}`}
        data={accessibleTableData}
      />
    </section>
  );
}
