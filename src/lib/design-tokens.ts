/**
 * Finofii Edge Design Tokens
 *
 * Single source of truth for color palette, typography, spacing, layout,
 * and border radius values used across the application.
 */

// ---------------------------------------------------------------------------
// Color Tokens
// ---------------------------------------------------------------------------

export const colors = {
  ink: '#0B1420',
  paper: '#F4F2EC',
  accent: '#1CB894',
  accentFocus: '#158F6B', // Darker accent for focus indicators — meets WCAG 2.1 ≥3:1 contrast against paper
  brass: '#C6A15B',
  flag: '#B4523E',
} as const;

export type ColorToken = keyof typeof colors;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const fontFamilies = {
  display: "'Fraunces', serif",
  interface: "'Inter', sans-serif",
  data: "'IBM Plex Mono', monospace",
} as const;

export const fontWeights = {
  display: [400, 600, 700] as const,
  interface: [400, 500, 600, 700] as const,
  data: [400, 500] as const,
} as const;

export type FontFamily = keyof typeof fontFamilies;

// ---------------------------------------------------------------------------
// Type Scale
// Desktop heading sizes and body text with fluid clamping for mobile
// ---------------------------------------------------------------------------

export const typeScale = {
  /** H1 — 60px desktop, clamped 36px–60px */
  h1: { desktop: '60px', min: '36px', clamp: 'clamp(2.25rem, 1.5rem + 3vw, 3.75rem)' },
  /** H2 — 38px desktop, clamped 26px–38px */
  h2: { desktop: '38px', min: '26px', clamp: 'clamp(1.625rem, 1.25rem + 1.5vw, 2.375rem)' },
  /** H3 — 26px desktop, clamped 20px–26px */
  h3: { desktop: '26px', min: '20px', clamp: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)' },
  /** H4 — 19px desktop, clamped 17px–19px */
  h4: { desktop: '19px', min: '17px', clamp: 'clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)' },
  /** Body — 16px mobile, 17px desktop */
  body: { desktop: '17px', min: '16px', clamp: 'clamp(1rem, 0.975rem + 0.125vw, 1.0625rem)' },
  /** Small — 14px */
  small: { desktop: '14px', min: '13px', clamp: 'clamp(0.8125rem, 0.775rem + 0.125vw, 0.875rem)' },
} as const;

export type TypeScaleStep = keyof typeof typeScale;

// ---------------------------------------------------------------------------
// Spacing Scale (8px base, multiples of 4, from 4px to 128px)
// ---------------------------------------------------------------------------

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
  21: '84px',
  22: '88px',
  23: '92px',
  24: '96px',
  25: '100px',
  26: '104px',
  27: '108px',
  28: '112px',
  29: '116px',
  30: '120px',
  31: '124px',
  32: '128px',
} as const;

export type SpacingStep = keyof typeof spacing;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const layout = {
  maxContentWidth: '1180px',
  gutters: '28px',
  columns: 12,
  borderRadius: '14px',
} as const;

// ---------------------------------------------------------------------------
// Numeric Character Override
// Regular expression matching characters that should always render in IBM Plex Mono:
// digits 0-9, decimal point, percentage sign, dollar sign
//
// Implementation: globals.css uses @font-face with unicode-range to declare
// 'NumericOverride' that maps to IBM Plex Mono for U+0024-0025, U+002E,
// U+0030-0039. This font is prepended to all font stacks (display, interface)
// so numeric characters render in IBM Plex Mono globally without extra markup.
//
// For programmatic use (e.g., detecting numeric chars in JS), the regex and
// class-based utilities below are also available.
// ---------------------------------------------------------------------------

export const numericCharPattern = /[0-9.%$]/;

/**
 * CSS class name that forces IBM Plex Mono on numeric content.
 * Apply this class to elements that display financial/numeric data.
 */
export const numericFontClass = 'font-data';

/**
 * Characters that trigger the numeric font override.
 * Used by the CSS unicode-range rule and the NumericText component.
 */
export const numericCharacters = '0123456789.%$' as const;

/**
 * Unicode ranges used in the @font-face override declarations.
 * These correspond to the characters in numericCharacters.
 */
export const numericUnicodeRanges = 'U+0024-0025, U+002E, U+0030-0039' as const;

// ---------------------------------------------------------------------------
// Full token export for programmatic usage
// ---------------------------------------------------------------------------

export const designTokens = {
  colors,
  fontFamilies,
  fontWeights,
  typeScale,
  spacing,
  layout,
} as const;

export default designTokens;
