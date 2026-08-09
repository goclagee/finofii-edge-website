import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>DTC</Badge>);
    expect(screen.getByText('DTC')).toBeDefined();
  });

  it('renders as a span element', () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText('Tag').tagName).toBe('SPAN');
  });

  it('applies default variant styles', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-ink/10');
    expect(badge.className).toContain('text-ink');
  });

  it('applies accent variant styles', () => {
    render(<Badge variant="accent">Active</Badge>);
    const badge = screen.getByText('Active');
    expect(badge.className).toContain('bg-accent/15');
    expect(badge.className).toContain('text-accent');
  });

  it('applies brass variant styles', () => {
    render(<Badge variant="brass">Premium</Badge>);
    const badge = screen.getByText('Premium');
    expect(badge.className).toContain('bg-brass/15');
  });

  it('applies flag variant styles', () => {
    render(<Badge variant="flag">Alert</Badge>);
    const badge = screen.getByText('Alert');
    expect(badge.className).toContain('bg-flag/15');
  });

  it('applies outline variant styles', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge.className).toContain('border');
    expect(badge.className).toContain('bg-transparent');
  });

  it('applies sm size styles', () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText('Small');
    expect(badge.className).toContain('px-2');
    expect(badge.className).toContain('text-xs');
  });

  it('applies md size styles by default', () => {
    render(<Badge>Medium</Badge>);
    const badge = screen.getByText('Medium');
    expect(badge.className).toContain('px-3');
    expect(badge.className).toContain('text-sm');
  });

  it('applies rounded-full for pill shape', () => {
    render(<Badge>Pill</Badge>);
    const badge = screen.getByText('Pill');
    expect(badge.className).toContain('rounded-full');
  });

  it('applies aria-label and status role when provided', () => {
    render(<Badge ariaLabel="Status: Active">Active</Badge>);
    const badge = screen.getByRole('status', { name: 'Status: Active' });
    expect(badge).toBeDefined();
  });

  it('does not have role when ariaLabel is not provided', () => {
    render(<Badge>Plain</Badge>);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
