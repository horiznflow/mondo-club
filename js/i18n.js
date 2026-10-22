/* Mondo Club — ES / EN copy. Brand taglines stay in English in both languages. */
'use strict';

const I18N = {
  es: {
    docTitle: 'Mondo Club · Bar oculto con música en vivo en Miraflores',
    a11y: { skip: 'Saltar al contenido', home: 'Mondo Club, ir al inicio', nav: 'Navegación principal', mobileNav: 'Menú', lang: 'Idioma', menuOpen: 'Abrir menú', menuClose: 'Cerrar menú', newTab: '(se abre en una pestaña nueva)', bands: 'Bandas que ya tocaron en Mondo' },
    nav: { agenda: 'Agenda', access: 'Cómo entrar', exp: 'Experiencia', loc: 'Ubicación', list: 'Entrar a la lista' },
    hero: {
      kicker: 'Bar oculto bajo The Coffee Shot · Miraflores',
      lede: 'Bandas en vivo de rock y pop de los 80 y 90, DJ sets y una barra que no se apaga hasta las 3 a. m.',
      cta1: 'Ver la agenda', cta2: 'Reservar mesa por WhatsApp',
      hours: 'Viernes y sábado · 9 p. m. – 3 a. m.',
      next: 'Próxima noche', none: 'Nueva programación muy pronto', noneLink: 'Síguenos en Instagram'
    },
    bandsT: 'Ya sonaron en Mondo',
    mq: ['Mondo Club', 'En vivo', 'Rock 80s & 90s', 'DJ sets'],
    welcome: {
      eyebrow: 'Bienvenido al sótano', h1: 'Un club', h2: 'para los que saben.',
      p: 'Bajas una escalera en Calle Berlín y la noche cambia: bandas tributo y en vivo, un DJ que sigue la fiesta después del show y cócteles que te acompañan hasta el cierre.',
      facts: ['Bandas en vivo', 'DJ after show', 'Coctelería', 'Mesas y box'],
      img: 'Video: bandas en vivo, público y el letrero de neón de Mondo'
    },
    agenda: {
      eyebrow: 'Agenda', title: 'Próximas noches', more: 'Ver más en Instagram',
      friT: 'Viernes', friN: 'Selected Nights', friP: 'DJ sets: disco, pop y rock en español. Música que define la noche.',
      satT: 'Sábado', satN: 'Live at Mondo', satP: 'Banda en vivo desde las 9 p. m. y after show con DJ.',
      live: 'En vivo', dj: '+ DJ', list: 'Entrar a la lista', table: 'Reservar mesa',
      flyer: 'Flyer de {name}', emptyT: 'Nueva programación muy pronto', emptyP: 'Estamos armando las próximas noches. Mira los anuncios en nuestro Instagram.'
    },
    stmt: { a: 'Son los clásicos que', b: 'hicieron historia.', c: 'Y aquí suenan en vivo.', genres: 'Rock · Pop · New wave · Rock en español' },
    access: {
      eyebrow: 'Cómo entrar', h1: 'Tres formas de', h2: 'vivir la noche',
      a: { t: 'Lista de ingreso', p: 'Regístrate gratis para la noche que quieras y entra con tu nombre.', li: ['Sujeto a aforo', 'Mayores de 18 · con DNI', 'Consumo mínimo según evento'], cta: 'Entrar a la lista' },
      b: { t: 'Mesa reservada', p: 'Asegura una mesa para tu grupo. Las reservas se hacen directo por WhatsApp.', li: ['Consumo mínimo desde S/ 35 por persona', 'Confirmación por WhatsApp', 'Llega temprano: la mesa se guarda por tiempo limitado'], cta: 'Reservar por WhatsApp' },
      c: { t: 'Box VIP', p: 'Para celebrar en grande: box libre con espumante y piqueo de cortesía.', li: ['Ideal para cumpleaños y grupos', 'Disponibilidad limitada', 'Consulta precios por WhatsApp'], cta: 'Consultar box' }
    },
    gallery: {
      eyebrow: 'Así se vive', h1: 'Tonight', h2: 'at Mondo',
      img: ['Una pareja sonríe con botellas en la mano frente a la pared verde de Mondo', 'Un invitado con casaca roja posa frente a la barra', 'Una pareja brinda y sonríe durante la noche en Mondo', 'Cuatro amigas brindan juntas frente a la pared verde de Mondo']
    },
    loc: {
      eyebrow: 'Cómo llegar', h1: 'Bajo Calle', h2: 'Berlín',
      addrL: 'Dirección', addrS: 'En el sótano de The Coffee Shot',
      hoursL: 'Horario', hoursV: 'Viernes y sábado', hoursS: '9:00 p. m. – 3:00 a. m.',
      resL: 'Reservas', resS: 'Mesas, box y consultas',
      maps: 'Abrir en Google Maps', map: 'Mapa de Calle Berlín 147, Miraflores'
    },
    foot: {
      night: 'Noche', social: 'Redes', legal: 'Legal', agenda: 'Agenda', list: 'Entrar a la lista', table: 'Reservar mesa', loc: 'Cómo llegar',
      terms: 'Términos y condiciones', priv: 'Política de privacidad', book: 'Libro de Reclamaciones',
      copy: '© 2026 Mondo Club · [Razón social y RUC por confirmar]', age: 'Solo mayores de 18 años · Toma con responsabilidad'
    },
    wa: { general: 'Hola Mondo, quiero reservar una mesa.', event: 'Hola Mondo, quiero reservar una mesa para {name} ({date}).', box: 'Hola Mondo, quiero consultar por un box VIP.' },
    daysS: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
  },
  en: {
    docTitle: 'Mondo Club · Hidden bar with live music in Miraflores',
    a11y: { skip: 'Skip to content', home: 'Mondo Club, go to top', nav: 'Main navigation', mobileNav: 'Menu', lang: 'Language', menuOpen: 'Open menu', menuClose: 'Close menu', newTab: '(opens in a new tab)', bands: 'Bands that have played at Mondo' },
    nav: { agenda: 'Line-up', access: 'Get in', exp: 'Experience', loc: 'Location', list: 'Get on the list' },
    hero: {
      kicker: 'Hidden bar below The Coffee Shot · Miraflores',
      lede: '80s and 90s rock and pop bands live, DJ sets and a bar that keeps going until 3 am.',
      cta1: 'See the line-up', cta2: 'Book a table on WhatsApp',
      hours: 'Friday and Saturday · 9 pm – 3 am',
      next: 'Next night', none: 'New line-up coming soon', noneLink: 'Follow us on Instagram'
    },
    bandsT: 'Already played at Mondo',
    mq: ['Mondo Club', 'Live', '80s & 90s rock', 'DJ sets'],
    welcome: {
      eyebrow: 'Welcome to the basement', h1: 'A club', h2: 'for those who know.',
      p: 'Walk down a staircase on Calle Berlín and the night changes: tribute and live bands, a DJ who keeps the party going after the show, and cocktails until closing time.',
      facts: ['Live bands', 'DJ after show', 'Cocktails', 'Tables & boxes'],
      img: 'Video: live bands, the crowd and the Mondo neon sign'
    },
    agenda: {
      eyebrow: 'Line-up', title: 'Upcoming nights', more: 'More on Instagram',
      friT: 'Friday', friN: 'Selected Nights', friP: 'DJ sets: disco, pop and Spanish-language rock. Music that defines the night.',
      satT: 'Saturday', satN: 'Live at Mondo', satP: 'A live band from 9 pm and an after show with a DJ.',
      live: 'Live', dj: '+ DJ', list: 'Get on the list', table: 'Book a table',
      flyer: '{name} flyer', emptyT: 'New line-up coming soon', emptyP: 'We are putting the next nights together. Check our Instagram for announcements.'
    },
    stmt: { a: 'These are the classics that', b: 'made history.', c: 'And here they play live.', genres: 'Rock · Pop · New wave · Spanish-language rock' },
    access: {
      eyebrow: 'Get in', h1: 'Three ways to', h2: 'live the night',
      a: { t: 'Guest list', p: 'Sign up for free for the night you want and get in with your name.', li: ['Subject to capacity', '18+ · bring your ID', 'Minimum spend depends on the event'], cta: 'Get on the list' },
      b: { t: 'Table booking', p: 'Save a table for your group. Bookings are made directly on WhatsApp.', li: ['Minimum spend from S/ 35 per person', 'Confirmed on WhatsApp', 'Arrive early: tables are held for a limited time'], cta: 'Book on WhatsApp' },
      c: { t: 'VIP box', p: 'To celebrate big: open box with sparkling wine and complimentary bites.', li: ['Great for birthdays and groups', 'Limited availability', 'Ask for prices on WhatsApp'], cta: 'Ask about boxes' }
    },
    gallery: {
      eyebrow: 'How it feels', h1: 'Tonight', h2: 'at Mondo',
      img: ['A couple smiling with bottles in hand in front of the Mondo green wall', 'A guest in a red jacket posing in front of the bar', 'A couple toasting and smiling during a night at Mondo', 'Four friends toasting together in front of the Mondo green wall']
    },
    loc: {
      eyebrow: 'Getting here', h1: 'Below Calle', h2: 'Berlín',
      addrL: 'Address', addrS: 'In the basement of The Coffee Shot',
      hoursL: 'Opening hours', hoursV: 'Friday and Saturday', hoursS: '9:00 pm – 3:00 am',
      resL: 'Bookings', resS: 'Tables, boxes and questions',
      maps: 'Open in Google Maps', map: 'Map of Calle Berlín 147, Miraflores'
    },
    foot: {
      night: 'Night', social: 'Social', legal: 'Legal', agenda: 'Line-up', list: 'Get on the list', table: 'Book a table', loc: 'Get directions',
      terms: 'Terms and conditions (ES)', priv: 'Privacy policy (ES)', book: 'Libro de Reclamaciones (complaints book)',
      copy: '© 2026 Mondo Club · [Company name and RUC TBC]', age: '18+ only · Please drink responsibly'
    },
    wa: { general: 'Hi Mondo, I would like to book a table.', event: 'Hi Mondo, I would like to book a table for {name} ({date}).', box: 'Hi Mondo, I would like to ask about a VIP box.' },
    daysS: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  }
};
