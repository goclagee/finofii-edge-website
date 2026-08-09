'use client';

import { useState, type FormEvent } from 'react';
import { newsletterSchema } from '@/lib/form-validation';

export interface NewsletterSignupProps {
  /** Override the API endpoint for testing */
  apiEndpoint?: string;
  /** Optional class name for the container */
  className?: string;
}

/**
 * Newsletter signup form with email validation using newsletterSchema from form-validation.ts.
 * Validates email format (max 254 chars), shows inline error on failure,
 * and displays confirmation message on success within 2s.
 * Retains email on error for retry.
 */
export function NewsletterSignup({
  apiEndpoint = '/api/newsletter',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function validateEmail(value: string): string | null {
    if (!value.trim()) {
      return 'Email address is required';
    }
    const result = newsletterSchema.safeParse({ email: value });
    if (!result.success) {
      const issue = result.error.issues[0];
      if (issue?.code === 'too_big') {
        return 'Email must be 254 characters or fewer';
      }
      return 'Please enter a valid email address';
    }
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation using newsletterSchema
    const validationError = validateEmail(email);
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Subscription failed. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      // Email is retained for retry (state is not cleared)
    }
  }

  if (status === 'success') {
    return (
      <div className={className} role="status" aria-live="polite">
        <p className="text-accent font-medium text-sm">
          Thanks for subscribing! Check your inbox for confirmation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      aria-label="Newsletter signup"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="newsletter-email"
          className="text-sm font-medium"
        >
          Stay updated
        </label>
        <div className="flex gap-2">
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            placeholder="your@email.com"
            className={[
              'flex-1 px-3 py-2 rounded-[14px] bg-paper/10 border text-sm',
              'placeholder:text-paper/40 focus:outline-none focus:ring-2 focus:ring-paper',
              status === 'error' ? 'border-flag' : 'border-paper/20',
            ].join(' ')}
            aria-label="Email address for newsletter"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            maxLength={254}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-ink rounded-[14px] text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-paper"
            aria-label="Subscribe to newsletter"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {status === 'error' && errorMessage && (
          <p
            id="newsletter-error"
            className="text-flag text-xs mt-1"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}

export default NewsletterSignup;
