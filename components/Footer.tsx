export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">
                TB
              </div>
              <span className="font-black text-xl text-white tracking-tight">TRENDBIZZ</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Beşiktaş&apos;ın en kapsamlı kıyafet mağazası. Her beden, her stil — Off-White&apos;tan büyük bedenlere uzanan geniş koleksiyon.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Koleksiyon</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/urunler" className="hover:text-white transition-colors">Tüm Ürünler</a></li>
              <li><a href="/buyuk-beden" className="hover:text-violet-400 transition-colors font-medium text-violet-500">Büyük Beden</a></li>
              <li><a href="/markalar" className="hover:text-white transition-colors">Markalar</a></li>
              <li><a href="/urunler?yeni=true" className="hover:text-white transition-colors">Yeni Gelenler</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Mağaza</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Beşiktaş, İstanbul<br />Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Pzt–Cmt: 10:00–21:00<br />Pazar: 11:00–20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2025 Trendbizz. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-700">
            Her bedene saygı · Her stile yer
          </p>
        </div>
      </div>
    </footer>
  );
}
