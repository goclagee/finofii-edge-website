'use client';

import React, { useState, useCallback } from 'react';
import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { FilterBar } from '@/components/content/FilterBar';
import type { FilterDimension } from '@/components/content/FilterBar';
import { CaseStudyCard } from '@/components/content/CaseStudyCard';
import { CaseStudyDetail } from '@/components/content/CaseStudyDetail';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { filterCaseStudies } from '@/lib/filters';
import { caseStudies } from '@/content/case-studies';
import type { CaseStudy } from '@/types/case-study';
import type { IndustryType } from '@/types/dashboard';
import type { ServiceType } from '@/types/case-study';

type FilterValue = IndustryType | ServiceType;

const FILTER_DIMENSIONS: FilterDimension<FilterValue>[] = [
  {
    key: 'industry',
    label: 'Industry',
    options: [
      { value: 'dtc', label: 'DTC' },
      { value: 'agency', label: 'Agency' },
      { value: 'saas', label: 'SaaS' },
      { value: 'cpa', label: 'CPA' },
    ],
    multiple: true,
  },
  {
    key: 'serviceType',
    label: 'Service',
    options: [
      { value: 'bookkeeping', label: 'Bookkeeping' },
      { value: 'mis', label: 'MIS' },
      { value: 'cfo', label: 'CFO' },
      { value: 'entity', label: 'Entity' },
    ],
    multiple: true,
  },
];

export default function CaseStudiesClient() {
  const [activeFilters, setActiveFilters] = useState<
    Record<string, FilterValue[]>
  >({
    industry: [],
    serviceType: [],
  });

  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const handleFilterChange = useCallback(
    (dimension: string, values: FilterValue[]) => {
      setActiveFilters((prev) => ({
        ...prev,
        [dimension]: values,
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setActiveFilters({ industry: [], serviceType: [] });
  }, []);

  const handleCardClick = useCallback((caseStudy: CaseStudy) => {
    setSelectedStudy(caseStudy);
  }, []);

  const handleDetailClose = useCallback(() => {
    setSelectedStudy(null);
  }, []);

  const filteredStudies = filterCaseStudies(caseStudies, {
    industry: activeFilters.industry as IndustryType[],
    serviceType: activeFilters.serviceType as ServiceType[],
  });

  const hasActiveFilters = Object.values(activeFilters).some(
    (v) => v.length > 0
  );

  return (
    <main>
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Case Studies">
        <ScrollReveal animation="fade-up">
          <AnimatedHeadline
            text="Real Results from Real Businesses"
            as="h1"
            animation="fade-up"
          />
          <p className="mt-4 text-lg text-ink/70 max-w-2xl">
            See how we&apos;ve helped DTC brands, agencies, SaaS startups and CPA
            firms transform their financial operations with concrete,
            measurable outcomes.
          </p>
        </ScrollReveal>
      </Section>

      {/* Filter Bar */}
      <Section padding="sm" ariaLabel="Filter case studies">
        <FilterBar<FilterValue>
          dimensions={FILTER_DIMENSIONS}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </Section>

      {/* Case Study Grid or Empty State */}
      <Section padding="lg" ariaLabel="Case study results">
        {filteredStudies.length === 0 && hasActiveFilters ? (
          <EmptyFilterState onReset={handleReset} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                caseStudy={study}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Expanded Detail Panel */}
      {selectedStudy && (
        <Section padding="md" ariaLabel="Case study detail">
          <CaseStudyDetail
            caseStudy={selectedStudy}
            onClose={handleDetailClose}
          />
        </Section>
      )}
    </main>
  );
}

function EmptyFilterState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-16 w-16 text-ink/20 mb-4"
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
      <h3 className="text-lg font-semibold text-ink mb-2">
        No matching case studies
      </h3>
      <p className="text-ink/60 mb-6 max-w-sm">
        No case studies match the selected filters. Try adjusting your selection
        or reset all filters.
      </p>
      <button
        type="button"
        onClick={onReset}
        className={[
          'inline-flex items-center gap-2 px-4 py-2 rounded-full',
          'text-sm font-medium text-ink bg-accent',
          'hover:bg-accent/90 transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
        ].join(' ')}
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset All Filters
      </button>
    </div>
  );
}
