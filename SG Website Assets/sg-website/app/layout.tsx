import type { Metadata } from 'next'
import { Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google'
import '@/styles/globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import Navigation from '@/components/ui/Navigation'
import PageTransition from '@/components/ui/PageTransition'
import LenisProvider from '@/components/ui/LenisProvider'

// ─────────────────────────────────────────
// FONT CONFIGURATION
// next/font loads these from Google Fonts at build time — no external CDN at runtime.
// Bebas Neue: display font, weight 400 only (no other weights exist for this family).
// Barlow: body copy, weights 400 + 500 per brand spec (no 600+).
// Barlow Condensed: labels, tags, nav, buttons — uppercase tracked.
// ─────────────────────────────────────────

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

// ─────────────────────────────────────────
// SITE METADATA
// ─────────────────────────────────────────

export const metadata: Metadata = {
  title: 'StoryGrid & Co. | AI-First Narrative Strategy Agency',
  description:
    'StoryGrid & Co. builds the narrative infrastructure that makes growth-stage companies impossible to ignore. AI-augmented storytelling, content systems, and founder brand development.',
  keywords: [
    'narrative strategy',
    'brand storytelling',
    'content marketing',
    'AI marketing',
    'B2B content',
    'founder brand',
    'startup marketing',
    'growth stage marketing',
    'StoryGrid',
  ],
  authors: [{ name: 'Aneesh Thakral' }],
  creator: 'StoryGrid & Co.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://storygrid.co',
    siteName: 'StoryGrid & Co.',
    title: 'StoryGrid & Co. | AI-First Narrative Strategy Agency',
    description:
      'StoryGrid & Co. builds the narrative infrastructure that makes growth-stage companies impossible to ignore. AI-augmented storytelling, content systems, and founder brand development.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'StoryGrid & Co.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoryGrid & Co. | AI-First Narrative Strategy Agency',
    description:
      'StoryGrid & Co. builds the narrative infrastructure that makes growth-stage companies impossible to ignore.',
    creator: '@storygridco',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ─────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        {/* Lenis smooth scroll — client component, wraps entire page tree */}
        <LenisProvider>
          {/* Custom cursor — client component, disabled on touch devices (pointer: coarse) */}
          <CustomCursor />
          {/* Fixed navigation — present on all pages */}
          <Navigation />
          {/* Page transition wrapper — animates between routes */}
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
! source      
  ~/.zshrc.                                                                                                                                   