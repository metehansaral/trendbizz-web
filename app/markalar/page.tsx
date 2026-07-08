import Link from 'next/link';
import { getAllBrands, getAllProducts } from '@/lib/data';

export const metadata = {
  title: 'Markalar | Trendbizz',
  description: 'Off-White, AllSaints ve daha fazlası. Trendbizz\'in taşıdığı tüm markalar.',
};

const TIER_CONFIG = {
  luxury: { label: 'Lüks', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: '#D97706' },
  premium: { label: 'Premium', color: 'text-gray-700 bg-gray-50 border-gray-200', dot: '#6B7280' },
  casual: { label: 'Günlük', color: 'text-violet-700 bg-violet-50 border-violet-200', dot: '#7C3AED' },
};

export default function BrandsPage() {
  const brands = getAllBrands();
  const products = getAllProducts();

  const brandWithCount = brands.map(b => ({
    ...b,
    count: products.filter(p => p.brand_slug === b.slug).length,
  }));

  const luxuryBrands = brandWithCount.filter(b => b.tier === 'luxury');
  const premiumBrands = brandWithCount.filter(b => b.tier === 'premium');
  const casualBrands = brandWithCount.filter(b => b.tier === 'casual');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Portföy</p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Taşıdığımız Markalar</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Lüksten günlük giyime, geniş marka seçkimizi keşfedin.
        </p>
      </div>

      {/* Luxury */}
      {luxuryBrands.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Lüks</h2>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              ✦ Premium Tier
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {luxuryBrands.map(brand => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>
      )}

      {/* Premium */}
      {premiumBrands.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-5">Premium</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumBrands.map(brand => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>
      )}

      {/* Casual */}
      {casualBrands.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-5">Günlük & Kendi Markamız</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {casualBrands.map(brand => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BrandCard({ brand }: { brand: ReturnType<typeof getAllBrands>[0] & { count: number } }) {
  const tier = TIER_CONFIG[brand.tier as keyof typeof TIER_CONFIG] ?? TIER_CONFIG.casual;

  return (
    <Link
      href={`/markalar/${brand.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg transition-all duration-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
          style={{ backgroundColor: brand.logo_color }}
        >
          {brand.name.charAt(0)}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${tier.color}`}>
          {tier.label}
        </span>
      </div>
      <h3 className="font-black text-xl text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 transition-colors">
        {brand.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {brand.count} ürün
      </p>
      <div className="mt-4 text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
        Ürünleri Gör →
      </div>
    </Link>
  );
}
