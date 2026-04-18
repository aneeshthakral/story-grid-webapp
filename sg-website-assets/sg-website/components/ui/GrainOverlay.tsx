// GrainOverlay — cinematic grain texture overlay
// Applied as an absolute-positioned element inside position:relative sections
// Used on: Hero (S1), CTABanner (S8) — these sections only
// Parent must have: className="relative overflow-hidden"

interface GrainOverlayProps {
  opacity?: number
}

export default function GrainOverlay({ opacity = 0.03 }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
