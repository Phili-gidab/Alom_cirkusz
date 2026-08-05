import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import TourMap from './TourMap'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function ContactMap() {
  const root = useRef(null)
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 74%' },
        }
      )
    },
    { scope: root, dependencies: [reduced] }
  )

  const onChange = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Álom Cirkusz — ${form.name || 'Web'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} · ${form.email}`)
    window.location.href = `mailto:${t('footer.email')}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact section-dark" id="kapcsolat" ref={root}>
      <div className="container">
        <p className="section-label section-label--light contact-reveal">
          {t('contact.label')}
        </p>
        <h2 className="contact-title contact-reveal">
          {t('contact.title1')} <em>{t('contact.title2')}</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-left contact-reveal">
            <p className="contact-sub">{t('contact.sub')}</p>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <label className="form-field">
                  <span>{t('contact.form.name')}</span>
                  <input
                    type="text"
                    required
                    placeholder={t('contact.form.namePh')}
                    value={form.name}
                    onChange={onChange('name')}
                  />
                </label>
                <label className="form-field">
                  <span>{t('contact.form.email')}</span>
                  <input
                    type="email"
                    required
                    placeholder={t('contact.form.emailPh')}
                    value={form.email}
                    onChange={onChange('email')}
                  />
                </label>
              </div>
              <label className="form-field">
                <span>{t('contact.form.message')}</span>
                <textarea
                  rows="4"
                  required
                  placeholder={t('contact.form.messagePh')}
                  value={form.message}
                  onChange={onChange('message')}
                />
              </label>
              <button type="submit" className="btn btn--red">
                {t('contact.form.submit')} <span aria-hidden="true">↗</span>
              </button>
              <p className="form-hint">✶ {t('contact.form.hint')}</p>
            </form>

            <div className="contact-info">
              <p className="footer-col-title">{t('contact.infoLabel')}</p>
              <a href={`mailto:${t('footer.email')}`} className="contact-info-link">
                {t('footer.email')}
              </a>
              <a
                href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
                className="contact-info-link"
              >
                {t('footer.phone')}
              </a>
              <p className="contact-hours">{t('contact.hours')}</p>
            </div>
          </div>

          <div className="contact-map contact-reveal" data-cursor>
            <p className="map-label">✶ {t('contact.mapLabel')}</p>
            <TourMap />
            <p className="map-note">
              <span className="map-hint">{t('contact.mapHint')}</span>
              {t('contact.mapNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
