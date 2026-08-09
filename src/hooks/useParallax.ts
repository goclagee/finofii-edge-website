'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

export interface UseParallaxOptions {
  /** Speed ratio for parallax effect (0.1–0.5). Default: 0.3 */
  speed?: number;
  /** Direction of the parallax movement. Default: 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Whether the effect is enabled. Default: true */
  enabled?: boolean;
}

export interface UseParallaxReturn {
  /** Ref to attach to the target element */
  ref: React.RefObject<HTMLElement | null>;
  /** Current transform style to apply */
  style: React.CSSProperties;
  /** Whether the parallax effect is active */
  isActive: boolean;
}

/**
 * Hook for parallax depth effects with scroll speed ratio between 0.1 and 0.5.
 * Automatically disables on:
 * - Touch/coarse pointer devices
 * - Users who prefer reduced motion
 */
export function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const { speed = 0.3, direction = 'vertical', enabled = true } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');

  // Clamp speed to valid range (0.1–0.5)
  const clampedSpeed = Math.max(0.1, Math.min(0.5, speed));

  // Determine if parallax should be active
  const isActive = enabled && !prefersReducedMotion && !isCoarsePointer;

  useEffect(() => {
    if (!isActive) {
      setOffset(0);
      return;
    }

    if (typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how far through the viewport the element is
        // Range: element entering from bottom (1) to leaving at top (-1)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const normalizedProgress = (progress - 0.5) * 2; // -1 to 1

        // Apply speed ratio to determine offset
        const parallaxOffset = normalizedProgress * 100 * clampedSpeed;
        setOffset(parallaxOffset);
      });
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isActive, clampedSpeed]);

  const style: React.CSSProperties = isActive
    ? {
        transform:
          direction === 'vertical'
            ? `translateY(${offset}px)`
            : `translateX(${offset}px)`,
        willChange: 'transform',
      }
    : {};

  return { ref, style, isActive };
}
