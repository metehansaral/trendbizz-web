import initSqlJs from 'sql.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../db/trendbizz.db');

const SQL = await initSqlJs();
const db = new SQL.Database();

db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_tr TEXT NOT NULL,
    icon TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tier TEXT NOT NULL CHECK(tier IN ('luxury','premium','casual')),
    logo_color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT UNIQUE NOT NULL,
    sort_order INTEGER NOT NULL,
    is_plus INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_tr TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    price REAL NOT NULL,
    original_price REAL,
    brand_id INTEGER REFERENCES brands(id),
    category_id INTEGER REFERENCES categories(id),
    image_color TEXT NOT NULL DEFAULT '#6B7280',
    image_pattern TEXT NOT NULL DEFAULT 'solid',
    is_featured INTEGER NOT NULL DEFAULT 0,
    is_new INTEGER NOT NULL DEFAULT 0,
    stock_status TEXT NOT NULL DEFAULT 'in_stock'
  );

  CREATE TABLE IF NOT EXISTS product_sizes (
    product_id INTEGER REFERENCES products(id),
    size_id INTEGER REFERENCES sizes(id),
    PRIMARY KEY (product_id, size_id)
  );
`);

// Categories
const categories = [
  { slug: 'ust-giyim', name: 'Tops', name_tr: 'Üst Giyim', icon: '👕' },
  { slug: 'alt-giyim', name: 'Bottoms', name_tr: 'Alt Giyim', icon: '👖' },
  { slug: 'elbise-etek', name: 'Dresses', name_tr: 'Elbise & Etek', icon: '👗' },
  { slug: 'dis-giyim', name: 'Outerwear', name_tr: 'Dış Giyim', icon: '🧥' },
  { slug: 'aksesuar', name: 'Accessories', name_tr: 'Aksesuar', icon: '👜' },
];

for (const c of categories) {
  db.run(
    'INSERT INTO categories (slug, name, name_tr, icon) VALUES (?, ?, ?, ?)',
    [c.slug, c.name, c.name_tr, c.icon]
  );
}

// Brands
const brands = [
  { slug: 'off-white', name: 'Off-White', tier: 'luxury', logo_color: '#1a1a1a' },
  { slug: 'all-saints', name: 'AllSaints', tier: 'premium', logo_color: '#2d2d2d' },
  { slug: 'trendbizz', name: 'Trendbizz', tier: 'casual', logo_color: '#7C3AED' },
  { slug: 'zara', name: 'Zara', tier: 'premium', logo_color: '#111' },
  { slug: 'mango', name: 'Mango', tier: 'premium', logo_color: '#b5894c' },
  { slug: 'north-face', name: 'The North Face', tier: 'premium', logo_color: '#E63329' },
];

for (const b of brands) {
  db.run(
    'INSERT INTO brands (slug, name, tier, logo_color) VALUES (?, ?, ?, ?)',
    [b.slug, b.name, b.tier, b.logo_color]
  );
}

// Sizes - standard + plus sizes
const sizes = [
  { label: 'XS', sort_order: 1, is_plus: 0 },
  { label: 'S', sort_order: 2, is_plus: 0 },
  { label: 'M', sort_order: 3, is_plus: 0 },
  { label: 'L', sort_order: 4, is_plus: 0 },
  { label: 'XL', sort_order: 5, is_plus: 1 },
  { label: '2XL', sort_order: 6, is_plus: 1 },
  { label: '3XL', sort_order: 7, is_plus: 1 },
  { label: '4XL', sort_order: 8, is_plus: 1 },
  { label: '5XL', sort_order: 9, is_plus: 1 },
  { label: '6XL', sort_order: 10, is_plus: 1 },
  { label: '34', sort_order: 11, is_plus: 0 },
  { label: '36', sort_order: 12, is_plus: 0 },
  { label: '38', sort_order: 13, is_plus: 0 },
  { label: '40', sort_order: 14, is_plus: 0 },
  { label: '42', sort_order: 15, is_plus: 1 },
  { label: '44', sort_order: 16, is_plus: 1 },
  { label: '46', sort_order: 17, is_plus: 1 },
  { label: '48', sort_order: 18, is_plus: 1 },
  { label: '50', sort_order: 19, is_plus: 1 },
  { label: '52', sort_order: 20, is_plus: 1 },
];

for (const s of sizes) {
  db.run(
    'INSERT INTO sizes (label, sort_order, is_plus) VALUES (?, ?, ?)',
    [s.label, s.sort_order, s.is_plus]
  );
}

// Products
const products = [
  // Off-White
  {
    slug: 'off-white-siyah-kapsonlu-sweatshirt',
    name: 'Off-White Arrow Hoodie',
    name_tr: 'Off-White Ok Logolu Kapşonlu Sweatshirt',
    description_tr: 'İkonik ok logosu ile bezeli premium pamuklu kapşonlu sweatshirt. Oversized kesim, her beden için rahat ve şık görünüm sağlar.',
    price: 4850,
    original_price: 6200,
    brand: 'off-white',
    category: 'ust-giyim',
    image_color: '#1a1a1a',
    image_pattern: 'stripe',
    is_featured: 1,
    is_new: 0,
    sizes: ['S','M','L','XL','2XL','3XL','4XL'],
  },
  {
    slug: 'off-white-beyaz-tshirt-diagonal',
    name: 'Off-White Diagonal T-Shirt',
    name_tr: 'Off-White Diyagonal Logolu Tişört',
    description_tr: 'Off-White\'ın imzası olan çapraz şerit detaylı beyaz tişört. Yüksek kalite pamuk kumaş, geniş beden aralığı.',
    price: 2950,
    original_price: null,
    brand: 'off-white',
    category: 'ust-giyim',
    image_color: '#f5f5f0',
    image_pattern: 'diagonal',
    is_featured: 1,
    is_new: 1,
    sizes: ['S','M','L','XL','2XL','3XL'],
  },
  // AllSaints
  {
    slug: 'allsaints-deri-ceket-moto',
    name: 'AllSaints Moto Leather Jacket',
    name_tr: 'AllSaints Moto Deri Ceket',
    description_tr: 'AllSaints\'ın klasik motosikletçi ceketi. Gerçek deri, metal fermuar detayları. Büyük bedenlerde özel kesim.',
    price: 8900,
    original_price: 11500,
    brand: 'all-saints',
    category: 'dis-giyim',
    image_color: '#1c1c1c',
    image_pattern: 'leather',
    is_featured: 1,
    is_new: 0,
    sizes: ['S','M','L','XL','2XL','3XL','4XL','5XL'],
  },
  {
    slug: 'allsaints-merino-triko',
    name: 'AllSaints Merino Jumper',
    name_tr: 'AllSaints Merino Triko Kazak',
    description_tr: 'İnce örme merino yünü kazak. Minimal tasarım, maksimum konfor. Kış ve ilkbahar geçişi için ideal.',
    price: 3200,
    original_price: null,
    brand: 'all-saints',
    category: 'ust-giyim',
    image_color: '#8B7355',
    image_pattern: 'knit',
    is_featured: 0,
    is_new: 1,
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
  },
  {
    slug: 'allsaints-midi-elbise',
    name: 'AllSaints Midi Dress',
    name_tr: 'AllSaints Midi Elbise',
    description_tr: 'Asimetrik kesim midi elbise. Viskoz kumaş ile akıcı düşüş. Her vücut tipine uygun kalıp.',
    price: 4100,
    original_price: 5300,
    brand: 'all-saints',
    category: 'elbise-etek',
    image_color: '#2C3E50',
    image_pattern: 'solid',
    is_featured: 1,
    is_new: 0,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
  },
  // Trendbizz (own brand)
  {
    slug: 'trendbizz-plus-wide-leg-pantolon',
    name: 'Trendbizz Wide Leg Trousers',
    name_tr: 'Trendbizz Büyük Beden Wide Leg Pantolon',
    description_tr: 'Büyük bedenler için özel tasarlanan wide leg pantolon. Yüksek bel, geniş paça, her figürü ön plana çıkarır.',
    price: 899,
    original_price: 1250,
    brand: 'trendbizz',
    category: 'alt-giyim',
    image_color: '#4A5568',
    image_pattern: 'solid',
    is_featured: 1,
    is_new: 0,
    sizes: ['XL','2XL','3XL','4XL','5XL','6XL','42','44','46','48','50','52'],
  },
  {
    slug: 'trendbizz-plus-wrap-elbise',
    name: 'Trendbizz Wrap Dress',
    name_tr: 'Trendbizz Büyük Beden Kruvaze Elbise',
    description_tr: 'Bağlamalı kruvaze elbise, büyük bedenler için özel orantılı kesim. Beli vurgular, her figürü güzel gösterir.',
    price: 1199,
    original_price: null,
    brand: 'trendbizz',
    category: 'elbise-etek',
    image_color: '#7C3AED',
    image_pattern: 'solid',
    is_featured: 1,
    is_new: 1,
    sizes: ['XL','2XL','3XL','4XL','5XL','6XL'],
  },
  {
    slug: 'trendbizz-plus-oversize-blazer',
    name: 'Trendbizz Oversized Blazer',
    name_tr: 'Trendbizz Büyük Beden Oversize Blazer',
    description_tr: 'Yapılandırılmış omuz, uzun kesim oversize blazer. Ofis ve günlük kullanım için çok yönlü tasarım.',
    price: 1450,
    original_price: 1899,
    brand: 'trendbizz',
    category: 'dis-giyim',
    image_color: '#1F2937',
    image_pattern: 'solid',
    is_featured: 0,
    is_new: 1,
    sizes: ['XL','2XL','3XL','4XL','5XL'],
  },
  {
    slug: 'trendbizz-plus-modal-tshirt',
    name: 'Trendbizz Modal T-Shirt Plus',
    name_tr: 'Trendbizz Büyük Beden Modal Tişört',
    description_tr: 'Modal-pamuk karışımı, ultra yumuşak tişört. Büyük bedenler için uzatılmış uzunluk, genişletilmiş omuz.',
    price: 449,
    original_price: null,
    brand: 'trendbizz',
    category: 'ust-giyim',
    image_color: '#E5E7EB',
    image_pattern: 'solid',
    is_featured: 0,
    is_new: 0,
    sizes: ['XL','2XL','3XL','4XL','5XL','6XL'],
  },
  // Zara
  {
    slug: 'zara-structured-coat',
    name: 'Zara Structured Coat',
    name_tr: 'Zara Yapılandırılmış Kaban',
    description_tr: 'Klasik yaka, düğmeli kapanma ile şık yapılandırılmış kaban. Kış koleksiyonundan özel seçim.',
    price: 2199,
    original_price: 2999,
    brand: 'zara',
    category: 'dis-giyim',
    image_color: '#6B7280',
    image_pattern: 'solid',
    is_featured: 0,
    is_new: 0,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
  },
  {
    slug: 'zara-satin-midi-etek',
    name: 'Zara Satin Midi Skirt',
    name_tr: 'Zara Saten Midi Etek',
    description_tr: 'Beli lastikli saten midi etek. Akıcı düşüş, hafif parlak görünüm. Gece ve gündüz kombin yapılabilir.',
    price: 899,
    original_price: null,
    brand: 'zara',
    category: 'elbise-etek',
    image_color: '#D4AF8B',
    image_pattern: 'solid',
    is_featured: 0,
    is_new: 1,
    sizes: ['XS','S','M','L','XL','2XL'],
  },
  // Mango
  {
    slug: 'mango-plus-linen-pantolon',
    name: 'Mango Plus Linen Trousers',
    name_tr: 'Mango Büyük Beden Keten Pantolon',
    description_tr: 'Yazlık keten kumaş, rahat kesim pantolon. Büyük beden aralığı ile herkese uygun.',
    price: 1299,
    original_price: 1799,
    brand: 'mango',
    category: 'alt-giyim',
    image_color: '#F3E8D5',
    image_pattern: 'solid',
    is_featured: 0,
    is_new: 0,
    sizes: ['M','L','XL','2XL','3XL','4XL','44','46','48','50'],
  },
  {
    slug: 'north-face-puffer-jacket',
    name: 'The North Face Puffer Jacket',
    name_tr: 'The North Face Şişme Mont',
    description_tr: 'Geri dönüştürülmüş dolgu malzemeli, rüzgar ve yağmur geçirmez şişme mont. Polar iç astar ile ekstra sıcaklık.',
    price: 5900,
    original_price: 7200,
    brand: 'north-face',
    category: 'dis-giyim',
    image_color: '#DC2626',
    image_pattern: 'solid',
    is_featured: 1,
    is_new: 0,
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
  },
];

for (const p of products) {
  // Get brand_id
  const brandRow = db.exec(`SELECT id FROM brands WHERE slug = '${p.brand}'`);
  const brand_id = brandRow[0]?.values[0][0];

  // Get category_id
  const catRow = db.exec(`SELECT id FROM categories WHERE slug = '${p.category}'`);
  const category_id = catRow[0]?.values[0][0];

  db.run(
    `INSERT INTO products (slug, name, name_tr, description_tr, price, original_price, brand_id, category_id, image_color, image_pattern, is_featured, is_new, stock_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'in_stock')`,
    [p.slug, p.name, p.name_tr, p.description_tr, p.price, p.original_price ?? null,
     brand_id, category_id, p.image_color, p.image_pattern, p.is_featured, p.is_new]
  );

  const productRow = db.exec(`SELECT id FROM products WHERE slug = '${p.slug}'`);
  const product_id = productRow[0]?.values[0][0];

  for (const sizeLabel of p.sizes) {
    const sizeRow = db.exec(`SELECT id FROM sizes WHERE label = '${sizeLabel}'`);
    const size_id = sizeRow[0]?.values[0][0];
    if (size_id) {
      db.run('INSERT OR IGNORE INTO product_sizes (product_id, size_id) VALUES (?, ?)', [product_id, size_id]);
    }
  }
}

// Export database to file
mkdirSync(dirname(DB_PATH), { recursive: true });
const data = db.export();
writeFileSync(DB_PATH, Buffer.from(data));
console.log(`✅ Database seeded: ${DB_PATH}`);

// Also export as JSON for Next.js static generation
const productsQuery = db.exec(`
  SELECT
    p.id, p.slug, p.name, p.name_tr, p.description_tr,
    p.price, p.original_price, p.image_color, p.image_pattern,
    p.is_featured, p.is_new, p.stock_status,
    b.slug as brand_slug, b.name as brand_name, b.tier as brand_tier, b.logo_color as brand_logo_color,
    c.slug as category_slug, c.name_tr as category_name_tr, c.icon as category_icon
  FROM products p
  JOIN brands b ON p.brand_id = b.id
  JOIN categories c ON p.category_id = c.id
  ORDER BY p.is_featured DESC, p.id ASC
`);

const cols = productsQuery[0].columns;
const rows = productsQuery[0].values;

const productList = rows.map(row => {
  const obj = {};
  cols.forEach((col, i) => { obj[col] = row[i]; });

  // Get sizes for this product
  const sizesResult = db.exec(`
    SELECT s.label, s.is_plus FROM sizes s
    JOIN product_sizes ps ON ps.size_id = s.id
    WHERE ps.product_id = ${obj.id}
    ORDER BY s.sort_order
  `);
  obj.sizes = sizesResult[0]?.values.map(([label, is_plus]) => ({ label, is_plus: is_plus })) ?? [];

  return obj;
});

const categoriesQuery = db.exec('SELECT * FROM categories ORDER BY id');
const categoryCols = categoriesQuery[0].columns;
const categoryList = categoriesQuery[0].values.map(row => {
  const obj = {};
  categoryCols.forEach((col, i) => { obj[col] = row[i]; });
  return obj;
});

const brandsQuery = db.exec('SELECT * FROM brands ORDER BY id');
const brandCols = brandsQuery[0].columns;
const brandList = brandsQuery[0].values.map(row => {
  const obj = {};
  brandCols.forEach((col, i) => { obj[col] = row[i]; });
  return obj;
});

const jsonData = { products: productList, categories: categoryList, brands: brandList };
writeFileSync(join(__dirname, '../db/data.json'), JSON.stringify(jsonData, null, 2));
console.log(`✅ JSON data exported: db/data.json`);

db.close();
