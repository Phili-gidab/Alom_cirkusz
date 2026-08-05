import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { TrapezeDoodle } from './LineArt'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Tour() {
  const root = useRef(null)
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const rows = t('tour.rows', { returnObjects: true })

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '.tour-row',
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tour-list', start: 'top 82%' },
        }
      )
    },
    { scope: root, dependencies: [reduced] }
  )

  const goTickets = (e) => {
    e.preventDefault()
    window.lenis?.scrollTo('#jegyek')
  }

  return (
    <section className="tour section-cream" id="turne" ref={root}>
      <TrapezeDoodle className="tour-trapeze" />
      <div className="container">
        <p className="section-label">{t('tour.label')}</p>
        <h2 className="tour-title">{t('tour.title')}</h2>

        <div className="tour-list">
          {rows.map((row, i) => (
            <a className="tour-row" href="#jegyek" key={i} onClick={goTickets}>
              <span className="tour-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="tour-city">{row.city}</span>
              <span className="tour-venue">
                {row.venue}
                {row.times && <em className="tour-times">{row.times}</em>}
              </span>
              <span className="tour-dates">{row.dates}</span>
              <span className={`tour-status tour-status--${row.status}`}>
                {t(`tour.${row.status}`)}
              </span>
              <span className="tour-cta">
                {t('tour.tickets')} <span className="tour-arrow">↗</span>
              </span>
            </a>
          ))}
        </div>

        <p className="tour-note">✶ {t('tour.note')}</p>
      </div>
    </section>
  )
}
