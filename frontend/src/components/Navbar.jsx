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
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/listings', label: 'Browse Properties' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/diaspora', label: 'Diaspora' },
  ]

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
        height: 68,
        padding: '0 16px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, background: 'var(--green)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>L</span>
          </div>
          <span style={{
            fontWeight: 700, fontSize: 22,
            color: 'var(--green)', letterSpacing: '-0.5px'
          }}>Landora</span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontSize: 15, fontWeight: 500,
              color: isActive(to) ? 'var(--green)' : 'var(--text)',
              borderBottom: isActive(to) ? '2px solid var(--green)' : '2px solid transparent',
              paddingBottom: 2
            }}>{label}</Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>Dashboard</Link>
              <Link to="/list-property" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>+ List Property</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>Get Started</Link>
            </>
          )}
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'none', flexDirection: 'column', gap: 5, padding: 8
          }}
        >
          <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? 'transparent' : 'var(--dark)', transition: '0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--dark)', transform: menuOpen ? 'rotate(45deg) translate(5px, -5px)' : 'none', transition: '0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--dark)', transform: menuOpen ? 'rotate(-45deg) translate(5px, 5px)' : 'none', transition: '0.3s' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'white',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0
        }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 16, fontWeight: 500,
                color: isActive(to) ? 'var(--green)' : 'var(--text)',
                padding: '14px 0',
                borderBottom: '1px solid var(--border)',
                display: 'block'
              }}>{label}</Link>
          ))}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 15, fontWeight: 500, color: 'var(--muted)', padding: '10px 0' }}>
                  Dashboard
                </Link>
                <Link to="/list-property" onClick={() => setMenuOpen(false)}
                  className="btn-primary" style={{ textAlign: 'center', padding: '12px' }}>
                  + List Property
                </Link>
                <button onClick={handleLogout}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '12px', fontSize: 15, cursor: 'pointer', color: 'var(--muted)' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', padding: '12px', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 8 }}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="btn-primary" style={{ textAlign: 'center', padding: '12px' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}