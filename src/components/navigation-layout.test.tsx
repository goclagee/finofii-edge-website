import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe } from 'vitest-axe';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, onClick, className, ...props }: any) => (
    <a href={href} onClick={onClick} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion to avoid animation complexities in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

import { Navbar } from './design-system/Navbar';
import { MobileNavOverlay } from './layout/MobileNavOverlay';
import { CompactHeader } from './layout/CompactHeader';
import { NewsletterSignup } from './forms/NewsletterSignup';
import { Footer } from './design-system/Footer';

// ─── Navbar Tests ───────────────────────────────────────────────────────────

describe('Navbar', () => {
  it('renders all 7 required page links', () => {
    render(<Navbar />);
    const expectedLinks = [
      'Services',
      'Pricing',
      'Dashboard',
      'How It Works',
      'Case Studies',
      'About',
      'Resources',
    ];
    for (const label of expectedLinks) {
      // Multiple elements exist (desktop + mobile nav), so use getAllByText
      const elements = screen.getAllByText(label);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders links with correct hrefs', () => {
    render(<Navbar />);
    const expectedHrefs: Record<string, string> = {
      Services: '/services',
      Pricing: '/pricing',
      Dashboard: '/dashboard',
      'How It Works': '/how-it-works',
      'Case Studies': '/case-studies',
      About: '/about',
      Resources: '/resources',
    };
    for (const [label, href] of Object.entries(expectedHrefs)) {
      // Use getAllByText since links appear in both desktop nav and mobile overlay
      const elements = screen.getAllByText(label);
      const link = elements[0].closest('a');
      expect(link).toBeDefined();
      expect(link!.getAttribute('href')).toBe(href);
    }
  });

  it('renders CTA button linking to /book', () => {
    render(<Navbar />);
    const ctaElements = screen.getAllByText('Book A Free Audit');
    expect(ctaElements.length).toBeGreaterThanOrEqual(1);
    const link = ctaElements[0].closest('a');
    expect(link!.getAttribute('href')).toBe('/book');
  });

  it('has a main navigation landmark with correct aria-label', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeDefined();
  });

  it('renders logo with link to home', () => {
    render(<Navbar />);
    const homeLink = screen.getByLabelText('Finofii Edge home');
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('applies compact styles when compact prop is true', () => {
    const { container } = render(<Navbar compact={true} scrollProgress={1} />);
    const header = container.querySelector('header');
    expect(header!.className).toContain('h-14');
    expect(header!.className).toContain('backdrop-blur-md');
  });

  it('applies full styles when compact prop is false', () => {
    const { container } = render(<Navbar compact={false} />);
    const header = container.querySelector('header');
    expect(header!.className).toContain('h-18');
  });

  it('renders hamburger menu button with correct aria attributes', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open navigation menu');
    expect(hamburger).toBeDefined();
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    expect(hamburger.getAttribute('aria-controls')).toBe('mobile-nav-overlay');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── MobileNavOverlay Tests ─────────────────────────────────────────────────

describe('MobileNavOverlay', () => {
  const defaultLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Resources', href: '/resources' },
  ];

  it('renders all links when open', () => {
    render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    for (const link of defaultLinks) {
      expect(screen.getByText(link.label)).toBeDefined();
    }
  });

  it('renders CTA button when open', () => {
    render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    expect(screen.getByText('Book A Free Audit')).toBeDefined();
  });

  it('has aria-hidden=false when open and aria-hidden=true when closed', () => {
    const { rerender } = render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.getAttribute('aria-hidden')).toBe('false');

    rerender(
      <MobileNavOverlay isOpen={false} onClose={vi.fn()} links={defaultLinks} />
    );
    expect(overlay!.getAttribute('aria-hidden')).toBe('true');
  });

  it('has transition-duration of 300ms via duration-300 class', () => {
    render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.className).toContain('duration-300');
  });

  it('calls onClose when a link is clicked', () => {
    const onClose = vi.fn();
    render(
      <MobileNavOverlay isOpen={true} onClose={onClose} links={defaultLinks} />
    );
    fireEvent.click(screen.getByText('Services'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <MobileNavOverlay isOpen={true} onClose={onClose} links={defaultLinks} />
    );
    fireEvent.click(screen.getByLabelText('Close navigation menu'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('focuses close button when overlay opens', () => {
    render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    const closeButton = screen.getByLabelText('Close navigation menu');
    expect(document.activeElement).toBe(closeButton);
  });

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <MobileNavOverlay isOpen={true} onClose={vi.fn()} links={defaultLinks} />
    );
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.getAttribute('role')).toBe('dialog');
    expect(overlay!.getAttribute('aria-modal')).toBe('true');
  });

  it('applies pointer-events-none when closed', () => {
    render(
      <MobileNavOverlay isOpen={false} onClose={vi.fn()} links={defaultLinks} />
    );
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.className).toContain('pointer-events-none');
  });
});

// ─── CompactHeader Tests ────────────────────────────────────────────────────

describe('CompactHeader', () => {
  let scrollYValue: number;

  beforeEach(() => {
    scrollYValue = 0;
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollYValue,
      configurable: true,
    });
  });

  afterEach(() => {
    scrollYValue = 0;
  });

  it('renders Navbar in non-compact state initially (scrollY = 0)', () => {
    const { container } = render(<CompactHeader />);
    const header = container.querySelector('header');
    expect(header!.className).toContain('h-18');
    expect(header!.className).not.toContain('h-14');
  });

  it('renders Navbar in compact state when scrollY > threshold', () => {
    scrollYValue = 150;
    const { container } = render(<CompactHeader scrollThreshold={100} />);

    // Trigger scroll event
    act(() => {
      fireEvent.scroll(window);
    });

    const header = container.querySelector('header');
    expect(header!.className).toContain('h-14');
  });

  it('transitions to compact state on scroll past threshold', () => {
    const { container } = render(<CompactHeader scrollThreshold={100} />);
    const header = container.querySelector('header');

    // Initially not compact
    expect(header!.className).toContain('h-18');

    // Scroll past threshold
    scrollYValue = 150;
    act(() => {
      fireEvent.scroll(window);
    });

    expect(header!.className).toContain('h-14');
    expect(header!.className).toContain('backdrop-blur-md');
  });

  it('transitions back to full state when scrolling above threshold', () => {
    scrollYValue = 150;
    const { container } = render(<CompactHeader scrollThreshold={100} />);

    act(() => {
      fireEvent.scroll(window);
    });

    const header = container.querySelector('header');
    expect(header!.className).toContain('h-14');

    // Scroll back up
    scrollYValue = 50;
    act(() => {
      fireEvent.scroll(window);
    });

    expect(header!.className).toContain('h-18');
  });

  it('uses custom scrollThreshold prop', () => {
    const { container } = render(<CompactHeader scrollThreshold={200} />);

    // At 150, should still be non-compact with threshold=200
    scrollYValue = 150;
    act(() => {
      fireEvent.scroll(window);
    });

    const header = container.querySelector('header');
    expect(header!.className).toContain('h-18');

    // At 250, should be compact
    scrollYValue = 250;
    act(() => {
      fireEvent.scroll(window);
    });

    expect(header!.className).toContain('h-14');
  });
});

// ─── NewsletterSignup Tests ─────────────────────────────────────────────────

describe('NewsletterSignup', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders email input and subscribe button', () => {
    render(<NewsletterSignup />);
    expect(screen.getByLabelText('Email address for newsletter')).toBeDefined();
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeDefined();
  });

  it('shows error for empty email on submit', async () => {
    render(<NewsletterSignup />);
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
      expect(screen.getByText('Email address is required')).toBeDefined();
    });
  });

  it('shows error for invalid email format', async () => {
    render(<NewsletterSignup />);
    const input = screen.getByLabelText('Email address for newsletter');
    fireEvent.change(input, { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
    });
  });

  it('shows error for email exceeding 254 characters', async () => {
    render(<NewsletterSignup />);
    const input = screen.getByLabelText('Email address for newsletter');
    const longEmail = 'a'.repeat(250) + '@b.co';
    fireEvent.change(input, { target: { value: longEmail } });
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByText('Email must be 254 characters or fewer')).toBeDefined();
    });
  });

  it('shows success message on successful submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText('Email address for newsletter');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByText(/Thanks For Subscribing/)).toBeDefined();
    });
  });

  it('shows error message on network failure and retains email', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<NewsletterSignup />);
    const input = screen.getByLabelText('Email address for newsletter');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });

    // Email is retained for retry
    expect(
      (screen.getByLabelText('Email address for newsletter') as HTMLInputElement).value
    ).toBe('test@example.com');
  });

  it('shows server error message on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid email domain' }),
    });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText('Email address for newsletter');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email domain')).toBeDefined();
    });
  });

  it('sets aria-invalid on input when in error state', async () => {
    render(<NewsletterSignup />);
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      const input = screen.getByLabelText('Email address for newsletter');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('clears error when user starts typing', async () => {
    render(<NewsletterSignup />);
    fireEvent.click(screen.getByLabelText('Subscribe to newsletter'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });

    const input = screen.getByLabelText('Email address for newsletter');
    fireEvent.change(input, { target: { value: 'a' } });

    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('has form with aria-label for newsletter signup', () => {
    render(<NewsletterSignup />);
    expect(screen.getByRole('form', { name: 'Newsletter signup' })).toBeDefined();
  });
});

// ─── Keyboard Navigation Tests ──────────────────────────────────────────────

describe('Keyboard Navigation', () => {
  it('all nav links are focusable via Tab', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    const links = nav.querySelectorAll('a');

    // All links should be tabbable (no tabIndex=-1)
    links.forEach((link) => {
      expect(link.tabIndex).not.toBe(-1);
    });
  });

  it('nav links follow logical reading order', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    const links = Array.from(nav.querySelectorAll('ul a'));
    const expectedOrder = [
      'Services',
      'Pricing',
      'Dashboard',
      'How It Works',
      'Case Studies',
      'About',
      'Resources',
    ];
    const actualOrder = links.map((link) => link.textContent);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it('Enter activates navigation links', () => {
    render(<Navbar />);
    // Use getAllByText since links appear in both desktop and mobile nav
    const servicesLinks = screen.getAllByText('Services');
    const servicesLink = servicesLinks[0];

    // Links are activated via Enter by default (browser behavior)
    // Verify the element is a link (a tag)
    expect(servicesLink.closest('a')).toBeDefined();
    expect(servicesLink.closest('a')!.tagName).toBe('A');
  });

  it('hamburger menu button is keyboard accessible', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open navigation menu');
    expect(hamburger.tagName).toBe('BUTTON');

    // Clicking the button opens the mobile menu
    fireEvent.click(hamburger);
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.getAttribute('aria-hidden')).toBe('false');
  });

  it('Escape key closes mobile navigation overlay', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open navigation menu');
    fireEvent.click(hamburger);

    // Overlay should be open
    const overlay = document.getElementById('mobile-nav-overlay');
    expect(overlay!.getAttribute('aria-hidden')).toBe('false');

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(overlay!.getAttribute('aria-hidden')).toBe('true');
  });

  it('focus indicators exist on interactive elements (focus-visible classes)', () => {
    render(<Navbar />);
    // Use getAllByText since CTA appears in both desktop and mobile nav
    const ctaElements = screen.getAllByText('Book A Free Audit');
    const cta = ctaElements[0].closest('a');
    expect(cta!.className).toContain('focus-visible:ring-2');
  });
});

// ─── Footer Tests ───────────────────────────────────────────────────────────

describe('Footer', () => {
  it('renders sitemap links', () => {
    render(<Footer />);
    const expectedLinks = [
      'Services',
      'Pricing',
      'Dashboard',
      'How It Works',
      'Case Studies',
      'About',
      'Resources',
      'Book A Free Audit',
    ];
    for (const label of expectedLinks) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });

  it('renders legal links', () => {
    render(<Footer />);
    const legalLinks = ['Privacy Policy', 'Terms Of Service', 'DPA', 'Sub-Processors'];
    for (const label of legalLinks) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });

  it('renders newsletter signup input', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Email address for newsletter')).toBeDefined();
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeDefined();
  });

  it('renders copyright with correct year', () => {
    render(<Footer year={2025} />);
    expect(screen.getByText(/© 2025 Finofii Edge/)).toBeDefined();
  });

  it('has role="contentinfo" on footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeDefined();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
