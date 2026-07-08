import rawData from '../db/data.json';

export interface Size {
  label: string;
  is_plus: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  name_tr: string;
  description_tr: string;
  price: number;
  original_price: number | null;
  image_color: string;
  image_pattern: string;
  is_featured: number;
  is_new: number;
  stock_status: string;
  brand_slug: string;
  brand_name: string;
  brand_tier: string;
  brand_logo_color: string;
  category_slug: string;
  category_name_tr: string;
  category_icon: string;
  sizes: Size[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  name_tr: string;
  icon: string;
}

export interface Brand {
  id: number;
  slug: string;
  name: string;
  tier: string;
  logo_color: string;
}

export const data = rawData as unknown as { products: Product[]; categories: Category[]; brands: Brand[] };

export function getAllProducts(): Product[] {
  return data.products;
}

export function getFeaturedProducts(): Product[] {
  return data.products.filter(p => p.is_featured === 1);
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return data.products.filter(p => p.category_slug === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return data.products.filter(p => p.brand_slug === brandSlug);
}

export function getPlusSizeProducts(): Product[] {
  return data.products.filter(p =>
    p.sizes.some(s => s.is_plus === 1)
  );
}

export function getAllCategories(): Category[] {
  return data.categories;
}

export function getAllBrands(): Brand[] {
  return data.brands;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
