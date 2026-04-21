'use client'

// Section 6 — Pricing
// Background: dark (#080507) | Gradient: blaze-fade behind featured card
// Cards: stagger + scale entrance (0.97→1.0); non-featured: hover lift translateY -4px

import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import { tiers } from '@/data/pricing'
import { useCurrency } from '@/hooks/useCurrency'
import { formatPrice, type TierPricing } from '@/lib/currency'

const addOns = [
  {
    name: 'Brand Narrative Sprint',
    pricing: { INR: 29950, USD: 399, EUR: 369 } as TierPricing,
    detail: '2-week intensive',
    description:
      'Core story, messaging pillars, content framework. Built for founders pre-launch, pre-fundraise, or mid-pivot.',
  },
  {
    name: 'Brand Story Audit',
    pricing: { INR: 9950, USD: 149, EUR: 139 } as TierPricing,
    detail: '5-day written report',
    description:
      'A standalone audit of your current narrative, messaging gaps, and positioning. Applicable as credit toward any retainer.',
  },
]

// Checkmark icon — inline SVG, 16px, blaze color
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: '2px' }}
    >
      <path
        d="M3 8L6.5 11.5L13 4.5"
        stroke="#E8451A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1.0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariantsReduced = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion()
  const { currency, setCurrency, mounted } = useCurrency()
  const variants = shouldReduceMotion ? cardVariantsReduced : cardVariants

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: '#080507',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <ScrollReveal>
          <SectionLabel color="#E8451A">Investment</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--text-section)',
              color: '#F2EAE4',
              lineHeight: 1.05,
              marginBottom: '12px',
              textAlign: 'left',
            }}
          >
            Choose Your Narrative Layer
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '18px',
              color: '#C4A08A',
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            Every engagement starts with strategy. The tier determines scale.
          </p>
        </ScrollReveal>

        {/* Currency toggle */}
        {mounted && (
          <ScrollReveal>
            <div
              style={{
                display: 'inline-flex',
                gap: '0',
                marginBottom: '48px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid #1E181C',
              }}
            >
              {(['INR', 'EUR', 'USD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  style={{
                    fontFamily: 'var(--font-family-condensed)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '10px 24px',
                    border: 'none',
                    cursor: 'pointer',
                    background: currency === c ? '#E8451A' : '#141012',
                    color: currency === c ? '#080507' : '#887060',
                    transition: 'background 200ms ease, color 200ms ease',
                  }}
                >
                  {c === 'INR' ? '₹ INR' : c === 'EUR' ? '€ EUR' : '$ USD'}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Three tier cards */}
        <motion.div
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {tiers.map((tier) => {
            const isFeatured = tier.highlighted === true
            return (
              <motion.div
                key={tier.id}
                variants={variants}
                whileHover={
                  !isFeatured && !shouldReduceMotion
                    ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }
                    : {}
                }
                style={{ height: '100%' }}
              >
                <div
                  className={isFeatured ? '' : 'card-hover'}
                  style={{
                    background: isFeatured
                      ? 'var(--gradient-blaze-fade), #141012'
                      : '#141012',
                    border: isFeatured
                      ? '2px solid #E8451A'
                      : '1px solid #1E181C',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div style={{ marginBottom: '16px' }}>
                      <Tag variant="brand">MOST CHOSEN</Tag>
                    </div>
                  )}

                  {/* Tier name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: '32px',
                      color: '#F2EAE4',
                      marginBottom: '8px',
                    }}
                  >
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '6px',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: '56px',
                        color: '#F2EAE4',
                        lineHeight: 1,
                      }}
                    >
                      {formatPrice(tier.pricing, currency)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-condensed)',
                        fontSize: '13px',
                        color: '#887060',
                        textTransform: 'uppercase',
                      }}
                    >
                      / month
                    </span>
                  </div>

                  {/* Commitment */}
                  <p
                    style={{
                      fontFamily: 'var(--font-family-condensed)',
                      fontSize: '11px',
                      color: '#887060',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '16px',
                    }}
                  >
                    {tier.minCommitment}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      height: '1px',
                      background: '#1E181C',
                      marginBottom: '16px',
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: '16px',
                      color: '#C4A08A',
                      lineHeight: 1.65,
                      marginBottom: '24px',
                    }}
                  >
                    {tier.description}
                  </p>

                  {/* Deliverables */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      flex: 1,
                      marginBottom: '32px',
                    }}
                  >
                    {tier.deliverables.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                        }}
                      >
                        <CheckIcon />
                        <span
                          style={{
                            fontFamily: 'var(--font-family-body)',
                            fontSize: '15px',
                            color: '#C4A08A',
                            lineHeight: 1.55,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={isFeatured ? 'solid' : 'primary'}
                    href={tier.ctaHref}
                    style={{ width: '100%', justifyContent: 'center' } as React.CSSProperties}
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Add-ons */}
        <div
          style={{
            marginTop: '64px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(232, 69, 26, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {addOns.map((addOn) => (
            <ScrollReveal key={addOn.name} delay={0.05}>
              <div
                className="card-hover"
                style={{
                  backgroundColor: '#141012',
                  border: '1px solid #1E181C',
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <SectionLabel color="#D4912A">One-Time</SectionLabel>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: '32px',
                    color: '#F2EAE4',
                    marginBottom: '8px',
                    lineHeight: 1.05,
                  }}
                >
                  {addOn.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-condensed)',
                    fontSize: '20px',
                    color: '#E8451A',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                  className="tabular-nums"
                >
                  {formatPrice(addOn.pricing, currency)}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-family-condensed)',
                    fontSize: '12px',
                    color: '#887060',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '16px',
                  }}
                >
                  {addOn.detail}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '16px',
                    color: '#C4A08A',
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: '28px',
                  }}
                >
                  {addOn.description}
                </p>
                <a
                  href="mailto:hello@storygrid.co"
                  data-interactive
                  className="link-underline"
                  style={{
                    fontFamily: 'var(--font-family-condensed)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#E8451A',
                    textDecoration: 'none',
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FF5C2B'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#E8451A'
                  }}
                >
                  Email to book &rarr;
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enterprise footer line */}
        <ScrollReveal delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '15px',
              color: '#887060',
              textAlign: 'center',
              marginTop: '48px',
              lineHeight: 1.6,
            }}
          >
            Running a corporate narrative program at scale?{' '}
            <a
              href="mailto:hello@storygrid.co"
              data-interactive
              className="link-underline"
              style={{
                color: '#C4A08A',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F2EAE4'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#C4A08A'
              }}
            >
              Email hello@storygrid.co
            </a>{' '}
            for enterprise engagements.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
