import { useState } from 'react'
import { Search, Building2, User } from 'lucide-react'
import { mockUnits } from '../data/mockData'

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

export default function UnitsPage() {
  const [search, setSearch] = useState('')
  const [blockFilter, setBlockFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const blocks = [...new Set(mockUnits.map(u => u.block))]

  const filtered = mockUnits.filter(u => {
    const q = search.toLowerCase()
    return (
      (u.unitNumber.toLowerCase().includes(q) || (u.resident || '').toLowerCase().includes(q)) &&
      (blockFilter === 'ALL' || u.block === blockFilter) &&
      (statusFilter === 'ALL' || u.status === statusFilter)
    )
  })

  const occupied = mockUnits.filter(u => u.status === 'OCCUPIED').length
  const vacant = mockUnits.filter(u => u.status === 'VACANT').length

  return (
    <div style={{ maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>Unit Management</h1>
        <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, marginTop: 6 }}>
          {occupied} occupied · {vacant} vacant · {mockUnits.length} total
        </p>
      </div>

      {/* Block Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {blocks.map(block => {
          const blockUnits = mockUnits.filter(u => u.block === block)
          const blockOccupied = blockUnits.filter(u => u.status === 'OCCUPIED').length
          const pct = (blockOccupied / blockUnits.length) * 100
          const isActive = blockFilter === block
          return (
            <div key={block}
              onClick={() => setBlockFilter(isActive ? 'ALL' : block)}
              style={{
                backgroundColor: 'white', borderRadius: 14, padding: 20,
                border: isActive ? '2px solid #722f37' : '1px solid #f1f5f9',
                boxShadow: isActive ? '0 4px 16px rgba(114,47,55,0.12)' : '0 4px 20px rgba(15,23,42,0.04)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Building2 style={{ width: 16, height: 16, color: '#722f37' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{block}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>{blockOccupied}</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>/ {blockUnits.length} units</span>
              </div>
              <div style={{ height: 5, borderRadius: 999, backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, width: `${pct}%`, background: 'linear-gradient(90deg, #9c4153, #5a252c)', transition: 'width 0.5s' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text" placeholder="Search by unit number or resident..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 36 }}
            onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="ALL">All Status</option>
          <option value="OCCUPIED">Occupied</option>
          <option value="VACANT">Vacant</option>
        </select>
      </div>

      {/* Unit Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.map(unit => {
          const isVacant = unit.status === 'VACANT'
          return (
            <div key={unit.id}
              style={{
                backgroundColor: isVacant ? '#fafcff' : 'white',
                borderRadius: 14, padding: 20,
                border: isVacant ? '1.5px dashed #cbd5e1' : '1px solid #f1f5f9',
                boxShadow: '0 4px 16px rgba(15,23,42,0.03)',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.03)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{unit.unitNumber}</h3>
                  <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>{unit.block}</p>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                  backgroundColor: isVacant ? '#f1f5f9' : 'rgba(114,47,55,0.1)',
                  color: isVacant ? '#64748b' : '#8b3d47',
                }}>
                  {unit.status}
                </span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, backgroundColor: '#f5e6e8', color: '#8b3d47', display: 'inline-block', marginBottom: 12 }}>
                {unit.type}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: '1px solid #f8fafc' }}>
                {unit.resident ? (
                  <>
                    <User style={{ width: 14, height: 14, color: '#94a3b8', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{unit.resident}</span>
                  </>
                ) : (
                  <span style={{ fontSize: 13, color: '#cbd5e1', fontStyle: 'italic' }}>No resident assigned</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
