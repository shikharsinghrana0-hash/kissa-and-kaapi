import React, { useEffect, useState } from 'react';
import { formatINR } from '../data/cafeData';
import { useModalDialog } from '../utils/useModalDialog';
import { verifyOwnerCredentials } from '../utils/ownerAuth';
import { BrandLogo } from './BrandLogo';

const ORDER_STATUSES = ['Preparing', 'Ready', 'Picked Up'];
const RES_STATUSES = ['Pending', 'Confirmed', 'Seated'];

export function OwnerPortalModal({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  reservations,
  onUpdateReservationStatus,
  menuItems,
  onUpdatePrice,
  onResetPrices,
}) {
  const dialogRef = useModalDialog(isOpen, onClose);
  const [authorized, setAuthorized] = useState(() => {
    try {
      return sessionStorage.getItem('kissa-owner-auth') === 'granted';
    } catch {
      return false;
    }
  });
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!isOpen) {
      setErrorMsg('');
      setPasscode('');
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now < lockedUntil) {
      const secs = Math.ceil((lockedUntil - now) / 1000);
      setErrorMsg(`Too many failed attempts. Try again in ${secs}s.`);
      return;
    }

    const ok = await verifyOwnerCredentials(email, passcode);
    if (!ok) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setLockedUntil(Date.now() + 30000);
        setAttempts(0);
        setErrorMsg('Access paused for 30 seconds after 3 invalid attempts.');
      } else {
        setErrorMsg('Invalid owner credentials.');
      }
      return;
    }

    setAuthorized(true);
    setAttempts(0);
    setErrorMsg('');
    setPasscode('');
    try {
      sessionStorage.setItem('kissa-owner-auth', 'granted');
    } catch {
      // ignore storage errors
    }
  };

  const handleLockAndExit = () => {
    setAuthorized(false);
    try {
      sessionStorage.removeItem('kissa-owner-auth');
    } catch {
      // ignore
    }
    onClose();
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.amount) || 0), 0);

  return (
    <dialog
      ref={dialogRef}
      className="owner-dialog"
      closedby="closerequest"
      aria-labelledby="owner-portal-title"
    >
      <div className="dialog-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <BrandLogo size={28} />
          <div>
            <span className="mono-label">Restricted · Owner Only</span>
            <h2 id="owner-portal-title">Kissa &amp; Kaapi Backoffice</h2>
          </div>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close owner portal"
        >
          Close
        </button>
      </div>

      <div className="dialog-body">
        {!authorized ? (
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.1rem', maxWidth: '24rem', marginInline: 'auto', paddingBlock: '1rem' }}>
            <div>
              <span className="mono-label">Owner Verification</span>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Enter the owner email and passcode to view live orders, table bookings, and menu pricing.
              </p>
            </div>

            <div className="field">
              <label htmlFor="owner-email">Owner Email</label>
              <input
                id="owner-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@kissaandkaapi.in"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="owner-passcode">Owner Passcode</label>
              <input
                id="owner-passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
            </div>

            {errorMsg && (
              <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.86rem' }}>
                {errorMsg}
              </p>
            )}

            <button type="submit" className="btn btn-primary">
              Unlock Owner Portal
            </button>
          </form>
        ) : (
          <div>
            <div className="owner-stats">
              <div className="owner-stat-card">
                <span className="mono-label">Pickup Orders</span>
                <strong>{orders.length}</strong>
              </div>
              <div className="owner-stat-card">
                <span className="mono-label">Reservations</span>
                <strong>{reservations.length}</strong>
              </div>
              <div className="owner-stat-card">
                <span className="mono-label">Order Revenue</span>
                <strong>{formatINR(totalRevenue)}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="menu-tabs" role="tablist" aria-label="Owner portal sections">
                <button
                  type="button"
                  role="tab"
                  className="filter-chip"
                  aria-selected={activeTab === 'orders'}
                  aria-pressed={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                >
                  Orders ({orders.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  className="filter-chip"
                  aria-selected={activeTab === 'reservations'}
                  aria-pressed={activeTab === 'reservations'}
                  onClick={() => setActiveTab('reservations')}
                >
                  Reservations ({reservations.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  className="filter-chip"
                  aria-selected={activeTab === 'menu'}
                  aria-pressed={activeTab === 'menu'}
                  onClick={() => setActiveTab('menu')}
                >
                  Menu Prices (₹)
                </button>
              </div>

              <button type="button" className="btn btn-outline" onClick={handleLockAndExit}>
                Lock &amp; Exit
              </button>
            </div>

            {activeTab === 'orders' && (
              orders.length === 0 ? (
                <p style={{ color: 'var(--muted)', paddingBlock: '1.5rem' }}>
                  No pickup orders recorded in this browser yet. Orders placed via the Order Tray appear here automatically.
                </p>
              ) : (
                <div className="owner-list">
                  {orders.map((ord) => (
                    <div key={ord.code} className="owner-row">
                      <div>
                        <span className="mono-label">
                          {ord.code} · {ord.createdAt} · {ord.pickupTime}
                        </span>
                        <div style={{ fontWeight: 500, marginTop: '0.2rem' }}>
                          {ord.customer} — {ord.total}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          {ord.itemsSummary}
                          {ord.note ? ` · Note: ${ord.note}` : ''}
                        </p>
                      </div>
                      <select
                        aria-label={`Status for order ${ord.code}`}
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.code, e.target.value)}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'reservations' && (
              reservations.length === 0 ? (
                <p style={{ color: 'var(--muted)', paddingBlock: '1.5rem' }}>
                  No table bookings recorded in this browser yet. Confirmed reservations from the booking form appear here automatically.
                </p>
              ) : (
                <div className="owner-list">
                  {reservations.map((res) => (
                    <div key={res.code} className="owner-row">
                      <div>
                        <span className="mono-label">
                          {res.code} · {res.date} at {res.time} · {res.guests} Guests
                        </span>
                        <div style={{ fontWeight: 500, marginTop: '0.2rem' }}>
                          {res.name} ({res.seating})
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          {res.phone} · {res.contact}
                          {res.message ? ` · "${res.message}"` : ''}
                        </p>
                      </div>
                      <select
                        aria-label={`Status for reservation ${res.code}`}
                        value={res.status}
                        onChange={(e) => onUpdateReservationStatus(res.code, e.target.value)}
                      >
                        {RES_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'menu' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                  <span className="mono-label">Edit Prices Live (INR)</span>
                  <button type="button" className="btn btn-ghost" onClick={onResetPrices}>
                    Reset Defaults
                  </button>
                </div>
                <div className="owner-list">
                  {menuItems.map((item) => (
                    <div key={item.id} className="owner-row">
                      <div>
                        <span className="mono-label">{item.category}</span>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span className="mono-label">₹</span>
                        <input
                          type="number"
                          min={20}
                          max={5000}
                          step={10}
                          aria-label={`Price in rupees for ${item.name}`}
                          value={item.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 20) onUpdatePrice(item.id, val);
                          }}
                          style={{
                            width: '5.5rem',
                            padding: '0.4rem 0.55rem',
                            border: '1px solid var(--border-strong)',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg)',
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
