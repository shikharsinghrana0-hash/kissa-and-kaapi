import React, { useMemo, useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS, formatINR } from '../data/cafeData';

export function MenuSection({ menuItems = MENU_ITEMS, cart, onAdd, onDecrement }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const catOk = activeCategory === 'All' || item.category === activeCategory;
      const dietOk = dietaryFilter === 'All' || item.tags.includes(dietaryFilter);
      return catOk && dietOk;
    });
  }, [menuItems, activeCategory, dietaryFilter]);

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <span className="mono-label">01 / Daily Board</span>
            <h2 className="section-title">
              Crafted from the <em>roastery &amp; oven</em>
            </h2>
          </div>
          <p className="section-intro">
            Seasonal filter coffees, laminated morning pastry, toasted levain plates, and house
            botanicals prepared to order for the dining room or pickup.
          </p>
        </div>

        <div className="menu-controls">
          <div className="menu-tabs" role="group" aria-label="Filter menu by category">
            {MENU_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className="filter-chip"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-dietary-select">
            <label htmlFor="dietary-select" className="mono-label">
              Dietary
            </label>
            <select
              id="dietary-select"
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
            >
              <option value="All">All items</option>
              <option value="V">Vegetarian (V)</option>
              <option value="GF">Gluten-Free (GF)</option>
              <option value="House Roast">House Roast</option>
            </select>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p style={{ color: 'var(--muted)', paddingBlock: '2rem' }}>
            No items match that combination. Try resetting the dietary filter.
          </p>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <article key={item.id} className="menu-card reveal">
                  <div className="menu-card-media">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                    <span className="menu-card-category">{item.category}</span>
                  </div>

                  <div className="menu-card-meta">{item.meta}</div>

                  <div className="menu-card-head">
                    <h3>{item.name}</h3>
                    <span className="menu-card-price">{formatINR(item.price)}</span>
                  </div>

                  <p className="menu-card-desc">{item.description}</p>

                  <div className="menu-card-foot">
                    <div className="menu-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="menu-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {qty > 0 ? (
                      <div className="qty-pill" aria-label={`Quantity of ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => onDecrement(item.id)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          −
                        </button>
                        <span>{qty}</span>
                        <button
                          type="button"
                          onClick={() => onAdd(item)}
                          aria-label={`Add one more ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => onAdd(item)}
                      >
                        + Add to Order
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
