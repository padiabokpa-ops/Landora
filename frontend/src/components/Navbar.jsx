import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, background: 'var(--green)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 18 }}>L</span>
          </div>
          <span style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 22,
            color: 'var(--green)',
            letterSpacing: '-0.5px'
          }}>Landora</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {[
            { to: '/listings', label: 'Browse Properties' },
            { to: '/how-it-works', label: 'How It Works' },
            { to: '/diaspora', label: 'Diaspora' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontSize: 15,
              fontWeight: 500,
              color: isActive(to) ? 'var(--green)' : 'var(--text)',
              borderBottom: isActive(to) ? '2px solid var(--green)' : '2px solid transparent',
              paddingBottom: 2,
              transition: 'color 0.2s'
            }}>{label}</Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                fontSize: 14, fontWeight: 500, color: 'var(--muted)'
              }}>Dashboard</Link>
              <Link to="/list-property" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>
                + List Property
              </Link>
              <button onClick={handleLogout} style={{
                background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, fontWeight: 500
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
