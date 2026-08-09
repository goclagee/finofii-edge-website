import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { PricingTier } from './PricingTier';

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const baseFeatures = [
  { name: 'Monthly bookkeeping', included: true },
  { name: 'Financial statements', included: true },
  { name: 'CFO advisory', included: false },
  { name: 'Tax planning', included: false, detail: 'Annual only' },
];

describe('PricingTier', () => {
  it('renders tier name and price', () => {
    render(
      <PricingTier name="Essentials" price="$499" features={baseFeatures} />
    );
    expect(screen.getByText('Essentials')).toBeDefined();
    expect(screen.getByText('$499')).toBeDefined();
  });

  it('renders price period', () => {
    render(
      <PricingTier name="Growth" price="$999" period="/month" features={baseFeatures} />
    );
    expect(screen.getByText('/month')).toBeDefined();
  });

  it('renders description when provided', () => {
    render(
      <PricingTier
        name="Scale"
        price="$1,999"
        description="For high-growth companies"
        features={baseFeatures}
      />
    );
    expect(screen.getByText('For high-growth companies')).toBeDefined();
  });

  it('renders all features with included/excluded indicators', () => {
    render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} />
    );
    expect(screen.getByText('Monthly bookkeeping')).toBeDefined();
    expect(screen.getByText('Financial statements')).toBeDefined();
    expect(screen.getByText('CFO advisory')).toBeDefined();
    expect(screen.getByText('Tax planning')).toBeDefined();
  });

  it('renders feature detail text', () => {
    render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} />
    );
    expect(screen.getByText('Annual only')).toBeDefined();
  });

  it('applies accent border when highlighted', () => {
    const { container } = render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} highlighted />
    );
    const card = container.firstElementChild!;
    expect(card.className).toContain('border-accent');
    expect(card.className).toContain('shadow-xl');
  });

  it('does not apply accent border when not highlighted', () => {
    const { container } = render(
      <PricingTier name="Essentials" price="$499" features={baseFeatures} />
    );
    const card = container.firstElementChild!;
    expect(card.className).toContain('border-ink/10');
    expect(card.className).not.toContain('border-accent');
  });

  it('renders CTA button with correct text', () => {
    render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} ctaText="Book Now" />
    );
    expect(screen.getByRole('button', { name: /Book Now/i })).toBeDefined();
  });

  it('renders CTA as link with correct href', () => {
    render(
      <PricingTier
        name="Growth"
        price="$999"
        features={baseFeatures}
        ctaText="Get Started"
        ctaHref="/book"
      />
    );
    const link = screen.getByRole('link', { name: /Get Started/i });
    expect(link.getAttribute('href')).toBe('/book');
  });

  it('fires onCtaClick when CTA button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <PricingTier
        name="Growth"
        price="$999"
        features={baseFeatures}
        onCtaClick={handleClick}
      />
    );
    const button = screen.getByRole('button', { name: /Get Started/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders badge when provided', () => {
    render(
      <PricingTier
        name="Growth"
        price="$999"
        features={baseFeatures}
        badge={<span>Popular</span>}
      />
    );
    expect(screen.getByText('Popular')).toBeDefined();
  });

  it('uses accent variant button when highlighted', () => {
    render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} highlighted />
    );
    // Highlighted tier gets accent button
    const cta = screen.getByRole('button', { name: /Get Started/i });
    expect(cta.className).toContain('bg-accent');
  });

  it('uses secondary variant button when not highlighted', () => {
    render(
      <PricingTier name="Essentials" price="$499" features={baseFeatures} />
    );
    const cta = screen.getByRole('button', { name: /Get Started/i });
    expect(cta.className).toContain('border-2');
  });

  it('has aria-label indicating tier name and highlighted state', () => {
    const { container, rerender } = render(
      <PricingTier name="Scale" price="$1999" features={baseFeatures} highlighted />
    );
    expect(container.firstElementChild!.getAttribute('aria-label')).toContain('Scale');
    expect(container.firstElementChild!.getAttribute('aria-label')).toContain('highlighted');

    rerender(
      <PricingTier name="Essentials" price="$499" features={baseFeatures} />
    );
    expect(container.firstElementChild!.getAttribute('aria-label')).toContain('Essentials');
    expect(container.firstElementChild!.getAttribute('aria-label')).not.toContain('highlighted');
  });

  it('renders numeric value with data-numeric attribute', () => {
    const { container } = render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} />
    );
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl).not.toBeNull();
    expect(numericEl!.textContent).toContain('$999');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <PricingTier name="Growth" price="$999" features={baseFeatures} ctaHref="/book" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
