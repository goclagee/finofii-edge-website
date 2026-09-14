'use client';

import { useEffect, useRef } from 'react';

export interface CalendlyEmbedProps {
  /** Calendly scheduling URL, e.g. https://calendly.com/gjfinofii/30min */
  url?: string;
  /** Minimum width of the widget container */
  minWidth?: number;
  /** Height of the widget container in px */
  height?: number;
}

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

interface CalendlyGlobal {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
}

function getCalendly(): CalendlyGlobal | undefined {
  return (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
}

/**
 * Loads the Calendly widget script once and resolves when it's ready.
 * Subsequent calls reuse the same in-flight/resolved promise so the script is
 * never injected more than once across mounts or client-side navigations.
 */
let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  // Already loaded and initialized.
  if (getCalendly()) return Promise.resolve();

  if (calendlyScriptPromise) return calendlyScriptPromise;

  calendlyScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    if (existing) {
      if (getCalendly()) {
        resolve();
      } else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Calendly failed to load')), {
          once: true,
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => {
      // Allow a future retry if it failed.
      calendlyScriptPromise = null;
      reject(new Error('Calendly failed to load'));
    }, { once: true });
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

/**
 * Inline Calendly scheduling widget.
 *
 * Explicitly initializes the widget into this component's own container via
 * `Calendly.initInlineWidget`, so it renders reliably on both a fresh page load
 * and client-side (SPA) navigation — no manual refresh required.
 */
export function CalendlyEmbed({
  url = 'https://calendly.com/gjfinofii/30min',
  minWidth = 320,
  height = 700,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    loadCalendlyScript()
      .then(() => {
        if (cancelled) return;
        const calendly = getCalendly();
        const el = containerRef.current;
        if (!calendly || !el) return;

        // Clear any prior render (e.g. re-mount) before initializing.
        el.innerHTML = '';
        calendly.initInlineWidget({ url, parentElement: el });
      })
      .catch(() => {
        // Silently ignore — the container simply stays empty if Calendly can't load.
      });

    return () => {
      cancelled = true;
      // Tear down the injected iframe so a fresh init happens on next mount.
      if (container) container.innerHTML = '';
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
    />
  );
}

export default CalendlyEmbed;
