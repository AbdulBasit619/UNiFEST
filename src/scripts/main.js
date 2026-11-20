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
    icon?.setAttribute('name', open ? 'close-outline' : 'menu-outline');
  };

  burger.addEventListener('click', () =>
    setNav(!nav.classList.contains('is-open')),
  );
  nav.addEventListener('click', e => e.target.closest('a') && setNav(false));
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

  if (e.target.matches('dialog.modal')) e.target.close();
});

//////////////////////////////////////////////////////////
//// LOADER
(() => {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  const MIN_SHOW = 500; // ms the loader stays up, so the animation is always seen
  const MAX_WAIT = 2000; // ms: never trap a visitor behind a slow image or iframe
  const root = document.documentElement;
  const bar = loader.querySelector('.loader__bar');
  const start = performance.now();

  const setProgress = (value, ms) => {
    bar.style.setProperty('--dur', `${ms}ms`);
    bar.style.setProperty('--p', value);
  };

  root.classList.add('is-loading');
  // two frames so the browser paints the empty bar first, then the transition runs
  requestAnimationFrame(() =>
    requestAnimationFrame(() => setProgress(0.85, 2400)),
  );

  const pageLoaded = new Promise(resolve => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const timeout = new Promise(resolve => setTimeout(resolve, MAX_WAIT));

  const finish = () => {
    setProgress(1, 300); // fill the last 15%
    setTimeout(() => {
      loader.classList.add('is-done'); // curtain lifts (CSS)
      root.classList.remove('is-loading');
      loader.addEventListener(
        'transitionend',
        e => e.target === loader && loader.remove(),
      );
      setTimeout(() => loader.remove(), 1500); // safety net (e.g. reduced motion)
    }, 350);
  };

  Promise.race([Promise.all([pageLoaded, fontsReady]), timeout]).then(() => {
    const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
    setTimeout(finish, wait);
  });
})();
