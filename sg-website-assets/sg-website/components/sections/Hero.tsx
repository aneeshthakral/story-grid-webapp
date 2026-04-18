'use client'

// Section 1 — Hero
// Background: dark | Gradients: dual-temperature (base) + infrared-wash (overlay)
// Image: hero-network.png at 12% opacity behind all layers
// Canvas: lightweight particle mesh (30 nodes, blaze colour, prefers-reduced-motion aware)
// Grain: unified body grain (body::before in globals.css)
// Animations: character stagger on headline, GSAP background parallax, Framer Motion scroll fade

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import HeroAmbient from '@/components/ui/HeroAmbient'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://topmate.io/aneeshthakral/'

const HEADLINE = 'We set the narrative right.'

// Split headline into characters for stagger animation
function AnimatedHeadline({
  text,
  shouldReduceMotion,
}: {
  text: string
  shouldReduceMotion: boolean
}) {
  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-display)',
    fontSize: 'var(--text-hero)',
    color: '#F2EAE4',
    lineHeight: 1.0,
    marginBottom: '24px',
    marginTop: '16px',
    textAlign: 'center',
    textWrap: 'balance',
  }

  if (shouldReduceMotion) {
    return <h1 style={headlineStyle}>{text}</h1>
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.1,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  }

  // Split into words; each word is a non-breaking inline-block so line breaks only happen at spaces
  const words = text.split(' ')

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
      style={{ ...headlineStyle, display: 'block' }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span variants={charVariants} style={{ display: 'inline-block' }}>
              {'\u00A0'}
            </motion.span>
          )}
        </span>
      ))}
    </motion.h1>
  )
}

// Magnetic button wrapper — desktop only (pointer:fine)
function MagneticButton({
  children,
  shouldReduceMotion,
}: {
  children: React.ReactNode
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointerFine, setIsPointerFine] = useState(false)
  const x = useSpring(position.x, { stiffness: 300, damping: 20 })
  const y = useSpring(position.y, { stiffness: 300, damping: 20 })

  useEffect(() => {
    setIsPointerFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isPointerFine || shouldReduceMotion) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 80) {
      setPosition({ x: dx * 0.18, y: dy * 0.18 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Framer Motion scroll-based opacity fade
  const { scrollY } = useScroll()
  const headlineY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -240])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, shouldReduceMotion ? 1 : 0.3])

  // GSAP background parallax
  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (sectionRef.current) {
          gsap.set(sectionRef.current, { yPercent: -15 * self.progress })
        }
      },
    })
    return () => trigger.kill()
  }, [shouldReduceMotion])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) setScrolled(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeIn = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay } }

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--gradient-dual-temperature)',
        opacity: heroOpacity,
      }}
    >
      {/* Ambient background layers */}
      <HeroAmbient />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '820px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          y: headlineY,
        }}
      >
        {/* Section label */}
        <motion.div {...fadeIn(0)}>
          <SectionLabel color="#E8451A" className="inline-block">
            AI-First Narrative Strategy
          </SectionLabel>
        </motion.div>

        {/* Headline — character stagger */}
        <AnimatedHeadline text={HEADLINE} shouldReduceMotion={shouldReduceMotion ?? false} />

        {/* Subheadline — max 18 words */}
        <motion.p
          {...fadeIn(shouldReduceMotion ? 0 : 0.2)}
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'clamp(15px, 2.2vw, 17px)',
            fontWeight: 400,
            color: '#C4A08A',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 40px',
            textAlign: 'center',
          }}
        >
          We build the narrative infrastructure that makes growth-stage companies impossible to ignore.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeIn(shouldReduceMotion ? 0 : 0.35)}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton shouldReduceMotion={shouldReduceMotion ?? false}>
            <Button variant="primary" size="lg" href="/#how-we-work">
              See How We Work
            </Button>
          </MagneticButton>
          <MagneticButton shouldReduceMotion={shouldReduceMotion ?? false}>
            <Button variant="ghost" size="lg" href={BOOKING_URL}>
              Book a Call
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-family-condensed)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#887060',
          }}
        >
          Scroll
        </p>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#887060"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.section>
  )
}
