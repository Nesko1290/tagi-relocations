const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const menu = $('#menu');
const burger = $('#burger');
const setMenu = (open) => {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => setMenu(menu.hidden));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach((el) => {
  const sib = $$(':scope > .reveal', el.parentElement);
  el.style.setProperty('--rd', `${Math.min(sib.indexOf(el), 5) * 0.08}s`);
  io.observe(el);
});

$('#year').textContent = new Date().getFullYear();
