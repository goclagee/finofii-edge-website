'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { MonthIndex } from '@/types/dashboard';
import type { FilingDeadline } from '@/types/content';

export interface TaxCalendarProps {
  /** Filing deadline data */
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

const MONTH_SHORT: Record<MonthIndex, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

/**
 * Generates an ordered array of 12 months starting from the given month.
 */
function generateMonthSequence(startMonth: MonthIndex): MonthIndex[] {
  const months: MonthIndex[] = [];
  for (let i = 0; i < 12; i++) {
    const m = (((startMonth - 1 + i) % 12) + 1) as MonthIndex;
    months.push(m);
  }
  return months;
}

/**
 * TaxCalendar is an interactive month-by-month resource timeline
 * spanning 12 months from the current month.
 *
 * Features:
 * - Starts from the current month and shows a full 12-month cycle
 * - Filing deadline entries are highlighted per month
 * - Each deadline shows filing name, due date, and description
 * - Visitors can navigate forward and backward between months
 * - Responsive navigation with month indicators
 */
export function TaxCalendar({
  deadlines,
  className = '',
}: TaxCalendarProps) {
  // Start from current month
  const currentMonth = (new Date().getMonth() + 1) as MonthIndex;
  const monthSequence = useMemo(
    () => generateMonthSequence(currentMonth),
    [currentMonth]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeMonth = monthSequence[activeIndex];

  const monthDeadlines = useMemo(
    () => deadlines.filter((d) => d.month === activeMonth),
    [deadlines, activeMonth]
  );

  const goToPrevMonth = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNextMonth = useCallback(() => {
    setActiveIndex((prev) => (prev < 11 ? prev + 1 : prev));
  }, []);

  const goToMonth = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Determine the year for the active month
  const currentYear = new Date().getFullYear();
  const activeYear =
    activeMonth < currentMonth ? currentYear + 1 : currentYear;

  return (
    <div
      className={`${className}`}
      role="region"
      aria-label="Tax calendar"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={activeIndex === 0}
          aria-label="Previous month"
          className={[
            'flex items-center justify-center w-9 h-9 rounded-full',
            'border border-ink/10 transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
            activeIndex === 0
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-ink/[0.03] hover:border-ink/20',
          ].join(' ')}
        >
          <svg
            className="h-4 w-4 text-ink/70"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-ink m-0">
          {MONTH_NAMES[activeMonth]} {activeYear}
        </h3>

        <button
          type="button"
          onClick={goToNextMonth}
          disabled={activeIndex === 11}
          aria-label="Next month"
          className={[
            'flex items-center justify-center w-9 h-9 rounded-full',
            'border border-ink/10 transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
            activeIndex === 11
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-ink/[0.03] hover:border-ink/20',
          ].join(' ')}
        >
          <svg
            className="h-4 w-4 text-ink/70"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Month Indicator Bar */}
      <div
        className="flex gap-1 mb-6 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Month navigation"
      >
        {monthSequence.map((month, index) => {
          const hasDeadlines = deadlines.some((d) => d.month === month);
          return (
            <button
              key={`${month}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${MONTH_NAMES[month]}${hasDeadlines ? ' - has deadlines' : ''}`}
              onClick={() => goToMonth(index)}
              className={[
                'relative flex-shrink-0 px-2 py-1.5 rounded-lg text-xs font-medium',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                index === activeIndex
                  ? 'bg-accent text-ink'
                  : 'text-ink/60 hover:text-ink hover:bg-ink/[0.03]',
              ].join(' ')}
            >
              {MONTH_SHORT[month]}
              {hasDeadlines && index !== activeIndex && (
                <span
                  className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-flag"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Deadline List */}
      <div
        role="tabpanel"
        aria-label={`Filing deadlines for ${MONTH_NAMES[activeMonth]}`}
      >
        {monthDeadlines.length > 0 ? (
          <ul className="list-none p-0 m-0 space-y-3">
            {monthDeadlines.map((deadline) => (
              <li
                key={`${deadline.month}-${deadline.name}`}
                className="flex items-start gap-3 p-4 rounded-[14px] bg-ink/[0.02] border border-ink/5"
              >
                {/* Calendar icon */}
                <div className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-flag/10">
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

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-ink">
                      {deadline.name}
                    </span>
                    <span className="text-xs font-data text-ink/50">
                      Due: {deadline.dueDate}
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 mt-1 m-0">
                    {deadline.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-ink/50 italic m-0">
              No filing deadlines for {MONTH_NAMES[activeMonth]}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaxCalendar;
