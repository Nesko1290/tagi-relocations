// Maureen's recommended communes. Commutes and rents are indicative — to be validated by Maureen.
const COMMUNES = [
  { id: 'grand-saconnex', name: 'Grand-Saconnex', x: 176, y: 238, side: 'left',
    commute: '10 min · bus', rent: 'CHF 2,900 – 4,000', for: 'Short commutes',
    tag: 'Right next to International Geneva.',
    text: 'Modern buildings, good value and the shortest commute to the Palais des Nations and most organisations. Close to the Campus des Nations of the International School. Aircraft noise varies from street to street — Maureen checks it for you.' },
  { id: 'petit-saconnex', name: 'Petit-Saconnex', x: 204, y: 300, side: 'left',
    commute: '5–15 min · on foot or bus', rent: 'CHF 3,000 – 4,200', for: 'Families & diplomats',
    tag: 'Green and residential, minutes from the Palais.',
    text: 'Leafy avenues, parks and many permanent missions. A short walk or bus ride to most organisations, and close to the Campus des Nations of the International School.' },
  { id: 'bellevue', name: 'Bellevue', x: 298, y: 204, side: 'left',
    commute: '10–15 min · train or car', rent: 'CHF 3,200 – 4,800', for: 'Couples & families',
    tag: 'Next to International Geneva, with the lake at the door.',
    text: 'A green commune on the lake road just north of the city, with a train station and quick access to the organisations, the airport and the international schools of the north shore.' },
  { id: 'genthod', name: 'Genthod', x: 318, y: 166, side: 'left',
    commute: '15 min · train or car', rent: 'CHF 3,500 – 5,500', for: 'Families wanting calm',
    tag: 'A quiet lakeside village next to International Geneva.',
    text: 'A small, peaceful commune between Bellevue and Versoix, with lakeside homes and its own train station. Close to the Geneva English School and the Collège du Léman.' },
  { id: 'versoix', name: 'Versoix', x: 334, y: 128, side: 'left',
    commute: '15–20 min · train', rent: 'CHF 2,800 – 3,800', for: 'Families & school runs',
    tag: 'Lakeside town, home of the Collège du Léman.',
    text: "A relaxed lakeside town with a beach, a harbour and the Collège du Léman. Frequent trains reach Sécheron station, a short walk from International Geneva. It is also where Maureen lives — she knows it street by street." },
  { id: 'cologny', name: 'Cologny', x: 392, y: 290,
    commute: '20–25 min · car or bus', rent: 'CHF 5,000 – 9,000+', for: 'Senior posts & residences',
    tag: 'Prestigious homes overlooking the lake.',
    text: "Villas and generous apartments with views over the water and the Jet d'Eau, close to the La Grande Boissière campus of the International School. A car makes daily life easier." },
  { id: 'eaux-vives', name: 'Eaux-Vives', x: 334, y: 352,
    commute: '20–25 min · tram', rent: 'CHF 3,200 – 4,500', for: 'Couples & city lovers',
    tag: 'Lakeside elegance with a village feel.',
    text: 'Handsome buildings, the Parc La Grange, the lakeside promenade and a Léman Express station. Shops, cafés and the old town on foot, and close to the La Grande Boissière campus of the International School.' },
  { id: 'meyrin', name: 'Meyrin', x: 96, y: 262,
    commute: '15–20 min · tram or bus', rent: 'CHF 2,500 – 3,500', for: 'More space per franc',
    tag: 'Green, practical, close to CERN and the airport.',
    text: 'A well-equipped town with parks, shops and a direct tram to the city. Popular with international families looking for space at a sensible price.' },
  { id: 'vernier', name: 'Vernier', x: 118, y: 340,
    commute: '20–25 min · bus', rent: 'CHF 2,500 – 3,500', for: 'Families on a budget',
    tag: 'Good value, with green walks along the Rhône.',
    text: "One of Geneva's larger communes, with modern apartment buildings, riverside paths and good transport links. A sensible choice when you need more room for your budget." },
];

const LANG = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';

// French texts for each commune (same order/ids as above)
const FR = {
  'grand-saconnex': { prep: 'au', commute: '10 min · bus', for: 'Trajets courts',
    tag: 'Juste à côté de la Genève internationale.',
    text: 'Immeubles modernes, bon rapport qualité-prix et le trajet le plus court vers le Palais des Nations et la plupart des organisations. Proche du Campus des Nations de l’École internationale. Le bruit des avions varie d’une rue à l’autre — Maureen le vérifie pour vous.' },
  'petit-saconnex': { prep: 'au', commute: '5–15 min · à pied ou en bus', for: 'Familles et diplomates',
    tag: 'Vert et résidentiel, à quelques minutes du Palais.',
    text: 'Avenues arborées, parcs et nombreuses missions permanentes. À quelques pas ou quelques arrêts de bus de la plupart des organisations, et proche du Campus des Nations de l’École internationale.' },
  bellevue: { prep: 'à', commute: '10–15 min · train ou voiture', for: 'Couples et familles',
    tag: 'À côté de la Genève internationale, le lac à sa porte.',
    text: 'Une commune verte sur la route du lac, juste au nord de la ville, avec une gare et un accès rapide aux organisations, à l’aéroport et aux écoles internationales de la rive droite.' },
  genthod: { prep: 'à', commute: '15 min · train ou voiture', for: 'Familles en quête de calme',
    tag: 'Un village paisible au bord du lac, à côté de la Genève internationale.',
    text: 'Une petite commune tranquille entre Bellevue et Versoix, avec des maisons au bord du lac et sa propre gare. Proche de la Geneva English School et du Collège du Léman.' },
  versoix: { prep: 'à', commute: '15–20 min · train', for: 'Familles et trajets d’école',
    tag: 'Au bord du lac, la ville du Collège du Léman.',
    text: 'Une ville détendue au bord du lac, avec plage, port et le Collège du Léman. Des trains fréquents rejoignent la gare de Sécheron, à quelques pas de la Genève internationale. C’est aussi là que vit Maureen — elle la connaît rue par rue.' },
  cologny: { prep: 'à', commute: '20–25 min · voiture ou bus', for: 'Postes de direction et résidences',
    tag: 'Des demeures de prestige face au lac.',
    text: 'Villas et grands appartements avec vue sur le lac et le Jet d’eau, proches du campus de La Grande Boissière de l’École internationale. Une voiture facilite le quotidien.' },
  'eaux-vives': { prep: 'aux', commute: '20–25 min · tram', for: 'Couples et amoureux de la ville',
    tag: 'L’élégance au bord du lac, avec une âme de village.',
    text: 'De beaux immeubles, le parc La Grange, la promenade du lac et une gare du Léman Express. Commerces, cafés et vieille ville à pied, et proche du campus de La Grande Boissière de l’École internationale.' },
  meyrin: { prep: 'à', commute: '15–20 min · tram ou bus', for: 'Plus d’espace pour votre budget',
    tag: 'Verte, pratique, proche du CERN et de l’aéroport.',
    text: 'Une ville bien équipée, avec parcs, commerces et un tram direct vers le centre. Appréciée des familles internationales qui cherchent de l’espace à un prix raisonnable.' },
  vernier: { prep: 'à', commute: '20–25 min · bus', for: 'Familles attentives au budget',
    tag: 'Bon rapport qualité-prix, promenades vertes le long du Rhône.',
    text: 'L’une des plus grandes communes du canton, avec des immeubles modernes, des chemins au bord du Rhône et de bonnes liaisons. Un choix judicieux quand il faut plus de place pour son budget.' },
};
if (LANG === 'fr') {
  COMMUNES.forEach((c) => Object.assign(c, FR[c.id], { rent: c.rent.replace(/,/g, '’') }));
}

const T = LANG === 'fr' ? {
  toIG: 'Vers la Genève internationale', rent: 'Loyer indicatif', bestFor: 'Idéal pour',
  search: (c) => `Chercher ${c.prep} ${c.name}`,
  openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
  invalid: 'Merci d’indiquer votre nom et une adresse e-mail valide.',
  thanks: 'Merci — votre messagerie devrait s’ouvrir avec votre demande prête à envoyer.',
  subject: (n) => `Recherche de logement — ${n}`,
  body: ['Nom', 'E-mail', 'Organisation', 'Date d’arrivée / de déménagement', 'Ménage', 'Budget (CHF/mois)', 'Commune souhaitée'],
  open: 'Ouvert aux suggestions',
} : {
  toIG: 'To International Geneva', rent: 'Indicative rent', bestFor: 'Best for',
  search: (c) => `Search in ${c.name}`,
  openMenu: 'Open menu', closeMenu: 'Close menu',
  invalid: 'Please add your name and a valid email address.',
  thanks: 'Thank you — your email app should now open with your request ready to send.',
  subject: (n) => `Apartment search — ${n}`,
  body: ['Name', 'Email', 'Organisation', 'Arrival / move date', 'Household', 'Budget (CHF/month)', 'Preferred commune'],
  open: 'Open to suggestions',
};

const NS = 'http://www.w3.org/2000/svg';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Hero: rotating commune ----------
const rot = $('#rot');
const prep = $('#prep');
let wi = 0;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (rot && !reduce) {
  setInterval(() => {
    rot.classList.add('out');
    setTimeout(() => {
      wi = (wi + 1) % COMMUNES.length;
      rot.textContent = COMMUNES[wi].name;
      if (prep) prep.textContent = COMMUNES[wi].prep;
      rot.classList.remove('out');
    }, 450);
  }, 2600);
}

// ---------- Communes: list + map ----------
const list = $('#commune-list');
const pins = $('#pins');

COMMUNES.forEach((c) => {
  const li = document.createElement('li');
  li.className = 'commune';
  li.dataset.id = c.id;
  li.innerHTML = `
    <button class="commune-btn" aria-expanded="false" aria-controls="cb-${c.id}">
      <span class="commune-name">${c.name}</span>
      <span class="commune-commute">${c.commute}</span>
      <span class="commune-plus" aria-hidden="true">+</span>
    </button>
    <div class="commune-body" id="cb-${c.id}" role="region">
      <div><div class="commune-inner">
        <p class="commune-tag">${c.tag}</p>
        <p>${c.text}</p>
        <dl class="commune-facts">
          <div><dt>${T.toIG}</dt><dd>${c.commute}</dd></div>
          <div><dt>${T.rent}</dt><dd>${c.rent}</dd></div>
          <div><dt>${T.bestFor}</dt><dd>${c.for}</dd></div>
        </dl>
        <a href="#contact" class="commune-link" data-area="${c.name}">${T.search(c)}</a>
      </div></div>
    </div>`;
  $('.commune-btn', li).addEventListener('click', () => select(c.id, true));
  $('.commune-link', li).addEventListener('click', (e) => { const a = $('#area'); if (a) a.value = e.currentTarget.dataset.area; });
  list.appendChild(li);

  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'pin');
  g.setAttribute('tabindex', '0');
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', c.name);
  g.dataset.id = c.id;
  g.setAttribute('transform', `translate(${c.x} ${c.y})`);
  const left = c.side === 'left';
  g.innerHTML = `<circle r="18" fill="transparent"></circle><circle r="5.5" class="dot"></circle>
    <text x="${left ? -13 : 13}" y="4.5" text-anchor="${left ? 'end' : 'start'}">${c.name}</text>`;
  g.addEventListener('click', () => select(c.id, false));
  g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(c.id, false); } });
  pins.appendChild(g);
});

function select(id, fromList) {
  $$('.commune').forEach((li) => {
    const on = li.dataset.id === id && !(fromList && li.classList.contains('open'));
    li.classList.toggle('open', on);
    $('.commune-btn', li).setAttribute('aria-expanded', String(on));
  });
  const openId = $('.commune.open')?.dataset.id;
  $$('.pin').forEach((p) => p.classList.toggle('active', p.dataset.id === openId));
  if (!fromList && window.matchMedia('(max-width: 860px)').matches) {
    $(`.commune[data-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
select('grand-saconnex', false);

// ---------- Nav ----------
const nav = $('#nav');
const hero = $('.hero');
const menu = $('#menu');
const burger = $('#burger');
const onScroll = () => nav.classList.toggle('solid', !menu.hidden || window.scrollY > hero.offsetHeight - 90);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
const setMenu = (open) => {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? T.closeMenu : T.openMenu);
  onScroll();
};
burger.addEventListener('click', () => setMenu(menu.hidden));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

const links = $$('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['maureen', 'family', 'services', 'communes', 'process', 'faq'].forEach((id) => spy.observe(document.getElementById(id)));

// ---------- Reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach((el) => {
  const sib = $$(':scope > .reveal', el.parentElement);
  el.style.setProperty('--rd', `${Math.min(sib.indexOf(el), 5) * 0.08}s`);
  io.observe(el);
});

// ---------- FAQ: one open at a time ----------
$$('.accordion details').forEach((d) => d.addEventListener('toggle', () => {
  if (d.open) $$('.accordion details').forEach((o) => { if (o !== d) o.open = false; });
}));

// ---------- Contact form → email draft ----------
const TO = 'contact@tagirelocations.com';
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
    note.textContent = T.invalid;
    note.classList.remove('ok');
    form.querySelector('.invalid')?.focus();
    return;
  }
  const body = [
    `${T.body[0]}: ${data.get('name')}`,
    `${T.body[1]}: ${data.get('email')}`,
    `${T.body[2]}: ${data.get('org') || '—'}`,
    `${T.body[3]}: ${data.get('date') || '—'}`,
    `${T.body[4]}: ${data.get('household')}`,
    `${T.body[5]}: ${data.get('budget')}`,
    `${T.body[6]}: ${data.get('area') || T.open}`,
    '',
    `${data.get('msg') || ''}`,
  ].join('\n');
  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(T.subject(data.get('name')))}&body=${encodeURIComponent(body)}`;
  note.textContent = T.thanks;
  note.classList.add('ok');
});
$$('input', form).forEach((i) => i.addEventListener('input', () => i.classList.remove('invalid')));

$('#year').textContent = new Date().getFullYear();
