import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingWidget } from './BookingWidget';

// Mock next/link for the Button component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('BookingWidget', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock Intl.DateTimeFormat for timezone detection
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      timeZone: 'America/New_York',
      locale: 'en-US',
      calendar: 'gregory',
      numberingSystem: 'latn',
    } as Intl.ResolvedDateTimeFormatOptions);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Fallback UI when provider unavailable', () => {
    it('displays fallback UI when API returns 503', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      render(<BookingWidget timezone="America/New_York" />);

      // Select a date to trigger the fetch
      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/scheduling temporarily unavailable/i)).toBeInTheDocument();
      });
    });

    it('shows fallback contact method email link', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      render(
        <BookingWidget
          timezone="America/New_York"
          fallbackContactMethod="support@finofii.com"
        />
      );

      // Select a date to trigger the fetch
      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('support@finofii.com')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /support@finofii.com/ })).toHaveAttribute(
          'href',
          'mailto:support@finofii.com'
        );
      });
    });

    it('shows default fallback email when no fallbackContactMethod provided', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('hello@finofii.com')).toBeInTheDocument();
      });
    });

    it('shows fallback UI when fetch throws a network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/scheduling temporarily unavailable/i)).toBeInTheDocument();
      });
    });

    it('fallback UI has role="alert" for accessibility', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('shows fallback UI when booking POST returns 503', async () => {
      // First fetch returns slots successfully
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            slots: [
              { id: 'slot-1', startTime: '2025-02-10T10:00:00Z', endTime: '2025-02-10T10:30:00Z', available: true },
            ],
          }),
        })
        // Booking POST returns 503
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
        });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      // Wait for slots to load
      await waitFor(() => {
        expect(screen.getByRole('radiogroup', { name: /available time slots/i })).toBeInTheDocument();
      });

      // Select a slot
      const slotButtons = screen.getAllByRole('radio', { checked: false });
      const timeSlot = slotButtons.find(btn => btn.closest('[aria-label="Available time slots"]'));
      if (timeSlot) {
        fireEvent.click(timeSlot);
      }

      // Click confirm
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /confirm booking/i })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

      await waitFor(() => {
        expect(screen.getByText(/scheduling temporarily unavailable/i)).toBeInTheDocument();
      });
    });
  });

  describe('Normal operation', () => {
    it('renders timezone selector and date picker', () => {
      render(<BookingWidget timezone="America/New_York" />);
      expect(screen.getByText(/schedule your free audit/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/select timezone/i)).toBeInTheDocument();
      expect(screen.getByRole('radiogroup', { name: /available dates/i })).toBeInTheDocument();
    });

    it('displays available time slots after selecting a date', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          slots: [
            { id: 'slot-1', startTime: '2025-02-10T14:00:00Z', endTime: '2025-02-10T14:30:00Z', available: true },
            { id: 'slot-2', startTime: '2025-02-10T15:00:00Z', endTime: '2025-02-10T15:30:00Z', available: true },
          ],
        }),
      });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('radiogroup', { name: /available time slots/i })).toBeInTheDocument();
      });
    });

    it('shows booking confirmation after successful booking', async () => {
      const onBookingConfirmed = vi.fn();

      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            slots: [
              { id: 'slot-1', startTime: '2025-02-10T14:00:00Z', endTime: '2025-02-10T14:30:00Z', available: true },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ bookingId: 'booking-123' }),
        });

      render(
        <BookingWidget
          timezone="America/New_York"
          onBookingConfirmed={onBookingConfirmed}
        />
      );

      // Select date
      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      // Wait for slots
      await waitFor(() => {
        expect(screen.getByRole('radiogroup', { name: /available time slots/i })).toBeInTheDocument();
      });

      // Select slot within the time slots radiogroup
      const timeSlotGroup = screen.getByRole('radiogroup', { name: /available time slots/i });
      const slotButton = timeSlotGroup.querySelector('button');
      if (slotButton) {
        fireEvent.click(slotButton);
      }

      // Confirm booking
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /confirm booking/i })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

      await waitFor(() => {
        expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
      });

      expect(onBookingConfirmed).toHaveBeenCalledTimes(1);
      expect(onBookingConfirmed).toHaveBeenCalledWith(
        expect.objectContaining({
          timezone: 'America/New_York',
          slotId: 'slot-1',
        })
      );
    });

    it('shows no slots message when date has no availability', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ slots: [] }),
      });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/no available slots/i)).toBeInTheDocument();
      });
    });

    it('shows fallback UI on non-503 fetch failure with fetch-related error', async () => {
      // The component throws 'Unable to fetch available slots' which contains 'fetch',
      // causing it to show the unavailable/fallback UI
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<BookingWidget timezone="America/New_York" />);

      const dateButtons = screen.getAllByRole('radio');
      fireEvent.click(dateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/scheduling temporarily unavailable/i)).toBeInTheDocument();
      });
    });
  });
});
