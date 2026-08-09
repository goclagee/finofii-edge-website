'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../design-system/Navbar';

export interface CompactHeaderProps {
  /** Scroll distance (in px) over which the header transitions to compact mode. Default: 100 */
  scrollThreshold?: number;
  children?: React.ReactNode;
}

/**
 * CompactHeader wraps the Navbar and applies progressive header condensation.
 * The background color shift completes within 100px of scroll distance from the trigger point.
 * Once scrolled past the threshold, the header enters compact sticky state with:
 * - Reduced height
 * - Backdrop blur
 * - Hidden secondary labels
 */
export function CompactHeader({ scrollThreshold = 100 }: CompactHeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Progressive transition: 0 at top, 1 at scrollThreshold
    const progress = Math.min(scrollY / scrollThreshold, 1);
    setScrollProgress(progress);
    setIsCompact(scrollY > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    // Check on mount in case page is already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <Navbar compact={isCompact} scrollProgress={scrollProgress} />;
}

export default CompactHeader;
