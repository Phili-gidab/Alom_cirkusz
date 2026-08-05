import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SmartImage from './SmartImage'
import { IMAGES } from '../data/images'
import { BuntingDoodle } from './LineArt'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Words = ({ text, cls = '' }) =>
  text.split(' ').map((w, i) => (
    <span key={`${w}-${i}`} className={`w ${cls}`}>
      {w}{' '}
    </span>
  ))

function CircularBadge({ text }) {
  return (
    <div className="circular-badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="circular-badge-star">✶</span>
    </div>
  )
}

export default function About() {
  const root = useRef(null)
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const stats = t('about.stats', { returnObjects: true })

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '.about-heading .w',
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 82%',
            end: 'top 30%',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        '.about-img-inner',
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-img',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        '.about-copy > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-copy', start: 'top 82%' },
        }
      )

      gsap.fromTo(
        '.stat',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 88%' },
        }
      )

      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v)
          },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { scope: root, dependencies: [reduced] }
  )

  return (
    <section className="about section-cream" id="rolunk" ref={root}>
      <BuntingDoodle className="about-bunting" />
      <div className="container">
        <p className="section-label">{t('about.label')}</p>

        <h2 className="about-heading">
          <Words text={t('about.h1')} /> <Words text={t('about.hAccent1')} cls="accent-red" />{' '}
          <Words text={t('about.h2')} /> <Words text={t('about.hAccent2')} cls="accent-italic" />
        </h2>

        <div className="about-grid">
          <div className="about-copy">
            <p className="about-lead">{t('about.body1')}</p>
            <p className="about-secondary">{t('about.body2')}</p>
          </div>
          <div className="about-img" data-cursor>
            <div className="about-img-frame">
              <div className="about-img-inner">
                <SmartImage img={IMAGES.aboutMain} className="about-img-el" />
              </div>
            </div>
            <div className="about-img-mini" aria-hidden="true">
              <SmartImage img={IMAGES.aboutSecondary} className="about-img-mini-el" />
            </div>
            <p className="about-img-caption">✶ {t('about.imgCaption')}</p>
            <CircularBadge text="ÁLOM CIRKUSZ · 2026 TURNÉ · ÁLOM CIRKUSZ · 2026 TURNÉ · " />
          </div>
        </div>

        <div className="about-stats">
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <p className="stat-number">
                <span className="stat-value" data-value={s.value}>
                  0
                </span>
                <span className="stat-suffix">{s.suffix}</span>
              </p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
