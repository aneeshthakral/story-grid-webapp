import type { TierPricing } from '@/lib/currency'

export interface Tier {
  id: string
  name: string
  pricing: TierPricing
  minCommitment: string
  description: string
  deliverables: string[]
  highlighted?: boolean
  ctaLabel: string
  ctaHref: string
}

export const tiers: Tier[] = [
  {
    id: 'architecture',
    name: 'Narrative Architecture',
    pricing: { INR: 49950, USD: 599, EUR: 549 },
    minCommitment: '3-month minimum',
    description:
      'For early-stage founders who need a clear, ownable narrative before they scale content volume.',
    deliverables: [
      'Brand narrative document: core story, positioning, messaging pillars',
      'Founder voice extraction (2 deep-dive interviews)',
      'LinkedIn content system: 8 posts per month, ghostwritten in your voice',
      'Founder profile audit and full rewrite',
      'Monthly strategy call (60 minutes)',
      'Dedicated Slack channel, 48-hour response',
    ],
    ctaLabel: 'Book a Call',
    ctaHref: 'https://topmate.io/aneeshthakral/',
  },
  {
    id: 'engine',
    name: 'Narrative Engine',
    pricing: { INR: 69950, USD: 849, EUR: 799 },
    minCommitment: '3-month minimum',
    highlighted: true,
    description:
      'For growth-stage founders building a content system that compounds into pipeline over time.',
    deliverables: [
      'Full narrative strategy and brand story framework',
      'LinkedIn content system: 16 posts per month (founder + company page)',
      'AI-augmented content production pipeline',
      'Weekly strategy calls (30 minutes)',
      'Founder brand development: LinkedIn plus long-form thought leadership',
      'One designed content format per month (carousel, infographic, or newsletter)',
      'Monthly performance report with reach and engagement data',
    ],
    ctaLabel: 'Book a Call',
    ctaHref: 'https://topmate.io/aneeshthakral/',
  },
  {
    id: 'full-system',
    name: 'Full Narrative System',
    pricing: { INR: 99950, USD: 1199, EUR: 1099 },
    minCommitment: '6-month minimum',
    description:
      'For growth-stage companies ready to own their narrative category across every channel they show up in.',
    deliverables: [
      'Full narrative audit and multi-channel rebuild',
      '24 posts per month across LinkedIn, Instagram, and long-form',
      'AI integration into existing marketing stack',
      'Dedicated narrative strategist, single point of contact',
      'Executive and founder brand programs (up to 2 founders)',
      'Campaign and launch narrative support',
      'Bi-weekly strategy sessions',
      'Quarterly narrative review and system evolution',
    ],
    ctaLabel: 'Book a Call',
    ctaHref: 'https://topmate.io/aneeshthakral/',
  },
]
