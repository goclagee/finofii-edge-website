'use client';

import { useState, useCallback } from 'react';
import { Section } from '@/components/design-system/Section';
import { AnimatedHeadline } from '@/components/design-system/AnimatedHeadline';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { BookingWidget } from '@/components/forms/BookingWidget';
import type { LeadSubmission } from '@/types/lead';
import type { BookingConfirmation } from '@/components/forms/BookingWidget';
import type { FormError } from '@/components/forms/LeadForm';

// --- Types ---

type PageStep = 'lead-form' | 'booking' | 'complete';

// --- Component ---

export default function BookPage() {
  const [pageStep, setPageStep] = useState<PageStep>('lead-form');
  const [leadData, setLeadData] = useState<LeadSubmission | null>(null);
  const [bookingData, setBookingData] = useState<BookingConfirmation | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLeadSubmitSuccess = useCallback((lead: LeadSubmission) => {
    setLeadData(lead);
    setFormError(null);
    setPageStep('booking');
  }, []);

  const handleLeadSubmitError = useCallback((error: FormError) => {
    setFormError(error.message);
  }, []);

  const handleBookingConfirmed = useCallback((booking: BookingConfirmation) => {
    setBookingData(booking);
    setPageStep('complete');
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <Section padding="lg" ariaLabel="Book a Free Audit">
        <div className="text-center mb-12">
          <ScrollReveal animation="fade-up">
            <AnimatedHeadline
              text="Book a Free Audit"
              as="h1"
              animation="fade-up"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mt-4 text-lg text-ink/70 max-w-2xl mx-auto">
              Complete the quick intake form below and schedule a time that works
              for you. We&apos;ll review your books and deliver insights within 48 hours.
            </p>
          </ScrollReveal>
        </div>

        {/* Step: Lead Form */}
        {pageStep === 'lead-form' && (
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="max-w-2xl mx-auto">
              <LeadForm
                onSubmitSuccess={handleLeadSubmitSuccess}
                onSubmitError={handleLeadSubmitError}
              />
              {formError && (
                <div
                  role="alert"
                  className="mt-4 p-4 rounded-[14px] bg-flag/10 border border-flag/30 text-flag text-sm text-center"
                >
                  <p className="font-medium">Something went wrong</p>
                  <p className="mt-1">{formError}</p>
                  <p className="mt-2 text-ink/60">
                    Your data has been saved. Please try submitting again.
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Step: Booking Widget */}
        {pageStep === 'booking' && (
          <ScrollReveal animation="fade-up">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 p-4 rounded-[14px] bg-accent/5 border border-accent/20 text-center">
                <p className="text-sm text-ink/70">
                  ✓ Your information has been submitted successfully.
                </p>
                <p className="text-sm font-medium text-ink mt-1">
                  Now, pick a time for your free audit call.
                </p>
              </div>
              <BookingWidget
                onBookingConfirmed={handleBookingConfirmed}
                fallbackContactMethod="hello@finofii.com"
                timezone={leadData?.timezone}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Step: Complete — Confirmation */}
        {pageStep === 'complete' && bookingData && (
          <ScrollReveal animation="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              <div className="rounded-[14px] border border-accent/30 bg-accent/5 p-8">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-16 w-16 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-ink mb-4 font-display">
                  You&apos;re All Set!
                </h2>
                <p className="text-ink/70 mb-6">
                  Your free audit consultation has been booked. Here are the details:
                </p>
                <div className="inline-block text-left bg-paper rounded-[14px] p-6 border border-ink/10">
                  <dl className="space-y-3">
                    <div className="flex gap-3">
                      <dt className="text-sm font-medium text-ink/60 min-w-[80px]">
                        Date:
                      </dt>
                      <dd className="text-sm text-ink font-medium">
                        {bookingData.date}
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="text-sm font-medium text-ink/60 min-w-[80px]">
                        Time:
                      </dt>
                      <dd className="text-sm text-ink font-medium">
                        {bookingData.time}
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="text-sm font-medium text-ink/60 min-w-[80px]">
                        Timezone:
                      </dt>
                      <dd className="text-sm text-ink font-medium">
                        {bookingData.timezone
                          .replace(/_/g, ' ')
                          .replace('America/', '')
                          .replace('Pacific/', '')}
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="mt-6 text-sm text-ink/60">
                  A calendar invite will be sent to your email shortly.
                  We look forward to reviewing your financials!
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </Section>
    </main>
  );
}
