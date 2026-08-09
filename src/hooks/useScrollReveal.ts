'use client';

import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useReducedMotion } from './useReducedMotion';

export interface UseScrollRevealOptions {
  /** Animation variant. Default: 'fade-up' */
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  /** Animation duration in milliseconds (300–600ms). Default: 500 */
  duration?: number;
  /** Delay before animation starts in milliseconds. Default: 0 */
  delay?: number;
  /** Visibility threshold to trigger (0–1). Default: 0.2 (20%) */
  threshold?: number;
  /** Whether the animation should only trigger once. Default: true */
  triggerOnce?: boolean;
}

export interface UseScrollRevealReturn {
  /** Ref to attach to the target element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the element has been revealed (is or was visible) */
  isRevealed: boolean;
  /** CSS style object to apply for the animation */
  style: React.CSSProperties;
}

/**
 * Hook for intersection-observer-based entrance animations.
 * Triggers at 20% viewport visibility with configurable duration (300–600ms).
 * Respects prefers-reduced-motion — shows content immediately when enabled.
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}): UseScrollRevealReturn {
  const {
    animation = 'fade-up',
    duration = 500,
    delay = 0,
    threshold = 0.2,
    triggerOnce = true,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  // Clamp duration to 300–600ms range
  const clampedDuration = Math.max(300, Math.min(600, duration));

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
    enabled: !prefersReducedMotion,
  });

  // Track if animation has played
  useEffect(() => {
    if (isIntersecting && !hasAnimated.current) {
      hasAnimated.current = true;
    }
  }, [isIntersecting]);

  const isRevealed = prefersReducedMotion || isIntersecting || hasAnimated.current;

  // If reduced motion is preferred, show final state immediately
  if (prefersReducedMotion) {
    return {
      ref,
      isRevealed: true,
      style: {},
    };
  }

  const style = getAnimationStyle(animation, isRevealed, clampedDuration, delay);

  return { ref, isRevealed, style };
}

function getAnimationStyle(
  animation: string,
  isRevealed: boolean,
  duration: number,
  delay: number
): React.CSSProperties {
  const baseTransition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;

  if (isRevealed) {
    return {
      opacity: 1,
      transform: 'translate(0, 0) scale(1)',
      transition: baseTransition,
    };
  }

  switch (animation) {
    case 'fade-up':
      return {
        opacity: 0,
        transform: 'translateY(30px)',
        transition: baseTransition,
      };
    case 'fade-in':
      return {
        opacity: 0,
        transform: 'translate(0, 0)',
        transition: baseTransition,
      };
    case 'slide-left':
      return {
        opacity: 0,
        transform: 'translateX(-50px)',
        transition: baseTransition,
      };
    case 'slide-right':
      return {
        opacity: 0,
        transform: 'translateX(50px)',
        transition: baseTransition,
      };
    case 'scale':
      return {
        opacity: 0,
        transform: 'scale(0.9)',
        transition: baseTransition,
      };
    default:
      return {
        opacity: 0,
        transform: 'translate(0, 0)',
        transition: baseTransition,
      };
  }
}
