'use client'

// Section 4 — How We Work (CREAM / light break 1)
// Background: #F0E8E2 | Gradient: none | Grain: no
// Connector animation: CSS scaleX draw on scroll entry (replaces broken SVG % path)
// Step numbers: count-up (0 → N) on scroll entry with 0.2s stagger

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

const BOOKING_URL = 'https://topmate.io/aneeshthakral/'

const steps = [
  {
    number: '01',
    numericValue: 1,
    title: 'Discover',
    description:
      'We map your narrative landscape, audience psychology, and competitive positioning. We find exactly where your story is breaking.',
  },
  {
    number: '02',
    numericValue: 2,
    title: 'Architect',
    description:
      'We build the narrative framework: the core story and every layer that extends from it across channels and formats.',
  },
  {
    number: '03',
    numericValue: 3,
    title: 'Produce',
    description:
      'We create the content, systems, and assets that bring the narrative to life. Everything in your voice. Nothing from a template.',
  },
  {
    number: '04',
    numericValue: 4,
    title: 'Scale',
    description:
      'We operationalise the system so your team can run it. We stay in the room to evolve it as your company grows.',
  },
]

// Animated step number: counts 0 → target value on scroll entry
function StepNumber({
  target,
  delay,
  shouldReduceMotion,
}: {
  target: number
  delay: number
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayed(target)
      return
    }

    let raf: number
    const DURATION = 600 // ms for the count animation
    let startTime: number | null = null

    const startAfterDelay = setTimeout(() => {
      const tick = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / DURATION, 1)
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4)
        setDisplayed(Math.round(eased * target))
        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        }
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(startAfterDelay)
      cancelAnimationFrame(raf)
    }
  }, [isInView, target, delay, shouldReduceMotion])

  const formatted = String(displayed).padStart(2, '0')

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-family-display)',
        fontSize: '48px',
        color: '#E8451A',
        lineHeight: 1,
      }}
    >
      {formatted}
    </span>
  )
}

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      style={{
        backgroundColor: '#F0E8E2',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
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
          <SectionLabel color="#685040">The Process</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--text-section)',
              color: '#181012',
              lineHeight: 1.05,
              marginBottom: '12px',
              textAlign: 'left',
            }}
          >
            How We Work
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '18px',
              color: '#3A2820',
              lineHeight: 1.6,
              maxWidth: '500px',
              marginBottom: '72px',
            }}
          >
            Four steps from fog to framework to full execution.
          </p>
        </ScrollReveal>

        {/* Steps — desktop: horizontal grid with CSS connector; mobile: vertical stack */}
        <div style={{ position: 'relative' }}>
          {/* Desktop connector line — CSS scaleX draw animation, avoids SVG % path bug */}
          <motion.div
            aria-hidden="true"
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '24px',
              left: '7%',
              width: '86%',
              height: '1px',
              backgroundColor: 'rgba(232, 69, 26, 0.3)',
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView && !shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Steps grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Number — no circle wrapper, large display font */}
                  <div
                    style={{
                      marginBottom: '16px',
                      flexShrink: 0,
                    }}
                  >
                    <StepNumber
                      target={step.numericValue}
                      delay={i * 0.2}
                      shouldReduceMotion={shouldReduceMotion ?? false}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: '28px',
                      color: '#181012',
                      marginBottom: '12px',
                      lineHeight: 1.1,
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: '16px',
                      color: '#3A2820',
                      lineHeight: 1.75,
                      maxWidth: '220px',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA — Book a Strategy Call */}
        <ScrollReveal delay={0.2}>
          <div
            style={{
              marginTop: '64px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" href={BOOKING_URL}>
              Book a Strategy Call
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
