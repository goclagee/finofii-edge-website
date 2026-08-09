import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, createBooking } from '@/lib/calendar-client';
import type { CalendarError } from '@/lib/calendar-client';

function isCalendarError(error: unknown): error is CalendarError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

/**
 * GET /api/booking?timezone={tz}&date={date}
 * Returns available booking slots for a timezone and optional start date.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timezone = searchParams.get('timezone');
    const date = searchParams.get('date') || undefined;

    if (!timezone) {
      return NextResponse.json(
        { success: false, error: 'timezone parameter is required' },
        { status: 400 }
      );
    }

    const slots = await getAvailableSlots(timezone, date);

    return NextResponse.json({
      success: true,
      slots,
    });
  } catch (error) {
    if (isCalendarError(error) && error.code === 'PROVIDER_UNAVAILABLE') {
      return NextResponse.json(
        {
          success: false,
          error: 'Scheduling is temporarily unavailable. Please email us at hello@finofii.com.',
          code: 'PROVIDER_UNAVAILABLE',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/booking
 * Creates a booking for a selected time slot.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { slotId, leadId, timezone, email, name } = body;

    if (!slotId || !leadId || !timezone) {
      return NextResponse.json(
        { success: false, error: 'slotId, leadId, and timezone are required' },
        { status: 400 }
      );
    }

    const confirmation = await createBooking({
      slotId,
      leadId,
      timezone,
      email,
      name,
    });

    return NextResponse.json({
      success: true,
      booking: confirmation,
    });
  } catch (error) {
    if (isCalendarError(error)) {
      if (error.code === 'PROVIDER_UNAVAILABLE') {
        return NextResponse.json(
          {
            success: false,
            error: 'Scheduling is temporarily unavailable. Please email us at hello@finofii.com.',
            code: 'PROVIDER_UNAVAILABLE',
          },
          { status: 503 }
        );
      }
      if (error.code === 'SLOT_TAKEN') {
        return NextResponse.json(
          { success: false, error: 'Selected slot is no longer available. Please choose another time.', code: 'SLOT_TAKEN' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
