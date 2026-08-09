'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';

export interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Speed ratio for parallax effect (0.1–0.5). Default: 0.3 */
  speed: number;
  /** Direction of the parallax movement. Default: 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Whether the effect is disabled. Disabled for touch/reduced-motion. Default: false */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * ParallaxLayer component for depth effects on hero sections, backgrounds,
 * and decorative elements. Speed ratio between 0.1 and 0.5.
 * Automatically disabled for touch devices and users who prefer reduced motion.
 */
export function ParallaxLayer({
  children,
  speed,
  direction = 'vertical',
  disabled = false,
  className,
}: ParallaxLayerProps) {
  const { ref, style, isActive } = useParallax({
    speed,
    direction,
    enabled: !disabled,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={className}
      aria-hidden={isActive ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
