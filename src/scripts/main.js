'use strict';

// THEME TOGGLER
const root = document.documentElement;
const saved = localStorage.getItem('unifest-theme');
if (saved) root.dataset.theme = saved;

document.querySelector('.toggle')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('unifest-theme', next);
});

//////////////////////////////////////////////////////////
//// MOBILE NAVIGATION
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  const icon = burger.querySelector('ion-icon');
  const setNav = open => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    icon.setAttribute('name', open ? 'close-outline' : 'menu-outline');
  };

  burger.addEventListener('click', () =>
    setNav(!nav.classList.contains('is-open')),
  );
  nav.addEventListener('click', e => e.target.closest('a') && setNav(false)); // close after picking a link
  document.addEventListener(
    'keydown',
    e => e.key === 'Escape' && setNav(false),
  );
  document.addEventListener(
    'click',
    e => !e.target.closest('.header__inner') && setNav(false),
  );
  window
    .matchMedia('(min-width: 56.26em)')
    .addEventListener('change', e => e.matches && setNav(false));
}

//////////////////////////////////////////////////////////
//// MODAL
document.addEventListener('click', e => {
  const opener = e.target.closest('[data-modal-open]');
  if (opener)
    return document.getElementById(opener.dataset.modalOpen)?.showModal();

  const closer = e.target.closest('[data-modal-close]');
  if (closer) return closer.closest('dialog').close();

  if (e.target.matches('dialog.modal')) e.target.close(); // backdrop click
});
