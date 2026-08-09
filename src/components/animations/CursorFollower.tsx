'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface CursorFollowerProps {
  /** Size of the cursor follower in pixels. Default: 20 */
  size?: number;
  /** Color of the cursor follower. Default: 'var(--color-accent)' */
  color?: string;
  /** Opacity of the cursor follower (0–1). Default: 0.5 */
  opacity?: number;
  /** Whether the follower is enabled. Default: true */
  enabled?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * CursorFollower component that creates a trailing cursor effect on hero sections.
 * Maximum 100ms tracking delay for smooth following.
 * Disabled on touch (coarse pointer) devices and when prefers-reduced-motion is enabled.
 */
export function CursorFollower({
  size = 20,
  color = 'var(--color-accent)',
  opacity = 0.5,
  enabled = true,
  className,
}: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const animationRef = useRef<number | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');

  const isDisabled = !enabled || prefersReducedMotion || isCoarsePointer;

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    // Smooth tracking with max 100ms delay using lerp
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    // Track at ~60fps with lerp factor that achieves ≤100ms delay
    // At 60fps, factor of 0.15 gives roughly 100ms effective delay
    const animate = () => {
      setPosition((prev) => ({
        x: lerp(prev.x, targetRef.current.x, 0.15),
        y: lerp(prev.y, targetRef.current.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDisabled]);

  // Don't render anything on touch devices or reduced motion
  if (isDisabled) {
    return null;
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: visible ? opacity : 0,
        transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 200ms ease',
        willChange: 'transform',
      }}
    />
  );
}
