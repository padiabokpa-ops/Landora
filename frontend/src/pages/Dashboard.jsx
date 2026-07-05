import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    api.get('/properties/my-listings/').then(r => setProperties(r.data.results || r.data)).catch(() => setProperties([]))
    api.get('/inquiries/received/').then(r => setInquiries(r.data.results || r.data)).catch(() => setInquiries([]))
    api.get('/properties/saved/').then(r => setSavedProperties(r.data.results || r.data)).catch(() => setSavedProperties([]))
  }, [])

  const TABS = ['overview', 'my-listings', 'inquiries', 'saved']

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 80 }}>
      {/* HEADER */}
      <div style={{ background: 'var(--green)', color: 'white', padding: '40px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👤</div>
            <div>
              <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700 }}>Welcome back, {user?.full_name?.split(' ')[0] || 'User'}</h1>
              <p style={{ opacity: 0.8, fontSize: 15, marginTop: 4 }}>{user?.email} · <span style={{ textTransform: 'capitalize' }}>{user?.role}</span></p>
            </div>
          </div>

          {/* QUICK STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 32 }}>
            {[
              { label: 'My Listings', value: properties.length },
              { label: 'Inquiries', value: inquiries.length },
              { label: 'Saved', value: savedProperties.length },
              { label: 'Profile Views', value: '—' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '16px 20px' }}>
                <p style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{s.value}</p>
                <p style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: -24 }}>
        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, background: 'white', borderRadius: 12, padding: 6, marginBottom: 28, boxShadow: 'var(--shadow)', width: 'fit-content' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '9px 20px',
              borderRadius: 8,
              border: 'none',
              background: tab === t ? 'var(--green)' : 'transparent',
              color: tab === t ? 'white' : 'var(--muted)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}>{t.replace('-', ' ')}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <Link to="/list-property" className="btn-primary" style={{ fontSize: 15 }}>+ Add New Listing</Link>
              <Link to="/listings" className="btn-secondary" style={{ fontSize: 15 }}>Browse Properties</Link>
            </div>
            <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid var(--border)' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Recent Activity</h3>
              {inquiries.length === 0 && properties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>No activity yet</p>
                  <p style={{ fontSize: 14 }}>Start by listing a property or saving your favourites.</p>
                </div>
              ) : (
                inquiries.slice(0, 5).map(inq => (
                  <div key={inq.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: 14 }}>New inquiry: {inq.property_title || 'Property'}</p>
                      <p style={{ fontSize: 13, color: 'var(--muted)' }}>From {inq.name || inq.email} · {new Date(inq.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="badge badge-green">New</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MY LISTINGS TAB */}
        {tab === 'my-listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to="/list-property" className="btn-primary">+ Add Listing</Link>
            </div>
            {properties.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, padding: '60px 32px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>📋</p>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>No listings yet</p>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>Create your first property listing and reach thousands of buyers.</p>
                <Link to="/list-property" className="btn-primary">Create Listing</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {properties.map(p => (
                  <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Link to={`/listings/${p.id}`} style={{ fontWeight: 600, fontSize: 15, color: 'var(--dark)' }}>{p.title}</Link>
                      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>📍 {p.location_area}, {p.location_state} · {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(p.price)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className={p.is_verified ? 'badge badge-green' : 'badge'}>{p.is_verified ? 'Verified' : 'Pending'}</span>
                      <Link to={`/listings/${p.id}`} className="btn-secondary" style={{ padding: '7px 16px', fontSize: 13 }}>View</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INQUIRIES TAB */}
        {tab === 'inquiries' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
            {inquiries.length === 0 ? (
              <div style={{ padding: '60px 32px', textAlign: 'center' }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>📬</p>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>No inquiries yet</p>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>Inquiries from potential buyers will appear here.</p>
              </div>
            ) : (
              inquiries.map((inq, i) => (
                <div key={inq.id} style={{ padding: '16px 24px', borderBottom: i < inquiries.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontWeight: 600 }}>{inq.name}</p>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{new Date(inq.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{inq.email} · {inq.phone}</p>
                  <p style={{ fontSize: 14 }}>{inq.message}</p>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <a href={`mailto:${inq.email}`} className="btn-secondary" style={{ padding: '7px 16px', fontSize: 13 }}>Reply by email</a>
                    {inq.phone && <a href={`tel:${inq.phone}`} className="btn-secondary" style={{ padding: '7px 16px', fontSize: 13 }}>Call</a>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SAVED TAB */}
        {tab === 'saved' && (
          <div>
            {savedProperties.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, padding: '60px 32px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>❤️</p>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>No saved properties</p>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>Properties you save will appear here for easy access.</p>
                <Link to="/listings" className="btn-primary">Browse Properties</Link>
              </div>
            ) : (
              <div className="grid-3">
                {savedProperties.map(p => (
                  <Link key={p.id} to={`/listings/${p.id}`} className="card" style={{ display: 'block' }}>
                    <div style={{ padding: '16px 20px' }}>
                      <p style={{ fontWeight: 600 }}>{p.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>📍 {p.location_area}, {p.location_state}</p>
                      <p style={{ color: 'var(--green)', fontWeight: 700, marginTop: 8 }}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
