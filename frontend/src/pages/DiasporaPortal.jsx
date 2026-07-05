import { useState } from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  { icon: '🔍', title: 'Search & Shortlist', desc: 'Browse diaspora-friendly verified listings. Filter by location, price, and type from anywhere in the world.' },
  { icon: '📹', title: 'Virtual Tour', desc: 'Schedule a live video walkthrough with a Landora agent who will be physically at the property on your behalf.' },
  { icon: '📄', title: 'Due Diligence', desc: 'We verify the C of O, survey plans, and all title documents. You receive a full due diligence report.' },
  { icon: '🔐', title: 'Escrow Payment', desc: 'Pay in USD, GBP, EUR or NGN through our Paystack-powered escrow. Funds are only released after your approval.' },
  { icon: '✍️', title: 'Remote Signing', desc: 'Complete all legal documents digitally. Notarised agreements are sent to you internationally.' },
  { icon: '🏠', title: 'Ownership Transfer', desc: 'Receive the registered title deed. We also offer property management services for absentee owners.' },
]

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', rate: 1600 },
  { code: 'GBP', flag: '🇬🇧', rate: 2000 },
  { code: 'EUR', flag: '🇪🇺', rate: 1720 },
  { code: 'CAD', flag: '🇨🇦', rate: 1170 },
]

const FAQ = [
  { q: 'Can I really buy property in Nigeria without being physically present?', a: 'Yes. Landora has a fully digital process covering tours, verification, documentation, and payment — all designed for diaspora investors.' },
  { q: 'Is my money protected?', a: 'Absolutely. We use escrow accounts so your funds are never released to the seller until all conditions are met and you approve the transaction.' },
  { q: 'What documents do I need?', a: 'A valid passport or NIN, proof of address in your country of residence, and bank account details. Our team guides you through every step.' },
  { q: 'Can I sell the property later from abroad?', a: 'Yes. Landora also supports remote property sales. We list it, find buyers, manage the process, and remit your proceeds internationally.' },
  { q: 'What currencies do you accept?', a: 'USD, GBP, EUR, CAD, and NGN. We use live exchange rates from the CBN and notify you of any significant rate changes before payment.' },
]

export default function DiasporaPortal() {
  const [calcAmount, setCalcAmount] = useState('')
  const [calcCurrency, setCalcCurrency] = useState('USD')
  const [openFaq, setOpenFaq] = useState(null)

  const rate = CURRENCIES.find(c => c.code === calcCurrency)?.rate || 1600
  const ngnEquivalent = calcAmount ? Number(calcAmount) * rate : null

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #C9933B 0%, #E8B65A 100%)', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.06em' }}>For Nigerians in the Diaspora</span>
            <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, margin: '16px 0 20px', lineHeight: 1.15 }}>
              Own a Piece of Nigeria<br />From Anywhere on Earth
            </h1>
            <p style={{ fontSize: 17, opacity: 0.9, lineHeight: 1.7, marginBottom: 32 }}>
              Landora removes every barrier between you and Nigerian real estate — with verified listings,
              escrow protection, virtual tours, and remote closing. 100% online. 100% secure.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/listings?diaspora=true" style={{ background: 'white', color: 'var(--gold)', padding: '14px 28px', borderRadius: 9, fontWeight: 700, fontSize: 15 }}>Browse Diaspora Listings</Link>
              <a href="#how-it-works" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 28px', borderRadius: 9, fontWeight: 600, fontSize: 15, border: '1.5px solid rgba(255,255,255,0.4)' }}>How It Works</a>
            </div>
          </div>

          {/* CURRENCY CALCULATOR */}
          <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', color: 'var(--text)' }}>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--dark)' }}>Currency Calculator</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20 }}>See what your foreign currency buys in NGN</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input
                type="number"
                placeholder="Amount"
                value={calcAmount}
                onChange={e => setCalcAmount(e.target.value)}
                style={{ flex: 1, padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 16, outline: 'none' }}
              />
              <select value={calcCurrency} onChange={e => setCalcCurrency(e.target.value)}
                style={{ padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 15, background: 'white', outline: 'none' }}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
            </div>
            {ngnEquivalent && (
              <div style={{ background: 'var(--green-pale)', borderRadius: 10, padding: '16px 20px', textAlign: 'center', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Approximate NGN value</p>
                <p style={{ fontSize: 26, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--ff-display)' }}>
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(ngnEquivalent)}
                </p>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Rate: 1 {calcCurrency} ≈ ₦{rate.toLocaleString()} (indicative)</p>
              </div>
            )}
            <Link to="/listings?diaspora=true" className="btn-gold" style={{ display: 'block', textAlign: 'center' }}>Find Properties in This Range</Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section style={{ background: 'white', padding: '32px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {['🔒 Escrow Protected', '📄 Title Verified', '📹 Virtual Tours', '🌍 Multi-currency', '⚖️ Legal Documentation'].map(b => (
            <span key={b} style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{b}</span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="section-title">How the Diaspora Process Works</h2>
            <p className="section-sub">From abroad to ownership — six clear steps</p>
          </div>
          <div className="grid-3">
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ background: 'white', borderRadius: 16, padding: '28px', border: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, width: 28, height: 28, background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 0 80px', background: 'white' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>Frequently Asked Questions</h2>
          <p className="section-sub" style={{ textAlign: 'center', marginBottom: 48 }}>Common questions from diaspora investors</p>
          {FAQ.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', textAlign: 'left', padding: '20px 0',
                background: 'none', border: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 16, fontWeight: 600, color: 'var(--dark)', cursor: 'pointer'
              }}>
                {f.q}
                <span style={{ fontSize: 20, color: 'var(--green)', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openFaq === i && (
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, paddingBottom: 20 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green)', color: 'white', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 16 }}>
            Start Your Nigerian Property Journey Today
          </h2>
          <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Create a free account and access all diaspora-friendly listings with escrow protection.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register?role=diaspora" style={{ background: 'var(--gold)', color: 'white', padding: '15px 36px', borderRadius: 9, fontWeight: 700, fontSize: 16 }}>Create Diaspora Account</Link>
            <Link to="/listings?diaspora=true" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '15px 36px', borderRadius: 9, fontWeight: 600, fontSize: 16, border: '1.5px solid rgba(255,255,255,0.3)' }}>Browse Listings</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
