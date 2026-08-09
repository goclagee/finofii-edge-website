import { describe, it, expect } from 'vitest';
import {
  colors,
  fontFamilies,
  fontWeights,
  typeScale,
  spacing,
  layout,
  numericCharPattern,
  numericCharacters,
  numericFontClass,
  numericUnicodeRanges,
} from './design-tokens';

describe('Design Tokens', () => {
  describe('colors', () => {
    it('defines Ink as #0B1420', () => {
      expect(colors.ink).toBe('#0B1420');
    });

    it('defines Paper as #F4F2EC', () => {
      expect(colors.paper).toBe('#F4F2EC');
    });

    it('defines Accent as #1CB894', () => {
      expect(colors.accent).toBe('#1CB894');
    });

    it('defines Brass as #C6A15B', () => {
      expect(colors.brass).toBe('#C6A15B');
    });

    it('defines Flag as #B4523E', () => {
      expect(colors.flag).toBe('#B4523E');
    });

    it('contains exactly 6 color tokens', () => {
      expect(Object.keys(colors)).toHaveLength(6);
    });
  });

  describe('fontFamilies', () => {
    it('defines display font as Fraunces serif', () => {
      expect(fontFamilies.display).toContain('Fraunces');
      expect(fontFamilies.display).toContain('serif');
    });

    it('defines interface font as Inter sans-serif', () => {
      expect(fontFamilies.interface).toContain('Inter');
      expect(fontFamilies.interface).toContain('sans-serif');
    });

    it('defines data font as IBM Plex Mono monospace', () => {
      expect(fontFamilies.data).toContain('IBM Plex Mono');
      expect(fontFamilies.data).toContain('monospace');
    });
  });

  describe('fontWeights', () => {
    it('configures Fraunces with weights 400, 600, 700', () => {
      expect(fontWeights.display).toEqual([400, 600, 700]);
    });

    it('configures Inter with weights 400, 500, 600, 700', () => {
      expect(fontWeights.interface).toEqual([400, 500, 600, 700]);
    });

    it('configures IBM Plex Mono with weights 400, 500', () => {
      expect(fontWeights.data).toEqual([400, 500]);
    });
  });

  describe('typeScale', () => {
    it('defines H1 desktop size as 60px', () => {
      expect(typeScale.h1.desktop).toBe('60px');
    });

    it('defines H2 desktop size as 38px', () => {
      expect(typeScale.h2.desktop).toBe('38px');
    });

    it('defines H3 desktop size as 26px', () => {
      expect(typeScale.h3.desktop).toBe('26px');
    });

    it('defines H4 desktop size as 19px', () => {
      expect(typeScale.h4.desktop).toBe('19px');
    });

    it('defines body desktop size as 17px', () => {
      expect(typeScale.body.desktop).toBe('17px');
    });

    it('defines body minimum size as 16px', () => {
      expect(typeScale.body.min).toBe('16px');
    });

    it('provides clamp() values for fluid typography', () => {
      Object.values(typeScale).forEach((step) => {
        expect(step.clamp).toMatch(/^clamp\(/);
      });
    });
  });

  describe('spacing', () => {
    it('starts at 4px (step 1)', () => {
      expect(spacing[1]).toBe('4px');
    });

    it('ends at 128px (step 32)', () => {
      expect(spacing[32]).toBe('128px');
    });

    it('uses multiples of 4px for all values', () => {
      Object.entries(spacing).forEach(([step, value]) => {
        const px = parseInt(value, 10);
        expect(px % 4).toBe(0);
        expect(px).toBe(Number(step) * 4);
      });
    });

    it('has 32 spacing steps (4px to 128px)', () => {
      expect(Object.keys(spacing)).toHaveLength(32);
    });
  });

  describe('layout', () => {
    it('sets max content width to 1180px', () => {
      expect(layout.maxContentWidth).toBe('1180px');
    });

    it('sets gutters to 28px', () => {
      expect(layout.gutters).toBe('28px');
    });

    it('uses 12-column grid', () => {
      expect(layout.columns).toBe(12);
    });

    it('sets border radius to 14px', () => {
      expect(layout.borderRadius).toBe('14px');
    });
  });

  describe('numeric character override', () => {
    it('pattern matches digits 0-9', () => {
      for (let i = 0; i <= 9; i++) {
        expect(numericCharPattern.test(String(i))).toBe(true);
      }
    });

    it('pattern matches decimal point', () => {
      expect(numericCharPattern.test('.')).toBe(true);
    });

    it('pattern matches percentage sign', () => {
      expect(numericCharPattern.test('%')).toBe(true);
    });

    it('pattern matches dollar sign', () => {
      expect(numericCharPattern.test('$')).toBe(true);
    });

    it('pattern does not match alphabetic characters', () => {
      expect(numericCharPattern.test('a')).toBe(false);
      expect(numericCharPattern.test('Z')).toBe(false);
    });

    it('numericCharacters includes all target characters', () => {
      expect(numericCharacters).toContain('0');
      expect(numericCharacters).toContain('9');
      expect(numericCharacters).toContain('.');
      expect(numericCharacters).toContain('%');
      expect(numericCharacters).toContain('$');
    });

    it('numericFontClass is font-data', () => {
      expect(numericFontClass).toBe('font-data');
    });

    it('numericUnicodeRanges covers $, %, decimal point, and digits 0-9', () => {
      expect(numericUnicodeRanges).toContain('U+0024-0025');
      expect(numericUnicodeRanges).toContain('U+002E');
      expect(numericUnicodeRanges).toContain('U+0030-0039');
    });
  });
});
