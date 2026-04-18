// SectionLabel — eyebrow text appearing above section headings
// Barlow Condensed, 12px, uppercase, tracked
// Color prop is dynamic — use inline style

interface SectionLabelProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function SectionLabel({
  children,
  color = '#E8451A',
  className = '',
}: SectionLabelProps) {
  return (
    <p
      className={className}
      style={{
        fontFamily: 'var(--font-family-condensed)',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color,
        marginBottom: '16px',
        display: 'block',
      }}
    >
      {children}
    </p>
  )
}
