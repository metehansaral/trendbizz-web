import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getAllCategories, getAllBrands } from '@/lib/data';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: 'var(--ink)', overflow: 'hidden', position: 'relative' }}>
        <div className="wrap" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <p
            className="label"
            style={{ color: 'rgba(237,235,230,0.35)', marginBottom: '24px' }}
          >
            Beşiktaş, İstanbul — Kıyafet Mağazası
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(52px, 9vw, 120px)',
              fontWeight: 700,
              color: 'var(--stone)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '36px',
              maxWidth: '900px',
            }}
          >
            Her Beden,<br />
            Her{' '}
            <span style={{ color: 'var(--red)' }}>Stil.</span>
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(237,235,230,0.45)',
              maxWidth: '380px',
              marginBottom: '48px',
            }}
          >
            Off-White, AllSaints ve daha fazlası — XS&apos;ten 6XL&apos;e kadar her beden.
            Özellikle büyük beden koleksiyonumuzla öne çıkıyoruz.
          </p>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/urunler"
              style={{
                color: 'var(--stone)',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                borderBottom: '1px solid rgba(237,235,230,0.4)',
                paddingBottom: '3px',
                fontFamily: 'var(--font-jost), system-ui, sans-serif',
              }}
            >
              KOLEKSİYONU GÖR
            </Link>
            <Link
              href="/buyuk-beden"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                borderBottom: '1px solid var(--accent)',
                paddingBottom: '3px',
                fontFamily: 'var(--font-jost), system-ui, sans-serif',
              }}
            >
              BÜYÜK BEDEN →
            </Link>
          </div>
        </div>

        {/* Decorative size watermark */}
        <div
          className="hidden lg:flex"
          style={{
            position: 'absolute',
            right: '5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            flexDirection: 'column',
            gap: '0',
            opacity: 0.05,
            pointerEvents: 'none',
          }}
        >
          {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(s => (
            <span
              key={s}
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 52px)',
                fontWeight: 700,
                color: 'var(--stone)',
                lineHeight: 1.15,
                textAlign: 'right',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--bd)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { value: '6+', label: 'Premium Marka' },
            { value: 'XS–6XL', label: 'Beden Aralığı' },
            { value: '13+', label: 'Ürün' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '24px 0',
                borderRight: i < 2 ? '1px solid var(--bd)' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                className="font-display"
                style={{ fontSize: '30px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}
              >
                {stat.value}
              </p>
              <p className="label" style={{ marginTop: '5px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px solid var(--bd)',
              paddingBottom: '14px',
            }}
          >
            <span className="label">Kategoriler</span>
          </div>
          {categories.map(cat => (
            <Link key={cat.slug} href={`/urunler?kategori=${cat.slug}`} className="cat-row">
              <span style={{ fontSize: '15px' }}>{cat.name_tr}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--fg2)', flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Plus Size Banner ── */}
      <section style={{ backgroundColor: 'var(--ink)' }}>
        <div className="wrap" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '32px',
            }}
          >
            <div>
              <p className="label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                Ana Koleksiyon
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  fontWeight: 700,
                  color: 'var(--stone)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                Büyük Beden
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(237,235,230,0.4)',
                  maxWidth: '340px',
                  marginBottom: '32px',
                }}
              >
                XL&apos;den 6XL&apos;e özel tasarım ve seçilmiş markalar. Beden bir engel değil, bir tercih.
              </p>
              <Link
                href="/buyuk-beden"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--accent)',
                  paddingBottom: '3px',
                  fontFamily: 'var(--font-jost), system-ui, sans-serif',
                }}
              >
                KOLEKSİYONU GÖR
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'flex-end',
                opacity: 0.3,
              }}
            >
              {['XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map(s => (
                <span key={s} className="label" style={{ color: 'var(--stone)' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
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
            <div>
              <p className="label" style={{ marginBottom: '8px' }}>Öne Çıkanlar</p>
              <h2
                className="font-display"
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--fg)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Seçili Ürünler
              </h2>
            </div>
            <Link href="/urunler" className="nav-link">
              Tümünü gör →
            </Link>
          </div>
          <div className="auto-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--bd)' }}>
        <div className="wrap" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px solid var(--bd)',
              paddingBottom: '14px',
            }}
          >
            <span className="label">Markalar</span>
            <Link href="/markalar" className="nav-link">Tümünü gör →</Link>
          </div>
          {brands.map(brand => (
            <Link key={brand.slug} href={`/markalar/${brand.slug}`} className="brand-row">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>{brand.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="label">
                  {brand.tier === 'luxury' ? 'Lüks' : brand.tier === 'premium' ? 'Premium' : 'Günlük'}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--fg2)' }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
