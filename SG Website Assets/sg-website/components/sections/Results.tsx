// Section 5 — Results
// Background: dark (#080507) | Gradient: infrared-wash

import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Tag from '@/components/ui/Tag'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

const stats = [
  {
    value: 5,
    prefix: '$',
    suffix: 'M+',
    label: 'in closed enterprise deals attributed to narrative-led positioning',
  },
  {
    value: 8,
    prefix: '',
    suffix: '+',
    label: 'years building B2B narratives in competitive markets',
  },
  {
    value: 3,
    prefix: '',
    suffix: 'x',
    label: 'average content engagement lift for narrative-led brands',
  },
]

export default function Results() {
  return (
    <section
      id="results"
      style={{
        backgroundColor: '#080507',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Infrared wash overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-infrared-wash)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <ScrollReveal>
          <SectionLabel color="#E8451A">Results</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--text-section)',
              color: '#F2EAE4',
              lineHeight: 1.05,
              marginBottom: '64px',
              textAlign: 'left',
            }}
          >
            Numbers That Mean Something
          </h2>
        </ScrollReveal>

        {/* Stat callouts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(44px, 6.8vw, 68px)',
                    color: '#F2EAE4',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}
                >
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '15px',
                    color: '#C4A08A',
                    lineHeight: 1.6,
                    maxWidth: '180px',
                    margin: '0 auto',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Credibility line */}
        <ScrollReveal delay={0.15}>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '18px',
              color: '#C4A08A',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 40px',
              textAlign: 'center',
            }}
          >
            StoryGrid & Co. was built by a practitioner, not a theorist. Every framework
            here has been tested inside real sales rooms and real campaigns.
          </p>
        </ScrollReveal>

        {/* Founder badge + CTA */}
        <ScrollReveal delay={0.2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '64px',
            }}
          >
            <Tag variant="founder">Aneesh Thakral, Founder</Tag>
            <Button variant="primary" href="#pricing">
              Start Building
            </Button>
          </div>
        </ScrollReveal>

        {/* Case studies card */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              backgroundColor: '#080507',
              border: '1px solid rgba(232, 69, 26, 0.2)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '768px',
              margin: '0 auto',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                color: '#F2EAE4',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Case Studies Publishing Monthly
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: '16px',
                color: '#C4A08A',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              StoryGrid &amp; Co. launched in 2026. Rather than filling this space
              with fabricated testimonials, we&apos;re publishing real client case studies
              as engagements complete. First case study drops in Month 2.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: '15px',
                color: '#887060',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              Want to see the methodology in action before then? Book a
              30-minute Narrative Audit.
            </p>
            <Button variant="primary" href="https://topmate.io/aneeshthakral/">
              Book a Call
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
