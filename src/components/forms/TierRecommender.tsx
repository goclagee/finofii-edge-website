'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/design-system/Button';
import { FormField } from '@/components/design-system/FormField';
import { recommendTier } from '@/lib/tier-recommender';
import type { TierRecommenderInputs } from '@/lib/tier-recommender';
import type { EntityType, TransactionVolume, RevenueBand, PricingTier } from '@/types/lead';

// --- Types ---

export interface TierRecommenderProps {
  onRecommendation?: (tier: PricingTier) => void;
}

// --- Option Definitions ---

const ENTITY_TYPE_OPTIONS: { value: EntityType; label: string }[] = [
  { value: 'sole_prop', label: 'Sole Proprietor' },
  { value: 'llc', label: 'LLC' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'scorp', label: 'S-Corp' },
  { value: 'ccorp', label: 'C-Corp' },
];

const TRANSACTION_VOLUME_OPTIONS: { value: TransactionVolume; label: string }[] = [
  { value: 'under_50', label: 'Under 50/month' },
  { value: '50_200', label: '50 – 200/month' },
  { value: '200_500', label: '200 – 500/month' },
  { value: '500_1000', label: '500 – 1,000/month' },
  { value: 'over_1000', label: 'Over 1,000/month' },
];

const REVENUE_BAND_OPTIONS: { value: RevenueBand; label: string }[] = [
  { value: 'pre_revenue', label: 'Pre-revenue' },
  { value: '0_100k', label: '$0 – $100K' },
  { value: '100k_500k', label: '$100K – $500K' },
  { value: '500k_1m', label: '$500K – $1M' },
  { value: '1m_5m', label: '$1M – $5M' },
  { value: '5m_plus', label: '$5M+' },
];

const TIER_DETAILS: Record<PricingTier, { name: string; description: string }> = {
  essentials: {
    name: 'Essentials',
    description: 'Core bookkeeping and compliance for early-stage businesses.',
  },
  growth: {
    name: 'Growth',
    description: 'Full-service accounting with dashboards and advisory check-ins.',
  },
  scale: {
    name: 'Scale',
    description: 'Enterprise-grade CFO services, custom reporting, and strategic planning.',
  },
};

// --- Component ---

export function TierRecommender({ onRecommendation }: TierRecommenderProps) {
  const [entityType, setEntityType] = useState<EntityType | ''>('');
  const [transactionVolume, setTransactionVolume] = useState<TransactionVolume | ''>('');
  const [revenueBand, setRevenueBand] = useState<RevenueBand | ''>('');
  const [recommendedTier, setRecommendedTier] = useState<PricingTier | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRecommend = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!entityType) {
      newErrors.entityType = 'Please select your entity type';
    }
    if (!transactionVolume) {
      newErrors.transactionVolume = 'Please select your transaction volume';
    }
    if (!revenueBand) {
      newErrors.revenueBand = 'Please select your revenue band';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const inputs: TierRecommenderInputs = {
      entityType: entityType as EntityType,
      monthlyTransactions: transactionVolume as TransactionVolume,
      revenueBand: revenueBand as RevenueBand,
    };

    const tier = recommendTier(inputs);
    setRecommendedTier(tier);
    onRecommendation?.(tier);
  }, [entityType, transactionVolume, revenueBand, onRecommendation]);

  const handleReset = () => {
    setEntityType('');
    setTransactionVolume('');
    setRevenueBand('');
    setRecommendedTier(null);
    setErrors({});
  };

  return (
    <div
      className="rounded-[14px] border border-ink/10 bg-paper p-6"
      aria-label="Tier recommender tool"
    >
      <h3 className="text-lg font-semibold text-ink mb-1">
        Find Your Ideal Plan
      </h3>
      <p className="text-sm text-ink/60 mb-6">
        Answer three questions and we'll recommend the right tier for your business.
      </p>

      <div className="space-y-5">
        {/* Entity Type Select */}
        <FormField
          label="Entity type"
          required
          error={errors.entityType}
          validationState={errors.entityType ? 'error' : 'default'}
        >
          <select
            value={entityType}
            onChange={(e) => {
              setEntityType(e.target.value as EntityType);
              if (errors.entityType) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.entityType;
                  return next;
                });
              }
            }}
            aria-label="Entity type"
            aria-invalid={!!errors.entityType || undefined}
            className={[
              'w-full rounded-[14px] border bg-paper text-ink px-4 py-3 text-base',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
              errors.entityType
                ? 'border-flag focus:border-flag'
                : 'border-ink/20 focus:border-accent',
            ].join(' ')}
          >
            <option value="">Select entity type</option>
            {ENTITY_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>

        {/* Transaction Volume Select */}
        <FormField
          label="Monthly transaction volume"
          required
          error={errors.transactionVolume}
          validationState={errors.transactionVolume ? 'error' : 'default'}
        >
          <select
            value={transactionVolume}
            onChange={(e) => {
              setTransactionVolume(e.target.value as TransactionVolume);
              if (errors.transactionVolume) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.transactionVolume;
                  return next;
                });
              }
            }}
            aria-label="Monthly transaction volume"
            aria-invalid={!!errors.transactionVolume || undefined}
            className={[
              'w-full rounded-[14px] border bg-paper text-ink px-4 py-3 text-base',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
              errors.transactionVolume
                ? 'border-flag focus:border-flag'
                : 'border-ink/20 focus:border-accent',
            ].join(' ')}
          >
            <option value="">Select transaction volume</option>
            {TRANSACTION_VOLUME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>

        {/* Revenue Band Select */}
        <FormField
          label="Annual revenue band"
          required
          error={errors.revenueBand}
          validationState={errors.revenueBand ? 'error' : 'default'}
        >
          <select
            value={revenueBand}
            onChange={(e) => {
              setRevenueBand(e.target.value as RevenueBand);
              if (errors.revenueBand) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.revenueBand;
                  return next;
                });
              }
            }}
            aria-label="Annual revenue band"
            aria-invalid={!!errors.revenueBand || undefined}
            className={[
              'w-full rounded-[14px] border bg-paper text-ink px-4 py-3 text-base',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
              errors.revenueBand
                ? 'border-flag focus:border-flag'
                : 'border-ink/20 focus:border-accent',
            ].join(' ')}
          >
            <option value="">Select revenue band</option>
            {REVENUE_BAND_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Button
          variant="accent"
          size="md"
          onClick={handleRecommend}
          className="w-full"
          ariaLabel="Get tier recommendation"
        >
          Get My Recommendation
        </Button>
      </div>

      {/* Recommendation Result */}
      {recommendedTier && (
        <div
          className="mt-6 rounded-[14px] border-2 border-accent bg-accent/5 p-5 transition-all duration-300"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-ink text-sm font-bold">
              ✓
            </span>
            <h4 className="text-lg font-semibold text-ink">
              We recommend{' '}
              <span className="text-accent">
                {TIER_DETAILS[recommendedTier].name}
              </span>
            </h4>
          </div>
          <p className="text-sm text-ink/70 ml-11">
            {TIER_DETAILS[recommendedTier].description}
          </p>
          <div className="mt-4 flex gap-3 ml-11">
            <Button
              variant="accent"
              size="sm"
              href="/book"
              ariaLabel={`Book a free audit with ${TIER_DETAILS[recommendedTier].name} plan`}
            >
              Book a Free Audit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              ariaLabel="Try different inputs"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TierRecommender;
