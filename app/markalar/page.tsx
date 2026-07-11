import Link from 'next/link';
import { getAllBrands, getAllProducts } from '@/lib/data';

export const metadata = {
  title: 'Markalar | Trendbizz',
  description: "Off-White, AllSaints ve daha fazlası. Trendbizz'in taşıdığı tüm markalar.",
};

const TIER_LABELS: Record<string, string> = {
  luxury: 'Lüks',
  premium: 'Premium',
  casual: 'Günlük',
};

export default function BrandsPage() {
  const brands = getAllBrands();
  const products = getAllProducts();

  const brandsWithCount = brands.map(b => ({
    ...b,
    count: products.filter(p => p.brand_slug === b.slug).length,
  }));

  return (
    <div className="wrap" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
      <div style={{ paddingBottom: '40px', borderBottom: '1px solid var(--bd)', marginBottom: '0' }}>
        <p className="label" style={{ marginBottom: '8px' }}>Portföy</p>
        <h1
          className="font-display"
          style={{ fontSize: '48px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          Markalar
        </h1>
      </div>

      {brandsWithCount.map(brand => (
        <Link key={brand.slug} href={`/markalar/${brand.slug}`} className="brand-row">
          <span style={{ fontSize: '18px', fontWeight: 500 }}>{brand.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="label">{TIER_LABELS[brand.tier] ?? brand.tier}</span>
            <span className="label">{brand.count} ürün</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--fg2)' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
