import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

// Rope sags 12 viewBox units at the middle (M0,50 Q500,62 1000,50):
// y(t) = 50 + 24·t·(1−t), and the stage is 64px tall so units are true px.
const sagAt = (t) => 24 * t * (1 - t)
const PAD = 34 // rope anchor breathing room at each edge

export default function TightropeProgress({ loaded }) {
  const root = useRef(null)
  const walkerRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!loaded || reduced) return
    const walker = walkerRef.current

    // lean into the scroll: Lenis velocity becomes a wobble
    const leanTo = gsap.quickTo(walker, 'rotation', { duration: 0.5, ease: 'power2' })
    const tick = () => {
      const v = window.lenis?.velocity || 0
      leanTo(gsap.utils.clamp(-16, 16, v * 0.45))
    }

    const ctx = gsap.context(() => {
      gsap.set(walker, { x: PAD - 24, transformOrigin: '50% 100%' })

      // The rope carries vector-effect: non-scaling-stroke (its SVG uses
      // preserveAspectRatio="none", so without it the stroke would stretch).
      // DrawSVG cannot measure such a path — it warned and silently did
      // nothing. Wipe the rope in with a scale instead, and keep DrawSVG for
      // the walker, whose SVG scales proportionally.
      gsap.from('.rope-svg', {
        scaleX: 0,
        transformOrigin: '0% 50%',
        duration: 1.1,
        ease: 'power2.inOut',
        delay: 0.9,
      })
      gsap.from('.walker-draw', {
        drawSVG: '0%',
        duration: 1.1,
        stagger: 0.07,
        ease: 'power2.inOut',
        delay: 1.1,
      })
      gsap.from(root.current, { opacity: 0, duration: 0.8, delay: 0.7 })

      const xTo = gsap.quickTo(walker, 'x', { duration: 0.3, ease: 'power2' })
      const yTo = gsap.quickTo(walker, 'y', { duration: 0.3, ease: 'power2' })

      // walk the whole page: progress → position along the sagging rope
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const t = self.progress
          xTo(PAD + t * (window.innerWidth - PAD * 2) - 24)
          yTo(sagAt(t))
        },
      })

    }, root)

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ctx.revert()
    }
  }, [loaded, reduced])

  return (
    <div className="rope-stage" ref={root} aria-hidden="true">
      <svg
        className="rope-svg"
        viewBox="0 0 1000 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="rope-line"
          d="M0,50 Q500,62 1000,50"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="rope-walker" ref={walkerRef}>
        <svg viewBox="0 0 48 48" fill="none">
          <path className="walker-draw walker-pole" d="M2,26 Q24,33 46,26" />
          <path className="walker-draw walker-line" d="M24,25 L13,28" />
          <path className="walker-draw walker-line" d="M24,25 L35,28" />
          <path className="walker-draw walker-line" d="M24,25 L24,36" />
          <circle className="walker-draw walker-line" cx="24" cy="18" r="5" />
          <path className="walker-draw walker-line" d="M24,36 L20,46" />
          <path className="walker-draw walker-line" d="M24,36 L29,45" />
        </svg>
      </div>
    </div>
  )
}
