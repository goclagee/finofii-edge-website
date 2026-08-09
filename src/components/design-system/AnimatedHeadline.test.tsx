import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedHeadline } from './AnimatedHeadline';

// Mock the hooks
const mockReducedMotion = vi.fn(() => false);
const mockIntersectionReturn = {
  ref: { current: null },
  isIntersecting: true,
  entry: null,
};

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => mockIntersectionReturn,
}));

describe('AnimatedHeadline', () => {
  beforeEach(() => {
    mockReducedMotion.mockReturnValue(false);
    mockIntersectionReturn.isIntersecting = true;
  });

  it('renders the text content', () => {
    render(<AnimatedHeadline text="Hello World" animation="fade-up" />);
    expect(screen.getByText('Hello World')).toBeDefined();
  });

  it('renders as h2 by default', () => {
    render(<AnimatedHeadline text="Default Heading" animation="fade-up" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeDefined();
  });

  it('renders as specified heading level', () => {
    const { rerender } = render(
      <AnimatedHeadline text="H1 Heading" as="h1" animation="fade-up" />
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();

    rerender(<AnimatedHeadline text="H3 Heading" as="h3" animation="fade-up" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeDefined();
  });

  describe('reduced-motion behavior', () => {
    it('renders text immediately without animation classes when reduced motion is enabled', () => {
      mockReducedMotion.mockReturnValue(true);
      render(<AnimatedHeadline text="No Animation" animation="fade-up" />);
      const heading = screen.getByRole('heading');
      // Should render plain text without animation utility classes
      expect(heading.textContent).toBe('No Animation');
      expect(heading.className).not.toContain('opacity-0');
      expect(heading.className).not.toContain('translate-y');
    });

    it('renders text immediately without split-chars spans when reduced motion is enabled', () => {
      mockReducedMotion.mockReturnValue(true);
      render(<AnimatedHeadline text="Split" animation="split-chars" />);
      const heading = screen.getByRole('heading');
      // Should be plain text, not individual span elements
      expect(heading.textContent).toBe('Split');
      expect(heading.querySelectorAll('span[aria-hidden]')).toHaveLength(0);
    });

    it('renders full text for typewriter mode when reduced motion is enabled', () => {
      mockReducedMotion.mockReturnValue(true);
      render(<AnimatedHeadline text="Full Text Now" animation="typewriter" />);
      const heading = screen.getByRole('heading');
      expect(heading.textContent).toBe('Full Text Now');
    });
  });

  describe('fade-up animation', () => {
    it('applies transition classes', () => {
      render(<AnimatedHeadline text="Fade Up" animation="fade-up" />);
      const heading = screen.getByRole('heading');
      expect(heading.className).toContain('transition-all');
      expect(heading.className).toContain('duration-500');
    });

    it('has aria-label for text content', () => {
      render(<AnimatedHeadline text="Accessible" animation="fade-up" />);
      const heading = screen.getByRole('heading');
      expect(heading.getAttribute('aria-label')).toBe('Accessible');
    });
  });

  describe('split-chars animation', () => {
    it('renders individual character spans', () => {
      render(<AnimatedHeadline text="Hi" animation="split-chars" />);
      const heading = screen.getByRole('heading');
      const spans = heading.querySelectorAll('span[aria-hidden="true"]');
      expect(spans.length).toBe(2);
    });

    it('has aria-label on the heading for accessibility', () => {
      render(<AnimatedHeadline text="Split Text" animation="split-chars" />);
      const heading = screen.getByRole('heading');
      expect(heading.getAttribute('aria-label')).toBe('Split Text');
    });
  });

  describe('typewriter animation', () => {
    it('has aria-label on the heading', () => {
      render(<AnimatedHeadline text="Typing..." animation="typewriter" />);
      const heading = screen.getByRole('heading');
      expect(heading.getAttribute('aria-label')).toBe('Typing...');
    });
  });

  it('applies custom className', () => {
    render(
      <AnimatedHeadline text="Custom" animation="fade-up" className="text-4xl" />
    );
    const heading = screen.getByRole('heading');
    expect(heading.className).toContain('text-4xl');
  });
});
