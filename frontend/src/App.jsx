import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Dashboard from './pages/Dashboard'
import AgentProfile from './pages/AgentProfile'
import DiasporaPortal from './pages/DiasporaPortal'
import Login from './pages/Login'
import Register from './pages/Register'
import ListProperty from './pages/ListProperty'
import HowItWorks from './pages/HowItWorks'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<PropertyDetail />} />
          <Route path="/agents/:id" element={<AgentProfile />} />
          <Route path="/diaspora" element={<DiasporaPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/list-property" element={<PrivateRoute><ListProperty /></PrivateRoute>} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
