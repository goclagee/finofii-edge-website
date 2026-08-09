# Requirements Document

## Introduction

Finofii Edge is a production-grade, multi-page marketing and product website for a US-focused accounting/bookkeeping firm. The site targets DTC brands, agencies, SaaS startups, and CPA firms. It employs an editorial design direction (proof-led, compliance-forward, dashboard as hero) with world-class animations, scroll-triggered effects, and micro-interactions throughout. The site launches in three phases across 16 pages, built with Next.js, TypeScript, and Tailwind CSS.

## Glossary

- **Site**: The Finofii Edge multi-page website application
- **Visitor**: Any unauthenticated user browsing the Site
- **Lead**: A Visitor who submits the qualified lead capture form
- **Design_System**: The reusable set of typography, color tokens, spacing scale, components, and animation primitives governing all pages
- **Animation_Engine**: The GSAP and Framer Motion–based layer responsible for scroll-triggered animations, parallax effects, morphing transitions, and micro-interactions
- **Dashboard_Demo**: The interactive sample dashboard page allowing Visitors to explore live charts with month toggles and industry presets
- **Booking_Widget**: The calendar-based scheduling component embedded in the Book a Free Audit page
- **Lead_Form**: The qualified multi-step form collecting entity type, revenue band, current tool, and timezone
- **CRM_Connector**: The integration layer syncing Lead submissions to the configured CRM and triggering Slack/WhatsApp alerts
- **Page_Router**: The Next.js App Router responsible for rendering all 16 pages and managing navigation transitions
- **Content_Layer**: The static content system (evolving to MDX in Phase C) that powers page copy, case studies, and blog posts
- **Chart_Engine**: The Recharts-based visualization layer rendering financial data in the Dashboard_Demo
- **Tier_Recommender**: The interactive tool that suggests a pricing tier based on Visitor inputs
- **SEO_Layer**: The metadata, structured data, and sitemap generation system for search engine optimization

## Requirements

### Requirement 1: Design System Foundation

**User Story:** As a developer, I want a comprehensive design system with defined tokens, typography, spacing, and reusable components, so that every page maintains visual consistency and the editorial brand identity.

#### Acceptance Criteria

1. THE Design_System SHALL define color tokens for Ink (#0B1420), Paper (#F4F2EC), Accent (#1CB894), Brass (#C6A15B), and Flag (#B4523E) in the Tailwind configuration
2. THE Design_System SHALL configure Fraunces (weights 400, 600, 700) as the display typeface for headings and hero text, Inter (weights 400, 500, 600, 700) as the interface typeface for body and UI elements, and IBM Plex Mono (weights 400, 500) as the data typeface for numeric and code content
3. THE Design_System SHALL enforce a 1180px maximum content width, 28px gutters, a 12-column grid, an 8px spacing scale with steps from 4px to 128px in multiples of 4, and a 14px border radius
4. THE Design_System SHALL provide a minimum of 15 reusable components including Button, Card, Section, Navbar, Footer, Stat, Testimonial, PricingTier, FormField, Toggle, Badge, Tooltip, Accordion, Modal, and AnimatedHeadline, each supporting at minimum default, hover, focus, and disabled states where applicable
5. THE Design_System SHALL render all numeric characters (digits 0–9, decimal points, percentage signs, and currency symbols) in IBM Plex Mono regardless of surrounding typeface context

### Requirement 2: Animation and Interaction Layer

**User Story:** As a visitor, I want extraordinary animations and micro-interactions throughout the site, so that the browsing experience feels premium and engaging beyond standard website patterns.

#### Acceptance Criteria

1. WHEN a section-level element enters the viewport at 20% visibility as detected by intersection observer, THE Animation_Engine SHALL trigger an entrance animation on that element with a duration between 300 and 600 milliseconds
2. THE Animation_Engine SHALL implement parallax depth effects on hero sections, background imagery, and floating decorative elements with a scroll speed ratio between 0.1 and 0.5 relative to the page scroll position
3. THE Animation_Engine SHALL execute morphing page transitions between routes using shared layout animation with a maximum transition duration of 400 milliseconds
4. WHEN a Visitor hovers or focuses on an interactive element, THE Animation_Engine SHALL initiate a visible state change (scale, color shift, or shadow transition) within 50 milliseconds
5. WHEN a counter, chart, or stat callout element enters the viewport at 20% visibility, THE Animation_Engine SHALL animate the reveal using a staggered sequence with 100 to 150 milliseconds delay between items and a total counter animation duration not exceeding 2000 milliseconds
6. THE Animation_Engine SHALL implement cursor-following effects on hero sections with a maximum of 100 milliseconds tracking delay and magnetic snap behavior that activates when the cursor is within 50 pixels of a primary action button
7. WHILE a page is scrolling, THE Animation_Engine SHALL apply progressive header condensation and background color shifts completing the full transition within 100 pixels of scroll distance from the trigger point
8. IF the Animation_Engine fails to initialize or JavaScript is unavailable, THEN THE Site SHALL render all content in its final static state without entrance animations, ensuring all information remains accessible

### Requirement 3: Home Page

**User Story:** As a visitor, I want a compelling home page that communicates Finofii Edge's value proposition with proof points and a dashboard hero, so that I immediately understand the offering and feel compelled to explore further.

#### Acceptance Criteria

1. THE Site SHALL render the Home page at the root path with a hero section featuring an animated dashboard preview, a primary headline in Fraunces, and a call-to-action linking to the Book a Free Audit page
2. THE Site SHALL display a social proof section showing a minimum of 6 client logos, at least 3 aggregate metrics with animated counters, and at least 2 testimonial cards with staggered scroll-reveal animations
3. THE Site SHALL present a services overview section linking to Bookkeeping & Close, Visual MIS & Dashboards, Virtual CFO & Advisory, and Entity & Compliance pages with animated icon cards
4. THE Site SHALL include a compliance trust bar displaying SOC 2, data-handling certifications, and partner badges
5. THE Site SHALL render a final call-to-action section with parallax background and animated headline linking to the Book a Free Audit page before the footer

### Requirement 4: Services Hub Page

**User Story:** As a visitor, I want a central services page that clearly presents all four capabilities, so that I can navigate to the specific service relevant to my needs.

#### Acceptance Criteria

1. THE Site SHALL render the Services hub page at /services with four capability cards linking to Bookkeeping & Close, Visual MIS & Dashboards, Virtual CFO & Advisory, and Entity & Compliance pages, each card entering with a scroll-triggered animation
2. WHEN a Visitor hovers on a capability card, THE Site SHALL expand the card within 300 milliseconds to reveal a brief description of that service's scope (minimum 1 sentence, maximum 3 sentences) and display a directional arrow animation indicating navigation
3. THE Site SHALL display a comparison matrix with rows for at least 3 deliverable categories per service and columns for each of the four services, using checkmark or cross indicators per cell
4. IF a Visitor is using a touch device or navigating via keyboard, THEN THE Site SHALL reveal the capability card scope details and directional arrow on focus or tap, matching the hover interaction behavior

### Requirement 5: Bookkeeping & Close Page

**User Story:** As a visitor, I want to understand the bookkeeping service scope, cadence, deliverables, and tool stack, so that I can evaluate whether Finofii Edge meets my accounting needs.

#### Acceptance Criteria

1. THE Site SHALL render the Bookkeeping & Close page at /services/bookkeeping with sections for scope, monthly cadence timeline with a minimum of 5 sequential steps, deliverables list, and integrated tool stack logos
2. THE Site SHALL present the monthly close cadence as an animated timeline with step-by-step reveal on scroll
3. THE Site SHALL display the tool stack (QuickBooks, Xero, Ramp, Brex, Mercury, Stripe) as interactive logo cards with hover tooltips describing integration capability, and on touch devices SHALL reveal tooltip content on tap
4. THE Site SHALL include a CTA section at the end of the page linking to the Book a Free Audit page

### Requirement 6: Visual MIS & Dashboards Page

**User Story:** As a visitor, I want to see the report catalogue, sample outputs, and delivery SLA for the MIS service, so that I can understand the data visibility Finofii Edge provides.

#### Acceptance Criteria

1. THE Site SHALL render the Visual MIS & Dashboards page at /services/dashboards with a report catalogue grid displaying a minimum of 6 report cards each showing report name, brief description, and report category, along with sample output previews and delivery SLA commitments
2. WHEN a Visitor clicks a sample dashboard screenshot, THE Site SHALL open a lightbox overlay displaying the screenshot at full resolution
3. IF the lightbox is open, THEN THE Site SHALL close it when the Visitor clicks the overlay background, clicks a close button, or presses the Escape key
4. THE Site SHALL state a minimum of 2 delivery SLA commitments with animated counter reveals on scroll entry (e.g., "Reports delivered within 5 business days of month-end")
5. THE Site SHALL display a minimum of 3 sample dashboard screenshots with descriptive alt text in the sample output previews section

### Requirement 7: Pricing Page

**User Story:** As a visitor, I want to compare pricing tiers clearly with features and FAQ, so that I can select the right plan for my business size.

#### Acceptance Criteria

1. THE Site SHALL render the Pricing page at /pricing with three tier cards (Essentials, Growth, Scale) displayed in a comparison layout
2. THE Site SHALL present a feature comparison table with row-by-row scroll reveal and checkmark/cross indicators per tier
3. THE Site SHALL include an FAQ accordion section with smooth expand/collapse animations
4. THE Site SHALL embed the Tier_Recommender interactive tool that suggests a tier based on entity type, monthly transaction volume, and revenue band inputs
5. WHEN a Visitor selects a tier, THE Site SHALL highlight the selected card with an accent border animation and display a contextual CTA linking to the Book a Free Audit page

### Requirement 8: Sample Dashboard Page

**User Story:** As a visitor, I want an interactive demo dashboard with live charts, month toggles, and industry presets, so that I can experience the reporting quality before committing.

#### Acceptance Criteria

1. THE Site SHALL render the Dashboard_Demo at /dashboard with a minimum of 3 financial charts (including at least one line chart, one bar chart, and one summary metric display) powered by the Chart_Engine
2. THE Dashboard_Demo SHALL provide a month toggle control allowing Visitors to switch between at least 12 months of sample data, defaulting to the most recent month on initial load
3. THE Dashboard_Demo SHALL provide industry preset selectors (DTC, Agency, SaaS, CPA) that swap underlying dataset and chart configurations, defaulting to DTC on initial load
4. THE Dashboard_Demo SHALL generate a shareable URL encoding the current month and industry preset selection as query parameters, and WHEN a Visitor loads a shared URL, THE Dashboard_Demo SHALL restore the encoded month and industry preset state
5. WHEN a Visitor changes month or industry preset, THE Chart_Engine SHALL animate the data transition with a morphing effect completing within 300 milliseconds
6. THE Dashboard_Demo SHALL render charts with responsive sizing adapting to viewport widths from 320px to 1440px
7. IF the Dashboard_Demo is loaded with invalid or unrecognized query parameters for month or industry preset, THEN THE Dashboard_Demo SHALL fall back to the default state (most recent month, DTC preset) and display the dashboard without error

### Requirement 9: Security & Compliance Page

**User Story:** As a visitor evaluating data security, I want to review controls, sub-processors, and data handling practices, so that I can confirm Finofii Edge meets my compliance requirements.

#### Acceptance Criteria

1. THE Site SHALL render the Security & Compliance page at /security with sections for security controls, data handling policies, and a sub-processor list, and SHALL provide anchor-link navigation to each section via a sticky sidebar or in-page table of contents
2. WHEN a Visitor scrolls to the security controls section, THE Site SHALL reveal each control as an animated checklist item with an icon and a description of no more than 120 characters per item
3. THE Site SHALL display the sub-processor list in a table sortable by name, purpose, and data location columns, defaulting to alphabetical ascending order by name
4. THE Site SHALL present data handling policies as a structured list of policy statements, each containing a policy title, a summary of no more than 200 characters, and an applicable data category label

### Requirement 10: Book a Free Audit Page

**User Story:** As a visitor ready to engage, I want a qualified intake form and calendar booking widget, so that I can schedule a consultation efficiently.

#### Acceptance Criteria

1. THE Site SHALL render the Book a Free Audit page at /book with the Lead_Form and the Booking_Widget
2. THE Lead_Form SHALL collect entity type, revenue band, current accounting tool, and timezone as required fields, each presenting predefined selectable options, with inline validation indicating which field is incomplete or invalid upon attempted step advancement
3. THE Lead_Form SHALL present fields in a multi-step animated flow with progress indication showing current step number out of total steps
4. WHEN a Lead submits the Lead_Form, THE CRM_Connector SHALL sync the submission to the configured CRM within 5 seconds
5. WHEN a Lead submits the Lead_Form, THE CRM_Connector SHALL trigger notifications to configured Slack and WhatsApp channels within 10 seconds
6. THE Booking_Widget SHALL display available time slots sourced from the integrated calendar provider based on the Visitor's selected timezone, showing a minimum of 5 business days of availability, and allow Visitors to select a 30-minute slot
7. IF the Lead_Form submission fails due to a network error, THEN THE Site SHALL display an inline error message and retain all entered data for retry
8. WHEN a Lead successfully books a time slot, THE Site SHALL display a confirmation message with the selected date, time, and timezone
9. IF the CRM_Connector fails to sync the submission, THEN THE Site SHALL queue the submission for retry and display a confirmation to the Lead without exposing the sync failure
10. IF the calendar provider is unavailable, THEN THE Booking_Widget SHALL display a message indicating scheduling is temporarily unavailable and offer a fallback contact method

### Requirement 11: Legal Pages

**User Story:** As a visitor or compliance officer, I want accessible Privacy Policy, Terms of Service, DPA, and Sub-processor list pages, so that I can review legal obligations.

#### Acceptance Criteria

1. THE Site SHALL render legal pages at /legal/privacy, /legal/terms, /legal/dpa, and /legal/sub-processors with formatted long-form content (supporting headings, paragraphs, lists, and tables) and a sticky table of contents sidebar that remains visible during scroll on viewports at or above 1024px and collapses into an expandable menu on viewports below 1024px
2. THE Site SHALL display a last-updated date in "Month DD, YYYY" format (e.g., "June 15, 2025") at the top of each legal page
3. WHILE a Visitor scrolls through a legal page, THE Site SHALL highlight the currently visible section in the table of contents and smooth-scroll to the target section with a vertical offset accounting for the sticky header height when an anchor link is clicked
4. IF a Visitor navigates to a legal page path that has no content available, THEN THE Site SHALL display a notification indicating the page is unavailable and provide a link back to the main legal index

### Requirement 12: Industry Landing Pages (Who We Serve)

**User Story:** As a visitor from a specific industry, I want a tailored landing page addressing my vertical's pain points and showcasing relevant results, so that I feel confident Finofii Edge understands my business.

#### Acceptance Criteria

1. THE Site SHALL render industry-specific pages at /industries/dtc, /industries/agencies, /industries/saas, and /industries/cpa, each containing a hero section with industry-specific headline and subheadline, a minimum of 3 pain points relevant to that vertical, and at least 1 case study excerpt linking to the full case study on the Case Studies page
2. THE Site SHALL display at least 1 chart example and at least 3 metric highlights per industry page using the Chart_Engine, where the sample data and metric labels differ between each industry to reflect that vertical's key financial indicators
3. THE Site SHALL include a CTA section on each industry page linking to the Book a Free Audit page, with the Lead_Form entity type field pre-selected to the corresponding industry value so the Visitor does not need to re-specify their vertical
4. WHEN a Visitor navigates to an industry page via direct URL or site navigation, THE Site SHALL render the complete page content within the standard page load without requiring additional user interaction to reveal content sections

### Requirement 13: Virtual CFO & Advisory Page

**User Story:** As a growing business, I want to understand the Virtual CFO offering, so that I can evaluate strategic financial guidance beyond bookkeeping.

#### Acceptance Criteria

1. THE Site SHALL render the Virtual CFO & Advisory page at /services/cfo with scope, a minimum of 6 advisory deliverables, meeting cadence (frequency and format), and ideal client profile sections
2. THE Site SHALL present advisory deliverables as an animated feature grid with icon cards that expand on click within 300 milliseconds to reveal detail panels, and collapse within 300 milliseconds when clicked again or when another card is expanded
3. THE Site SHALL include a CTA section at the end of the page linking to the Book a Free Audit page

### Requirement 14: Entity & Compliance Page

**User Story:** As a founder, I want to understand entity formation and ongoing compliance services, so that I can ensure my business structure and filings are handled correctly.

#### Acceptance Criteria

1. THE Site SHALL render the Entity & Compliance page at /services/entity with service scope, jurisdiction coverage, and filing calendar sections
2. THE Site SHALL display a filing calendar as an interactive timeline component showing 12 months of obligations, where clicking a month reveals the list of filing deadlines and compliance tasks for that month with a smooth expand animation
3. THE Site SHALL display jurisdiction coverage as a structured list or grid indicating each supported state or jurisdiction with its available services
4. THE Site SHALL include a CTA section linking to the Book a Free Audit page with service context pre-filled in the Lead_Form

### Requirement 15: How It Works Page

**User Story:** As a prospective client, I want to understand the 14-day onboarding process step by step, so that I know what to expect after signing up.

#### Acceptance Criteria

1. THE Site SHALL render the How It Works page at /how-it-works with a 14-day onboarding timeline divided into a minimum of 3 sequential phases, each labeled with its corresponding day range within the 14-day period
2. WHILE the Visitor scrolls through the timeline section, THE Animation_Engine SHALL progressively highlight the active phase and reveal milestone markers with a staggered entrance animation within 300 milliseconds per step
3. THE Site SHALL display at least one deliverable and at least one client responsibility for each onboarding phase, visually distinguished from each other
4. THE Site SHALL include a call-to-action section at the end of the timeline linking to the Book a Free Audit page

### Requirement 16: Case Studies Page

**User Story:** As a prospective client, I want to review before/after case studies with concrete numbers, so that I can see proven results from similar businesses.

#### Acceptance Criteria

1. THE Site SHALL render the Case Studies page at /case-studies with a filterable grid of case study cards supporting filter dimensions for industry (DTC, Agency, SaaS, CPA) and service type (Bookkeeping, MIS, CFO, Entity)
2. THE Site SHALL display each case study card with a client industry label, a headline summary, and a minimum of 2 before/after metric pairs rendered as animated counter transitions using IBM Plex Mono with animation duration not exceeding 1000 milliseconds on scroll entry
3. WHEN a Visitor clicks a case study card, THE Site SHALL expand it into a detail panel containing a problem statement section, a solution narrative section, and a quantified results section with before/after metrics
4. IF the active filter combination returns no matching case studies, THEN THE Site SHALL display an empty-state message indicating no results match the selected filters and offer a control to reset all filters

### Requirement 17: About & Team Page

**User Story:** As a prospective client, I want to learn about the firm's story and team members, so that I can build trust in the people behind the service.

#### Acceptance Criteria

1. THE Site SHALL render the About & Team page at /about with a company narrative section containing a heading, body text, and at least one supporting image, followed by a team member grid displaying a minimum of 3 team members
2. THE Site SHALL display team member cards in the grid with a photo, name, and role visible by default
3. WHEN a Visitor hovers on a team member card, THE Site SHALL reveal the team member's bio text (maximum 150 characters) with an animation completing within 300 milliseconds
4. IF a Visitor is using a touch device or keyboard navigation, THEN THE Site SHALL provide an alternative interaction (tap or focus) to reveal the team member bio without requiring hover
5. THE Site SHALL include a company timeline showing a minimum of 3 founding milestones with scroll-triggered animation consistent with the Animation_Engine entrance pattern

### Requirement 18: Resources Page (Blog & Guides)

**User Story:** As a visitor seeking educational content, I want a resources hub with blog posts, guides, templates, and a tax calendar, so that I can access valuable accounting knowledge.

#### Acceptance Criteria

1. THE Site SHALL render the Resources page at /resources with a category filter allowing Visitors to select one or more content types (blog posts, guides, templates, tax calendar) and display matching items in a card grid showing title, publish date, category badge, and excerpt, with a maximum of 12 items visible per page and pagination controls when results exceed that limit
2. THE Content_Layer SHALL support MDX-based authoring for blog posts and guides with embedded components including charts, callout boxes, code blocks, and interactive calculators rendered inline within the content body
3. THE Site SHALL display the tax calendar as an interactive month-by-month timeline spanning 12 months starting from the current month, with filing deadline entries highlighted per month, where each deadline entry displays the filing name, due date, and a one-sentence description of what is due, and Visitors can navigate forward and backward between months
4. IF a Visitor applies a category filter that matches no content items, THEN THE Site SHALL display an empty-state message indicating no results were found for the selected filter and suggesting the Visitor adjust the filter selection
5. WHEN a Visitor clicks a template card, THE Site SHALL navigate to a template detail view displaying the template description, preview, and a download action allowing the Visitor to obtain the template file

### Requirement 19: Navigation and Page Transitions

**User Story:** As a visitor, I want smooth, animated navigation between pages with a persistent header, so that the browsing experience feels cohesive and fluid.

#### Acceptance Criteria

1. THE Page_Router SHALL render a persistent navigation header with logo, page links (Services, Pricing, Dashboard, How It Works, Case Studies, About, Resources), and a primary CTA button linking to the Book a Free Audit page across all pages
2. WHEN a Visitor navigates between pages, THE Page_Router SHALL execute an animated page transition using shared layout animation completing within a maximum duration of 400 milliseconds
3. THE Page_Router SHALL render a footer with site map links, social media icons, legal page links, and a newsletter signup input accepting a valid email address (maximum 254 characters, standard email format validation) on all pages
4. WHILE the Visitor scrolls past the hero section, THE Page_Router SHALL condense the header to a compact sticky state that hides secondary navigation labels, reduces header height, and applies a backdrop blur effect
5. WHEN a Visitor taps the hamburger menu icon at viewports below 768px, THE Page_Router SHALL expand an animated mobile navigation overlay within 300 milliseconds displaying all page links and the primary CTA button, and collapse the overlay within 300 milliseconds when a link is selected or the close control is tapped
6. WHEN a Visitor submits the newsletter signup email, THE Page_Router SHALL display a confirmation message within 2 seconds indicating successful subscription
7. IF the newsletter signup submission fails due to an invalid email format or a network error, THEN THE Page_Router SHALL display an inline error message indicating the failure reason and retain the entered email address

### Requirement 20: SEO and Performance

**User Story:** As the business owner, I want the site to be SEO-optimized and performant, so that it ranks well in search engines and loads quickly for all visitors.

#### Acceptance Criteria

1. THE SEO_Layer SHALL generate unique meta titles (maximum 60 characters), meta descriptions (maximum 160 characters), and Open Graph tags (title, description, image, url) for each page
2. THE SEO_Layer SHALL produce a valid sitemap.xml containing all publicly accessible page URLs and a robots.txt at the site root
3. THE Site SHALL achieve a Lighthouse Performance score of 90 or above on desktop and 80 or above on mobile for all Phase A pages (Home, Services hub, Pricing, Dashboard Demo, Book a Free Audit, and Legal pages)
4. THE Site SHALL implement static generation for all content pages and incremental static regeneration with a revalidation interval of 60 seconds for the Dashboard_Demo and Case Studies pages
5. THE Site SHALL lazy-load images, charts, and sections positioned below the initial viewport, ensuring the initial page bundle size does not exceed 200 KB of JavaScript (compressed)
6. IF the SEO_Layer fails to generate meta tags for a page, THEN THE Site SHALL fall back to site-wide default meta title and description values

### Requirement 21: Responsive Design

**User Story:** As a visitor using any device, I want the site to render correctly across mobile, tablet, and desktop viewports, so that I have a quality experience regardless of screen size.

#### Acceptance Criteria

1. THE Site SHALL render all pages across viewports from 320px to 2560px width without horizontal overflow, content truncation, or overlapping elements
2. THE Site SHALL adapt grid layouts from 12 columns on desktop (above 1024px) to 2 columns on tablet (768px to 1024px) to single column on mobile (below 768px)
3. THE Site SHALL scale typography using a responsive type scale with a minimum body font size of 16px on mobile and a maximum of 20px on desktop, maintaining a minimum line height of 1.4
4. IF the device has a coarse pointer (touch device), THEN THE Site SHALL disable cursor-following effects and reduce parallax layers to a single depth layer
5. THE Site SHALL scale images and media elements fluidly within their containers, maintaining aspect ratio and not exceeding viewport width at any breakpoint

### Requirement 22: Accessibility

**User Story:** As a visitor using assistive technology, I want the site to meet accessibility standards, so that I can navigate and consume content without barriers.

#### Acceptance Criteria

1. THE Site SHALL conform to WCAG 2.1 Level AA standards across all pages, including minimum color contrast ratios of 4.5:1 for normal text and 3:1 for large text and UI components against their backgrounds
2. THE Site SHALL ensure all interactive elements are keyboard-navigable in a logical reading order, with focus indicators that have a minimum contrast ratio of 3:1 against adjacent colors and are at least 2px in thickness
3. THE Site SHALL provide ARIA labels that convey the purpose and current state for all animated components, charts, and interactive widgets, and SHALL provide a visually hidden data table equivalent for each chart rendered by the Chart_Engine
4. IF the Visitor has prefers-reduced-motion enabled, THEN THE Site SHALL disable all animations except content-revealing transitions necessary for navigation (page transitions, accordion expand/collapse, and modal open/close), reducing those to instantaneous state changes with no motion
5. WHEN a modal or multi-step form opens, THE Site SHALL move focus to the first interactive element within the component, trap focus within it while open, and restore focus to the triggering element upon close
