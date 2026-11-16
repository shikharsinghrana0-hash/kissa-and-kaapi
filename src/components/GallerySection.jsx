import React, { useMemo, useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { useModalDialog } from '../utils/useModalDialog';

const GALLERY_FILTERS = ['All', 'Interior', 'Coffee Bar', 'Kitchen & Pastry'];

export function GallerySection() {
  const [filter, setFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const visibleItems = useMemo(() => {
    if (filter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  const activePhoto = lightboxIdx !== null ? visibleItems[lightboxIdx] : null;
  const dialogRef = useModalDialog(lightboxIdx !== null, () => setLightboxIdx(null));

  const stepPhoto = (delta) => {
    if (lightboxIdx === null || visibleItems.length === 0) return;
    setLightboxIdx((lightboxIdx + delta + visibleItems.length) % visibleItems.length);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <span className="mono-label">03 / Visual Journal</span>
            <h2 className="section-title">
              Frames from the <em>space &amp; table</em>
            </h2>
          </div>

          <div className="menu-tabs" role="group" aria-label="Filter gallery photos">
            {GALLERY_FILTERS.map((tab) => (
              <button
                key={tab}
                type="button"
                className="filter-chip"
                aria-pressed={filter === tab}
                onClick={() => {
                  setFilter(tab);
                  setLightboxIdx(null);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {visibleItems.map((item, idx) => {
            const spanClass =
              filter === 'All' && item.span === 'wide'
                ? 'gallery-tile gallery-tile--wide'
                : filter === 'All' && item.span === 'tall'
                ? 'gallery-tile gallery-tile--tall'
                : 'gallery-tile';
            return (
              <figure key={item.id} className={`${spanClass} reveal`} style={{ margin: 0 }}>
                <button
                  type="button"
                  className="gallery-tile-btn"
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`View larger image: ${item.title}`}
                >
                  <img src={item.image} alt={item.alt} loading="lazy" width="1000" height="750" />
                </button>
                <figcaption className="gallery-tile-caption">
                  <span className="gallery-tile-title">{item.title}</span>
                  <span className="mono-label">{item.category}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        closedby="any"
        aria-labelledby="lightbox-title"
      >
        {activePhoto && (
          <div>
            <div className="dialog-head">
              <div>
                <span className="mono-label">{activePhoto.category}</span>
                <h2 id="lightbox-title">{activePhoto.title}</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close photo viewer"
                autoFocus
              >
                Close
              </button>
            </div>
            <figure className="lightbox-figure">
              <img src={activePhoto.image} alt={activePhoto.alt} />
              <figcaption
                style={{
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
                  {activePhoto.caption}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => stepPhoto(-1)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => stepPhoto(1)}
                  >
                    Next
                  </button>
                </div>
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </section>
  );
}
