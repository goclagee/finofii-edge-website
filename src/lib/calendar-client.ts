/**
 * Calendar Client - Integrates with Cal.com for booking slots.
 * Handles slot fetching, booking submission, and provider unavailability.
 */

export interface BookingSlot {
  id: string;
  startTime: string;  // ISO 8601
  endTime: string;    // ISO 8601
  available: boolean;
}

export interface BookingPayload {
  slotId: string;
  leadId: string;
  timezone: string;
  email?: string;
  name?: string;
}

export interface BookingConfirmation {
  bookingId: string;
  date: string;
  time: string;
  timezone: string;
  duration: number;  // minutes
}

export interface CalendarError {
  code: 'PROVIDER_UNAVAILABLE' | 'SLOT_TAKEN' | 'INVALID_SLOT' | 'NETWORK_ERROR';
  message: string;
}

/**
 * Fetches available booking slots for a given timezone and date range.
 * Returns at least 5 business days of availability.
 */
export async function getAvailableSlots(
  timezone: string,
  startDate?: string
): Promise<BookingSlot[]> {
  const calApiUrl = process.env.CALENDAR_API_URL;
  if (!calApiUrl) {
    throw createCalendarError('PROVIDER_UNAVAILABLE', 'Calendar provider not configured');
  }

  const params = new URLSearchParams({ timezone });
  if (startDate) params.set('startDate', startDate);

  const response = await fetch(`${calApiUrl}/slots?${params.toString()}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    if (response.status === 503) {
      throw createCalendarError('PROVIDER_UNAVAILABLE', 'Calendar service temporarily unavailable');
    }
    throw createCalendarError('NETWORK_ERROR', `Calendar API error: ${response.status}`);
  }

  const data = await response.json();
  return data.slots as BookingSlot[];
}

/**
 * Creates a booking for a selected time slot.
 */
export async function createBooking(
  payload: BookingPayload
): Promise<BookingConfirmation> {
  const calApiUrl = process.env.CALENDAR_API_URL;
  if (!calApiUrl) {
    throw createCalendarError('PROVIDER_UNAVAILABLE', 'Calendar provider not configured');
  }

  const response = await fetch(`${calApiUrl}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw createCalendarError('SLOT_TAKEN', 'Selected time slot is no longer available');
    }
    if (response.status === 503) {
      throw createCalendarError('PROVIDER_UNAVAILABLE', 'Calendar service temporarily unavailable');
    }
    throw createCalendarError('NETWORK_ERROR', `Booking failed: ${response.status}`);
  }

  const data = await response.json();
  return data as BookingConfirmation;
}

function createCalendarError(code: CalendarError['code'], message: string): CalendarError {
  return { code, message };
}
