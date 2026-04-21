export type Currency = "INR" | "USD" | "EUR"

export interface TierPricing {
  INR: number
  USD: number
  EUR: number
}

const EUR_TIMEZONES = new Set([
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Amsterdam",
  "Europe/Brussels",
  "Europe/Vienna",
  "Europe/Stockholm",
  "Europe/Zurich",
  "Europe/Dublin",
  "Europe/Lisbon",
])

export function detectCurrency(): Currency {
  if (typeof window === "undefined") return "USD"

  const lang = navigator.language
  if (lang.endsWith("-IN") || lang.startsWith("hi")) return "INR"

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR"
    if (EUR_TIMEZONES.has(tz)) return "EUR"
  } catch {}

  return "USD"
}

export function formatPrice(tier: TierPricing, currency: Currency): string {
  const value = tier[currency]
  if (currency === "INR") {
    return "₹" + value.toLocaleString("en-IN")
  }
  if (currency === "EUR") {
    return "€" + value.toLocaleString("de-DE")
  }
  return "$" + value.toLocaleString("en-US")
}
