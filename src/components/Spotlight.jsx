import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmartImage from './SmartImage'
import { IMAGES } from '../data/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const finePointer = () => window.matchMedia('(pointer: fine)').matches

// backstage shots hiding in the dark (aerial, mystery figure, fire glow)
const SHOTS = [IMAGES.acts[0], IMAGES.acts[4], IMAGES.acts[1]]

export default function Spotlight() {
  const root = useRef(null)
  const { t } = useTranslation()
  const captions = t('night.captions', { returnObjects: true })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = root.current
    const radius = () => Math.max(150, Math.min(window.innerWidth * 0.17, 260))

    if (reduced) {
      // lights simply on — everything softly revealed, nothing moves
      el.style.setProperty('--spot-r', '60vmax')
      el.style.setProperty('--spot-x', '50%')
      el.style.setProperty('--spot-y', '45%')
      return
    }

    const pos = { x: 0.5, y: 0.45, r: 0 }
    const apply = () => {
      el.style.setProperty('--spot-x', `${(pos.x * 100).toFixed(2)}%`)
      el.style.setProperty('--spot-y', `${(pos.y * 100).toFixed(2)}%`)
      el.style.setProperty('--spot-r', `${pos.r.toFixed(1)}px`)
    }
    apply()

    let listeners = null
    const ctx = gsap.context(() => {
      if (finePointer()) {
        const xTo = gsap.quickTo(pos, 'x', { duration: 0.5, ease: 'power3', onUpdate: apply })
        const yTo = gsap.quickTo(pos, 'y', { duration: 0.5, ease: 'power3', onUpdate: apply })
        const move = (e) => {
          const b = el.getBoundingClientRect()
          xTo((e.clientX - b.left) / b.width)
          yTo((e.clientY - b.top) / b.height)
        }
        const enter = () =>
          gsap.to(pos, { r: radius(), duration: 0.7, ease: 'power3.out', onUpdate: apply, overwrite: 'auto' })
        const leave = () =>
          gsap.to(pos, { r: 0, duration: 0.6, ease: 'power3.in', onUpdate: apply, overwrite: 'auto' })
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        listeners = { move, enter, leave }
        return
      }

      // touch devices: the searchlight sweeps on its own while on screen
      gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: { duration: 3.2, ease: 'sine.inOut', onUpdate: apply },
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play pause resume pause',
          },
        })
        .to(pos, { x: 0.22, y: 0.3, r: radius() })
        .to(pos, { x: 0.72, y: 0.62 })
        .to(pos, { x: 0.4, y: 0.75 })
        .to(pos, { x: 0.78, y: 0.25 })
    }, root)

    return () => {
      if (listeners) {
        el.removeEventListener('mousemove', listeners.move)
        el.removeEventListener('mouseenter', listeners.enter)
        el.removeEventListener('mouseleave', listeners.leave)
      }
      ctx.revert()
      gsap.killTweensOf(pos)
    }
  }, [reduced])

  return (
    <section className="spot section-dark" id="ejszaka" ref={root} data-cursor>
      <div className="spot-under" aria-hidden="true">
        <span className="spot-ghost">{t('night.ghost')}</span>
        {SHOTS.map((img, i) => (
          <figure className={`spot-shot spot-shot--${i}`} key={i}>
            <SmartImage img={img} className="spot-shot-img" />
            <figcaption className="spot-cap">{captions[i]}</figcaption>
          </figure>
        ))}
      </div>

      <div className="spot-cover container">
        <p className="section-label section-label--light">{t('night.label')}</p>
        <h2 className="spot-title">
          {t('night.title')} <em>{t('night.titleEm')}</em>
        </h2>
        <p className="spot-hint">
          ✶ <span className="spot-hint-fine">{t('night.hint')}</span>
          <span className="spot-hint-coarse">{t('night.hintTouch')}</span>
        </p>
      </div>
    </section>
  )
}
