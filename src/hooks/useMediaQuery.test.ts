import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Map<string, ((event: MediaQueryListEvent) => void)[]>;

  beforeEach(() => {
    listeners = new Map();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        const queryListeners: ((event: MediaQueryListEvent) => void)[] = [];
        listeners.set(query, queryListeners);

        return {
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn((_, handler) => {
            queryListeners.push(handler);
          }),
          removeEventListener: vi.fn((_, handler) => {
            const idx = queryListeners.indexOf(handler);
            if (idx >= 0) queryListeners.splice(idx, 1);
          }),
          dispatchEvent: vi.fn(),
        };
      }),
    });
  });

  it('should return false initially when query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('should return true when query matches initially', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('should update when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    // Simulate media query change
    const queryListeners = listeners.get('(min-width: 768px)');
    if (queryListeners && queryListeners.length > 0) {
      act(() => {
        queryListeners[0]({ matches: true } as MediaQueryListEvent);
      });
    }

    expect(result.current).toBe(true);
  });

  it('should support arbitrary media query strings', () => {
    const { result } = renderHook(() => useMediaQuery('(pointer: coarse)'));
    expect(result.current).toBe(false);
  });

  it('should clean up listener on unmount', () => {
    const removeEventListener = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener,
        dispatchEvent: vi.fn(),
      })),
    });

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
