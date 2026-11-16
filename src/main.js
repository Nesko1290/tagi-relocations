// ---------- Neighbourhood data (indicative — to be validated by Tagi) ----------
const HOODS = [
  { id: 'versoix', name: 'Versoix', x: 334, y: 128, side: 'left', tags: ['lake', 'family', 'value', 'schools'],
    commute: '15–20 min · train', rent: 'CHF 2,800 – 3,800', for: 'Families & school runs',
    tag: 'Lakeside town, home of the Collège du Léman.',
    text: "A relaxed lakeside town with a beach, a harbour and the Collège du Léman. Frequent trains reach Sécheron station, a short walk from International Geneva. It is also where Maureen lives — she knows it street by street." },
  { id: 'genthod', name: 'Genthod', x: 318, y: 166, side: 'left', tags: ['walk', 'lake', 'family', 'schools'],
    commute: '15 min · train or car', rent: 'CHF 3,500 – 5,500', for: 'Families wanting calm',
    tag: 'A quiet lakeside village next to International Geneva.',
    text: 'A small, peaceful commune between Bellevue and Versoix, with lakeside homes and its own train station. Close to the Geneva English School and the Collège du Léman.' },
  { id: 'bellevue', name: 'Bellevue', x: 298, y: 204, side: 'left', tags: ['lake', 'family', 'walk', 'schools'],
    commute: '10–15 min · train or car', rent: 'CHF 3,200 – 4,800', for: 'Couples & families',
    tag: 'Next to International Geneva, with the lake at the door.',
    text: 'A green commune on the lake road just north of the city, with a train station and quick access to the organisations, the airport and the international schools of the north shore.' },
  { id: 'grand-saconnex', name: 'Grand-Saconnex', x: 176, y: 238, side: 'left', tags: ['walk', 'family', 'value', 'schools'],
    commute: '10 min · bus', rent: 'CHF 2,900 – 4,000', for: 'Short commutes',
    tag: 'Right next to International Geneva.',
    text: 'Modern buildings, good value and the shortest commute to the Palais des Nations and most organisations. Close to the Campus des Nations of the International School. Aircraft noise varies from street to street — something we check for you.' },
  { id: 'meyrin', name: 'Meyrin', x: 96, y: 262, tags: ['value', 'family'],
    commute: '15–20 min · tram or bus', rent: 'CHF 2,500 – 3,500', for: 'More space per franc',
    tag: 'Green, practical, close to CERN and the airport.',
    text: 'A well-equipped town with parks, shops and a direct tram to the city. Popular with international families looking for space at a sensible price.' },
  { id: 'vernier', name: 'Vernier', x: 118, y: 340, tags: ['value', 'family'],
    commute: '20–25 min · bus', rent: 'CHF 2,500 – 3,500', for: 'Families on a budget',
    tag: 'Good value, with green walks along the Rhône.',
    text: "One of Geneva's larger communes, with modern apartment buildings, riverside paths and good transport links. A sensible choice when you need more room for your budget." },
  { id: 'cologny', name: 'Cologny', x: 392, y: 290, tags: ['lake', 'family', 'schools'],
    commute: '20–25 min · car or bus', rent: 'CHF 5,000 – 9,000+', for: 'Senior posts & residences',
    tag: 'Prestigious homes overlooking the lake.',
    text: "Villas and generous apartments with views over the water and the Jet d'Eau, close to the La Grande Boissière campus of the International School. Popular with ambassadors and senior officials; a car makes daily life easier." },
];

const SVG_NS = 'http://www.w3.org/2000/svg';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Map ----------
const pinsG = $('#pins');
const card = $('#hood-card');
let activeId = 'versoix';

HOODS.forEach((h) => {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'pin');
  g.setAttribute('tabindex', '0');
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', `${h.name}: ${h.tag}`);
  g.dataset.id = h.id;
  g.setAttribute('transform', `translate(${h.x} ${h.y})`);
  
  g.innerHTML = `
    <circle r="18" class="ring"></circle>
    <circle r="7" class="p"></circle>
    <circle r="22" fill="transparent"></circle>
    <text x="${h.side === 'left' ? -14 : 14}" y="5" text-anchor="${h.side === 'left' ? 'end' : 'start'}">${h.name}</text>`;
  g.addEventListener('click', () => select(h.id));
  g.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(h.id); }
  });
  pinsG.appendChild(g);
});

function select(id) {
  const h = HOODS.find((x) => x.id === id);
  if (!h) return;
  activeId = id;
  $$('.pin').forEach((p) => {
    p.classList.toggle('active', p.dataset.id === id);
    p.setAttribute('aria-pressed', p.dataset.id === id ? 'true' : 'false');
  });
  $('#hc-name').textContent = h.name;
  $('#hc-tag').textContent = h.tag;
  $('#hc-commute').textContent = h.commute;
  $('#hc-rent').textContent = h.rent;
  $('#hc-for').textContent = h.for;
  $('#hc-text').textContent = h.text;
  const cta = $('#hc-cta');
  cta.innerHTML = `Search in ${h.name.replace(' (VD)', '')} <span aria-hidden="true">→</span>`;
  cta.dataset.area = h.name;
  card.classList.remove('swap');
  void card.offsetWidth; // restart animation
  card.classList.add('swap');
}
select(activeId);

$('#hc-cta').addEventListener('click', (e) => {
  const area = $('#area');
  if (area) area.value = e.currentTarget.dataset.area || '';
});

// Filter chips
$$('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    $$('.chip').forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const visible = HOODS.filter((h) => f === 'all' || h.tags.includes(f));
    $$('.pin').forEach((p) => p.classList.toggle('dim', !visible.some((v) => v.id === p.dataset.id)));
    if (!visible.some((v) => v.id === activeId) && visible[0]) select(visible[0].id);
  });
});

// ---------- Nav ----------
const nav = $('#nav');
const fab = $('.fab');
const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 24);
  const contactTop = $('#contact').getBoundingClientRect().top;
  fab.classList.toggle('show', y > window.innerHeight * 0.8 && contactTop > window.innerHeight * 0.6);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = $('#burger');
const menu = $('#mobile-menu');
const setMenu = (open) => {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.hidden = !open;
  if (open) nav.classList.add('scrolled');
  else onScroll();
};
burger.addEventListener('click', () => setMenu(menu.hidden));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

// Active section in nav
const links = $$('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['approach', 'services', 'neighbourhoods', 'process', 'faq'].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

// ---------- Reveal on scroll (staggered per group) ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    io.unobserve(en.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach((el) => {
  const siblings = $$(':scope > .reveal', el.parentElement);
  el.style.setProperty('--rd', `${Math.min(siblings.indexOf(el), 5) * 0.08}s`);
  io.observe(el);
});

// ---------- FAQ: one open at a time ----------
$$('.accordion details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) $$('.accordion details').forEach((o) => { if (o !== d) o.open = false; });
  });
});

// ---------- Contact form → email draft ----------
const TO = 'contact@tagi-relocations.ch';
const form = $('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let ok = true;
  ['name', 'email'].forEach((k) => {
    const input = form.elements[k];
    const valid = input.value.trim() && (k !== 'email' || /^\S+@\S+\.\S+$/.test(input.value));
    input.classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  const note = $('#form-note');
  if (!ok) {
    note.textContent = 'Please add your name and a valid email address.';
    note.classList.remove('ok');
    form.querySelector('.invalid')?.focus();
    return;
  }
  const lines = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Organisation: ${data.get('org') || '—'}`,
    `Arrival / move date: ${data.get('date') || '—'}`,
    `Household: ${data.get('household')}`,
    `Budget (CHF/month): ${data.get('budget')}`,
    `Preferred area: ${data.get('area') || 'Open to suggestions'}`,
    '',
    `${data.get('msg') || ''}`,
  ];
  const subject = `Apartment search — ${data.get('name')}`;
  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  note.textContent = 'Thank you — your email app should now open with your request ready to send.';
  note.classList.add('ok');
});
$$('input', form).forEach((i) => i.addEventListener('input', () => i.classList.remove('invalid')));

$('#year').textContent = new Date().getFullYear();
