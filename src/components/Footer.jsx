import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Marquee from './Marquee'
import Logo from './Logo'
import LegalModal from './LegalModal'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SOCIALS = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'YouTube', url: 'https://youtube.com' },
]

export default function Footer() {
  const root = useRef(null)
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const [legal, setLegal] = useState(null) // 'imprint' | 'privacy' | null

  // open straight from a shared link, e.g. .../#adatvedelem
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash
      if (h === '#impresszum') setLegal('imprint')
      else if (h === '#adatvedelem') setLegal('privacy')
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '.footer-big-line',
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.footer-cta-block', start: 'top 80%' },
        }
      )
    },
    { scope: root, dependencies: [reduced] }
  )

  const goTickets = (e) => {
    e.preventDefault()
    window.lenis?.scrollTo('#jegyek')
  }
  const toTop = () => window.lenis?.scrollTo(0)

  return (
    <footer className="footer section-dark" id="footer" ref={root}>
      <div className="footer-cta-block container">
        <h2 className="footer-big">
          <span className="footer-big-line">{t('footer.bigline1')}</span>
          <span className="footer-big-line footer-big-line--accent">{t('footer.bigline2')}</span>
        </h2>
        <a href="#jegyek" className="btn btn--red btn--big" onClick={goTickets}>
          {t('footer.cta')} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-marquee" aria-hidden="true">
        <Marquee items={['ÁLOM CIRKUSZ', 'ÁLOM CIRKUSZ', 'ÁLOM CIRKUSZ']} />
      </div>

      <div className="footer-grid container">
        <div className="footer-col footer-col--brand">
          <Logo variant="full" className="footer-logo" />
          <p className="footer-tagline">{t('hero.tagline')}</p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">{t('footer.contactLabel')}</p>
          <a href={`mailto:${t('footer.email')}`} className="footer-link">
            {t('footer.email')}
          </a>
          <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="footer-link">
            {t('footer.phone')}
          </a>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">{t('footer.followLabel')}</p>
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} className="footer-link" target="_blank" rel="noreferrer">
              {s.name} ↗
            </a>
          ))}
        </div>
        <div className="footer-col">
          <p className="footer-col-title">{t('footer.siteLabel')}</p>
          {['rolunk', 'musor', 'galeria', 'turne', 'jegyek', 'kapcsolat'].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="footer-link"
              onClick={(e) => {
                e.preventDefault()
                window.lenis?.scrollTo(`#${key}`)
              }}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <div className="lang-toggle lang-toggle--footer">
            <button
              className={`lang-btn ${i18n.language === 'hu' ? 'is-active' : ''}`}
              onClick={() => i18n.changeLanguage('hu')}
              aria-pressed={i18n.language === 'hu'}
              aria-label={t('a11y.langHu')}
            >
              HU
            </button>
            <span className="lang-sep">/</span>
            <button
              className={`lang-btn ${i18n.language === 'en' ? 'is-active' : ''}`}
              onClick={() => i18n.changeLanguage('en')}
              aria-pressed={i18n.language === 'en'}
              aria-label={t('a11y.langEn')}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>{t('footer.legal')}</p>
        <nav className="footer-legal-links" aria-label={t('legal.label')}>
          <button type="button" className="footer-legal-link" onClick={() => setLegal('imprint')}>
            {t('legal.imprintLink')}
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" className="footer-legal-link" onClick={() => setLegal('privacy')}>
            {t('legal.privacyLink')}
          </button>
        </nav>
        <p className="footer-credit">✶ {t('footer.credit')}</p>
        <button className="footer-top" onClick={toTop} aria-label={t('a11y.toTop')}>
          ↑
        </button>
      </div>

      <LegalModal doc={legal} onClose={() => setLegal(null)} />
    </footer>
  )
}
