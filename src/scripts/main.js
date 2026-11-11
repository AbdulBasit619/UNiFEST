'use strict';

//////////////////////////////////////////////////////
//// THEME TOGGLER
const root = document.documentElement;
const saved = localStorage.getItem('unifest-theme');
if (saved) root.dataset.theme = saved;

document.querySelector('.toggle')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('unifest-theme', next);
});

//////////////////////////////////////////////////////
//// MOBILE NAVIGATION
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});

//////////////////////////////////////////////////////
//// MODAL WINDOW
document.addEventListener('click', e => {
  const opener = e.target.closest('[data-modal-open]');
  if (opener)
    return document.getElementById(opener.dataset.modalOpen)?.showModal();

  const closer = e.target.closest('[data-modal-close]');
  if (closer) return closer.closest('dialog').close();

  if (e.target.matches('dialog.modal')) e.target.close(); // backdrop click
});
