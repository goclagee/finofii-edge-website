import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label text', () => {
    render(<FormField label="Email" />);
    expect(screen.getByText('Email')).toBeDefined();
  });

  it('renders input associated with label', () => {
    render(<FormField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeDefined();
    expect(input.tagName).toBe('INPUT');
  });

  it('shows required indicator', () => {
    render(<FormField label="Name" required />);
    expect(screen.getByText('*')).toBeDefined();
  });

  it('sets aria-required when required', () => {
    render(<FormField label="Name" required />);
    const input = screen.getByLabelText(/Name/);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('displays error message with alert role', () => {
    render(<FormField label="Email" error="Invalid email address" />);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain('Invalid email address');
  });

  it('sets aria-invalid when error is present', () => {
    render(<FormField label="Email" error="Required" />);
    const input = screen.getByLabelText(/Email/);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('connects error via aria-describedby', () => {
    render(<FormField label="Email" error="Invalid" />);
    const input = screen.getByLabelText(/Email/);
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toContain('Invalid');
  });

  it('displays hint text', () => {
    render(<FormField label="Email" hint="We will never share your email" />);
    expect(screen.getByText('We will never share your email')).toBeDefined();
  });

  it('hint is hidden when error is present', () => {
    render(<FormField label="Email" hint="Hint text" error="Error text" />);
    expect(screen.queryByText('Hint text')).toBeNull();
    expect(screen.getByText('Error text')).toBeDefined();
  });

  it('applies error border styles', () => {
    render(<FormField label="Email" error="Required" />);
    const input = screen.getByLabelText(/Email/);
    expect(input.className).toContain('border-flag');
  });

  it('applies success border styles', () => {
    render(<FormField label="Email" validationState="success" />);
    const input = screen.getByLabelText(/Email/);
    expect(input.className).toContain('border-accent');
  });

  it('applies default border styles', () => {
    render(<FormField label="Email" />);
    const input = screen.getByLabelText(/Email/);
    expect(input.className).toContain('border-ink/20');
  });

  it('applies size styles', () => {
    const { rerender } = render(<FormField label="Email" size="sm" />);
    expect(screen.getByLabelText(/Email/).className).toContain('text-sm');

    rerender(<FormField label="Email" size="lg" />);
    expect(screen.getByLabelText(/Email/).className).toContain('py-4');
  });

  it('disabled input has correct styling', () => {
    render(<FormField label="Email" disabled />);
    const input = screen.getByLabelText(/Email/) as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.className).toContain('disabled:opacity-50');
  });

  it('renders custom children instead of default input', () => {
    render(
      <FormField label="Options">
        <select>
          <option>One</option>
        </select>
      </FormField>
    );
    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('has visible focus indicator styles', () => {
    render(<FormField label="Email" />);
    const input = screen.getByLabelText(/Email/);
    expect(input.className).toContain('focus-visible:ring-2');
    expect(input.className).toContain('focus-visible:ring-ink');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<FormField label="Email" type="email" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility audit with error state', async () => {
    const { container } = render(
      <FormField label="Email" type="email" error="Invalid email" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
