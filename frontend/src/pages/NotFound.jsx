import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div>
        <p style={{ fontSize: 72, marginBottom: 16 }}>🏚️</p>
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28 }}>The property you're looking for has been sold or doesn't exist.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  )
}
