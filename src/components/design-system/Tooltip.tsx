'use client';

import {
  forwardRef,
  useState,
  useId,
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Content displayed inside the tooltip popup */
  content: ReactNode;
  /** Position of the tooltip relative to the trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delay?: number;
  children: ReactNode;
  ariaLabel?: string;
}

const positionStyles: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Tooltip component with hover and focus trigger.
 * Always renders the tooltip element in the DOM (hidden by default) for
 * accessibility. Uses aria-describedby to connect trigger to tooltip.
 * Shows on hover/focus, hides on mouse leave/blur.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      content,
      position = 'top',
      delay = 0,
      children,
      ariaLabel,
      className = '',
      ...rest
    },
    ref
  ) {
    const [visible, setVisible] = useState(false);
    const tooltipId = useId();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    // Clone the child element to inject aria-describedby
    const child = Children.only(children);
    const trigger = isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, {
          'aria-describedby': tooltipId,
        })
      : children;

    return (
      <div
        ref={ref}
        className={`relative inline-block ${className}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...rest}
      >
        {trigger}

        <div
          id={tooltipId}
          role="tooltip"
          aria-hidden={!visible}
          aria-label={ariaLabel}
          className={[
            'absolute z-50 px-3 py-2',
            'bg-ink text-paper text-sm rounded-[14px] shadow-lg',
            'whitespace-nowrap pointer-events-none',
            'transition-opacity duration-150',
            positionStyles[position],
            visible ? 'opacity-100 visible' : 'opacity-0 invisible',
          ].join(' ')}
        >
          {content}
        </div>
      </div>
    );
  }
);

export default Tooltip;
