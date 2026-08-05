import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import TicketModal from './TicketModal'

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Tickets() {
  const { t } = useTranslation()
  const tiers = t('tickets.tiers', { returnObjects: true })
  const [buying, setBuying] = useState(null)

  return (
    <section className="tickets section-red" id="jegyek">
      <span className="tickets-ghost-star" aria-hidden="true">
        ✶
      </span>
      <div className="container">
        <p className="section-label section-label--onred">{t('tickets.label')}</p>
        <h2 className="tickets-title">{t('tickets.title')}</h2>

        <div className="tickets-grid">
          {tiers.map((tier, i) => (
            <motion.article
              className={`ticket-card ${i === 1 ? 'ticket-card--popular' : ''}`}
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -12, rotate: i === 1 ? 0 : i === 0 ? -1.2 : 1.2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              data-cursor
            >
              {i === 1 && <span className="ticket-badge">✶ {t('tickets.popular')}</span>}
              <h3 className="ticket-name">{tier.name}</h3>
              <p className="ticket-price">
                <span className="ticket-from">{t('tickets.from')}</span>
                {tier.price}
              </p>
              <p className="ticket-desc">{tier.desc}</p>
              <ul className="ticket-perks">
                {tier.perks.map((perk, j) => (
                  <li key={j}>
                    <span aria-hidden="true">✶</span> {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn ${i === 1 ? 'btn--red' : 'btn--dark'} ticket-btn`}
                onClick={() => setBuying(i)}
              >
                {t('tickets.cta')}
              </button>
            </motion.article>
          ))}
        </div>

        <div className="tickets-extra">
          <div className="tickets-child">
            <p className="tx-label">{t('tickets.childLabel')}</p>
            <p className="tx-price">
              {t('tickets.childPrice')} <span>{t('tickets.childNote')}</span>
            </p>
            <p className="tx-sub">{t('tickets.subtitle')}</p>
          </div>

          <div className="tickets-how">
            <p className="tx-label">{t('tickets.howLabel')}</p>
            <ol className="tx-steps">
              {t('tickets.how', { returnObjects: true }).map((step, i) => (
                <li key={i}>
                  <span className="tx-step-n">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="tickets-note">✶ {t('tickets.note')}</p>
      </div>

      <TicketModal tierIndex={buying} onClose={() => setBuying(null)} />
    </section>
  )
}
