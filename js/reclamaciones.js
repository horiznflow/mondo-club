/* ============================================================
   MONDO CLUB — Libro de Reclamaciones virtual
   Depends on: js/data.js (CONTACT, LEGAL)
   Sends the claim sheet to CONTACT.claimsEndpoint when it is set (JSON POST);
   otherwise opens the visitor's e-mail with the sheet addressed to CONTACT.email.
   The visitor always gets an on-screen copy they can print or save as PDF.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const pad = (n) => String(n).padStart(2, '0');

  // Sheet number and date. A strictly sequential number needs a backend; until then the
  // number is built from the date and time, which keeps it unique and traceable.
  const now = new Date();
  const number = 'LR-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
  const dateTxt = pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  $('#lr-num').textContent = number;
  $('#lr-date').textContent = dateTxt;

  const form = $('#claim-form');
  const REQUIRED = ['name', 'doc', 'address', 'phone', 'email', 'desc', 'detail', 'request'];

  function setInvalid(el, bad) {
    if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  function validate() {
    let first = null;
    REQUIRED.forEach((n) => {
      const el = form.elements[n];
      let bad = !el.value.trim();
      if (n === 'email' && !bad) bad = !EMAIL_RE.test(el.value.trim());
      setInvalid(el, bad);
      if (bad && !first) first = el;
    });
    const acc = form.elements.accept;
    if (!acc.checked && !first) first = acc;
    const err = $('#form-err');
    if (first) {
      err.textContent = !acc.checked && first === acc
        ? 'Marca la casilla de declaración para enviar la hoja.'
        : 'Completa los campos marcados en rojo. Revisa que el correo tenga el formato nombre@dominio.com.';
      err.hidden = false;
      first.focus();
      return false;
    }
    err.hidden = true;
    return true;
  }

  function collect() {
    const f = form.elements;
    return {
      number: number, date: dateTxt,
      provider: LEGAL.name, ruc: LEGAL.ruc, establishment: 'Mondo Club · ' + LEGAL.address,
      name: f.name.value.trim(), docType: f.docType.value, doc: f.doc.value.trim(),
      address: f.address.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(),
      guardian: f.guardian.value.trim(),
      good: f.good.value, amount: f.amount.value.trim(), when: f.when.value, desc: f.desc.value.trim(),
      kind: f.kind.value, detail: f.detail.value.trim(), request: f.request.value.trim()
    };
  }

  function rows(d) {
    return [
      ['Hoja de reclamación N.°', d.number], ['Fecha', d.date],
      ['Proveedor', d.provider + ' · RUC ' + d.ruc], ['Establecimiento', d.establishment],
      ['Consumidor', d.name], ['Documento', d.docType + ' ' + d.doc], ['Domicilio', d.address],
      ['Teléfono', d.phone], ['Correo', d.email]
    ].concat(d.guardian ? [['Padre, madre o apoderado', d.guardian]] : []).concat([
      ['Bien contratado', d.good + ' · ' + d.desc],
      ['Monto reclamado', d.amount ? 'S/ ' + d.amount : '—'],
      ['Fecha del hecho', d.when || '—'],
      ['Tipo', d.kind], ['Detalle', d.detail], ['Pedido', d.request],
      ['Acciones del proveedor', 'Pendiente de respuesta (plazo máximo: 15 días hábiles)']
    ]);
  }

  function mailto(d) {
    const body = rows(d).map((r) => r[0] + ': ' + r[1]).join('\n');
    return 'mailto:' + CONTACT.email +
      '?cc=' + encodeURIComponent(d.email) +
      '&subject=' + encodeURIComponent('Libro de Reclamaciones · ' + d.kind + ' · Hoja ' + d.number) +
      '&body=' + encodeURIComponent(body);
  }

  function showCopy(d, sentOnline) {
    const dl = $('#copy-dl');
    dl.innerHTML = '';
    rows(d).forEach((r) => {
      const dt = document.createElement('dt'); dt.textContent = r[0];
      const dd = document.createElement('dd'); dd.textContent = r[1];
      dl.appendChild(dt); dl.appendChild(dd);
    });
    $('#ok-b').textContent = sentOnline
      ? 'Recibimos tu hoja N.° ' + d.number + '. Enviamos una copia a ' + d.email + '. Te responderemos en un plazo máximo de 15 días hábiles.'
      : 'Se abrió tu correo con la hoja N.° ' + d.number + ' dirigida a ' + CONTACT.email + ' y con copia para ti. Envía ese correo para completar el registro. Te responderemos en un plazo máximo de 15 días hábiles.';
    form.hidden = true;
    $('#copy').hidden = false;
    $('#copy-h').focus();
  }

  form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid')) setInvalid(e.target, !e.target.value.trim()); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const d = collect();
    if (CONTACT.claimsEndpoint) {
      try {
        const r = await fetch(CONTACT.claimsEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
        if (r.ok) { showCopy(d, true); return; }
      } catch (err) { /* falls back to e-mail below */ }
    }
    window.location.href = mailto(d);
    showCopy(d, false);
  });

  $('#btn-print').addEventListener('click', () => window.print());
})();
