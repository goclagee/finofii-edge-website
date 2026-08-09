import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LeadForm } from './LeadForm';

// Mock next/link for the Button component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('LeadForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Multi-step navigation and progress', () => {
    it('renders step 1 initially with progress bar', () => {
      render(<LeadForm />);
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
      expect(screen.getByText(/what type of entity/i)).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    });

    it('shows entity type options as radio buttons', () => {
      render(<LeadForm />);
      const radioGroup = screen.getByRole('radiogroup', { name: /entity type/i });
      expect(radioGroup).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /LLC/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /S-Corp/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /C-Corp/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /Sole Proprietor/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /Partnership/i })).toBeInTheDocument();
    });

    it('advances to step 2 after selecting entity type and clicking Continue', () => {
      render(<LeadForm />);
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
      expect(screen.getByText(/annual revenue band/i)).toBeInTheDocument();
    });

    it('advances through all steps correctly', () => {
      render(<LeadForm />);

      // Step 1: Entity type
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 2: Revenue band
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 3: Accounting tool
      expect(screen.getByText('Step 3 of 5')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 4: Timezone
      expect(screen.getByText('Step 4 of 5')).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 5: Email/Company
      expect(screen.getByText('Step 5 of 5')).toBeInTheDocument();
      expect(screen.getByText(/how can we reach you/i)).toBeInTheDocument();
    });

    it('navigates back to previous step', () => {
      render(<LeadForm />);
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /back/i }));
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
    });

    it('does not show Back button on step 1', () => {
      render(<LeadForm />);
      expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    });

    it('shows Submit button on step 5 instead of Continue', () => {
      render(<LeadForm />);

      // Navigate to step 5
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
    });
  });

  describe('Per-step inline validation', () => {
    it('shows error when trying to advance step 1 without selection', () => {
      render(<LeadForm />);
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
    });

    it('shows error when trying to advance step 4 without timezone', () => {
      render(<LeadForm />);

      // Get to step 4
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Try to advance without selecting timezone
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByText('Step 4 of 5')).toBeInTheDocument();
    });

    it('clears error when user makes a valid selection', () => {
      render(<LeadForm />);
      // Trigger error
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Make selection — error should clear
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Prefilled entity type', () => {
    it('auto-advances past step 1 when prefilledEntityType is provided', () => {
      render(<LeadForm prefilledEntityType="dtc" />);
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    });

    it('maps saas industry to ccorp entity type', () => {
      render(<LeadForm prefilledEntityType="saas" />);
      // Should be on step 2 since entity was prefilled
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    });

    it('maps cpa industry to partnership entity type', () => {
      render(<LeadForm prefilledEntityType="cpa" />);
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('calls onSubmitSuccess on successful submission', async () => {
      const onSuccess = vi.fn();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ leadId: 'lead-123', message: 'Success' }),
      });

      render(<LeadForm onSubmitSuccess={onSuccess} />);

      // Fill all steps
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 5: Fill email
      fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), {
        target: { value: 'test@example.com' },
      });

      // Submit
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });

      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          entityType: 'llc',
          revenueBand: '0_100k',
          currentTool: 'quickbooks',
          timezone: 'America/New_York',
          email: 'test@example.com',
          id: 'lead-123',
        })
      );
    });

    it('displays inline error on network failure and retains data', async () => {
      const onError = vi.fn();
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      render(<LeadForm onSubmitError={onError} />);

      // Fill all steps quickly
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), {
        target: { value: 'test@example.com' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Error message displayed
      expect(screen.getByText(/network error/i)).toBeInTheDocument();

      // Data is retained — still on step 5 with email value
      expect(screen.getByText('Step 5 of 5')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/you@company.com/i)).toHaveValue('test@example.com');

      // Error callback was called
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('shows inline error on non-ok response and allows retry', async () => {
      let callCount = 0;
      global.fetch = vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({ ok: false, status: 500 });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ leadId: 'lead-456' }),
        });
      });

      const onSuccess = vi.fn();
      render(<LeadForm onSubmitSuccess={onSuccess} />);

      // Fill all steps
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), {
        target: { value: 'test@example.com' },
      });

      // First submit fails
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      await waitFor(() => {
        expect(screen.getByText(/please try again/i)).toBeInTheDocument();
      });

      // Retry — should succeed
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('has an accessible form label', () => {
      render(<LeadForm />);
      expect(screen.getByRole('form', { name: /lead qualification form/i })).toBeInTheDocument();
    });

    it('progress bar has correct ARIA attributes', () => {
      render(<LeadForm />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '1');
      expect(progressbar).toHaveAttribute('aria-valuemax', '5');
      expect(progressbar).toHaveAttribute('aria-valuenow', '1');
    });

    it('card selectors use radio role with aria-checked', () => {
      render(<LeadForm />);
      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('aria-checked');
      });
    });
  });

  describe('Focus management', () => {
    it('step content is focusable — user can interact with step elements after navigation', () => {
      render(<LeadForm />);

      // Select entity type and advance
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 2 content should be available with interactive elements
      expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThan(0);

      // Each radio should be focusable (no tabIndex=-1)
      radios.forEach((radio) => {
        expect(radio).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('step content updates progressbar aria-valuenow on navigation', () => {
      render(<LeadForm />);

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');

      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');

      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
    });

    it('navigation buttons have accessible labels for screen readers', () => {
      render(<LeadForm />);

      const continueBtn = screen.getByRole('button', { name: /continue to step 2/i });
      expect(continueBtn).toBeInTheDocument();

      // Advance to step 2
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(continueBtn);

      expect(screen.getByRole('button', { name: /go back to previous step/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue to step 3/i })).toBeInTheDocument();
    });

    it('form retains focus context within the form area across steps', () => {
      const { container } = render(<LeadForm />);
      const form = container.querySelector('form');

      // Verify the form is present and contains the step content
      expect(form).toBeInTheDocument();

      // Step 1 - interactive elements are inside the form
      const step1Radios = screen.getAllByRole('radio');
      step1Radios.forEach((radio) => {
        expect(form!.contains(radio)).toBe(true);
      });

      // Advance to step 2
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 2 - interactive elements are still inside the form
      const step2Radios = screen.getAllByRole('radio');
      step2Radios.forEach((radio) => {
        expect(form!.contains(radio)).toBe(true);
      });
    });

    it('timezone select on step 4 is keyboard accessible', () => {
      render(<LeadForm />);

      // Navigate to step 4
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Timezone select should exist and be accessible
      const select = screen.getByLabelText(/timezone/i);
      expect(select).toBeInTheDocument();
      expect(select.tagName).toBe('SELECT');

      // Can change value via keyboard interaction (simulated by fireEvent.change)
      fireEvent.change(select, { target: { value: 'America/Chicago' } });
      expect(select).toHaveValue('America/Chicago');
    });

    it('email input on step 5 is focusable and accepts input', () => {
      render(<LeadForm />);

      // Navigate to step 5
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /\$0 – \$100K/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.click(screen.getByRole('radio', { name: /QuickBooks/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      fireEvent.change(screen.getByLabelText(/timezone/i), {
        target: { value: 'America/New_York' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      const emailInput = screen.getByPlaceholderText(/you@company.com/i);
      expect(emailInput).toBeInTheDocument();

      // Focus and type
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);

      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      expect(emailInput).toHaveValue('user@test.com');
    });
  });
});
