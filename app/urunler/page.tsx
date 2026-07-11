'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/data';

const BTN_BASE: React.CSSProperties = {
  border: '1px solid var(--bd)',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  padding: '7px 14px',
  fontFamily: 'var(--font-jost), system-ui, sans-serif',
  color: 'var(--fg2)',
  transition: 'all 150ms ease',
};

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyPlusSize, setOnlyPlusSize] = useState(false);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedCategory && p.category_slug !== selectedCategory) return false;
      if (selectedBrand && p.brand_slug !== selectedBrand) return false;
      if (onlyNew && p.is_new !== 1) return false;
      if (onlyPlusSize && !p.sizes.some(s => s.is_plus === 1)) return false;
      return true;
    });
  }, [allProducts, selectedCategory, selectedBrand, onlyNew, onlyPlusSize]);

  const activeFilters = [selectedCategory, selectedBrand, onlyNew, onlyPlusSize].filter(Boolean).length;

  return (
    <div className="wrap" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ paddingBottom: '40px', borderBottom: '1px solid var(--bd)', marginBottom: '32px' }}>
        <p className="label" style={{ marginBottom: '8px' }}>Koleksiyon</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <h1
            className="font-display"
            style={{ fontSize: '48px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            Tüm Ürünler
          </h1>
          <span className="label">{filtered.length} ürün</span>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px',
          alignItems: 'center',
        }}
      >
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">Tüm Kategoriler</option>
          {categories.map(c => (
            <option key={c.slug} value={c.slug}>{c.name_tr}</option>
          ))}
        </select>

        <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
          <option value="">Tüm Markalar</option>
          {brands.map(b => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>

        <button
          onClick={() => setOnlyNew(!onlyNew)}
          style={{
            ...BTN_BASE,
            background: onlyNew ? 'var(--fg)' : 'transparent',
            color: onlyNew ? 'var(--bg)' : 'var(--fg2)',
            borderColor: onlyNew ? 'var(--fg)' : 'var(--bd)',
          }}
        >
          YENİ GELENLER
        </button>

        <button
          onClick={() => setOnlyPlusSize(!onlyPlusSize)}
          style={{
            ...BTN_BASE,
            background: onlyPlusSize ? 'var(--accent)' : 'transparent',
            color: onlyPlusSize ? 'var(--paper)' : 'var(--accent)',
            borderColor: 'var(--accent)',
          }}
        >
          BÜYÜK BEDEN
        </button>

        {activeFilters > 0 && (
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedBrand('');
              setOnlyNew(false);
              setOnlyPlusSize(false);
            }}
            style={{
              ...BTN_BASE,
              border: 'none',
              color: 'var(--fg2)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              padding: '7px 4px',
            }}
          >
            TEMİZLE ({activeFilters})
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="auto-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p
            className="font-display"
            style={{ fontSize: '32px', color: 'var(--fg2)', marginBottom: '8px' }}
          >
            Ürün bulunamadı
          </p>
          <p style={{ fontSize: '13px', color: 'var(--fg2)' }}>Farklı filtreler deneyin</p>
        </div>
      )}
    </div>
  );
}
