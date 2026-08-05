import { useState } from 'react'

/**
 * The circus's logo.
 *
 *   variant 'mark' — moon + big top only, for the navbar and tight spaces
 *   variant 'full' — the complete lockup including the ÁLOM CIRKUSZ wordmark
 *   tone    'light' — cream artwork with red stripes, for dark backgrounds
 *   tone    'original' — the gold-and-red artwork as supplied
 *
 * Falls back to the typographic wordmark if the image fails, so the brand is
 * never simply missing.
 */
const FILES = {
  'mark-light': 'logo-mark-light',
  'mark-original': 'logo-mark',
  'full-light': 'logo-light',
  'full-original': 'logo',
}

export default function Logo({ variant = 'mark', tone = 'light', className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`logo-fallback ${className}`}>
        <span aria-hidden="true">✶</span> Álom Cirkusz
      </span>
    )
  }

  const base = FILES[`${variant}-${tone}`] || FILES['mark-light']

  return (
    <picture className={`logo logo--${variant} logo--${tone} ${className}`}>
      <source srcSet={`/images/${base}.webp`} type="image/webp" />
      <img
        src={`/images/${base}.png`}
        alt="Álom Cirkusz"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </picture>
  )
}
