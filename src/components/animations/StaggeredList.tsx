'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface StaggeredListProps {
  children: React.ReactNode;
  /** Delay between items in ms (100–150). Default: 100 */
  staggerDelay?: number;
  /** Animation variant for each item. Default: 'fade-up' */
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  /** Animation duration per item in ms. Default: 500 */
  duration?: number;
  /** Visibility threshold to trigger (0–1). Default: 0.2 */
  threshold?: number;
  /** Additional class name */
  className?: string;
}

/**
 * StaggeredList component that animates children with a 100–150ms delay between items.
 * Commonly used for counter, chart, and stat callout groups.
 * Respects prefers-reduced-motion by showing all items immediately.
 */
export function StaggeredList({
  children,
  staggerDelay = 100,
  animation = 'fade-up',
  duration = 500,
  threshold = 0.2,
  className,
}: StaggeredListProps) {
  const prefersReducedMotion = useReducedMotion();

  // Clamp stagger delay to 100–150ms
  const clampedDelay = Math.max(100, Math.min(150, staggerDelay));

  // Use intersection observer to know when container is visible
  const { ref: containerRef, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
    enabled: !prefersReducedMotion,
  });

  // If reduced motion, render all children immediately
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className={className} role="presentation">
      {React.Children.map(children, (child, index) => (
        <StaggeredItem
          key={index}
          animation={animation}
          duration={duration}
          delay={index * clampedDelay}
          isVisible={isIntersecting}
        >
          {child}
        </StaggeredItem>
      ))}
    </div>
  );
}

/**
 * Internal component for each staggered item.
 */
function StaggeredItem({
  children,
  animation,
  duration,
  delay,
  isVisible,
}: {
  children: React.ReactNode;
  animation: StaggeredListProps['animation'];
  duration: number;
  delay: number;
  isVisible: boolean;
}) {
  const style = getStaggerStyle(animation ?? 'fade-up', isVisible, duration, delay);

  return <div style={style}>{children}</div>;
}

function getStaggerStyle(
  animation: string,
  isVisible: boolean,
  duration: number,
  delay: number
): React.CSSProperties {
  // Clamp duration to 300–600ms
  const clampedDuration = Math.max(300, Math.min(600, duration));
  const baseTransition = `opacity ${clampedDuration}ms ease-out ${delay}ms, transform ${clampedDuration}ms ease-out ${delay}ms`;

  if (isVisible) {
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
