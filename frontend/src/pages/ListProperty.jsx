import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

const STATES = ['Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Kano', 'Enugu', 'Delta', 'Kaduna', 'Anambra', 'Cross River']
const PROP_TYPES = ['Apartment', 'House', 'Duplex', 'Bungalow', 'Land', 'Commercial', 'Warehouse', 'Office']
const LISTING_TYPES = ['Sale', 'Rent', 'Shortlet', 'Lease']
const AMENITIES = ['Swimming pool', 'Gym', 'CCTV', 'Generator', 'Parking', 'BQ', 'Fitted kitchen', 'Air conditioning', 'Elevator', 'Security']

export default function ListProperty() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '', description: '', property_type: '', listing_type: '',
    price: '', location_area: '', location_state: '',
    bedrooms: '', bathrooms: '', size_sqm: '',
    amenities: [], is_diaspora_friendly: false
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

  const toggleAmenity = (a) => {
    setForm(p => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'amenities') data.append(k, JSON.stringify(v))
        else data.append(k, v)
      })
      images.forEach(img => data.append('images', img))
      const res = await api.post('/properties/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate(`/listings/${res.data.id}`)
    } catch (err) {
      setError('Failed to submit listing. Please check all fields and try again.')
    } finally {
      setLoading(false)
    }
  }

  const STEPS = ['Basic Info', 'Location & Specs', 'Photos & Features', 'Review & Publish']

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'var(--green)', color: 'white', padding: '40px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>List Your Property</h1>
          <p style={{ opacity: 0.8 }}>Reach thousands of buyers and diaspora investors on Landora</p>
          <div style={{ display: 'flex', gap: 0, marginTop: 28 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'unset' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: step === i + 1 ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 8, padding: '7px 12px'
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: i + 1 < step ? 'var(--gold-light)' : i + 1 === step ? 'white' : 'rgba(255,255,255,0.2)',
                    color: i + 1 < step ? 'var(--gold)' : i + 1 === step ? 'var(--green)' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13
                  }}>{i + 1 < step ? '✓' : i + 1}</div>
                  <span style={{ fontSize: 13, fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 760, paddingTop: 40 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: '36px 40px', boxShadow: 'var(--shadow)' }}>
          {error && <div style={{ background: '#FEF2F2', color: '#DC2626', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>{error}</div>}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Basic Information</h2>
              <div className="form-group">
                <label>Property Title *</label>
                <input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. 4 Bedroom Detached Duplex with BQ" required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Property Type *</label>
                  <select value={form.property_type} onChange={e => update('property_type', e.target.value)} required>
                    <option value="">Select type</option>
                    {PROP_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Listing Type *</label>
                  <select value={form.listing_type} onChange={e => update('listing_type', e.target.value)} required>
                    <option value="">For Sale/Rent?</option>
                    {LISTING_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Price (₦) *</label>
                <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="e.g. 180000000" required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={5} placeholder="Describe the property in detail — layout, finishing, condition, access, neighbourhood..." required style={{ resize: 'vertical' }} />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Location & Specifications</h2>
              <div className="grid-2">
                <div className="form-group">
                  <label>State *</label>
                  <select value={form.location_state} onChange={e => update('location_state', e.target.value)} required>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Area/Estate *</label>
                  <input value={form.location_area} onChange={e => update('location_area', e.target.value)} placeholder="e.g. Lekki Phase 1" required />
                </div>
              </div>
              <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="form-group">
                  <label>Bedrooms</label>
                  <input type="number" value={form.bedrooms} onChange={e => update('bedrooms', e.target.value)} placeholder="e.g. 4" min={0} />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={e => update('bathrooms', e.target.value)} placeholder="e.g. 4" min={0} />
                </div>
                <div className="form-group">
                  <label>Size (sqm)</label>
                  <input type="number" value={form.size_sqm} onChange={e => update('size_sqm', e.target.value)} placeholder="e.g. 280" min={0} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Photos & Features</h2>
              <div className="form-group">
                <label>Property Photos</label>
                <input type="file" multiple accept="image/*"
                  onChange={e => setImages(Array.from(e.target.files))}
                  style={{ padding: '12px', border: '1.5px dashed var(--border)', borderRadius: 8, width: '100%', cursor: 'pointer', background: 'var(--cream)' }} />
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Upload up to 10 photos. First photo will be the main image.</p>
              </div>
              {images.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {images.map((img, i) => (
                    <div key={i} style={{ position: 'relative', width: 80, height: 60, borderRadius: 8, overflow: 'hidden', border: '2px solid var(--border)' }}>
                      <img src={URL.createObjectURL(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
              <div className="form-group">
                <label>Amenities & Features</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                  {AMENITIES.map(a => (
                    <label key={a} onClick={() => toggleAmenity(a)} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                      border: form.amenities.includes(a) ? '2px solid var(--green)' : '1.5px solid var(--border)',
                      background: form.amenities.includes(a) ? 'var(--green-pale)' : 'white',
                      fontSize: 14, fontWeight: form.amenities.includes(a) ? 500 : 400,
                      transition: 'all 0.15s'
                    }}>
                      <input type="checkbox" checked={form.amenities.includes(a)} readOnly style={{ display: 'none' }} />
                      {form.amenities.includes(a) ? '✓' : '+'} {a}
                    </label>
                  ))}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '14px', background: 'var(--gold-pale)', borderRadius: 10, border: '1.5px solid var(--gold-light)' }}>
                <input type="checkbox" checked={form.is_diaspora_friendly} onChange={e => update('is_diaspora_friendly', e.target.checked)} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>✈️ Mark as Diaspora Friendly</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>This listing will appear in diaspora investor search results and the Diaspora Portal.</p>
                </div>
              </label>
            </div>
          )}

          {/* STEP 4 REVIEW */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Review & Publish</h2>
              <div style={{ background: 'var(--cream)', borderRadius: 14, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>{form.title || 'Untitled Property'}</h3>
                {[
                  ['Type', `${form.property_type} — ${form.listing_type}`],
                  ['Location', `${form.location_area}, ${form.location_state}`],
                  ['Price', form.price ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(form.price) : '—'],
                  ['Beds/Baths', `${form.bedrooms || '—'} beds / ${form.bathrooms || '—'} baths`],
                  ['Size', form.size_sqm ? `${form.size_sqm} sqm` : '—'],
                  ['Photos', `${images.length} uploaded`],
                  ['Amenities', form.amenities.length > 0 ? form.amenities.join(', ') : 'None selected'],
                  ['Diaspora Friendly', form.is_diaspora_friendly ? 'Yes ✈️' : 'No'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--green-pale)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14 }}>
                <p style={{ fontWeight: 600, color: 'var(--green)', marginBottom: 4 }}>✅ What happens next?</p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Our team will review your listing within 24 hours for title verification and content accuracy. You'll receive a confirmation email once it's live.</p>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {step > 1 ? (
              <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
            ) : <div />}
            {step < 4 ? (
              <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Continue →</button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Publishing...' : '🚀 Publish Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
