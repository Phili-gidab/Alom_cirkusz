import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MotionConfig } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { useScrollLock } from './hooks/useScrollLock'

import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import ContactMap from './components/ContactMap'
import Acts from './components/Acts'
import Gallery from './components/Gallery'
import Spotlight from './components/Spotlight'
import Tour from './components/Tour'
import Tickets from './components/Tickets'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import TightropeProgress from './components/TightropeProgress'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
  // revealed: the curtain starts lifting → hero intro + scrolling begin
  // gone: the preloader has fully exited and can unmount
  const [revealed, setRevealed] = useState(false)
  const [gone, setGone] = useState(false)
  const { i18n } = useTranslation()
  const lenisRef = useRef(null)

  // Smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisRef.current = lenis
    window.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  // The preloader is just another scroll-lock holder, so a modal closing
  // during the intro can no longer release a lock it never took.
  useScrollLock(!revealed)

  useEffect(() => {
    if (revealed) ScrollTrigger.refresh()
  }, [revealed])

  // Sections remount on language change; re-measure the scroll triggers
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [i18n.language])

  return (
    <MotionConfig reducedMotion="user">
      {!gone && <Preloader onReveal={() => setRevealed(true)} onDone={() => setGone(true)} />}
      <CustomCursor />
      <div className="noise" aria-hidden="true" />
      <TightropeProgress loaded={revealed} />
      <Navbar loaded={revealed} />
      {/* the key is load-bearing: sections rebuild their GSAP tweens against
          the translated DOM on a language switch */}
      <main key={i18n.language}>
        <Hero loaded={revealed} />
        <div className="belt" aria-hidden="true">
          <Marquee items={i18n.t('hero.marquee', { returnObjects: true })} />
        </div>
        <About />
        <Acts />
        <Gallery />
        <Spotlight />
        <Tour />
        <Tickets />
        <FAQ />
        <ContactMap />
        <Footer />
      </main>
    </MotionConfig>
  )
}
