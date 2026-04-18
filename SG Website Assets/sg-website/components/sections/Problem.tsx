'use client'

// Section 2 — Problem
// Background: dark (#080507) | Gradient: blaze-fade centred behind heading
// Card entrance: rotation (-2deg to 0deg) + y-translate + opacity — "cards laid on a table"

import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'

const painPoints = [
  {
    title: 'Forgettable Messaging',
    body: 'Your audience hears you. They just never remember you, because you sound like everyone else competing for the same attention in the same market.',
  },
  {
    title: 'Disconnected Content',
    body: 'You are producing content without a system connecting it. Activity without architecture generates noise, not momentum.',
  },
  {
    title: 'No Strategic Story',
    body: 'You have no single narrative that works across your sales deck, homepage, and investor pitch simultaneously. Each channel tells a slightly different story, which means no one fully believes any of them.',
  },
]

export default function Problem() {
  const shouldReduceMotion = useReducedMotion()

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 40, rotate: -2 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        delay: shouldReduceMotion ? 0 : i * 0.1,
      },
    }),
  }

  return (
    <section
      id="problem"
      style={{
        backgroundColor: '#080507',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blaze fade gradient behind heading */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '600px',
          height: '600px',
          background: 'var(--gradient-blaze-fade)',
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
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionLabel color="#E8451A">The Cost of a Weak Narrative</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(38px, 5.5vw, 60px)',
              color: '#F2EAE4',
              lineHeight: 1.05,
              maxWidth: '700px',
              margin: '0 auto 64px',
              textAlign: 'center',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Most companies have a product.
            <br />
            Very few have a story.
          </h2>
        </motion.div>

        {/* Pain-point cards with rotation entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {painPoints.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.08}>
              <div
                className="card-hover"
                style={{
                  backgroundColor: '#141012',
                  border: '1px solid #1E181C',
                  borderLeft: '2px solid #E8451A',
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: '28px',
                    color: '#F2EAE4',
                    marginBottom: '16px',
                    textWrap: 'balance',
                  } as React.CSSProperties}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '16px',
                    color: '#C4A08A',
                    lineHeight: 1.7,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
