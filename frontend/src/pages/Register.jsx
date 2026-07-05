import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  { value: 'buyer', label: '🏠 Buyer', desc: 'Looking to buy or rent' },
  { value: 'seller', label: '📋 Seller/Agent', desc: 'Listing properties' },
  { value: 'diaspora', label: '✈️ Diaspora Investor', desc: 'Based abroad, investing in Nigeria' },
  { value: 'developer', label: '🏗️ Developer', desc: 'Property developer/builder' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', role: 'buyer' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      const data = err.response?.data
      setError(typeof data === 'string' ? data : Object.values(data || {}).flat().join(' ') || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: 'var(--cream)' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Join Landora</h1>
          <p style={{ color: 'var(--muted)' }}>Nigeria's most trusted property platform</p>
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow)' }}>
          {error && <div style={{ background: '#FEF2F2', color: '#DC2626', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>{error}</div>}

          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>I am a...</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
            {ROLES.map(r => (
              <div key={r.value} onClick={() => setForm(p => ({ ...p, role: r.value }))} style={{
                padding: '14px', borderRadius: 10, cursor: 'pointer',
                border: form.role === r.value ? '2px solid var(--green)' : '1.5px solid var(--border)',
                background: form.role === r.value ? 'var(--green-pale)' : 'white',
                transition: 'all 0.15s'
              }}>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{r.label}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{r.desc}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} placeholder="Adaeze Okonkwo" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+234 800 000 0000" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="At least 8 characters" required minLength={8} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
              By registering, you agree to our <span style={{ color: 'var(--green)' }}>Terms of Service</span> and <span style={{ color: 'var(--green)' }}>Privacy Policy</span>.
            </p>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--green)', fontWeight: 500 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
