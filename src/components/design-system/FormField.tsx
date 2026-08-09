'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text for the form field */
  label: string;
  /** Error message to display inline */
  error?: string;
  /** Helper text displayed below the input */
  hint?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Validation state for styling */
  validationState?: 'default' | 'error' | 'success';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Render a custom input instead of the default <input> */
  children?: ReactNode;
  /** Additional class name for the wrapper */
  className?: string;
}

const sizeStyles: Record<NonNullable<FormFieldProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-base',
};

const stateStyles: Record<NonNullable<FormFieldProps['validationState']>, string> = {
  default: 'border-ink/20 focus:border-accent',
  error: 'border-flag focus:border-flag',
  success: 'border-accent focus:border-accent',
};

/**
 * FormField component with label, inline error, hint text, and validation
 * state styling. Supports both native input rendering and custom children.
 *
 * Accessibility:
 * - Associates label with input via htmlFor/id
 * - Connects error message via aria-describedby
 * - Marks invalid state via aria-invalid
 * - Displays required indicator
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    {
      label,
      error,
      hint,
      required = false,
      validationState = 'default',
      size = 'md',
      children,
      className = '',
      id: propId,
      ...inputProps
    },
    ref
  ) {
    const generatedId = useId();
    const fieldId = propId || generatedId;
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;

    // Determine effective validation state from error prop
    const effectiveState = error ? 'error' : validationState;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {/* Label */}
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-ink"
        >
          {label}
          {required && (
            <span className="ml-1 text-flag" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {/* Custom children or default input */}
        {children ? (
          children
        ) : (
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={effectiveState === 'error' || undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            className={[
              'w-full rounded-[14px] border bg-paper text-ink',
              'transition-colors duration-150',
              'placeholder:text-ink/40',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeStyles[size],
              stateStyles[effectiveState],
            ].join(' ')}
            {...inputProps}
          />
        )}

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-flag flex items-center gap-1"
          >
            <svg
              className="h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p id={hintId} className="text-sm text-ink/60">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

export default FormField;
