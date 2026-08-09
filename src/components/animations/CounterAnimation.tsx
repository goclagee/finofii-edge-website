'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CounterAnimationProps {
  /** Target end value to count up to */
  end: number;
  /** Prefix displayed before the number (e.g., "$") */
  prefix?: string;
  /** Suffix displayed after the number (e.g., "%", "+") */
  suffix?: string;
  /** Animation duration in ms (max 2000). Default: 1500 */
  duration?: number;
  /** Number of decimal places. Default: 0 */
  decimals?: number;
  /** Whether to trigger animation when element enters viewport. Default: true */
  triggerOnView?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * CounterAnimation component that animates a number from 0 to a target value.
 * Max duration: 2000ms. Rendered in IBM Plex Mono (font-data class).
 * Respects prefers-reduced-motion by showing the final value immediately.
 */
export function CounterAnimation({
  end,
  prefix = '',
  suffix = '',
  duration = 1500,
  decimals = 0,
  triggerOnView = true,
  className,
}: CounterAnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  // Clamp duration to max 2000ms
  const clampedDuration = Math.min(2000, Math.max(0, duration));

  const [currentValue, setCurrentValue] = useState(
    prefersReducedMotion ? end : 0
  );
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
    enabled: triggerOnView && !prefersReducedMotion,
  });

  // Determine if animation should start
  const shouldAnimate = prefersReducedMotion
    ? false
    : triggerOnView
      ? isIntersecting
      : true;

  useEffect(() => {
    // If reduced motion, always show final value
    if (prefersReducedMotion) {
      setCurrentValue(end);
      return;
    }

    if (!shouldAnimate || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / clampedDuration, 1);

      // Ease out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (end - startValue) * easedProgress;

      setCurrentValue(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldAnimate, end, clampedDuration, prefersReducedMotion]);

  const formattedValue = currentValue.toFixed(decimals);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`font-data ${className ?? ''}`}
      style={{ fontFamily: 'var(--font-data)' }}
      aria-label={`${prefix}${end.toFixed(decimals)}${suffix}`}
      aria-live="polite"
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
