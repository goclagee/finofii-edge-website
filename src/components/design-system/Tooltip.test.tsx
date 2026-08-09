import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeDefined();
  });

  it('hides tooltip content by default', () => {
    render(
      <Tooltip content="Help text">
        <button>Trigger</button>
      </Tooltip>
    );
    // When hidden, aria-hidden=true means getByRole won't find it - use hidden option
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
    expect(tooltip.className).toContain('invisible');
  });

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip content="Visible now">
        <button>Hover</button>
      </Tooltip>
    );
    const wrapper = screen.getByRole('button', { name: 'Hover' }).parentElement!;
    fireEvent.mouseEnter(wrapper);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
    expect(tooltip.className).toContain('opacity-100');
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Gone">
        <button>Hover</button>
      </Tooltip>
    );
    const wrapper = screen.getByRole('button', { name: 'Hover' }).parentElement!;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseLeave(wrapper);
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content="Focus text">
        <button>Focus me</button>
      </Tooltip>
    );
    const wrapper = screen.getByRole('button', { name: 'Focus me' }).parentElement!;
    fireEvent.focus(wrapper);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content="Blur text">
        <button>Blur me</button>
      </Tooltip>
    );
    const wrapper = screen.getByRole('button', { name: 'Blur me' }).parentElement!;
    fireEvent.focus(wrapper);
    fireEvent.blur(wrapper);
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });

  it('connects trigger to tooltip via aria-describedby', () => {
    render(
      <Tooltip content="Description">
        <button>Described</button>
      </Tooltip>
    );
    const button = screen.getByRole('button', { name: 'Described' });
    const tooltipId = button.getAttribute('aria-describedby');
    expect(tooltipId).toBeTruthy();
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.getAttribute('id')).toBe(tooltipId);
  });

  it('renders tooltip content correctly', () => {
    render(
      <Tooltip content="Integration available">
        <button>QuickBooks</button>
      </Tooltip>
    );
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.textContent).toBe('Integration available');
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(
      <Tooltip content="Top" position="top">
        <button>Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip', { hidden: true }).className).toContain('bottom-full');

    rerender(
      <Tooltip content="Bottom" position="bottom">
        <button>Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip', { hidden: true }).className).toContain('top-full');

    rerender(
      <Tooltip content="Left" position="left">
        <button>Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip', { hidden: true }).className).toContain('right-full');

    rerender(
      <Tooltip content="Right" position="right">
        <button>Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip', { hidden: true }).className).toContain('left-full');
  });
});
