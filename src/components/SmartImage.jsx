import { useState } from 'react'

/**
 * Tries the local client asset first, falls back to the verified web image,
 * and finally to a styled placeholder tile so the layout never breaks.
 */
export default function SmartImage({ img, className = '', eager = false }) {
  const [stage, setStage] = useState('local') // local -> web -> fallback

  if (stage === 'fallback') {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={img.alt}>
        <span className="img-fallback-star">✶</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={stage === 'local' ? img.local : img.web}
      alt={img.alt}
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      onError={() => setStage(stage === 'local' ? 'web' : 'fallback')}
    />
  )
}
