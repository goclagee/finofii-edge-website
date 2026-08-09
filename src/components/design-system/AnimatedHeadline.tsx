'use client';

import { forwardRef, useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface AnimatedHeadlineProps {
  /** The text to display */
  text: string;
  /** HTML heading element to render as */
  as?: 'h1' | 'h2' | 'h3';
  /** Animation style */
  animation: 'fade-up' | 'split-chars' | 'typewriter';
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Additional class name */
  className?: string;
}

/**
 * AnimatedHeadline component with three animation styles:
 * - fade-up: The text fades in and slides up
 * - split-chars: Each character animates in with staggered delay
 * - typewriter: Characters appear one by one like typing
 *
 * Respects prefers-reduced-motion: shows immediately without animation.
 * Animation triggers when the element enters the viewport.
 */
export const AnimatedHeadline = forwardRef<HTMLHeadingElement, AnimatedHeadlineProps>(
  function AnimatedHeadline(
    { text, as: Component = 'h2', animation, delay = 0, className = '' },
    ref
  ) {
    const reducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);
    const [displayedChars, setDisplayedChars] = useState(0);
    const hasAnimated = useRef(false);

    // Observe viewport entry
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.2,
      rootMargin: '0px',
    });

    // Combine refs: forward ref + observer ref
    const setRefs = (el: HTMLHeadingElement | null) => {
      // Set the intersection observer ref
      (observerRef as React.MutableRefObject<HTMLElement | null>).current = el;
      // Forward the external ref
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLHeadingElement | null>).current = el;
      }
    };

    // Trigger animation when element enters viewport
    useEffect(() => {
      if (isIntersecting && !hasAnimated.current) {
        const timeout = setTimeout(() => {
          setIsVisible(true);
          hasAnimated.current = true;
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, [isIntersecting, delay]);

    // Typewriter effect
    useEffect(() => {
      if (animation !== 'typewriter' || !isVisible || reducedMotion) return;

      const totalChars = text.length;
      const charDuration = Math.min(80, 2000 / totalChars); // Cap total at ~2s
      let frame: number;
      let currentChar = 0;

      const type = () => {
        currentChar++;
        setDisplayedChars(currentChar);
        if (currentChar < totalChars) {
          frame = window.setTimeout(type, charDuration);
        }
      };

      frame = window.setTimeout(type, charDuration);
      return () => clearTimeout(frame);
    }, [animation, isVisible, text, reducedMotion]);

    // If reduced motion is preferred, render immediately without animation
    if (reducedMotion) {
      return (
        <Component ref={setRefs} className={className}>
          {text}
        </Component>
      );
    }

    // Fade-up animation
    if (animation === 'fade-up') {
      return (
        <Component
          ref={setRefs}
          className={[
            'transition-all duration-500 ease-out',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6',
            className,
          ].join(' ')}
          aria-label={text}
        >
          {text}
        </Component>
      );
    }

    // Split-chars animation
    if (animation === 'split-chars') {
      return (
        <Component
          ref={setRefs}
          className={className}
          aria-label={text}
        >
          {text.split('').map((char, i) => (
            <span
              key={`${i}-${char}`}
              className={[
                'inline-block transition-all duration-400 ease-out',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4',
              ].join(' ')}
              style={{
                transitionDelay: isVisible ? `${i * 30}ms` : '0ms',
              }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </Component>
      );
    }

    // Typewriter animation
    if (animation === 'typewriter') {
      return (
        <Component
          ref={setRefs}
          className={className}
          aria-label={text}
        >
          <span aria-hidden="true">
            {isVisible ? text.slice(0, displayedChars) : ''}
            {isVisible && displayedChars < text.length && (
              <span className="inline-block w-[2px] h-[1em] bg-ink align-middle animate-pulse ml-[1px]" />
            )}
          </span>
        </Component>
      );
    }

    // Fallback
    return (
      <Component ref={setRefs} className={className}>
        {text}
      </Component>
    );
  }
);

export default AnimatedHeadline;
