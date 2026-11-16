import React, { useEffect, useMemo, useState } from 'react';
import { MENU_ITEMS } from './data/cafeData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { OrderDrawer } from './components/OrderDrawer';
import { AuthModal } from './components/AuthModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { Footer } from './components/Footer';

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('kissa-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore storage access issues
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [cart, setCart] = useState({});
  const [trayOpen, setTrayOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [priceOverrides, setPriceOverrides] = useState(() =>
    readStoredJson('kissa-price-overrides', {})
  );
  const [orders, setOrders] = useState(() => readStoredJson('kissa-orders', []));
  const [reservations, setReservations] = useState(() =>
    readStoredJson('kissa-reservations', [])
  );

  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) =>
        priceOverrides[item.id] ? { ...item, price: priceOverrides[item.id] } : item
      ),
    [priceOverrides]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('kissa-theme', theme);
    } catch {
      // ignore storage access issues
    }
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (!localStorage.getItem('kissa-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Hidden owner portal access via private URL hash (#owner-portal) or Ctrl/Cmd+Shift+K
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#owner-portal') {
        setOwnerOpen(true);
      }
    };
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOwnerOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (!nodes.length || !('IntersectionObserver' in window)) return;

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        node.dataset.reveal = 'pending';
      } else {
        node.dataset.reveal = 'visible';
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = 'visible';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setCart((prev) => {
      const nextQty = (prev[itemId] || 0) - 1;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: nextQty };
    });
  };

  const handleOrderPlaced = (ticket) => {
    setOrders((prev) => {
      const next = [ticket, ...prev];
      try {
        localStorage.setItem('kissa-orders', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleReservationCreated = (booking) => {
    setReservations((prev) => {
      const next = [booking, ...prev];
      try {
        localStorage.setItem('kissa-reservations', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdateOrderStatus = (code, status) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.code === code ? { ...o, status } : o));
      try {
        localStorage.setItem('kissa-orders', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdateReservationStatus = (code, status) => {
    setReservations((prev) => {
      const next = prev.map((r) => (r.code === code ? { ...r, status } : r));
      try {
        localStorage.setItem('kissa-reservations', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdatePrice = (id, price) => {
    setPriceOverrides((prev) => {
      const next = { ...prev, [id]: price };
      try {
        localStorage.setItem('kissa-price-overrides', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleResetPrices = () => {
    setPriceOverrides({});
    try {
      localStorage.removeItem('kissa-price-overrides');
    } catch {}
  };

  const closeOwnerPortal = () => {
    setOwnerOpen(false);
    if (window.location.hash === '#owner-portal') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const trayCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        trayCount={trayCount}
        onOpenTray={() => setTrayOpen(true)}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onSignOut={() => setUser(null)}
      />

      <main id="main-content">
        <Hero />
        <FeaturedCarousel
          menuItems={menuItems}
          onAddToOrder={(item) => {
            handleAdd(item);
            setTrayOpen(true);
          }}
        />
        <MenuSection
          menuItems={menuItems}
          cart={cart}
          onAdd={handleAdd}
          onDecrement={handleDecrement}
        />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <ReservationSection onReservationCreated={handleReservationCreated} />
      </main>

      <Footer />

      <OrderDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        menuItems={menuItems}
        cart={cart}
        onAdd={handleAdd}
        onDecrement={handleDecrement}
        onClear={() => setCart({})}
        user={user}
        onOrderPlaced={handleOrderPlaced}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(signedUser) => setUser(signedUser)}
      />

      <OwnerPortalModal
        isOpen={ownerOpen}
        onClose={closeOwnerPortal}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        reservations={reservations}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        menuItems={menuItems}
        onUpdatePrice={handleUpdatePrice}
        onResetPrices={handleResetPrices}
      />
    </>
  );
}

export default App;
