'use client';

import React, { useState, useCallback } from 'react';
import type { MonthIndex } from '@/types/dashboard';
import type { FilingDeadline } from '@/types/content';

export interface FilingCalendarProps {
  /** Filing deadlines data */
  deadlines: FilingDeadline[];
  /** Additional class name */
  className?: string;
}

const MONTH_NAMES: Record<MonthIndex, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const ALL_MONTHS: MonthIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * FilingCalendar component for an interactive 12-month filing timeline.
 * Clicking a month expands to show its filing deadlines and compliance tasks
 * with a smooth animation. Supports multiple months expanded simultaneously.
 */
export function FilingCalendar({
  deadlines,
  className = '',
}: FilingCalendarProps) {
  const [expandedMonths, setExpandedMonths] = useState<Set<MonthIndex>>(
    new Set()
  );

  const toggleMonth = useCallback((month: MonthIndex) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  }, []);

  const getDeadlinesForMonth = useCallback(
    (month: MonthIndex): FilingDeadline[] => {
      return deadlines.filter((d) => d.month === month);
    },
    [deadlines]
  );

  return (
    <div
      className={`space-y-2 ${className}`}
      role="list"
      aria-label="Filing calendar"
    >
      {ALL_MONTHS.map((month) => {
        const monthDeadlines = getDeadlinesForMonth(month);
        const isExpanded = expandedMonths.has(month);
        const hasDeadlines = monthDeadlines.length > 0;
        const headerId = `filing-month-${month}-header`;
        const panelId = `filing-month-${month}-panel`;

        return (
          <div
            key={month}
            className="border border-ink/10 rounded-[14px] overflow-hidden"
            role="listitem"
          >
            <button
              type="button"
              id={headerId}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => toggleMonth(month)}
              className={[
                'flex w-full items-center justify-between px-5 py-3.5',
                'text-left transition-colors duration-150',
                'hover:bg-ink/[0.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset',
                isExpanded ? 'bg-accent/[0.03]' : 'bg-paper',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold text-ink">
                  {MONTH_NAMES[month]}
                </span>
                {hasDeadlines && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent font-data">
                    {monthDeadlines.length}
                  </span>
                )}
              </div>
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
                isExpanded
                  ? 'max-h-[2000px] opacity-100'
                  : 'max-h-0 opacity-0',
              ].join(' ')}
            >
              <div className="px-5 pb-4 pt-2">
                {hasDeadlines ? (
                  <ul className="space-y-3 list-none p-0 m-0">
                    {monthDeadlines.map((deadline) => (
                      <li
                        key={`${deadline.month}-${deadline.name}`}
                        className="flex items-start gap-3 p-3 rounded-lg bg-ink/[0.02] border border-ink/5"
                      >
                        <div className="shrink-0 mt-0.5">
                          <svg
                            className="h-4 w-4 text-flag"
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-ink">
                              {deadline.name}
                            </span>
                            <span className="text-xs font-data text-ink/50">
                              Due: {deadline.dueDate}
                            </span>
                          </div>
                          <p className="text-sm text-ink/70 mt-0.5 m-0">
                            {deadline.description}
                          </p>
                          {deadline.entityTypes.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {deadline.entityTypes.map((entity) => (
                                <span
                                  key={entity}
                                  className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-brass/10 text-brass uppercase"
                                >
                                  {entity.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-ink/50 italic">
                    No Filing Deadlines For {MONTH_NAMES[month]}.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FilingCalendar;
