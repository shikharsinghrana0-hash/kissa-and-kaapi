import React from 'react';

const PILLARS = [
  {
    num: '01',
    title: 'Direct-Estate Indian Coffee',
    body: 'We partner directly with family-run estates in Baba Budangiri, Chikmagalur, and Coorg, roasting light every Monday to let sweet origin notes shine.',
  },
  {
    num: '02',
    title: '48-Hour Khappli Wheat Levain',
    body: 'Our sourdough loaves and viennoiserie are fermented slowly with freshly stone-milled Indian emmer wheat, cultured butter, and sea salt.',
  },
  {
    num: '03',
    title: 'A Room Built for Quiet Hours',
    body: 'Teak and oak communal tables, limewashed walls, and a twelve-seat limestone courtyard built for reading, long conversations, and easy lunches.',
  },
  {
    num: '04',
    title: 'Barista & Kitchen Services',
    body: 'Walk-in filter & espresso counter, all-day dining room, same-day online pickup ordering, and Friday evening single-estate cupping sessions.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <span className="mono-label">02 / Our House</span>
            <h2 className="section-title">
              Warmth, restraint, and <em>honest ingredients</em>
            </h2>
          </div>
          <p className="section-intro">
            Opened in 2019 in a converted timber bungalow in Indiranagar, Kissa &amp; Kaapi brings
            together a neighborhood bakery and an approachable specialty coffee bar.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-visuals reveal">
            <figure style={{ margin: 0 }}>
              <div className="about-img-main">
                <img
                  src="/images/interior-sunlight.jpg"
                  alt="Quiet minimalist cafe dining room with pale oak communal table, cane chairs, and tall morning windows"
                  loading="lazy"
                  width="1200"
                  height="900"
                />
              </div>
              <figcaption className="about-caption" style={{ marginTop: '0.7rem' }}>
                <span>Main Dining Room · Morning Light</span>
                <span className="mono-label">28 Seats + Courtyard</span>
              </figcaption>
            </figure>
          </div>

          <div className="reveal">
            <p className="about-story-lead">
              “We wanted a neighborhood room that felt as calm as a morning kitchen—somewhere anyone
              can sit with a freshly pulled coffee and warm bread at honest everyday prices.”
            </p>
            <p className="about-body prose">
              Every detail at Kissa &amp; Kaapi is shaped around slow fermentation and regional craft.
              Our stoneware cups are hand-thrown by studio potters across town, our milk arrives
              fresh each morning from local A2 farms, and our kitchen keeps things simple and welcoming.
            </p>

            <div className="about-pillars">
              {PILLARS.map((pillar) => (
                <div key={pillar.num} className="pillar-row">
                  <span className="mono-label" style={{ paddingTop: '0.25rem' }}>
                    {pillar.num}
                  </span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
