import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Logo from './Logo'

export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const { t } = useTranslation()
  const word = t('preloader.word')

  useGSAP(
    () => {
      const counter = { val: 0 }

      // The CSS start position (translateY(115%)) resolves to a pixel matrix in
      // getComputedStyle, so GSAP reads yPercent as 0 and tweening it to 0 does
      // nothing — the letters would never rise. Re-declare the offset in GSAP's
      // own terms first; visually identical, but now GSAP knows it is 115%.
      gsap.set('.pre-char', { yPercent: 115, y: 0 })

      const tl = gsap.timeline({ onComplete: onDone })

      tl.from('.pre-logo', { opacity: 0, y: 26, scale: 0.9, duration: 1, ease: 'power3.out' }, 0)
        .to('.pre-char', { yPercent: 0, duration: 1, stagger: 0.045, ease: 'power4.out' }, 0.25)
        .to('.pre-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9)
        .to(
          counter,
          {
            val: 100,
            duration: 2.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0')
            },
          },
          0.3
        )
        .to('.pre-char', { yPercent: -115, duration: 0.55, stagger: 0.025, ease: 'power3.in' }, '+=0.15')
        .to(['.pre-sub', '.pre-count', '.pre-star', '.pre-logo'], { opacity: 0, duration: 0.4 }, '<')
        .add(() => onReveal(), '-=0.1')
        .to('.pre-panel--black', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' })
        .to('.pre-panel--red', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.66')
    },
    { scope: root }
  )

  return (
    <div className="preloader" ref={root}>
      <div className="pre-panel pre-panel--red" />
      <div className="pre-panel pre-panel--black">
        <span className="pre-star" aria-hidden="true">
          ✶
        </span>
        <div className="pre-center">
          <Logo variant="mark" className="pre-logo" eager />
          <div className="pre-word" aria-label={word}>
            {word.split('').map((c, i) =>
              c === ' ' ? (
                <span key={i} className="pre-space" />
              ) : (
                <span key={i} className="pre-mask" aria-hidden="true">
                  <span className="pre-char">{c}</span>
                </span>
              )
            )}
          </div>
          <p className="pre-sub">{t('preloader.sub')}</p>
        </div>
        <div className="pre-count">
          <span ref={countRef}>000</span>
          <span className="pre-pct">%</span>
        </div>
      </div>
    </div>
  )
}
