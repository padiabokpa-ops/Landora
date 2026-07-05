import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import api from '../utils/api'

const FALLBACK_AGENT = {
  id: 1, full_name: 'Chukwuemeka Obi', email: 'chukwu@primepropertylagos.com',
  phone: '+234 801 234 5678', agency: 'Prime Property Lagos',
  bio: 'Over 12 years of experience in Lagos real estate. Specialising in Lekki, Ikoyi, and Victoria Island residential and commercial properties. Licensed by the Real Estate Developers Association of Nigeria (REDAN).',
  rating: 4.8, reviews: 142, listings_count: 38, sales_count: 210,
  location: 'Lagos, Nigeria', photo: null,
  properties: []
}

export default function AgentProfile() {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/agents/${id}/`).then(r => setAgent(r.data)).catch(() => setAgent(FALLBACK_AGENT)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--muted)' }}>Loading...</div>
  if (!agent) return <div style={{ textAlign: 'center', padding: 80 }}>Agent not found.</div>

  const stars = '⭐'.repeat(Math.round(agent.rating))

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 80 }}>
      <div className="container" style={{ paddingTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32 }}>
          {/* AGENT CARD */}
          <div>
            <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid var(--border)', textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 90, height: 90, background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, margin: '0 auto 16px' }}>
                {agent.photo ? <img src={agent.photo} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '👤'}
              </div>
              <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{agent.full_name}</h1>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 8 }}>{agent.agency}</p>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>📍 {agent.location}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div><p style={{ fontWeight: 700, fontSize: 18 }}>{agent.rating}</p><p style={{ fontSize: 11, color: 'var(--muted)' }}>Rating</p></div>
                <div><p style={{ fontWeight: 700, fontSize: 18 }}>{agent.reviews}</p><p style={{ fontSize: 11, color: 'var(--muted)' }}>Reviews</p></div>
                <div><p style={{ fontWeight: 700, fontSize: 18 }}>{agent.listings_count}</p><p style={{ fontSize: 11, color: 'var(--muted)' }}>Listings</p></div>
              </div>
              <a href={`tel:${agent.phone}`} className="btn-primary" style={{ display: 'block', marginBottom: 10 }}>📞 Call Agent</a>
              <a href={`mailto:${agent.email}`} className="btn-secondary" style={{ display: 'block' }}>✉️ Send Email</a>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>About This Agent</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{agent.bio}</p>
            </div>
          </div>

          {/* LISTINGS */}
          <div>
            <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
              Properties by {agent.full_name?.split(' ')[0]}
            </h2>
            {!agent.properties || agent.properties.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, padding: '60px 32px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>No active listings</p>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>This agent doesn't have any active listings at the moment.</p>
              </div>
            ) : (
              <div className="grid-3">
                {agent.properties.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
