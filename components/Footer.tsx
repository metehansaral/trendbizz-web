import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--stone)' }}>
      <div className="wrap" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <p
              className="font-display"
              style={{
                fontWeight: 700,
                fontSize: '28px',
                letterSpacing: '-0.02em',
                color: 'var(--stone)',
                marginBottom: '12px',
                lineHeight: 1,
              }}
            >
              Trendbizz
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'rgba(237,235,230,0.4)', maxWidth: '240px' }}>
              Beşiktaş&apos;ın en kapsamlı kıyafet mağazası. Her beden, her stil.
            </p>
          </div>

          {/* Collection */}
          <div>
            <p
              className="label"
              style={{ marginBottom: '16px', color: 'rgba(237,235,230,0.35)', letterSpacing: '0.12em' }}
            >
              Koleksiyon
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link
                  href="/urunler"
                  style={{ fontSize: '13px', color: 'rgba(237,235,230,0.55)', textDecoration: 'none', transition: 'color 150ms ease' }}
                >
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link
                  href="/buyuk-beden"
                  style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Büyük Beden
                </Link>
              </li>
              <li>
                <Link
                  href="/markalar"
                  style={{ fontSize: '13px', color: 'rgba(237,235,230,0.55)', textDecoration: 'none', transition: 'color 150ms ease' }}
                >
                  Markalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Store */}
          <div>
            <p
              className="label"
              style={{ marginBottom: '16px', color: 'rgba(237,235,230,0.35)', letterSpacing: '0.12em' }}
            >
              Mağaza
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ fontSize: '13px', color: 'rgba(237,235,230,0.45)', lineHeight: 1.6 }}>
                Beşiktaş, İstanbul
              </li>
              <li style={{ fontSize: '13px', color: 'rgba(237,235,230,0.45)', lineHeight: 1.7 }}>
                Pzt–Cmt: 10:00–21:00<br />Pazar: 11:00–20:00
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '11px', color: 'rgba(237,235,230,0.2)' }}>© 2025 Trendbizz.</p>
          <p style={{ fontSize: '11px', color: 'rgba(237,235,230,0.2)' }}>Her bedene saygı · Her stile yer</p>
        </div>
      </div>
    </footer>
  );
}
