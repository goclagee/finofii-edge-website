'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
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

export interface FinancialLineChartProps {
  /** Array of data points to plot */
  data: ChartDataPoint[];
  /** Key in data used for the x-axis labels */
  xKey: string;
  /** Keys in data used for the y-axis line series */
  yKeys: string[];
  /** Optional colors for each line (defaults to design token palette) */
  colors?: string[];
  /** Whether to animate data transitions. Default: true */
  animateTransition?: boolean;
  /** Transition duration in ms. Default: 300 */
  transitionDuration?: number;
  /** Chart height in pixels. Default: 300 */
  height?: number;
  /** Additional class name */
  className?: string;
}

/**
 * FinancialLineChart renders a responsive line chart using Recharts.
 *
 * Features:
 * - Animated transitions ≤300ms when data changes
 * - Responsive sizing from 320px to 1440px via ResponsiveContainer
 * - Design token colors (accent, brass, ink, flag)
 * - Accessible: aria-hidden (paired with AccessibleTable in ChartContainer)
 *
 * Requirements: 8.1, 8.5, 8.6
 */
export function FinancialLineChart({
  data,
  xKey,
  yKeys,
  colors = DEFAULT_COLORS,
  animateTransition = true,
  transitionDuration = 300,
  height = 300,
  className,
}: FinancialLineChartProps) {
  // Clamp transition duration to max 300ms per requirements
  const clampedDuration = Math.min(300, Math.max(0, transitionDuration));

  return (
    <div className={`w-full ${className ?? ''}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
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
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: colors[index % colors.length] }}
              activeDot={{ r: 5 }}
              isAnimationActive={animateTransition}
              animationDuration={clampedDuration}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
