'use client'

// Section 3 — What We Build (Services)
// Background: dark (#080507) | Gradient: cool-atmosphere from right
// Service blocks: single-column, alternating left/right alignment with accent bars
// Entrance: scale(0.96→1.0) + x-slide + opacity, cubic-bezier expo ease out

import { motion, useReducedMotion } from 'framer-motion'
import Tag from '@/components/ui/Tag'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

interface ServiceBlock {
  number: string
  tag: { variant: 'brand' | 'ai' | 'founder' | 'tech'; label: string }
  title: string
  body: string
  tint: boolean
}

const services: ServiceBlock[] = [
  {
    number: '01',
    tag: { variant: 'brand', label: 'Narrative Strategy' },
    title: 'The Story That Connects Everything',
    body: 'We build the single story that connects your brand across every channel, from pitch deck to homepage to sales conversation. One narrative frame, applied consistently across every surface where your company shows up.',
    tint: false,
  },
  {
    number: '02',
    tag: { variant: 'brand', label: 'Content Systems' },
    title: 'Architecture, Not Calendar',
    body: 'We design and operate content engines that produce at scale without losing voice, precision, or strategic intent. The difference between a content calendar and content architecture is the difference between activity and compounding.',
    tint: false,
  },
  {
    number: '03',
    tag: { variant: 'ai', label: 'AI-Augmented' },
    title: 'AI Is the Accelerant. Strategy Is Still the Engine.',
    body: 'We use AI to accelerate production, sharpen personalisation, and surface insights that human-only teams miss. The intelligence is artificial. The strategy, the voice, and the judgment about what matters are not.',
    tint: true,
  },
  {
    number: '04',
    tag: { variant: 'founder', label: 'Founder Brand' },
    title: 'The Founder Is the Distribution Channel',
    body: 'We build the personal brand of the founder as the company\'s most credible distribution channel. People trust people before they trust companies, and that trust is the one asset no ad budget can manufacture.',
    tint: false,
  },
]

export default function WhatWeBuild() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#080507',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cool atmosphere gradient from right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-cool-atmosphere)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <ScrollReveal>
          <SectionLabel color="#E85D1A">Services</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--text-section)',
              color: '#F2EAE4',
              lineHeight: 1.05,
              marginBottom: '16px',
              textAlign: 'left',
            }}
          >
            What We Build
          </h2>
          <div style={{ marginBottom: '64px' }}>
            <Button variant="primary" href="#pricing">
              See Pricing
            </Button>
          </div>
        </ScrollReveal>

        {/* Service blocks */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, i) => {
            const isRight = i % 2 !== 0
            const accentColor = '#E8451A'

            return (
              <ScrollReveal
                key={service.number}
                delay={i * 0.08}
              >
                <div
                  style={{
                    borderBottom: i < services.length - 1 ? '1px solid #1E181C' : 'none',
                  }}
                >
                  <div
                    style={{
                      padding: service.tint ? '56px 32px' : '56px 0',
                      backgroundColor: service.tint ? 'rgba(42, 56, 72, 0.25)' : 'transparent',
                      borderRadius: service.tint ? '4px' : '0',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '672px',
                        marginLeft: isRight ? 'auto' : '0',
                        marginRight: isRight ? '0' : 'auto',
                        borderLeft: !isRight ? `2px solid ${accentColor}` : 'none',
                        borderRight: isRight ? `2px solid ${accentColor}` : 'none',
                        paddingLeft: !isRight ? '24px' : '0',
                        paddingRight: isRight ? '24px' : '0',
                        textAlign: isRight ? 'right' : 'left',
                      }}
                    >
                      <HoverableTag variant={service.tag.variant} label={service.tag.label} shouldReduceMotion={shouldReduceMotion ?? false} />
                      <h3
                        style={{
                          fontFamily: 'var(--font-family-display)',
                          fontSize: 'clamp(28px, 3.5vw, 40px)',
                          color: '#F2EAE4',
                          lineHeight: 1.1,
                          marginTop: '16px',
                          marginBottom: '16px',
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: '17px',
                          color: '#C4A08A',
                          lineHeight: 1.75,
                          maxWidth: '480px',
                          marginLeft: isRight ? 'auto' : '0',
                          marginRight: isRight ? '0' : 'auto',
                        }}
                      >
                        {service.body}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// Tag with spring scale on hover
function HoverableTag({
  variant,
  label,
  shouldReduceMotion,
}: {
  variant: 'brand' | 'ai' | 'founder' | 'tech'
  label: string
  shouldReduceMotion: boolean
}) {
  return (
    <motion.div
      style={{ display: 'inline-block' }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <Tag variant={variant}>{label}</Tag>
    </motion.div>
  )
}
