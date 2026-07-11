import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllBrands, getProductsByBrand } from '@/lib/data';

export async function generateStaticParams() {
  return getAllBrands().map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getAllBrands().find(b => b.slug === slug);
  if (!brand) return {};
  return {
    title: `${brand.name} | Trendbizz`,
    description: `Trendbizz'de ${brand.name} koleksiyonu. Beşiktaş mağazamızda mevcut.`,
  };
}

const TIER_LABELS: Record<string, string> = {
  luxury: 'Lüks',
  premium: 'Premium',
  casual: 'Günlük',
};

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getAllBrands().find(b => b.slug === slug);
  if (!brand) notFound();

  const products = getProductsByBrand(slug);

  return (
    <div className="wrap" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '48px' }}>
        <Link href="/markalar" className="muted-link" style={{ fontSize: '12px' }}>Markalar</Link>
        <span style={{ color: 'var(--bd)', fontSize: '12px' }}>/</span>
        <span style={{ fontSize: '12px', color: 'var(--fg)' }}>{brand.name}</span>
      </nav>

      {/* Brand header */}
      <div style={{ paddingBottom: '40px', borderBottom: '1px solid var(--bd)', marginBottom: '48px' }}>
        <p className="label" style={{ marginBottom: '8px' }}>{TIER_LABELS[brand.tier] ?? brand.tier}</p>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700,
            color: 'var(--fg)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: '8px',
          }}
        >
          {brand.name}
        </h1>
        <p className="label">{products.length} ürün</p>
      </div>

      {products.length > 0 ? (
        <div className="auto-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p className="font-display" style={{ fontSize: '32px', color: 'var(--fg2)' }}>
            Henüz ürün yok
          </p>
        </div>
      )}
    </div>
  );
}
