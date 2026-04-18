'use client'

// Navigation — fixed top nav with blur backdrop
// Active link: current path gets persistent 2px blaze underline
// Hover link: animated scaleX underline (left → full on enter, full → right on leave)
// Mobile: hamburger → full-screen overlay
// Right CTA: "Book a Call" Blaze button

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { scrollToSection } from '@/lib/scrollUtils'

const BOOKING_URL = 'https://topmate.io/aneeshthakral/'

const navLinks = [
  { label: 'Services', href: '/#services', isAnchor: true, anchorId: 'services' },
  { label: 'How We Work', href: '/#how-we-work', isAnchor: true, anchorId: 'how-we-work' },
  { label: 'Pricing', href: '/#pricing', isAnchor: true, anchorId: 'pricing' },
  { label: 'About', href: '/#about', isAnchor: true, anchorId: 'about' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isAnchor && link.anchorId) {
      e.preventDefault()
      setMobileOpen(false)
      if (pathname === '/') {
        scrollToSection(link.anchorId)
      } else {
        window.location.href = link.href
      }
    } else {
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(8,5,7,0.97)' : 'rgba(8,5,7,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid #1E181C' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Wordmark — SG Logo */}
          <Link
            href="/"
            data-interactive
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              opacity: 1,
              transition: 'opacity 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            <Image
              src="/images/logo/logo.png"
              alt="StoryGrid & Co"
              width={1170}
              height={540}
              priority
              className="h-11 w-auto"
              style={{ mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }}
            />
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <NavLink
                  key={link.label}
                  link={link}
                  active={active}
                  onClick={(e) => handleNavClick(link, e)}
                  shouldReduceMotion={shouldReduceMotion ?? false}
                />
              )
            })}
          </div>

          {/* Right CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Book a Call — hidden on small mobile */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="hidden-mobile"
              style={{
                fontFamily: 'var(--font-family-condensed)',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#E8451A',
                border: '1px solid #E8451A',
                padding: '10px 20px',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'background 200ms ease, color 200ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8451A'
                e.currentTarget.style.color = '#080507'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#E8451A'
              }}
            >
              Book a Call
            </a>

            {/* Hamburger — shown on mobile */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="show-mobile"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: '#F2EAE4',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'transform 250ms ease',
                  transformOrigin: 'center',
                  transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'opacity 250ms ease',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'transform 250ms ease',
                  transformOrigin: 'center',
                  transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#080507',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : i * 0.05, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(link, e)}
                  data-interactive
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-family-condensed)',
                    fontSize: '28px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: isActive(link.href) ? '#E8451A' : '#F2EAE4',
                    textDecoration: 'none',
                    padding: '12px 0',
                    transition: 'color 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Book a Call */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : navLinks.length * 0.05 + 0.05 }}
              style={{ marginTop: '24px' }}
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                style={{
                  fontFamily: 'var(--font-family-condensed)',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#E8451A',
                  border: '1px solid #E8451A',
                  padding: '14px 32px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content clears the fixed nav */}
      <div style={{ height: '72px' }} />
    </>
  )
}

// Individual nav link with animated underline
interface NavLinkProps {
  link: typeof navLinks[0]
  active: boolean
  onClick: (e: React.MouseEvent) => void
  shouldReduceMotion: boolean
}

function NavLink({ link, active, onClick, shouldReduceMotion }: NavLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={link.href}
      onClick={onClick}
      data-interactive
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-family-condensed)',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: active ? '#F2EAE4' : '#887060',
        textDecoration: 'none',
        paddingBottom: '4px',
        transition: 'color 200ms ease',
      }}
    >
      {link.label}

      {/* Active underline — persistent, not animated */}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            background: '#E8451A',
          }}
        />
      )}

      {/* Hover underline — scaleX animated, only when not active */}
      {!active && !shouldReduceMotion && (
        <motion.span
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            background: '#E8451A',
            scaleX: hovered ? 1 : 0,
            transformOrigin: hovered ? 'left' : 'right',
          }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </Link>
  )
}
