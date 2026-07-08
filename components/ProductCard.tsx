import Link from 'next/link';
import { Product, formatPrice } from '@/lib/data';

interface Props {
  product: Product;
}

const TIER_BADGE: Record<string, string> = {
  luxury: 'bg-amber-50 text-amber-700 border border-amber-200',
  premium: 'bg-gray-50 text-gray-700 border border-gray-200',
  casual: 'bg-violet-50 text-violet-700 border border-violet-200',
};

export default function ProductCard({ product }: Props) {
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const plusSizes = product.sizes.filter(s => s.is_plus === 1);
  const hasPlusSize = plusSizes.length > 0;

  return (
    <Link href={`/urun/${product.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-300 hover:shadow-lg hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20">
        {/* Product image placeholder */}
        <div
          className="product-image-placeholder h-72 sm:h-80 relative"
          style={{ backgroundColor: product.image_color }}
        >
          <div className={`absolute inset-0 pattern-${product.image_pattern}`} />

          {/* Brand name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white/90 font-black text-2xl tracking-tight drop-shadow-sm">
              {product.brand_name}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_new === 1 && (
              <span className="bg-white text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                YENİ
              </span>
            )}
            {discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Plus size badge */}
          {hasPlusSize && (
            <div className="absolute top-3 right-3">
              <span className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Büyük Beden
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-1.5 ${TIER_BADGE[product.brand_tier] ?? TIER_BADGE.casual}`}>
                {product.brand_name}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
                {product.name_tr}
              </h3>
            </div>
          </div>

          {/* Sizes preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.sizes.slice(0, 6).map(size => (
              <span
                key={size.label}
                className={`text-xs px-1.5 py-0.5 rounded border font-medium ${
                  size.is_plus === 1
                    ? 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-400'
                    : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400'
                }`}
              >
                {size.label}
              </span>
            ))}
            {product.sizes.length > 6 && (
              <span className="text-xs text-gray-400 dark:text-gray-600 px-1">
                +{product.sizes.length - 6}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
