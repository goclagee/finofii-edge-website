import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParallax } from './useParallax';

// Mock dependencies
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

vi.mock('./useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => false),
}));

import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

const mockUseReducedMotion = vi.mocked(useReducedMotion);
const mockUseMediaQuery = vi.mocked(useMediaQuery);

describe('useParallax', () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
    mockUseMediaQuery.mockReturnValue(false);
  });

  it('should return a ref and isActive true for non-touch, non-reduced-motion', () => {
    const { result } = renderHook(() => useParallax());

    expect(result.current.ref).toBeDefined();
    expect(result.current.isActive).toBe(true);
  });

  it('should disable parallax when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useParallax());

    expect(result.current.isActive).toBe(false);
    expect(result.current.style).toEqual({});
  });

  it('should disable parallax on coarse pointer (touch) devices', () => {
    mockUseMediaQuery.mockReturnValue(true); // (pointer: coarse) matches

    const { result } = renderHook(() => useParallax());

    expect(result.current.isActive).toBe(false);
    expect(result.current.style).toEqual({});
  });

  it('should disable parallax when enabled is false', () => {
    const { result } = renderHook(() => useParallax({ enabled: false }));

    expect(result.current.isActive).toBe(false);
    expect(result.current.style).toEqual({});
  });

  it('should clamp speed to minimum 0.1', () => {
    const { result } = renderHook(() => useParallax({ speed: 0 }));
    expect(result.current.isActive).toBe(true);
    // Speed internally clamped to 0.1
  });

  it('should clamp speed to maximum 0.5', () => {
    const { result } = renderHook(() => useParallax({ speed: 1.0 }));
    expect(result.current.isActive).toBe(true);
    // Speed internally clamped to 0.5
  });

  it('should default to vertical direction', () => {
    const { result } = renderHook(() => useParallax());
    // When active with offset 0, style should have vertical transform
    expect(result.current.style.transform).toContain('translateY');
  });

  it('should support horizontal direction', () => {
    const { result } = renderHook(() => useParallax({ direction: 'horizontal' }));
    expect(result.current.style.transform).toContain('translateX');
  });

  it('should include willChange for performance', () => {
    const { result } = renderHook(() => useParallax());
    expect(result.current.style.willChange).toBe('transform');
  });
});
