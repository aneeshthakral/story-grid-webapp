'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

// Button — primary interactive element
// variant='solid': permanently filled blaze (used on Narrative Engine pricing card CTA)
// Renders as <Link> when href is provided, otherwise <button>
// data-interactive triggers custom cursor ring expansion

type ButtonVariant = 'primary' | 'ghost' | 'ai' | 'solid'
type ButtonSize = 'default' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  style?: React.CSSProperties
}

const variantBase: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    color: '#E8451A',
    border: '1px solid #E8451A',
    background: 'transparent',
  },
  ghost: {
    color: '#F2EAE4',
    border: '1px solid #1E181C',
    background: 'transparent',
  },
  ai: {
    color: '#CCFF00',
    border: '1px solid #CCFF00',
    background: 'transparent',
  },
  solid: {
    color: '#080507',
    background: '#E8451A',
    border: '1px solid #E8451A',
  },
}

const variantHover: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: '#E8451A', color: '#080507' },
  ghost: { background: '#1E181C', color: '#F2EAE4' },
  ai: { background: '#CCFF00', color: '#080507' },
  solid: { background: '#FF5C2B', color: '#080507' },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  default: { padding: '14px 28px', fontSize: '14px' },
  lg: { padding: '16px 40px', fontSize: '18px' },
}

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  style: styleProp,
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  const baseStyle: React.CSSProperties = {
    ...variantBase[variant],
    ...sizeStyles[size],
    ...styleProp,
    fontFamily: 'var(--font-family-condensed)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderRadius: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease',
    textDecoration: 'none',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 } }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const el = e.currentTarget
    const hover = variantHover[variant]
    if (hover.background) el.style.background = hover.background as string
    if (hover.color) el.style.color = hover.color as string
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const base = variantBase[variant]
    el.style.background = (base.background as string) ?? 'transparent'
    el.style.color = base.color as string
  }

  const resolvedClassName = `${variant === 'solid' ? 'btn-ember ' : ''}${className}`

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <motion.a
        href={href}
        target={isExternal && !href.startsWith('mailto:') ? '_blank' : undefined}
        rel={isExternal && !href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
        style={baseStyle}
        className={resolvedClassName}
        data-interactive
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      style={baseStyle}
      className={resolvedClassName}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-interactive
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
