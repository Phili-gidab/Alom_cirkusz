// Central image registry.
// Every image tries the local file first (public/images/...) so the circus's
// real photos can simply be dropped in with these filenames. Until then, a
// verified CIRCUS fallback is shown.
//
// RULE: fallbacks must show genuine circus subjects — big tops, acrobats,
// aerialists, ring performances. No concert/festival crowd stock, ever.
const u = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Client-supplied production photos (received 2026-08-05)
const REAL = {
  company: '/images/company-finale.jpg', // full troupe under the ÁLOM CIRKUSZ sign
  aerial: '/images/aerial-red.jpg', // aerial artist in red, starred big top
  silks: '/images/silks-red.jpg', // silks against red drapes
  acrobats: '/images/acrobats.jpg', // teeterboard troupe mid-flight
}

// Verified circus stock, used only until the client sends more of their own.
// Each was opened and checked by eye: genuine circus subject, dark/warm tone
// that sits inside the red-and-gold palette.
const STOCK = {
  tentLit: '1678270852355-7f2bbbe8811e', // red-and-white big top ringed with bulbs, at night
  tentNight: '1764936508819-4a2e33380c3c', // glowing striped tent, animal silhouettes
  aerialRope: '1645287681218-2162a46b0299', // aerialist flying, spotlights behind
  aerialSilks: '1762271232481-30bd8d3342fa', // duo on red silks against deep blue
  acroLit: '1743685442133-766aec39d621', // hand-to-hand acrobats in a single beam
  acroPyramid: '1761747471006-6e5e533e5b6b', // human pyramid in a full ring, warm light
}

export const IMAGES = {
  hero: {
    // The master is a 2.3 MB PNG — the wrong format for a photograph. WebP at
    // q=85 is 256 KB with no visible difference (error sits only on thin
    // high-contrast edges, under a blend layer and film grain). The .jpg is the
    // fallback so non-WebP browsers never pull the PNG either.
    local: '/images/hero_image.jpg',
    webp: '/images/hero_image.webp',
    web: u(STOCK.tentLit, 1900),
    alt: 'Az Álom Cirkusz sátra kivilágítva az esti fényben',
  },
  aboutMain: {
    local: REAL.company,
    web: u(STOCK.acroPyramid, 1800),
    alt: 'A teljes társulat a porondon az Álom Cirkusz fényfelirata alatt',
  },
  aboutSecondary: {
    local: REAL.aerial,
    web: u(STOCK.aerialRope, 900),
    alt: 'Légtornász piros ruhában a csillagos sátorkupola alatt',
  },
  acts: [
    {
      local: REAL.aerial,
      web: u(STOCK.aerialRope, 900),
      alt: 'Légtornász piros ruhában a kupola alatt repülve',
    },
    {
      local: '/images/act-2.jpg',
      web: u(STOCK.tentNight, 900),
      alt: 'A kivilágított sátor az éjszakában, a tűzshow előtt',
    },
    {
      local: '/images/act-3.jpg',
      web: u(STOCK.tentLit, 900),
      alt: 'A kivilágított sátor, ahol a bohócok színre lépnek',
    },
    {
      local: REAL.acrobats,
      web: u(STOCK.acroLit, 900),
      alt: 'Akrobaták egymást repítve a porond fölött',
    },
    {
      local: REAL.silks,
      web: u(STOCK.aerialSilks, 900),
      alt: 'Selyemakrobata piros függönyök között',
    },
    {
      local: REAL.company,
      web: u(STOCK.acroPyramid, 900),
      alt: 'A teljes társulat a nagy fináléban',
    },
  ],
  gallery: [
    {
      local: REAL.company,
      web: u(STOCK.acroPyramid, 1000),
      alt: 'A társulat a fináléban, kék jelmezekben',
    },
    {
      local: REAL.silks,
      web: u(STOCK.aerialSilks, 1000),
      alt: 'Selyemakrobata a piros függönyök örvényében',
    },
    {
      local: REAL.acrobats,
      web: u(STOCK.acroPyramid, 1000),
      alt: 'Akrobata a levegőben, a társulat elkapásra készen',
    },
    {
      local: REAL.aerial,
      web: u(STOCK.aerialRope, 1000),
      alt: 'Légtornász a csillagos kupola alatt',
    },
    {
      local: '/images/gallery-5.jpg',
      web: u(STOCK.acroLit, 1000),
      alt: 'Kézen álló akrobaták egyetlen fénycsóvában',
    },
    {
      local: '/images/gallery-6.jpg',
      web: u(STOCK.tentLit, 1000),
      alt: 'A sátor fényfüzérekkel az előadás előtt',
    },
    {
      local: '/images/gallery-7.jpg',
      web: u(STOCK.aerialSilks, 1000),
      alt: 'Kettős selyemakrobata-szám a kupola alatt',
    },
    {
      local: '/images/gallery-8.jpg',
      web: u(STOCK.acroPyramid, 1000),
      alt: 'Emberpiramis a porondon, teltház előtt',
    },
  ],
}
