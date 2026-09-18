'use client';

import React from 'react';
import { Section } from '@/components/design-system/Section';
import { StickyTOCSidebar, type TOCItem } from '@/components/layout/StickyTOCSidebar';

export interface LegalPageLayoutProps {
  /** Page title displayed as the main heading */
  title: string;
  /** Last-updated date in "Month DD, YYYY" format */
  lastUpdated: string;
  /** Table of contents items */
  tocItems: TOCItem[];
  /** Page content (rendered in prose-formatted layout) */
  children: React.ReactNode;
}

/**
 * LegalPageLayout provides a shared layout for all legal pages:
 * - StickyTOCSidebar (sticky ≥1024px, collapsed <1024px)
 * - Long-form prose content with headings, paragraphs, lists, and tables
 * - Last-updated date displayed at the top
 * - Smooth-scroll navigation with header offset
 */
export function LegalPageLayout({
  title,
  lastUpdated,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  return (
    <Section padding="lg" className="!px-[28px]">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink mb-2">
          {title}
        </h1>
        <p className="text-sm text-ink/60">
          Last Updated: <time>{lastUpdated}</time>
        </p>
      </header>

      {/* Mobile TOC (visible <1024px) */}
      <div className="lg:hidden">
        <StickyTOCSidebar items={tocItems} topOffset={80} title="Contents" />
      </div>

      {/* Main content area with sidebar */}
      <div className="flex gap-12">
        {/* Prose content */}
        <article className="flex-1 min-w-0 legal-prose">
          {children}
        </article>

        {/* Desktop TOC sidebar (visible ≥1024px) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <StickyTOCSidebar items={tocItems} topOffset={80} title="Contents" />
        </aside>
      </div>
    </Section>
  );
}

export default LegalPageLayout;
