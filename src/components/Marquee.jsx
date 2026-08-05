/**
 * Infinite marquee strip. Content is rendered twice so the CSS keyframe
 * (translateX(-50%)) loops seamlessly.
 */
export default function Marquee({ items, className = '', separator = '✶' }) {
  const chunk = (keyPrefix) => (
    <div className="marquee-chunk" key={keyPrefix} aria-hidden={keyPrefix === 'b'}>
      {[...items, ...items].map((item, i) => (
        <span className="marquee-item" key={`${keyPrefix}-${i}`}>
          {item} <span className="marquee-sep">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {chunk('a')}
        {chunk('b')}
      </div>
    </div>
  )
}
