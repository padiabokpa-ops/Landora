import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('landora_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/accounts/profile/')
      setUser(res.data)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res = await api.post('/accounts/login/', { email, password })
    const { access, user: userData } = res.data
    localStorage.setItem('landora_token', access)
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    setToken(access)
    setUser(userData)
    return userData
  }

  const register = async (data) => {
    const res = await api.post('/accounts/register/', data)
    const { access, user: userData } = res.data
    localStorage.setItem('landora_token', access)
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    setToken(access)
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('landora_token')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
