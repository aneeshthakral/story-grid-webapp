'use client'

import { useState, useEffect } from 'react'
import { detectCurrency, type Currency } from '@/lib/currency'

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCurrency(detectCurrency())
    setMounted(true)
  }, [])

  return { currency, setCurrency, mounted }
}
