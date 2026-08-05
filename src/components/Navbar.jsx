import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollLock } from '../hooks/useScrollLock'
import Logo from './Logo'

const LINKS = [
  { key: 'rolunk', hash: '#rolunk' },
  { key: 'musor', hash: '#musor' },
  { key: 'galeria', hash: '#galeria' },
  { key: 'turne', hash: '#turne' },
  { key: 'jegyek', hash: '#jegyek' },
  { key: 'kapcsolat', hash: '#kapcsolat' },
]

const overlayVariants = {
  closed: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.15 } },
  open: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
}

const listVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

const itemVariants = {
  closed: { y: '110%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  open: { y: '0%', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Navbar({ loaded }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lang = i18n.language

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useScrollLock(open)

  // Escape closes the fullscreen menu
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (e, hash) => {
    e.preventDefault()
    setOpen(false)
    // slight delay so the overlay starts closing before the page scrolls
    setTimeout(() => window.lenis?.scrollTo(hash, { offset: 0 }), open ? 250 : 0)
  }

  // close the overlay too — the language switch remounts the page beneath it
  const setLang = (lng) => {
    setOpen(false)
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        <a href="#kezdolap" className="nav-brand" onClick={(e) => goTo(e, 0)}>
          <Logo variant="mark" className="nav-brand-logo" eager />
          <span className="nav-brand-name">Álom Cirkusz</span>
        </a>

        <nav className="nav-links" aria-label="Főmenü">
          {LINKS.map((l) => (
            <a key={l.key} href={l.hash} className="nav-link" onClick={(e) => goTo(e, l.hash)}>
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-toggle" role="group" aria-label="Nyelv / Language">
            <button
              className={`lang-btn ${lang === 'hu' ? 'is-active' : ''}`}
              onClick={() => setLang('hu')}
            >
              HU
            </button>
            <span className="lang-sep">/</span>
            <button
              className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a href="#jegyek" className="btn btn--red nav-cta" onClick={(e) => goTo(e, '#jegyek')}>
            {t('nav.cta')}
          </a>
          <button
            className="nav-burger"
            aria-label={open ? t('nav.close') : t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.nav className="menu-links" variants={listVariants} initial="closed" animate="open" exit="closed">
              {LINKS.map((l, i) => (
                <div className="menu-link-mask" key={l.key}>
                  <motion.a
                    href={l.hash}
                    className="menu-link"
                    variants={itemVariants}
                    onClick={(e) => goTo(e, l.hash)}
                  >
                    <span className="menu-link-num">0{i + 1}</span>
                    {t(`nav.${l.key}`)}
                  </motion.a>
                </div>
              ))}
            </motion.nav>
            <motion.div
              className="menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="lang-toggle lang-toggle--menu">
                <button className={`lang-btn ${lang === 'hu' ? 'is-active' : ''}`} onClick={() => setLang('hu')}>
                  Magyar
                </button>
                <span className="lang-sep">/</span>
                <button className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>
                  English
                </button>
              </div>
              <p className="menu-tagline">✶ {t('hero.tagline')} ✶</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
