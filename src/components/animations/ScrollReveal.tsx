'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Animation variant. Default: 'fade-up' */
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  /** Visibility threshold to trigger (0–1). Default: 0.2 */
  threshold?: number;
  /** Animation duration in ms (300–600). Default: 500 */
  duration?: number;
  /** Delay before animation starts in ms. Default: 0 */
  delay?: number;
  /** Stagger delay in ms between children. Default: 0 */
  stagger?: number;
  /** Disable animations (e.g., for reduced motion). Default: false */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * ScrollReveal component for intersection-based entrance animations.
 * Supports fade-up, fade-in, slide-left, slide-right, and scale animations.
 * Duration range: 300–600ms, default threshold: 0.2.
 * Respects prefers-reduced-motion by showing final state immediately.
 */
export function ScrollReveal({
  children,
  animation = 'fade-up',
  threshold = 0.2,
  duration = 500,
  delay = 0,
  stagger = 0,
  disabled = false,
  className,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDisabled = disabled || prefersReducedMotion;

  const { ref, style } = useScrollReveal({
    animation,
    threshold,
    duration,
    delay,
    triggerOnce: true,
  });

  // If disabled or reduced motion, render children immediately without animation
  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  // If stagger > 0, wrap each child with a staggered delay
  if (stagger > 0 && React.Children.count(children) > 1) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {React.Children.map(children, (child, index) => (
          <StaggeredChild
            key={index}
            animation={animation}
            threshold={threshold}
            duration={duration}
            delay={delay + index * stagger}
          >
            {child}
          </StaggeredChild>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={className}
      role="presentation"
    >
      {children}
    </div>
  );
}

/**
 * Internal component for staggered children with individual delays.
 */
function StaggeredChild({
  children,
  animation,
  threshold,
  duration,
  delay,
}: {
  children: React.ReactNode;
  animation: ScrollRevealProps['animation'];
  threshold: number;
  duration: number;
  delay: number;
}) {
  const { ref, style } = useScrollReveal({
    animation,
    threshold,
    duration,
    delay,
    triggerOnce: true,
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={style}>
      {children}
    </div>
  );
}
