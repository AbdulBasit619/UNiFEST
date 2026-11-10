'use strict';

//////////////////////////////////////////////////////////
//// TABBED LAYOUT: CATEGORIES
const tabs = [...document.querySelectorAll('.tabs__btn')];
const panels = document.querySelectorAll('.panel');

const selectTab = tab => {
  tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
  panels.forEach(p => (p.hidden = p.id !== tab.getAttribute('aria-controls')));
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

//////////////////////////////////////////////////////////
//// VENUE FLOOR PLAN
const rooms = [...document.querySelectorAll('.plan__room')];
const detail = document.querySelector('.venue__detail');

const showRoom = room => {
  rooms.forEach(r => r.setAttribute('aria-pressed', r === room));
  const d = room.dataset;
  const set = (name, value) =>
    (detail.querySelector(`[data-field="${name}"]`).textContent = value);
  set('name', d.name);
  set('capacity', d.capacity);
  set('type', d.type === 'outdoor' ? 'Outdoor' : 'Indoor');
  set('facilities', d.facilities);
  set('lead', d.lead);
};

rooms.forEach(room => room.addEventListener('click', () => showRoom(room)));
showRoom(rooms[0]);

//////////////////////////////////////////////////////////
//// FAQs
const log = document.querySelector('.chat__log');
const chips = document.querySelectorAll('.chip');

const addBubble = (text, who) => {
  const bubble = document.createElement('p');
  bubble.className = `bubble bubble--${who}`;
  bubble.textContent = text;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
};

chips.forEach(chip =>
  chip.addEventListener('click', () => {
    addBubble(chip.textContent, 'user');
    addBubble(chip.dataset.answer, 'bot');
    chip.disabled = true;
  }),
);

document.querySelector('.chat__reset').addEventListener('click', () => {
  log.querySelectorAll('.bubble:not(:first-child)').forEach(b => b.remove());
  chips.forEach(c => (c.disabled = false));
});
