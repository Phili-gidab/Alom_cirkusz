// ============================================================
// Booking configuration.
//
// The circus takes RESERVATIONS ONLY — no online payment, no
// downloadable ticket. Guests reserve seats here and pay at the
// venue before the show.
//
// To switch payment back on later:
//   1. set PAYMENT_ENABLED = true
//   2. restore the PayPal branch in TicketModal.jsx (see git history
//      / src/data/paypal.js, which is kept intact for that purpose)
// ============================================================
export const PAYMENT_ENABLED = false

// Where reservation requests are sent. Handled by a mailto: draft for now;
// swap for a real endpoint (Formspree / Netlify Forms / custom API) once the
// circus tells us which inbox or CRM should receive bookings.
export const BOOKING_ENDPOINT = null

export const CURRENCY = 'HUF'

// numeric prices (HUF) per tier, same order as i18n tickets.tiers
export const TIER_PRICES = [5900, 8900, 12900]

export const formatPrice = (value, lang) =>
  lang === 'en'
    ? `HUF ${value.toLocaleString('en-US')}`
    : `${value.toLocaleString('hu-HU')} Ft`
