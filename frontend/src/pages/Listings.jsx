import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import api from '../utils/api'

const FALLBACK = [
  { id: 1, title: '4 Bed Detached Duplex', price: 180000000, location_area: 'Lekki Phase 1', location_state: 'Lagos', property_type: 'Duplex', listing_type: 'Sale', bedrooms: 4, bathrooms: 4, size_sqm: 280, images: [], is_verified: true, is_diaspora_friendly: true },
  { id: 2, title: 'Luxury 3-Bed Apartment', price: 4500000, location_area: 'Maitama', location_state: 'Abuja', property_type: 'Apartment', listing_type: 'Rent', bedrooms: 3, bathrooms: 3, size_sqm: 160, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 3, title: 'Commercial Land 1000sqm', price: 95000000, location_area: 'Victoria Island', location_state: 'Lagos', property_type: 'Land', listing_type: 'Sale', bedrooms: null, bathrooms: null, size_sqm: 1000, images: [], is_verified: true, is_diaspora_friendly: true },
  { id: 4, title: '5 Bed Fully Detached House', price: 320000000, location_area: 'GRA', location_state: 'Port Harcourt', property_type: 'House', listing_type: 'Sale', bedrooms: 5, bathrooms: 5, size_sqm: 450, images: [], is_verified: false, is_diaspora_friendly: true },
  { id: 5, title: '2 Bed Flat — Short Let', price: 350000, location_area: 'Ikeja GRA', location_state: 'Lagos', property_type: 'Apartment', listing_type: 'Shortlet', bedrooms: 2, bathrooms: 2, size_sqm: 90, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 6, title: 'Office Space Ground Floor', price: 8000000, location_area: 'Wuse 2', location_state: 'Abuja', property_type: 'Commercial', listing_type: 'Rent', bedrooms: null, bathrooms: 2, size_sqm: 200, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 7, title: '3 Bed Semi-Detached Bungalow', price: 75000000, location_area: 'Ojodu Berger', location_state: 'Lagos', property_type: 'Bungalow', listing_type: 'Sale', bedrooms: 3, bathrooms: 2, size_sqm: 180, images: [], is_verified: true, is_diaspora_friendly: false },
  { id: 8, title: '1 Bed Studio Apartment', price: 1800000, location_area: 'Yaba', location_state: 'Lagos', property_type: 'Apartment', listing_type: 'Rent', bedrooms: 1, bathrooms: 1, size_sqm: 55, images: [], is_verified: false, is_diaspora_friendly: false },
  { id: 9, title: 'Plot of Land — 600sqm', price: 45000000, location_area: 'Sangotedo', location_state: 'Lagos', property_type: 'Land', listing_type: 'Sale', bedrooms: null, bathrooms: null, size_sqm: 600, images: [], is_verified: true, is_diaspora_friendly: true },
]

const SORT_OPTIONS = [
  { value: '-created_at', label: 'Newest first' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
]

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('-created_at')
  const [diasporaOnly, setDiasporaOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    fetchProperties()
  }, [searchParams, sort, page, diasporaOnly, verifiedOnly])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams)
      params.set('ordering', sort)
      params.set('page', page)
      if (diasporaOnly) params.set('is_diaspora_friendly', 'true')
      if (verifiedOnly) params.set('is_verified', 'true')
      if (minPrice) params.set('price_min', minPrice)
      if (maxPrice) params.set('price_max', maxPrice)
      const res = await api.get(`/properties/?${params.toString()}`)
      const data = res.data
      setProperties(data.results || data)
      setTotal(data.count || (data.results || data).length)
    } catch {
      setProperties(FALLBACK)
      setTotal(FALLBACK.length)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* TOP BAR */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <SearchBar />
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* SIDEBAR FILTERS */}
          <aside style={{
            width: 260,
            flexShrink: 0,
            background: 'white',
            borderRadius: 16,
            padding: 24,
            border: '1px solid var(--border)',
            position: 'sticky',
            top: 88
          }} className="filters-sidebar">
            <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Filter Results</h3>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Listing Type</p>
              {['Sale', 'Rent', 'Shortlet'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox"
                    checked={searchParams.get('listing_type') === t}
                    onChange={() => {
                      const p = new URLSearchParams(searchParams)
                      p.get('listing_type') === t ? p.delete('listing_type') : p.set('listing_type', t)
                      setSearchParams(p)
                    }} />
                  {t}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Property Type</p>
              {['Apartment', 'House', 'Land', 'Commercial', 'Duplex', 'Bungalow'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox"
                    checked={searchParams.get('property_type') === t}
                    onChange={() => {
                      const p = new URLSearchParams(searchParams)
                      p.get('property_type') === t ? p.delete('property_type') : p.set('property_type', t)
                      setSearchParams(p)
                    }} />
                  {t}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Price Range (₦)</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)}
                  style={{ width: '50%', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: 7, fontSize: 14, outline: 'none' }} />
                <input placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                  style={{ width: '50%', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: 7, fontSize: 14, outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Special Tags</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} />
                Verified only
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={diasporaOnly} onChange={e => setDiasporaOnly(e.target.checked)} />
                Diaspora friendly
              </label>
            </div>

            <button className="btn-primary" style={{ width: '100%' }} onClick={fetchProperties}>Apply Filters</button>
          </aside>

          {/* RESULTS */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                <strong style={{ color: 'var(--dark)' }}>{total}</strong> properties found
              </p>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ padding: '9px 14px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 14, background: 'white', outline: 'none' }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--green)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                Loading properties...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : properties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontSize: 40, marginBottom: 16 }}>🏠</p>
                <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No properties found</p>
                <p style={{ color: 'var(--muted)' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid-3">
                {properties.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            )}

            {total > 9 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
                {page > 1 && <button className="btn-secondary" onClick={() => setPage(p => p - 1)}>← Prev</button>}
                <button className="btn-secondary" onClick={() => setPage(p => p + 1)}>Next →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
