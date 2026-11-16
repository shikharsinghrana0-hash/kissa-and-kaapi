import React, { useState } from 'react';
import { MENU_ITEMS, formatINR } from '../data/cafeData';
import { useModalDialog } from '../utils/useModalDialog';

const PICKUP_WINDOWS = ['In 15 mins', 'In 30 mins', 'In 45 mins'];

export function OrderDrawer({
  isOpen,
  onClose,
  menuItems = MENU_ITEMS,
  cart,
  onAdd,
  onDecrement,
  onClear,
  user,
  onOrderPlaced,
}) {
  const dialogRef = useModalDialog(isOpen, onClose);
  const [pickupTime, setPickupTime] = useState(PICKUP_WINDOWS[0]);
  const [note, setNote] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const itemsInTray = menuItems.filter((item) => (cart[item.id] || 0) > 0);
  const subtotal = itemsInTray.reduce((sum, item) => sum + item.price * cart[item.id], 0);
  const totalCount = itemsInTray.reduce((sum, item) => sum + cart[item.id], 0);

  const handlePlaceOrder = () => {
    const ticket = {
      code: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      pickupTime,
      total: formatINR(subtotal),
      amount: subtotal,
      count: totalCount,
      itemsSummary: itemsInTray.map((i) => `${cart[i.id]}× ${i.name}`).join(', '),
      note,
      customer: user ? user.name : 'Counter Pickup Guest',
      status: 'Preparing',
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setPlacedOrder(ticket);
    if (onOrderPlaced) onOrderPlaced(ticket);
    onClear();
    setNote('');
  };

  return (
    <dialog
      ref={dialogRef}
      className="order-dialog"
      closedby="any"
      aria-labelledby="order-drawer-title"
    >
      <div className="dialog-head">
        <div>
          <span className="mono-label">Online Pickup</span>
          <h2 id="order-drawer-title">Your Order Tray</h2>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={() => {
            setPlacedOrder(null);
            onClose();
          }}
          aria-label="Close order tray"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className="dialog-body">
        {placedOrder ? (
          <div className="reservation-pass" role="status" aria-live="polite">
            <span className="mono-label">Ticket · {placedOrder.code}</span>
            <h3>Preparing your order.</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Ready for <strong>{placedOrder.customer}</strong> at the Indiranagar pickup counter{' '}
              <strong>{placedOrder.pickupTime.toLowerCase()}</strong>.
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
              <span className="mono-label">{placedOrder.count} Items</span>
              <span className="mono-label" style={{ color: 'var(--ink)' }}>
                Total {placedOrder.total}
              </span>
            </div>
            {placedOrder.note && (
              <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                Note: {placedOrder.note}
              </p>
            )}
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginTop: '1.25rem', width: '100%' }}
              onClick={() => {
                setPlacedOrder(null);
                onClose();
              }}
            >
              Return to Menu
            </button>
          </div>
        ) : itemsInTray.length === 0 ? (
          <div style={{ paddingBlock: '3rem', textAlign: 'center' }}>
            <p className="mono-label" style={{ marginBottom: '0.75rem' }}>
              Empty Tray
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
              Select espresso, pour-overs, pastries, or sourdough plates from the daily board to
              schedule a counter pickup.
            </p>
            <a href="#menu" className="btn btn-outline" onClick={onClose}>
              Browse Daily Menu
            </a>
          </div>
        ) : (
          <div>
            {itemsInTray.map((item) => (
              <div key={item.id} className="order-item-row">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="order-item-thumb"
                  width="60"
                  height="60"
                />
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.94rem' }}>{item.name}</div>
                  <div className="mono-label" style={{ marginTop: '0.2rem' }}>
                    {formatINR(item.price * cart[item.id])}
                  </div>
                </div>
                <div className="qty-pill" aria-label={`Quantity of ${item.name}`}>
                  <button
                    type="button"
                    onClick={() => onDecrement(item.id)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>
                  <span>{cart[item.id]}</span>
                  <button
                    type="button"
                    onClick={() => onAdd(item)}
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1.1rem' }}>
              <div className="field">
                <label>Pickup Time</label>
                <div className="slot-pills" role="group" aria-label="Choose pickup window">
                  {PICKUP_WINDOWS.map((win) => (
                    <button
                      key={win}
                      type="button"
                      className="slot-pill"
                      aria-pressed={pickupTime === win}
                      onClick={() => setPickupTime(win)}
                    >
                      {win}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="order-note">Barista / Kitchen Note</label>
                <input
                  id="order-note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Oat milk, extra hot, sliced in half..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {!placedOrder && itemsInTray.length > 0 && (
        <div className="dialog-foot">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1rem',
            }}
          >
            <span className="mono-label">Subtotal ({totalCount} items)</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem' }}>
              {formatINR(subtotal)}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handlePlaceOrder}
          >
            Place Pickup Order · {formatINR(subtotal)}
          </button>
        </div>
      )}
    </dialog>
  );
}
