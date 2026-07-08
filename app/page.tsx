import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getAllCategories, getAllBrands } from '@/lib/data';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, #7C3AED 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #4F46E5 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
              <span>📍</span>
              <span>Beşiktaş, İstanbul</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              HER<br />
              <span className="text-violet-400">BEDEN,</span><br />
              HER STİL.
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
              Off-White, AllSaints ve daha fazlası. XS&apos;ten 6XL&apos;e kadar her beden — özellikle
              büyük beden koleksiyonumuzla her figüre yer var.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Koleksiyonu Gör
                <span>→</span>
              </Link>
              <Link
                href="/buyuk-beden"
                className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-violet-500 transition-colors text-sm sm:text-base"
              >
                Büyük Beden
                <span>✦</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative size pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-40">
          {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map(s => (
            <div
              key={s}
              className="bg-white/10 text-white text-xs font-bold w-12 h-8 rounded flex items-center justify-center border border-white/10 backdrop-blur-sm"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-violet-500">
            {[
              { value: '6+', label: 'Premium Marka' },
              { value: 'XS–6XL', label: 'Beden Aralığı' },
              { value: '13+', label: 'Ürün' },
            ].map(stat => (
              <div key={stat.label} className="py-5 px-4 sm:px-8 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-violet-200 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Kategoriler</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Ne Arıyorsun?</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/urunler?kategori=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-transparent hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors text-center">
                {cat.name_tr}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Plus Size Banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-violet-600 to-indigo-700 relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 py-16 sm:py-20">
          <div className="max-w-xl">
            <p className="text-violet-200 text-sm font-semibold uppercase tracking-wider mb-3">Özel Koleksiyon</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Büyük Beden<br />Ana Odağımız
            </h2>
            <p className="text-violet-100 text-base leading-relaxed mb-8">
              XL&apos;den 6XL&apos;e kadar özel tasarım ve seçilmiş markalar. Beden bir engel değil, bir tercih.
            </p>
            <Link
              href="/buyuk-beden"
              className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-6 py-3 rounded-full hover:bg-violet-50 transition-colors"
            >
              Büyük Beden Koleksiyonu
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Öne Çıkanlar</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Seçili Ürünler</h2>
          </div>
          <Link href="/urunler" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Markalar</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Taşıdığımız Markalar</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map(brand => (
            <Link
              key={brand.slug}
              href={`/markalar/${brand.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-900 transition-all hover:shadow-md"
            >
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: brand.logo_color }} />
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {brand.name}
              </span>
              {brand.tier === 'luxury' && <span className="text-xs text-amber-600 font-semibold">✦</span>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
