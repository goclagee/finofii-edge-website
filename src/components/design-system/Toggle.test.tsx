import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with a switch role', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Dark mode" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDefined();
  });

  it('reflects checked state via aria-checked', () => {
    const { rerender } = render(
      <Toggle checked={false} onChange={() => {}} label="Notifications" />
    );
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('false');

    rerender(<Toggle checked={true} onChange={() => {}} label="Notifications" />);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });

  it('calls onChange with toggled value on click', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} label="Toggle" />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with toggled value on Enter key', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={true} onChange={handleChange} label="Toggle" />);
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('calls onChange with toggled value on Space key', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} label="Toggle" />);
    fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(
      <Toggle checked={false} onChange={handleChange} label="Disabled" disabled />
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled attribute and styles', () => {
    render(
      <Toggle checked={false} onChange={() => {}} label="Off" disabled />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveProperty('disabled', true);
    expect(toggle.className).toContain('opacity-50');
    expect(toggle.className).toContain('cursor-not-allowed');
  });

  it('displays label text when showLabel is true (default)', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Show label" />);
    expect(screen.getByText('Show label')).toBeDefined();
  });

  it('hides label visually when showLabel is false and uses aria-label', () => {
    render(
      <Toggle checked={false} onChange={() => {}} label="Hidden" showLabel={false} />
    );
    expect(screen.queryByText('Hidden')).toBeNull();
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-label')).toBe('Hidden');
  });

  it('applies accent color when checked', () => {
    render(<Toggle checked={true} onChange={() => {}} label="On" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('bg-accent');
  });

  it('applies muted color when unchecked', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Off" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('bg-ink/20');
  });

  it('has visible focus indicator styles', () => {
    render(<Toggle checked={false} onChange={() => {}} label="Focus" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('focus-visible:ring-2');
    expect(toggle.className).toContain('focus-visible:ring-ink');
  });

  it('renders small size correctly', () => {
    render(
      <Toggle checked={false} onChange={() => {}} label="Small" size="sm" />
    );
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('w-8');
    expect(toggle.className).toContain('h-5');
  });
});
