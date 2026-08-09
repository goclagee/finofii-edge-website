import { z } from 'zod';
import type { LeadSubmission } from '@/types/lead';

export const leadFormSchema = z.object({
  entityType: z.enum(['llc', 'scorp', 'ccorp', 'sole_prop', 'partnership']),
  revenueBand: z.enum(['pre_revenue', '0_100k', '100k_500k', '500k_1m', '1m_5m', '5m_plus']),
  currentTool: z.enum(['quickbooks', 'xero', 'wave', 'freshbooks', 'spreadsheet', 'none']),
  timezone: z.string().min(1).max(50),
  email: z.string().email().max(254),
  companyName: z.string().max(200).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email().max(254),
});

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Fields validated at each step of the multi-step lead form.
 * Step 1: entityType
 * Step 2: revenueBand
 * Step 3: currentTool
 * Step 4: timezone
 * Step 5: email (+ optional companyName)
 */
const STEP_FIELDS: Record<number, (keyof typeof leadFormSchema.shape)[]> = {
  1: ['entityType'],
  2: ['revenueBand'],
  3: ['currentTool'],
  4: ['timezone'],
  5: ['email', 'companyName'],
};

/**
 * Validates a single step of the multi-step lead form.
 * Returns field-level errors for inline display.
 */
export function validateLeadStep(
  step: number,
  data: Partial<LeadSubmission>
): ValidationResult {
  const fields = STEP_FIELDS[step];

  if (!fields) {
    return { valid: false, errors: { _form: 'Invalid step number' } };
  }

  const errors: Record<string, string> = {};

  for (const field of fields) {
    const fieldSchema = leadFormSchema.shape[field];
    const value = data[field as keyof Partial<LeadSubmission>];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      const issue = result.error.issues[0];
      errors[field] = issue?.message || `Invalid ${field}`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
