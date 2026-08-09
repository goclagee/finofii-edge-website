# Implementation Plan: Finofii Edge Website

## Overview

Incremental implementation of the Finofii Edge multi-page marketing website, built with Next.js 14 App Router, TypeScript, Tailwind CSS v4, GSAP + Framer Motion animations, Recharts charts, and Zod validation. The plan focuses on Phase A launch pages first (Home, Services Hub, Bookkeeping, Dashboards, Pricing, Sample Dashboard, Security, Book a Free Audit, Legal), then Phase B and C pages. Each task builds on prior work, wiring components together progressively.

## Tasks

- [x] 1. Project scaffolding, design tokens, and type definitions
  - [x] 1.1 Initialize Next.js 14 App Router project with TypeScript and Tailwind CSS v4
    - Run `create-next-app` with App Router and TypeScript flags
    - Install dependencies: `gsap`, `framer-motion`, `recharts`, `zod`, `fast-check`, `@testing-library/react`, `vitest`
    - Configure `tsconfig.json` path aliases (`@/components`, `@/lib`, `@/types`, `@/hooks`, `@/content`)
    - Create directory structure: `src/app`, `src/components`, `src/lib`, `src/hooks`, `src/types`, `src/styles`, `src/content`
    - _Requirements: 1.1, 1.3, 20.3_

  - [x] 1.2 Create design tokens and Tailwind configuration
    - Implement `src/lib/design-tokens.ts` with color tokens (Ink #0B1420, Paper #F4F2EC, Accent #1CB894, Brass #C6A15B, Flag #B4523E)
    - Configure `src/styles/globals.css` with CSS custom properties for tokens, Tailwind v4 directives
    - Set up Tailwind config: 1180px max-width, 28px gutters, 12-column grid, 8px spacing scale (4px–128px), 14px border radius
    - Configure font families: Fraunces (400, 600, 700), Inter (400, 500, 600, 700), IBM Plex Mono (400, 500)
    - Implement numeric character font override rule (digits, decimals, %, $) to force IBM Plex Mono
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [x] 1.3 Define TypeScript type definitions
    - Create `src/types/dashboard.ts` with `IndustryType`, `MonthIndex`, `DashboardState`, `ChartDataPoint`, `DashboardDataset`, `MonthData`, `SummaryMetric`
    - Create `src/types/lead.ts` with `EntityType`, `RevenueBand`, `AccountingTool`, `TransactionVolume`, `PricingTier`, `LeadSubmission`
    - Create `src/types/case-study.ts` with `CaseStudy`, `ServiceType`, `BeforeAfterMetric`
    - Create `src/types/seo.ts` with `PageSEO`
    - Create `src/types/content.ts` with `ContentType`, `ContentItem`, `FilingDeadline`, `TeamMember`
    - _Requirements: 8.1, 10.2, 16.1, 20.1_

  - [x] 1.4 Implement core utility libraries
    - Implement `src/lib/seo.ts` with `generatePageSEO` (truncates title ≤60, description ≤160, OG fallback defaults) and `truncateWithEllipsis`
    - Implement `src/lib/dashboard-url.ts` with `encodeDashboardState`, `decodeDashboardState`, `isValidMonth`, `isValidIndustry`
    - Implement `src/lib/form-validation.ts` with Zod schemas (`leadFormSchema`, `newsletterSchema`) and `validateLeadStep`
    - Implement `src/lib/tier-recommender.ts` with `recommendTier` and `calculateTierScore` (score 0–3 → essentials, 4–6 → growth, 7+ → scale)
    - Implement `src/lib/filters.ts` with `filterCaseStudies` and `filterContent` (pagination support)
    - _Requirements: 7.4, 8.4, 8.7, 10.2, 16.1, 20.1, 20.6_

  - [x] 1.5 Write property tests for utility libraries (fast-check)
    - **Property 1: Dashboard URL State Round-Trip** — For any valid DashboardState, encode then decode produces equivalent state
    - **Validates: Requirements 8.4**
    - **Property 2: Dashboard URL Invalid Params Fallback** — For any arbitrary strings, decodeDashboardState returns defaults without throwing
    - **Validates: Requirements 8.7**
    - **Property 3: Tier Recommender Produces Valid Tier** — For any valid inputs, recommendTier returns one of essentials/growth/scale consistent with score boundaries
    - **Validates: Requirements 7.4**
    - **Property 4: Lead Form Validation Accepts All Valid Combinations** — For any valid enum/string inputs within constraints, leadFormSchema passes
    - **Validates: Requirements 10.2**
    - **Property 5: Case Study Filter Correctness** — Returned items match active filters; empty filters return all
    - **Validates: Requirements 16.1**
    - **Property 6: SEO Metadata Character Limit Enforcement** — Output title ≤60, description ≤160, OG fields non-empty
    - **Validates: Requirements 20.1, 20.6**

  - [x] 1.6 Write unit tests for utility libraries
    - Test `truncateWithEllipsis` edge cases: empty string, at limit, over limit, Unicode
    - Test `calculateTierScore` boundary values at threshold transitions
    - Test `validateLeadStep` per-step validation and error messages
    - Test newsletter email validation edge cases
    - Test filter empty-state detection
    - _Requirements: 7.4, 8.4, 10.2, 16.1, 20.1_

- [x] 2. Checkpoint - Core foundation verified
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Design system components
  - [x] 3.1 Implement base design system components (Button, Card, Section, Badge, Tooltip, Toggle)
    - Create `src/components/design-system/Button.tsx` with variants (primary, secondary, ghost, accent), sizes, disabled/loading states, magnetic prop, Link rendering
    - Create `src/components/design-system/Card.tsx` with variants (default, elevated, interactive, pricing), expandable support
    - Create `src/components/design-system/Section.tsx` as a layout wrapper with max-width, gutters, grid
    - Create `src/components/design-system/Badge.tsx` for category/status labels
    - Create `src/components/design-system/Tooltip.tsx` with hover/focus trigger and accessible labeling
    - Create `src/components/design-system/Toggle.tsx` for binary selections
    - Ensure all components support default, hover, focus, disabled states with appropriate ARIA attributes
    - _Requirements: 1.4, 22.1, 22.2_

  - [x] 3.2 Implement interactive design system components (Accordion, Modal, FormField, Stat, Testimonial, PricingTier, AnimatedHeadline)
    - Create `src/components/design-system/Accordion.tsx` with smooth expand/collapse, allowMultiple, keyboard support
    - Create `src/components/design-system/Modal.tsx` with focus trap, Escape close, overlay close, return focus
    - Create `src/components/design-system/FormField.tsx` with label, inline error, validation state styling
    - Create `src/components/design-system/Stat.tsx` for metric callouts with IBM Plex Mono numerics
    - Create `src/components/design-system/Testimonial.tsx` for quote cards with attribution
    - Create `src/components/design-system/PricingTier.tsx` with tier card layout, highlight state, CTA
    - Create `src/components/design-system/AnimatedHeadline.tsx` with fade-up, split-chars, typewriter animations
    - Create barrel export `src/components/design-system/index.ts`
    - _Requirements: 1.4, 7.3, 22.2, 22.4, 22.5_

  - [x] 3.3 Write component tests for design system
    - Test all 15 components render in each state (default, hover, focus, disabled)
    - Test Accordion keyboard expand/collapse interaction
    - Test Modal focus trap and Escape close behavior
    - Test PricingTier highlight state and CTA rendering
    - Test AnimatedHeadline reduced-motion behavior
    - Verify ARIA attributes and accessibility with jest-axe
    - _Requirements: 1.4, 22.1, 22.2, 22.5_

- [ ] 4. Animation engine and animation components
  - [ ] 4.1 Implement animation engine and hooks
    - Create `src/lib/animation-engine.ts` with GSAP/Framer Motion initialization, ScrollTrigger setup, progressive enhancement (static fallback if JS unavailable)
    - Create `src/hooks/useScrollReveal.ts` for intersection-observer-based entrance triggers at 20% visibility
    - Create `src/hooks/useParallax.ts` for parallax depth effects (speed ratio 0.1–0.5)
    - Create `src/hooks/useReducedMotion.ts` for prefers-reduced-motion detection
    - Create `src/hooks/useIntersectionObserver.ts` as base hook for viewport detection
    - Create `src/hooks/useMediaQuery.ts` for responsive breakpoint detection
    - _Requirements: 2.1, 2.2, 2.8, 22.4_

  - [x] 4.2 Implement animation components
    - Create `src/components/animations/ScrollReveal.tsx` with fade-up, fade-in, slide-left, slide-right, scale animations (duration 300–600ms, threshold 0.2)
    - Create `src/components/animations/ParallaxLayer.tsx` with configurable speed and direction, disabled for touch/reduced-motion
    - Create `src/components/animations/StaggeredList.tsx` with 100–150ms delay between items
    - Create `src/components/animations/CounterAnimation.tsx` with max 2000ms duration, prefix/suffix, IBM Plex Mono rendering
    - Create `src/components/animations/MagneticButton.tsx` with 50px snap radius
    - Create `src/components/animations/CursorFollower.tsx` with 100ms max tracking delay, disabled on touch devices
    - Create `src/components/animations/PageTransition.tsx` with shared layout animation ≤400ms
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 21.4_

  - [x] 4.3 Write component tests for animation components
    - Test ScrollReveal renders content in static state when reduced motion is enabled
    - Test ParallaxLayer disables on touch/reduced-motion
    - Test CounterAnimation respects max 2000ms duration
    - Test CursorFollower disabled on coarse pointer devices
    - Test PageTransition completes within 400ms
    - _Requirements: 2.1, 2.8, 21.4, 22.4_

- [ ] 5. Layout components and navigation
  - [x] 5.1 Implement Navbar, Footer, and layout shell
    - Create `src/components/design-system/Navbar.tsx` with logo, page links (Services, Pricing, Dashboard, How It Works, Case Studies, About, Resources), primary CTA button
    - Create `src/components/layout/CompactHeader.tsx` for condensed sticky state (scroll past hero triggers: reduced height, backdrop blur, hidden secondary labels)
    - Create `src/components/layout/MobileNavOverlay.tsx` for hamburger menu at viewports <768px (expand/collapse ≤300ms)
    - Create `src/components/design-system/Footer.tsx` with sitemap links, social icons, legal links, newsletter signup
    - Create `src/components/layout/GridContainer.tsx` for responsive 12/2/1 column grid
    - Create `src/app/layout.tsx` root layout with font loading, providers, Navbar, Footer, PageTransition wrapper
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 21.2_

  - [x] 5.2 Implement newsletter signup and header scroll behavior
    - Create `src/components/forms/NewsletterSignup.tsx` in Footer with email validation (max 254 chars), confirmation message within 2s, inline error on failure
    - Implement progressive header condensation using scroll listener: compact state on scroll past hero, background color shift within 100px scroll distance
    - Wire hamburger menu toggle with animated overlay and auto-close on link selection
    - _Requirements: 19.3, 19.4, 19.5, 19.6, 19.7_

  - [x] 5.3 Write component tests for navigation and layout
    - Test Navbar renders all required links and CTA
    - Test MobileNavOverlay opens/closes within 300ms
    - Test CompactHeader triggers on scroll position
    - Test NewsletterSignup inline validation and error states
    - Test keyboard navigation through all nav items
    - _Requirements: 19.1, 19.5, 22.2_

- [x] 6. Checkpoint - Design system and navigation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Chart components and dashboard demo data
  - [x] 7.1 Implement chart components
    - Create `src/components/charts/ChartContainer.tsx` with title, description, responsive wrapper, accessible hidden data table
    - Create `src/components/charts/LineChart.tsx` with Recharts, animated transitions ≤300ms, responsive sizing (320px–1440px)
    - Create `src/components/charts/BarChart.tsx` with Recharts, animated transitions, responsive sizing
    - Create `src/components/charts/MetricCard.tsx` for summary metrics with CounterAnimation integration, IBM Plex Mono numerics
    - Create `src/components/charts/AccessibleTable.tsx` as visually hidden data table equivalent for screen readers
    - _Requirements: 8.1, 8.5, 8.6, 22.3_

  - [x] 7.2 Create dashboard demo datasets and state hook
    - Create `src/content/data/dashboard-dtc.json` with 12 months of revenue, expenses, cashFlow, summaryMetrics
    - Create `src/content/data/dashboard-agency.json`, `dashboard-saas.json`, `dashboard-cpa.json` with industry-specific data
    - Create `src/hooks/useDashboardState.ts` for managing month/industry selection and URL sync via `dashboard-url.ts`
    - Wire URL query parameter encoding/decoding for shareable dashboard URLs
    - _Requirements: 8.2, 8.3, 8.4, 8.7_

  - [x] 7.3 Write component tests for charts
    - Test ChartContainer renders accessible hidden data table
    - Test LineChart and BarChart render with sample data
    - Test MetricCard uses IBM Plex Mono for numbers
    - Test responsive sizing at 320px and 1440px viewports
    - Test data transition animation respects reduced-motion
    - _Requirements: 8.1, 8.6, 22.3, 22.4_

- [ ] 8. Form components (LeadForm, BookingWidget, TierRecommender)
  - [x] 8.1 Implement LeadForm multi-step component
    - Create `src/components/forms/LeadForm.tsx` with multi-step animated flow
    - Implement steps: entity type → revenue band → current tool → timezone → email/company
    - Add progress indication (current step / total steps)
    - Integrate Zod validation via `validateLeadStep` for per-step inline errors
    - Support prefilled entity type and service props from industry/service pages
    - Handle submit success callback and network error retry (retain data, inline error)
    - _Requirements: 10.1, 10.2, 10.3, 10.7_

  - [x] 8.2 Implement BookingWidget and TierRecommender
    - Create `src/components/forms/BookingWidget.tsx` with calendar slot display, timezone selection, 30-min slots, 5 business days minimum
    - Implement fallback UI when calendar provider is unavailable
    - Implement booking confirmation display (date, time, timezone)
    - Create `src/components/forms/TierRecommender.tsx` with entity type, transaction volume, revenue band inputs
    - Wire `recommendTier` algorithm to produce tier recommendation with accent highlight
    - _Requirements: 7.4, 10.6, 10.8, 10.10_

  - [x] 8.3 Write component tests for forms
    - Test LeadForm multi-step navigation and progress display
    - Test inline validation errors display per step
    - Test form data retained on network error
    - Test BookingWidget fallback UI when provider unavailable
    - Test TierRecommender produces and highlights correct tier
    - Test LeadForm prefilled entity type from industry context
    - Test focus management: focus moves into form step, traps in modal
    - _Requirements: 10.2, 10.3, 10.7, 10.10, 22.5_

- [ ] 9. API routes and CRM connector
  - [x] 9.1 Implement API routes and CRM connector
    - Create `src/lib/crm-connector.ts` with CRM sync, exponential backoff retry (max 5 retries, base 1000ms, max 30000ms, 2x multiplier), queue on failure
    - Create `src/lib/calendar-client.ts` with calendar provider integration (Cal.com), slot fetching, booking submission
    - Create `src/app/api/lead/route.ts` — POST handler: validate payload with Zod, sync to CRM, trigger Slack/WhatsApp notifications, return success (mask CRM failures from user)
    - Create `src/app/api/newsletter/route.ts` — POST handler: validate email, subscribe, return confirmation/error
    - Create `src/app/api/booking/route.ts` — GET slots (by timezone/date) and POST booking, handle 503 gracefully
    - _Requirements: 10.4, 10.5, 10.9, 19.6, 19.7_

  - [x] 9.2 Write integration tests for API routes
    - Test `/api/lead` valid submission triggers CRM sync call (mock external)
    - Test `/api/lead` CRM failure queues retry and returns success to user
    - Test `/api/lead` invalid payload returns 400 with field errors
    - Test `/api/newsletter` valid/invalid email handling
    - Test `/api/booking/slots` returns slots for timezone
    - Test `/api/booking` POST creates booking
    - Test CRM connector exponential backoff timing
    - _Requirements: 10.4, 10.5, 10.9, 19.6, 19.7_

- [x] 10. Checkpoint - Core components and APIs complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Content components
  - [x] 11.1 Implement content display components
    - Create `src/components/content/FilterBar.tsx` with multi-dimension filter support, active filter state, reset control
    - Create `src/components/content/CaseStudyCard.tsx` with industry label, headline, before/after metric counters (IBM Plex Mono, ≤1000ms animation)
    - Create `src/components/content/CaseStudyDetail.tsx` with problem/solution/results expandable detail panel
    - Create `src/components/content/Lightbox.tsx` with overlay close, close button, Escape key close
    - Create `src/components/content/Timeline.tsx` for onboarding and filing timelines with scroll-triggered phase highlights
    - Create `src/components/content/FilingCalendar.tsx` for interactive 12-month filing timeline with month expand
    - _Requirements: 6.2, 6.3, 14.2, 15.1, 16.1, 16.2, 16.3_

  - [x] 11.2 Implement layout and sidebar components
    - Create `src/components/layout/StickyTOCSidebar.tsx` with sticky table of contents (visible ≥1024px, collapsible menu <1024px)
    - Implement active section highlighting on scroll and smooth-scroll with header offset
    - Create `src/components/content/TableOfContents.tsx` for legal pages with anchor navigation
    - Create `src/components/content/TeamMemberCard.tsx` with photo, name, role, bio reveal on hover/focus/tap (≤300ms, max 150 chars)
    - Create `src/components/content/TaxCalendar.tsx` for month-by-month resource timeline with navigation
    - _Requirements: 9.1, 11.1, 11.3, 17.2, 17.3, 17.4, 18.3_

  - [x] 11.3 Write component tests for content components
    - Test FilterBar filter selection and reset behavior
    - Test CaseStudyCard counter animation with IBM Plex Mono
    - Test Lightbox opens/closes on overlay click, close button, Escape
    - Test StickyTOCSidebar responsive behavior (sticky vs collapsed)
    - Test TeamMemberCard bio reveal on focus for accessibility
    - Test empty-state messages when filters return no results
    - _Requirements: 6.3, 11.1, 16.4, 17.4_

- [ ] 12. SEO layer and metadata
  - [x] 12.1 Implement SEO metadata generation and sitemap
    - Wire `src/lib/seo.ts` into Next.js `generateMetadata` for each page route
    - Generate unique meta title (≤60 chars), description (≤160 chars), OG tags per page
    - Create `src/app/sitemap.ts` for dynamic sitemap.xml generation with all public URLs
    - Create `src/app/robots.ts` for robots.txt at site root
    - Implement fallback to site-wide defaults when inputs missing
    - _Requirements: 20.1, 20.2, 20.6_

- [ ] 13. Phase A pages — Home, Services Hub, Pricing
  - [x] 13.1 Implement Home page
    - Create `src/app/page.tsx` with hero section (animated dashboard preview, Fraunces headline, CTA → /book)
    - Implement social proof section: 6+ client logos, 3+ animated counter metrics, 2+ testimonial cards with staggered ScrollReveal
    - Implement services overview section: 4 animated icon cards linking to service pages
    - Implement compliance trust bar: SOC 2, certifications, partner badges
    - Implement final CTA section with ParallaxLayer background and AnimatedHeadline → /book
    - Apply SEO metadata via generateMetadata
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 20.1_

  - [x] 13.2 Implement Services Hub page
    - Create `src/app/services/page.tsx` at /services with 4 capability cards (Bookkeeping, Dashboards, CFO, Entity)
    - Implement scroll-triggered card entrance animations
    - Implement card hover/focus expand (≤300ms) revealing service scope (1–3 sentences) and directional arrow
    - Implement comparison matrix with 3+ deliverable rows per service, checkmark/cross indicators
    - Touch/keyboard: reveal details on focus/tap matching hover behavior
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 13.3 Implement Pricing page
    - Create `src/app/pricing/page.tsx` at /pricing with 3 tier cards (Essentials, Growth, Scale)
    - Implement feature comparison table with row-by-row scroll reveal and checkmark/cross indicators
    - Embed TierRecommender interactive tool
    - Implement FAQ accordion section with smooth expand/collapse animations
    - Implement tier selection: accent border animation on selected card, contextual CTA → /book
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 14. Phase A pages — Dashboard Demo, Book, Bookkeeping, Dashboards Service
  - [x] 14.1 Implement Sample Dashboard page
    - Create `src/app/dashboard/page.tsx` at /dashboard with ISR (revalidate: 60)
    - Render 3+ financial charts (line, bar, metric card) using Chart_Engine
    - Implement month toggle (12 months, default most recent) and industry preset selectors (DTC, Agency, SaaS, CPA, default DTC)
    - Wire useDashboardState hook for URL-synced state management
    - Implement morphing data transitions (≤300ms) on month/industry change
    - Generate shareable URL with query params; restore state from URL on load
    - Handle invalid/unrecognized params: silent fallback to defaults
    - Responsive chart sizing 320px–1440px
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [x] 14.2 Implement Book a Free Audit page
    - Create `src/app/book/page.tsx` at /book with LeadForm and BookingWidget
    - Wire LeadForm submit to `/api/lead` endpoint
    - Wire BookingWidget to `/api/booking` endpoints (slots + booking)
    - Handle network errors: inline error, retain data, retry
    - Display booking confirmation (date, time, timezone) on success
    - Handle calendar unavailability: fallback message with contact method
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10_

  - [x] 14.3 Implement Bookkeeping & Close page
    - Create `src/app/services/bookkeeping/page.tsx` at /services/bookkeeping
    - Implement scope section, monthly cadence timeline (5+ sequential steps with animated step-by-step scroll reveal)
    - Implement deliverables list section
    - Implement tool stack section: QuickBooks, Xero, Ramp, Brex, Mercury, Stripe as interactive logo cards with hover tooltips (tap on touch)
    - Include CTA section → /book
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 14.4 Implement Visual MIS & Dashboards service page
    - Create `src/app/services/dashboards/page.tsx` at /services/dashboards
    - Implement report catalogue grid (6+ report cards with name, description, category)
    - Implement sample output previews with 3+ dashboard screenshots (descriptive alt text)
    - Implement Lightbox on screenshot click (full resolution, overlay/button/Escape close)
    - Implement delivery SLA commitments (2+) with animated counter reveals on scroll
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 15. Phase A pages — Security and Legal
  - [x] 15.1 Implement Security & Compliance page
    - Create `src/app/security/page.tsx` at /security with security controls, data handling policies, sub-processor list
    - Implement sticky sidebar / in-page TOC with anchor-link navigation
    - Implement animated checklist reveal for security controls (icon + ≤120 char description per item)
    - Implement sub-processor table sortable by name, purpose, data location (default alphabetical by name)
    - Implement data handling policies as structured list (title, ≤200 char summary, data category label)
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 15.2 Implement Legal pages (Privacy, Terms, DPA, Sub-processors)
    - Create `src/app/legal/privacy/page.tsx`, `terms/page.tsx`, `dpa/page.tsx`, `sub-processors/page.tsx`
    - Implement long-form content layout supporting headings, paragraphs, lists, tables
    - Implement StickyTOCSidebar (sticky ≥1024px, collapsed <1024px)
    - Display last-updated date in "Month DD, YYYY" format at top of each page
    - Implement active section highlighting on scroll, smooth-scroll with header offset
    - Handle unavailable legal page: notification message with link to legal index
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 16. Checkpoint - Phase A pages complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Phase B pages — Industry, CFO, Entity, How It Works, Case Studies
  - [x] 17.1 Implement Industry landing pages
    - Create `src/app/industries/dtc/page.tsx`, `agencies/page.tsx`, `saas/page.tsx`, `cpa/page.tsx`
    - Each page: hero with industry-specific headline/subheadline, 3+ pain points, 1+ case study excerpt linking to Case Studies page
    - Implement 1+ chart example and 3+ metric highlights per page with Chart_Engine (industry-specific data/labels)
    - Implement CTA section → /book with Lead_Form entity type pre-selected to corresponding industry
    - Render complete page content on load without user interaction to reveal
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 17.2 Implement Virtual CFO & Advisory page
    - Create `src/app/services/cfo/page.tsx` at /services/cfo
    - Implement scope section, 6+ advisory deliverables as animated feature grid (icon cards expand/collapse on click ≤300ms)
    - Implement meeting cadence and ideal client profile sections
    - Include CTA section → /book
    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 17.3 Implement Entity & Compliance page
    - Create `src/app/services/entity/page.tsx` at /services/entity
    - Implement service scope, jurisdiction coverage (structured list/grid of states with available services)
    - Implement FilingCalendar: interactive 12-month timeline, click month to expand filings/deadlines with smooth animation
    - Include CTA section → /book with service context pre-filled
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [x] 17.4 Implement How It Works page
    - Create `src/app/how-it-works/page.tsx` at /how-it-works
    - Implement 14-day onboarding timeline with 3+ sequential phases (day ranges labeled)
    - Implement scroll-triggered progressive phase highlighting with staggered entrance (≤300ms per step)
    - Display 1+ deliverable and 1+ client responsibility per phase, visually distinguished
    - Include CTA section → /book
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

  - [x] 17.5 Implement Case Studies page
    - Create `src/app/case-studies/page.tsx` at /case-studies with ISR (revalidate: 60)
    - Implement filterable grid with FilterBar (industry: DTC/Agency/SaaS/CPA; service: Bookkeeping/MIS/CFO/Entity)
    - Implement CaseStudyCard with industry label, headline, 2+ before/after metric counters (IBM Plex Mono, ≤1000ms on scroll entry)
    - Implement click-to-expand CaseStudyDetail: problem, solution, quantified results
    - Handle empty filter state: message + reset control
    - Create sample case study content in `src/content/case-studies/`
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 18. Checkpoint - Phase B pages complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 19. Phase C pages — About & Team, Resources
  - [x] 19.1 Implement About & Team page
    - Create `src/app/about/page.tsx` at /about with company narrative (heading, body, supporting image)
    - Implement team member grid (3+ members) using TeamMemberCard with photo, name, role, bio reveal (hover/focus/tap ≤300ms, max 150 chars)
    - Implement company timeline (3+ milestones) with scroll-triggered entrance animations
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

  - [x] 19.2 Implement Resources page (Blog & Guides)
    - Create `src/app/resources/page.tsx` at /resources with category filter (blog posts, guides, templates, tax calendar)
    - Implement card grid: title, publish date, category badge, excerpt; max 12 items per page with pagination
    - Implement TaxCalendar: interactive 12-month timeline from current month, filing deadlines per month (name, date, description), month navigation
    - Handle empty filter state: message suggesting filter adjustment
    - Implement template detail view with description, preview, download action
    - Set up MDX content support via next-mdx-remote for blog/guide authoring with embedded components (charts, callouts, code blocks, calculators)
    - Create sample content in `src/content/blog/` and `src/content/guides/`
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 20. Performance optimization and static generation
  - [x] 20.1 Configure static generation, ISR, and performance optimizations
    - Configure static generation for all content pages, ISR with 60s revalidation for Dashboard and Case Studies
    - Implement lazy-loading for images, charts, and below-fold sections
    - Verify initial page bundle ≤200KB JS compressed (configure @next/bundle-analyzer)
    - Configure `next/image` with blur placeholders and responsive srcset
    - Configure responsive type scale (16px min mobile, 20px max desktop, line-height ≥1.4)
    - Ensure no horizontal overflow at 320px–2560px viewports
    - _Requirements: 20.3, 20.4, 20.5, 21.1, 21.3, 21.5_

- [x] 21. Accessibility audit and final polish
  - [x] 21.1 Implement accessibility compliance
    - Verify color contrast ratios (4.5:1 normal text, 3:1 large text/UI components) against design tokens
    - Ensure all interactive elements keyboard-navigable with visible focus indicators (≥3:1 contrast, ≥2px thickness)
    - Add ARIA labels to all animated components, charts, and interactive widgets
    - Verify accessible data table equivalents for all Chart_Engine charts
    - Implement prefers-reduced-motion: disable all animations except navigation transitions (instant state changes)
    - Verify modal/form focus management: move focus in, trap, restore on close
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5_

  - [x] 21.2 Write integration and accessibility tests
    - Run axe-core accessibility audit in component tests (jest-axe)
    - Test keyboard-only navigation through critical paths (nav, forms, modals)
    - Test prefers-reduced-motion disables animations
    - Test responsive layouts at 320px, 768px, 1024px, 1440px
    - Test touch device: cursor effects disabled, parallax reduced
    - _Requirements: 21.4, 22.1, 22.2, 22.4_

- [x] 22. Final checkpoint - Full site verified
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Phase A pages (tasks 13–15) are launch-critical and should be prioritized
- Phase B (task 17) adds industry personalization and expanded services
- Phase C (task 19) adds content-heavy pages requiring MDX infrastructure
- Property tests validate universal correctness properties using fast-check
- Unit/integration tests validate specific examples, edge cases, and API behavior
- Checkpoints ensure incremental validation between major milestones
- All animations must gracefully degrade: content renders statically if JS unavailable
- CRM failures are hidden from the user — submissions are queued for retry

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4"] },
    { "id": 3, "tasks": ["1.5", "1.6"] },
    { "id": 4, "tasks": ["3.1", "4.1"] },
    { "id": 5, "tasks": ["3.2", "4.2"] },
    { "id": 6, "tasks": ["3.3", "4.3", "5.1"] },
    { "id": 7, "tasks": ["5.2", "5.3"] },
    { "id": 8, "tasks": ["7.1", "8.1", "12.1"] },
    { "id": 9, "tasks": ["7.2", "8.2", "7.3"] },
    { "id": 10, "tasks": ["8.3", "9.1"] },
    { "id": 11, "tasks": ["9.2", "11.1"] },
    { "id": 12, "tasks": ["11.2", "11.3"] },
    { "id": 13, "tasks": ["13.1", "13.2", "13.3"] },
    { "id": 14, "tasks": ["14.1", "14.2", "14.3", "14.4"] },
    { "id": 15, "tasks": ["15.1", "15.2"] },
    { "id": 16, "tasks": ["17.1", "17.2", "17.3"] },
    { "id": 17, "tasks": ["17.4", "17.5"] },
    { "id": 18, "tasks": ["19.1", "19.2"] },
    { "id": 19, "tasks": ["20.1"] },
    { "id": 20, "tasks": ["21.1"] },
    { "id": 21, "tasks": ["21.2"] }
  ]
}
```
