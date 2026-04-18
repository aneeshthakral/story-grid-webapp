'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 16,
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
