import React from 'react';
import { useModalDialog } from '../utils/useModalDialog';
import { BrandLogo } from './BrandLogo';

export function DemoGuideModal({
  isOpen,
  onClose,
  onLoadSampleOrder,
  onPrefillReservation,
  onOpenOwnerPortal,
  theme,
  onToggleTheme,
}) {
  const dialogRef = useModalDialog(isOpen, onClose);

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      closedby="any"
      aria-labelledby="demo-modal-title"
    >
      <div className="dialog-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <BrandLogo size={26} />
          <div>
            <span className="mono-label">Interactive Preview</span>
            <h2 id="demo-modal-title" style={{ fontSize: '1.45rem' }}>
              Project Demo Tour
            </h2>
          </div>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close demo tour"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className="dialog-body" style={{ display: 'grid', gap: '1.25rem' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
          Welcome to the live demo of <strong>Kissa &amp; Kaapi</strong>, designed and developed by{' '}
          <strong>Shikhar Singh Rana</strong>. Use these shortcuts to quickly test key features:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.85rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ fontSize: '0.92rem' }}>1. Online Food Ordering UI</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                Loads a sample pour-over &amp; pastry into your tray and opens checkout.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ minBlockSize: '2.2rem', padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => {
                onLoadSampleOrder();
                onClose();
              }}
            >
              Try Order
            </button>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ fontSize: '0.92rem' }}>2. Table Booking &amp; Pass</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                Scrolls to reservation form with sample guest details prefilled.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ minBlockSize: '2.2rem', padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => {
                onPrefillReservation();
                onClose();
              }}
            >
              Book Table
            </button>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ fontSize: '0.92rem' }}>3. Day &amp; Evening Mode</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                Currently in <strong>{theme === 'dark' ? 'Evening Dark' : 'Daylight'}</strong> mode.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ minBlockSize: '2.2rem', padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              onClick={onToggleTheme}
            >
              Toggle Mode
            </button>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ fontSize: '0.92rem' }}>4. Owner / Admin Backoffice</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                Unlock with <code>owner@kissaandkaapi.in</code> / <code>KissaOwner#2026</code>.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ minBlockSize: '2.2rem', padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => {
                onClose();
                onOpenOwnerPortal();
              }}
            >
              Open Admin
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="mono-label">Developer: Shikhar Singh Rana</span>
          <a
            href="https://github.com/shikharsinghrana0-hash/kissa-and-kaapi"
            target="_blank"
            rel="noreferrer"
            className="mono-label"
            style={{ textDecoration: 'underline', color: 'var(--accent)' }}
          >
            GitHub Repo ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
