'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface PageTransitionProps {
  children: React.ReactNode;
  /** Unique key for the current page/route (used by AnimatePresence) */
  routeKey: string;
  /** Transition duration in ms (max 400). Default: 300 */
  duration?: number;
  /** Animation mode. Default: 'wait' */
  mode?: 'wait' | 'sync' | 'popLayout';
}

/**
 * PageTransition component using Framer Motion's AnimatePresence for
 * shared layout animation between routes. Max transition duration: 400ms.
 * Respects prefers-reduced-motion by using instant state changes.
 */
export function PageTransition({
  children,
  routeKey,
  duration = 300,
  mode = 'wait',
}: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Clamp duration to max 400ms
  const clampedDuration = Math.min(400, Math.max(0, duration));

  // Convert ms to seconds for Framer Motion
  const durationSeconds = prefersReducedMotion ? 0 : clampedDuration / 1000;

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
        transition={{
          duration: durationSeconds,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
