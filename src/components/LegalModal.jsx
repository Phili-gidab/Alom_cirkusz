import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollLock } from '../hooks/useScrollLock'
import { useFocusTrap } from '../hooks/useFocusTrap'

/**
 * Impresszum + adatkezelési tájékoztató.
 *
 * Hungary requires both on a commercial site: Ekrtv. 2001/CVIII §4 for the
 * imprint, GDPR for the privacy notice. Deep-linkable via #impresszum and
 * #adatvedelem so the pages can be referenced directly from anywhere.
 *
 * ⚠ The company registration number, tax number and registered address are
 * PLACEHOLDERS. They are legally required and only the circus can supply them.
 */
export default function LegalModal({ doc, onClose }) {
  const { t } = useTranslation()
  const open = doc !== null
  const cardRef = useRef(null)

  useScrollLock(open)
  useFocusTrap(cardRef, open)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // keep the URL honest so the notice can be linked to directly
  useEffect(() => {
    if (!open) return
    const prev = window.location.hash
    window.history.replaceState(null, '', `#${doc === 'imprint' ? 'impresszum' : 'adatvedelem'}`)
    return () => window.history.replaceState(null, '', prev || ' ')
  }, [open, doc])

  const key = doc === 'imprint' ? 'imprint' : 'privacy'
  const sections = open ? t(`legal.${key}.sections`, { returnObjects: true }) : []

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card modal-card--legal"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label={t(`legal.${key}.title`)}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label={t('checkout.close')}>
              ×
            </button>

            <p className="modal-label">✶ {t('legal.label')}</p>
            <h3 className="legal-title">{t(`legal.${key}.title`)}</h3>
            <p className="legal-updated">{t('legal.updated')}</p>

            <div className="legal-body">
              {Array.isArray(sections) &&
                sections.map((s, i) => (
                  <section className="legal-section" key={i}>
                    <h4>{s.h}</h4>
                    {s.p.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </section>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
