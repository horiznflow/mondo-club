/* ============================================================
   MONDO CLUB — landing behaviour
   Depends on: js/data.js (CONTACT, EVENTS, BANDS), js/i18n.js (I18N)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const LS_KEY = 'mondo-lang';
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
  function fmt(str, vars) { return String(str).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : m)); }
  function lookup(obj, path) { return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj); }
  function todayLima() { try { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function dateParts(iso, t) {
    const p = iso.split('-').map(Number);
    const wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay();
    return { day: t.daysS[wd], dm: String(p[2]).padStart(2, '0') + '.' + String(p[1]).padStart(2, '0') };
  }
  function waLink(text) { return 'https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(text); }
  const ARROW = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7l10 10M17 8v9H8"/></svg>';

  /* ---------- state ---------- */
  let lang = 'es';
  try { const v = window.localStorage.getItem(LS_KEY); if (v === 'es' || v === 'en') lang = v; } catch (e) {}
  const T = () => I18N[lang];

  function upcoming() {
    const today = todayLima();
    return EVENTS.filter((e) => e.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }

  /* ---------- static copy ---------- */
  function renderStatic() {
    const t = T();
    $$('[data-i18n]').forEach((el) => { const v = lookup(t, el.dataset.i18n); if (v != null) el.textContent = v; });
    $$('[data-i18n-aria]').forEach((el) => { const v = lookup(t, el.dataset.i18nAria); if (v != null) el.setAttribute('aria-label', v); });
    $$('[data-i18n-alt]').forEach((el) => { const v = lookup(t, el.dataset.i18nAlt); if (v != null) el.setAttribute('alt', v); });
    $$('[data-i18n-title]').forEach((el) => { const v = lookup(t, el.dataset.i18nTitle); if (v != null) el.setAttribute('title', v); });
    $$('[data-list]').forEach((el) => { el.innerHTML = (lookup(t, el.dataset.list) || []).map((v) => '<li>' + esc(v) + '</li>').join(''); });
    // Contact links: list form and WhatsApp with a pre-filled message in the current language.
    $$('[data-link]').forEach((el) => {
      const k = el.dataset.link;
      if (k === 'list') el.href = CONTACT.listUrl;
      if (k === 'maps') el.href = CONTACT.mapsDirections;
      if (k === 'wa:general') el.href = waLink(t.wa.general);
      if (k === 'wa:box') el.href = waLink(t.wa.box);
    });
    // Announce new-tab links to screen readers.
    $$('a[target="_blank"]').forEach((el) => {
      let s = $('.nt', el);
      if (!s) { s = document.createElement('span'); s.className = 'sr nt'; el.appendChild(s); }
      s.textContent = ' ' + t.a11y.newTab;
    });
    $$('[data-act="lang"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.documentElement.lang = lang;
    document.title = t.docTitle;
  }

  /* ---------- marquees ---------- */
  // The track animates to -50%, so each half must be at least as wide as the viewport
  // or a gap shows on wide screens. Repeat the unit until it is, and derive the duration
  // from the width so the speed stays the same on every screen.
  function fillMarquee(track, unit, pxPerSec) {
    track.innerHTML = unit;
    const unitW = track.scrollWidth || 1;
    const reps = Math.max(1, Math.ceil(window.innerWidth / unitW));
    const half = unit.repeat(reps);
    track.innerHTML = half + half;
    track.style.animationDuration = Math.round((unitW * reps) / pxPerSec) + 's';
  }
  function renderMarquees() {
    const t = T();
    const words = t.mq.map((w, i) => '<span' + (i % 2 ? ' class="o"' : '') + '>' + esc(w) + '</span>' + ARROW).join('');
    const bands = BANDS.map((b, i) => '<span' + (i % 2 ? ' class="o"' : '') + '>' + esc(b) + '</span><i></i>').join('');
    fillMarquee($('#mq'), words, 70);
    fillMarquee($('#bands'), bands, 55);
  }

  /* ---------- next night + agenda ---------- */
  function renderAgenda() {
    const t = T(), evs = upcoming();
    const next = evs[0];
    if (next) {
      const d = dateParts(next.date, t);
      $('#next').innerHTML =
        '<span class="next-l">' + esc(t.hero.next) + '</span>' +
        '<span class="next-d">' + esc(d.day + ' ' + d.dm) + '</span>' +
        '<span class="next-n">' + esc(next.name) + '<small>' + esc(next['sub_' + lang]) + '</small></span>' +
        '<a class="pill p" href="' + esc(CONTACT.listUrl) + '" target="_blank" rel="noopener">' + esc(t.agenda.list) + '</a>';
    } else {
      $('#next').innerHTML = '<span class="next-l">' + esc(t.hero.none) + '</span><a class="pill o" href="' + esc(CONTACT.instagram) + '" target="_blank" rel="noopener">' + esc(t.hero.noneLink) + '</a>';
    }

    const box = $('#agenda-list');
    if (!evs.length) {
      box.className = '';
      box.innerHTML = '<div class="empty"><h3>' + esc(t.agenda.emptyT) + '</h3><p>' + esc(t.agenda.emptyP) + '</p><a class="pill o" href="' + esc(CONTACT.instagram) + '" target="_blank" rel="noopener">@mondo.club.lima ↗</a></div>';
      return;
    }
    box.className = 'ag';
    const rows = evs.map((e, i) => {
      const d = dateParts(e.date, t);
      const flyer = fmt(t.agenda.flyer, { name: e.name });
      const wa = waLink(fmt(t.wa.event, { name: e.name, date: d.day + ' ' + d.dm }));
      return '<article class="row' + (i === 0 ? ' on' : '') + '" data-i="' + i + '">' +
        '<figure class="row-thumb"><img src="' + esc(e.poster) + '" alt="' + esc(flyer) + '" loading="lazy"></figure>' +
        '<p class="row-d"><small>' + esc(d.day) + '</small>' + esc(d.dm) + '</p>' +
        '<div>' +
          '<span class="when">' + esc(d.day + ' ' + d.dm + ' · ' + e.time) + '</span>' +
          '<h3>' + esc(e.name) + '</h3>' +
          '<p>' + esc(e['sub_' + lang]) + '</p>' +
          '<ul class="chips">' +
            (e.live ? '<li class="chip live">' + esc(t.agenda.live) + '</li>' : '') +
            (e.dj ? '<li class="chip dj">' + esc(t.agenda.dj) + '</li>' : '') +
          '</ul>' +
          '<p class="price">' + esc(e['price_' + lang]) + '</p>' +
        '</div>' +
        '<div class="row-acts">' +
          '<a class="pill ' + (i === 0 ? 'p' : 'o') + '" href="' + esc(CONTACT.listUrl) + '" target="_blank" rel="noopener">' + esc(t.agenda.list) + '</a>' +
          '<a class="pill a" href="' + esc(wa) + '" target="_blank" rel="noopener">' + esc(t.agenda.table) + '</a>' +
        '</div>' +
      '</article>';
    }).join('');
    box.innerHTML = '<div class="rows">' + rows + '</div>' +
      '<figure class="poster"><img id="poster-img" src="' + esc(evs[0].poster) + '" alt="' + esc(fmt(t.agenda.flyer, { name: evs[0].name })) + '"></figure>';

    // Flyer preview follows the hovered / focused row (desktop).
    $$('.row', box).forEach((r) => {
      const show = () => {
        const e = evs[+r.dataset.i];
        $$('.row', box).forEach((x) => x.classList.toggle('on', x === r));
        const img = $('#poster-img');
        if (img.getAttribute('src') !== e.poster) { img.src = e.poster; img.alt = fmt(t.agenda.flyer, { name: e.name }); }
      };
      r.addEventListener('mouseenter', show);
      r.addEventListener('focusin', show);
    });
  }

  function render() {
    renderMarquees();
    renderAgenda();
    renderStatic();
  }

  /* ---------- mobile menu ---------- */
  function setMenu(open) {
    const t = T(), btn = $('.burger');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? t.a11y.menuClose : t.a11y.menuOpen);
    // SVG elements have no .hidden property, so toggle the attribute.
    $('.ic-open', btn).toggleAttribute('hidden', open);
    $('.ic-close', btn).toggleAttribute('hidden', !open);
    $('#mmenu').hidden = !open;
  }
  const menuOpen = () => !$('#mmenu').hidden;

  /* ---------- events ---------- */
  function bind() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-act]');
      if (!el) return;
      const act = el.dataset.act;
      if (act === 'lang') {
        lang = el.dataset.lang;
        try { window.localStorage.setItem(LS_KEY, lang); } catch (err) {}
        render(); setMenu(menuOpen());
      }
      if (act === 'toggleMenu') setMenu(!menuOpen());
      if (act === 'closeMenu') setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen()) { setMenu(false); $('.burger').focus(); }
    });
    try { window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); }); } catch (e) {}
    // Refill the marquees when the width changes (rotation, resize) and once the display font has loaded.
    let lastW = window.innerWidth, rt = 0;
    window.addEventListener('resize', () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(rt); rt = setTimeout(renderMarquees, 200);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderMarquees);
  }

  /* ---------- hero video (skipped for reduced motion / data saver) ---------- */
  function setupVideo() {
    let reduce = false, save = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    try { save = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}
    if (reduce || save) return;
    const v = document.createElement('video');
    v.src = 'assets/video/hero.mp4';
    v.poster = 'assets/img/hero-plate.webp';
    v.preload = 'metadata';
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.addEventListener('playing', () => v.classList.add('on'));
    v.addEventListener('error', () => v.remove());
    $('#hero-media').appendChild(v);
    try { const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
  }

  /* ---------- "Bienvenido al sótano" video: loads near the viewport, plays only while visible ---------- */
  function setupWelcomeVideo() {
    const v = $('.welcome-vid');
    if (!v) return;
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (reduce || typeof window.IntersectionObserver !== 'function') return; // the poster stays as a still image
    v.muted = true; v.defaultMuted = true;
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    new IntersectionObserver((en) => {
      en.forEach((x) => {
        if (x.isIntersecting) {
          if (!v.src) { v.src = v.dataset.src; v.preload = 'auto'; }
          play();
        } else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: '200px 0px' }).observe(v);
  }

  /* ---------- scroll reveal ---------- */
  function setupReveal() {
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (reduce || typeof window.IntersectionObserver !== 'function') return;
    document.body.classList.add('rv-on');
    const io = new IntersectionObserver((en) => {
      en.forEach((x) => { if (x.isIntersecting) { x.target.setAttribute('data-in', ''); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    $$('.rv').forEach((el) => io.observe(el));
  }

  /* ---------- init ---------- */
  bind();
  render();
  setMenu(false);
  setupVideo();
  setupWelcomeVideo();
  setupReveal();
})();
