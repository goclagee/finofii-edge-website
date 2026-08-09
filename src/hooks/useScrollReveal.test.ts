import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollReveal } from './useScrollReveal';

// Mock useReducedMotion
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

// Mock useIntersectionObserver
vi.mock('./useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(() => ({
    ref: { current: null },
    isIntersecting: false,
    entry: null,
  })),
}));

import { useReducedMotion } from './useReducedMotion';
import { useIntersectionObserver } from './useIntersectionObserver';

const mockUseReducedMotion = vi.mocked(useReducedMotion);
const mockUseIntersectionObserver = vi.mocked(useIntersectionObserver);

describe('useScrollReveal', () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
    mockUseIntersectionObserver.mockReturnValue({
      ref: { current: null },
      isIntersecting: false,
      entry: null,
    });
  });

  it('should return initial hidden state when not intersecting', () => {
    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.isRevealed).toBe(false);
    expect(result.current.style.opacity).toBe(0);
  });

  it('should return revealed state when intersecting', () => {
    mockUseIntersectionObserver.mockReturnValue({
      ref: { current: null },
      isIntersecting: true,
      entry: null,
    });

    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.isRevealed).toBe(true);
    expect(result.current.style.opacity).toBe(1);
  });

  it('should show content immediately when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.isRevealed).toBe(true);
    expect(result.current.style).toEqual({});
  });

  it('should apply fade-up animation styles', () => {
    const { result } = renderHook(() => useScrollReveal({ animation: 'fade-up' }));

    expect(result.current.style.opacity).toBe(0);
    expect(result.current.style.transform).toBe('translateY(30px)');
  });

  it('should apply slide-left animation styles', () => {
    const { result } = renderHook(() => useScrollReveal({ animation: 'slide-left' }));

    expect(result.current.style.opacity).toBe(0);
    expect(result.current.style.transform).toBe('translateX(-50px)');
  });

  it('should apply slide-right animation styles', () => {
    const { result } = renderHook(() => useScrollReveal({ animation: 'slide-right' }));

    expect(result.current.style.opacity).toBe(0);
    expect(result.current.style.transform).toBe('translateX(50px)');
  });

  it('should apply scale animation styles', () => {
    const { result } = renderHook(() => useScrollReveal({ animation: 'scale' }));

    expect(result.current.style.opacity).toBe(0);
    expect(result.current.style.transform).toBe('scale(0.9)');
  });

  it('should clamp duration to 300-600ms range', () => {
    // Below minimum
    const { result: result1 } = renderHook(() => useScrollReveal({ duration: 100 }));
    expect(result1.current.style.transition).toContain('300ms');

    // Above maximum
    const { result: result2 } = renderHook(() => useScrollReveal({ duration: 1000 }));
    expect(result2.current.style.transition).toContain('600ms');
  });

  it('should use default threshold of 0.2', () => {
    renderHook(() => useScrollReveal());

    expect(mockUseIntersectionObserver).toHaveBeenCalledWith(
      expect.objectContaining({ threshold: 0.2 })
    );
  });

  it('should disable intersection observer when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    renderHook(() => useScrollReveal());

    expect(mockUseIntersectionObserver).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
  });
});
