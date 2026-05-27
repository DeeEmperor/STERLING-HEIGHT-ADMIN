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
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary-400 blur-[100px] animate-pulse-subtle" />
          <div className="absolute bottom-32 right-16 w-96 h-96 rounded-full bg-primary-600 blur-[120px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-8 shadow-2xl shadow-primary-900/50">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Sterling<br />Height
          </h1>
          <p className="text-xl text-primary-200 max-w-md leading-relaxed">
            Estate Management Dashboard. Monitor, manage, and secure your community — all in one place.
          </p>
          <div className="mt-12 flex gap-8">
            {[
              { value: '200+', label: 'Units' },
              { value: '1.2K', label: 'Residents' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/5">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-primary-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-50">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Sterling Height</h1>
              <p className="text-xs font-medium text-surface-500">Estate Admin</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-surface-900 mb-2 tracking-tight">Welcome back</h2>
          <p className="text-surface-500 mb-8 font-medium">Sign in to your admin account</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-surface-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sterlingheight.com"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 text-sm font-semibold focus-ring"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-surface-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 text-sm font-semibold focus-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 mt-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all duration-200 shadow-xl shadow-primary-600/20 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-primary-600/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-surface-400">
            © {new Date().getFullYear()} Sterling Height Estate. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
