'use client'

// ScrollProgress — thin 2px blaze line at top of viewport tracking scroll depth
// Only visible after first 5% of scroll
// Homepage only — do not add to sub-pages

import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: '#E8451A',
        scaleX,
        opacity,
        transformOrigin: 'left',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  )
}
