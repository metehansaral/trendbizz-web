'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--bd)' : 'transparent'}`,
        transition: 'border-color 200ms ease',
      }}
    >
      <div
        className="wrap"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}
      >
        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--fg)' }}>
          <span
            className="font-display"
            style={{ fontWeight: 700, fontSize: '22px', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Trendbizz
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: '36px' }}>
          <Link href="/urunler" className="nav-link">Ürünler</Link>
          <Link href="/buyuk-beden" className="nav-link" style={{ color: 'var(--accent)' }}>Büyük Beden</Link>
          <Link href="/markalar" className="nav-link">Markalar</Link>
        </nav>

        {/* Location + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="label hidden md:block">Beşiktaş, İstanbul</span>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--fg)',
              lineHeight: 0,
            }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid var(--bd)',
            backgroundColor: 'var(--bg)',
            padding: '16px 5vw 24px',
          }}
        >
          <Link
            href="/urunler"
            className="nav-link"
            style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}
            onClick={() => setMenuOpen(false)}
          >
            Ürünler
          </Link>
          <Link
            href="/buyuk-beden"
            className="nav-link"
            style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--bd)', color: 'var(--accent)' }}
            onClick={() => setMenuOpen(false)}
          >
            Büyük Beden
          </Link>
          <Link
            href="/markalar"
            className="nav-link"
            style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--bd)' }}
            onClick={() => setMenuOpen(false)}
          >
            Markalar
          </Link>
          <p className="label" style={{ marginTop: '20px' }}>Beşiktaş, İstanbul</p>
        </div>
      )}
    </header>
  );
}
