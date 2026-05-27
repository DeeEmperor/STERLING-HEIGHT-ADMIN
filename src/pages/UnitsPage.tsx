import { useState } from 'react'
import { Search, Building2, User } from 'lucide-react'
import { mockUnits } from '../data/mockData'

export default function UnitsPage() {
  const [search, setSearch] = useState('')
  const [blockFilter, setBlockFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const blocks = [...new Set(mockUnits.map((u) => u.block))]

  const filtered = mockUnits.filter((u) => {
    const matchesSearch =
      u.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
      (u.resident || '').toLowerCase().includes(search.toLowerCase())
    const matchesBlock = blockFilter === 'ALL' || u.block === blockFilter
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter
    return matchesSearch && matchesBlock && matchesStatus
  })

  const occupied = mockUnits.filter((u) => u.status === 'OCCUPIED').length
  const vacant = mockUnits.filter((u) => u.status === 'VACANT').length

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-black text-surface-900 tracking-tight">Unit Management</h1>
        <p className="text-surface-500 text-sm mt-1 font-medium">
          {occupied} occupied · {vacant} vacant · {mockUnits.length} total
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {blocks.map((block) => {
          const blockUnits = mockUnits.filter((u) => u.block === block)
          const blockOccupied = blockUnits.filter((u) => u.status === 'OCCUPIED').length
          return (
            <div
              key={block}
              className="bg-white rounded-2xl p-4 border border-surface-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setBlockFilter(blockFilter === block ? 'ALL' : block)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-bold text-surface-800">{block}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-surface-900">{blockOccupied}</span>
                <span className="text-xs text-surface-400">/ {blockUnits.length} units</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-surface-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
                  style={{ width: `${(blockOccupied / blockUnits.length) * 100}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by unit number or resident..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium focus-ring"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium text-surface-700 appearance-none focus-ring"
        >
          <option value="ALL">All Status</option>
          <option value="OCCUPIED">Occupied</option>
          <option value="VACANT">Vacant</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((unit) => (
          <div
            key={unit.id}
            className={`bg-white rounded-2xl border p-5 transition-all duration-200 hover:shadow-lg group ${
              unit.status === 'VACANT'
                ? 'border-dashed border-surface-200 hover:border-primary-400 bg-surface-50/50'
                : 'border-surface-100'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-surface-900 group-hover:text-primary-700 transition-colors">{unit.unitNumber}</h3>
                <p className="text-xs text-surface-400 font-medium">{unit.block}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  unit.status === 'OCCUPIED' ? 'bg-emerald-50 text-emerald-600' : 'bg-surface-100 text-surface-500'
                }`}
              >
                {unit.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                {unit.type}
              </span>
            </div>
            {unit.resident ? (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-50">
                <User className="w-3.5 h-3.5 text-surface-400" />
                <span className="text-sm font-medium text-surface-700">{unit.resident}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-50">
                <span className="text-sm text-surface-300 italic">No resident assigned</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
