'use client';

import { useEffect } from 'react';

export interface CalendlyEmbedProps {
  /** Calendly scheduling URL, e.g. https://calendly.com/gjfinofii/30min */
  url?: string;
  /** Minimum width of the widget container */
  minWidth?: number;
  /** Height of the widget container in px */
  height?: number;
}

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Inline Calendly scheduling widget.
 *
 * Loads the official Calendly widget script once (dedupes across mounts) and
 * renders the inline embed. Calendly's script scans the DOM for elements with
 * the `calendly-inline-widget` class and initializes them automatically.
 */
export function CalendlyEmbed({
  url = 'https://calendly.com/gjfinofii/30min',
  minWidth = 320,
  height = 700,
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Avoid injecting the script more than once.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    if (existing) {
      // Script already present. If Calendly has finished loading, re-init any
      // widgets that haven't been initialized yet (e.g. on client navigation).
      const calendly = (window as unknown as { Calendly?: { initInlineWidgets: () => void } })
        .Calendly;
      calendly?.initInlineWidgets?.();
      return;
    }

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    // Intentionally leave the script in the DOM so it stays cached and available
    // for subsequent navigations.
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
    />
  );
}

export default CalendlyEmbed;
