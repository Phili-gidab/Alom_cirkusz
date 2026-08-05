# Álom Cirkusz — Official Website

One-page site for **Álom Cirkusz** ("Magical Wonders"), a Hungarian travelling circus.
Visual concept taken from the logo: a crescent moon cradling a red-and-white big top,
in red / cream / gold with oversized display type and film grain.

## Stack

- **React 18 + Vite 6**
- **GSAP 3.13** (ScrollTrigger, DrawSVG) — preloader, hero, pinned horizontal Acts
  section, counters, self-drawing line art
- **Framer Motion** — fullscreen menu, FAQ accordion, ticket cards, booking modal
- **Lenis** — smooth scrolling synced with ScrollTrigger
- **react-i18next** — Hungarian (default) + English, persisted in `localStorage` (`ac-lang`)

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  App.jsx                  # orchestration: Lenis, preloader, section order
  i18n.js                  # ALL site copy (HU + EN) — edit content here
  data/images.js           # central image registry
  data/booking.js          # booking-only config, tier prices, currency
  components/
    Preloader.jsx          # counter + curtain reveal
    Navbar.jsx             # fixed nav + fullscreen menu + language switch
    Hero.jsx               # big type, parallax photo, marquee belt
    About.jsx              # "Rólunk": scroll-reveal headline + stats
    Acts.jsx               # "A Műsor": pinned horizontal scroll (6 acts)
    Spotlight.jsx          # searchlight interlude (cursor reveals backstage)
    Gallery.jsx            # two rows with opposing parallax drift
    Tour.jsx               # "Turné": city rows with showtimes
    Tickets.jsx            # 3 tiers → booking modal
    TicketModal.jsx        # reservation form (NO payment)
    ContactMap.jsx         # contact form + animated Hungary tour map
    FAQ.jsx                # accordion
    Footer.jsx             # giant CTA, outlined marquee, contact
    LineArt.jsx            # bunting, trapeze artist, FAQ flourish (DrawSVG)
    TightropeProgress.jsx  # tightrope walker = page scroll progress
  styles/                  # base (tokens) / components / sections / effects
```

## Where the content lives

| What | File |
| --- | --- |
| All copy, both languages | `src/i18n.js` |
| Tour cities, dates, showtimes | `src/i18n.js` → `tour.rows` |
| Ticket tiers and prices | `src/i18n.js` → `tickets.tiers` + `src/data/booking.js` |
| Email / phone | `src/i18n.js` → `footer.email` / `footer.phone` |
| Social links | `SOCIALS` array in `src/components/Footer.jsx` |
| Images | `src/data/images.js` |
| Design tokens (colours, fonts) | `src/styles/base.css` |

## Images

Images resolve **local first**: anything dropped into `public/images/` with the expected
filename overrides the fallback — no code change needed. Current client photos:

| File | Where it appears |
| --- | --- |
| `hero_image.png` | Hero background |
| `company-finale.jpg` | About, gallery, finale act |
| `aerial-red.jpg` | Aerial act, gallery |
| `silks-red.jpg` | Illusion act, gallery |
| `acrobats.jpg` | Hand-to-hand act, gallery |

Still wanted from the client: a fire act (`act-2.jpg`), a clown act (`act-3.jpg`) and four
more gallery shots (`gallery-5.jpg` … `gallery-8.jpg`).

**Fallback rule:** stock fallbacks must show genuine circus subjects — big tops, aerialists,
acrobats, ring performances. No concert or festival crowd photography.

## Tickets — booking only

The circus takes **reservations only**. There is no online payment and no downloadable
ticket; guests pay at the venue before the show (cash, bank card or SZÉP kártya).

- Flag: `PAYMENT_ENABLED = false` in `src/data/booking.js`
- The booking form lives in `src/components/TicketModal.jsx` and currently submits by
  opening a prefilled email. Point `BOOKING_ENDPOINT` at a form service or API to capture
  bookings server-side instead.
- `src/data/paypal.js` is kept intact so payment can be switched back on later.

## Provisional content (pending client sign-off)

Tour **dates, venues and showtimes** are placeholders modelled on standard Hungarian
circus scheduling (weekdays 18:00; Sat 15:00 & 18:00; Sun 11:00 & 15:00). Ticket prices,
act names and social links also need confirming before launch.
