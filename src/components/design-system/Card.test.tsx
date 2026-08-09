import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders with default variant', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card.className).toContain('bg-paper');
    expect(card.className).toContain('rounded-[14px]');
  });

  it('applies elevated variant styles', () => {
    render(<Card variant="elevated">Elevated</Card>);
    const card = screen.getByText('Elevated');
    expect(card.className).toContain('shadow-lg');
  });

  it('applies interactive variant styles with hover effects', () => {
    render(<Card variant="interactive">Interactive</Card>);
    const card = screen.getByText('Interactive');
    expect(card.className).toContain('hover:shadow-xl');
    expect(card.className).toContain('hover:-translate-y-1');
    expect(card.className).toContain('cursor-pointer');
  });

  it('applies pricing variant styles', () => {
    render(<Card variant="pricing">Pricing</Card>);
    const card = screen.getByText('Pricing');
    expect(card.className).toContain('border-2');
    expect(card.className).toContain('hover:border-accent');
  });

  it('supports expandable behavior with aria-expanded', () => {
    const onToggle = vi.fn();
    render(
      <Card expandable expanded={false} onToggle={onToggle}>
        Expandable
      </Card>
    );
    const card = screen.getByRole('button');
    expect(card.getAttribute('aria-expanded')).toBe('false');
  });

  it('calls onToggle when expandable card is clicked', () => {
    const onToggle = vi.fn();
    render(
      <Card expandable expanded={false} onToggle={onToggle}>
        Click me
      </Card>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle on Enter key when expandable', () => {
    const onToggle = vi.fn();
    render(
      <Card expandable expanded={false} onToggle={onToggle}>
        Press Enter
      </Card>
    );
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle on Space key when expandable', () => {
    const onToggle = vi.fn();
    render(
      <Card expandable expanded={false} onToggle={onToggle}>
        Press Space
      </Card>
    );
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not have role button when not expandable', () => {
    render(<Card>Static card</Card>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('applies aria-label when provided', () => {
    render(
      <Card expandable onToggle={() => {}} ariaLabel="Toggle details">
        Details
      </Card>
    );
    const card = screen.getByRole('button', { name: 'Toggle details' });
    expect(card).toBeDefined();
  });

  it('has focus-visible ring styles', () => {
    render(<Card>Focusable</Card>);
    const card = screen.getByText('Focusable');
    expect(card.className).toContain('focus-visible:ring-2');
  });
});
