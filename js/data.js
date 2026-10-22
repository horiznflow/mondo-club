/* Mondo Club — content data: contact channels and the event agenda. */
'use strict';

// Real channels taken from @mondo.club.lima (bio link and latest posts).
const CONTACT = {
  listUrl: 'https://forms.gle/h2JjWmoWEDdMUpsX8',
  whatsapp: '51965077910', // [por confirmar] — latest posts use 965 077 910, an older flyer 961 360 146
  whatsappLabel: '965 077 910',
  instagram: 'https://www.instagram.com/mondo.club.lima/',
  facebook: 'https://www.facebook.com/mondoclublima',
  email: 'contacto@nexogourmet.com', // contact email listed on the Facebook page [por confirmar para reclamos]
  // Opens Google Maps with the destination set, ready for "Directions".
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Calle+Berl%C3%ADn+147%2C+Miraflores%2C+Lima%2C+Per%C3%BA',
  // Optional: a form service URL (e.g. Formspree / Google Apps Script) that receives the
  // Libro de Reclamaciones as JSON and emails the copy. Empty = the claim is sent by e-mail (mailto).
  claimsEndpoint: ''
};

// Business identity required on the Libro de Reclamaciones and legal pages.
const LEGAL = {
  name: '[Razón social por confirmar]',
  ruc: '[RUC por confirmar]',
  address: 'Calle Berlín 147, Miraflores, Lima, Perú'
};

// Agenda. Past dates are hidden automatically (Lima time), so old events can stay here.
// `poster` is the event flyer; `live` / `dj` drive the chips.
const EVENTS = [
  {
    id: 'room-66', date: '2026-10-24', time: '21:00',
    name: 'Room 66',
    sub_es: 'Rock 80s & 90s en vivo · After show con DJ Mao',
    sub_en: '80s & 90s rock live · After show with DJ Mao',
    price_es: 'Entrada S/ 40 · Consumo mín. S/ 35',
    price_en: 'Entry S/ 40 · Min. spend S/ 35',
    poster: 'assets/img/events/room-66.webp',
    live: true, dj: true
  },
  {
    id: 'jarana-y-rock', date: '2026-10-31', time: '21:00',
    name: 'Jarana y Rock',
    sub_es: 'Serenata criolla + Onda Rocks en vivo + DJ · Noche de Halloween',
    sub_en: 'Criollo serenade + Onda Rocks live + DJ · Halloween night',
    price_es: 'Preventa S/ 50 hasta el mié 28 · Puerta S/ 65 · Consumo mín. S/ 35',
    price_en: 'Presale S/ 50 until Wed 28 · Door S/ 65 · Min. spend S/ 35',
    poster: 'assets/img/events/jarana-y-rock.webp',
    live: true, dj: true
  }
];

// Bands that have played at Mondo (marquee).
const BANDS = ['Room 66', 'Onda Rocks', 'Orbital', 'Full House', 'Recover', 'Velvet', 'Cera Soda'];
