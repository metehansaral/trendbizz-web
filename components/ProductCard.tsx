import Link from 'next/link';
import { Product, formatPrice } from '@/lib/data';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const plusSizes = product.sizes.filter(s => s.is_plus === 1);
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <Link href={`/urun/${product.slug}`} className="product-card">
      {/* Color swatch */}
      <div
        className="product-swatch"
        style={{ height: '260px', backgroundColor: product.image_color }}
      >
        {/* Ghost brand watermark */}
        <span className="swatch-ghost">{product.brand_name}</span>

        {/* Badges — top left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {product.is_new === 1 && (
            <span
              className="label"
              style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', padding: '3px 8px' }}
            >
              YENİ
            </span>
          )}
          {discount && (
            <span
              className="label"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--paper)', padding: '3px 8px' }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Plus indicator — top right */}
        {plusSizes.length > 0 && (
          <span
            className="label chip chip-plus"
            style={{ position: 'absolute', top: '12px', right: '12px' }}
          >
            +beden
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ paddingTop: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '5px',
          }}
        >
          <span className="label">{product.brand_name}</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg)' }}>
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="product-name clamp-2" style={{ fontSize: '14px', fontWeight: 400, marginBottom: '10px' }}>
          {product.name_tr}
        </p>

        {/* Size chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {product.sizes.slice(0, 6).map(s => (
            <span key={s.label} className={s.is_plus === 1 ? 'chip chip-plus' : 'chip'}>
              {s.label}
            </span>
          ))}
          {product.sizes.length > 6 && (
            <span className="label" style={{ color: 'var(--fg2)', paddingLeft: '2px', alignSelf: 'center' }}>
              +{product.sizes.length - 6}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
