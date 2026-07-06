import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TYPES = ['Sale', 'Rent', 'Shortlet']
const PROPERTY_TYPES = ['Apartment', 'House', 'Land', 'Commercial', 'Duplex', 'Bungalow']

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

  return (
    <form onSubmit={handleSearch} className={inline ? 'searchbar-inline' : 'searchbar-normal'}>
      <input
        type="text"
        placeholder="Search by location, property type..."
        value={q}
        onChange={e => setQ(e.target.value)}
        className="searchbar-input"
      />
      <select value={listingType} onChange={e => setListingType(e.target.value)} className="searchbar-select">
        <option value="">Any type</option>
        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="searchbar-select">
        <option value="">Any property</option>
        {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <button type="submit" className="btn-primary searchbar-btn">🔍 Search</button>

      <style>{`
        .searchbar-inline {
          display: flex;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          flex-wrap: wrap;
        }
        .searchbar-normal {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .searchbar-input {
          flex: 1;
          min-width: 160px;
          padding: 16px 20px;
          border: none;
          font-size: 15px;
          outline: none;
        }
        .searchbar-normal .searchbar-input {
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 11px 16px;
        }
        .searchbar-select {
          padding: 14px 16px;
          border: none;
          font-size: 15px;
          background: white;
          outline: none;
          cursor: pointer;
          min-width: 120px;
        }
        .searchbar-normal .searchbar-select {
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 11px 16px;
        }
        .searchbar-btn {
          margin: 8px;
          border-radius: 8px;
          white-space: nowrap;
        }
        .searchbar-normal .searchbar-btn {
          margin: 0;
        }

        @media (max-width: 600px) {
          .searchbar-inline {
            flex-direction: column;
            border-radius: 12px;
            overflow: hidden;
          }
          .searchbar-inline .searchbar-input {
            width: 100%;
            border-bottom: 1px solid var(--border);
            padding: 14px 16px;
          }
          .searchbar-inline .searchbar-select {
            width: 100%;
            border-bottom: 1px solid var(--border);
            padding: 12px 16px;
          }
          .searchbar-inline .searchbar-btn {
            width: calc(100% - 16px);
            padding: 14px;
            text-align: center;
          }
          .searchbar-normal {
            flex-direction: column;
          }
          .searchbar-normal .searchbar-input,
          .searchbar-normal .searchbar-select,
          .searchbar-normal .searchbar-btn {
            width: 100%;
          }
        }
      `}</style>
    </form>
  )
}