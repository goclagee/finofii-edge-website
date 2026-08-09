'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/design-system/Button';
import { FormField } from '@/components/design-system/FormField';

// --- Types ---

export interface BookingConfirmation {
  date: string;
  time: string;
  timezone: string;
  slotId: string;
}

export interface BookingSlot {
  id: string;
  startTime: string; // ISO 8601
  endTime: string;
  available: boolean;
}

export interface BookingWidgetProps {
  calendarProvider?: 'cal.com';
  timezone?: string;
  minDaysAhead?: number; // Default: 5 business days
  slotDuration?: number; // Minutes, default: 30
  onBookingConfirmed?: (booking: BookingConfirmation) => void;
  fallbackContactMethod?: string;
}

// --- Constants ---

const TIMEZONE_OPTIONS: string[] = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
];

const MIN_DAYS_AHEAD_DEFAULT = 5;
const SLOT_DURATION_DEFAULT = 30;

// --- Utilities ---

/** Add business days to a date (skipping weekends) */
function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      added++;
    }
  }
  return result;
}

/** Generate an array of business days starting from a given date */
function getBusinessDays(startDate: Date, count: number): Date[] {
  const days: Date[] = [];
  const current = new Date(startDate);
  while (days.length < count) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
}

/** Format a date to display string */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** Format ISO time string to display time */
function formatTime(isoString: string, timezone: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
    });
  } catch {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

/** Format date from ISO string */
function formatDateFromISO(isoString: string, timezone: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone,
    });
  } catch {
    return new Date(isoString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

// --- Component ---

export function BookingWidget({
  calendarProvider: _calendarProvider = 'cal.com',
  timezone: initialTimezone,
  minDaysAhead = MIN_DAYS_AHEAD_DEFAULT,
  slotDuration: _slotDuration = SLOT_DURATION_DEFAULT,
  onBookingConfirmed,
  fallbackContactMethod = 'hello@finofii.com',
}: BookingWidgetProps) {
  const [selectedTimezone, setSelectedTimezone] = useState(
    initialTimezone || ''
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  // Detect timezone on mount
  useEffect(() => {
    if (!initialTimezone) {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (TIMEZONE_OPTIONS.includes(detected)) {
          setSelectedTimezone(detected);
        } else {
          setSelectedTimezone('America/New_York');
        }
      } catch {
        setSelectedTimezone('America/New_York');
      }
    }
  }, [initialTimezone]);

  // Calculate available dates (minimum business days ahead)
  const startDate = addBusinessDays(new Date(), minDaysAhead);
  const availableDates = getBusinessDays(startDate, 10);

  // Fetch slots when date or timezone changes
  const fetchSlots = useCallback(
    async (date: Date, tz: string) => {
      setIsLoading(true);
      setError(null);
      setSlots([]);
      setSelectedSlot(null);

      try {
        const dateStr = date.toISOString().split('T')[0];
        const response = await fetch(
          `/api/booking?timezone=${encodeURIComponent(tz)}&date=${dateStr}`
        );

        if (response.status === 503) {
          setIsUnavailable(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Unable to fetch available slots');
        }

        const data = await response.json();
        setSlots(data.slots || []);
      } catch (err) {
        if (err instanceof Error && err.message.includes('fetch')) {
          setIsUnavailable(true);
        } else {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load available times'
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedDate && selectedTimezone) {
      fetchSlots(selectedDate, selectedTimezone);
    }
  }, [selectedDate, selectedTimezone, fetchSlots]);

  // Handle booking confirmation
  const handleBookSlot = async () => {
    if (!selectedSlot || !selectedTimezone) return;

    setIsBooking(true);
    setError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          timezone: selectedTimezone,
        }),
      });

      if (response.status === 503) {
        setIsUnavailable(true);
        return;
      }

      if (!response.ok) {
        throw new Error('Unable to confirm booking. Please try again.');
      }

      const bookingConfirmation: BookingConfirmation = {
        date: formatDateFromISO(selectedSlot.startTime, selectedTimezone),
        time: formatTime(selectedSlot.startTime, selectedTimezone),
        timezone: selectedTimezone,
        slotId: selectedSlot.id,
      };

      setConfirmation(bookingConfirmation);
      onBookingConfirmed?.(bookingConfirmation);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Booking failed. Please try again.'
      );
    } finally {
      setIsBooking(false);
    }
  };

  // --- Render: Fallback UI ---

  if (isUnavailable) {
    return (
      <div
        className="rounded-[14px] border border-ink/10 bg-paper p-6 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-ink/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-ink mb-2">
          Scheduling Temporarily Unavailable
        </h3>
        <p className="text-sm text-ink/60 mb-4">
          Our calendar system is currently unavailable. Please reach out
          directly to schedule your free audit.
        </p>
        <a
          href={`mailto:${fallbackContactMethod}`}
          className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {fallbackContactMethod}
        </a>
      </div>
    );
  }

  // --- Render: Booking Confirmation ---

  if (confirmation) {
    return (
      <div
        className="rounded-[14px] border border-accent/30 bg-accent/5 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-accent"
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
        <h3 className="text-lg font-semibold text-ink mb-3">
          Booking Confirmed!
        </h3>
        <div className="space-y-1 text-sm text-ink/80">
          <p>
            <span className="font-medium">Date:</span> {confirmation.date}
          </p>
          <p>
            <span className="font-medium">Time:</span> {confirmation.time}
          </p>
          <p>
            <span className="font-medium">Timezone:</span>{' '}
            {confirmation.timezone.replace(/_/g, ' ').replace('America/', '')}
          </p>
        </div>
        <p className="mt-4 text-sm text-ink/60">
          You'll receive a calendar invite shortly.
        </p>
      </div>
    );
  }

  // --- Render: Booking Widget ---

  return (
    <div
      className="rounded-[14px] border border-ink/10 bg-paper p-6"
      aria-label="Book a time slot"
    >
      <h3 className="text-lg font-semibold text-ink mb-4">
        Schedule Your Free Audit
      </h3>

      {/* Timezone Selection */}
      <div className="mb-6">
        <FormField
          label="Timezone"
          required
        >
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            aria-label="Select timezone"
            className="w-full rounded-[14px] border border-ink/20 bg-paper text-ink px-4 py-3 text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus:border-accent"
          >
            <option value="">Select your timezone</option>
            {TIMEZONE_OPTIONS.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, ' ').replace('America/', '').replace('Pacific/', '')}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <p className="text-sm font-medium text-ink mb-2">Select a date</p>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
          role="radiogroup"
          aria-label="Available dates"
        >
          {availableDates.map((date) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedDate(date)}
                className={[
                  'px-3 py-2 rounded-[14px] border text-sm text-center transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-accent bg-accent/10 text-ink font-medium'
                    : 'border-ink/15 bg-paper text-ink hover:border-ink/30',
                ].join(' ')}
              >
                {formatDate(date)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <p className="text-sm font-medium text-ink mb-2">
            Available {_slotDuration}-minute slots
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-8" aria-live="polite">
              <svg
                className="h-6 w-6 animate-spin text-accent"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="ml-2 text-sm text-ink/60">
                Loading available times...
              </span>
            </div>
          ) : slots.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              role="radiogroup"
              aria-label="Available time slots"
            >
              {slots
                .filter((slot) => slot.available)
                .map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSlot(slot)}
                      className={[
                        'px-3 py-2 rounded-[14px] border text-sm text-center transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
                        isSelected
                          ? 'border-accent bg-accent/10 text-ink font-medium'
                          : 'border-ink/15 bg-paper text-ink hover:border-ink/30',
                      ].join(' ')}
                    >
                      {formatTime(slot.startTime, selectedTimezone)}
                    </button>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm text-ink/60 py-4 text-center">
              No available slots for this date. Please try another day.
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-[14px] bg-flag/10 border border-flag/30 text-flag text-sm"
        >
          {error}
        </div>
      )}

      {/* Confirm Booking Button */}
      {selectedSlot && (
        <Button
          variant="accent"
          size="lg"
          onClick={handleBookSlot}
          loading={isBooking}
          disabled={isBooking}
          className="w-full"
          ariaLabel="Confirm booking"
        >
          {isBooking ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      )}
    </div>
  );
}

export default BookingWidget;
