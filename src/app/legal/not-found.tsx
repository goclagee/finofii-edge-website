import Link from 'next/link';
import { Section } from '@/components/design-system/Section';

/**
 * Displayed when a visitor navigates to a legal page path that has no content available.
 * Shows a notification message with a link back to the main legal index.
 * Requirement 11.4
 */
export default function LegalNotFound() {
  return (
    <Section padding="lg">
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-flag/10 mb-6">
          <svg
            className="w-8 h-8 text-flag"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="font-fraunces text-2xl md:text-3xl font-bold text-ink mb-3">
          Page Unavailable
        </h1>
        <p className="text-ink/70 mb-8">
          The legal page you&apos;re looking for is not currently available. It may have been moved
          or is not yet published.
        </p>

        <Link
          href="/legal"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-ink rounded-[14px] font-medium text-sm hover:bg-accent/90 transition-colors no-underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Legal Index
        </Link>
      </div>
    </Section>
  );
}
