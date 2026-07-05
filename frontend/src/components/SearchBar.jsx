import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STATES = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Benin City', 'Kaduna', 'Lekki', 'Ikoyi', 'Victoria Island', 'Ajah', 'Ikeja']
const TYPES = ['', 'Sale', 'Rent', 'Shortlet']
const PROPERTY_TYPES = ['', 'Apartment', 'House', 'Land', 'Commercial', 'Duplex', 'Bungalow']

export default function SearchBar({ inline = false }) {
  const [q, setQ] = useState('')
  const [listingType, setListingType] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (listingType) params.set('listing_type', listingType)
    if (propertyType) params.set('property_type', propertyType)
    navigate(`/listings?${params.toString()}`)
  }

  const selectStyle = {
    padding: '14px 16px',
    border: inline ? 'none' : '1.5px solid var(--border)',
    borderRadius: inline ? 0 : 8,
    fontSize: 15,
    background: 'white',
    outline: 'none',
    color: 'var(--text)',
    cursor: 'pointer',
    minWidth: 140
  }

  if (inline) {
    return (
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        background: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
      }}>
        <input
          type="text"
          placeholder="Search by location, property type..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{
            flex: 1,
            padding: '16px 20px',
            border: 'none',
            fontSize: 15,
            outline: 'none',
            minWidth: 0
          }}
        />
        <div style={{ width: 1, background: 'var(--border)', margin: '12px 0' }} />
        <select value={listingType} onChange={e => setListingType(e.target.value)} style={selectStyle}>
          <option value="">Any type</option>
          {TYPES.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div style={{ width: 1, background: 'var(--border)', margin: '12px 0' }} />
        <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={selectStyle}>
          <option value="">Any property</option>
          {PROPERTY_TYPES.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="submit" className="btn-primary" style={{ margin: 8, borderRadius: 8, whiteSpace: 'nowrap' }}>
          🔍 Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <input
        type="text"
        placeholder="Location or keyword..."
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{ flex: 1, minWidth: 200, padding: '11px 16px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none' }}
      />
      <select value={listingType} onChange={e => setListingType(e.target.value)} style={{ ...selectStyle, border: '1.5px solid var(--border)', borderRadius: 8, padding: '11px 16px' }}>
        <option value="">All types</option>
        {TYPES.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ ...selectStyle, border: '1.5px solid var(--border)', borderRadius: 8, padding: '11px 16px' }}>
        <option value="">All properties</option>
        {PROPERTY_TYPES.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <button type="submit" className="btn-primary">Search</button>
    </form>
  )
}
