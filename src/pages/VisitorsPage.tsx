import { useState } from 'react'
import { Search, Clock, ArrowDownUp } from 'lucide-react'
import { mockVisitors } from '../data/mockData'

type StatusKey = 'CHECKED_IN' | 'CHECKED_OUT' | 'EXPECTED' | 'DENIED'

const statusStyle: Record<StatusKey, { dot: string; bg: string; color: string }> = {
  CHECKED_IN: { dot: '#722f37', bg: 'rgba(114,47,55,0.1)', color: '#8b3d47' },
  CHECKED_OUT: { dot: '#cbd5e1', bg: '#f1f5f9', color: '#64748b' },
  EXPECTED: { dot: '#f59e0b', bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
  DENIED: { dot: '#ef4444', bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

const filterTabs: { key: string; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'CHECKED_IN', label: 'On Premises' },
  { key: 'EXPECTED', label: 'Expected' },
  { key: 'CHECKED_OUT', label: 'Left' },
  { key: 'DENIED', label: 'Denied' },
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px 10px 36px', backgroundColor: 'white',
  border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14,
  fontWeight: 500, color: '#0f172a', outline: 'none',
}

export default function VisitorsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = mockVisitors.filter(v => {
    const q = search.toLowerCase()
    return (
      (v.name.toLowerCase().includes(q) || v.hostName.toLowerCase().includes(q) || v.hostUnit.toLowerCase().includes(q)) &&
      (statusFilter === 'ALL' || v.status === statusFilter)
    )
  })

  const formatTime = (iso: string) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
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
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>Visitor Logs</h1>
          <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock style={{ width: 14, height: 14 }} />
            Today — {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        {/* Status filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filterTabs.map(({ key, label }) => {
            const isActive = statusFilter === key
            return (
              <button key={key} onClick={() => setStatusFilter(key)}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                  border: isActive ? 'none' : '1px solid #e2e8f0',
                  backgroundColor: isActive ? '#2d1216' : 'white',
                  color: isActive ? 'white' : '#475569',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: isActive ? '0 4px 12px rgba(15,23,42,0.2)' : 'none',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input
          type="text" placeholder="Search by visitor name, host, or unit..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafcff' }}>
                <th style={thStyle}>Visitor</th>
                <th style={thStyle}>Purpose</th>
                <th style={thStyle}>Host</th>
                <th style={thStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowDownUp style={{ width: 12, height: 12 }} /> Check In
                  </span>
                </th>
                <th style={thStyle}>Check Out</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => {
                const cfg = statusStyle[v.status as StatusKey]
                return (
                  <tr key={v.id} style={{ borderBottom: '1px solid #f8fafc' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fdf5f6')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cfg.dot, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{v.name}</p>
                          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{v.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: 14, color: '#475569', fontWeight: 500, verticalAlign: 'middle' }}>{v.purpose}</td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>{v.hostName}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{v.hostUnit}</p>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: 13, fontFamily: 'monospace', color: '#64748b', verticalAlign: 'middle' }}>{formatTime(v.checkIn)}</td>
                    <td style={{ padding: '14px 24px', fontSize: 13, fontFamily: 'monospace', color: '#64748b', verticalAlign: 'middle' }}>{formatTime(v.checkOut || '')}</td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <span style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, backgroundColor: cfg.bg, color: cfg.color }}>
                        {v.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '64px 24px', textAlign: 'center', color: '#94a3b8' }}>
            <p style={{ fontSize: 17, fontWeight: 600 }}>No visitor records found</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
