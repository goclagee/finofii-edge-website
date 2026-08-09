'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface TimelinePhase {
  /** Unique identifier for the phase */
  id: string;
  /** Phase title/label */
  title: string;
  /** Day range label (e.g., "Days 1-3") */
  dayRange: string;
  /** Items/milestones in this phase */
  items: TimelineItem[];
}

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Item label */
  label: string;
  /** Item type for visual distinction */
  type: 'deliverable' | 'responsibility' | 'milestone';
  /** Optional description */
  description?: string;
}

export interface TimelineProps {
  /** Phases to render in the timeline */
  phases: TimelinePhase[];
  /** Optional title above the timeline */
  title?: string;
  /** Additional class name */
  className?: string;
}

/**
 * Timeline component for onboarding and filing timelines.
 * Uses ScrollReveal for scroll-triggered phase highlights with
 * staggered entrance animations (≤300ms per step).
 *
 * Each phase displays a day range, title, and items categorized as
 * deliverables or client responsibilities, visually distinguished.
 */
export function Timeline({
  phases,
  title,
  className = '',
}: TimelineProps) {
  return (
    <div className={`relative ${className}`} role="list" aria-label={title || 'Timeline'}>
      {title && (
        <h2 className="text-2xl font-semibold text-ink mb-8">{title}</h2>
      )}

      {/* Vertical line connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink/10 hidden md:block" aria-hidden="true" />

      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => (
          <ScrollReveal
            key={phase.id}
            animation="fade-up"
            delay={phaseIndex * 150}
            duration={300}
          >
            <div
              className="relative pl-0 md:pl-16"
              role="listitem"
              aria-label={`${phase.title} - ${phase.dayRange}`}
            >
              {/* Phase marker */}
              <div
                className="hidden md:flex absolute left-4 top-3 w-5 h-5 rounded-full bg-accent items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Phase content */}
              <div className="bg-paper border border-ink/10 rounded-[14px] p-5">
                {/* Phase header */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent font-data">
                    {phase.dayRange}
                  </span>
                  <h3 className="text-base font-semibold text-ink m-0">
                    {phase.title}
                  </h3>
                </div>

                {/* Phase items */}
                <div className="space-y-2">
                  {phase.items.map((item) => (
                    <div
                      key={item.id}
                      className={[
                        'flex items-start gap-2 text-sm',
                        item.type === 'deliverable'
                          ? 'text-ink/80'
                          : item.type === 'responsibility'
                            ? 'text-brass'
                            : 'text-accent',
                      ].join(' ')}
                    >
                      <span className="shrink-0 mt-0.5" aria-hidden="true">
                        {item.type === 'deliverable' && (
                          <svg
                            className="h-4 w-4 text-accent"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {item.type === 'responsibility' && (
                          <svg
                            className="h-4 w-4 text-brass"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        )}
                        {item.type === 'milestone' && (
                          <svg
                            className="h-4 w-4 text-accent"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        )}
                      </span>
                      <div>
                        <span className={item.type === 'responsibility' ? 'text-brass' : 'text-ink/80'}>
                          {item.label}
                        </span>
                        {item.description && (
                          <p className="text-xs text-ink/60 mt-0.5 m-0">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
