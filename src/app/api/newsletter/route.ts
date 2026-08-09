import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/form-validation';

/**
 * POST /api/newsletter
 * Handles newsletter signup submissions.
 * Validates email format and subscribes the user.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate email with Zod
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0]?.toString() || 'email';
        fieldErrors[field] = issue.message;
      }
      return NextResponse.json(
        { success: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    // In production, this would call a newsletter provider (e.g., Mailchimp, ConvertKit)
    const newsletterApiUrl = process.env.NEWSLETTER_API_URL;
    if (newsletterApiUrl) {
      const response = await fetch(newsletterApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: validation.data.email }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { success: false, errors: { email: 'Subscription failed. Please try again.' } },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { _form: 'An unexpected error occurred. Please try again.' } },
      { status: 500 }
    );
  }
}
