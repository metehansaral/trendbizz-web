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

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getAllBrands().find(b => b.slug === slug);
  if (!brand) notFound();

  const products = getProductsByBrand(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/markalar" className="hover:text-gray-900 dark:hover:text-white transition-colors">Markalar</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{brand.name}</span>
      </nav>

      {/* Brand header */}
      <div className="flex items-start gap-6 mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0"
          style={{ backgroundColor: brand.logo_color }}
        >
          {brand.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{brand.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{products.length} ürün</p>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Bu markadan henüz ürün yok</p>
        </div>
      )}
    </div>
  );
}
