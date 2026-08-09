'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface TestimonialProps extends HTMLAttributes<HTMLElement> {
  /** The quote text */
  quote: string;
  /** Name of the person providing the testimonial */
  author: string;
  /** Role/title of the author */
  role?: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Rating (1-5 stars) */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Card variant */
  variant?: 'default' | 'featured';
  /** Additional class name */
  className?: string;
}

/**
 * Testimonial component for displaying quote cards with attribution.
 * Renders as a blockquote with proper semantics. Supports optional
 * avatar, rating, and featured variant for emphasis.
 */
export const Testimonial = forwardRef<HTMLElement, TestimonialProps>(
  function Testimonial(
    {
      quote,
      author,
      role,
      company,
      avatarUrl,
      rating,
      variant = 'default',
      className = '',
      ...rest
    },
    ref
  ) {
    const variantStyles =
      variant === 'featured'
        ? 'border-accent/30 bg-accent/[0.03]'
        : 'border-ink/10 bg-paper';

    return (
      <figure
        ref={ref}
        className={[
          'flex flex-col gap-4 p-6',
          'border rounded-[14px]',
          'transition-shadow duration-300 hover:shadow-lg',
          variantStyles,
          className,
        ].join(' ')}
        {...rest}
      >
        {/* Rating */}
        {rating && (
          <div
            className="flex gap-0.5"
            role="img"
            aria-label={`Rating: ${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? 'text-brass' : 'text-ink/15'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-ink text-body leading-relaxed m-0">
          <p className="m-0">&ldquo;{quote}&rdquo;</p>
        </blockquote>

        {/* Attribution */}
        <figcaption className="flex items-center gap-3 mt-auto">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt=""
              className="h-10 w-10 rounded-full object-cover bg-ink/10"
              aria-hidden="true"
            />
          )}
          <div className="flex flex-col">
            <cite className="not-italic font-medium text-ink text-sm">
              {author}
            </cite>
            {(role || company) && (
              <span className="text-sm text-ink/60">
                {role}
                {role && company && ', '}
                {company}
              </span>
            )}
          </div>
        </figcaption>
      </figure>
    );
  }
);

export default Testimonial;
