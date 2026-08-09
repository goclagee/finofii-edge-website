'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from './Button';

export interface PricingFeature {
  /** Feature name */
  name: string;
  /** Whether this feature is included in the tier */
  included: boolean;
  /** Optional detail text */
  detail?: string;
}

export interface PricingTierProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tier name (e.g., "Essentials", "Growth", "Scale") */
  name: string;
  /** Price display text */
  price: string;
  /** Price period (e.g., "/month") */
  period?: string;
  /** Brief description of the tier */
  description?: string;
  /** List of features with included/excluded state */
  features: PricingFeature[];
  /** Whether this tier is highlighted (e.g., recommended or selected) */
  highlighted?: boolean;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Called when the CTA is clicked */
  onCtaClick?: () => void;
  /** Optional badge (e.g., "Popular", "Best Value") */
  badge?: ReactNode;
  /** Additional class name */
  className?: string;
}

/**
 * PricingTier component for tier card layout with feature list,
 * highlight state (accent border), and CTA button.
 *
 * When highlighted, displays with an accent border and elevated shadow
 * to emphasize the recommended or selected tier.
 */
export const PricingTier = forwardRef<HTMLDivElement, PricingTierProps>(
  function PricingTier(
    {
      name,
      price,
      period = '/month',
      description,
      features,
      highlighted = false,
      ctaText = 'Get Started',
      ctaHref,
      onCtaClick,
      badge,
      className = '',
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={[
          'relative flex flex-col p-6 rounded-[14px]',
          'border-2 transition-all duration-300',
          highlighted
            ? 'border-accent shadow-xl scale-[1.02]'
            : 'border-ink/10 shadow-md hover:border-ink/20 hover:shadow-lg',
          'bg-paper',
          className,
        ].join(' ')}
        aria-label={`${name} pricing tier${highlighted ? ' - highlighted' : ''}`}
        {...rest}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            {badge}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-lg font-semibold text-ink m-0">{name}</h3>
          {description && (
            <p className="text-sm text-ink/70 m-0">{description}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span
            className="text-4xl font-bold font-data"
            data-numeric="true"
          >
            {price}
          </span>
          {period && (
            <span className="text-sm text-ink/60">{period}</span>
          )}
        </div>

        {/* Features list */}
        <ul className="flex flex-col gap-3 mb-8 flex-1 list-none p-0 m-0">
          {features.map((feature) => (
            <li
              key={feature.name}
              className="flex items-start gap-2 text-sm"
            >
              {feature.included ? (
                <svg
                  className="h-5 w-5 shrink-0 text-accent"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 shrink-0 text-ink/30"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span
                className={
                  feature.included ? 'text-ink' : 'text-ink/50'
                }
              >
                {feature.name}
                {feature.detail && (
                  <span className="block text-xs text-ink/50 mt-0.5">
                    {feature.detail}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={highlighted ? 'accent' : 'secondary'}
          size="md"
          href={ctaHref}
          onClick={onCtaClick}
          className="w-full justify-center"
          ariaLabel={`${ctaText} - ${name} tier`}
        >
          {ctaText}
        </Button>
      </div>
    );
  }
);

export default PricingTier;
