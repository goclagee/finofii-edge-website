/**
 * Integration tests for API routes.
 * Tests /api/lead, /api/newsletter, /api/booking endpoints.
 * Mocks external services (CRM, calendar provider).
 *
 * Validates: Requirements 10.4, 10.5, 10.9, 19.6, 19.7
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as leadPOST } from './lead/route';
import { POST as newsletterPOST } from './newsletter/route';
import { GET as bookingGET, POST as bookingPOST } from './booking/route';
import {
  calculateBackoffDelay,
  clearRetryQueue,
  getRetryQueue,
  DEFAULT_RETRY_CONFIG,
} from '@/lib/crm-connector';

// Mock global fetch for external service calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

function createRequest(url: string, options?: { method?: string; body?: unknown }) {
  const init: RequestInit = {
    method: options?.method || 'GET',
  };
  if (options?.body) {
    init.body = JSON.stringify(options.body);
    init.headers = { 'Content-Type': 'application/json' };
  }
  return new NextRequest(new URL(url, 'http://localhost:3000'), init);
}

describe('/api/lead', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearRetryQueue();
    process.env.CRM_API_URL = 'https://crm.example.com/api/leads';
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
    process.env.WHATSAPP_API_URL = 'https://wa.example.com/send';
  });

  afterEach(() => {
    delete process.env.CRM_API_URL;
    delete process.env.SLACK_WEBHOOK_URL;
    delete process.env.WHATSAPP_API_URL;
  });

  const validPayload = {
    entityType: 'llc',
    revenueBand: '100k_500k',
    currentTool: 'quickbooks',
    timezone: 'America/New_York',
    email: 'test@example.com',
    companyName: 'Test Corp',
  };

  it('valid submission triggers CRM sync call', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    const request = createRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: validPayload,
    });

    const response = await leadPOST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.leadId).toBeDefined();
    expect(data.message).toContain('received');

    // Verify CRM was called
    expect(mockFetch).toHaveBeenCalledWith(
      'https://crm.example.com/api/leads',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining(validPayload.email),
      })
    );
  });

  it('CRM failure queues retry and returns success to user', async () => {
    // CRM call fails
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('crm.example.com')) {
        return Promise.reject(new Error('CRM unavailable'));
      }
      // Notifications succeed
      return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }));
    });

    const request = createRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: validPayload,
    });

    const response = await leadPOST(request);
    const data = await response.json();

    // User still gets success
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.leadId).toBeDefined();

    // Verify submission was queued for retry
    const queue = getRetryQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].payload.email).toBe(validPayload.email);
  });

  it('invalid payload returns 400 with field errors', async () => {
    const invalidPayload = {
      entityType: 'invalid_type',
      revenueBand: '',
      currentTool: 'quickbooks',
      timezone: '',
      email: 'not-an-email',
    };

    const request = createRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: invalidPayload,
    });

    const response = await leadPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    // Should have errors for invalid fields
    expect(Object.keys(data.errors).length).toBeGreaterThan(0);
  });

  it('missing required fields returns 400 with specific field errors', async () => {
    const request = createRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: { email: 'test@example.com' },
    });

    const response = await leadPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });
});

describe('/api/newsletter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEWSLETTER_API_URL = 'https://newsletter.example.com/subscribe';
  });

  afterEach(() => {
    delete process.env.NEWSLETTER_API_URL;
  });

  it('valid email returns success', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    const request = createRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: { email: 'user@example.com' },
    });

    const response = await newsletterPOST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('subscribed');
  });

  it('invalid email returns 400 with error', async () => {
    const request = createRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: { email: 'not-valid' },
    });

    const response = await newsletterPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.email).toBeDefined();
  });

  it('empty email returns 400', async () => {
    const request = createRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: { email: '' },
    });

    const response = await newsletterPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('email exceeding 254 chars returns 400', async () => {
    const longEmail = 'a'.repeat(250) + '@b.co';

    const request = createRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: { email: longEmail },
    });

    const response = await newsletterPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});

describe('/api/booking', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.CALENDAR_API_URL = 'https://cal.example.com/api';
  });

  afterEach(() => {
    delete process.env.CALENDAR_API_URL;
  });

  describe('GET /api/booking (slots)', () => {
    it('returns slots for a valid timezone', async () => {
      const mockSlots = [
        { id: 'slot1', startTime: '2025-02-01T09:00:00Z', endTime: '2025-02-01T09:30:00Z', available: true },
        { id: 'slot2', startTime: '2025-02-01T10:00:00Z', endTime: '2025-02-01T10:30:00Z', available: true },
      ];

      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ slots: mockSlots }), { status: 200 })
      );

      const request = createRequest('http://localhost:3000/api/booking?timezone=America/New_York');

      const response = await bookingGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.slots).toHaveLength(2);
      expect(data.slots[0].id).toBe('slot1');

      // Verify calendar API was called with timezone
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('timezone=America%2FNew_York'),
        expect.any(Object)
      );
    });

    it('returns 400 when timezone is missing', async () => {
      const request = createRequest('http://localhost:3000/api/booking');

      const response = await bookingGET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('timezone');
    });

    it('returns 503 when calendar provider is unavailable', async () => {
      delete process.env.CALENDAR_API_URL;

      const request = createRequest('http://localhost:3000/api/booking?timezone=America/New_York');

      const response = await bookingGET(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.success).toBe(false);
      expect(data.code).toBe('PROVIDER_UNAVAILABLE');
    });
  });

  describe('POST /api/booking', () => {
    it('creates a booking successfully', async () => {
      const mockConfirmation = {
        bookingId: 'bk_123',
        date: '2025-02-01',
        time: '09:00',
        timezone: 'America/New_York',
        duration: 30,
      };

      mockFetch.mockResolvedValue(
        new Response(JSON.stringify(mockConfirmation), { status: 200 })
      );

      const request = createRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        body: {
          slotId: 'slot1',
          leadId: 'lead_123',
          timezone: 'America/New_York',
          email: 'test@example.com',
        },
      });

      const response = await bookingPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.booking.bookingId).toBe('bk_123');
      expect(data.booking.timezone).toBe('America/New_York');
    });

    it('returns 400 when required fields are missing', async () => {
      const request = createRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        body: { slotId: 'slot1' },
      });

      const response = await bookingPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('returns 503 when calendar provider is unavailable', async () => {
      delete process.env.CALENDAR_API_URL;

      const request = createRequest('http://localhost:3000/api/booking', {
        method: 'POST',
        body: {
          slotId: 'slot1',
          leadId: 'lead_123',
          timezone: 'America/New_York',
        },
      });

      const response = await bookingPOST(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.success).toBe(false);
      expect(data.code).toBe('PROVIDER_UNAVAILABLE');
    });
  });
});

describe('CRM Connector - Exponential Backoff', () => {
  it('calculates correct backoff delays', () => {
    const config = DEFAULT_RETRY_CONFIG;

    // attempt 0: 1000 * 2^0 = 1000ms
    expect(calculateBackoffDelay(0, config)).toBe(1000);

    // attempt 1: 1000 * 2^1 = 2000ms
    expect(calculateBackoffDelay(1, config)).toBe(2000);

    // attempt 2: 1000 * 2^2 = 4000ms
    expect(calculateBackoffDelay(2, config)).toBe(4000);

    // attempt 3: 1000 * 2^3 = 8000ms
    expect(calculateBackoffDelay(3, config)).toBe(8000);

    // attempt 4: 1000 * 2^4 = 16000ms
    expect(calculateBackoffDelay(4, config)).toBe(16000);
  });

  it('caps delay at maxDelay', () => {
    const config = DEFAULT_RETRY_CONFIG;

    // attempt 5: 1000 * 2^5 = 32000 → capped at 30000
    expect(calculateBackoffDelay(5, config)).toBe(30000);

    // attempt 10: would be huge, still capped at 30000
    expect(calculateBackoffDelay(10, config)).toBe(30000);
  });

  it('respects custom config', () => {
    const config = {
      maxRetries: 3,
      baseDelay: 500,
      maxDelay: 5000,
      backoffMultiplier: 3,
    };

    // attempt 0: 500 * 3^0 = 500
    expect(calculateBackoffDelay(0, config)).toBe(500);

    // attempt 1: 500 * 3^1 = 1500
    expect(calculateBackoffDelay(1, config)).toBe(1500);

    // attempt 2: 500 * 3^2 = 4500
    expect(calculateBackoffDelay(2, config)).toBe(4500);

    // attempt 3: 500 * 3^3 = 13500 → capped at 5000
    expect(calculateBackoffDelay(3, config)).toBe(5000);
  });

  it('first delay equals baseDelay', () => {
    expect(calculateBackoffDelay(0, DEFAULT_RETRY_CONFIG)).toBe(DEFAULT_RETRY_CONFIG.baseDelay);
  });

  it('delay never exceeds maxDelay for any attempt number', () => {
    for (let attempt = 0; attempt < 100; attempt++) {
      expect(calculateBackoffDelay(attempt, DEFAULT_RETRY_CONFIG)).toBeLessThanOrEqual(
        DEFAULT_RETRY_CONFIG.maxDelay
      );
    }
  });
});
