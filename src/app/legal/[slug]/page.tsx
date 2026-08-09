import { notFound } from 'next/navigation';

/**
 * Catch-all page for unrecognized legal page paths.
 * Triggers the legal not-found page for any /legal/[slug] that doesn't
 * have a dedicated folder (privacy, terms, dpa, sub-processors).
 * Requirement 11.4
 */
export default function LegalCatchAllPage() {
  notFound();
}
