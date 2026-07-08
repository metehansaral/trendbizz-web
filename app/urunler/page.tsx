'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/data';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Koleksiyon</p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
          Tüm Ürünler
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{filtered.length} ürün bulundu</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-gray-900">
        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer hover:border-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map(c => (
            <option key={c.slug} value={c.slug}>{c.name_tr}</option>
          ))}
        </select>

        {/* Brand filter */}
        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
          className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer hover:border-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Tüm Markalar</option>
          {brands.map(b => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>

        {/* Toggle filters */}
        <button
          onClick={() => setOnlyNew(!onlyNew)}
          className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
            onlyNew
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
          }`}
        >
          Yeni Gelenler
        </button>

        <button
          onClick={() => setOnlyPlusSize(!onlyPlusSize)}
          className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
            onlyPlusSize
              ? 'bg-violet-600 text-white border-violet-600'
              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-violet-400'
          }`}
        >
          ✦ Büyük Beden
        </button>

        {/* Clear */}
        {activeFilters > 0 && (
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedBrand('');
              setOnlyNew(false);
              setOnlyPlusSize(false);
            }}
            className="text-sm text-red-500 hover:text-red-600 font-medium px-2"
          >
            Filtreleri Temizle ({activeFilters})
          </button>
        )}
      </div>

      {/* Products grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ürün bulunamadı</p>
          <p className="text-sm text-gray-500 mt-2">Farklı filtreler deneyin</p>
        </div>
      )}
    </div>
  );
}
