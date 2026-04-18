'use client'

import { useEffect, useRef, useState } from 'react'

// CustomCursor — dot + lerp-following ring cursor
// Disabled entirely on touch devices (pointer: coarse)
// Dot: 6px, #F2EAE4, z-index 9999
// Ring: 28px (56px on hover over [data-interactive]), 2px solid #E8451A, z-index 9998
// Lerp factor: 0.15 — smooth ring follow
// Uses direct DOM style mutation in RAF loop (no setState) for performance
// Mounted guard prevents hydration mismatch

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const cursorX = useRef(0)
  const cursorY = useRef(0)
  const ringX = useRef(0)
  const ringY = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!mounted || isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.current = e.clientX
      cursorY.current = e.clientY

      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-interactive]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-interactive]')) {
        setIsHovering(false)
      }
    }

    const lerp = () => {
      ringX.current += (cursorX.current - ringX.current) * 0.15
      ringY.current += (cursorY.current - ringY.current) * 0.15

      if (ringRef.current) {
        const ringSize = isHovering ? 56 : 28
        const offset = ringSize / 2
        ringRef.current.style.transform = `translate(${ringX.current - offset}px, ${ringY.current - offset}px)`
      }

      rafId.current = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    rafId.current = requestAnimationFrame(lerp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [mounted, isTouch, isHovering])

  if (!mounted || isTouch) return null

  return (
    <>
      {/* Cursor dot — moves immediately with mouse */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#F2EAE4',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-100px, -100px)',
          willChange: 'transform',
        }}
      />
      {/* Ring — lerp-follows cursor */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '56px' : '28px',
          height: isHovering ? '56px' : '28px',
          borderRadius: '50%',
          border: '2px solid #E8451A',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-100px, -100px)',
          transition: 'width 200ms ease, height 200ms ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
