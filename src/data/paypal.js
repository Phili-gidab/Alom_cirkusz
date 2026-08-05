import { CURRENCY, TIER_PRICES } from './booking'

// ============================================================
// PayPal checkout configuration.
//
// IMPORTANT: 'test' is PayPal's public demo client-id (sandbox).
// When the client provides their PayPal Business account, replace
// PAYPAL_CLIENT_ID with the live Client ID from
// https://developer.paypal.com/dashboard → Apps & Credentials.
// Nothing else needs to change.
// ============================================================
export const PAYPAL_CLIENT_ID = 'test'
export const PAYPAL_CURRENCY = CURRENCY

// Prices come from booking.js so the two can never drift apart.
export { TIER_PRICES }

let sdkPromise = null

/** Lazily inject the PayPal JS SDK once and reuse it. */
export function loadPayPalSdk() {
  if (window.paypal) return Promise.resolve(window.paypal)
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}&components=buttons`
    s.async = true
    s.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error('PayPal SDK unavailable')))
    s.onerror = () => {
      sdkPromise = null
      reject(new Error('PayPal SDK failed to load'))
    }
    document.head.appendChild(s)
  })
  return sdkPromise
}
