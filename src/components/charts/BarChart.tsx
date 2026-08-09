'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ChartDataPoint } from '@/types/dashboard';

/** Default chart color palette using design tokens */
const DEFAULT_COLORS = [
  '#1CB894', // accent
  '#C6A15B', // brass
  '#0B1420', // ink
  '#B4523E', // flag
];

export interface FinancialBarChartProps {
  /** Array of data points to plot */
  data: ChartDataPoint[];
  /** Key in data used for the x-axis labels */
  xKey: string;
  /** Keys in data used for the y-axis bar series */
  yKeys: string[];
  /** Optional colors for each bar series (defaults to design token palette) */
  colors?: string[];
  /** Whether to animate data transitions. Default: true */
  animateTransition?: boolean;
  /** Transition duration in ms. Default: 300 */
  transitionDuration?: number;
  /** Whether to stack bars. Default: false */
  stacked?: boolean;
  /** Chart height in pixels. Default: 300 */
  height?: number;
  /** Additional class name */
  className?: string;
}

/**
 * FinancialBarChart renders a responsive bar chart using Recharts.
 *
 * Features:
 * - Animated transitions ≤300ms when data changes
 * - Responsive sizing from 320px to 1440px via ResponsiveContainer
 * - Design token colors (accent, brass, ink, flag)
 * - Optional stacked bar mode
 * - Accessible: aria-hidden (paired with AccessibleTable in ChartContainer)
 *
 * Requirements: 8.1, 8.5, 8.6
 */
export function FinancialBarChart({
  data,
  xKey,
  yKeys,
  colors = DEFAULT_COLORS,
  animateTransition = true,
  transitionDuration = 300,
  stacked = false,
  height = 300,
  className,
}: FinancialBarChartProps) {
  // Clamp transition duration to max 300ms per requirements
  const clampedDuration = Math.min(300, Math.max(0, transitionDuration));

  return (
    <div className={`w-full ${className ?? ''}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E3DD"
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: '#0B1420' }}
            tickLine={false}
            axisLine={{ stroke: '#E5E3DD' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#0B1420' }}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#F4F2EC',
              border: '1px solid #E5E3DD',
              borderRadius: '14px',
              fontSize: '12px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
          />
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
              isAnimationActive={animateTransition}
              animationDuration={clampedDuration}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
