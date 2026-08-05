import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SmartImage from './SmartImage'
import { IMAGES } from '../data/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Acts() {
  const root = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const { t } = useTranslation()
  const acts = t('acts.list', { returnObjects: true })
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      // Scroll-jacking is the most disorienting effect on the page; with
      // reduced motion the track becomes a plain swipeable row instead.
      if (reduced) return

      const track = trackRef.current
      const amount = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current)
              progressRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      // gentle counter-drift of each card image while the track moves
      gsap.utils.toArray('.act-media').forEach((media) => {
        gsap.fromTo(
          media,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: media.closest('.act-card'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    },
    { scope: root, dependencies: [reduced] }
  )

  return (
    <section className={`acts section-dark ${reduced ? 'acts--static' : ''}`} id="musor" ref={root}>
      <div className="acts-track" ref={trackRef}>
        <div className="acts-intro">
          <p className="section-label section-label--light">{t('acts.label')}</p>
          <h2 className="acts-title">{t('acts.title')}</h2>
          <p className="acts-sub">{t('acts.intro')}</p>
          <p className="acts-orchestra">✶ {t('acts.orchestra')}</p>
          <p className="acts-hint">
            {t('acts.hint')} <span className="acts-hint-arrow">⟶</span>
          </p>
        </div>

        {acts.map((act, i) => (
          <article className="act-card" key={i} data-cursor>
            <span className="act-ghost-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="act-card-img">
              <div className="act-media">
                <SmartImage img={IMAGES.acts[i]} className="act-img-el" />
              </div>
            </div>
            <div className="act-card-body">
              <p className="act-type">
                ✶ {act.type}
              </p>
              <h3 className="act-name">{act.name}</h3>
              <p className="act-desc">{act.desc}</p>
            </div>
          </article>
        ))}

        <div className="acts-outro" aria-hidden="true">
          <span className="acts-outro-star">✶</span>
        </div>
      </div>

      <div className="acts-progress">
        <div className="acts-progress-bar" ref={progressRef} />
      </div>
    </section>
  )
}
