import React from 'react';
import { TESTIMONIALS } from '../data/cafeData';

export function TestimonialsSection() {
  return (
    <section className="quotes-section" aria-label="Guest notes and press">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <span className="mono-label">Notes from the Room</span>
        </div>

        <div className="quotes-grid">
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className="quote-card reveal">
              <blockquote>{item.quote}</blockquote>
              <footer>
                <div className="quote-author">{item.author}</div>
                <div className="quote-role">{item.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
