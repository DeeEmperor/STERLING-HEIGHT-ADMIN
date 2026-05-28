import { useState } from 'react'
import { Search, CheckCircle, XCircle, MoreVertical, UserPlus } from 'lucide-react'
import { mockUsers, type UserRecord } from '../data/mockData'

const roleStyle: Record<string, { bg: string; color: string }> = {
  RESIDENT: { bg: '#f5e6e8', color: '#8b3d47' },
  SECURITY: { bg: '#f1f5f9', color: '#475569' },
  ADMIN: { bg: '#2d1216', color: '#ffffff' },
}

const statusStyle: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: 'rgba(114,47,55,0.1)', color: '#8b3d47' },
  PENDING: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
  SUSPENDED: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', backgroundColor: 'white',
  border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14,
  fontWeight: 500, color: '#0f172a', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  padding: '10px 14px', backgroundColor: 'white',
  border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14,
  fontWeight: 500, color: '#334155', outline: 'none', cursor: 'pointer',
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [actionMenu, setActionMenu] = useState<string | null>(null)

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.unit.toLowerCase().includes(q)) &&
      (roleFilter === 'ALL' || u.role === roleFilter) &&
      (statusFilter === 'ALL' || u.status === statusFilter)
    )
  })

  const updateStatus = (id: string, status: UserRecord['status']) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)))
    setActionMenu(null)
  }

  const thStyle: React.CSSProperties = {
    padding: '12px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700,
    color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap',
  }

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>User Management</h1>
          <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, marginTop: 6 }}>{filtered.length} users found</p>
        </div>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', backgroundColor: '#722f37', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(114,47,55,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8b3d47')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#722f37')}
        >
          <UserPlus style={{ width: 18, height: 18 }} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text" placeholder="Search by name, email, or unit..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 36 }}
            onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={selectStyle}>
          <option value="ALL">All Roles</option>
          <option value="RESIDENT">Resident</option>
          <option value="SECURITY">Security</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafcff' }}>
                {['Name', 'Contact', 'Unit', 'Role', 'Status', 'Joined', 'Actions'].map((h, i) => (
                  <th key={h} style={{ ...thStyle, textAlign: i === 6 ? 'right' : 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const initials = user.name.split(' ').map(n => n[0]).join('')
                const rs = roleStyle[user.role]
                const ss = statusStyle[user.status]
                return (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f8fafc' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fdf5f6')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #9c4153, #5a252c)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                          {initials}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <p style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{user.email}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{user.phone}</p>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, color: '#334155', verticalAlign: 'middle' }}>{user.unit}</td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, backgroundColor: rs.bg, color: rs.color }}>{user.role}</span>
                    </td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, backgroundColor: ss.bg, color: ss.color }}>{user.status}</span>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: 13, color: '#64748b', fontWeight: 500, verticalAlign: 'middle' }}>
                      {new Date(user.joinedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'right', verticalAlign: 'middle' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                          style={{ padding: '6px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                          <MoreVertical style={{ width: 16, height: 16 }} />
                        </button>
                        {actionMenu === user.id && (
                          <div style={{ position: 'absolute', right: 0, top: 32, zIndex: 20, width: 160, backgroundColor: 'white', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '6px 0' }}>
                            {user.status === 'PENDING' && (
                              <button onClick={() => updateStatus(user.id, 'ACTIVE')}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#8b3d47', background: 'none', border: 'none', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fdf5f6')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <CheckCircle style={{ width: 15, height: 15 }} /> Approve
                              </button>
                            )}
                            {user.status !== 'SUSPENDED' && (
                              <button onClick={() => updateStatus(user.id, 'SUSPENDED')}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <XCircle style={{ width: 15, height: 15 }} /> Suspend
                              </button>
                            )}
                            {user.status === 'SUSPENDED' && (
                              <button onClick={() => updateStatus(user.id, 'ACTIVE')}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#8b3d47', background: 'none', border: 'none', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fdf5f6')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <CheckCircle style={{ width: 15, height: 15 }} /> Reactivate
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '64px 24px', textAlign: 'center', color: '#94a3b8' }}>
            <p style={{ fontSize: 17, fontWeight: 600 }}>No users found</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
