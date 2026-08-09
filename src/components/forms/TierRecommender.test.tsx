import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TierRecommender } from './TierRecommender';

// Mock next/link for the Button component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('TierRecommender', () => {
  describe('Produces correct tier recommendation', () => {
    it('recommends Essentials for low-complexity inputs', () => {
      const onRecommendation = vi.fn();
      render(<TierRecommender onRecommendation={onRecommendation} />);

      // sole_prop (0) + under_50 (0) + pre_revenue (0) = 0 → essentials
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'sole_prop' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'under_50' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: 'pre_revenue' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(onRecommendation).toHaveBeenCalledWith('essentials');
      expect(screen.getByText(/essentials/i)).toBeInTheDocument();
    });

    it('recommends Growth for mid-complexity inputs', () => {
      const onRecommendation = vi.fn();
      render(<TierRecommender onRecommendation={onRecommendation} />);

      // llc (1) + 200_500 (2) + 100k_500k (2) = 5 → growth
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'llc' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: '200_500' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '100k_500k' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(onRecommendation).toHaveBeenCalledWith('growth');
      expect(screen.getByText(/growth/i)).toBeInTheDocument();
    });

    it('recommends Scale for high-complexity inputs', () => {
      const onRecommendation = vi.fn();
      render(<TierRecommender onRecommendation={onRecommendation} />);

      // ccorp (3) + over_1000 (4) + 5m_plus (5) = 12 → scale
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'ccorp' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'over_1000' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '5m_plus' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(onRecommendation).toHaveBeenCalledWith('scale');
      expect(screen.getByText(/scale/i)).toBeInTheDocument();
    });

    it('recommends Growth at score boundary (score = 4)', () => {
      const onRecommendation = vi.fn();
      render(<TierRecommender onRecommendation={onRecommendation} />);

      // llc (1) + 50_200 (1) + 100k_500k (2) = 4 → growth
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'llc' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: '50_200' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '100k_500k' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(onRecommendation).toHaveBeenCalledWith('growth');
    });

    it('recommends Scale at score boundary (score = 7)', () => {
      const onRecommendation = vi.fn();
      render(<TierRecommender onRecommendation={onRecommendation} />);

      // scorp (2) + 500_1000 (3) + 100k_500k (2) = 7 → scale
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'scorp' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: '500_1000' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '100k_500k' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(onRecommendation).toHaveBeenCalledWith('scale');
    });
  });

  describe('Highlights recommended tier', () => {
    it('displays recommendation with accent-highlighted tier name', () => {
      render(<TierRecommender />);

      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'ccorp' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'over_1000' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '5m_plus' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      // The recommendation panel should appear with accent border
      const resultPanel = screen.getByRole('status');
      expect(resultPanel).toBeInTheDocument();
      expect(resultPanel.className).toContain('border-accent');

      // The tier name should be highlighted with text-accent
      const accentText = resultPanel.querySelector('.text-accent');
      expect(accentText).toBeInTheDocument();
      expect(accentText?.textContent).toBe('Scale');
    });

    it('displays tier description in recommendation', () => {
      render(<TierRecommender />);

      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'sole_prop' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'under_50' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: 'pre_revenue' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(screen.getByText(/core bookkeeping and compliance/i)).toBeInTheDocument();
    });

    it('shows "Book a Free Audit" CTA in recommendation', () => {
      render(<TierRecommender />);

      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'llc' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: '200_500' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '100k_500k' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      const ctaLink = screen.getByRole('link', { name: /book a free audit/i });
      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveAttribute('href', '/book');
    });
  });

  describe('Validation errors', () => {
    it('shows errors when no inputs are selected', () => {
      render(<TierRecommender />);

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(screen.getByText(/please select your entity type/i)).toBeInTheDocument();
      expect(screen.getByText(/please select your transaction volume/i)).toBeInTheDocument();
      expect(screen.getByText(/please select your revenue band/i)).toBeInTheDocument();
    });

    it('clears individual error when that field is filled', () => {
      render(<TierRecommender />);

      // Trigger all errors
      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));
      expect(screen.getByText(/please select your entity type/i)).toBeInTheDocument();

      // Fill entity type - its error should clear
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'llc' },
      });
      expect(screen.queryByText(/please select your entity type/i)).not.toBeInTheDocument();

      // Other errors remain
      expect(screen.getByText(/please select your transaction volume/i)).toBeInTheDocument();
    });
  });

  describe('Reset functionality', () => {
    it('resets form when "Try Again" is clicked', () => {
      render(<TierRecommender />);

      // Fill all fields and get recommendation
      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'ccorp' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'over_1000' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: '5m_plus' },
      });
      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(screen.getByRole('status')).toBeInTheDocument();

      // Click "Try Again"
      fireEvent.click(screen.getByRole('button', { name: /try different inputs/i }));

      // Recommendation should be gone
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      // Selects should be reset
      expect(screen.getByLabelText(/entity type/i)).toHaveValue('');
      expect(screen.getByLabelText(/monthly transaction volume/i)).toHaveValue('');
      expect(screen.getByLabelText(/annual revenue band/i)).toHaveValue('');
    });
  });

  describe('Accessibility', () => {
    it('has an accessible container label', () => {
      render(<TierRecommender />);
      expect(screen.getByLabelText(/tier recommender tool/i)).toBeInTheDocument();
    });

    it('recommendation result uses aria-live="polite"', () => {
      render(<TierRecommender />);

      fireEvent.change(screen.getByLabelText(/entity type/i), {
        target: { value: 'sole_prop' },
      });
      fireEvent.change(screen.getByLabelText(/monthly transaction volume/i), {
        target: { value: 'under_50' },
      });
      fireEvent.change(screen.getByLabelText(/annual revenue band/i), {
        target: { value: 'pre_revenue' },
      });

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('select fields have aria-invalid when errors are present', () => {
      render(<TierRecommender />);

      fireEvent.click(screen.getByRole('button', { name: /get.*recommendation/i }));

      expect(screen.getByLabelText(/entity type/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/monthly transaction volume/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/annual revenue band/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
