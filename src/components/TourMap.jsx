import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { VIEWBOX, BORDER, COUNTIES, BALATON, CITIES, LANDMARKS, ROUTE } from '../data/hungary'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(MotionPathPlugin)

/** A tiny big-top that rides the tour route. */
function Caravan() {
  return (
    <g className="map-caravan">
      <ellipse className="map-caravan-shadow" cx="0" cy="13" rx="15" ry="4" />
      <path className="map-caravan-tent" d="M-13,10 L-9,-6 L0,-13 L9,-6 L13,10 Z" />
      <path className="map-caravan-stripe" d="M-4.5,10 L-2.5,-9.5 L0,-13 L2.5,-9.5 L4.5,10 Z" />
      <path className="map-caravan-pole" d="M0,-13 L0,-20" />
      <path className="map-caravan-flag" d="M0,-20 L9,-17 L0,-14 Z" />
    </g>
  )
}

export default function TourMap() {
  const root = useRef(null)
  const stack = useRef(null)
  const routeRef = useRef(null)
  const caravanRef = useRef(null)
  const { t } = useTranslation()
  const rows = t('tour.rows', { returnObjects: true })
  const [active, setActive] = useState(null)
  const reduced = useReducedMotion()

  // ---- hovering rakes the map into a side view ----
  // Flat while you read it; on hover it tips back like a diorama on a table,
  // so the route and the pins visibly float above the land plane. Pointer
  // movement then steers the yaw within that raked pose.
  useEffect(() => {
    const el = root.current
    const plane = stack.current
    if (!el || !plane || reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    // must match --rake in the stylesheet: the pins counter-rotate by this
    // exact angle to stay readable, so the two cannot drift apart
    const RAKE = 46
    const pose = { lean: 0 } // 0 = flat, 1 = fully raked
    const aim = { x: 0, y: 0 }

    const render = () => {
      gsap.set(plane, {
        rotationX: pose.lean * RAKE,
        rotationY: aim.x * (7 + pose.lean * 7),
        // pull it back so the raked slab still fits the frame
        scale: 1 - pose.lean * 0.1,
        y: pose.lean * 6,
      })
      el.style.setProperty('--lean', pose.lean.toFixed(3))
    }

    const leanTo = (v) =>
      gsap.to(pose, { lean: v, duration: 0.9, ease: 'power3.out', onUpdate: render, overwrite: true })

    const move = (e) => {
      const b = el.getBoundingClientRect()
      aim.x = (e.clientX - b.left) / b.width - 0.5
      aim.y = (e.clientY - b.top) / b.height - 0.5
      render()
    }

    const enter = () => leanTo(1)
    const leave = () => {
      aim.x = 0
      aim.y = 0
      leanTo(0)
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      gsap.killTweensOf(pose)
      gsap.set(plane, { clearProps: 'transform' })
    }
  }, [reduced])

  useGSAP(
    () => {
      const route = routeRef.current
      const caravan = caravanRef.current
      const border = root.current.querySelector('.map-border')
      if (!route || !border) return

      if (reduced) {
        gsap.set(route, { strokeDasharray: '7 7', strokeDashoffset: 0, opacity: 0.9 })
        gsap.set('.pin, .map-landmark, .map-county, .map-balaton', { opacity: 1 })
        gsap.set(caravan, { opacity: 0 })
        return
      }

      const bLen = border.getTotalLength()
      const rLen = route.getTotalLength()

      gsap.set(border, { strokeDasharray: bLen, strokeDashoffset: bLen })
      gsap.set(route, { strokeDasharray: rLen, strokeDashoffset: rLen })
      gsap.set('.map-county, .map-balaton, .pin, .map-landmark', { opacity: 0 })
      gsap.set(caravan, { opacity: 0 })

      // border draws itself → counties wash in → route unrolls → stops pop
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 78%', once: true } })
        .to(border, { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' })
        .to('.map-county', { opacity: 1, duration: 0.9, stagger: 0.035 }, '-=1.2')
        .to('.map-balaton', { opacity: 1, duration: 0.7 }, '<')
        .to('.map-landmark', { opacity: 1, duration: 0.5 }, '<')
        .to(route, { strokeDashoffset: 0, duration: 1.9, ease: 'power1.inOut' }, '-=0.5')
        .to('.pin', { opacity: 1, duration: 0.55, stagger: 0.16, ease: 'back.out(2.4)' }, '-=1.5')
        .set(route, { strokeDasharray: '7 7', strokeDashoffset: 0 })
        .to(route, { strokeDashoffset: -28, duration: 1.4, ease: 'none', repeat: -1 })
        .add(() => {
          gsap.set(caravan, { opacity: 1 })
          gsap.to(caravan, {
            motionPath: { path: route, align: route, alignOrigin: [0.5, 0.85] },
            duration: 15,
            ease: 'none',
            repeat: -1,
            repeatDelay: 1.4,
          })
          gsap.to('.map-caravan', {
            rotation: 4,
            transformOrigin: '50% 90%',
            duration: 0.75,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }, '<')
    },
    { scope: root, dependencies: [reduced, rows.length] }
  )

  const layerProps = { viewBox: VIEWBOX, xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' }

  return (
    <div className={`tourmap ${active !== null ? 'is-focused' : ''}`} ref={root}>
      <div className="tourmap-stack" ref={stack}>
        {/* — depth 0: the land itself — */}
        <svg className="tourmap-layer tourmap-layer--land" {...layerProps}>
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stopColor="rgba(217,38,50,0.20)" />
              <stop offset="100%" stopColor="rgba(217,38,50,0)" />
            </radialGradient>
            <pattern id="mapWeave" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="rgba(247,238,218,0.10)" />
            </pattern>
            <filter id="mapSoft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <path className="map-wash" d={BORDER} fill="url(#mapGlow)" filter="url(#mapSoft)" />
          {/* slab edge: offset copies that only show once the map rakes back */}
          {[7, 5, 3].map((dy) => (
            <path className="map-edge" d={BORDER} transform={`translate(0 ${dy})`} key={dy} />
          ))}
          <path className="map-fill" d={BORDER} />
          <path className="map-weave" d={BORDER} fill="url(#mapWeave)" />

          <g className="map-counties">
            {COUNTIES.map((d, i) => (
              <path className="map-county" d={d} key={i} />
            ))}
          </g>

          <path className="map-balaton" d={BALATON} />
          <path className="map-border" d={BORDER} />

          {/* compass rose — placed in verified-empty space off the south-west coast */}
          <g className="map-compass" transform="translate(64, 556)">
            <circle className="map-compass-ring" r="26" />
            <path className="map-compass-star" d="M0,-24 L5,-5 L24,0 L5,5 L0,24 L-5,5 L-24,0 L-5,-5 Z" />
            <text className="map-compass-n" y="-31" textAnchor="middle">
              É
            </text>
          </g>
        </svg>

        {/* — depth 1: the route the caravan travels — */}
        <svg className="tourmap-layer tourmap-layer--route" {...layerProps}>
          <path className="map-route" d={ROUTE} ref={routeRef} />
          <g ref={caravanRef}>
            <Caravan />
          </g>
        </svg>

        {/* — depth 2: ground marks that stay welded to the land plane — */}
        <svg className="tourmap-layer tourmap-layer--marks" {...layerProps}>
          {CITIES.map((c) => (
            <g key={c.key}>
              {/* the pin's cast shadow — only shows once the map rakes back */}
              <ellipse className="map-city-cast" cx={c.x} cy={c.y} rx="13" ry="4.5" />
              <circle className="map-city-pulse" cx={c.x} cy={c.y} r="10" />
              <circle className="map-city-foot" cx={c.x} cy={c.y} r="3.2" />
            </g>
          ))}
          {LANDMARKS.map((l) => (
            <g className="map-landmark" key={l.key}>
              <circle className="map-landmark-dot" cx={l.x} cy={l.y} r="3.4" />
              <text className="map-landmark-name" x={l.x + 9} y={l.y + 4}>
                {l.name}
              </text>
            </g>
          ))}
        </svg>

        {/* — depth 3: pins as real HTML so they can stand on stems and
              billboard back toward the viewer instead of being squashed — */}
        <div className="tourmap-pins" role="list" aria-label={t('contact.mapAria')}>
          {CITIES.map((c, i) => {
            const row = rows[i]
            if (!row) return null
            const on = active === i
            return (
              <button
                type="button"
                role="listitem"
                className={`pin ${on ? 'is-active' : ''} pin--${c.anchor}`}
                key={c.key}
                style={{ left: `${(c.x / 1000) * 100}%`, top: `${(c.y / 620) * 100}%` }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${row.city} — ${row.dates}`}
              >
                {/* head and label live INSIDE the stem, so they always sit on
                    its tip no matter how far the map is raked */}
                <span className="pin-stem" aria-hidden="true">
                  <span className="pin-head" />
                  <span className="pin-card" aria-hidden="true">
                    <span className="pin-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pin-city">{row.city}</span>
                    <span className="pin-dates">{row.dates}</span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* detail card for the hovered / focused stop */}
      <div className={`tourmap-card ${active !== null ? 'is-on' : ''}`} aria-live="polite">
        {active !== null && rows[active] && (
          <>
            <p className="tmc-city">{rows[active].city}</p>
            <p className="tmc-venue">{rows[active].venue}</p>
            <p className="tmc-dates">{rows[active].dates}</p>
            {rows[active].times && <p className="tmc-times">{rows[active].times}</p>}
          </>
        )}
      </div>
    </div>
  )
}
