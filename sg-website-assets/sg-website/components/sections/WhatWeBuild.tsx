'use client'

// Section 3 — What We Build (Services)
// Background: dark (#080507) | Gradient: cool-atmosphere from right
// Service blocks: alternating text/image layout with Stitch visual panels
// Entrance: scale(0.96→1.0) + x-slide + opacity, cubic-bezier expo ease out

import { useState } from 'react'
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
  direction: 'left' | 'right'
  tint: boolean
  image: string | null
  imageAlt: string
}

const services: ServiceBlock[] = [
  {
    number: '01',
    tag: { variant: 'brand', label: 'Narrative Strategy' },
    title: 'The Story That Connects Everything',
    body: 'We build the single story that connects your brand across every channel, from pitch deck to homepage to sales conversation. One narrative frame, applied consistently across every surface where your company shows up.',
    direction: 'left',
    tint: false,
    image: null,
    imageAlt: 'Narrative strategy gradient',
  },
  {
    number: '02',
    tag: { variant: 'brand', label: 'Content Systems' },
    title: 'Architecture, Not Calendar',
    body: 'We design and operate content engines that produce at scale without losing voice, precision, or strategic intent. The difference between a content calendar and content architecture is the difference between activity and compounding.',
    direction: 'right',
    tint: false,
    image: null,
    imageAlt: 'Content systems gradient',
  },
  {
    number: '03',
    tag: { variant: 'ai', label: 'AI-Augmented' },
    title: 'AI Is the Accelerant. Strategy Is Still the Engine.',
    body: 'We use AI to accelerate production, sharpen personalisation, and surface insights that human-only teams miss. The intelligence is artificial. The strategy, the voice, and the judgment about what matters are not.',
    direction: 'left',
    tint: true,
    image: null,
    imageAlt: 'AI strategy gradient',
  },
  {
    number: '04',
    tag: { variant: 'founder', label: 'Founder Brand' },
    title: 'The Founder Is the Distribution Channel',
    body: 'We build the personal brand of the founder as the company\'s most credible distribution channel. People trust people before they trust companies, and that trust is the one asset no ad budget can manufacture.',
    direction: 'right',
    tint: false,
    image: null,
    imageAlt: 'Founder brand gradient',
  },
]

// Service block hover wrapper with left border glow
function ServiceBlockWrapper({
  children,
  tint,
}: {
  children: React.ReactNode
  tint: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: tint ? '56px 32px' : '56px 0',
        backgroundColor: tint ? 'rgba(42, 56, 72, 0.25)' : 'transparent',
        borderRadius: tint ? '4px' : '0',
        boxShadow: hovered ? 'inset 3px 0 0 #E8451A' : 'inset 3px 0 0 transparent',
        transition: 'box-shadow 200ms ease',
      }}
    >
      {children}
    </div>
  )
}


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
          <SectionLabel color="#CCFF00">Services</SectionLabel>
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
          {services.map((service, i) => (
              <ScrollReveal
                key={service.number}
                delay={i * 0.08}
              >
                <div
                  style={{
                    borderBottom: i < services.length - 1 ? '1px solid #1E181C' : 'none',
                  }}
                >
                <ServiceBlockWrapper tint={service.tint}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '64px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {/* Content side */}
                    <div
                      style={{
                        flex: '1',
                        minWidth: '280px',
                        order: i % 2 === 0 ? 0 : 1,
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
                        }}
                      >
                        {service.body}
                      </p>
                    </div>

                    {/* Image panel — gradient tile */}
                    <div
                      aria-hidden="true"
                      style={{
                        order: i % 2 === 0 ? 1 : 0,
                        flex: '0 0 auto',
                        width: 'clamp(240px, 38%, 400px)',
                        aspectRatio: '4/3',
                        borderRadius: '4px',
                        background: 'radial-gradient(ellipse at 40% 40%, #1E181C, #080507)',
                      }}
                    />
                  </div>
                </ServiceBlockWrapper>
                </div>
              </ScrollReveal>
          ))}
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
