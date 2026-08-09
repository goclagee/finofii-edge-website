'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Hook for detecting the prefers-reduced-motion user preference.
 * Returns true if the user prefers reduced motion.
 *
 * When true, all animations should be disabled except navigation transitions
 * (page transitions, accordion expand/collapse, modal open/close) which should
 * use instantaneous state changes with no motion.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
