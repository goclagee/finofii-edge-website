import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initAnimationEngine,
  isInitialized,
  destroyAnimationEngine,
  prefersReducedMotion,
  createScrollEntrance,
  createParallax,
} from './animation-engine';

// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    defaults: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
  },
}));

describe('animation-engine', () => {
  beforeEach(() => {
    destroyAnimationEngine();
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('initAnimationEngine', () => {
    it('should initialize successfully', () => {
      const result = initAnimationEngine();
      expect(result).toBe(true);
      expect(isInitialized()).toBe(true);
    });

    it('should only initialize once', () => {
      initAnimationEngine();
      const secondResult = initAnimationEngine();
      expect(secondResult).toBe(true);
    });

    it('should handle reduced motion preference', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const result = initAnimationEngine();
      expect(result).toBe(true);
      expect(isInitialized()).toBe(true);
    });

    it('should allow disabling reduced motion respect', () => {
      const result = initAnimationEngine({ respectReducedMotion: false });
      expect(result).toBe(true);
    });
  });

  describe('prefersReducedMotion', () => {
    it('should return false when motion is not reduced', () => {
      expect(prefersReducedMotion()).toBe(false);
    });

    it('should return true when motion is reduced', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      expect(prefersReducedMotion()).toBe(true);
    });
  });

  describe('destroyAnimationEngine', () => {
    it('should reset initialization state', () => {
      initAnimationEngine();
      expect(isInitialized()).toBe(true);
      destroyAnimationEngine();
      expect(isInitialized()).toBe(false);
    });
  });

  describe('createScrollEntrance', () => {
    it('should return null when engine is not initialized', () => {
      const element = document.createElement('div');
      const result = createScrollEntrance(element);
      expect(result).toBeNull();
    });

    it('should return null when reduced motion is preferred', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      initAnimationEngine({ respectReducedMotion: false });
      const element = document.createElement('div');
      const result = createScrollEntrance(element);
      expect(result).toBeNull();
    });
  });

  describe('createParallax', () => {
    it('should return null when engine is not initialized', () => {
      const element = document.createElement('div');
      const result = createParallax(element);
      expect(result).toBeNull();
    });

    it('should return null when reduced motion is preferred', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      initAnimationEngine({ respectReducedMotion: false });
      const element = document.createElement('div');
      const result = createParallax(element);
      expect(result).toBeNull();
    });

    it('should clamp speed to valid range', () => {
      initAnimationEngine();
      const element = document.createElement('div');
      // These should not throw even with out-of-range values
      createParallax(element, { speed: 0 });
      createParallax(element, { speed: 1.0 });
    });
  });
});
