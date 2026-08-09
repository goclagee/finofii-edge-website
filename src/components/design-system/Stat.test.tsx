import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Stat } from './Stat';

describe('Stat', () => {
  it('renders value and label', () => {
    render(<Stat value="1,234" label="Total Revenue" />);
    expect(screen.getByText('1,234')).toBeDefined();
    expect(screen.getByText('Total Revenue')).toBeDefined();
  });

  it('renders with prefix', () => {
    render(<Stat value="5,000" label="Revenue" prefix="$" />);
    expect(screen.getByText('$')).toBeDefined();
  });

  it('renders with suffix', () => {
    render(<Stat value="42" label="Growth" suffix="%" />);
    expect(screen.getByText('%')).toBeDefined();
  });

  it('uses IBM Plex Mono (font-data) for numeric display', () => {
    const { container } = render(<Stat value="100" label="Count" />);
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl).not.toBeNull();
    expect(numericEl!.className).toContain('font-data');
  });

  it('renders trend indicator when provided', () => {
    render(<Stat value="50" label="Growth" trend="up" trendValue="+12%" />);
    expect(screen.getByText('+12%')).toBeDefined();
    expect(screen.getByText('↑')).toBeDefined();
  });

  it('applies correct color for up trend', () => {
    render(<Stat value="50" label="Growth" trend="up" trendValue="+5%" />);
    const trendEl = screen.getByText('↑').closest('div');
    expect(trendEl!.className).toContain('text-accent');
  });

  it('applies correct color for down trend', () => {
    render(<Stat value="30" label="Decline" trend="down" trendValue="-3%" />);
    const trendEl = screen.getByText('↓').closest('div');
    expect(trendEl!.className).toContain('text-flag');
  });

  it('applies correct color for flat trend', () => {
    render(<Stat value="50" label="Steady" trend="flat" trendValue="0%" />);
    const trendEl = screen.getByText('→').closest('div');
    expect(trendEl!.className).toContain('text-ink/60');
  });

  it('does not render trend without trendValue', () => {
    const { container } = render(<Stat value="100" label="Count" trend="up" />);
    expect(container.querySelector('[aria-label*="Trend"]')).toBeNull();
  });

  it('applies sm size styles', () => {
    const { container } = render(<Stat value="50" label="Small" size="sm" />);
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl!.className).toContain('text-2xl');
  });

  it('applies md size styles by default', () => {
    const { container } = render(<Stat value="50" label="Medium" />);
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl!.className).toContain('text-4xl');
  });

  it('applies lg size styles', () => {
    const { container } = render(<Stat value="50" label="Large" size="lg" />);
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl!.className).toContain('text-5xl');
  });

  it('has aria-label on the value element', () => {
    const { container } = render(
      <Stat value="500" label="Revenue" prefix="$" suffix="k" />
    );
    const numericEl = container.querySelector('[data-numeric="true"]');
    expect(numericEl!.getAttribute('aria-label')).toBe('Revenue: $500k');
  });

  it('trend value uses font-data class', () => {
    render(<Stat value="50" label="Growth" trend="up" trendValue="+12%" />);
    const trendValueEl = screen.getByText('+12%');
    expect(trendValueEl.className).toContain('font-data');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Stat value="1,234" label="Total Revenue" prefix="$" trend="up" trendValue="+5%" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
