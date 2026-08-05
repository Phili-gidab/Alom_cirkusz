import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { TIER_PRICES, formatPrice } from '../data/booking'
import { useScrollLock } from '../hooks/useScrollLock'
import { useFocusTrap } from '../hooks/useFocusTrap'

const EMPTY = { name: '', email: '', phone: '', city: '0' }

export default function TicketModal({ tierIndex, onClose }) {
  const { t, i18n } = useTranslation()
  const open = tierIndex !== null
  const tiers = t('tickets.tiers', { returnObjects: true })
  const rows = t('tour.rows', { returnObjects: true })
  const tier = open ? tiers[tierIndex] : null
  const price = open ? TIER_PRICES[tierIndex] : 0

  const [qty, setQty] = useState(1)
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const cardRef = useRef(null)

  useFocusTrap(cardRef, open)

  // reset whenever a new tier opens
  useEffect(() => {
    if (open) {
      setQty(1)
      setForm(EMPTY)
      setSent(false)
    }
  }, [open, tierIndex])

  useScrollLock(open)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const onChange = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const stop = rows[Number(form.city)] || rows[0]
    const subject = `Álom Cirkusz — ${t('checkout.title')}: ${tier.name} × ${qty}`
    const body = [
      `${t('checkout.nameLabel')}: ${form.name}`,
      `${t('checkout.emailLabel')}: ${form.email}`,
      `${t('checkout.phoneLabel')}: ${form.phone}`,
      '',
      `${t('checkout.cityLabel')}: ${stop.city} — ${stop.dates}`,
      `${t('checkout.qty')}: ${tier.name} × ${qty}`,
      `${t('checkout.total')}: ${formatPrice(price * qty, i18n.language)}`,
      '',
      t('checkout.payNote'),
    ].join('\n')

    window.location.href = `mailto:${t('footer.email')}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

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
            className="modal-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('checkout.title')}
            initial={{ opacity: 0, y: 46, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label={t('checkout.close')}>
              ×
            </button>

            <p className="modal-label">✶ {t('checkout.title')}</p>
            <h3 className="modal-tier">{tier.name}</h3>
            <p className="modal-price">
              {formatPrice(price, i18n.language)} <span>{t('checkout.each')}</span>
            </p>

            {sent ? (
              <>
                <p className="modal-success">{t('checkout.success')}</p>
                <p className="modal-note">
                  {t('checkout.fallbackA')}{' '}
                  <a className="modal-mail" href={`mailto:${t('footer.email')}`}>
                    {t('footer.email')}
                  </a>{' '}
                  {t('checkout.fallbackB')}
                </p>
              </>
            ) : (
              <form className="booking-form" onSubmit={onSubmit}>
                <div className="modal-qty">
                  <span className="modal-qty-label">{t('checkout.qty')}</span>
                  <div className="qty-stepper">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      aria-label={t('checkout.qtyLess')}
                    >
                      −
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(Math.min(10, qty + 1))}
                      aria-label={t('checkout.qtyMore')}
                    >
                      +
                    </button>
                  </div>
                  <span className="modal-total">
                    {t('checkout.total')}{' '}
                    <strong>{formatPrice(price * qty, i18n.language)}</strong>
                  </span>
                </div>

                <label className="form-field form-field--light">
                  <span>{t('checkout.cityLabel')}</span>
                  <select value={form.city} onChange={onChange('city')} required>
                    {rows.map((r, i) => (
                      <option value={String(i)} key={r.city}>
                        {r.city} — {r.dates}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field form-field--light">
                  <span>{t('checkout.nameLabel')}</span>
                  <input
                    type="text"
                    required
                    placeholder={t('checkout.namePh')}
                    value={form.name}
                    onChange={onChange('name')}
                  />
                </label>

                <div className="form-row">
                  <label className="form-field form-field--light">
                    <span>{t('checkout.emailLabel')}</span>
                    <input
                      type="email"
                      required
                      placeholder={t('checkout.emailPh')}
                      value={form.email}
                      onChange={onChange('email')}
                    />
                  </label>
                  <label className="form-field form-field--light">
                    <span>{t('checkout.phoneLabel')}</span>
                    <input
                      type="tel"
                      required
                      placeholder={t('checkout.phonePh')}
                      value={form.phone}
                      onChange={onChange('phone')}
                    />
                  </label>
                </div>

                <button type="submit" className="btn btn--red booking-submit">
                  {t('checkout.submit')} <span aria-hidden="true">↗</span>
                </button>
                <p className="modal-note">✶ {t('checkout.payNote')}</p>
                <p className="modal-privacy">{t('checkout.privacy')}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
