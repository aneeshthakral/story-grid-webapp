'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function generateDots() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    duration: 15 + Math.random() * 10,
  }))
}

export default function HeroAmbient() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const dotsRef = useRef(generateDots())

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. Base radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(232, 93, 26, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* 2. Pulsing glow */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 45%, rgba(232, 93, 26, 0.12) 0%, transparent 45%)',
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* 3. Drifting dots — client-only to avoid hydration mismatch from Math.random() */}
      {mounted && !shouldReduceMotion &&
        dotsRef.current.map((dot) => (
          <motion.div
            key={dot.id}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(232, 69, 26, 0.3)',
              left: `${dot.x1}%`,
              top: `${dot.y1}%`,
            }}
            animate={{
              x: [0, (dot.x2 - dot.x1) * 2, 0],
              y: [0, (dot.y2 - dot.y1) * 2, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: dot.id * 2,
            }}
          />
        ))}

      {/* 4. Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(15, 11, 9, 0.5) 100%)',
        }}
      />
    </div>
  )
}
