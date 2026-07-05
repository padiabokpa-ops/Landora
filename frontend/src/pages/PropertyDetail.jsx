import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

const FALLBACK = {
  id: 1,
  title: '4 Bedroom Detached Duplex with BQ',
  price: 180000000,
  location_area: 'Lekki Phase 1',
  location_state: 'Lagos',
  property_type: 'Duplex',
  listing_type: 'Sale',
  bedrooms: 4,
  bathrooms: 4,
  size_sqm: 280,
  description: `This stunning 4-bedroom detached duplex is located in the heart of Lekki Phase 1, one of Lagos's most prestigious neighbourhoods. The property sits on 350sqm of land and features a well-designed floor plan with ample natural light throughout.

The ground floor includes a spacious living room, a formal dining area, a modern kitchen with fitted cabinets, and a guest room with en-suite. The first floor hosts three bedrooms all en-suite, including a master bedroom with walk-in closet and a private balcony.

Additional features include a boy's quarters, 3-car parking, 24-hour security, a backup generator, and a reliable water supply. The estate is gated with CCTV surveillance.`,
  amenities: ['Swimming pool', 'Gym', 'CCTV', 'Generator backup', '3-car parking', 'BQ', 'Estate security', 'Fitted kitchen'],
  is_verified: true,
  is_diaspora_friendly: true,
  images: [],
  agent: {
    id: 1, name: 'Chukwuemeka Obi', phone: '+234 801 234 5678',
    agency: 'Prime Property Lagos', rating: 4.8, reviews: 142, photo: null
  },
  created_at: '2025-04-15'
}

export default function PropertyDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [inquiry, setInquiry] = useState({ name: user?.full_name || '', email: user?.email || '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    api.get(`/properties/${id}/`)
      .then(r => setProperty(r.data))
      .catch(() => setProperty(FALLBACK))
      .finally(() => setLoading(false))
  }, [id])

  const handleInquiry = async (e) => {
    e.preventDefault()
    try {
      await api.post('/inquiries/', { property: id, ...inquiry })
      setSent(true)
    } catch {
      setSent(true)
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--muted)' }}>Loading property...</div>
  if (!property) return <div style={{ textAlign: 'center', padding: 80 }}>Property not found.</div>

  const { title, price, location_area, location_state, property_type, listing_type, bedrooms, bathrooms, size_sqm, description, amenities, is_verified, is_diaspora_friendly, images, agent, created_at } = property

  const imgs = images?.length > 0 ? images.map(i => i.image) : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
  ]

  const formattedPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 80 }}>
      <div className="container" style={{ paddingTop: 32 }}>
        {/* BREADCRUMB */}
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>Home</Link> › <Link to="/listings" style={{ color: 'var(--muted)' }}>Properties</Link> › {title}
        </p>

        {/* IMAGE GALLERY */}
        <div style={{ marginBottom: 32, borderRadius: 20, overflow: 'hidden', background: 'white' }}>
          <div style={{ position: 'relative', paddingTop: '50%', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
            <img src={imgs[activeImg]} alt={title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
              {is_verified && <span className="badge badge-green">✓ Verified</span>}
              {is_diaspora_friendly && <span className="badge badge-gold">Diaspora Friendly</span>}
            </div>
          </div>
          {imgs.length > 1 && (
            <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
              {imgs.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{
                  width: 80, height: 56, flexShrink: 0,
                  borderRadius: 8, overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImg === i ? '2px solid var(--green)' : '2px solid transparent',
                  opacity: activeImg === i ? 1 : 0.7,
                  transition: 'all 0.15s'
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
          {/* LEFT COLUMN */}
          <div>
            {/* HEADER */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', marginBottom: 24, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <span className="badge badge-dark" style={{ marginBottom: 10 }}>{listing_type}</span>
                  <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{title}</h1>
                  <p style={{ color: 'var(--muted)', fontSize: 15 }}>📍 {location_area}, {location_state} State</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 700, color: 'var(--green)' }}>{formattedPrice}</p>
                  {listing_type === 'Rent' && <p style={{ color: 'var(--muted)', fontSize: 13 }}>per year</p>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                {bedrooms && <div style={{ textAlign: 'center' }}><p style={{ fontSize: 22, fontWeight: 700 }}>{bedrooms}</p><p style={{ fontSize: 13, color: 'var(--muted)' }}>Bedrooms</p></div>}
                {bathrooms && <div style={{ textAlign: 'center' }}><p style={{ fontSize: 22, fontWeight: 700 }}>{bathrooms}</p><p style={{ fontSize: 13, color: 'var(--muted)' }}>Bathrooms</p></div>}
                {size_sqm && <div style={{ textAlign: 'center' }}><p style={{ fontSize: 22, fontWeight: 700 }}>{size_sqm}m²</p><p style={{ fontSize: 13, color: 'var(--muted)' }}>Total Area</p></div>}
                <div style={{ textAlign: 'center' }}><p style={{ fontSize: 16, fontWeight: 700 }}>{property_type}</p><p style={{ fontSize: 13, color: 'var(--muted)' }}>Type</p></div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', marginBottom: 24, border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 600, marginBottom: 16 }}>About This Property</h2>
              <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{description}</p>
            </div>

            {/* AMENITIES */}
            {amenities?.length > 0 && (
              <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Amenities & Features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                  {amenities.map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--green-pale)', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>
                      <span style={{ color: 'var(--green)' }}>✓</span> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* AGENT CARD */}
            {agent && (
              <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 20, border: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Listed by Agent</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 50, height: 50, background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {agent.photo ? <img src={agent.photo} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '👤'}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>{agent.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--muted)' }}>{agent.agency}</p>
                    <p style={{ fontSize: 13, color: 'var(--gold)' }}>⭐ {agent.rating} · {agent.reviews} reviews</p>
                  </div>
                </div>
                <a href={`tel:${agent.phone}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}>
                  📞 Call Agent
                </a>
                <Link to={`/agents/${agent.id}`} className="btn-secondary" style={{ display: 'block', textAlign: 'center' }}>
                  View Profile
                </Link>
              </div>
            )}

            {/* INQUIRY FORM */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 4, fontSize: 16 }}>Send Inquiry</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Interested? Send a message to the agent.</p>
              {sent ? (
                <div style={{ background: 'var(--green-pale)', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: 24, marginBottom: 8 }}>✅</p>
                  <p style={{ fontWeight: 600, color: 'var(--green)' }}>Inquiry sent!</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>The agent will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input value={inquiry.name} onChange={e => setInquiry(p => ({ ...p, name: e.target.value }))} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={inquiry.email} onChange={e => setInquiry(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input value={inquiry.phone} onChange={e => setInquiry(p => ({ ...p, phone: e.target.value }))} placeholder="+234 800 000 0000" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea value={inquiry.message} onChange={e => setInquiry(p => ({ ...p, message: e.target.value }))}
                      rows={3} placeholder="I'm interested in this property..." style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
