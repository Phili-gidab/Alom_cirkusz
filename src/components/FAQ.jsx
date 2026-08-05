import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FaqFlourish } from './LineArt'

function Item({ item, index, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={open}>
        <span className="faq-idx">{String(index + 1).padStart(2, '0')}</span>
        <span className="faq-q-text">{item.q}</span>
        <motion.span
          className="faq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <FaqFlourish />
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="faq section-cream" id="kerdesek">
      <div className="container container--narrow">
        <p className="section-label">{t('faq.label')}</p>
        <h2 className="faq-title">{t('faq.title')}</h2>
        <div className="faq-list">
          {items.map((item, i) => (
            <Item
              key={i}
              item={item}
              index={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
