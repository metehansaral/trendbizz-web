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
    <div className="wrap" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
        <Link href="/" className="muted-link" style={{ fontSize: '12px' }}>Ana Sayfa</Link>
        <span style={{ color: 'var(--bd)', fontSize: '12px' }}>/</span>
        <Link href="/urunler" className="muted-link" style={{ fontSize: '12px' }}>Ürünler</Link>
        <span style={{ color: 'var(--bd)', fontSize: '12px' }}>/</span>
        <span style={{ fontSize: '12px', color: 'var(--fg)' }}>{product.name_tr}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '64px', alignItems: 'start' }}>
        {/* Swatch */}
        <div
          style={{
            backgroundColor: product.image_color,
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <span className="swatch-ghost">{product.brand_name}</span>

          <div
            style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}
          >
            {product.is_new === 1 && (
              <span
                className="label"
                style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', padding: '4px 10px' }}
              >
                YENİ
              </span>
            )}
            {discount && (
              <span
                className="label"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--paper)', padding: '4px 10px' }}
              >
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <Link
            href={`/markalar/${product.brand_slug}`}
            className="label"
            style={{ color: 'var(--fg2)', textDecoration: 'none', display: 'block', marginBottom: '12px' }}
          >
            {product.brand_name}
          </Link>

          <h1
            style={{
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 500,
              color: 'var(--fg)',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            {product.name_tr}
          </h1>

          {/* Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '32px',
              paddingBottom: '32px',
              borderBottom: '1px solid var(--bd)',
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: '36px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}
            >
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <>
                <span style={{ fontSize: '18px', color: 'var(--fg2)', textDecoration: 'line-through' }}>
                  {formatPrice(product.original_price)}
                </span>
                <span className="chip chip-plus">-%{discount}</span>
              </>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.85,
              color: 'var(--fg2)',
              marginBottom: '32px',
              paddingBottom: '32px',
              borderBottom: '1px solid var(--bd)',
            }}
          >
            {product.description_tr}
          </p>

          {/* Sizes */}
          <div style={{ marginBottom: '32px' }}>
            {regularSizes.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <p className="label" style={{ marginBottom: '10px' }}>Standart Bedenler</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {regularSizes.map(s => (
                    <span key={s.label} className="chip">{s.label}</span>
                  ))}
                </div>
              </div>
            )}
            {plusSizes.length > 0 && (
              <div>
                <p className="label" style={{ marginBottom: '10px', color: 'var(--accent)' }}>Büyük Bedenler</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {plusSizes.map(s => (
                    <span key={s.label} className="chip chip-plus">{s.label}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category */}
          <Link
            href={`/urunler?kategori=${product.category_slug}`}
            className="muted-link"
            style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}
          >
            <span>{product.category_icon}</span>
            <span>{product.category_name_tr}</span>
          </Link>

          {/* Store CTA */}
          <div style={{ border: '1px solid var(--bd)', padding: '20px 24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg)', marginBottom: '8px' }}>
              Mağazamızda Mevcut
            </p>
            <p style={{ fontSize: '12px', color: 'var(--fg2)', lineHeight: 1.75, marginBottom: '14px' }}>
              Bu ürün Beşiktaş mağazamızda sizi bekliyor. Tüm beden seçenekleri için ziyaret edin.
            </p>
            <p className="label">Pzt–Cmt 10:00–21:00 · Pazar 11:00–20:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
