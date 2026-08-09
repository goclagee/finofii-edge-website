import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Modal } from './Modal';

const ModalWrapper = ({
  defaultOpen = true,
  ...props
}: Partial<React.ComponentProps<typeof Modal>> & { defaultOpen?: boolean }) => {
  return (
    <Modal
      isOpen={defaultOpen}
      onClose={props.onClose || vi.fn()}
      title={props.title || 'Test Modal'}
      {...props}
    >
      <p>Modal content</p>
      <button>First button</button>
      <button>Second button</button>
    </Modal>
  );
};

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(<ModalWrapper />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Test Modal')).toBeDefined();
    expect(screen.getByText('Modal content')).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    render(<ModalWrapper defaultOpen={false} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('has role="dialog" and aria-modal="true"', () => {
    render(<ModalWrapper />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('is labeled by the title', () => {
    render(<ModalWrapper title="Confirm Action" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('modal-title');
    expect(screen.getByText('Confirm Action').id).toBe('modal-title');
  });

  it('focuses the first focusable element on open', () => {
    render(<ModalWrapper />);
    // The close button is the first focusable element in the modal
    const closeButton = screen.getByLabelText('Close modal');
    expect(document.activeElement).toBe(closeButton);
  });

  it('closes on Escape key press', () => {
    const onClose = vi.fn();
    render(<ModalWrapper onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(<ModalWrapper onClose={onClose} closeOnEscape={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when overlay is clicked', () => {
    const onClose = vi.fn();
    render(<ModalWrapper onClose={onClose} />);
    // The overlay is the element with aria-hidden="true" and the onClick
    const overlay = screen.getByRole('dialog').parentElement!.querySelector('[aria-hidden="true"]')!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on overlay click when closeOnOverlay is false', () => {
    const onClose = vi.fn();
    render(<ModalWrapper onClose={onClose} closeOnOverlay={false} />);
    const overlay = screen.getByRole('dialog').parentElement!.querySelector('[aria-hidden="true"]')!;
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when close button is clicked', () => {
    const onClose = vi.fn();
    render(<ModalWrapper onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus: Tab from last element wraps to first', () => {
    render(<ModalWrapper />);
    const dialog = screen.getByRole('dialog');
    const buttons = dialog.querySelectorAll('button');
    const lastButton = buttons[buttons.length - 1];

    // Focus last button
    (lastButton as HTMLElement).focus();
    expect(document.activeElement).toBe(lastButton);

    // Tab should wrap to first focusable
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('traps focus: Shift+Tab from first element wraps to last', () => {
    render(<ModalWrapper />);
    const dialog = screen.getByRole('dialog');
    const buttons = dialog.querySelectorAll('button');
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];

    // Focus first button
    (firstButton as HTMLElement).focus();
    expect(document.activeElement).toBe(firstButton);

    // Shift+Tab should wrap to last focusable
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastButton);
  });

  it('returns focus to trigger element on close', () => {
    const triggerButton = document.createElement('button');
    triggerButton.textContent = 'Open Modal';
    document.body.appendChild(triggerButton);
    triggerButton.focus();
    expect(document.activeElement).toBe(triggerButton);

    const onClose = vi.fn();
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Content</p>
        <button>Inner</button>
      </Modal>
    );

    // Modal should have captured the trigger as previous focus
    // Now close the modal
    rerender(
      <Modal isOpen={false} onClose={onClose} title="Test Modal">
        <p>Content</p>
        <button>Inner</button>
      </Modal>
    );

    expect(document.activeElement).toBe(triggerButton);
    document.body.removeChild(triggerButton);
  });

  it('has visible focus indicator on close button', () => {
    render(<ModalWrapper />);
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton.className).toContain('focus-visible:ring-2');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<ModalWrapper />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
