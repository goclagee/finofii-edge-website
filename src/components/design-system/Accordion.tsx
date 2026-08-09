'use client';

import {
  forwardRef,
  useState,
  useCallback,
  useId,
  useRef,
  type KeyboardEvent,
} from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Array of items to display in the accordion */
  items: AccordionItem[];
  /** Whether multiple items can be open simultaneously */
  allowMultiple?: boolean;
  /** IDs of items that should be open by default */
  defaultOpen?: string[];
  /** Additional class name */
  className?: string;
}

/**
 * Accordion component with smooth expand/collapse animations, keyboard support,
 * and proper ARIA attributes. Supports single or multiple open items.
 *
 * Keyboard support:
 * - Enter/Space: Toggle the focused item
 * - ArrowDown: Move focus to the next item header
 * - ArrowUp: Move focus to the previous item header
 * - Home: Move focus to the first item header
 * - End: Move focus to the last item header
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    { items, allowMultiple = false, defaultOpen = [], className = '' },
    ref
  ) {
    const [openItems, setOpenItems] = useState<Set<string>>(
      new Set(defaultOpen)
    );
    const baseId = useId();
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const toggleItem = useCallback(
      (itemId: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(itemId)) {
            next.delete(itemId);
          } else {
            if (!allowMultiple) {
              next.clear();
            }
            next.add(itemId);
          }
          return next;
        });
      },
      [allowMultiple]
    );

    const focusButton = (index: number) => {
      buttonRefs.current[index]?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent, index: number) => {
      const lastIndex = items.length - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusButton(index < lastIndex ? index + 1 : 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusButton(index > 0 ? index - 1 : lastIndex);
          break;
        case 'Home':
          e.preventDefault();
          focusButton(0);
          break;
        case 'End':
          e.preventDefault();
          focusButton(lastIndex);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleItem(items[index].id);
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={`divide-y divide-ink/10 border border-ink/10 rounded-[14px] overflow-hidden ${className}`}
        role="region"
        aria-label="Accordion"
      >
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);
          const headerId = `${baseId}-header-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <div key={item.id} className="bg-paper">
              <h3 className="m-0">
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={[
                    'flex w-full items-center justify-between',
                    'px-6 py-4 text-left text-base font-medium text-ink',
                    'transition-colors duration-150',
                    'hover:bg-ink/[0.03]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:z-10',
                  ].join(' ')}
                >
                  <span>{item.title}</span>
                  <svg
                    className={[
                      'h-5 w-5 shrink-0 text-ink/60 transition-transform duration-300',
                      isOpen ? 'rotate-180' : 'rotate-0',
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
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                hidden={!isOpen}
                className={[
                  'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
                  isOpen
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0',
                ].join(' ')}
              >
                <div className="px-6 pb-4 text-ink/80 text-body">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default Accordion;
