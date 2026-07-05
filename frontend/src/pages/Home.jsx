import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import api from '../utils/api'

const STATS = [
  { label: 'Active Listings', value: '12,000+' },
  { label: 'Verified Properties', value: '8,500+' },
  { label: 'Happy Buyers', value: '45,000+' },
  { label: 'Cities Covered', value: '36' },
]

const LOCATIONS = [
  { name: 'Lagos', count: '4,200 listings', color: '#E8F5EF' },
  { name: 'Abuja', count: '2,100 listings', color: '#FDF6E8' },
  { name: 'Port Harcourt', count: '1,400 listings', color: '#F0F4FF' },
  { name: 'Ibadan', count: '980 listings', color: '#FFF0F0' },
  { name: 'Enugu', count: '620 listings', color: '#F5F0FF' },
  { name: 'Kano', count: '540 listings', color: '#F0FFF4' },
]

const WHY_ITEMS = [
  { icon: '🔒', title: 'Title Verified', desc: 'Every listed property goes through a rigorous title and C of O verification process.' },
  { icon: '🌍', title: 'Diaspora Ready', desc: 'Buy, invest, and close deals from anywhere in the world with our escrow-backed system.' },
  { icon: '🤝', title: 'Trusted Agents', desc: 'All agents are licensed, background-checked, and rated by real buyers and sellers.' },
  { icon: '💳', title: 'Flexible Payment', desc: 'Pay in NGN, USD, GBP, or EUR. Paystack-powered for local and international payments.' },
  { icon: '📹', title: 'Virtual Tours', desc: 'Schedule remote property tours with 360° video walkthroughs for diaspora buyers.' },
  { icon: '📊', title: 'Market Insights', desc: 'Access real-time price data, trend reports, and investment ROI calculators.' },
]

const FALLBACK_PROPERTIES = [
  { id: 1, title: '4 Bedroom Detached Duplex', price: 180000000, location_area: 'Lekki Phase 1', location_state: 'Lagos', property_type: 'Duplex', listing_type: 'Sale', bedrooms: 4, bathrooms: 4, size_sqm: 280, images: [], is_verified: true, is_diaspora_friendly: true },
  { id: 2, title: 'Luxury 3-Bed Apartment', price: 4500000, location_area: 'Maitama', location_state: 'Abuja', property_type: 'Apartment', listing_type: 'Rent', bedrooms: 3, bathrooms: 3, size_sqm: 160, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 3, title: 'Commercial Land — 1000sqm', price: 95000000, location_area: 'Victoria Island', location_state: 'Lagos', property_type: 'Land', listing_type: 'Sale', bedrooms: null, bathrooms: null, size_sqm: 1000, images: [], is_verified: true, is_diaspora_friendly: true },
  { id: 4, title: '5 Bedroom Fully Detached House', price: 320000000, location_area: 'GRA', location_state: 'Port Harcourt', property_type: 'House', listing_type: 'Sale', bedrooms: 5, bathrooms: 5, size_sqm: 450, images: [], is_verified: false, is_diaspora_friendly: true },
  { id: 5, title: '2 Bedroom Flat — Short Let', price: 350000, location_area: 'Ikeja GRA', location_state: 'Lagos', property_type: 'Apartment', listing_type: 'Shortlet', bedrooms: 2, bathrooms: 2, size_sqm: 90, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 6, title: 'Office Space — Ground Floor', price: 8000000, location_area: 'Wuse 2', location_state: 'Abuja', property_type: 'Commercial', listing_type: 'Rent', bedrooms: null, bathrooms: 2, size_sqm: 200, images: [], is_verified: true, is_diaspora_friendly: false },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.get('/properties/?featured=true&limit=6')
      .then(r => setFeatured(r.data.results || r.data))
      .catch(() => setFeatured(FALLBACK_PROPERTIES))
  }, [])

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #0B5C3A 0%, #0e7a4e 60%, #0B5C3A 100%)',
        color: 'white',
        padding: '80px 0 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
          background: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80) center/cover',
          opacity: 0.15
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ marginBottom: 16 }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#F5C46A', border: '1px solid rgba(255,255,255,0.2)', fontSize: 13 }}>
                🇳🇬 Nigeria's #1 Real Estate Platform
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20
            }}>
              Find Your Land,<br />
              <span style={{ color: 'var(--gold-light)' }}>Own Your Future.</span>
            </h1>
            <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, lineHeight: 1.6 }}>
              Whether you're in Lagos, London, or Los Angeles — discover verified properties,
              invest confidently, and own a piece of Nigeria.
            </p>
            <SearchBar inline />
            <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, opacity: 0.75 }}>Popular: Lekki, Ikoyi, Abuja, Port Harcourt</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'white', padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 700, color: 'var(--green)' }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-sub">Handpicked, verified listings across Nigeria's top cities</p>
            </div>
            <Link to="/listings" className="btn-secondary">View all →</Link>
          </div>
          <div className="grid-3">
            {(featured.length > 0 ? featured : FALLBACK_PROPERTIES).map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY LOCATION */}
      <section style={{ padding: '60px 0 80px', background: 'white' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 8 }}>Browse by Location</h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>Nigeria's most active real estate markets</p>
          <div className="grid-3">
            {LOCATIONS.map(loc => (
              <Link key={loc.name} to={`/listings?q=${loc.name}`} style={{
                background: loc.color,
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid transparent',
                transition: 'box-shadow 0.2s, transform 0.2s'
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)', fontFamily: 'var(--ff-display)' }}>{loc.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{loc.count}</p>
                </div>
                <span style={{ fontSize: 24 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIASPORA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #C9933B, #E8B65A)',
        padding: '60px 0',
        color: 'white'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>For Nigerians Abroad</span>
            <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: '12px 0 16px', lineHeight: 1.2 }}>
              Invest in Nigeria from Anywhere in the World
            </h2>
            <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.7 }}>
              Landora's Diaspora Portal offers escrow protection, remote virtual tours, title document delivery,
              and foreign currency payment — making it safe to invest from London, New York, or Toronto.
            </p>
          </div>
          <Link to="/diaspora" style={{
            background: 'white',
            color: 'var(--gold)',
            padding: '16px 36px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 16,
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}>Explore Diaspora Portal →</Link>
        </div>
      </section>

      {/* WHY LANDORA */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">Why Nigerians Choose Landora</h2>
            <p className="section-sub">Built for trust, speed, and safety in the Nigerian market</p>
          </div>
          <div className="grid-3">
            {WHY_ITEMS.map(item => (
              <div key={item.title} style={{
                background: 'white',
                borderRadius: 16,
                padding: '32px 28px',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 10, fontFamily: 'var(--ff-display)' }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green)', color: 'white', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 16 }}>
            Ready to Find Your Property?
          </h2>
          <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Join over 45,000 Nigerians who've found their dream property on Landora.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/listings" style={{ background: 'var(--gold)', color: 'white', padding: '14px 36px', borderRadius: 9, fontWeight: 600, fontSize: 16 }}>Browse Properties</Link>
            <Link to="/register" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '14px 36px', borderRadius: 9, fontWeight: 600, fontSize: 16, border: '1.5px solid rgba(255,255,255,0.3)' }}>Create Free Account</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
