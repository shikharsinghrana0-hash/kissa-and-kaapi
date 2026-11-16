import React, { useEffect, useRef, useState } from 'react';
import { CAFE_INFO, SEATING_OPTIONS, TIME_SLOTS } from '../data/cafeData';
import { attachAccessibleFormSync } from '../utils/formAriaSync';

const getTodayIso = () => new Date().toISOString().split('T')[0];

export function ReservationSection({ onReservationCreated }) {
  const formRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState('09:30');
  const [seating, setSeating] = useState(SEATING_OPTIONS[0].id);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    return attachAccessibleFormSync(formRef.current);
  }, [confirmation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const controls = Array.from(form.querySelectorAll('input, select, textarea'));
    let firstInvalid = null;

    controls.forEach((el) => {
      if (!el.checkValidity()) {
        el.dataset.submittedInvalid = 'true';
        el.setAttribute('aria-invalid', 'true');
        const errId = el.dataset.error;
        if (errId) {
          const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
          if (!ids.includes(errId)) ids.push(errId);
          el.setAttribute('aria-describedby', ids.join(' '));
        }
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
    const seatingObj = SEATING_OPTIONS.find((s) => s.id === seating);
    const booking = {
      code: `KK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.get('name'),
      contact: data.get('email'),
      phone: data.get('phone'),
      guests: data.get('guests'),
      date: data.get('date'),
      time: selectedTime,
      seating: seatingObj ? seatingObj.label : 'Main Room',
      message: data.get('message'),
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setConfirmation(booking);
    if (onReservationCreated) onReservationCreated(booking);
  };

  return (
    <section id="reserve" className="reservation-section">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <span className="mono-label">04 / Contact &amp; Table Booking</span>
            <h2 className="section-title">
              Visit us or <em>reserve a table</em>
            </h2>
          </div>
          <p className="section-intro">
            Walk-ins are always welcome at the espresso counter. Book ahead for weekend brunch,
            courtyard tables, or special dietary requests.
          </p>
        </div>

        <div className="reservation-grid">
          <div className="contact-panel reveal">
            <div className="contact-block" style={{ borderTop: 'none', paddingTop: 0 }}>
              <span className="mono-label">Location</span>
              <h3>{CAFE_INFO.address}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
                Five minutes from Indiranagar Metro Station. Covered bicycle stand outside the
                courtyard gate.
              </p>
            </div>

            <div className="contact-block">
              <span className="mono-label">Opening Hours</span>
              <div className="hours-list" style={{ marginTop: '0.65rem' }}>
                {CAFE_INFO.hours.map((row) => (
                  <div key={row.days} className="hours-row">
                    <span>{row.days}</span>
                    <span className="mono-label" style={{ color: 'var(--ink)' }}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-block">
              <span className="mono-label">Direct Contact</span>
              <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.65rem', fontSize: '0.94rem' }}>
                <a href={`tel:${CAFE_INFO.phone}`}>{CAFE_INFO.phone}</a>
                <a href={`mailto:${CAFE_INFO.email}`} style={{ color: 'var(--accent)' }}>
                  {CAFE_INFO.email}
                </a>
                <span className="mono-label">Instagram · {CAFE_INFO.instagram}</span>
              </div>
            </div>

            <div className="contact-block">
              <span className="mono-label">Seating Rooms</span>
              <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.65rem' }}>
                {SEATING_OPTIONS.map((opt) => (
                  <div key={opt.id}>
                    <strong style={{ fontWeight: 500, fontSize: '0.92rem' }}>{opt.label}</strong>
                    <p style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{opt.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reservation-form-card reveal">
            {confirmation ? (
              <div className="reservation-pass" role="status" aria-live="polite">
                <span className="mono-label">Table Pass · {confirmation.code}</span>
                <h3>We look forward to welcoming you, {confirmation.name}.</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
                  A confirmation note has been prepared for <strong>{confirmation.contact}</strong>.
                </p>

                <dl className="pass-details">
                  <div>
                    <dt className="mono-label">Date &amp; Time</dt>
                    <dd style={{ margin: '0.2rem 0 0' }}>
                      {confirmation.date} · {confirmation.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-label">Party Size</dt>
                    <dd style={{ margin: '0.2rem 0 0' }}>{confirmation.guests} Guests</dd>
                  </div>
                  <div>
                    <dt className="mono-label">Seating Area</dt>
                    <dd style={{ margin: '0.2rem 0 0' }}>{confirmation.seating}</dd>
                  </div>
                  <div>
                    <dt className="mono-label">Contact Phone</dt>
                    <dd style={{ margin: '0.2rem 0 0' }}>{confirmation.phone}</dd>
                  </div>
                </dl>

                {confirmation.message && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
                    <strong>Note to kitchen:</strong> {confirmation.message}
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setConfirmation(null)}
                >
                  Make Another Reservation or Inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="mono-label">Table Request &amp; General Inquiry</span>
                  <h3 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>
                    Book your table or send a note
                  </h3>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="res-name">Full Name</label>
                    <input
                      id="res-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      placeholder="Aarav Sharma"
                      autoComplete="name"
                      data-error="res-name-error"
                    />
                    <span id="res-name-error" className="error-msg">
                      Please enter your name (at least 2 characters).
                    </span>
                  </div>

                  <div className="field">
                    <label htmlFor="res-email">Email Address</label>
                    <input
                      id="res-email"
                      name="email"
                      type="email"
                      required
                      placeholder="aarav@example.in"
                      autoComplete="email"
                      data-error="res-email-error"
                    />
                    <span id="res-email-error" className="error-msg">
                      Please enter a valid email address.
                    </span>
                  </div>

                  <div className="field">
                    <label htmlFor="res-phone">Phone Number</label>
                    <input
                      id="res-phone"
                      name="phone"
                      type="tel"
                      required
                      pattern="[0-9+\s\(\)\-]{7,20}"
                      placeholder="+91 98450 12345"
                      autoComplete="tel"
                      data-error="res-phone-error"
                    />
                    <span id="res-phone-error" className="error-msg">
                      Please enter a valid phone number (7+ digits).
                    </span>
                  </div>

                  <div className="field">
                    <label htmlFor="res-guests">Guests</label>
                    <select id="res-guests" name="guests" defaultValue="2" required>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests (Communal)</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="res-date">Preferred Date</label>
                    <input
                      id="res-date"
                      name="date"
                      type="date"
                      required
                      min={getTodayIso()}
                      defaultValue={getTodayIso()}
                      data-error="res-date-error"
                    />
                    <span id="res-date-error" className="error-msg">
                      Please choose today or a future date.
                    </span>
                  </div>

                  <div className="field">
                    <label htmlFor="res-seating">Seating Zone</label>
                    <select
                      id="res-seating"
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                    >
                      {SEATING_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field form-full">
                    <label>Preferred Arrival Window</label>
                    <div className="slot-pills" role="group" aria-label="Preferred reservation time">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className="slot-pill"
                          aria-pressed={selectedTime === slot}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field form-full">
                    <label htmlFor="res-message">Special Request or Message</label>
                    <textarea
                      id="res-message"
                      name="message"
                      rows={3}
                      placeholder="Allergies, celebration note, quiet window seat, or private tasting inquiry..."
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span className="mono-label">Instant Confirmation · No Deposit</span>
                  <button type="submit" className="btn btn-primary">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
