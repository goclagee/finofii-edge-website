import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/form-validation';
import { syncLeadToCRM, sendNotifications } from '@/lib/crm-connector';
import type { LeadPayload } from '@/lib/crm-connector';

/**
 * POST /api/lead
 * Handles lead form submissions.
 * Validates payload, syncs to CRM, triggers notifications.
 * CRM failures are masked from the user — success is always returned
 * as long as the payload is valid.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payload with Zod
    const validation = leadFormSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0]?.toString() || '_form';
        fieldErrors[field] = issue.message;
      }
      return NextResponse.json(
        { success: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    const payload: LeadPayload = {
      entityType: validation.data.entityType,
      revenueBand: validation.data.revenueBand,
      currentTool: validation.data.currentTool,
      timezone: validation.data.timezone,
      email: validation.data.email,
      companyName: validation.data.companyName,
    };

    // Sync to CRM (handles failure internally via queue)
    const result = await syncLeadToCRM(payload);

    // Trigger notifications (fire-and-forget, don't block response)
    sendNotifications(payload).catch(() => {
      // Notification failures are non-critical
    });

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      message: 'Your submission has been received. We\'ll be in touch shortly.',
    });
  } catch (error) {
    // Unexpected errors
    return NextResponse.json(
      { success: false, errors: { _form: 'An unexpected error occurred. Please try again.' } },
      { status: 500 }
    );
  }
}
