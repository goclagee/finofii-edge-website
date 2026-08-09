'use client';

import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/design-system/Button';
import { FormField } from '@/components/design-system/FormField';
import { validateLeadStep } from '@/lib/form-validation';
import type { IndustryType } from '@/types/dashboard';
import type { ServiceType } from '@/types/case-study';
import type {
  EntityType,
  RevenueBand,
  AccountingTool,
  LeadSubmission,
} from '@/types/lead';

// --- Types ---

export interface LeadFormProps {
  prefilledEntityType?: IndustryType;
  prefilledService?: ServiceType;
  onSubmitSuccess?: (lead: LeadSubmission) => void;
  onSubmitError?: (error: FormError) => void;
}

export interface FormError {
  message: string;
  code?: string;
}

interface LeadFormData {
  entityType: EntityType | '';
  revenueBand: RevenueBand | '';
  currentTool: AccountingTool | '';
  timezone: string;
  email: string;
  companyName: string;
}

// --- Option Definitions ---

const ENTITY_TYPE_OPTIONS: { value: EntityType; label: string }[] = [
  { value: 'llc', label: 'LLC' },
  { value: 'scorp', label: 'S-Corp' },
  { value: 'ccorp', label: 'C-Corp' },
  { value: 'sole_prop', label: 'Sole Proprietor' },
  { value: 'partnership', label: 'Partnership' },
];

const REVENUE_BAND_OPTIONS: { value: RevenueBand; label: string }[] = [
  { value: 'pre_revenue', label: 'Pre-revenue' },
  { value: '0_100k', label: '$0 – $100K' },
  { value: '100k_500k', label: '$100K – $500K' },
  { value: '500k_1m', label: '$500K – $1M' },
  { value: '1m_5m', label: '$1M – $5M' },
  { value: '5m_plus', label: '$5M+' },
];

const ACCOUNTING_TOOL_OPTIONS: { value: AccountingTool; label: string }[] = [
  { value: 'quickbooks', label: 'QuickBooks' },
  { value: 'xero', label: 'Xero' },
  { value: 'wave', label: 'Wave' },
  { value: 'freshbooks', label: 'FreshBooks' },
  { value: 'spreadsheet', label: 'Spreadsheet' },
  { value: 'none', label: 'None' },
];

const TIMEZONE_OPTIONS: string[] = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
];

const TOTAL_STEPS = 5;

// --- Map industry type to entity type for prefill ---

function mapIndustryToEntityType(industry: IndustryType): EntityType | undefined {
  const mapping: Record<IndustryType, EntityType> = {
    dtc: 'llc',
    agency: 'llc',
    saas: 'ccorp',
    cpa: 'partnership',
  };
  return mapping[industry];
}

// --- Component ---

export function LeadForm({
  prefilledEntityType,
  prefilledService,
  onSubmitSuccess,
  onSubmitError,
}: LeadFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>({
    entityType: '',
    revenueBand: '',
    currentTool: '',
    timezone: '',
    email: '',
    companyName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Handle prefilled entity type — auto-advance past step 1
  useEffect(() => {
    if (prefilledEntityType) {
      const entityType = mapIndustryToEntityType(prefilledEntityType);
      if (entityType) {
        setFormData((prev) => ({ ...prev, entityType }));
        setCurrentStep(2);
      }
    }
  }, [prefilledEntityType]);

  const validateCurrentStep = useCallback((): boolean => {
    const result = validateLeadStep(currentStep, formData as unknown as Partial<LeadSubmission>);
    if (!result.valid) {
      setErrors(result.errors);
      return false;
    }
    setErrors({});
    return true;
  }, [currentStep, formData]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setDirection('forward');
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  }, [validateCurrentStep]);

  const handleBack = useCallback(() => {
    setDirection('backward');
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validateCurrentStep()) return;

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entityType: formData.entityType,
            revenueBand: formData.revenueBand,
            currentTool: formData.currentTool,
            timezone: formData.timezone,
            email: formData.email,
            companyName: formData.companyName || undefined,
          }),
        });

        if (!response.ok) {
          throw new Error('Submission failed. Please try again.');
        }

        const result = await response.json();
        const lead: LeadSubmission = {
          id: result.leadId || '',
          entityType: formData.entityType as EntityType,
          revenueBand: formData.revenueBand as RevenueBand,
          currentTool: formData.currentTool as AccountingTool,
          timezone: formData.timezone,
          email: formData.email,
          companyName: formData.companyName || undefined,
          submittedAt: new Date().toISOString(),
          source: typeof window !== 'undefined' ? window.location.pathname : '/book',
          prefilledIndustry: prefilledEntityType,
        };

        onSubmitSuccess?.(lead);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Network error. Please try again.';
        setSubmitError(message);
        onSubmitError?.({ message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateCurrentStep, onSubmitSuccess, onSubmitError, prefilledEntityType]
  );

  const updateField = <K extends keyof LeadFormData>(
    field: K,
    value: LeadFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field being changed
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      aria-label="Lead qualification form"
      noValidate
    >
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Step Content with animation */}
      <div className="relative overflow-hidden min-h-[280px]">
        <div
          key={currentStep}
          className={`transition-all duration-300 ease-out ${
            direction === 'forward'
              ? 'animate-slide-in-right'
              : 'animate-slide-in-left'
          }`}
        >
          {currentStep === 1 && (
            <StepEntityType
              value={formData.entityType}
              error={errors.entityType}
              onChange={(val) => updateField('entityType', val)}
            />
          )}
          {currentStep === 2 && (
            <StepRevenueBand
              value={formData.revenueBand}
              error={errors.revenueBand}
              onChange={(val) => updateField('revenueBand', val)}
            />
          )}
          {currentStep === 3 && (
            <StepAccountingTool
              value={formData.currentTool}
              error={errors.currentTool}
              onChange={(val) => updateField('currentTool', val)}
            />
          )}
          {currentStep === 4 && (
            <StepTimezone
              value={formData.timezone}
              error={errors.timezone}
              onChange={(val) => updateField('timezone', val)}
            />
          )}
          {currentStep === 5 && (
            <StepContact
              email={formData.email}
              companyName={formData.companyName}
              errors={errors}
              onEmailChange={(val) => updateField('email', val)}
              onCompanyChange={(val) => updateField('companyName', val)}
            />
          )}
        </div>
      </div>

      {/* Submit Error */}
      {submitError && (
        <div
          role="alert"
          className="mt-4 p-3 rounded-[14px] bg-flag/10 border border-flag/30 text-flag text-sm"
        >
          {submitError}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6 gap-4">
        {currentStep > 1 ? (
          <Button
            variant="ghost"
            size="md"
            onClick={handleBack}
            type="button"
            aria-label="Go back to previous step"
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < TOTAL_STEPS ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            type="button"
            aria-label={`Continue to step ${currentStep + 1}`}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="accent"
            size="md"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            aria-label="Submit form"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </div>
    </form>
  );
}

// --- Progress Bar ---

function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-ink/70">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-ink/50">{Math.round(progress)}%</span>
      </div>
      <div
        className="h-2 bg-ink/10 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <div
          className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// --- Step Components ---

interface CardSelectorProps<T extends string> {
  options: { value: T; label: string }[];
  value: T | '';
  onChange: (val: T) => void;
  name: string;
}

function CardSelector<T extends string>({
  options,
  value,
  onChange,
  name,
}: CardSelectorProps<T>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={name}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={[
            'p-4 rounded-[14px] border-2 text-left transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
            value === option.value
              ? 'border-accent bg-accent/5 text-ink font-medium'
              : 'border-ink/15 bg-paper text-ink hover:border-ink/30',
          ].join(' ')}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function StepEntityType({
  value,
  error,
  onChange,
}: {
  value: EntityType | '';
  error?: string;
  onChange: (val: EntityType) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-1">
        What type of entity is your business?
      </h3>
      <p className="text-sm text-ink/60 mb-4">
        Select the entity structure that best describes your business.
      </p>
      <CardSelector
        options={ENTITY_TYPE_OPTIONS}
        value={value}
        onChange={onChange}
        name="Entity type"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

function StepRevenueBand({
  value,
  error,
  onChange,
}: {
  value: RevenueBand | '';
  error?: string;
  onChange: (val: RevenueBand) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-1">
        What is your annual revenue band?
      </h3>
      <p className="text-sm text-ink/60 mb-4">
        This helps us recommend the right service tier.
      </p>
      <CardSelector
        options={REVENUE_BAND_OPTIONS}
        value={value}
        onChange={onChange}
        name="Revenue band"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

function StepAccountingTool({
  value,
  error,
  onChange,
}: {
  value: AccountingTool | '';
  error?: string;
  onChange: (val: AccountingTool) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-1">
        What accounting tool do you currently use?
      </h3>
      <p className="text-sm text-ink/60 mb-4">
        We integrate with most major accounting platforms.
      </p>
      <CardSelector
        options={ACCOUNTING_TOOL_OPTIONS}
        value={value}
        onChange={onChange}
        name="Accounting tool"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

function StepTimezone({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-1">
        What is your timezone?
      </h3>
      <p className="text-sm text-ink/60 mb-4">
        We&apos;ll schedule communications and deliverables around your hours.
      </p>
      <FormField
        label="Timezone"
        error={error}
        validationState={error ? 'error' : 'default'}
        required
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Timezone"
          aria-invalid={!!error || undefined}
          className={[
            'w-full rounded-[14px] border bg-paper text-ink px-4 py-3 text-base',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
            error ? 'border-flag' : 'border-ink/20 focus:border-accent',
          ].join(' ')}
        >
          <option value="">Select your timezone</option>
          {TIMEZONE_OPTIONS.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ').replace('America/', '')}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}

function StepContact({
  email,
  companyName,
  errors,
  onEmailChange,
  onCompanyChange,
}: {
  email: string;
  companyName: string;
  errors: Record<string, string>;
  onEmailChange: (val: string) => void;
  onCompanyChange: (val: string) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-1">
        Almost there! How can we reach you?
      </h3>
      <p className="text-sm text-ink/60 mb-4">
        Enter your email and we&apos;ll be in touch within 24 hours.
      </p>
      <div className="space-y-4">
        <FormField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@company.com"
          error={errors.email}
          validationState={errors.email ? 'error' : 'default'}
        />
        <FormField
          label="Company name"
          type="text"
          value={companyName}
          onChange={(e) => onCompanyChange(e.target.value)}
          placeholder="Your company (optional)"
          error={errors.companyName}
          validationState={errors.companyName ? 'error' : 'default'}
        />
      </div>
    </div>
  );
}

export default LeadForm;
