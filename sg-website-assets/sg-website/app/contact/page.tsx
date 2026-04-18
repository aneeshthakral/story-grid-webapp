// /contact — Contact sub-page
// Wraps ContactForm section (controlled form + contact info + Calendly block)
// Dark hero + ContactForm + CTABanner

import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | StoryGrid & Co.',
  description:
    'Start a conversation with StoryGrid & Co. Tell us about your company, your goals, and the story you need to build.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        style={{
          backgroundColor: '#080507',
          padding: 'clamp(120px, 14vw, 180px) 0 clamp(64px, 8vw, 96px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-dual-temperature)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-infrared-wash)',
            opacity: 0.5,
            pointerEvents: 'none',
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
            <SectionLabel color="#E8451A">Get In Touch</SectionLabel>
            <h1
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(52px, 9vw, 96px)',
                color: '#F2EAE4',
                lineHeight: 1.0,
                marginBottom: '24px',
                marginTop: '16px',
              }}
            >
              Let&apos;s Build Something
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(17px, 2.2vw, 20px)',
                color: '#C4A08A',
                lineHeight: 1.65,
                maxWidth: '560px',
              }}
            >
              We take on a limited number of engagements at a time. Tell us about
              your company and we will respond within 48 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact form section */}
      <ContactForm />
    </>
  )
}
