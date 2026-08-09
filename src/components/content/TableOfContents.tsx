'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface TOCSection {
  /** Unique identifier matching the section heading's id attribute */
  id: string;
  /** Display label for the section */
  title: string;
  /** Child sub-sections */
  children?: TOCSection[];
}

export interface TableOfContentsProps {
  /** Sections to display in the table of contents */
  sections: TOCSection[];
  /** Offset from top for scroll positioning (accounts for sticky header). Default: 80 */
  headerOffset?: number;
  /** Additional class name */
  className?: string;
  /** Title above the TOC. Default: "Contents" */
  title?: string;
}

/**
 * TableOfContents component for legal pages with anchor navigation.
 * Renders a nested list of section links that:
 * - Highlights the currently visible section on scroll
 * - Smooth-scrolls to the target section with a vertical offset for the sticky header
 * - Supports nested sub-sections for hierarchical legal content
 *
 * This component is rendered inline within the page content and is primarily
 * used on legal pages (/legal/privacy, /legal/terms, etc.).
 */
export function TableOfContents({
  sections,
  headerOffset = 80,
  className = '',
  title = 'Contents',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Flatten sections for observation
  const allIds = React.useMemo(() => {
    const ids: string[] = [];
    sections.forEach((section) => {
      ids.push(section.id);
      section.children?.forEach((child) => {
        ids.push(child.id);
      });
    });
    return ids;
  }, [sections]);

  // Track active section on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headings = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
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
      rootMargin: `-${headerOffset}px 0px -60% 0px`,
      threshold: 0,
    });

    headings.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [allIds, headerOffset]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      const y =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveId(id);
    },
    [headerOffset]
  );

  const renderLink = (id: string, label: string, isChild = false) => (
    <a
      href={`#${id}`}
      onClick={(e) => handleClick(e, id)}
      aria-current={activeId === id ? 'location' : undefined}
      className={[
        'block py-1 text-sm no-underline transition-colors duration-150',
        'hover:text-accent',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:rounded',
        isChild ? 'pl-4 text-xs' : '',
        activeId === id
          ? 'text-accent font-medium'
          : 'text-ink/60',
      ].join(' ')}
    >
      {label}
    </a>
  );

  return (
    <nav
      className={`${className}`}
      aria-label="Table of contents"
    >
      {title && (
        <h2 className="text-base font-semibold text-ink mb-3">
          {title}
        </h2>
      )}
      <ol className="list-none p-0 m-0 space-y-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            {renderLink(section.id, section.title)}
            {section.children && section.children.length > 0 && (
              <ol className="list-none p-0 m-0 ml-2 space-y-0.5">
                {section.children.map((child) => (
                  <li key={child.id}>
                    {renderLink(child.id, child.title, true)}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default TableOfContents;
