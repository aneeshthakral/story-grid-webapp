'use client'

// LenisProvider — smooth scroll initialisation
// Loaded as a client component inside the server layout so metadata can still export.
// duration 1.2 with expo-ease as specified.

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const handle = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(handle)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
