'use client';

import React, { useState } from 'react';
import type { CaseStudy } from '@/types/case-study';
import { CounterAnimation } from '@/components/animations/CounterAnimation';

export interface CaseStudyDetailProps {
  /** The case study to display in detail */
  caseStudy: CaseStudy;
  /** Called when the detail panel should close */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
}

type DetailSection = 'problem' | 'solution' | 'results';

/**
 * CaseStudyDetail displays an expandable detail panel for a case study.
 * Contains problem statement, solution narrative, and quantified results
 * sections that can be individually expanded/collapsed.
 */
export function CaseStudyDetail({
  caseStudy,
  onClose,
  className = '',
}: CaseStudyDetailProps) {
  const [expandedSections, setExpandedSections] = useState<Set<DetailSection>>(
    new Set<DetailSection>(['problem', 'solution', 'results'])
  );

  const toggleSection = (section: DetailSection) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  return (
    <div
      className={[
        'bg-paper border border-ink/10 rounded-[14px] p-6 shadow-xl',
        'animate-[fadeIn_200ms_ease-out]',
        className,
      ].join(' ')}
      role="region"
      aria-label={`Case study detail: ${caseStudy.headline}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent mb-2">
            {caseStudy.clientIndustryLabel}
          </span>
          <h2 className="text-xl font-semibold text-ink leading-snug">
            {caseStudy.headline}
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close detail panel"
            className={[
              'inline-flex items-center justify-center',
              'h-8 w-8 rounded-full shrink-0',
              'text-ink/60 hover:text-ink hover:bg-ink/5',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
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
        )}
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        <DetailSectionPanel
          title="Problem"
          section="problem"
          isExpanded={expandedSections.has('problem')}
          onToggle={() => toggleSection('problem')}
        >
          <p className="text-ink/80 leading-relaxed">{caseStudy.problem}</p>
        </DetailSectionPanel>

        <DetailSectionPanel
          title="Solution"
          section="solution"
          isExpanded={expandedSections.has('solution')}
          onToggle={() => toggleSection('solution')}
        >
          <p className="text-ink/80 leading-relaxed">{caseStudy.solution}</p>
        </DetailSectionPanel>

        <DetailSectionPanel
          title="Results"
          section="results"
          isExpanded={expandedSections.has('results')}
          onToggle={() => toggleSection('results')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-ink/[0.02] rounded-lg p-4 border border-ink/5"
              >
                <span className="text-xs text-ink/60 uppercase tracking-wide block mb-1">
                  {metric.label}
                </span>
                <div className="flex items-baseline gap-2 font-data">
                  <span className="text-ink/50 text-sm line-through">
                    <CounterAnimation
                      end={metric.before}
                      prefix={metric.unit === '$' ? '$' : ''}
                      suffix={metric.unit !== '$' ? metric.unit : ''}
                      duration={800}
                      triggerOnView={true}
                    />
                  </span>
                  <span className="text-accent font-semibold text-lg">
                    <CounterAnimation
                      end={metric.after}
                      prefix={metric.unit === '$' ? '$' : ''}
                      suffix={metric.unit !== '$' ? metric.unit : ''}
                      duration={1000}
                      triggerOnView={true}
                    />
                  </span>
                </div>
                <span className="text-xs text-accent font-medium mt-1 block">
                  {metric.improvement}
                </span>
              </div>
            ))}
          </div>
        </DetailSectionPanel>
      </div>
    </div>
  );
}

interface DetailSectionPanelProps {
  title: string;
  section: DetailSection;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function DetailSectionPanel({
  title,
  section,
  isExpanded,
  onToggle,
  children,
}: DetailSectionPanelProps) {
  const headerId = `detail-${section}-header`;
  const panelId = `detail-${section}-panel`;

  return (
    <div className="border border-ink/5 rounded-lg overflow-hidden">
      <button
        type="button"
        id={headerId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={[
          'flex w-full items-center justify-between px-4 py-3',
          'text-left text-sm font-semibold text-ink',
          'transition-colors duration-150',
          'hover:bg-ink/[0.02]',
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
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isExpanded}
        className={[
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

export default CaseStudyDetail;
