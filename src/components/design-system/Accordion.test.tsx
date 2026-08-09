import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Accordion } from './Accordion';

const sampleItems = [
  { id: 'item-1', title: 'First Item', content: 'Content one' },
  { id: 'item-2', title: 'Second Item', content: 'Content two' },
  { id: 'item-3', title: 'Third Item', content: 'Content three' },
];

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={sampleItems} />);
    expect(screen.getByText('First Item')).toBeDefined();
    expect(screen.getByText('Second Item')).toBeDefined();
    expect(screen.getByText('Third Item')).toBeDefined();
  });

  it('all panels are collapsed by default', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('opens items specified in defaultOpen', () => {
    render(<Accordion items={sampleItems} defaultOpen={['item-2']} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[2].getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles item on click', () => {
    render(<Accordion items={sampleItems} />);
    const firstButton = screen.getByText('First Item').closest('button')!;
    expect(firstButton.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(firstButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(firstButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles item on Enter key', () => {
    render(<Accordion items={sampleItems} />);
    const firstButton = screen.getByText('First Item').closest('button')!;
    fireEvent.keyDown(firstButton, { key: 'Enter' });
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('toggles item on Space key', () => {
    render(<Accordion items={sampleItems} />);
    const firstButton = screen.getByText('First Item').closest('button')!;
    fireEvent.keyDown(firstButton, { key: ' ' });
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('single mode: opening one item closes another', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(buttons[1]);
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('allowMultiple: multiple items can be open simultaneously', () => {
    render(<Accordion items={sampleItems} allowMultiple />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowDown moves focus to next item', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();

    fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('ArrowUp moves focus to previous item', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[1].focus();

    fireEvent.keyDown(buttons[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowDown wraps from last to first', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();

    fireEvent.keyDown(buttons[2], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowUp wraps from first to last', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();

    fireEvent.keyDown(buttons[0], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(buttons[2]);
  });

  it('Home key moves focus to first item', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();

    fireEvent.keyDown(buttons[2], { key: 'Home' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('End key moves focus to last item', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();

    fireEvent.keyDown(buttons[0], { key: 'End' });
    expect(document.activeElement).toBe(buttons[2]);
  });

  it('has proper aria-controls linking button to panel', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      const panelId = button.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
    });
  });

  it('panel has aria-labelledby linking to header', () => {
    render(<Accordion items={sampleItems} defaultOpen={['item-1']} />);
    const firstButton = screen.getByText('First Item').closest('button')!;
    const panelId = firstButton.getAttribute('aria-controls')!;
    const panel = document.getElementById(panelId)!;
    expect(panel.getAttribute('aria-labelledby')).toBe(firstButton.id);
  });

  it('has visible focus indicator styles on buttons', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button.className).toContain('focus-visible:ring-2');
    });
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Accordion items={sampleItems} defaultOpen={['item-1']} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
