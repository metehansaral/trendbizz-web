'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">
              TB
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors">
              TRENDBIZZ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/urunler" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Ürünler
            </Link>
            <Link href="/buyuk-beden" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              Büyük Beden
            </Link>
            <Link href="/markalar" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Markalar
            </Link>
          </nav>

          {/* Location badge + mobile menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-full">
              <span>📍</span>
              <span>Beşiktaş, İstanbul</span>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              <div className="w-5 h-0.5 bg-current mb-1"></div>
              <div className="w-5 h-0.5 bg-current mb-1"></div>
              <div className="w-5 h-0.5 bg-current"></div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-900 py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium py-1 text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>Ana Sayfa</Link>
            <Link href="/urunler" className="block text-sm font-medium py-1 text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>Ürünler</Link>
            <Link href="/buyuk-beden" className="block text-sm font-semibold py-1 text-violet-600" onClick={() => setMenuOpen(false)}>Büyük Beden</Link>
            <Link href="/markalar" className="block text-sm font-medium py-1 text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>Markalar</Link>
            <div className="pt-2 text-xs text-gray-500">📍 Beşiktaş, İstanbul</div>
          </div>
        )}
      </div>
    </header>
  );
}
