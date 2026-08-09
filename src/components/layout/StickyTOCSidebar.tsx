'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface TOCItem {
  /** Unique identifier matching the section's id attribute */
  id: string;
  /** Display label for the TOC entry */
  label: string;
  /** Nesting level (1 = top-level, 2 = sub-section) */
  level?: 1 | 2;
}

export interface StickyTOCSidebarProps {
  /** Table of contents items */
  items: TOCItem[];
  /** Offset from top for sticky positioning (accounts for header height). Default: 80 */
  topOffset?: number;
  /** Additional class name */
  className?: string;
  /** Title displayed above the TOC. Default: "On this page" */
  title?: string;
}

/**
 * StickyTOCSidebar provides a sticky table of contents for legal and long-form pages.
 * - Visible as a sticky sidebar at viewports ≥1024px
 * - Collapses into an expandable menu at viewports <1024px
 * - Highlights the currently visible section on scroll
 * - Smooth-scrolls to target section with vertical offset for sticky header
 */
export function StickyTOCSidebar({
  items,
  topOffset = 80,
  className = '',
  title = 'On this page',
}: StickyTOCSidebarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Track active section on scroll via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the topmost visible heading
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        );

      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: `-${topOffset}px 0px -60% 0px`,
      threshold: 0,
    });

    headings.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items, topOffset]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      const y =
        target.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveId(id);

      // Close mobile menu after navigation
      if (!isDesktop) {
        setIsExpanded(false);
      }
    },
    [topOffset, isDesktop]
  );

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const tocContent = (
    <ul className="list-none p-0 m-0 space-y-1" role="list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            aria-current={activeId === item.id ? 'location' : undefined}
            className={[
              'block py-1.5 text-sm transition-colors duration-150 no-underline',
              'hover:text-accent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:rounded',
              item.level === 2 ? 'pl-4' : 'pl-3',
              activeId === item.id
                ? 'text-accent font-medium border-l-2 border-accent'
                : 'text-ink/60 border-l-2 border-transparent',
            ].join(' ')}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  // Desktop: sticky sidebar
  if (isDesktop) {
    return (
      <nav
        ref={navRef}
        className={`sticky self-start ${className}`}
        style={{ top: `${topOffset}px` }}
        aria-label="Table of contents"
      >
        <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3 m-0">
          {title}
        </p>
        {tocContent}
      </nav>
    );
  }

  // Mobile/Tablet: collapsible menu
  return (
    <nav
      ref={navRef}
      className={`border border-ink/10 rounded-[14px] overflow-hidden mb-6 ${className}`}
      aria-label="Table of contents"
    >
      <button
        type="button"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="toc-mobile-panel"
        className={[
          'flex w-full items-center justify-between px-4 py-3',
          'text-left text-sm font-semibold text-ink',
          'hover:bg-ink/[0.02] transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset',
        ].join(' ')}
      >
        <span>{title}</span>
        <svg
          className={[
            'h-4 w-4 shrink-0 text-ink/60 transition-transform duration-300',
            isExpanded ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id="toc-mobile-panel"
        hidden={!isExpanded}
        className={[
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          isExpanded
            ? 'max-h-[2000px] opacity-100'
            : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-4 pb-3">{tocContent}</div>
      </div>
    </nav>
  );
}

export default StickyTOCSidebar;
