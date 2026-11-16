import React, { useEffect, useRef, useState } from 'react';
import { attachAccessibleFormSync } from '../utils/formAriaSync';
import { useModalDialog } from '../utils/useModalDialog';

export function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const dialogRef = useModalDialog(isOpen, onClose);
  const formRef = useRef(null);
  const [mode, setMode] = useState('signin');

  useEffect(() => {
    if (!isOpen) return;
    return attachAccessibleFormSync(formRef.current);
  }, [isOpen, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const controls = Array.from(form.querySelectorAll('input'));
    let firstInvalid = null;

    controls.forEach((el) => {
      if (!el.checkValidity()) {
        el.dataset.submittedInvalid = 'true';
        el.setAttribute('aria-invalid', 'true');
        if (!firstInvalid) firstInvalid = el;
      } else {
        delete el.dataset.submittedInvalid;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const email = String(data.get('email') || '');
    const rawName = String(data.get('name') || '').trim();
    const fallbackName = email.split('@')[0]?.replace(/[._-]/g, ' ') || 'Guest';
    const displayName = rawName || fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

    onAuthSuccess({ name: displayName, email });
    form.reset();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      closedby="any"
      aria-labelledby="auth-modal-title"
    >
      <div className="dialog-head">
        <div>
          <span className="mono-label">Kissa &amp; Kaapi</span>
          <h2 id="auth-modal-title">Table Club</h2>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close Table Club dialog"
        >
          Close
        </button>
      </div>

      <div className="dialog-body">
        <div className="menu-tabs" role="tablist" aria-label="Account action" style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            role="tab"
            className="filter-chip"
            aria-selected={mode === 'signin'}
            aria-pressed={mode === 'signin'}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            className="filter-chip"
            aria-selected={mode === 'signup'}
            aria-pressed={mode === 'signup'}
            onClick={() => setMode('signup')}
          >
            Create Account
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '1.05rem' }}>
          {mode === 'signup' && (
            <div className="field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                name="name"
                type="text"
                required
                minLength={2}
                placeholder="Clara Lindqvist"
                autoComplete="name"
                data-error="auth-name-error"
                autoFocus
              />
              <span id="auth-name-error" className="error-msg">
                Please enter your full name.
              </span>
            </div>
          )}

          <div className="field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              data-error="auth-email-error"
              autoFocus={mode === 'signin'}
            />
            <span id="auth-email-error" className="error-msg">
              Please enter a valid email address.
            </span>
          </div>

          <div className="field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              data-error="auth-password-error"
            />
            <span id="auth-password-error" className="error-msg">
              Password must be at least 6 characters.
            </span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.35rem' }}>
            {mode === 'signin' ? 'Sign In to Table Club' : 'Join Table Club'}
          </button>
        </form>
      </div>
    </dialog>
  );
}
