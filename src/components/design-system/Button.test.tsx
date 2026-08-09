import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Mock next/link to render a plain anchor for testing
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDefined();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders primary variant with correct styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button.className).toContain('bg-ink');
    expect(button.className).toContain('text-paper');
  });

  it('renders secondary variant with border', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-ink');
  });

  it('renders ghost variant without background', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button.className).toContain('bg-transparent');
  });

  it('renders accent variant', () => {
    render(<Button variant="accent">Accent</Button>);
    const button = screen.getByRole('button', { name: 'Accent' });
    expect(button.className).toContain('bg-accent');
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button').className).toContain('px-4');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button').className).toContain('px-6');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).toContain('px-8');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toHaveProperty('disabled', true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');
  });

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button', { name: 'Loading' });
    expect(button).toHaveProperty('disabled', true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    // Spinner SVG should be present
    expect(button.querySelector('svg')).not.toBeNull();
  });

  it('fires onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        No click
      </Button>
    );
    fireEvent.click(screen.getByRole('button', { name: 'No click' }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/book">Book now</Button>);
    const link = screen.getByRole('link', { name: 'Book now' });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/book');
  });

  it('applies aria-label when provided', () => {
    render(<Button ariaLabel="Navigate to booking">Go</Button>);
    const button = screen.getByRole('button', { name: 'Navigate to booking' });
    expect(button).toBeDefined();
  });

  it('sets data-magnetic attribute when magnetic prop is true', () => {
    render(<Button magnetic>Magnetic</Button>);
    const button = screen.getByRole('button', { name: 'Magnetic' });
    expect(button.getAttribute('data-magnetic')).toBe('true');
  });

  it('has visible focus indicator styles', () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole('button', { name: 'Focus me' });
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-offset-2');
  });
});
