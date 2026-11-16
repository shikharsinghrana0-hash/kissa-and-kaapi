import React from 'react';
import { CAFE_INFO } from '../data/cafeData';

export function Hero() {
  return (
    <>
      <section id="top" className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-kicker">
              <span className="hero-kicker-line" aria-hidden="true" />
              <span className="mono-label">
                {CAFE_INFO.established} · Bengaluru
              </span>
            </div>

            <h1 className="hero-title">
              Single-estate coffee, <em>warm levain</em>, and unhurried mornings.
            </h1>

            <p className="hero-lead prose">
              Kissa &amp; Kaapi is an independent neighborhood roastery, stone-milled bakehouse, and
              all-day kitchen. We roast Chikmagalur micro-lots each Monday and pull khappli wheat
              sourdough from the deck oven before dawn.
            </p>

            <div className="hero-cta-row">
              <a href="#menu" className="btn btn-primary">
                Explore Daily Menu
              </a>
              <a href="#reserve" className="btn btn-outline">
                Reserve a Table
              </a>
            </div>

            <dl className="hero-meta-bar">
              <div className="hero-meta-item">
                <dt>Weekdays</dt>
                <dd>Tue–Fri, 07:30 – 21:30</dd>
              </div>
              <div className="hero-meta-item">
                <dt>Weekends</dt>
                <dd>Sat–Sun, 08:00 – 22:30</dd>
              </div>
              <div className="hero-meta-item">
                <dt>Address</dt>
                <dd>{CAFE_INFO.shortAddress}</dd>
              </div>
            </dl>
          </div>

          <figure className="hero-media-frame" style={{ margin: 0 }}>
            <div className="hero-photo-wrap">
              <img
                src="/images/hero-pour.jpg"
                alt="Barista pouring hot water from a matte black gooseneck kettle into a ribbed ceramic V60 dripper"
                fetchPriority="high"
                width="960"
                height="1200"
              />
            </div>
            <figcaption className="hero-caption-bar">
              <span className="mono-label">00 / Brew Bar — Chikmagalur V60</span>
              <span className="mono-label">{CAFE_INFO.coordinates}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="house-strip" aria-label="Roastery and kitchen notes">
        <div className="container house-strip-inner">
          <span className="mono-label">Chikmagalur &amp; Coorg Single Estates</span>
          <span className="mono-label">48-Hour Stone-Milled Khappli Levain</span>
          <span className="mono-label">Honest Everyday Neighbourhood Pricing</span>
          <span className="mono-label">Twelve-Seat Limestone Courtyard</span>
        </div>
      </div>
    </>
  );
}
