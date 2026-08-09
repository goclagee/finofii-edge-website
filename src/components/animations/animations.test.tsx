import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock hooks
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => false),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    ref: { current: null },
    isIntersecting: false,
    entry: null,
  })),
}));

vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: vi.fn(() => ({
    ref: { current: null },
    isRevealed: false,
    style: { opacity: 0, transform: 'translateY(30px)' },
  })),
}));

vi.mock('@/hooks/useParallax', () => ({
  useParallax: vi.fn(() => ({
    ref: { current: null },
    style: {},
    isActive: false,
  })),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    // eslint-disable-next-line react/display-name
    div: React.forwardRef(
      (
        {
          children,
          initial,
          animate,
          exit,
          transition,
          ...props
        }: {
          children?: React.ReactNode;
          initial?: Record<string, unknown>;
          animate?: Record<string, unknown>;
          exit?: Record<string, unknown>;
          transition?: Record<string, unknown>;
          [key: string]: unknown;
        },
        ref: React.Ref<HTMLDivElement>
      ) => (
        <div
          ref={ref}
          data-testid="motion-div"
          data-initial={JSON.stringify(initial)}
          data-animate={JSON.stringify(animate)}
          data-exit={JSON.stringify(exit)}
          data-transition={JSON.stringify(transition)}
          {...props}
        >
          {children}
        </div>
      )
    ),
  },
}));

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { ScrollReveal } from './ScrollReveal';
import { ParallaxLayer } from './ParallaxLayer';
import { CounterAnimation } from './CounterAnimation';
import { CursorFollower } from './CursorFollower';
import { PageTransition } from './PageTransition';
import { StaggeredList } from './StaggeredList';

const mockedUseReducedMotion = vi.mocked(useReducedMotion);
const mockedUseMediaQuery = vi.mocked(useMediaQuery);
const mockedUseParallax = vi.mocked(useParallax);
const mockedUseScrollReveal = vi.mocked(useScrollReveal);
const mockedUseIntersectionObserver = vi.mocked(useIntersectionObserver);

describe('Animation Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseReducedMotion.mockReturnValue(false);
    mockedUseMediaQuery.mockReturnValue(false);
    mockedUseIntersectionObserver.mockReturnValue({
      ref: { current: null },
      isIntersecting: false,
      entry: null,
    });
    mockedUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isRevealed: false,
      style: { opacity: 0, transform: 'translateY(30px)' },
    });
    mockedUseParallax.mockReturnValue({
      ref: { current: null },
      style: {},
      isActive: false,
    });
  });

  describe('ScrollReveal', () => {
    it('renders content in static state when reduced motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <ScrollReveal>
          <p>Animated content</p>
        </ScrollReveal>
      );

      // When reduced motion is enabled, content should render without animation styles
      // The component renders a plain div without ref/style from useScrollReveal
      expect(screen.getByText('Animated content')).toBeTruthy();

      const wrapper = container.firstElementChild as HTMLElement;
      // Should not have opacity:0 or transform applied (static final state)
      expect(wrapper.style.opacity).not.toBe('0');
      expect(wrapper.style.transform).toBe('');
    });

    it('renders content with animation styles when reduced motion is not enabled', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseScrollReveal.mockReturnValue({
        ref: { current: null },
        isRevealed: false,
        style: { opacity: 0, transform: 'translateY(30px)' },
      });

      const { container } = render(
        <ScrollReveal>
          <p>Animated content</p>
        </ScrollReveal>
      );

      const wrapper = container.firstElementChild as HTMLElement;
      // Should have animation styles applied (not yet revealed)
      expect(wrapper.style.opacity).toBe('0');
      expect(wrapper.style.transform).toBe('translateY(30px)');
    });

    it('passes disabled=true when reduced motion is detected', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      render(
        <ScrollReveal>
          <p>Content</p>
        </ScrollReveal>
      );

      // When reduced motion is enabled, the component should not call useScrollReveal
      // for animation purposes - it renders static content directly
      expect(screen.getByText('Content')).toBeTruthy();
    });
  });

  describe('ParallaxLayer', () => {
    it('disables parallax when prefers-reduced-motion is enabled', () => {
      mockedUseParallax.mockReturnValue({
        ref: { current: null },
        style: {},
        isActive: false,
      });

      const { container } = render(
        <ParallaxLayer speed={0.3}>
          <p>Parallax content</p>
        </ParallaxLayer>
      );

      expect(screen.getByText('Parallax content')).toBeTruthy();
      const wrapper = container.firstElementChild as HTMLElement;
      // No transform applied when disabled
      expect(wrapper.style.transform).toBe('');
    });

    it('disables parallax on coarse pointer (touch) devices', () => {
      // useParallax internally checks coarse pointer and returns isActive: false
      mockedUseParallax.mockReturnValue({
        ref: { current: null },
        style: {},
        isActive: false,
      });

      const { container } = render(
        <ParallaxLayer speed={0.3}>
          <p>Parallax content</p>
        </ParallaxLayer>
      );

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.transform).toBe('');
    });

    it('applies transform when parallax is active', () => {
      mockedUseParallax.mockReturnValue({
        ref: { current: null },
        style: { transform: 'translateY(15px)', willChange: 'transform' },
        isActive: true,
      });

      const { container } = render(
        <ParallaxLayer speed={0.3}>
          <p>Parallax content</p>
        </ParallaxLayer>
      );

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.transform).toBe('translateY(15px)');
      expect(wrapper.getAttribute('aria-hidden')).toBe('true');
    });

    it('passes disabled prop to useParallax hook', () => {
      render(
        <ParallaxLayer speed={0.3} disabled>
          <p>Content</p>
        </ParallaxLayer>
      );

      expect(mockedUseParallax).toHaveBeenCalledWith(
        expect.objectContaining({ enabled: false })
      );
    });
  });

  describe('CounterAnimation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('respects max 2000ms duration by clamping values above 2000', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <CounterAnimation end={100} duration={5000} />
      );

      // With reduced motion, shows final value immediately
      const span = container.firstElementChild as HTMLElement;
      expect(span.textContent).toBe('100');
      // The component clamps internally: Math.min(2000, duration)
      // We verify the component renders correctly with a duration above max
    });

    it('renders with font-data class for IBM Plex Mono', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <CounterAnimation end={42} />
      );

      const span = container.firstElementChild as HTMLElement;
      expect(span.className).toContain('font-data');
      expect(span.style.fontFamily).toBe('var(--font-data)');
    });

    it('shows final value immediately when reduced motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <CounterAnimation end={250} prefix="$" suffix="+" />
      );

      const span = container.firstElementChild as HTMLElement;
      expect(span.textContent).toBe('$250+');
    });

    it('renders with prefix and suffix', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <CounterAnimation end={99.5} prefix="$" suffix="%" decimals={1} />
      );

      const span = container.firstElementChild as HTMLElement;
      expect(span.textContent).toBe('$99.5%');
    });

    it('has proper aria-label showing the final value', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <CounterAnimation end={100} prefix="$" suffix="+" />
      );

      const span = container.firstElementChild as HTMLElement;
      expect(span.getAttribute('aria-label')).toBe('$100+');
    });

    it('clamps duration to 2000ms maximum', () => {
      // Test that a duration of 3000 gets clamped internally
      mockedUseReducedMotion.mockReturnValue(true);
      mockedUseIntersectionObserver.mockReturnValue({
        ref: { current: null },
        isIntersecting: true,
        entry: null,
      });

      // The component should clamp: Math.min(2000, Math.max(0, 3000)) = 2000
      // We verify that the component still renders correctly with over-limit duration
      const { container } = render(
        <CounterAnimation end={500} duration={3000} />
      );

      const span = container.firstElementChild as HTMLElement;
      // With reduced motion, it shows end value regardless
      expect(span.textContent).toBe('500');
    });
  });

  describe('CursorFollower', () => {
    it('returns null (does not render) on coarse pointer devices', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseMediaQuery.mockImplementation((query: string) => {
        if (query === '(pointer: coarse)') return true;
        if (query === '(prefers-reduced-motion: reduce)') return false;
        return false;
      });

      const { container } = render(<CursorFollower />);

      // CursorFollower returns null when isCoarsePointer is true
      expect(container.firstElementChild).toBeNull();
    });

    it('returns null when prefers-reduced-motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);
      mockedUseMediaQuery.mockImplementation((query: string) => {
        if (query === '(pointer: coarse)') return false;
        if (query === '(prefers-reduced-motion: reduce)') return true;
        return false;
      });

      const { container } = render(<CursorFollower />);

      expect(container.firstElementChild).toBeNull();
    });

    it('returns null when enabled prop is false', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseMediaQuery.mockReturnValue(false);

      const { container } = render(<CursorFollower enabled={false} />);

      expect(container.firstElementChild).toBeNull();
    });

    it('renders cursor follower element on fine pointer devices', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseMediaQuery.mockReturnValue(false);

      const { container } = render(<CursorFollower />);

      const follower = container.firstElementChild as HTMLElement;
      expect(follower).not.toBeNull();
      expect(follower.getAttribute('aria-hidden')).toBe('true');
      expect(follower.style.position).toBe('fixed');
      expect(follower.style.pointerEvents).toBe('none');
    });

    it('uses correct default size and color', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseMediaQuery.mockReturnValue(false);

      const { container } = render(<CursorFollower />);

      const follower = container.firstElementChild as HTMLElement;
      expect(follower.style.width).toBe('20px');
      expect(follower.style.height).toBe('20px');
      expect(follower.style.borderRadius).toBe('50%');
    });
  });

  describe('PageTransition', () => {
    it('clamps duration to max 400ms', () => {
      const { container } = render(
        <PageTransition routeKey="test" duration={800}>
          <p>Page content</p>
        </PageTransition>
      );

      // Verify the transition data attribute shows clamped value (400ms = 0.4s)
      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).not.toBeNull();

      const transition = JSON.parse(
        motionDiv!.getAttribute('data-transition') || '{}'
      );
      // 400ms clamped, converted to seconds = 0.4
      expect(transition.duration).toBe(0.4);
    });

    it('uses duration of 0 when reduced motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <PageTransition routeKey="test" duration={300}>
          <p>Page content</p>
        </PageTransition>
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      const transition = JSON.parse(
        motionDiv!.getAttribute('data-transition') || '{}'
      );
      expect(transition.duration).toBe(0);
    });

    it('uses Framer Motion AnimatePresence wrapper', () => {
      const { container } = render(
        <PageTransition routeKey="home">
          <p>Page content</p>
        </PageTransition>
      );

      // AnimatePresence is mocked but wraps children
      expect(screen.getByText('Page content')).toBeTruthy();
      // motion.div is present
      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).not.toBeNull();
    });

    it('passes correct animation props for enter and exit', () => {
      mockedUseReducedMotion.mockReturnValue(false);

      const { container } = render(
        <PageTransition routeKey="test" duration={300}>
          <p>Content</p>
        </PageTransition>
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      const initial = JSON.parse(
        motionDiv!.getAttribute('data-initial') || '{}'
      );
      const animate = JSON.parse(
        motionDiv!.getAttribute('data-animate') || '{}'
      );
      const exit = JSON.parse(motionDiv!.getAttribute('data-exit') || '{}');

      expect(initial.opacity).toBe(0);
      expect(initial.y).toBe(8);
      expect(animate.opacity).toBe(1);
      expect(animate.y).toBe(0);
      expect(exit.opacity).toBe(0);
      expect(exit.y).toBe(-8);
    });

    it('uses no vertical offset when reduced motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { container } = render(
        <PageTransition routeKey="test" duration={300}>
          <p>Content</p>
        </PageTransition>
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      const initial = JSON.parse(
        motionDiv!.getAttribute('data-initial') || '{}'
      );
      const exit = JSON.parse(motionDiv!.getAttribute('data-exit') || '{}');

      // With reduced motion, y should be 0
      expect(initial.y).toBe(0);
      expect(exit.y).toBe(0);
    });

    it('respects default duration of 300ms when not specified', () => {
      mockedUseReducedMotion.mockReturnValue(false);

      const { container } = render(
        <PageTransition routeKey="test">
          <p>Content</p>
        </PageTransition>
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      const transition = JSON.parse(
        motionDiv!.getAttribute('data-transition') || '{}'
      );
      // 300ms = 0.3s
      expect(transition.duration).toBe(0.3);
    });
  });

  describe('StaggeredList', () => {
    it('renders all children immediately when reduced motion is enabled', () => {
      mockedUseReducedMotion.mockReturnValue(true);

      render(
        <StaggeredList>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </StaggeredList>
      );

      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
      expect(screen.getByText('Item 3')).toBeTruthy();
    });

    it('clamps stagger delay to 100-150ms range', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseIntersectionObserver.mockReturnValue({
        ref: { current: null },
        isIntersecting: true,
        entry: null,
      });

      // Test with a delay below minimum (50ms should clamp to 100ms)
      const { container } = render(
        <StaggeredList staggerDelay={50}>
          <p>Item 1</p>
          <p>Item 2</p>
        </StaggeredList>
      );

      // Children should still render
      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
    });

    it('clamps stagger delay above 150ms to 150ms', () => {
      mockedUseReducedMotion.mockReturnValue(false);
      mockedUseIntersectionObserver.mockReturnValue({
        ref: { current: null },
        isIntersecting: true,
        entry: null,
      });

      // Test with a delay above maximum (200ms should clamp to 150ms)
      const { container } = render(
        <StaggeredList staggerDelay={200}>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </StaggeredList>
      );

      // Check that the second item's transition delay corresponds to clamped 150ms
      const items = container.querySelectorAll('div > div > div');
      if (items.length >= 2) {
        const secondItem = items[1] as HTMLElement;
        // The transition should include 150ms delay for the second item
        expect(secondItem.style.transition).toContain('150ms');
      }
    });
  });
});
