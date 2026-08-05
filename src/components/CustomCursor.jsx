import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    let shown = false
    const move = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      // only touch the DOM once, not on every single mousemove
      if (!shown) {
        shown = true
        document.body.classList.add('cursor-active')
      }
    }
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) ring.classList.add('is-hover')
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) ring.classList.remove('is-hover')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      // the class hides the real pointer — leaving it behind on unmount would
      // strand the page with no visible cursor at all
      document.body.classList.remove('cursor-active')
      gsap.killTweensOf([dot, ring])
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
