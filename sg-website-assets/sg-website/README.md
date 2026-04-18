# StoryGrid & Co. — Website

Premium marketing agency website built with Next.js 15, Tailwind CSS v4, and Framer Motion.

---

## Prerequisites

- Node.js 18+ (v20+ recommended)
- npm 9+

Use nvm to manage Node versions:

```bash
nvm install 20
nvm use 20
```

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Font Loading

Fonts load via `next/font/google` in `app/layout.tsx` at build time — no external CDN calls at runtime.

Three typefaces:

- **Bebas Neue** — display font, headlines, stats, section titles, pricing names, CTA banner
- **Barlow** — body copy, subheadlines, bios, descriptions (weights 400 and 500 only)
- **Barlow Condensed** — navigation, labels, tags, badges, button text (uppercase, tracked)

Font CSS variables (`--font-bebas-neue`, `--font-barlow`, `--font-barlow-condensed`) are injected on `<html>` and referenced in `styles/globals.css @theme` as `--font-family-display`, `--font-family-body`, `--font-family-condensed`.

**Note:** Bebas Neue only supports weight 400. Do not request other weights.

---

## Build

```bash
npm run build
npm run start
```

## Type Check

```bash
npm run type-check
```

---

## Project Structure

```
app/
  layout.tsx          Font loading, metadata, CustomCursor wrapper
  page.tsx            Composes all 9 sections in order

components/
  sections/
    Hero.tsx          S1 — dark, dual-temperature + infrared-wash, grain
    Problem.tsx       S2 — dark, blaze-fade behind heading
    WhatWeBuild.tsx   S3 — dark, cool-atmosphere from right
    HowWeWork.tsx     S4 — CREAM, SVG connector animation
    Results.tsx       S5 — dark, infrared-wash, stat counters
    Pricing.tsx       S6 — dark, 3 tiers + enterprise + one-time
    Founder.tsx       S7 — CREAM, dual-ring image, bio
    CTABanner.tsx     S8 — dark, dual-temperature, scale entrance
    Footer.tsx        S9 — dark, clean, no gradient

  ui/
    Button.tsx          primary | ghost | ai | solid variants
    Card.tsx            dark | light variants
    Tag.tsx             brand | ai | founder | tech variants
    SectionLabel.tsx    Eyebrow text
    CustomCursor.tsx    Dot + ring cursor, disabled on touch
    ScrollReveal.tsx    Framer Motion scroll wrapper
    StatCounter.tsx     Animated count-up from string value
    GrainOverlay.tsx    SVG feTurbulence grain texture
    PricingCard.tsx     Pricing tier card with featured pulse

styles/
  globals.css           Tailwind v4 @theme tokens + gradient CSS vars

lib/
  gradients.ts          Named gradient constants referencing CSS vars
```

---

## Vercel Deployment

1. Push this repository to GitHub
2. Import the repository into Vercel at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — use default settings
4. No environment variables required for base deployment
5. Set your custom domain in Vercel project settings → Domains

---

## Pre-Launch Checklist

Complete all items before going live:

- [ ] **Founder photo** — Replace the placeholder circle in `Founder.tsx` with `next/image` pointing to `/public/images/founder.jpg` (search: `FOUNDER_PHOTO`)
- [ ] **Calendly URL** — Update the "Book a Strategy Call" link in `Hero.tsx` (search: `CALENDLY_URL`)
- [ ] **Pricing validation** — Confirm all pricing numbers in `Pricing.tsx` match current rates
- [ ] **Real testimonials** — Replace placeholder cards in `Results.tsx` (search: `TESTIMONIAL_1`, `TESTIMONIAL_2`)
- [ ] **LinkedIn profile URL** — Confirm `LINKEDIN_PROFILE_URL` in `Founder.tsx` is correct
- [ ] **Company LinkedIn** — Update the LinkedIn company page URL in `Footer.tsx`
- [ ] **Instagram URL** — Update the Instagram URL in `Footer.tsx`
- [ ] **OG image** — Create `/public/og-image.jpg` (1200×630px) and uncomment the `images` array in `app/layout.tsx` metadata
- [ ] **Canonical URL** — Update `url` in `app/layout.tsx` openGraph metadata to the live domain
- [ ] **Email** — Verify `hello@storygrid.co` is active and forwarding before launch
- [ ] **Privacy Policy / Terms** — Link the placeholder `href="#"` anchors in `Footer.tsx` to real pages

---

## Brand System Reference

### Section Alternation (mandatory)
```
S1  Hero        dark   (#080507 + dual-temperature + infrared-wash)
S2  Problem     dark   (#080507 + blaze-fade)
S3  WhatWeBuild dark   (#080507 + cool-atmosphere)
S4  HowWeWork   CREAM  (#F0E8E2)
S5  Results     dark   (#080507 + infrared-wash)
S6  Pricing     dark   (#080507)
S7  Founder     CREAM  (#E8DDD4)
S8  CTABanner   dark   (#080507 + dual-temperature + infrared-wash)
S9  Footer      dark   (#080507)
```

### Five Named Gradients (defined in `styles/globals.css` `:root`)
- `--gradient-depth` — full-bleed dark sections
- `--gradient-blaze-fade` — warm energy halo, behind headlines and CTAs
- `--gradient-infrared-wash` — deep crimson atmospheric undertone, hero + Results
- `--gradient-cool-atmosphere` — cool-air counterbalance, Services + HowWeWork
- `--gradient-dual-temperature` — signature fire-and-air, **Hero and CTA Banner only**

### Color Rules
- `infrared` (#D42020) and `smoke` (#4A6080) — atmospheric and decorative **only**. Never used as text color.
- All 21 color tokens defined in `styles/globals.css @theme` — never approximate or substitute.
