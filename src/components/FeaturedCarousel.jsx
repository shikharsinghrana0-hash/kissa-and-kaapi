import React, { useEffect, useRef, useState } from 'react';
import { FEATURED_SLIDES, MENU_ITEMS, formatINR } from '../data/cafeData';

export function FeaturedCarousel({ menuItems = MENU_ITEMS, onAddToOrder }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const pendingIndexRef = useRef(null);
  const settledIndexRef = useRef(0);

  const getNearestIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const slides = Array.from(track.children);
    const center = track.scrollLeft + track.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  const scrollToSlide = (targetIdx) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (targetIdx + FEATURED_SLIDES.length) % FEATURED_SLIDES.length;
    const slide = track.children[clamped];
    if (!slide) return;
    pendingIndexRef.current = clamped;
    setActiveIndex(clamped);
    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let debounceTimer = 0;

    const handleSettled = () => {
      const idx = pendingIndexRef.current !== null ? pendingIndexRef.current : getNearestIndex();
      pendingIndexRef.current = null;
      if (idx !== settledIndexRef.current) {
        settledIndexRef.current = idx;
        setActiveIndex(idx);
        setStatusMessage(`Slide ${idx + 1} of ${FEATURED_SLIDES.length}: ${FEATURED_SLIDES[idx].title}`);
      }
    };

    const onScroll = () => {
      if (pendingIndexRef.current === null) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const nearest = getNearestIndex();
          setActiveIndex((prev) => (prev === nearest ? prev : nearest));
        });
      }
      if (!('onscrollend' in window)) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSettled, 120);
      }
    };

    const onScrollEnd = () => handleSettled();

    track.addEventListener('scroll', onScroll, { passive: true });
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', onScrollEnd);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(debounceTimer);
      track.removeEventListener('scroll', onScroll);
      if ('onscrollend' in window) {
        track.removeEventListener('scrollend', onScrollEnd);
      }
    };
  }, []);

  return (
    <section
      className="carousel-section"
      aria-roledescription="carousel"
      aria-label="Seasonal highlights"
    >
      <div className="container">
        <div className="carousel-toolbar">
          <div>
            <span className="mono-label">Seasonal Table · Autumn Dispatch</span>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => scrollToSlide(activeIndex - 1)}
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => scrollToSlide(activeIndex + 1)}
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="carousel-track"
          tabIndex={0}
          role="group"
          aria-label="Seasonal featured slides"
        >
          {FEATURED_SLIDES.map((slide, index) => {
            const linkedItem = menuItems.find((m) => m.id === slide.menuItemId);
            return (
              <article
                key={slide.id}
                className="carousel-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${FEATURED_SLIDES.length}`}
              >
                <div className="carousel-slide-img">
                  <img src={slide.image} alt={slide.alt} width="960" height="600" />
                </div>
                <div className="carousel-slide-body">
                  <span className="mono-label">{slide.kicker}</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.caption}</p>
                  {linkedItem && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onAddToOrder(linkedItem)}
                      >
                        Add to Order · {formatINR(linkedItem.price)}
                      </button>
                      <a href="#menu" className="mono-label" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                        Full Menu ↓
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {statusMessage}
        </p>

        <nav className="carousel-markers" aria-label="Choose a seasonal slide">
          {FEATURED_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
