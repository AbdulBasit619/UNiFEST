'use strict';

const pad = n => String(n).padStart(2, '0');

// ================= 3. Countdown =================
const countdownSection = document.querySelector('.section--countdown');
if (countdownSection) {
  const countdown = countdownSection.querySelector('.countdown');
  const target = new Date(countdown.dataset.target).getTime();
  const units = Object.fromEntries(
    ['days', 'hours', 'mins', 'secs'].map(u => [
      u,
      countdown.querySelector(`[data-unit="${u}"]`),
    ]),
  );

  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    units.days.textContent = pad(Math.floor(diff / 864e5));
    units.hours.textContent = pad(Math.floor((diff / 36e5) % 24));
    units.mins.textContent = pad(Math.floor((diff / 6e4) % 60));
    units.secs.textContent = pad(Math.floor((diff / 1e3) % 60));
  };
  tick();
  setInterval(tick, 1000);

  // Reveal once the section scrolls into view
  countdownSection.classList.add('is-armed');
  new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      countdownSection.classList.add('is-visible');
      observer.disconnect();
    },
    { threshold: 0.35 },
  ).observe(countdownSection);
}

// ================= 4. Winners carousel =================
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.winner')];
  const count = carousel.querySelector('.winners__count');
  const SPOTS = [
    { x: '5%', y: '14%' },
    { x: '60%', y: '10%' },
    { x: '3%', y: '44%' },
    { x: '64%', y: '42%' },
    { x: '8%', y: '72%' },
    { x: '60%', y: '70%' },
  ];
  let index = 0;
  let timer;

  // Scatter the three tags on random spots with random tilts
  const scatter = slide => {
    const spots = [...SPOTS].sort(() => Math.random() - 0.5);
    slide.querySelectorAll('.winner__tag').forEach((tag, i) => {
      tag.style.setProperty('--x', spots[i].x);
      tag.style.setProperty('--y', spots[i].y);
      tag.style.setProperty(
        '--rot',
        `${(Math.random() * 14 - 7).toFixed(1)}deg`,
      );
    });
  };

  const show = i => {
    slides[index].classList.remove('is-active');
    index = (i + slides.length) % slides.length;
    scatter(slides[index]);
    slides[index].classList.add('is-active');
    count.textContent = `${pad(index + 1)} / ${pad(slides.length)}`;
  };

  const autoplay = () => {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      timer = setInterval(() => show(index + 1), 6000);
  };

  carousel.querySelector('[data-dir="next"]').addEventListener('click', () => {
    show(index + 1);
    autoplay();
  });
  carousel.querySelector('[data-dir="prev"]').addEventListener('click', () => {
    show(index - 1);
    autoplay();
  });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', autoplay);

  index = slides.length - 1; // so show(0) deactivates a non-active slide cleanly
  show(0);
  autoplay();
}

// ================= 5. Registration form =================
const form = document.querySelector('#register-form');
if (form) {
  const MAX_FILE = 5 * 1024 * 1024;
  const EMAIL = /^\S+@\S+\.\S+$/;
  const eventSelect = form.elements.event;
  const sizeSelect = form.elements.size;
  const list = form.querySelector('.participants');
  const info = form.querySelector('.reg__info');
  const success = form.querySelector('.form__success');

  const participant = i => `
    <fieldset class="participant">
      <legend>${i === 0 ? 'Team lead' : `Participant ${i + 1}`}</legend>
      ${[
        ['name', 'Full name', 'text', ''],
        ['roll', 'Roll no.', 'text', ' minlength="3"'],
        ['email', 'Email', 'email', ''],
      ]
        .map(
          ([key, label, type, extra]) => `
      <div class="form__field">
        <label class="form__label" for="p${i}-${key}">${label}</label>
        <input class="form__input" id="p${i}-${key}" name="p${i}-${key}" type="${type}" required${extra} aria-describedby="p${i}-${key}-err" />
        <p class="form__error" id="p${i}-${key}-err"></p>
      </div>`,
        )
        .join('')}
    </fieldset>`;

  const buildParticipants = n => {
    const old = [...list.querySelectorAll('.form__input')].map(el => [
      el.name,
      el.value,
    ]);
    list.innerHTML = Array.from({ length: n }, (_, i) => participant(i)).join(
      '',
    );
    old.forEach(([name, value]) => {
      if (form.elements[name]) form.elements[name].value = value;
    });
  };

  eventSelect.addEventListener('change', () => {
    const opt = eventSelect.selectedOptions[0];
    const max = Number(opt.dataset.max) || 0;
    sizeSelect.innerHTML =
      '<option value="">Select…</option>' +
      Array.from({ length: max }, (_, i) => `<option>${i + 1}</option>`).join(
        '',
      );
    sizeSelect.disabled = !max;
    list.innerHTML = '';
    info.hidden = !max;
    if (!max) return;
    info.textContent = `Max team size: ${max}. Registration fee: ${opt.dataset.fee} per team.`;
    if (max === 1) {
      sizeSelect.value = '1';
      buildParticipants(1);
    }
  });

  sizeSelect.addEventListener('change', () =>
    buildParticipants(Number(sizeSelect.value) || 0),
  );

  const getError = el => {
    if (el.type === 'file') {
      const file = el.files[0];
      if (!file) return 'Upload your payment screenshot.';
      if (!file.type.startsWith('image/'))
        return 'Upload an image (PNG or JPG).';
      return file.size > MAX_FILE ? 'Image must be under 5 MB.' : '';
    }
    const value = el.value.trim();
    if (el.required && !value) return 'This field is required.';
    if (value && el.type === 'email' && !EMAIL.test(value))
      return 'Enter a valid email address.';
    if (value && el.minLength > 0 && value.length < el.minLength)
      return `Enter at least ${el.minLength} characters.`;
    return '';
  };

  const validate = el => {
    const message = getError(el);
    el.setAttribute('aria-invalid', Boolean(message));
    el.closest('.form__field').querySelector('.form__error').textContent =
      message;
    return !message;
  };

  form.addEventListener(
    'focusout',
    e => e.target.matches('.form__input') && validate(e.target),
  );
  form.addEventListener(
    'change',
    e => e.target.matches('.form__input') && validate(e.target),
  );
  form.addEventListener(
    'input',
    e =>
      e.target.getAttribute?.('aria-invalid') === 'true' && validate(e.target),
  );

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('.form__input:not(:disabled)')];
    const results = fields.map(validate);
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus();
      success.hidden = true;
      return;
    }
    form.reset();
    list.innerHTML = '';
    sizeSelect.disabled = true;
    info.hidden = true;
    success.hidden = false;
    success.focus();
  });
}
