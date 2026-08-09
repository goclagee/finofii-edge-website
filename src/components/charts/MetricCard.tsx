'use client';

import React from 'react';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import type { SummaryMetric } from '@/types/dashboard';

export interface MetricCardProps {
  /** The summary metric to display */
  metric: SummaryMetric;
  /** Whether to animate the counter on viewport entry. Default: true */
  animateOnView?: boolean;
  /** Animation duration in ms. Default: 1500 */
  animationDuration?: number;
  /** Additional class name */
  className?: string;
}

/** Trend arrow indicators */
function TrendIndicator({ trend, trendValue }: { trend: 'up' | 'down' | 'flat'; trendValue: number }) {
  const colors = {
    up: 'text-accent',
    down: 'text-flag',
    flat: 'text-ink/50',
  };

  const arrows = {
    up: '↑',
    down: '↓',
    flat: '→',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-small font-data ${colors[trend]}`}
      aria-label={`Trend: ${trend} ${trendValue}%`}
    >
      <span aria-hidden="true">{arrows[trend]}</span>
      <span className="font-data">{Math.abs(trendValue)}%</span>
    </span>
  );
}

/**
 * MetricCard displays a summary metric with:
 * - CounterAnimation integration for animated number reveals
 * - IBM Plex Mono (font-data) for all numeric values
 * - Trend indicator (up/down/flat) with color coding
 * - Label text describing the metric
 *
 * Uses design tokens: accent (#1CB894) for positive trends,
 * flag (#B4523E) for negative trends.
 *
 * Requirements: 8.1, 22.3
 */
export function MetricCard({
  metric,
  animateOnView = true,
  animationDuration = 1500,
  className,
}: MetricCardProps) {
  const { label, value, prefix, suffix, trend, trendValue } = metric;

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-default bg-paper border border-ink/10 ${className ?? ''}`}
      role="group"
      aria-label={`${label}: ${prefix ?? ''}${value}${suffix ?? ''}, trend ${trend} ${trendValue}%`}
    >
      {/* Metric label */}
      <span className="text-small text-ink/70">{label}</span>

      {/* Metric value with counter animation */}
      <div className="flex items-baseline gap-2">
        <CounterAnimation
          end={value}
          prefix={prefix}
          suffix={suffix}
          duration={animationDuration}
          decimals={value % 1 !== 0 ? 2 : 0}
          triggerOnView={animateOnView}
          className="text-h3 font-semibold"
        />
      </div>

      {/* Trend indicator */}
      <TrendIndicator trend={trend} trendValue={trendValue} />
    </div>
  );
}
