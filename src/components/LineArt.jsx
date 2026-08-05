import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Flag positions sampled along the bunting string curve
const FLAGS = [
  [75, 26],
  [150, 32],
  [225, 30],
  [300, 20],
  [375, 11],
  [450, 9],
  [525, 14],
]

/** A garland of pennant flags that draws itself in as the section enters. */
export function BuntingDoodle({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.doodle-stroke', {
        drawSVG: '0%',
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 92%',
          end: 'top 45%',
          scrub: 1,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={ref}
      className={`doodle ${className}`}
      viewBox="0 0 600 72"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="doodle-stroke bunting-string" d="M0,12 Q150,48 300,20 Q450,-4 600,26" />
      {FLAGS.map(([x, y], i) => (
        <path
          key={i}
          className={`doodle-stroke bunting-flag${i % 2 ? ' is-gold' : ''}`}
          d={`M${x - 9},${y} L${x},${y + 17} L${x + 9},${y} Z`}
        />
      ))}
    </svg>
  )
}

/** A seated trapeze artist who draws herself in, then swings gently. */
export function TrapezeDoodle({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { rotation: -5.5, transformOrigin: '50% 0%' })
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        })
        .from('.doodle-stroke', {
          drawSVG: '0%',
          duration: 1.5,
          stagger: 0.11,
          ease: 'power2.inOut',
        })
        .to(
          ref.current,
          {
            rotation: 5.5,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            yoyoEase: true,
            repeat: -1,
          },
          '>-0.4'
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={ref}
      className={`doodle ${className}`}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
    >
      <path className="doodle-stroke trapeze-rig" d="M38,0 L37,76" />
      <path className="doodle-stroke trapeze-rig" d="M82,0 L83,76" />
      <path className="doodle-stroke trapeze-rig" d="M30,78 L90,78" />
      <circle className="doodle-stroke trapeze-artist" cx="60" cy="48" r="7.5" />
      <path className="doodle-stroke trapeze-artist" d="M60,56 L60,78" />
      <path className="doodle-stroke trapeze-artist" d="M60,60 L39,70" />
      <path className="doodle-stroke trapeze-artist" d="M60,60 L81,70" />
      <path className="doodle-stroke trapeze-artist" d="M60,78 Q50,92 54,108" />
      <path className="doodle-stroke trapeze-artist" d="M60,78 Q68,94 64,110" />
    </svg>
  )
}

/** A little asterisk-spark that draws itself when an FAQ answer opens. */
export function FaqFlourish() {
  const ref = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.doodle-stroke', {
        drawSVG: '0%',
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.15,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={ref} className="doodle faq-flourish" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path className="doodle-stroke" d="M20,5 L20,35" />
      <path className="doodle-stroke" d="M5,20 L35,20" />
      <path className="doodle-stroke" d="M10,10 L30,30" />
      <path className="doodle-stroke" d="M30,10 L10,30" />
      <circle className="doodle-stroke" cx="20" cy="20" r="4" />
    </svg>
  )
}
