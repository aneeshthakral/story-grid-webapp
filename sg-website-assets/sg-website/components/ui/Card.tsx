'use client'

// Card — reusable surface container
// Dark variant: bg #141012, hover to #1E181C
// Light variant: bg #FFFFFF, hover to #F0E8E2
// activeIndicator: 2px left blaze border (used on Problem section pain-point cards)

interface CardProps {
  variant?: 'dark' | 'light'
  children: React.ReactNode
  className?: string
  activeIndicator?: boolean
  style?: React.CSSProperties
}

export default function Card({
  variant = 'dark',
  children,
  className = '',
  activeIndicator = false,
  style,
}: CardProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={`card-surface card-${variant}${activeIndicator ? ' card-active' : ''} ${className}`}
      style={{
        background: isDark ? '#141012' : '#FFFFFF',
        border: isDark ? '1px solid #1E181C' : '1px solid #D0C4B8',
        borderLeft: activeIndicator ? '2px solid #E8451A' : undefined,
        padding: '32px',
        transition: 'background 200ms ease, border-color 200ms ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.background = isDark ? '#1E181C' : '#F0E8E2'
        el.style.borderColor = isDark ? '#3A2820' : '#C4A08A'
        if (activeIndicator) el.style.borderLeftColor = '#E8451A'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = isDark ? '#141012' : '#FFFFFF'
        el.style.borderColor = isDark ? '#1E181C' : '#D0C4B8'
      }}
    >
      {children}
    </div>
  )
}
