/* Mondo Club — fills the business identity and contact links on the legal pages from js/data.js. */
(function () {
  'use strict';
  document.querySelectorAll('[data-legal]').forEach((el) => {
    const k = el.dataset.legal;
    if (k === 'name' || k === 'ruc' || k === 'address') el.textContent = LEGAL[k];
    if (k === 'email') { el.textContent = CONTACT.email; el.href = 'mailto:' + CONTACT.email; }
    if (k === 'whatsapp') { el.textContent = CONTACT.whatsappLabel; el.href = 'https://wa.me/' + CONTACT.whatsapp; }
  });
})();
