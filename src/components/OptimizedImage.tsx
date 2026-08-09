import Image, { ImageProps } from 'next/image';

/**
 * OptimizedImage wraps next/image with:
 * - Blur placeholder for progressive loading (uses a low-quality base64 placeholder)
 * - Responsive srcset via sizes prop
 * - Lazy loading by default (below-fold images)
 * - Fluid width/height respecting aspect ratio
 *
 * For images without a known blurDataURL, a CSS shimmer placeholder is used.
 */

// Small 1x1 transparent SVG as a minimal blur placeholder fallback
const PLACEHOLDER_BLUR =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGNEYyRUMiLz48L3N2Zz4=';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Override the default blur data URL */
  blurDataURL?: string;
  /** Whether to use blur placeholder (default: true for static images) */
  usePlaceholder?: boolean;
}

export function OptimizedImage({
  blurDataURL,
  usePlaceholder = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const placeholderProps = usePlaceholder
    ? {
        placeholder: 'blur' as const,
        blurDataURL: blurDataURL || PLACEHOLDER_BLUR,
      }
    : {};

  return (
    <Image
      sizes={sizes}
      loading={loading}
      {...placeholderProps}
      {...props}
    />
  );
}
