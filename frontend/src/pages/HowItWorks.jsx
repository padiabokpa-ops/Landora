import { Link } from 'react-router-dom'

const MODELS = [
  {
    icon: '🤝',
    tag: 'Commission Model',
    title: 'Agent & Marketplace Listings',
    desc: 'Landora connects verified buyers, sellers, agents, and resellers on one platform. When a deal closes through Landora, we charge a 5%–10% commission on the transaction value — paid by the seller or agent. Buyers pay nothing extra.',
    bullets: [
      'Agents list properties and earn from closed deals',
      'Sellers connect directly with vetted buyers',
      'Landora charges 5%–10% only on successful transactions',
      'Transparent, no hidden fees for buyers',
    ],
    color: '#E8F5EF',
    accent: '#0B5C3A',
  },
  {
    icon: '💰',
    tag: 'Direct Liquidation',
    title: 'Landora Buys Directly from You',
    desc: "Need to sell fast? Landora's Direct Liquidation Model means we buy your property directly, pay you instantly, and handle the resale ourselves. No listings, no waiting, no agents.",
    bullets: [
      'Submit your property details for a valuation',
      'Receive an instant cash offer within 48 hours',
      'Accept and receive payment — no delays',
      'Landora takes responsibility for the resale',
    ],
    color: '#FDF6E8',
    accent: '#C9933B',
  },
]

const PAYMENTS = [
  {
    icon: '🏦',
    title: 'Bank Transfer',
    desc: "Direct bank transfer into Landora's official corporate accounts. The most common method for high-value Nigerian property transactions. Account details are verified and displayed only within the platform.",
  },
  {
    icon: '⚡',
    title: 'Flutterwave',
    desc: 'Pay securely using Flutterwave — supporting cards, USSD, mobile money, and bank transfers. Available for both local NGN payments and international foreign currency transactions.',
  },
  {
    icon: '🔐',
    title: 'Escrow / Part Payment',
    desc: 'Landora supports escrow arrangements and part payments — terms are negotiated between buyer, seller, and agent. Funds are held securely and released only when agreed conditions are met.',
  },
  {
    icon: '🏠',
    title: 'Payment Upon Inspection',
    desc: 'Many agents and sellers require a physical inspection of the property at its location before authorising payment. This is supported and encouraged for high-value transactions.',
  },
]

const TERMS = [
  {
    icon: '🚗',
    title: 'Buyer Handles Inspection Logistics',
    body: 'Buyers and renters are 100% responsible for arranging and funding physical inspection visits. Landora and agents do not cover inspection travel costs. Third-party inspection companies can be recommended on request.',
  },
  {
    icon: '⏱️',
    title: 'No Reservations Without Payment',
    body: 'Properties are allocated on a "first pay, first served" basis. Verbal or written reservations are not binding without a full payment or a significant agreed deposit. Do not assume a property is held for you.',
  },
  {
    icon: '📸',
    title: 'As-Seen Condition',
    body: 'Properties are sold based on provided photos, videos, and physical inspection results. Once full payment is made and the property is handed over, transactions are generally non-refundable and non-exchangeable. Conduct thorough due diligence before payment.',
  },
  {
    icon: '⚠️',
    title: 'Scam Protection — Read Carefully',
    body: 'Scammers frequently impersonate legitimate estate companies and agents. NEVER transfer money to personal accounts. Always verify agents through our customer support or check their verified profile history on Landora. Legitimate Landora agents have full verified profiles with ratings, transaction history, and agency affiliation visible on the platform.',
    highlight: true,
  },
  {
    icon: '✅',
    title: 'Agent & Reseller Verification',
    body: 'Before engaging any agent or reseller, use the "Know Your Agent" feature on every agent profile page. You can view their registered agency, transaction history, client ratings, and ID verification status. If in doubt, contact Landora support before making any payment.',
  },
  {
    icon: '📄',
    title: 'Title & Documentation',
    body: 'Landora encourages all buyers to insist on seeing the Certificate of Occupancy (C of O), survey plans, and deed of assignment before completing any transaction. Our verified badge on listings means Landora has reviewed the documents — but buyers retain their own legal right to independent verification.',
  },
]

export default function HowItWorks() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ background: 'var(--green)', color: 'white', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: 16 }}>
            How Landora Works
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, lineHeight: 1.7 }}>
            Our business models, payment options, and terms — everything you need to transact safely and confidently on Nigeria's most trusted real estate platform.
          </p>
        </div>
      </section>

      {/* NAV ANCHORS */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 68, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            ['#business-models', 'Business Models'],
            ['#payments', 'Payment Methods'],
            ['#terms', 'Terms & Conditions'],
            ['#scam-protection', 'Scam Protection'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{
              padding: '16px 24px',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text)',
              borderBottom: '2px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.borderBottomColor = 'var(--green)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderBottomColor = 'transparent' }}
            >{label}</a>
          ))}
        </div>
      </div>

      {/* BUSINESS MODELS */}
      <section id="business-models" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">Our Business Models</h2>
            <p className="section-sub">Two ways Landora creates value for buyers, sellers, and agents</p>
          </div>
          <div className="grid-2">
            {MODELS.map(m => (
              <div key={m.title} style={{
                background: m.color,
                borderRadius: 20,
                padding: '36px 32px',
                border: `1.5px solid ${m.accent}30`,
              }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 36 }}>{m.icon}</span>
                </div>
                <span style={{
                  display: 'inline-block',
                  background: m.accent,
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 100,
                  letterSpacing: '0.05em',
                  marginBottom: 14,
                  textTransform: 'uppercase'
                }}>{m.tag}</span>
                <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, color: 'var(--dark)', marginBottom: 14 }}>{m.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>{m.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {m.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text)' }}>
                      <span style={{ color: m.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {m.tag === 'Direct Liquidation' && (
                  <Link to="/register" style={{
                    display: 'inline-block', marginTop: 24,
                    background: m.accent, color: 'white',
                    padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600
                  }}>Request Instant Valuation →</Link>
                )}
              </div>
            ))}
          </div>

          {/* Commission callout */}
          <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', marginTop: 28, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Commission Rate Breakdown</h4>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>Applied on successfully closed transactions facilitated through the Landora platform</p>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Residential Sale', '5%'], ['Commercial Sale', '7.5%'], ['Rentals', '10% of 1yr'], ['Land', '5–7%']].map(([type, rate]) => (
                <div key={type} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--ff-display)' }}>{rate}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section id="payments" style={{ padding: '60px 0 80px', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">Payment Methods</h2>
            <p className="section-sub">Flexible, secure options for local and international buyers</p>
          </div>
          <div className="grid-2">
            {PAYMENTS.map(p => (
              <div key={p.title} style={{
                background: 'var(--cream)',
                borderRadius: 16,
                padding: '28px',
                border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 14 }}>{p.icon}</span>
                <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 19, fontWeight: 600, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32,
            background: 'var(--gold-pale)',
            borderRadius: 14,
            padding: '22px 28px',
            border: '1.5px solid #F5C46A60',
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
            <div>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Payment Upon Inspection Reminder</p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                Many reputable sellers, resellers, and agents require buyers and renters to physically inspect the land or property at the location before authorising payment.
                Landora recommends this practice for all high-value transactions, especially for first-time buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TERMS & CONDITIONS */}
      <section id="terms" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">General Terms & Conditions</h2>
            <p className="section-sub">Please read and understand these before making any transaction on Landora</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {TERMS.map((t, i) => (
              <div key={t.title} id={t.title.includes('Scam') ? 'scam-protection' : undefined} style={{
                background: t.highlight ? '#FFF5F5' : 'white',
                borderRadius: 16,
                padding: '24px 28px',
                border: t.highlight ? '1.5px solid #FCA5A5' : '1px solid var(--border)',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 8,
                    color: t.highlight ? '#DC2626' : 'var(--dark)'
                  }}>{t.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCAM PROTECTION CALLOUT */}
      <section style={{ background: 'var(--dark)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>🛡️</p>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, marginBottom: 16 }}>
            Protect Yourself from Real Estate Scams
          </h2>
          <p style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.8, marginBottom: 32 }}>
            Scammers frequently impersonate top estate companies and agents. <strong>Always verify the agent's Landora profile</strong> — check their ratings, transaction history, agency affiliation, and photo ID before sending any money.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/listings" style={{ background: 'var(--green)', color: 'white', padding: '14px 30px', borderRadius: 9, fontWeight: 600, fontSize: 15 }}>Browse Verified Agents</Link>
            <a href="mailto:support@landora.ng" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '14px 30px', borderRadius: 9, fontWeight: 600, fontSize: 15, border: '1.5px solid rgba(255,255,255,0.25)' }}>Contact Support</a>
          </div>
          <p style={{ fontSize: 13, opacity: 0.5, marginTop: 24 }}>
            Landora will NEVER ask you to transfer money to a personal account. Always use the platform's official payment channels.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: 'var(--green)', color: 'white', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, marginBottom: 16 }}>
            Ready to Transact with Confidence?
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Browse verified listings, connect with trusted agents, and complete your transaction securely on Landora.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/listings" style={{ background: 'var(--gold)', color: 'white', padding: '14px 32px', borderRadius: 9, fontWeight: 700, fontSize: 15 }}>Browse Properties</Link>
            <Link to="/register" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '14px 32px', borderRadius: 9, fontWeight: 600, fontSize: 15, border: '1.5px solid rgba(255,255,255,0.3)' }}>Create Account</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
