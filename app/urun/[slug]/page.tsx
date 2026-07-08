import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug, formatPrice } from '@/lib/data';

export async function generateStaticParams() {
  return getAllProducts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name_tr} | Trendbizz`,
    description: product.description_tr,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const regularSizes = product.sizes.filter(s => s.is_plus === 0);
  const plusSizes = product.sizes.filter(s => s.is_plus === 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/urunler" className="hover:text-gray-900 dark:hover:text-white">Ürünler</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{product.name_tr}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Product image */}
        <div className="order-1 lg:order-none">
          <div
            className={`product-image-placeholder pattern-${product.image_pattern} rounded-3xl h-80 sm:h-96 lg:h-[520px] relative`}
            style={{ backgroundColor: product.image_color }}
          >
            {/* Brand watermark */}
            <div className="absolute bottom-8 left-8">
              <span className="text-white/80 font-black text-4xl sm:text-5xl tracking-tight drop-shadow-sm">
                {product.brand_name}
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_new === 1 && (
                <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">YENİ</span>
              )}
              {discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{discount}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div>
          {/* Brand */}
          <Link href={`/markalar/${product.brand_slug}`} className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: product.brand_logo_color }} />
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-violet-600 transition-colors">
              {product.brand_name}
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            {product.name_tr}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                  %{discount} İndirim
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            {product.description_tr}
          </p>

          {/* Sizes */}
          <div className="mb-8">
            {regularSizes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Standart Bedenler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {regularSizes.map(s => (
                    <span key={s.label} className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {plusSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-violet-600 mb-2 uppercase tracking-wide flex items-center gap-1">
                  <span>✦</span> Büyük Bedenler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plusSizes.map(s => (
                    <span key={s.label} className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-lg">{product.category_icon}</span>
            <Link href={`/urunler?kategori=${product.category_slug}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              {product.category_name_tr}
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📍</span>
              <span className="font-bold text-gray-900 dark:text-white">Mağazamızda Mevcut</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bu ürün Beşiktaş mağazamızda sizi bekliyor. Tüm beden seçenekleri için mağazamızı ziyaret edin.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              🕐 Pzt–Cmt: 10:00–21:00 · Pazar: 11:00–20:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
