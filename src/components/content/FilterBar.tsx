'use client';

import React, { useCallback } from 'react';

export interface FilterDimension<T extends string> {
  key: string;
  label: string;
  options: Array<{ value: T; label: string }>;
  multiple?: boolean;
}

export interface FilterBarProps<T extends string> {
  /** Filter dimensions to display */
  dimensions: FilterDimension<T>[];
  /** Currently active filters keyed by dimension */
  activeFilters: Record<string, T[]>;
  /** Called when a filter value changes */
  onFilterChange: (dimension: string, values: T[]) => void;
  /** Called to reset all filters */
  onReset: () => void;
}

/**
 * FilterBar component for multi-dimension filtering.
 * Supports multiple filter dimensions with active state indication
 * and a reset control to clear all filters.
 */
export function FilterBar<T extends string>({
  dimensions,
  activeFilters,
  onFilterChange,
  onReset,
}: FilterBarProps<T>) {
  const hasActiveFilters = Object.values(activeFilters).some(
    (values) => values.length > 0
  );

  const handleToggleFilter = useCallback(
    (dimensionKey: string, value: T, multiple?: boolean) => {
      const currentValues = activeFilters[dimensionKey] || [];
      let newValues: T[];

      if (currentValues.includes(value)) {
        newValues = currentValues.filter((v) => v !== value);
      } else {
        if (multiple) {
          newValues = [...currentValues, value];
        } else {
          newValues = [value];
        }
      }

      onFilterChange(dimensionKey, newValues);
    },
    [activeFilters, onFilterChange]
  );

  return (
    <div
      className="flex flex-wrap items-center gap-4"
      role="toolbar"
      aria-label="Filter controls"
    >
      {dimensions.map((dimension) => (
        <fieldset
          key={dimension.key}
          className="flex flex-wrap items-center gap-2 border-none p-0 m-0"
        >
          <legend className="sr-only">{dimension.label}</legend>
          <span className="text-sm font-medium text-ink/70">
            {dimension.label}:
          </span>
          {dimension.options.map((option) => {
            const isActive = (
              activeFilters[dimension.key] || []
            ).includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={isActive}
                onClick={() =>
                  handleToggleFilter(
                    dimension.key,
                    option.value,
                    dimension.multiple
                  )
                }
                className={[
                  'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-accent text-ink'
                    : 'bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink',
                ].join(' ')}
              >
                {option.label}
              </button>
            );
          })}
        </fieldset>
      ))}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className={[
            'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium',
            'text-flag bg-flag/10 hover:bg-flag/20',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flag focus-visible:ring-offset-2',
          ].join(' ')}
          aria-label="Reset all filters"
        >
          <svg
            className="h-3.5 w-3.5"
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
          Reset
        </button>
      )}
    </div>
  );
}

export default FilterBar;
