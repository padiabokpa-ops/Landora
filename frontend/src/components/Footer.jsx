import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'Properties': [
    { label: 'Buy a home', to: '/listings?listing_type=Sale' },
    { label: 'Rent a property', to: '/listings?listing_type=Rent' },
    { label: 'New developments', to: '/listings?property_type=Commercial' },
    { label: 'Land for sale', to: '/listings?property_type=Land' },
    { label: 'Shortlets', to: '/listings?listing_type=Shortlet' },
  ],
  'How It Works': [
    { label: 'Business models', to: '/how-it-works#business-models' },
    { label: 'Payment methods', to: '/how-it-works#payments' },
    { label: 'Terms & Conditions', to: '/how-it-works#terms' },
    { label: 'Scam protection', to: '/how-it-works#scam-protection' },
    { label: 'Direct Liquidation', to: '/how-it-works#business-models' },
  ],
  'Diaspora': [
    { label: 'Invest from abroad', to: '/diaspora' },
    { label: 'Verified properties', to: '/listings?is_verified=true' },
    { label: 'Escrow protection', to: '/diaspora' },
    { label: 'Remote tours', to: '/diaspora' },
    { label: 'Title verification', to: '/diaspora' },
  ],
  'Company': [
    { label: 'About Landora', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Contact us', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: '#B0B7C3', marginTop: 80 }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'var(--green-light)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 16 }}>L</span>
              </div>
              <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20, color: 'white' }}>Landora</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              Nigeria's most trusted real estate platform. Connecting buyers, sellers, and diaspora investors to premium properties across the country.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 16, fontSize: 15 }}>{section}</h4>
              {links.map(({ label, to }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <Link to={to} style={{ fontSize: 14, color: '#B0B7C3' }}>{label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #2D3440', paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13 }}>
            © 2026 Landora International Investment Limited. RC: 1234567
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(t => (
              <span key={t} style={{ fontSize: 13, cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
