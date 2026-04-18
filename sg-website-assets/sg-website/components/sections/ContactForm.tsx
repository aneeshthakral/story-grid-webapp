'use client'

// ContactForm — controlled form with validation and success state
// 2-column layout: form left, contact info + Calendly right

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const BOOKING_URL = 'https://topmate.io/aneeshthakral/'

interface FormData {
  name: string
  company: string
  email: string
  role: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!data.message.trim()) errors.message = 'Tell us about your project'
  return errors
}

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    role: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    // Simulate submission — replace with actual API call before launch
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact-form"
      style={{
        backgroundColor: '#080507',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-blaze-fade)',
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
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '80px 0',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '2px solid #E8451A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 32px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12L9.5 16.5L19 7.5"
                    stroke="#E8451A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: 'var(--text-section)',
                  color: '#F2EAE4',
                  marginBottom: '16px',
                  lineHeight: 1.05,
                }}
              >
                Message Received
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '18px',
                  color: '#C4A08A',
                  lineHeight: 1.65,
                  marginBottom: '40px',
                }}
              >
                We review every submission and respond within 48 hours. If your project is
                time-sensitive, book a call directly below.
              </p>
              <Button variant="primary" href={BOOKING_URL}>
                Book a Strategy Call
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Two-column layout */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '80px',
                  alignItems: 'start',
                }}
              >
                {/* Left — Form */}
                <div>
                  <SectionLabel color="#E8451A">Send a Message</SectionLabel>
                  <h2
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: 'var(--text-section)',
                      color: '#F2EAE4',
                      lineHeight: 1.05,
                      marginBottom: '40px',
                    }}
                  >
                    Tell Us About Your Project
                  </h2>

                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="sg-label">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className={`sg-input${errors.name ? ' error' : ''}`}
                        />
                        {errors.name && (
                          <p className="sg-field-error" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="sg-label">
                          Work Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className={`sg-input${errors.email ? ' error' : ''}`}
                        />
                        {errors.email && (
                          <p className="sg-field-error" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Company + Role row */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                          gap: '16px',
                        }}
                      >
                        <div>
                          <label htmlFor="company" className="sg-label">
                            Company
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Corp"
                            className="sg-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="role" className="sg-label">
                            Your Role
                          </label>
                          <input
                            id="role"
                            name="role"
                            type="text"
                            autoComplete="organization-title"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Founder, CMO..."
                            className="sg-input"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="sg-label">
                          What Are You Building? *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your company, your goals, and what you feel is not working with your current narrative."
                          className={`sg-input${errors.message ? ' error' : ''}`}
                          style={{ resize: 'vertical', minHeight: '120px' }}
                        />
                        {errors.message && (
                          <p className="sg-field-error" role="alert">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        style={
                          submitting
                            ? { opacity: 0.6, pointerEvents: 'none', cursor: 'wait' }
                            : undefined
                        }
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Right — Contact info */}
                <div style={{ paddingTop: '60px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '48px',
                    }}
                  >
                    {/* Direct email */}
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-condensed)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#887060',
                          marginBottom: '8px',
                        }}
                      >
                        Direct Email
                      </p>
                      <a
                        href="mailto:hello@storygrid.co"
                        data-interactive
                        style={{
                          fontFamily: 'var(--font-family-display)',
                          fontSize: '24px',
                          color: '#E8451A',
                          textDecoration: 'none',
                          letterSpacing: '0.02em',
                          transition: 'opacity 200ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
                        }}
                      >
                        hello@storygrid.co
                      </a>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: '14px',
                          color: '#887060',
                          marginTop: '8px',
                          lineHeight: 1.5,
                        }}
                      >
                        We respond to all inquiries within 48 hours.
                      </p>
                    </div>

                    {/* Strategy call */}
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-condensed)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#887060',
                          marginBottom: '12px',
                        }}
                      >
                        Book a Strategy Call
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: '16px',
                          color: '#C4A08A',
                          lineHeight: 1.65,
                          marginBottom: '20px',
                        }}
                      >
                        A 30-minute conversation to understand your situation and determine
                        whether we are the right fit for each other.
                      </p>
                      <Button variant="ghost" href={BOOKING_URL}>
                        Book 30 Minutes
                      </Button>
                    </div>

                    {/* What to expect */}
                    <div
                      style={{
                        backgroundColor: '#141012',
                        border: '1px solid #1E181C',
                        padding: '24px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-family-condensed)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#887060',
                          marginBottom: '12px',
                        }}
                      >
                        What to Expect
                      </p>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        {[
                          'Response within 48 hours on business days',
                          'No pitch deck. A real conversation about your situation.',
                          'Honest assessment of fit before any proposal',
                          'Minimum 3-month engagement for retainer work',
                        ].map((item) => (
                          <li
                            key={item}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                            }}
                          >
                            <span
                              style={{
                                color: '#E8451A',
                                fontSize: '14px',
                                flexShrink: 0,
                                marginTop: '1px',
                              }}
                            >
                              &#x2192;
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-family-body)',
                                fontSize: '14px',
                                color: '#C4A08A',
                                lineHeight: 1.55,
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
