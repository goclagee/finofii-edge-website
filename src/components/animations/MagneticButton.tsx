'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Snap radius in pixels. Default: 50 */
  snapRadius?: number;
  /** Strength of magnetic pull (0–1). Default: 0.4 */
  strength?: number;
  /** Additional class name */
  className?: string;
}

/**
 * MagneticButton wraps children and applies a magnetic cursor effect.
 * When the cursor is within 50px (configurable snap radius) of the element,
 * it subtly moves toward the cursor.
 * Disabled for touch devices and users who prefer reduced motion.
 */
export function MagneticButton({
  children,
  snapRadius = 50,
  strength = 0.4,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');

  const isDisabled = prefersReducedMotion || isCoarsePointer;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < snapRadius) {
        // Calculate pull strength based on proximity (closer = stronger)
        const pullFactor = (1 - distance / snapRadius) * strength;
        setTransform({
          x: distanceX * pullFactor,
          y: distanceY * pullFactor,
        });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    },
    [isDisabled, snapRadius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  const style: React.CSSProperties = isDisabled
    ? {}
    : {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 && transform.y === 0
          ? 'transform 300ms ease-out'
          : 'transform 50ms ease-out',
        willChange: 'transform',
      };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      {children}
    </div>
  );
}
