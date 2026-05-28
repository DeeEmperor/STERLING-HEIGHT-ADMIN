import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Megaphone,
  LogOut,
  Menu,
  X,
  Shield,
  Search,
  Bell
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/units', label: 'Units', icon: Building2 },
  { path: '/visitors', label: 'Visitors', icon: UserCheck },
  { path: '/announcements', label: 'Announcements', icon: Megaphone },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - always in the flex flow on desktop */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#2d1216',
          color: 'white',
          height: '100vh',
          position: 'relative',
          zIndex: 10,
          flexShrink: 0,
        }}
        className={`
          max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px 24px 20px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#461c22', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
            <Shield style={{ width: 20, height: 20, color: '#722f37' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Sterling Height</h1>
            <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Estate Management</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ marginLeft: 'auto', padding: 4, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
            className="lg:hidden"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* New Property Button */}
        <div style={{ padding: '0 16px 16px' }}>
          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#722f37', color: 'white', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(114,47,55,0.25)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8b3d47')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#722f37')}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Property
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', paddingTop: 8, paddingBottom: 8 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 24px',
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? '#722f37' : '#94a3b8',
                backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderLeft: isActive ? '3px solid #722f37' : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              })}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                if (!el.style.borderLeftColor.includes('10b981')) {
                  el.style.backgroundColor = 'rgba(255,255,255,0.04)'
                  el.style.color = '#e2e8f0'
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                if (!el.style.borderLeftColor.includes('10b981')) {
                  el.style.backgroundColor = 'transparent'
                  el.style.color = '#94a3b8'
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon style={{ width: 20, height: 20, flexShrink: 0, color: isActive ? '#722f37' : '#64748b' }} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            <LogOut style={{ width: 20, height: 20 }} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Header */}
        <header style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', flexShrink: 0, zIndex: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ padding: 8, borderRadius: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              className="lg:hidden"
            >
              <Menu style={{ width: 20, height: 20 }} />
            </button>
            <div style={{ position: 'relative', maxWidth: 400, width: '100%' }} className="hidden sm:block">
              <Search style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search residents, properties..."
                style={{ width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, fontWeight: 500, outline: 'none', color: '#0f172a' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}>
              <Bell style={{ width: 20, height: 20 }} />
              <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444', border: '2px solid white' }} />
            </button>
            <div style={{ width: 1, height: 24, backgroundColor: '#e2e8f0' }} className="hidden sm:block" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#722f37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                AP
              </div>
              <div className="hidden sm:block">
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>Admin Profile</p>
                <p style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          <div className="animate-fade-in" style={{ padding: '40px 40px', maxWidth: 1400, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
