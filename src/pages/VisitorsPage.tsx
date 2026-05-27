import { useState } from 'react'
import { Search, Clock, ArrowDownUp } from 'lucide-react'
import { mockVisitors } from '../data/mockData'

const statusConfig: Record<string, { dot: string; badge: string }> = {
  CHECKED_IN: { dot: 'bg-success', badge: 'bg-success/10 text-success border border-success/20' },
  CHECKED_OUT: { dot: 'bg-surface-300', badge: 'bg-surface-100 text-surface-500 border border-surface-200' },
  EXPECTED: { dot: 'bg-warning', badge: 'bg-warning/10 text-warning border border-warning/20' },
  DENIED: { dot: 'bg-danger', badge: 'bg-danger/10 text-danger border border-danger/20' },
}

export default function VisitorsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = mockVisitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.hostName.toLowerCase().includes(search.toLowerCase()) ||
      v.hostUnit.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatTime = (iso: string) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 tracking-tight">Visitor Logs</h1>
          <p className="text-surface-500 text-sm mt-1 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            Today — {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          {Object.entries({ ALL: 'All', CHECKED_IN: 'On Premises', EXPECTED: 'Expected', CHECKED_OUT: 'Left', DENIED: 'Denied' }).map(
            ([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  statusFilter === key
                    ? 'bg-primary-950 text-white shadow-md'
                    : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200 hover:border-surface-300'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          placeholder="Search by visitor name, host, or unit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium focus-ring"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50/70 border-b border-surface-100">
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Visitor</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Purpose</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Host</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <ArrowDownUp className="w-3 h-3" /> Check In
                  </span>
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Check Out</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.map((v) => {
                const cfg = statusConfig[v.status]
                return (
                  <tr key={v.id} className="hover:bg-primary-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                        <div>
                          <p className="font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{v.name}</p>
                          <p className="text-xs text-surface-500 font-medium">{v.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-surface-700 font-medium">{v.purpose}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-surface-700">{v.hostName}</p>
                      <p className="text-xs text-surface-400">{v.hostUnit}</p>
                    </td>
                    <td className="px-6 py-4 text-surface-600 font-mono text-xs">{formatTime(v.checkIn)}</td>
                    <td className="px-6 py-4 text-surface-600 font-mono text-xs">{formatTime(v.checkOut || '')}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.badge}`}>
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
          <div className="py-16 text-center text-surface-400">
            <p className="text-lg font-semibold">No visitor records found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
