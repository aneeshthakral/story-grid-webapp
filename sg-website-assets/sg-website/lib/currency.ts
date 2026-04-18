export type Currency = "INR" | "USD"

export interface TierPricing {
  INR: number
  USD: number
}

export function detectCurrency(): Currency {
  if (typeof window === "undefined") return "USD"

  const lang = navigator.language
  if (lang.endsWith("-IN") || lang.startsWith("hi")) return "INR"

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR"
  } catch {}

  return "USD"
}

export function formatPrice(tier: TierPricing, currency: Currency): string {
  const value = tier[currency]
  if (currency === "INR") {
    return "₹" + value.toLocaleString("en-IN")
  }
  return "$" + value.toLocaleString("en-US")
}
