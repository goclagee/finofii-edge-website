'use client';

import React from 'react';
import type { CaseStudy, BeforeAfterMetric } from '@/types/case-study';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface CaseStudyCardProps {
  /** The case study data to display */
  caseStudy: CaseStudy;
  /** Called when the card is clicked */
  onClick?: (caseStudy: CaseStudy) => void;
  /** Additional class name */
  className?: string;
}

/**
 * CaseStudyCard displays a case study with:
 * - Industry label badge
 * - Headline summary
 * - Before/after metric pairs animated with CounterAnimation (≤1000ms)
 * - IBM Plex Mono for metric values
 *
 * Metrics animate on scroll entry. Clickable to expand detail.
 */
export function CaseStudyCard({
  caseStudy,
  onClick,
  className = '',
}: CaseStudyCardProps) {
  const handleClick = () => {
    onClick?.(caseStudy);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(caseStudy);
    }
  };

  return (
    <ScrollReveal animation="fade-up">
      <article
        className={[
          'group relative bg-paper border border-ink/10 rounded-[14px] p-6',
          'transition-all duration-200',
          'hover:shadow-lg hover:border-accent/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
          'cursor-pointer',
          className,
        ].join(' ')}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Case study: ${caseStudy.headline}`}
      >
        {/* Industry label */}
        <span
          className={[
            'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3',
            'bg-accent/10 text-accent',
          ].join(' ')}
        >
          {caseStudy.clientIndustryLabel}
        </span>

        {/* Headline */}
        <h3 className="text-lg font-semibold text-ink mb-4 leading-snug">
          {caseStudy.headline}
        </h3>

        {/* Before/After Metrics */}
        <div className="space-y-3">
          {caseStudy.metrics.slice(0, 3).map((metric) => (
            <MetricRow key={metric.label} metric={metric} />
          ))}
        </div>
      </article>
    </ScrollReveal>
  );
}

function MetricRow({ metric }: { metric: BeforeAfterMetric }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-ink/70 shrink-0">{metric.label}</span>
      <div className="flex items-center gap-2 font-data">
        <span className="text-sm text-ink/50">
          <CounterAnimation
            end={metric.before}
            prefix={metric.unit === '$' ? '$' : ''}
            suffix={metric.unit !== '$' ? metric.unit : ''}
            duration={1000}
            triggerOnView={true}
          />
        </span>
        <svg
          className="h-4 w-4 text-accent shrink-0"
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
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <span className="text-sm font-semibold text-accent">
          <CounterAnimation
            end={metric.after}
            prefix={metric.unit === '$' ? '$' : ''}
            suffix={metric.unit !== '$' ? metric.unit : ''}
            duration={1000}
            triggerOnView={true}
          />
        </span>
      </div>
    </div>
  );
}

export default CaseStudyCard;
