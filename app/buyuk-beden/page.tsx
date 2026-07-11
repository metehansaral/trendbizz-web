import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getPlusSizeProducts } from '@/lib/data';

export const metadata = {
  title: 'Büyük Beden Koleksiyonu | Trendbizz',
  description: "XL'den 6XL'e büyük beden kıyafetler. Premium markalar, özel tasarımlar.",
};

const PLUS_SIZES = ['XL', '2XL', '3XL', '4XL', '5XL', '6XL', '42', '44', '46', '48', '50', '52'];

export default function PlusSizePage() {
  const plusProducts = getPlusSizeProducts();

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--ink)' }}>
        <div className="wrap" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <p className="label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
            Ana Koleksiyon
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 700,
              color: 'var(--stone)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}
          >
            Büyük Beden,<br />
            Her <span style={{ color: 'var(--accent)' }}>Figür.</span>
          </h1>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(237,235,230,0.45)',
              maxWidth: '380px',
              marginBottom: '36px',
            }}
          >
            Büyük beden bizim ana odağımız. XL&apos;den 6XL&apos;e, 42&apos;den 52&apos;ye özenle seçilmiş parçalar.
          </p>

          {/* Size chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PLUS_SIZES.map(s => (
              <span
                key={s}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  border: '1px solid rgba(237,235,230,0.15)',
                  color: 'rgba(237,235,230,0.4)',
                  fontFamily: 'var(--font-jost), system-ui, sans-serif',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '40px',
            }}
          >
            <h2
              className="font-display"
              style={{ fontSize: '32px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              {plusProducts.length} Ürün
            </h2>
            <Link href="/urunler" className="nav-link">Tüm Ürünler →</Link>
          </div>
          <div className="auto-grid">
            {plusProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
