import { useState } from 'react'

/**
 * Tries the local client asset first, falls back to the verified web image,
 * and finally to a styled placeholder tile so the layout never breaks.
 *
 * If the image declares `webp`, a <picture> is emitted so modern browsers get
 * the small file and everything else falls through to `local`. The wrapper
 * uses display:contents so it creates no layout box — callers keep styling the
 * <img> exactly as before.
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

  const onLocal = stage === 'local'

  const image = (
    <img
      className={className}
      src={onLocal ? img.local : img.web}
      alt={img.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      draggable={false}
      onError={() => setStage(onLocal ? 'web' : 'fallback')}
    />
  )

  // only the local asset has a webp sibling; the remote fallback is already small
  if (onLocal && img.webp) {
    return (
      <picture className="smart-picture">
        <source srcSet={img.webp} type="image/webp" />
        {image}
      </picture>
    )
  }

  return image
}
