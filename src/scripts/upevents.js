'use strict';

// ---- School / category tabs: events stay hidden until one is chosen ----
const tabs = [...document.querySelectorAll('.tabs__btn')];
const lists = document.querySelectorAll('.events');
const hint = document.querySelector('.tabs__hint');

const selectTab = (tab) => {
  tabs.forEach((t) => t.setAttribute('aria-selected', t === tab));
  lists.forEach((list) => (list.hidden = list.id !== tab.getAttribute('aria-controls')));
  hint.hidden = true;
};

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    const next = tabs[(i + step + tabs.length) % tabs.length];
    next.focus();
    selectTab(next);
  });
});

// ---- Detail modal: one <dialog>, filled from the clicked card ----
const modal = document.getElementById('event-modal');
const field = (name) => modal.querySelector(`[data-field="${name}"]`);

document.addEventListener('click', (e) => {
  const open = e.target.closest('.event__open');
  if (!open) return;

  const card = open.closest('.event');
  const list = card.closest('.events');
  const d = card.dataset;

  field('img').src = d.img;
  field('category').textContent = list.dataset.label;
  field('fee').textContent = d.fee;
  field('title').textContent = open.textContent;
  field('desc').textContent = d.desc;
  field('date').textContent = d.date;
  field('time').textContent = d.time;
  field('venue').textContent = d.venue;
  field('organizer').textContent = d.organizer;
  modal.style.setProperty('--cat', getComputedStyle(list).getPropertyValue('--cat'));

  modal.showModal();
});
