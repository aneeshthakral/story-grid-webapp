/**
 * StoryGrid & Co. — Named Gradient Constants
 *
 * These reference the CSS custom properties defined in styles/globals.css :root block.
 * Use these constants for inline style={{ background: gradients.dualTemperature }}
 * Never define one-off gradient strings inline in components.
 *
 * USAGE RULES:
 * - dualTemperature: HERO AND CTA BANNER ONLY — one instance each, never elsewhere
 * - infraredWash: hero background overlay, Results section
 * - blazeFade: behind key headlines, CTA zones, Pricing featured card
 * - coolAtmosphere: AI-Augmented Marketing block, How We Work section
 * - depth: hero, all full-bleed dark sections
 */

export const gradients = {
  /** linear-gradient(to bottom) — used on hero, all full-bleed dark sections */
  depth: 'var(--gradient-depth)',

  /** radial warm energy halo — behind key headlines, CTA zones, Pricing featured card */
  blazeFade: 'var(--gradient-blaze-fade)',

  /** radial crimson undertone — hero background overlay, Results section */
  infraredWash: 'var(--gradient-infrared-wash)',

  /** linear cool-air counterbalance — AI block, HowWeWork section */
  coolAtmosphere: 'var(--gradient-cool-atmosphere)',

  /** dual fire-and-air — HERO ONLY and CTA BANNER ONLY */
  dualTemperature: 'var(--gradient-dual-temperature)',
} as const

export type GradientKey = keyof typeof gradients
