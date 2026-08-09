'use client';

import { useState, useCallback, useMemo } from 'react';
import { Section } from '@/components/design-system/Section';
import { Badge } from '@/components/design-system/Badge';
import { Card } from '@/components/design-system/Card';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { Button } from '@/components/design-system/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FilterBar } from '@/components/content/FilterBar';
import { TaxCalendar } from '@/components/content/TaxCalendar';
import { filterContent } from '@/lib/filters';
import type { ContentType, ContentItem, FilingDeadline } from '@/types/content';
import type { MonthIndex } from '@/types/dashboard';

// --- Sample Content Data ---

const SAMPLE_CONTENT: ContentItem[] = [
  {
    id: 'blog-1',
    slug: 'revenue-recognition-saas',
    title: 'Revenue Recognition for SaaS: ASC 606 Simplified',
    type: 'blog',
    publishDate: '2024-12-15',
    excerpt: 'A practical breakdown of ASC 606 revenue recognition standards for subscription-based businesses, with examples.',
    category: 'Accounting Standards',
    tags: ['saas', 'revenue', 'asc-606'],
  },
  {
    id: 'blog-2',
    slug: 'year-end-close-checklist',
    title: 'The Ultimate Year-End Close Checklist for Small Businesses',
    type: 'blog',
    publishDate: '2024-11-20',
    excerpt: 'Everything you need to wrap up your books cleanly before year-end, from reconciliations to accruals.',
    category: 'Bookkeeping',
    tags: ['year-end', 'checklist', 'small-business'],
  },
  {
    id: 'blog-3',
    slug: 'dtc-cogs-tracking',
    title: 'How DTC Brands Should Track Cost of Goods Sold',
    type: 'blog',
    publishDate: '2024-10-08',
    excerpt: 'COGS tracking best practices for e-commerce brands handling inventory, shipping, and fulfillment costs.',
    category: 'DTC Finance',
    tags: ['dtc', 'cogs', 'inventory'],
  },
  {
    id: 'guide-1',
    slug: 'monthly-close-process',
    title: 'Complete Guide to Monthly Close Process',
    type: 'guide',
    publishDate: '2024-11-01',
    excerpt: 'Step-by-step guide to implementing a reliable monthly close process that keeps your books audit-ready.',
    category: 'Bookkeeping',
    tags: ['monthly-close', 'process', 'guide'],
  },
  {
    id: 'guide-2',
    slug: 'choosing-accounting-software',
    title: 'How to Choose the Right Accounting Software in 2024',
    type: 'guide',
    publishDate: '2024-09-15',
    excerpt: 'Compare QuickBooks, Xero, and Ramp for your business size and industry with our decision framework.',
    category: 'Tools',
    tags: ['software', 'quickbooks', 'xero'],
  },
  {
    id: 'guide-3',
    slug: 'startup-financial-model',
    title: 'Building Your First Startup Financial Model',
    type: 'guide',
    publishDate: '2024-08-22',
    excerpt: 'A founder-friendly guide to building a three-statement financial model for fundraising and planning.',
    category: 'CFO Advisory',
    tags: ['startup', 'financial-model', 'fundraising'],
  },
  {
    id: 'template-1',
    slug: 'cash-flow-template',
    title: 'Cash Flow Forecast Template',
    type: 'template',
    publishDate: '2024-10-01',
    excerpt: '13-week cash flow forecast spreadsheet with automated formulas. Perfect for startups managing runway.',
    category: 'Templates',
    tags: ['cash-flow', 'forecast', 'template'],
  },
  {
    id: 'template-2',
    slug: 'monthly-close-checklist-template',
    title: 'Monthly Close Checklist Template',
    type: 'template',
    publishDate: '2024-09-01',
    excerpt: 'Standardized checklist covering reconciliation, accruals, and review steps for a clean monthly close.',
    category: 'Templates',
    tags: ['checklist', 'monthly-close', 'template'],
  },
  {
    id: 'template-3',
    slug: 'budget-vs-actual-template',
    title: 'Budget vs. Actual Variance Report Template',
    type: 'template',
    publishDate: '2024-07-15',
    excerpt: 'Track spending against budget with automatic variance calculations and visual trend indicators.',
    category: 'Templates',
    tags: ['budget', 'variance', 'reporting'],
  },
  {
    id: 'blog-4',
    slug: 'multi-entity-accounting',
    title: 'Multi-Entity Accounting: Consolidation Made Simple',
    type: 'blog',
    publishDate: '2024-08-10',
    excerpt: 'How to manage and consolidate financials across multiple LLCs, subsidiaries, and holding companies.',
    category: 'Accounting Standards',
    tags: ['multi-entity', 'consolidation'],
  },
  {
    id: 'guide-4',
    slug: 'agency-profitability',
    title: 'Measuring Project Profitability for Agencies',
    type: 'guide',
    publishDate: '2024-07-01',
    excerpt: 'Track utilization rates, project margins, and overhead allocation to understand true profitability.',
    category: 'Agency Finance',
    tags: ['agency', 'profitability', 'utilization'],
  },
  {
    id: 'blog-5',
    slug: 'bookkeeping-automation',
    title: '5 Bookkeeping Tasks You Should Automate Today',
    type: 'blog',
    publishDate: '2024-06-20',
    excerpt: 'Reduce manual work and errors by automating bank feeds, categorization, invoicing, and reconciliation.',
    category: 'Bookkeeping',
    tags: ['automation', 'efficiency'],
  },
  {
    id: 'template-4',
    slug: 'profit-loss-template',
    title: 'Profit & Loss Statement Template',
    type: 'template',
    publishDate: '2024-06-01',
    excerpt: 'Clean P&L template with month-over-month comparison and category breakdowns for board reporting.',
    category: 'Templates',
    tags: ['p&l', 'financial-statements'],
  },
  {
    id: 'blog-6',
    slug: 'sales-tax-nexus',
    title: 'Understanding Sales Tax Nexus for E-commerce',
    type: 'blog',
    publishDate: '2024-05-15',
    excerpt: 'Navigate economic nexus thresholds and registration requirements across all 50 states.',
    category: 'Compliance',
    tags: ['sales-tax', 'nexus', 'ecommerce'],
  },
];

// --- Sample Filing Deadlines ---

const SAMPLE_DEADLINES: FilingDeadline[] = [
  { month: 1 as MonthIndex, name: 'Form W-2 & 1099-NEC', dueDate: '01/31', description: 'Furnish W-2s to employees and 1099-NEC to contractors.', entityTypes: ['llc', 'scorp', 'ccorp'] },
  { month: 1 as MonthIndex, name: 'Q4 Estimated Tax', dueDate: '01/15', description: 'Fourth quarter estimated tax payment due.', entityTypes: ['llc', 'scorp', 'ccorp', 'sole_prop'] },
  { month: 3 as MonthIndex, name: 'S-Corp / Partnership Return', dueDate: '03/15', description: 'Form 1120-S and 1065 filing deadline.', entityTypes: ['scorp', 'llc'] },
  { month: 4 as MonthIndex, name: 'Individual & C-Corp Returns', dueDate: '04/15', description: 'Form 1040 and 1120 filing deadline.', entityTypes: ['sole_prop', 'ccorp'] },
  { month: 4 as MonthIndex, name: 'Q1 Estimated Tax', dueDate: '04/15', description: 'First quarter estimated tax payment due.', entityTypes: ['llc', 'scorp', 'ccorp', 'sole_prop'] },
  { month: 6 as MonthIndex, name: 'Q2 Estimated Tax', dueDate: '06/15', description: 'Second quarter estimated tax payment due.', entityTypes: ['llc', 'scorp', 'ccorp', 'sole_prop'] },
  { month: 9 as MonthIndex, name: 'Q3 Estimated Tax', dueDate: '09/15', description: 'Third quarter estimated tax payment due.', entityTypes: ['llc', 'scorp', 'ccorp', 'sole_prop'] },
  { month: 9 as MonthIndex, name: 'Extended S-Corp / Partnership', dueDate: '09/15', description: 'Extended Form 1120-S and 1065 due date.', entityTypes: ['scorp', 'llc'] },
  { month: 10 as MonthIndex, name: 'Extended Individual & C-Corp', dueDate: '10/15', description: 'Extended Form 1040 and 1120 due date.', entityTypes: ['sole_prop', 'ccorp'] },
  { month: 12 as MonthIndex, name: 'Year-End Planning Deadline', dueDate: '12/31', description: 'Last day for tax-loss harvesting and retirement contributions.', entityTypes: ['llc', 'scorp', 'ccorp', 'sole_prop'] },
];

// --- Filter Configuration ---

const CATEGORY_FILTER_DIMENSIONS = [
  {
    key: 'type',
    label: 'Category',
    options: [
      { value: 'blog' as ContentType, label: 'Blog Posts' },
      { value: 'guide' as ContentType, label: 'Guides' },
      { value: 'template' as ContentType, label: 'Templates' },
      { value: 'tax_calendar' as ContentType, label: 'Tax Calendar' },
    ],
    multiple: true,
  },
];

// --- Badge variant mapping ---

const CATEGORY_BADGE_VARIANT: Record<ContentType, 'accent' | 'brass' | 'flag' | 'default'> = {
  blog: 'accent',
  guide: 'brass',
  template: 'flag',
  tax_calendar: 'default',
};

const CATEGORY_LABEL: Record<ContentType, string> = {
  blog: 'Blog',
  guide: 'Guide',
  template: 'Template',
  tax_calendar: 'Tax Calendar',
};

const PAGE_SIZE = 12;

// --- Page Component ---

export default function ResourcesPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, ContentType[]>>({
    type: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentItem | null>(null);

  const showTaxCalendar = useMemo(() => {
    const typeFilters = activeFilters.type || [];
    return typeFilters.length === 0 || typeFilters.includes('tax_calendar');
  }, [activeFilters]);

  const showContentGrid = useMemo(() => {
    const typeFilters = activeFilters.type || [];
    // Show content grid if no filter or any non-tax_calendar filter is active
    return typeFilters.length === 0 || typeFilters.some((t) => t !== 'tax_calendar');
  }, [activeFilters]);

  const contentFilterTypes = useMemo(() => {
    const typeFilters = activeFilters.type || [];
    // Filter out 'tax_calendar' from content types since it's shown separately
    return typeFilters.filter((t) => t !== 'tax_calendar');
  }, [activeFilters]);

  const { items: paginatedItems, total, totalPages } = useMemo(() => {
    return filterContent(
      SAMPLE_CONTENT,
      { types: contentFilterTypes.length > 0 ? contentFilterTypes : undefined },
      { page: currentPage, pageSize: PAGE_SIZE }
    );
  }, [contentFilterTypes, currentPage]);

  const handleFilterChange = useCallback((dimension: string, values: ContentType[]) => {
    setActiveFilters((prev) => ({ ...prev, [dimension]: values }));
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setActiveFilters({ type: [] });
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTemplateClick = useCallback((item: ContentItem) => {
    if (item.type === 'template') {
      setSelectedTemplate(item);
    }
  }, []);

  const handleCloseTemplate = useCallback(() => {
    setSelectedTemplate(null);
  }, []);

  // Determine empty state
  const isEmptyState = showContentGrid && paginatedItems.length === 0 && !showTaxCalendar;
  const isContentEmpty = showContentGrid && paginatedItems.length === 0 && showTaxCalendar;

  return (
    <main className="bg-paper min-h-screen">
      {/* Hero Section */}
      <Section padding="lg" className="text-center">
        <AnimatedHeadline
          text="Resources & Insights"
          as="h1"
          animation="fade-up"
        />
        <p className="mt-4 text-lg text-ink/70 max-w-2xl mx-auto">
          Guides, blog posts, templates, and tax deadlines to keep your business
          finances on track.
        </p>
      </Section>

      {/* Filter Bar */}
      <Section padding="sm">
        <ScrollReveal animation="fade-up">
          <FilterBar
            dimensions={CATEGORY_FILTER_DIMENSIONS}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </ScrollReveal>
      </Section>

      {/* Tax Calendar Section */}
      {showTaxCalendar && (
        <Section padding="md">
          <ScrollReveal animation="fade-up">
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold text-ink mb-2">
                Tax Calendar
              </h2>
              <p className="text-ink/70">
                Key filing deadlines and compliance dates for the year ahead.
              </p>
            </div>
            <Card variant="default" className="p-6">
              <TaxCalendar deadlines={SAMPLE_DEADLINES} />
            </Card>
          </ScrollReveal>
        </Section>
      )}

      {/* Content Grid */}
      {showContentGrid && (
        <Section padding="md">
          {paginatedItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    animation="fade-up"
                    delay={index * 50}
                  >
                    <ContentCard
                      item={item}
                      onTemplateClick={handleTemplateClick}
                    />
                  </ScrollReveal>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={[
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                      currentPage === 1
                        ? 'text-ink/30 cursor-not-allowed'
                        : 'text-ink/70 hover:bg-ink/5',
                    ].join(' ')}
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      aria-label={`Page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                      className={[
                        'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                        page === currentPage
                          ? 'bg-accent text-ink'
                          : 'text-ink/70 hover:bg-ink/5',
                      ].join(' ')}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className={[
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                      currentPage === totalPages
                        ? 'text-ink/30 cursor-not-allowed'
                        : 'text-ink/70 hover:bg-ink/5',
                    ].join(' ')}
                  >
                    Next →
                  </button>
                </div>
              )}

              <p className="text-center text-sm text-ink/50 mt-4">
                Showing {paginatedItems.length} of {total} items
              </p>
            </>
          ) : (
            /* Empty content state (when tax calendar is also shown) */
            isContentEmpty && (
              <EmptyFilterState onReset={handleResetFilters} />
            )
          )}
        </Section>
      )}

      {/* Full empty state - no content and no tax calendar */}
      {isEmptyState && (
        <Section padding="md">
          <EmptyFilterState onReset={handleResetFilters} />
        </Section>
      )}

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <TemplateDetailView
          item={selectedTemplate}
          onClose={handleCloseTemplate}
        />
      )}

      {/* CTA Section */}
      <Section padding="lg" className="text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-display font-bold text-ink mb-4">
            Need Expert Help?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-xl mx-auto">
            Our team can handle your bookkeeping, reporting, and compliance
            so you can focus on growing your business.
          </p>
          <Button variant="accent" size="lg" href="/book" magnetic>
            Book a Free Audit
          </Button>
        </ScrollReveal>
      </Section>
    </main>
  );
}

// --- Content Card Component ---

function ContentCard({
  item,
  onTemplateClick,
}: {
  item: ContentItem;
  onTemplateClick: (item: ContentItem) => void;
}) {
  const isTemplate = item.type === 'template';

  return (
    <Card
      variant="interactive"
      className="flex flex-col h-full"
      onClick={isTemplate ? () => onTemplateClick(item) : undefined}
      ariaLabel={isTemplate ? `View template: ${item.title}` : item.title}
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={CATEGORY_BADGE_VARIANT[item.type]} size="sm">
          {CATEGORY_LABEL[item.type]}
        </Badge>
        <span className="text-xs text-ink/50 font-data">
          {formatDate(item.publishDate)}
        </span>
      </div>

      <h3 className="text-base font-semibold text-ink mb-2 line-clamp-2">
        {item.title}
      </h3>

      <p className="text-sm text-ink/70 line-clamp-3 flex-1 mb-4">
        {item.excerpt}
      </p>

      {isTemplate && (
        <div className="mt-auto pt-2 border-t border-ink/5">
          <span className="text-sm font-medium text-accent">
            View Template →
          </span>
        </div>
      )}
    </Card>
  );
}

// --- Empty Filter State ---

function EmptyFilterState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink/5 mb-4">
        <svg
          className="h-8 w-8 text-ink/30"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ink mb-2">
        No results found
      </h3>
      <p className="text-ink/70 mb-6 max-w-md mx-auto">
        No content matches your current filter selection. Try adjusting your
        filters or reset them to see all available resources.
      </p>
      <button
        type="button"
        onClick={onReset}
        className={[
          'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium',
          'bg-accent text-ink hover:bg-accent/90',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
        ].join(' ')}
      >
        Reset Filters
      </button>
    </div>
  );
}

// --- Template Detail View ---

function TemplateDetailView({
  item,
  onClose,
}: {
  item: ContentItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Template: ${item.title}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative bg-paper rounded-[14px] p-8 max-w-lg w-full shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close template view"
          className={[
            'absolute top-4 right-4 w-8 h-8 rounded-full',
            'flex items-center justify-center',
            'text-ink/50 hover:text-ink hover:bg-ink/5',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
          ].join(' ')}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Badge */}
        <Badge variant="flag" size="sm" className="mb-4">
          Template
        </Badge>

        {/* Title */}
        <h2 className="text-xl font-display font-bold text-ink mb-3">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-ink/70 mb-6">
          {item.excerpt}
        </p>

        {/* Preview area */}
        <div className="bg-ink/[0.03] border border-ink/10 rounded-[14px] p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="h-5 w-5 text-ink/40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span className="text-sm font-medium text-ink/60">Preview</span>
          </div>
          <p className="text-sm text-ink/50 italic">
            Template preview available after download.
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-ink/50 mb-6">
          <span className="font-data">{formatDate(item.publishDate)}</span>
          <span>•</span>
          <span>{item.category}</span>
        </div>

        {/* Download action */}
        <button
          type="button"
          className={[
            'w-full inline-flex items-center justify-center gap-2 px-6 py-3',
            'rounded-[14px] text-sm font-semibold',
            'bg-accent text-ink hover:bg-accent/90',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
          ].join(' ')}
          aria-label={`Download ${item.title}`}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download Template
        </button>
      </div>
    </div>
  );
}

// --- Helpers ---

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
