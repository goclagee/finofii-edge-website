'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseIntersectionObserverOptions {
  /** Intersection threshold (0 to 1). Default: 0.2 */
  threshold?: number | number[];
  /** Root margin for the observer. Default: '0px' */
  rootMargin?: string;
  /** Whether to disconnect after first intersection. Default: true */
  triggerOnce?: boolean;
  /** Whether the observer is enabled. Default: true */
  enabled?: boolean;
}

export interface UseIntersectionObserverReturn {
  /** Ref to attach to the target element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the element is currently intersecting */
  isIntersecting: boolean;
  /** The IntersectionObserverEntry (null if not yet observed) */
  entry: IntersectionObserverEntry | null;
}

/**
 * Base hook for viewport detection using IntersectionObserver.
 * Provides a ref to attach to a target element and reports visibility state.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true,
    enabled = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries;
      if (!observerEntry) return;

      setEntry(observerEntry);

      if (observerEntry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) {
          hasTriggered.current = true;
        }
      } else if (!triggerOnce) {
        setIsIntersecting(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;
    if (triggerOnce && hasTriggered.current) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, rootMargin, triggerOnce, handleIntersect]);

  return { ref, isIntersecting, entry };
}
