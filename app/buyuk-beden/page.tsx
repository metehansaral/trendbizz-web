import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getPlusSizeProducts } from '@/lib/data';

export const metadata = {
  title: 'Büyük Beden Koleksiyonu | Trendbizz',
  description: 'XL\'den 6XL\'e büyük beden kıyafetler. Premium markalar, özel tasarımlar.',
};

export default function PlusSizePage() {
  const plusProducts = getPlusSizeProducts();

  const SIZE_LABELS = ['XL', '2XL', '3XL', '4XL', '5XL', '6XL', '42', '44', '46', '48', '50', '52'];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/20">
              <span>✦</span>
              <span>Büyük Beden Ana Koleksiyon</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Her Beden<br />Her Figür
            </h1>
            <p className="text-violet-100 text-lg leading-relaxed mb-8">
              Büyük beden bizim ana odağımız. XL&apos;den 6XL&apos;e, 42&apos;den 52&apos;ye kadar özenle seçilmiş
              her parça vücudunuzu en iyi şekilde yansıtmak için tasarlandı.
            </p>

            {/* Size grid */}
            <div className="flex flex-wrap gap-2">
              {SIZE_LABELS.map(s => (
                <span key={s} className="bg-white/15 border border-white/20 text-white text-sm font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            {
              icon: '📐',
              title: 'Özel Kalıp',
              desc: 'Büyük bedenler için yeniden proporsiyone edilmiş kesimler — sadece büyütülmüş değil.',
            },
            {
              icon: '✦',
              title: 'Premium Markalar',
              desc: 'Off-White, AllSaints gibi lüks markaların büyük beden seçenekleri burada.',
            },
            {
              icon: '🎯',
              title: 'Her Figür',
              desc: 'Kum saati, elma, armut — her vücut tipine uygun stil önerileri.',
            },
          ].map(c => (
            <div key={c.title} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="text-2xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">Koleksiyon</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Büyük Beden Ürünler
              <span className="ml-3 text-lg font-normal text-gray-400">({plusProducts.length})</span>
            </h2>
          </div>
          <Link href="/urunler" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Tüm Ürünler →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {plusProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
