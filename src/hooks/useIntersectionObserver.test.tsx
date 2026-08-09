import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act, screen } from '@testing-library/react';
import React from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
  let observeCallback: ((entries: IntersectionObserverEntry[]) => void) | null;
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeCallback = null;
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    // Must use a class (not vi.fn) so it can be used with `new`
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observeCallback = callback as (entries: IntersectionObserverEntry[]) => void;
      }
      observe = mockObserve;
      disconnect = mockDisconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn();
      root = null;
      rootMargin = '0px';
      thresholds = [0];
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  });

  // Test component that uses the hook and attaches the ref
  function TestComponent({
    options = {},
  }: {
    options?: Parameters<typeof useIntersectionObserver>[0];
  }) {
    const { ref, isIntersecting } = useIntersectionObserver(options);
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">
        {isIntersecting ? 'visible' : 'hidden'}
      </div>
    );
  }

  it('should start with isIntersecting as false', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target').textContent).toBe('hidden');
  });

  it('should observe the element', () => {
    render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should set isIntersecting to true when element enters viewport', () => {
    render(<TestComponent />);

    act(() => {
      observeCallback!([
        { isIntersecting: true, intersectionRatio: 0.5 } as IntersectionObserverEntry,
      ]);
    });

    expect(screen.getByTestId('target').textContent).toBe('visible');
  });

  it('should use provided threshold', () => {
    render(<TestComponent options={{ threshold: 0.5 }} />);
    // Observer is created with the element — we can confirm it's observing
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should not observe when disabled', () => {
    render(<TestComponent options={{ enabled: false }} />);
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should disconnect on unmount', () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should stay intersecting after trigger with triggerOnce', () => {
    render(<TestComponent options={{ triggerOnce: true }} />);

    // Trigger visible
    act(() => {
      observeCallback!([
        { isIntersecting: true, intersectionRatio: 0.5 } as IntersectionObserverEntry,
      ]);
    });
    expect(screen.getByTestId('target').textContent).toBe('visible');

    // Trigger not visible — should remain visible since triggerOnce=true
    act(() => {
      observeCallback!([
        { isIntersecting: false, intersectionRatio: 0 } as IntersectionObserverEntry,
      ]);
    });
    expect(screen.getByTestId('target').textContent).toBe('visible');
  });
});
