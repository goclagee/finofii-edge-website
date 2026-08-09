'use client';

import { forwardRef, useId } from 'react';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked?: boolean;
  /** Called when value changes with the new checked state */
  onChange?: (checked: boolean) => void;
  /** Label text displayed alongside the toggle */
  label?: string;
  /** Whether to show the label visually (defaults to true) */
  showLabel?: boolean;
  /** Size of the toggle */
  size?: 'sm' | 'md';
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Accessible label override */
  ariaLabel?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    track: 'w-8 h-5',
    thumb: 'h-3.5 w-3.5',
    translate: 'translate-x-[14px]',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
};

/**
 * Toggle component for binary on/off selections.
 * Implements accessible switch pattern with proper ARIA role and state.
 * Supports keyboard activation (Space/Enter), focus indicators, and disabled state.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      checked = false,
      onChange,
      label,
      showLabel = true,
      size = 'md',
      disabled = false,
      ariaLabel,
      className = '',
    },
    ref
  ) {
    const id = useId();
    const sizes = sizeConfig[size];

    const handleClick = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange?.(!checked);
      }
    };

    return (
      <label
        htmlFor={id}
        className={[
          'inline-flex items-center gap-3',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          className,
        ].join(' ')}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel || label}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={[
            sizes.track,
            'relative inline-flex items-center rounded-full',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
            checked ? 'bg-accent' : 'bg-ink/20',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {/* Thumb */}
          <span
            aria-hidden="true"
            className={[
              sizes.thumb,
              'absolute left-[2px] rounded-full bg-paper shadow-sm',
              'transition-transform duration-200 ease-out',
              checked ? sizes.translate : 'translate-x-0',
            ].join(' ')}
          />
        </button>
        {label && showLabel && (
          <span className="text-base text-ink select-none">{label}</span>
        )}
      </label>
    );
  }
);

export default Toggle;
