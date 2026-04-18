'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
}

export default function AnimatedCounter({ value, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionValue, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })

    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplay(Math.round(latest))
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}
