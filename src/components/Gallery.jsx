import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SmartImage from './SmartImage'
import { IMAGES } from '../data/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Gallery() {
  const root = useRef(null)
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const row1 = IMAGES.gallery.slice(0, 4)
  const row2 = IMAGES.gallery.slice(4, 8)

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '.gal-title .w',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.gal-title', start: 'top 85%' },
        }
      )

      // rows drift in opposite directions while scrolling through the section
      gsap.fromTo(
        '.gal-row--1',
        { xPercent: 2 },
        {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
      gsap.fromTo(
        '.gal-row--2',
        { xPercent: -14 },
        {
          xPercent: 2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
    },
    { scope: root, dependencies: [reduced] }
  )

  return (
    <section className="gallery section-dark" id="galeria" ref={root}>
      <div className="container">
        <p className="section-label section-label--light">{t('gallery.label')}</p>
        <h2 className="gal-title">
          {t('gallery.title')
            .split(' ')
            .map((w, i) => (
              <span className="w" key={i}>
                {w}{' '}
              </span>
            ))}
        </h2>
      </div>

      <div className="gal-rows">
        <div className="gal-row gal-row--1">
          {row1.map((img, i) => (
            <figure className={`gal-item gal-item--${i % 3}`} key={i} data-cursor>
              <SmartImage img={img} className="gal-img-el" />
              <figcaption className="gal-caption">✶ {t('gallery.hint')}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gal-row gal-row--2">
          {row2.map((img, i) => (
            <figure className={`gal-item gal-item--${(i + 2) % 3}`} key={i} data-cursor>
              <SmartImage img={img} className="gal-img-el" />
              <figcaption className="gal-caption">✶ {t('gallery.hint')}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
