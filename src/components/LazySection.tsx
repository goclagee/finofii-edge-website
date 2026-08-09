'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

/**
 * LazySection renders children only when the section enters or is about
 * to enter the viewport (rootMargin: 200px). This defers hydration and
 * rendering of below-fold content, reducing initial JS execution cost.
 *
 * Use for heavy below-fold page sections (charts, testimonials, etc.).
 */
interface LazySectionProps {
  children: ReactNode;
  /** Height estimate for the placeholder to prevent layout shift */
  minHeight?: string;
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Root margin for early triggering (default: 200px) */
  rootMargin?: string;
}

export function LazySection({
  children,
  minHeight = '200px',
  className = '',
  rootMargin = '200px',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If IntersectionObserver is not available, render immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
}
