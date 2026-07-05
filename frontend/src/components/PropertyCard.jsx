import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80'

export default function PropertyCard({ property }) {
  const {
    id, title, price, location_area, location_state,
    property_type, listing_type, bedrooms, bathrooms,
    size_sqm, images, is_verified, is_diaspora_friendly
  } = property

  const img = images?.[0]?.image || PLACEHOLDER
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', maximumFractionDigits: 0
  }).format(price)

  return (
    <Link to={`/listings/${id}`} className="card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', paddingTop: '62%', overflow: 'hidden' }}>
        <img
          src={img}
          alt={title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {is_verified && <span className="badge badge-green">✓ Verified</span>}
          {is_diaspora_friendly && <span className="badge badge-gold">Diaspora</span>}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="badge badge-dark">{listing_type}</span>
        </div>
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
          📍 {location_area}, {location_state}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark)', marginBottom: 8, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 12 }}>
          {formattedPrice}
          {listing_type === 'Rent' && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>/yr</span>}
        </p>
        <div style={{ display: 'flex', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          {bedrooms && <span style={{ fontSize: 13, color: 'var(--muted)' }}>🛏 {bedrooms} beds</span>}
          {bathrooms && <span style={{ fontSize: 13, color: 'var(--muted)' }}>🚿 {bathrooms} baths</span>}
          {size_sqm && <span style={{ fontSize: 13, color: 'var(--muted)' }}>📐 {size_sqm}sqm</span>}
          <span style={{ fontSize: 13, color: 'var(--muted)', marginLeft: 'auto' }}>{property_type}</span>
        </div>
      </div>
    </Link>
  )
}
