import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setSubscribed(true);
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <BrandLogo size={38} />
              <h2 style={{ margin: 0 }}>{CAFE_INFO.name}</h2>
            </div>
            <p style={{ color: 'var(--muted)', maxWidth: '34ch', fontSize: '0.92rem' }}>
              Neighborhood coffee roastery, stone-milled bakehouse, and all-day kitchen in
              Indiranagar, Bengaluru.
            </p>

            {subscribed ? (
              <p className="mono-label" style={{ marginTop: '1.15rem', color: 'var(--sage)' }}>
                Added to our seasonal roast dispatch.
              </p>
            ) : (
              <form className="newsletter-row" onSubmit={handleNewsletter}>
                <label htmlFor="footer-newsletter" className="visually-hidden">
                  Email for roast dispatch
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  placeholder="Roast &amp; menu dispatch email"
                />
                <button type="submit" className="btn btn-outline">
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="footer-col">
            <h3>Navigation</h3>
            <ul className="footer-links">
              <li><a href="#top">Home</a></li>
              <li><a href="#menu">Seasonal Menu</a></li>
              <li><a href="#about">Our House</a></li>
              <li><a href="#gallery">Visual Journal</a></li>
              <li><a href="#reserve">Reservations</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Hours</h3>
            <ul className="footer-links">
              {CAFE_INFO.hours.map((row) => (
                <li key={row.days}>
                  <span style={{ color: 'var(--muted)' }}>{row.days}:</span> {row.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li>{CAFE_INFO.address}</li>
              <li>
                <a href={`tel:${CAFE_INFO.phone}`}>{CAFE_INFO.phone}</a>
              </li>
              <li>
                <a href={`mailto:${CAFE_INFO.email}`}>{CAFE_INFO.email}</a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram ({CAFE_INFO.instagram})
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                  Pinterest Archive
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {CAFE_INFO.name}. Small-batch coffee &amp; bakehouse.
          </span>
          <a href="#top" className="mono-label">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
