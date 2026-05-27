import { useState } from 'react'
import { Search, Filter, CheckCircle, XCircle, MoreVertical, UserPlus } from 'lucide-react'
import { mockUsers, type UserRecord } from '../data/mockData'

const roleColors: Record<string, string> = {
  RESIDENT: 'bg-primary-50 text-primary-700 border border-primary-100',
  SECURITY: 'bg-surface-100 text-surface-700 border border-surface-200',
  ADMIN: 'bg-primary-950 text-white shadow-sm',
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success border border-success/20',
  PENDING: 'bg-warning/10 text-warning border border-warning/20',
  SUSPENDED: 'bg-danger/10 text-danger border border-danger/20',
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [actionMenu, setActionMenu] = useState<string | null>(null)

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.unit.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const updateStatus = (id: string, status: UserRecord['status']) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)))
    setActionMenu(null)
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 tracking-tight">User Management</h1>
          <p className="text-surface-500 text-sm mt-1 font-medium">{filtered.length} users found</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5 active:translate-y-0">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by name, email, or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium focus-ring"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium text-surface-700 appearance-none focus-ring"
            >
              <option value="ALL">All Roles</option>
              <option value="RESIDENT">Resident</option>
              <option value="SECURITY">Security</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm font-medium text-surface-700 appearance-none focus-ring"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50/70 border-b border-surface-100">
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Unit</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-3.5 text-xs font-bold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-primary-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-surface-700">{user.email}</p>
                    <p className="text-xs text-surface-400">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-surface-700">{user.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-surface-500 font-medium">
                    {new Date(user.joinedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                        className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-surface-400" />
                      </button>
                      {actionMenu === user.id && (
                        <div className="absolute right-0 top-8 z-20 w-44 bg-white rounded-xl border border-surface-200 shadow-xl py-1.5 animate-fade-in">
                          {user.status === 'PENDING' && (
                            <button onClick={() => updateStatus(user.id, 'ACTIVE')} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <CheckCircle className="w-4 h-4" /> Approve
                            </button>
                          )}
                          {user.status !== 'SUSPENDED' && (
                            <button onClick={() => updateStatus(user.id, 'SUSPENDED')} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <XCircle className="w-4 h-4" /> Suspend
                            </button>
                          )}
                          {user.status === 'SUSPENDED' && (
                            <button onClick={() => updateStatus(user.id, 'ACTIVE')} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <CheckCircle className="w-4 h-4" /> Reactivate
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-surface-400">
            <p className="text-lg font-semibold">No users found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
