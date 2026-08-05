import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SmartImage from './SmartImage'
import { IMAGES } from '../data/images'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero({ loaded }) {
  const root = useRef(null)
  const figure = useRef(null)
  const cap = useRef(null)
  const { t } = useTranslation()
  const acts = t('acts.list', { returnObjects: true })
  const [active, setActive] = useState(0)
  const len = acts.length
  const reduced = useReducedMotion()

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        left: Math.random() * 55, // keep the stars in the dark left zone
        top: Math.random() * 82,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3.5,
      })),
    []
  )

  // entrance: the figure wipes in from the right, the statement rises
  useGSAP(
    () => {
      if (!loaded) return
      if (reduced) {
        gsap.set(['.hl-text', '[data-hero-fade]', '.hero-capcard'], {
          clearProps: 'all',
        })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        figure.current,
        { clipPath: 'inset(0 0 0 100%)' },
        { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'power4.inOut' },
        0
      )
        .from('.hero-eyebrow', { opacity: 0, y: -18, duration: 0.8 }, 0.35)
        .from('.hero-kicker', { opacity: 0, x: -30, duration: 0.8 }, 0.45)
        .from('.hl-text', { yPercent: 112, duration: 1.1, stagger: 0.12 }, 0.55)
        .from(
          '[data-hero-fade]',
          { opacity: 0, y: 24, duration: 0.9, stagger: 0.1 },
          1.0
        )
        .from(
          '.hero-capcard',
          { opacity: 0, y: 30, scale: 0.92, duration: 0.8, ease: 'back.out(1.6)' },
          1.35
        )

      // scroll depth: photo and statement separate at different speeds
      const st = {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
      gsap.to(figure.current, { yPercent: 10, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-anchor', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: st,
      })
      gsap.to('.hero-capcard', {
        yPercent: -110,
        ease: 'none',
        scrollTrigger: { ...st, scrub: 0.4 },
      })
    },
    { scope: root, dependencies: [loaded, reduced] }
  )

  // act carousel in the caption card
  useEffect(() => {
    if (!loaded || reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % len), 4500)
    return () => clearInterval(id)
  }, [loaded, len, reduced])

  useEffect(() => {
    if (!loaded || reduced || !cap.current) return
    const tween = gsap.fromTo(
      cap.current.children,
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }
    )
    return () => tween.revert()
  }, [active, loaded, reduced])

  const goTo = (target) => (e) => {
    e.preventDefault()
    window.lenis?.scrollTo(target)
  }

  return (
    <section className="hero" id="kezdolap" ref={root}>
      <div className="hero-figure" ref={figure} aria-hidden="true">
        <SmartImage img={IMAGES.hero} className="hero-img" eager />
      </div>

      <div className="hero-stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      <p className="hero-eyebrow">
        <span className="tick" aria-hidden="true" /> {t('hero.eyebrow')}
      </p>

      <div className="hero-anchor">
        <p className="hero-kicker" aria-hidden="true">
          {t('hero.kicker')}
        </p>

        <h1
          className="hero-heading"
          aria-label={`${t('hero.l1')} ${t('hero.l2')} ${t('hero.l3')}`}
        >
          <span className="hl-mask hh-a" aria-hidden="true">
            <span className="hl-text">{t('hero.l1')}</span>
          </span>
          <span className="hl-mask hh-a hh-outline" aria-hidden="true">
            <span className="hl-text">{t('hero.l2')}</span>
          </span>
          <span className="hl-mask hh-b" aria-hidden="true">
            <span className="hl-text">{t('hero.l3')}</span>
          </span>
        </h1>

        <div className="hero-side" data-hero-fade>
          <p className="hero-lede">
            {t('hero.ledeA')} <em>{t('hero.ledeEm')}</em>
          </p>
          <div className="hero-ctas">
            <a href="#jegyek" className="btn btn--red" onClick={goTo('#jegyek')}>
              {t('hero.ctaPrimary')}
            </a>
            <a href="#musor" className="link-arrow" onClick={goTo('#musor')}>
              {t('hero.ctaSecondary')} <i aria-hidden="true">↓</i>
            </a>
          </div>
        </div>
      </div>

      {/* The dots are siblings of the link, not children: a <button> inside an
          <a> is invalid HTML and browsers recover from it unpredictably. */}
      <div className="hero-capcard">
        <a className="hero-capcard-link" href="#musor" onClick={goTo('#musor')}>
          <span ref={cap}>
            <span className="hc-n">
              {String(active + 1).padStart(2, '0')} — {String(len).padStart(2, '0')}
            </span>
            <span className="hc-label">✶ {t('hero.capLabel')}</span>
            <span className="hc-name">{acts[active].name}</span>
          </span>
        </a>
        <div className="hero-dots" role="tablist" aria-label={t('hero.capLabel')}>
          {acts.map((act, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={act.name}
              className={`hero-dot${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="hero-bottom" data-hero-fade>
        <span>{t('hero.coords')}</span>
        <span className="scroll-cue">
          {t('hero.scroll')} <i aria-hidden="true">↓</i>
        </span>
        <span>{t('hero.place')}</span>
      </div>
    </section>
  )
}
