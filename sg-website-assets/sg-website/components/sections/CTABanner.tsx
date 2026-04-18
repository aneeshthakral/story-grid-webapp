'use client'

// Section 8 — CTA Banner
// Background: dark | Gradients: dual-temperature + infrared-wash | Grain: yes
// Full-bleed, scale entrance animation on scroll

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTABanner() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-dual-temperature)',
        padding: 'clamp(80px, 12vw, 128px) 0',
      }}
    >
      {/* Infrared wash overlay at 60% */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-infrared-wash)',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(44px, 8vw, 80px)',
            color: '#F2EAE4',
            lineHeight: 1.0,
            marginBottom: '24px',
            textAlign: 'center',
            textWrap: 'balance',
          } as React.CSSProperties}
        >
          Ready to Build Your Narrative?
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'clamp(17px, 2.2vw, 20px)',
            color: '#C4A08A',
            lineHeight: 1.65,
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Most companies are one clear story away from changing how their market
          sees them.
        </p>

        <Button variant="primary" size="lg" href="https://topmate.io/aneeshthakral/">
          Start the Conversation
        </Button>
      </motion.div>
    </section>
  )
}
