'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animation Engine
 *
 * Initializes GSAP + ScrollTrigger for scroll-triggered animation sequences.
 * Implements progressive enhancement: all content renders in final static state
 * if JS is unavailable or animation initialization fails.
 */

let initialized = false;

export interface AnimationEngineConfig {
  /** Whether to enable ScrollTrigger (default: true) */
  enableScrollTrigger?: boolean;
  /** Whether to respect prefers-reduced-motion (default: true) */
  respectReducedMotion?: boolean;
}

/**
 * Initializes the animation engine with GSAP and ScrollTrigger.
 * Safe to call multiple times — will only initialize once.
 * Returns false if initialization fails (graceful degradation).
 */
export function initAnimationEngine(config: AnimationEngineConfig = {}): boolean {
  const { enableScrollTrigger = true, respectReducedMotion = true } = config;

  if (initialized) return true;

  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;

    // Check for reduced motion preference
    if (respectReducedMotion && prefersReducedMotion()) {
      initialized = true;
      return true;
    }

    // Register GSAP plugins
    if (enableScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Configure GSAP defaults for consistent animation behavior
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.5,
    });

    initialized = true;
    return true;
  } catch {
    // Graceful degradation — content renders statically
    console.warn('[AnimationEngine] Failed to initialize. Content will render statically.');
    return false;
  }
}

/**
 * Checks if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns whether the animation engine has been initialized.
 */
export function isInitialized(): boolean {
  return initialized;
}

/**
 * Creates a scroll-triggered entrance animation on an element.
 * Falls back to showing the element in its final state if engine isn't initialized.
 */
export function createScrollEntrance(
  element: HTMLElement,
  options: {
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
    duration?: number;
    delay?: number;
    threshold?: number;
  } = {}
): ScrollTrigger | null {
  const {
    animation = 'fade-up',
    duration = 0.5,
    delay = 0,
    threshold = 0.2,
  } = options;

  if (!initialized || prefersReducedMotion()) {
    // Ensure element is visible in its final state
    gsap.set(element, { clearProps: 'all' });
    return null;
  }

  try {
    const fromVars = getAnimationFromVars(animation);

    gsap.set(element, fromVars);

    gsap.to(element, {
      ...getAnimationToVars(animation),
      duration,
      delay,
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return ScrollTrigger.getAll().pop() ?? null;
  } catch {
    // Graceful fallback
    gsap.set(element, { clearProps: 'all' });
    return null;
  }
}

/**
 * Creates a parallax effect on an element.
 * Speed ratio between 0.1 and 0.5.
 */
export function createParallax(
  element: HTMLElement,
  options: {
    speed?: number;
    direction?: 'vertical' | 'horizontal';
  } = {}
): ScrollTrigger | null {
  const { speed = 0.3, direction = 'vertical' } = options;

  // Clamp speed to valid range
  const clampedSpeed = Math.max(0.1, Math.min(0.5, speed));

  if (!initialized || prefersReducedMotion()) {
    return null;
  }

  try {
    const distance = 100 * clampedSpeed;
    const prop = direction === 'vertical' ? 'y' : 'x';

    gsap.to(element, {
      [prop]: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return ScrollTrigger.getAll().pop() ?? null;
  } catch {
    return null;
  }
}

/**
 * Kills all ScrollTrigger instances and resets the engine.
 * Useful for cleanup on unmount.
 */
export function destroyAnimationEngine(): void {
  try {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    initialized = false;
  } catch {
    initialized = false;
  }
}

// --- Internal helpers ---

function getAnimationFromVars(animation: string): gsap.TweenVars {
  switch (animation) {
    case 'fade-up':
      return { opacity: 0, y: 30 };
    case 'fade-in':
      return { opacity: 0 };
    case 'slide-left':
      return { opacity: 0, x: -50 };
    case 'slide-right':
      return { opacity: 0, x: 50 };
    case 'scale':
      return { opacity: 0, scale: 0.9 };
    default:
      return { opacity: 0 };
  }
}

function getAnimationToVars(animation: string): gsap.TweenVars {
  switch (animation) {
    case 'fade-up':
      return { opacity: 1, y: 0 };
    case 'fade-in':
      return { opacity: 1 };
    case 'slide-left':
      return { opacity: 1, x: 0 };
    case 'slide-right':
      return { opacity: 1, x: 0 };
    case 'scale':
      return { opacity: 1, scale: 1 };
    default:
      return { opacity: 1 };
  }
}
