import { useState } from 'react'
import { Shield, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    try { await login(email, password) }
    catch { setError('Invalid credentials. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left panel — branding */}
      <div style={{
        width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '64px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #2d1216 0%, #461c22 45%, #5a252c 100%)',
      }} className="hidden lg:flex">
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: 80, left: 80, width: 280, height: 280, borderRadius: '50%', backgroundColor: 'rgba(196,103,118,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 120, right: 60, width: 360, height: 360, borderRadius: '50%', backgroundColor: 'rgba(90,37,44,0.4)', filter: 'blur(100px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo mark */}
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #9c4153, #5a252c)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <Shield style={{ width: 32, height: 32, color: 'white' }} />
          </div>

          <h1 style={{ fontSize: 52, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            Sterling<br />Height
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 360 }}>
            Estate Management Dashboard. Monitor, manage, and secure your community — all in one place.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
            {[
              { value: '200+', label: 'Units' },
              { value: '1.2K', label: 'Residents' },
              { value: '99.9%', label: 'Uptime' },
            ].map(stat => (
              <div key={stat.label} style={{ padding: '16px 24px', borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: 'white', lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginTop: 4 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: '#f8fafc' }}>
        <div style={{ width: '100%', maxWidth: 420 }} className="animate-scale-in">
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }} className="lg:hidden">
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #9c4153, #5a252c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Sterling Height</h1>
              <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Estate Admin</p>
            </div>
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 8 }}>Welcome back</h2>
          <p style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 36 }}>Sign in to your admin account</p>

          {error && (
            <div style={{ marginBottom: 24, padding: '12px 16px', borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#dc2626', flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Email */}
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                Email Address
              </label>
              <input
                id="email" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sterlingheight.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0', backgroundColor: 'white', fontSize: 14, fontWeight: 500, color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.12)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password" type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '13px 48px 13px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0', backgroundColor: 'white', fontSize: 14, fontWeight: 500, color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.12)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '14px 24px', marginTop: 4, borderRadius: 10,
                background: loading ? '#8b3d47' : 'linear-gradient(135deg, #8b3d47, #5a252c)',
                color: 'white', fontSize: 15, fontWeight: 700, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                boxShadow: '0 8px 24px rgba(114,47,55,0.35)', transition: 'all 0.2s',
                width: '100%',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 12px 28px rgba(114,47,55,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(114,47,55,0.35)' }}
            >
              {loading ? (
                <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              ) : (
                <>Sign In <ArrowRight style={{ width: 18, height: 18 }} /></>
              )}
            </button>
          </form>

          <p style={{ marginTop: 36, textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>
            © {new Date().getFullYear()} Sterling Height Estate. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .hidden { display: none !important; } }
        @media (min-width: 1024px) { .lg\\:hidden { display: none !important; } }
      `}</style>
    </div>
  )
}
