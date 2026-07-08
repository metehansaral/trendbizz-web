import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-black text-gray-100 dark:text-gray-900 mb-4">404</p>
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Sayfa Bulunamadı</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        href="/"
        className="bg-violet-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-violet-500 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
