import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { useModalDialog } from '../utils/useModalDialog';
import { BrandLogo } from './BrandLogo';

const NAV_ITEMS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our House', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reserve' },
];

export function Navbar({
  theme,
  onToggleTheme,
  trayCount,
  onOpenTray,
  user,
  onOpenAuth,
  onSignOut,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDrawerRef = useModalDialog(mobileOpen, () => setMobileOpen(false));

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#top"
          className="brand-mark"
          style={{ flexDirection: 'row', alignItems: 'center', gap: '0.65rem' }}
          aria-label={`${CAFE_INFO.name} Home`}
        >
          <BrandLogo size={32} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <span className="brand-name">{CAFE_INFO.name}</span>
            <span className="brand-sub">{CAFE_INFO.subtitle}</span>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to daylight mode' : 'Switch to evening dark mode'}
            title={theme === 'dark' ? 'Daylight Mode' : 'Evening Mode'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {theme === 'dark' ? (
                <path d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              )}
            </svg>
            <span className="mono-label" style={{ color: 'inherit', fontSize: '0.66rem' }}>
              {theme === 'dark' ? 'Day' : 'Eve'}
            </span>
          </button>

          {user ? (
            <button
              type="button"
              className="icon-btn header-auth-desktop"
              onClick={onSignOut}
              title="Sign out of Table Club"
            >
              <span>{user.name.split(' ')[0]}</span>
              <span className="mono-label" style={{ fontSize: '0.62rem' }}>· Out</span>
            </button>
          ) : (
            <button
              type="button"
              className="icon-btn header-auth-desktop"
              onClick={onOpenAuth}
            >
              Table Club
            </button>
          )}

          <button
            type="button"
            className="icon-btn"
            onClick={onOpenTray}
            aria-label={`Open order tray (${trayCount} items)`}
          >
            <span>Order</span>
            {trayCount > 0 && <span className="tray-count">{trayCount}</span>}
          </button>

          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <dialog
        ref={mobileDrawerRef}
        className="mobile-nav-drawer"
        closedby="any"
        aria-labelledby="mobile-nav-title"
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span id="mobile-nav-title" className="mono-label">Navigation</span>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              autoFocus
            >
              Close
            </button>
          </div>

          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {user ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  onSignOut();
                  setMobileOpen(false);
                }}
              >
                Sign out ({user.name})
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAuth();
                }}
              >
                Table Club Sign In
              </button>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <p className="mono-label">{CAFE_INFO.address}</p>
          <p className="mono-label" style={{ marginTop: '0.35rem' }}>Tue–Sun · From 07:30</p>
        </div>
      </dialog>
    </header>
  );
}
