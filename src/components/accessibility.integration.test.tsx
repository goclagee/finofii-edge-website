/**
 * Consolidated Accessibility Integration Tests
 *
 * Tests the most critical interactive components for:
 * 1. axe-core accessibility audits (WCAG 2.1 AA)
 * 2. Keyboard-only navigation (Tab order through interactive components)
 * 3. Focus trapping in Modal and Lightbox
 * 4. Reduced-motion behavior disables animations
 *
 * Validates: Requirements 22.1, 22.2, 22.4, 22.5
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';

// Mock hooks used by components
const mockReducedMotion = vi.fn(() => false);

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}));

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => false),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    ref: { current: null },
    isIntersecting: true,
    entry: null,
  })),
}));

vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: vi.fn(() => ({
    ref: { current: null },
    style: {},
    isVisible: true,
  })),
}));

vi.mock('@/hooks/useParallax', () => ({
  useParallax: vi.fn(() => ({
    ref: { current: null },
    style: {},
  })),
}));

// Mock next/link and next/image for component rendering
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

import { Modal } from './design-system/Modal';
import { Accordion } from './design-system/Accordion';
import { Navbar } from './design-system/Navbar';
import { LeadForm } from './forms/LeadForm';
import { Lightbox } from './content/Lightbox';

// ─── 1. axe-core Accessibility Audits ───────────────────────────────────────

describe('Accessibility Audit (axe-core)', () => {
  describe('Modal', () => {
    it('passes axe audit when open with content', async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Accessible Modal">
          <p>Modal body content</p>
          <button>Confirm</button>
          <button>Cancel</button>
        </Modal>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Accordion', () => {
    const items = [
      { id: 'faq-1', title: 'What is bookkeeping?', content: 'Professional financial record-keeping.' },
      { id: 'faq-2', title: 'How much does it cost?', content: 'Starting at $499/month.' },
      { id: 'faq-3', title: 'What tools do you support?', content: 'QuickBooks, Xero, and more.' },
    ];

    it('passes axe audit with items collapsed', async () => {
      const { container } = render(<Accordion items={items} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe audit with items expanded', async () => {
      const { container } = render(
        <Accordion items={items} defaultOpen={['faq-1', 'faq-2']} allowMultiple />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('LeadForm', () => {
    it('passes axe audit on initial step', async () => {
      const { container } = render(<LeadForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe audit on subsequent step with validation error', async () => {
      const { container } = render(<LeadForm />);

      // Try to advance without selection to trigger validation error
      const continueBtn = screen.getByRole('button', { name: /continue/i });
      fireEvent.click(continueBtn);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Navbar', () => {
    it('passes axe audit in default state', async () => {
      const { container } = render(<Navbar />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe audit in compact state', async () => {
      const { container } = render(<Navbar compact scrollProgress={1} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Lightbox', () => {
    it('passes axe audit when open', async () => {
      const { container } = render(
        <Lightbox
          isOpen={true}
          onClose={vi.fn()}
          src="/images/dashboards/dashboard-overview.png"
          alt="Dashboard overview showing revenue metrics"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

// ─── 2. Keyboard-Only Navigation ────────────────────────────────────────────

describe('Keyboard-Only Navigation', () => {
  describe('Navbar tab order', () => {
    it('all interactive elements are reachable via Tab (no negative tabIndex)', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const interactiveElements = nav.querySelectorAll('a, button');

      interactiveElements.forEach((el) => {
        expect((el as HTMLElement).tabIndex).not.toBe(-1);
      });
    });

    it('tab order follows visual layout: logo → nav links → CTA', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });

      // Gather all tabbable elements in DOM order
      const tabbable = Array.from(
        nav.querySelectorAll<HTMLElement>('a, button:not([tabindex="-1"])')
      );

      // First element should be logo link
      expect(tabbable[0].getAttribute('aria-label')).toBe('Finofii Edge home');

      // Nav links should follow
      const navLinks = tabbable.slice(1, 8);
      const expectedLabels = ['Services', 'Pricing', 'Dashboard', 'How It Works', 'Case Studies', 'About', 'Resources'];
      navLinks.forEach((link, i) => {
        expect(link.textContent).toBe(expectedLabels[i]);
      });
    });
  });

  describe('Accordion keyboard navigation', () => {
    const items = [
      { id: 'a-1', title: 'Section One', content: 'Content 1' },
      { id: 'a-2', title: 'Section Two', content: 'Content 2' },
      { id: 'a-3', title: 'Section Three', content: 'Content 3' },
    ];

    it('Tab moves focus between accordion triggers in sequence', () => {
      render(<Accordion items={items} />);
      const buttons = screen.getAllByRole('button');

      // Focus first button
      buttons[0].focus();
      expect(document.activeElement).toBe(buttons[0]);

      // ArrowDown navigates between items within the accordion
      fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });
      expect(document.activeElement).toBe(buttons[1]);

      fireEvent.keyDown(buttons[1], { key: 'ArrowDown' });
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('Enter and Space keys toggle accordion items', () => {
      render(<Accordion items={items} />);
      const buttons = screen.getAllByRole('button');

      buttons[0].focus();
      fireEvent.keyDown(buttons[0], { key: 'Enter' });
      expect(buttons[0].getAttribute('aria-expanded')).toBe('true');

      fireEvent.keyDown(buttons[0], { key: ' ' });
      expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('LeadForm multi-step keyboard navigation', () => {
    it('form steps contain focusable elements for keyboard users', () => {
      render(<LeadForm />);

      // Step 1: Radio buttons should be focusable
      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).not.toHaveAttribute('tabindex', '-1');
      });

      // Continue button should be focusable
      const continueBtn = screen.getByRole('button', { name: /continue/i });
      expect(continueBtn).not.toHaveAttribute('tabindex', '-1');
    });

    it('navigation between steps preserves keyboard access', () => {
      render(<LeadForm />);

      // Select an option on step 1
      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      // Step 2 should have focusable radios
      const step2Radios = screen.getAllByRole('radio');
      expect(step2Radios.length).toBeGreaterThan(0);
      step2Radios.forEach((radio) => {
        expect(radio).not.toHaveAttribute('tabindex', '-1');
      });

      // Back button should also be keyboard accessible
      const backBtn = screen.getByRole('button', { name: /back/i });
      expect(backBtn).not.toHaveAttribute('tabindex', '-1');
    });

    it('progress indicator updates aria-valuenow on step change', () => {
      render(<LeadForm />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '1');

      fireEvent.click(screen.getByRole('radio', { name: /LLC/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    });
  });
});

// ─── 3. Focus Trap in Modals and Multi-Step Forms ───────────────────────────

describe('Focus Trap', () => {
  describe('Modal focus trap', () => {
    it('focuses first focusable element when modal opens', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Focus Test">
          <button>Action 1</button>
          <button>Action 2</button>
        </Modal>
      );

      // Close button is typically the first focusable
      const closeBtn = screen.getByLabelText('Close modal');
      expect(document.activeElement).toBe(closeBtn);
    });

    it('Tab from last focusable wraps to first', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Trap Test">
          <button>First</button>
          <button>Last</button>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const buttons = dialog.querySelectorAll('button');
      const lastButton = buttons[buttons.length - 1] as HTMLElement;

      lastButton.focus();
      expect(document.activeElement).toBe(lastButton);

      fireEvent.keyDown(dialog, { key: 'Tab' });
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('Shift+Tab from first focusable wraps to last', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Trap Test">
          <button>First</button>
          <button>Last</button>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const buttons = dialog.querySelectorAll('button');
      const firstButton = buttons[0] as HTMLElement;
      const lastButton = buttons[buttons.length - 1] as HTMLElement;

      firstButton.focus();
      fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(lastButton);
    });

    it('restores focus to trigger element when modal closes', () => {
      const triggerBtn = document.createElement('button');
      triggerBtn.textContent = 'Open';
      document.body.appendChild(triggerBtn);
      triggerBtn.focus();

      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={onClose} title="Restore Focus">
          <button>Inside</button>
        </Modal>
      );

      // Close the modal
      rerender(
        <Modal isOpen={false} onClose={onClose} title="Restore Focus">
          <button>Inside</button>
        </Modal>
      );

      expect(document.activeElement).toBe(triggerBtn);
      document.body.removeChild(triggerBtn);
    });
  });

  describe('Lightbox focus trap', () => {
    it('focuses close button when lightbox opens', () => {
      render(
        <Lightbox
          isOpen={true}
          onClose={vi.fn()}
          src="/test.png"
          alt="Test image"
        />
      );

      const closeBtn = screen.getByLabelText('Close lightbox');
      expect(document.activeElement).toBe(closeBtn);
    });

    it('traps focus within lightbox — Tab wraps within the dialog', () => {
      render(
        <Lightbox
          isOpen={true}
          onClose={vi.fn()}
          src="/test.png"
          alt="Test image"
        />
      );

      const dialog = screen.getByRole('dialog');
      const closeBtn = screen.getByLabelText('Close lightbox');

      // Focus the close button (only focusable element)
      closeBtn.focus();
      expect(document.activeElement).toBe(closeBtn);

      // Tab on the only button should wrap back to itself
      fireEvent.keyDown(dialog, { key: 'Tab' });
      expect(document.activeElement).toBe(closeBtn);
    });

    it('Escape key closes lightbox', () => {
      const onClose = vi.fn();
      render(
        <Lightbox
          isOpen={true}
          onClose={onClose}
          src="/test.png"
          alt="Test image"
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('restores focus to previously focused element on close', () => {
      const triggerBtn = document.createElement('button');
      triggerBtn.textContent = 'Open Lightbox';
      document.body.appendChild(triggerBtn);
      triggerBtn.focus();

      const onClose = vi.fn();
      const { rerender } = render(
        <Lightbox
          isOpen={true}
          onClose={onClose}
          src="/test.png"
          alt="Test image"
        />
      );

      // Close lightbox
      rerender(
        <Lightbox
          isOpen={false}
          onClose={onClose}
          src="/test.png"
          alt="Test image"
        />
      );

      expect(document.activeElement).toBe(triggerBtn);
      document.body.removeChild(triggerBtn);
    });
  });
});

// ─── 4. Reduced-Motion Behavior ─────────────────────────────────────────────

describe('Reduced-Motion Disables Animations', () => {
  beforeEach(() => {
    mockReducedMotion.mockReturnValue(true);
  });

  it('ScrollReveal renders content without animation when reduced motion is enabled', async () => {
    const { ScrollReveal } = await import('./animations/ScrollReveal');

    const { container } = render(
      <ScrollReveal animation="fade-up">
        <p>Static content</p>
      </ScrollReveal>
    );

    // Content should be immediately visible without animation classes
    expect(screen.getByText('Static content')).toBeTruthy();
    // Should not have opacity: 0 or transform styles indicating pending animation
    const wrapper = container.firstElementChild as HTMLElement;
    const style = wrapper?.getAttribute('style') || '';
    expect(style).not.toContain('opacity: 0');
  });

  it('CounterAnimation shows final value immediately without counting animation', async () => {
    const { CounterAnimation } = await import('./animations/CounterAnimation');

    const { container } = render(
      <CounterAnimation end={1500} prefix="$" suffix="+" duration={2000} />
    );

    // With reduced motion, should show final value immediately
    const span = container.firstElementChild as HTMLElement;
    expect(span.textContent).toContain('1500');
  });

  it('StaggeredList renders all children without stagger delay', async () => {
    const { StaggeredList } = await import('./animations/StaggeredList');

    render(
      <StaggeredList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </StaggeredList>
    );

    // All items should be visible immediately
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
    expect(screen.getByText('Item 3')).toBeTruthy();
  });

  it('CursorFollower does not render when reduced motion is preferred', async () => {
    const { useMediaQuery } = await import('@/hooks/useMediaQuery');
    const mockedUseMediaQuery = vi.mocked(useMediaQuery);
    mockedUseMediaQuery.mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') return true;
      if (query === '(pointer: coarse)') return false;
      return false;
    });

    const { CursorFollower } = await import('./animations/CursorFollower');

    const { container } = render(<CursorFollower />);
    expect(container.innerHTML).toBe('');
  });

  it('ParallaxLayer renders children without parallax effect', async () => {
    const { useParallax } = await import('@/hooks/useParallax');
    const mockedUseParallax = vi.mocked(useParallax);
    mockedUseParallax.mockReturnValue({
      ref: { current: null },
      style: {},
    });

    const { ParallaxLayer } = await import('./animations/ParallaxLayer');

    render(
      <ParallaxLayer speed={0.3}>
        <p>Background content</p>
      </ParallaxLayer>
    );

    // Content should be rendered without parallax transform
    expect(screen.getByText('Background content')).toBeTruthy();
  });

  it('AnimatedHeadline renders text without animation when reduced motion is enabled', async () => {
    const { AnimatedHeadline } = await import('./design-system/AnimatedHeadline');

    render(<AnimatedHeadline text="Welcome to Finofii" animation="fade-up" />);

    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('Welcome to Finofii');
    // Should not have animation-related classes
    expect(heading.className).not.toContain('animate-');
  });
});
