import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { PACK_TAG, PRODUCTS, productUrl, src, toneOf } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import { ANNOUNCEMENTS } from '../../content/brand';
import { HEADER_NAV } from '../../content/nav';
import { gsap, ScrollTrigger, reducedMotion } from '../../lib/gsap';
import { inert } from '../../lib/a11y';
import Icon from '../ui/Icon';
import { Logo } from '../ui/primitives';
import { useUI } from './uiState';

/** Rotating promo strip with prev/next controls (pauses on hover/focus). */
function Announcement() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const text = useRef<HTMLParagraphElement>(null);
  const n = ANNOUNCEMENTS.length;

  useEffect(() => {
    if (paused || reducedMotion()) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % n), 5200);
    return () => window.clearInterval(t);
  }, [paused, n]);

  useEffect(() => {
    if (!text.current || reducedMotion()) return;
    gsap.fromTo(text.current, { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' });
  }, [i]);

  return (
    <div
      className="announce"
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button className="announce__btn" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous announcement">
        <Icon name="chevronLeft" size={20} />
      </button>
      <p ref={text} className="announce__text" aria-live={paused ? 'polite' : 'off'}>
        {ANNOUNCEMENTS[i]}
      </p>
      <button className="announce__btn" onClick={() => setI((i + 1) % n)} aria-label="Next announcement">
        <Icon name="chevronRight" size={20} />
      </button>
    </div>
  );
}

function ShopPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div id="shop-panel" className={`mega ${open ? 'is-open' : ''}`} {...inert(!open)} aria-hidden={!open}>
      <div className="mega__inner wrap">
        <ul role="list" className="mega__products">
          {PRODUCTS.map((p) => {
            const price = unitPrice(p, 'one-time');
            return (
              <li key={p.sku}>
                <Link to={productUrl(p)} className={`mega__tile pcard--${toneOf(p)}`} onClick={onClose}>
                  <span className="mega__img">
                    <img src={src(p.images[0])} alt="" width={260} height={260} loading="lazy" />
                  </span>
                  <span className="chip chip--solid">{PACK_TAG[p.sku]}</span>
                  <strong>{p.packLabel}</strong>
                  <span className="mega__sub">{price !== null ? formatINR(price) : 'Price at launch'}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mega__side">
          <Link to="/ellura/shop" className="mega__link" onClick={onClose}>
            Shop all <Icon name="arrow" size={18} />
          </Link>
          <Link to="/ellura/subscribe" className="mega__link" onClick={onClose}>
            Subscribe &amp; Save <Icon name="arrow" size={18} />
          </Link>
          <Link to="/ellura/where-to-buy" className="mega__link" onClick={onClose}>
            Where to buy <Icon name="arrow" size={18} />
          </Link>
          <Link to="/ellura/subscribe" className="mega__promo" onClick={onClose}>
            <span className="t-mono">Subscribe &amp; Save</span>
            <span className="t-d3">
              10% off, <em>every</em> delivery.
            </span>
            <span className="t-sm">Free shipping · pause or cancel anytime</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { totals, setOpen: setCartOpen } = useCart();
  const { setSearchOpen, menuOpen, setMenuOpen } = useUI();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<number>();
  const countRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(totals.itemCount);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setHidden(false);
  }, [location.pathname, setMenuOpen]);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 8);
        if (y < 240) setHidden(false);
        else if (Math.abs(self.getVelocity()) > 40) setHidden(self.direction === 1);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (totals.itemCount > prevCount.current && countRef.current && !reducedMotion()) {
      gsap.fromTo(countRef.current, { scale: 0.3 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.45)' });
    }
    prevCount.current = totals.itemCount;
  }, [totals.itemCount]);

  const openMega = () => {
    window.clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    window.clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };
  const inShop = location.pathname.startsWith('/ellura/shop') || location.pathname.startsWith('/ellura/products');

  const renderLinks = (items: { label: string; to: string; mega?: boolean }[]) =>
    items.map((item) =>
      item.mega ? (
        <li key={item.to} onMouseEnter={openMega}>
          <button className={`header__link ${inShop ? 'is-active' : ''}`} aria-expanded={megaOpen} aria-controls="shop-panel" onClick={() => setMegaOpen((o) => !o)}>
            {item.label}
            <Icon name="chevron" size={14} />
          </button>
        </li>
      ) : (
        <li key={item.to} onMouseEnter={closeMegaSoon}>
          <NavLink to={item.to} className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}>
            {item.label}
          </NavLink>
        </li>
      ),
    );

  return (
    <>
      <Announcement />
      <header
        className={`header ${scrolled || megaOpen ? 'is-solid' : ''} ${hidden && !megaOpen && !menuOpen ? 'is-hidden' : ''}`}
        onMouseLeave={closeMegaSoon}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMegaOpen(false);
        }}
      >
        <div className="header__bar wrap">
          <button className="icon-btn header__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Icon name="menu" />
          </button>

          <Link to="/ellura" className="header__logo" aria-label="ellura home">
            <Logo tone="plum" height={32} />
          </Link>

          <nav className="header__nav" aria-label="Main">
            <ul role="list">{renderLinks(HEADER_NAV)}</ul>
          </nav>

          <div className="header__actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Icon name="search" />
            </button>
            <Link to="/ellura/account" className="icon-btn header__account" aria-label="My account">
              <Icon name="user" />
            </Link>
            <button className="icon-btn header__cart" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'}`}>
              <Icon name="bag" />
              {totals.itemCount > 0 && (
                <span ref={countRef} className="header__count" aria-hidden="true">
                  {totals.itemCount}
                </span>
              )}
            </button>
            <Link to="/ellura/shop" className="btn btn--sm header__cta">
              Shop now
            </Link>
          </div>
        </div>
        <ShopPanel open={megaOpen} onClose={() => setMegaOpen(false)} />
      </header>
      <div className={`mega-scrim ${megaOpen ? 'is-open' : ''}`} onClick={() => setMegaOpen(false)} aria-hidden="true" />
    </>
  );
}
