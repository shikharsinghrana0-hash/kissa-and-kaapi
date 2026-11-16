/**
 * Synchronizes native :user-invalid styling with aria-invalid, dynamic aria-describedby,
 * and a single polite live-region announcer so assistive technologies announce errors
 * only after user interaction.
 */
export function attachAccessibleFormSync(formElement) {
  if (!formElement) return () => {};

  let announcer = document.getElementById('global-form-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'global-form-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'visually-hidden';
    document.body.append(announcer);
  }

  let announceTimer;
  let announcedField;
  const flagged = new WeakSet();
  const announced = new WeakSet();

  const linkError = (el, shown) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  };

  const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    return copy.textContent.replace(/\s+/g, ' ').trim();
  };

  const announceError = (el) => {
    const error = document.getElementById(el.dataset.error);
    if (!error) return;
    const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : '';
    clearTimeout(announceTimer);
    announcer.textContent = '';
    announcedField = el;
    announceTimer = setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  const syncAria = (el, shouldAnnounce = false) => {
    if (!el.matches?.('input, select, textarea')) return;
    const isInvalid = el.matches(':user-invalid') || el.dataset.submittedInvalid === 'true';
    if (isInvalid) {
      if (shouldAnnounce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        clearTimeout(announceTimer);
        announcer.textContent = '';
      }
    }
  };

  formElement.querySelectorAll('input, select, textarea').forEach((el) => syncAria(el));

  const onBlur = (e) => syncAria(e.target, true);
  const onInput = (e) => {
    if (e.target.dataset?.submittedInvalid === 'true' && e.target.checkValidity()) {
      delete e.target.dataset.submittedInvalid;
    }
    if (e.target.hasAttribute('aria-invalid')) syncAria(e.target);
  };
  const onChange = (e) => syncAria(e.target, true);

  formElement.addEventListener('blur', onBlur, true);
  formElement.addEventListener('input', onInput);
  formElement.addEventListener('change', onChange);

  return () => {
    clearTimeout(announceTimer);
    formElement.removeEventListener('blur', onBlur, true);
    formElement.removeEventListener('input', onInput);
    formElement.removeEventListener('change', onChange);
  };
}
