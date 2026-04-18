/**
 * scrollUtils — smooth anchor scroll with fixed nav offset
 * NAV_HEIGHT: 80px accounts for the fixed navigation bar
 */

const NAV_HEIGHT = 80

export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
