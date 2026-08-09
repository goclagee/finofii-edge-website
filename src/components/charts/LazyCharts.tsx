'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-loaded chart components to reduce initial page bundle size.
 * Charts are loaded only when rendered (typically below the fold),
 * reducing the main bundle by deferring the recharts dependency.
 */

export const LazyLineChart = dynamic(
  () => import('./LineChart').then((mod) => ({ default: mod.FinancialLineChart })),
  {
    loading: () => (
      <div
        className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse"
        aria-label="Loading chart..."
        role="img"
      />
    ),
    ssr: false,
  }
);

export const LazyBarChart = dynamic(
  () => import('./BarChart').then((mod) => ({ default: mod.FinancialBarChart })),
  {
    loading: () => (
      <div
        className="w-full h-[320px] bg-ink/5 rounded-[14px] animate-pulse"
        aria-label="Loading chart..."
        role="img"
      />
    ),
    ssr: false,
  }
);

export const LazyChartContainer = dynamic(
  () => import('./ChartContainer').then((mod) => ({ default: mod.ChartContainer })),
  {
    loading: () => (
      <div
        className="w-full bg-ink/5 rounded-[14px] animate-pulse p-6"
        aria-label="Loading chart container..."
        role="img"
      >
        <div className="h-6 bg-ink/10 rounded w-48 mb-4" />
        <div className="h-[280px] bg-ink/10 rounded" />
      </div>
    ),
    ssr: false,
  }
);

export const LazyMetricCard = dynamic(
  () => import('./MetricCard').then((mod) => ({ default: mod.MetricCard })),
  {
    loading: () => (
      <div
        className="bg-paper border border-ink/10 rounded-[14px] p-5 animate-pulse"
        aria-label="Loading metric..."
        role="img"
      >
        <div className="h-4 bg-ink/10 rounded w-20 mb-3" />
        <div className="h-8 bg-ink/10 rounded w-28" />
      </div>
    ),
    ssr: false,
  }
);
