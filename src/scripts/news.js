'use strict';

//////////////////////////////////
//// TABBED SCHOOL SELECTION
const tabs = [...document.querySelectorAll('.tabs__btn')];
const lists = document.querySelectorAll('.accordion');
const hint = document.querySelector('.news__hint');

const selectTab = tab => {
  tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
  lists.forEach(
    list => (list.hidden = list.id !== tab.getAttribute('aria-controls')),
  );
  hint.hidden = true;
};

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    const next = tabs[(i + step + tabs.length) % tabs.length];
    next.focus();
    selectTab(next);
  });
});

//////////////////////////////////
//// ACCORDION
document.querySelectorAll('.accordion').forEach(list => {
  list.addEventListener('click', e => {
    const trigger = e.target.closest('.accordion__trigger');
    if (!trigger) return;
    const item = trigger.closest('.accordion__item');
    const willOpen = !item.classList.contains('is-open');

    list.querySelectorAll('.accordion__item.is-open').forEach(open => {
      open.classList.remove('is-open');
      open
        .querySelector('.accordion__trigger')
        .setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

//////////////////////////////////
//// INFINITE SCROLLING IMAGE GALLERY
document.querySelectorAll('.gallery__track').forEach(track => {
  [...track.children].forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
});
