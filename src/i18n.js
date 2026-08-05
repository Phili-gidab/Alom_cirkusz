import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// ============================================================
// ALL site copy lives here.
//
// ⚠ ITEMS MARKED "TBC" NEED THE CIRCUS TO CONFIRM BEFORE LAUNCH:
//   · tour dates, venues and showtimes  (modelled on standard HU scheduling)
//   · ticket prices and the child price
//   · whether the show includes animals  (faq → animals)
//   · phone opening hours
//   · the minimum age / sensory warning wording
// ============================================================
const resources = {
  hu: {
    translation: {
      nav: {
        rolunk: 'Rólunk',
        musor: 'A műsor',
        galeria: 'Galéria',
        turne: 'Turné',
        jegyek: 'Jegyek',
        kapcsolat: 'Kapcsolat',
        cta: 'Jegyfoglalás',
        menu: 'Menü',
        close: 'Bezárás',
      },
      preloader: {
        word: 'ÁLOM CIRKUSZ',
        sub: 'Az előadás mindjárt kezdődik',
      },
      hero: {
        eyebrow: 'Álom Cirkusz — 2026-os turné · Magyarország',
        kicker: 'Akrobatika · Tűz · Varázslat · Nevetés',
        l1: 'Éld át a varázslatot.',
        l2: 'Érezd a csodát.',
        l3: 'Az Álom Cirkuszban.',
        ledeA: 'Modern vándorcirkusz világszínvonalú artistákkal, egyetlen sátor alatt.',
        ledeEm: 'Két óra fény, élő zene és ámulat az egész családnak.',
        tagline: 'ahol az álmok életre kelnek',
        ctaPrimary: 'Jegyfoglalás',
        ctaSecondary: 'Fedezd fel a műsort',
        capLabel: 'Az előadás',
        scroll: 'Görgess',
        coords: '47.5° É — 19.0° K',
        place: 'Magyarország · 2026-os turné',
        marquee: [
          'Élő zenekar minden előadáson',
          'Két óra tiszta varázslat',
          'Az egész családnak',
          'Nemzetközi artisták',
          '2026-os turné országszerte',
        ],
      },
      about: {
        label: '01 · Rólunk',
        h1: 'Az Álom Cirkuszban',
        hAccent1: 'a lehetetlen',
        h2: 'felejthetetlenné',
        hAccent2: 'válik.',
        body1:
          'Az Álom Cirkusz modern vándorcirkusz, amely Magyarországot bejárva olyan pillanatokat teremt, amelyeket nem lehet elfelejteni. Előadásainkban a klasszikus cirkuszművészet találkozik a mai színpadi látvánnyal: fény, élő zene és világszínvonalú artisták egyetlen sátor alatt.',
        body2:
          'Minden előadás egy kétórás utazás a lehetetlen világokon át — hogy a gyerekek és a felnőttek is álmodhassanak egy kicsit.',
        imgCaption: 'A sátor · 2026-os turné',
        stats: [
          { value: 25, suffix: '+', label: 'Artista a porondon' },
          { value: 120, suffix: '', label: 'Perc előadás' },
          { value: 4, suffix: '', label: 'Város a turnén' },
          { value: 1200, suffix: '', label: 'Férőhely a sátorban' },
        ],
      },
      acts: {
        label: '02 · A műsor',
        title: 'A produkciók',
        intro: 'Hat produkció. Egyetlen szívdobbanás.',
        hint: 'Görgess végig a porondon',
        orchestra:
          'Minden produkciót élő zenekar kísér — a fény, a zene és a mozdulat ugyanabban a pillanatban születik.',
        list: [
          {
            name: 'Égi repülés',
            type: 'Légtorna',
            desc: 'Trapézművészek és légtornászok tíz méterrel a porond fölött dacolnak a gravitációval.',
          },
          {
            name: 'Tűztánc',
            type: 'Tűzshow',
            desc: 'Lángok táncolnak a dobok ritmusára egy hipnotikus koreográfiában.',
          },
          {
            name: 'Holdfényes nevetés',
            type: 'Bohócok',
            desc: 'A régi jó humor új lélekkel: garantált kacagás minden korosztálynak.',
          },
          {
            name: 'Lehetetlen egyensúly',
            type: 'Partnerakrobatika',
            desc: 'Két test, egyetlen támaszpont — és ezer néző visszafojtott lélegzettel.',
          },
          {
            name: 'Éjszakai varázslat',
            type: 'Bűvészet',
            desc: 'Megjelenések, eltűnések és egy finálé, amit még senki sem tudott megmagyarázni.',
          },
          {
            name: 'A nagy finálé',
            type: 'A teljes társulat',
            desc: 'Mindenki a porondon egy záró számban, amely bevilágítja az egész sátrat.',
          },
        ],
      },
      gallery: {
        label: '03 · Galéria',
        title: 'Pillanatok a sátor alól',
        hint: 'Megnézem',
      },
      night: {
        label: 'Közjáték · Az éjszaka',
        title: 'Amikor kialszanak a fények,',
        titleEm: 'a varázslat ébren marad.',
        hint: 'Mozgasd a fényt, és fedezd fel, amit a közönség sosem lát',
        hintTouch: 'A fény magától vándorol…',
        ghost: 'A KULISSZÁK MÖGÖTT',
        captions: ['Az éjféli próba', 'A csend a taps előtt', 'A fények, amelyek várnak'],
      },
      tour: {
        label: '04 · Turné',
        title: '2026-os turné',
        tickets: 'Foglalás',
        note: 'A pontos előadás-időpontok egyeztetés alatt állnak — hamarosan frissítjük az oldalt. Kövess minket, hogy ne maradj le semmiről.',
        onsale: 'Foglalható',
        soon: 'Hamarosan',
        timesLabel: 'Előadások',
        // TBC — dates, venues and times all need the circus's confirmation
        rows: [
          {
            city: 'Győr',
            venue: 'A helyszín egyeztetés alatt',
            dates: 'szept. 2–6.',
            times: 'H–P 18:00 · Szo 15:00, 18:00 · V 11:00, 15:00',
            status: 'onsale',
          },
          {
            city: 'Székesfehérvár',
            venue: 'A helyszín egyeztetés alatt',
            dates: 'szept. 9–13.',
            times: 'H–P 18:00 · Szo 15:00, 18:00 · V 11:00, 15:00',
            status: 'onsale',
          },
          {
            city: 'Pécs',
            venue: 'A helyszín egyeztetés alatt',
            dates: 'szept. 16–20.',
            times: 'H–P 18:00 · Szo 15:00, 18:00 · V 11:00, 15:00',
            status: 'soon',
          },
          {
            city: 'Szeged',
            venue: 'A helyszín egyeztetés alatt',
            dates: 'szept. 23–27.',
            times: 'H–P 18:00 · Szo 15:00, 18:00 · V 11:00, 15:00',
            status: 'soon',
          },
        ],
      },
      tickets: {
        label: '05 · Jegyek',
        title: 'Éld át a varázslatot',
        subtitle:
          'Válaszd ki, hogyan szeretnéd átélni az estét. A 2 év alatti gyermekek belépése ingyenes.',
        cta: 'Foglalás',
        popular: 'Legnépszerűbb',
        from: 'Már',
        note: '20% kedvezmény legalább 20 fős csoportoknak, nagycsaládosoknak és 65 év felettieknek.',
        childLabel: 'Gyermekjegy (2–14 év)',
        childNote: 'minden kategóriában', // TBC — child price needs confirming
        childPrice: '3 900 Ft',
        howLabel: 'Így foglalhatsz',
        how: [
          'Válaszd ki a kategóriát, a várost és a létszámot.',
          'Küldd el a foglalást — ingyenes és nem kötelező érvényű.',
          'E-mailben visszaigazoljuk, és kapsz egy foglalási azonosítót.',
          'A jegyet a helyszínen fizeted ki az előadás előtt: készpénzzel, bankkártyával vagy SZÉP-kártyával.',
        ],
        tiers: [
          {
            name: 'II. hely',
            price: '5 900 Ft',
            desc: 'A teljes élmény a lelátóról.',
            perks: ['Teljes rálátás a porondra', 'Családias hangulat', 'Kedvezményes gyermekjegy'],
          },
          {
            name: 'I. hely',
            price: '8 900 Ft',
            desc: 'A varázslat egy karnyújtásnyira.',
            perks: [
              'Számozott szék a porond mellett',
              'Soron kívüli beléptetés',
              'Műsorfüzet ajándékba',
            ],
          },
          {
            name: 'VIP páholy',
            price: '12 900 Ft',
            desc: 'A legkülönlegesebb este, privát páholyban.',
            perks: ['Számozott páholy 4–6 főnek', 'Üdvözlőital', 'Találkozás az artistákkal'],
          },
        ],
      },
      faq: {
        label: '06 · Kérdések',
        title: 'Gyakori kérdések',
        items: [
          {
            q: 'Meddig tart az előadás?',
            a: 'Körülbelül két óráig, egy 15 perces szünettel, amikor felkeresheted a büfét és a cirkusz ajándékboltját.',
          },
          {
            q: 'Hogyan tudok jegyet foglalni?',
            a: 'Az oldalon keresztül foglalhatsz helyet: kiválasztod a kategóriát, a várost és a jegyek számát, mi pedig e-mailben visszaigazoljuk a foglalást egy azonosítóval. A jegy árát a helyszínen, az előadás előtt kell kifizetni — online fizetés nincs, és letölthető jegyet sem küldünk.',
          },
          {
            q: 'Mi történik, ha mégsem tudok elmenni?',
            a: 'A foglalás ingyenes és nem kötelező érvényű. Ha közbejön valami, elég egy e-mail vagy egy telefon, és töröljük a foglalásod — így a helyet másnak tudjuk adni.',
          },
          {
            q: 'Hány éves kortól ajánljátok?',
            a: 'Az előadás minden korosztálynak szól, de a legkisebbeknek érdemes tudni, hogy a műsorban erős fények, sötét pillanatok, hangos zene és tűzzel dolgozó produkció is szerepel. A 2 év alatti gyermekek a szülő ölében ingyen léphetnek be; ettől az életkortól kezdve saját jegy szükséges.',
          },
          {
            q: 'Van csoportos vagy iskolai kedvezmény?',
            a: 'Igen. A legalább 20 fős csoportok, a nagycsaládosok és a 65 év felettiek 20% kedvezményt kapnak. Iskolai és óvodai csoportoknak külön ajánlatot készítünk — írj nekünk, és egyeztetünk egy időpontot.',
          },
          {
            q: 'Akadálymentes a sátor?',
            a: 'Igen. A sátor kerekesszékkel is megközelíthető, és fenntartott helyeket biztosítunk. Jelezd a foglaláskor, és csapatunk segít a helyszínen.',
          },
          {
            q: 'Mi a helyzet a hideggel és az esővel?',
            a: 'A sátor zárt és fűtött, így az előadás minden időjárásban megtartjuk. Hűvösebb estéken érdemes egy pulóvert hozni.',
          },
          {
            q: 'Van büfé?',
            a: 'Igen. A sátorban popcorn, vattacukor és üdítők várnak az előadás előtt és a szünetben.',
          },
          {
            q: 'Bérelhető a cirkusz rendezvényre?',
            a: 'Igen. A sátor elérhető céges rendezvényekre, születésnapokra és privát ünnepségekre. Írd meg az ötleted, és megvalósítjuk.',
          },
        ],
      },
      contact: {
        label: '07 · Kapcsolat',
        title1: 'Beszéljünk',
        title2: 'a sátor alatt.',
        sub: 'Csoportok, privát rendezvények, sajtó — vagy egyszerűen csak kedved támadt a cirkuszhoz? Írj nekünk, és 24 órán belül válaszolunk.',
        infoLabel: 'Elérhetőség',
        hours: 'Telefonon hétköznap 9:00–17:00 között érünk rá.', // TBC
        form: {
          name: 'Név',
          namePh: 'A neved',
          email: 'E-mail',
          emailPh: 'te@email.hu',
          message: 'Üzenet',
          messagePh: 'Írd le az ötleted…',
          submit: 'Üzenet küldése',
          hint: 'Megnyílik a levelezőprogramod a kész üzenettel.',
        },
        mapLabel: 'A turné a térképen',
        mapNote: 'Négy város · 2026. szeptember',
        mapHint: 'Vidd az egeret egy állomás fölé a részletekért',
        mapAria:
          'Magyarország térképe az Álom Cirkusz 2026-os turnéjának négy állomásával: Győr, Székesfehérvár, Pécs, Szeged.',
      },
      checkout: {
        title: 'Jegyfoglalás',
        qty: 'Jegyek',
        qtyLess: 'Eggyel kevesebb jegy',
        qtyMore: 'Eggyel több jegy',
        each: 'jegyenként',
        total: 'Összesen',
        cityLabel: 'Város és időpont',
        nameLabel: 'Név',
        namePh: 'A neved',
        emailLabel: 'E-mail',
        emailPh: 'te@email.hu',
        phoneLabel: 'Telefonszám',
        phonePh: '+36 …',
        submit: 'Foglalás elküldése',
        payNote:
          'A foglalás ingyenes és nem kötelező érvényű. A jegyeket a helyszínen, az előadás előtt lehet kifizetni és átvenni — készpénzzel, bankkártyával vagy SZÉP-kártyával.',
        privacy:
          'Az adataidat kizárólag a foglalás visszaigazolására használjuk, és nem adjuk tovább senkinek.',
        success:
          'Köszönjük! Megkaptuk a foglalásod, és hamarosan e-mailben visszaigazoljuk. Találkozunk a sátor alatt. ✶',
        fallbackA: 'Ha nem nyílt meg a levelezőprogramod, írj nekünk ide:',
        fallbackB: 'és lefoglaljuk a helyed.',
        close: 'Bezárás',
      },
      footer: {
        bigline1: 'Készen állsz',
        bigline2: 'a varázslatra?',
        cta: 'Foglald le a helyed',
        contactLabel: 'Kapcsolat',
        email: 'info@alomcirkusz.hu',
        phone: '+36 1 343 9637',
        followLabel: 'Kövess minket',
        siteLabel: 'Menü',
        legal: '© 2026 Álom Cirkusz. Minden jog fenntartva.',
        credit: 'Varázslattal készült',
      },
    },
  },
  en: {
    translation: {
      nav: {
        rolunk: 'About',
        musor: 'The show',
        galeria: 'Gallery',
        turne: 'Tour',
        jegyek: 'Tickets',
        kapcsolat: 'Contact',
        cta: 'Book tickets',
        menu: 'Menu',
        close: 'Close',
      },
      preloader: {
        word: 'ÁLOM CIRKUSZ',
        sub: 'The show is about to begin',
      },
      hero: {
        eyebrow: 'Álom Cirkusz — 2026 Tour · Hungary',
        kicker: 'Acrobatics · Fire · Magic · Laughter',
        l1: 'Live the magic.',
        l2: 'Feel the wonder.',
        l3: 'At Álom Cirkusz.',
        ledeA: 'A modern travelling circus with world-class performers under one big top.',
        ledeEm: 'Two hours of light, live music and wonder for the whole family.',
        tagline: 'where dreams come alive',
        ctaPrimary: 'Book tickets',
        ctaSecondary: 'Discover the show',
        capLabel: 'The show',
        scroll: 'Scroll',
        coords: '47.5° N — 19.0° E',
        place: 'Hungary · 2026 Tour',
        marquee: [
          'Live orchestra at every show',
          'Two hours of pure magic',
          'Fun for the whole family',
          'International artists',
          '2026 tour across Hungary',
        ],
      },
      about: {
        label: '01 · About',
        h1: 'At Álom Cirkusz,',
        hAccent1: 'the impossible',
        h2: 'becomes',
        hAccent2: 'unforgettable.',
        body1:
          'Álom Cirkusz is a modern travelling circus touring Hungary and creating moments that stay with you. A show where timeless circus arts meet contemporary staging: light, live music and world-class performers under one big top.',
        body2:
          'Every performance is a two-hour journey through impossible worlds, made to make the young — and the young at heart — dream.',
        imgCaption: 'The big top · 2026 Tour',
        stats: [
          { value: 25, suffix: '+', label: 'Artists in the ring' },
          { value: 120, suffix: '', label: 'Minutes of show' },
          { value: 4, suffix: '', label: 'Cities on the tour' },
          { value: 1200, suffix: '', label: 'Seats under the big top' },
        ],
      },
      acts: {
        label: '02 · The show',
        title: 'The acts',
        intro: 'Six acts. One heartbeat.',
        hint: 'Scroll to cross the ring',
        orchestra:
          'Every act is accompanied by a live orchestra — light, music and movement all born in the same moment.',
        list: [
          {
            name: 'Égi repülés',
            type: 'Aerial acrobatics',
            desc: 'Trapeze artists and aerialists defying gravity ten metres above the ring.',
          },
          {
            name: 'Tűztánc',
            type: 'Fire show',
            desc: 'Flames dancing to the rhythm of drums in a hypnotic choreography.',
          },
          {
            name: 'Holdfényes nevetés',
            type: 'Clowns',
            desc: 'Classic humour with a brand-new soul: guaranteed laughter for all ages.',
          },
          {
            name: 'Lehetetlen egyensúly',
            type: 'Hand to hand',
            desc: 'Two bodies, a single point of balance, and a thousand spectators holding their breath.',
          },
          {
            name: 'Éjszakai varázslat',
            type: 'Magic & illusion',
            desc: 'Appearances, disappearances and a finale no one has ever managed to explain.',
          },
          {
            name: 'A nagy finálé',
            type: 'Full company',
            desc: 'The whole troupe in the ring for a closing number that lights up the big top.',
          },
        ],
      },
      gallery: {
        label: '03 · Gallery',
        title: 'Moments under the big top',
        hint: 'View',
      },
      night: {
        label: 'Interlude · The night',
        title: 'When the lights go out,',
        titleEm: 'the magic stays awake.',
        hint: 'Move the light to reveal what the audience never sees',
        hintTouch: 'The light wanders on its own…',
        ghost: 'BACKSTAGE',
        captions: ['The midnight rehearsal', 'The calm before the roar', 'The lights that wait'],
      },
      tour: {
        label: '04 · Tour',
        title: '2026 tour',
        tickets: 'Book',
        note: 'Exact showtimes are being confirmed — we will update this page shortly. Follow us so you don’t miss a thing.',
        onsale: 'Bookable',
        soon: 'Coming soon',
        timesLabel: 'Showtimes',
        rows: [
          {
            city: 'Győr',
            venue: 'Venue to be confirmed',
            dates: 'Sep 2–6',
            times: 'Mon–Fri 6pm · Sat 3pm, 6pm · Sun 11am, 3pm',
            status: 'onsale',
          },
          {
            city: 'Székesfehérvár',
            venue: 'Venue to be confirmed',
            dates: 'Sep 9–13',
            times: 'Mon–Fri 6pm · Sat 3pm, 6pm · Sun 11am, 3pm',
            status: 'onsale',
          },
          {
            city: 'Pécs',
            venue: 'Venue to be confirmed',
            dates: 'Sep 16–20',
            times: 'Mon–Fri 6pm · Sat 3pm, 6pm · Sun 11am, 3pm',
            status: 'soon',
          },
          {
            city: 'Szeged',
            venue: 'Venue to be confirmed',
            dates: 'Sep 23–27',
            times: 'Mon–Fri 6pm · Sat 3pm, 6pm · Sun 11am, 3pm',
            status: 'soon',
          },
        ],
      },
      tickets: {
        label: '05 · Tickets',
        title: 'Live the magic',
        subtitle: 'Choose how you want to live the night. Children under 2 enter free.',
        cta: 'Book',
        popular: 'Most popular',
        from: 'From',
        note: '20% off for groups of 20 or more, large families and seniors over 65.',
        childLabel: 'Child ticket (2–14)',
        childNote: 'in every category',
        childPrice: 'HUF 3,900',
        howLabel: 'How booking works',
        how: [
          'Choose a category, a city and how many tickets you need.',
          'Send the booking — it is free and non-binding.',
          'We confirm by email and send you a booking reference.',
          'You pay at the venue before the show: cash, bank card or SZÉP card.',
        ],
        tiers: [
          {
            name: 'Second tier',
            price: 'HUF 5,900',
            desc: 'The full experience from the stands.',
            perks: ['Full view of the ring', 'Family atmosphere', 'Reduced child ticket'],
          },
          {
            name: 'First tier',
            price: 'HUF 8,900',
            desc: 'The magic, one step from the ring.',
            perks: ['Numbered seat by the ring', 'Priority entry', 'Show programme included'],
          },
          {
            name: 'VIP box',
            price: 'HUF 12,900',
            desc: 'The most special night, in a private box.',
            perks: ['Numbered box for 4–6 people', 'Welcome drink', 'Meet the artists'],
          },
        ],
      },
      faq: {
        label: '06 · Questions',
        title: 'Frequently asked questions',
        items: [
          {
            q: 'How long is the show?',
            a: 'Around two hours, with a 15-minute interval when you can drop by the café and the circus shop.',
          },
          {
            q: 'How do I book a ticket?',
            a: 'You can reserve seats on this site: choose a category, a city and the number of tickets, and we confirm your booking by email with a reference. Tickets are paid for at the venue before the show — there is no online payment and no downloadable ticket.',
          },
          {
            q: 'What if I cannot make it after all?',
            a: 'Booking is free and non-binding. If something comes up, one email or phone call is enough and we will cancel it — that way we can offer the seat to someone else.',
          },
          {
            q: 'What age is it suitable for?',
            a: 'The show is made for every age, but for the youngest guests it is worth knowing that it includes bright lights, dark moments, loud music and an act working with fire. Children under 2 enter free on a parent’s lap; from that age they need their own ticket.',
          },
          {
            q: 'Are there group or school discounts?',
            a: 'Yes. Groups of 20 or more, large families and seniors over 65 get 20% off. We put together a separate offer for school and nursery groups — write to us and we will arrange a date.',
          },
          {
            q: 'Is the big top accessible?',
            a: 'Yes. The big top is wheelchair accessible and we keep reserved spaces. Let us know when you book and our team will help you on site.',
          },
          {
            q: 'What about cold or rain?',
            a: 'The big top is enclosed and heated, so the show goes ahead in any weather. On cooler evenings it is worth bringing a jumper.',
          },
          {
            q: 'Is there a café?',
            a: 'Yes. Inside the big top you’ll find popcorn, candy floss and drinks before the show and during the interval.',
          },
          {
            q: 'Can the circus be hired for events?',
            a: 'Yes. The big top is available for corporate events, birthdays and private celebrations. Tell us your idea and we’ll make it real.',
          },
        ],
      },
      contact: {
        label: '07 · Contact',
        title1: "Let's talk",
        title2: 'under the big top.',
        sub: 'Groups, private events, press — or simply in the mood for circus? Write to us and we’ll reply within 24 hours.',
        infoLabel: 'Information',
        hours: 'We answer the phone on weekdays between 9:00 and 17:00.',
        form: {
          name: 'Name',
          namePh: 'Your name',
          email: 'Email',
          emailPh: 'you@email.com',
          message: 'Message',
          messagePh: 'Tell us your idea…',
          submit: 'Send message',
          hint: 'Your email app will open with the message ready.',
        },
        mapLabel: 'The tour on the map',
        mapNote: 'Four cities · September 2026',
        mapHint: 'Hover a stop for the details',
        mapAria:
          'Map of Hungary showing the four stops on the Álom Cirkusz 2026 tour: Győr, Székesfehérvár, Pécs and Szeged.',
      },
      checkout: {
        title: 'Book tickets',
        qty: 'Tickets',
        qtyLess: 'One ticket fewer',
        qtyMore: 'One ticket more',
        each: 'per ticket',
        total: 'Total',
        cityLabel: 'City & dates',
        nameLabel: 'Name',
        namePh: 'Your name',
        emailLabel: 'Email',
        emailPh: 'you@email.com',
        phoneLabel: 'Phone',
        phonePh: '+36 …',
        submit: 'Send booking request',
        payNote:
          'Booking is free and non-binding. Tickets are paid for and collected at the venue before the show — cash, bank card or SZÉP card.',
        privacy:
          'We use your details only to confirm the booking, and we never pass them on to anyone.',
        success:
          'Thank you! We have your booking and will confirm it by email shortly. See you under the big top. ✶',
        fallbackA: 'If your email app did not open, write to us at',
        fallbackB: 'and we’ll reserve your seats.',
        close: 'Close',
      },
      footer: {
        bigline1: 'Ready for',
        bigline2: 'the magic?',
        cta: 'Reserve your seat',
        contactLabel: 'Contact',
        email: 'info@alomcirkusz.hu',
        phone: '+36 1 343 9637',
        followLabel: 'Follow us',
        siteLabel: 'Menu',
        legal: '© 2026 Álom Cirkusz. All rights reserved.',
        credit: 'Made with magic',
      },
    },
  },
}

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ac-lang') : null

const syncLang = (lng) => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lng
  try {
    localStorage.setItem('ac-lang', lng)
  } catch {
    /* private mode */
  }
}

// Registered BEFORE init: with inline resources i18next loads synchronously,
// so a listener added afterwards never sees the first languageChanged event
// and a returning English visitor would be served under <html lang="hu">.
i18n.on('languageChanged', syncLang)

i18n.use(initReactI18next).init({
  resources,
  lng: saved || 'hu',
  fallbackLng: 'hu',
  interpolation: { escapeValue: false },
})

syncLang(i18n.language)

export default i18n
