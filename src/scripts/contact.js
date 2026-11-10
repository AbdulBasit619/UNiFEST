'use strict';

const EMAIL = /^\S+@\S+\.\S+$/;
const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

// Dates must be in the future
document.querySelectorAll('input[type="date"]').forEach(input => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  input.min = tomorrow.toLocaleDateString('en-CA');
});

const getError = el => {
  const value = el.value.trim();
  if (el.type === 'checkbox')
    return el.required && !el.checked ? 'Please confirm to continue.' : '';
  if (el.required && !value) return 'This field is required.';
  if (!value) return '';
  if (el.type === 'email' && !EMAIL.test(value))
    return 'Enter a valid email address.';
  if (el.type === 'date' && value <= today) return 'Pick a date in the future.';
  if (el.minLength > 0 && value.length < el.minLength)
    return `Write at least ${el.minLength} characters.`;
  if (el.type === 'number' && Number(value) < Number(el.min))
    return `Enter ${el.min} or more.`;
  return '';
};

const validate = el => {
  const message = getError(el);
  el.setAttribute('aria-invalid', Boolean(message));
  el.closest('.form__field').querySelector('.form__error').textContent =
    message;
  return !message;
};

document.querySelectorAll('form[data-validate]').forEach(form => {
  const fields = [...form.querySelectorAll('.form__input, .form__check input')];
  const success = form.querySelector('.form__success');

  fields.forEach(el => {
    el.addEventListener('blur', () => validate(el));
    el.addEventListener(
      'input',
      () => el.getAttribute('aria-invalid') === 'true' && validate(el),
    );
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const results = fields.map(validate); // Input validation for every field
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus();
      success.hidden = true;
      return;
    }
    form.reset();
    success.hidden = false;
    success.focus();
  });
});
