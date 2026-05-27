import {
  Users,
  Building2,
  UserCheck,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  TrendingUp,
  ChevronDown,
  ArrowRight,
  Edit2
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { mockUsers, mockUnits, mockVisitors, mockAnnouncements } from '../data/mockData'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Total Residents',
    value: mockUsers.filter((u) => u.role === 'RESIDENT').length,
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
    change: '+3 this month',
  },
  {
    label: 'Occupied Units',
    value: `${mockUnits.filter((u) => u.status === 'OCCUPIED').length}/${mockUnits.length}`,
    icon: Building2,
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
    change: `${mockUnits.filter((u) => u.status === 'VACANT').length} vacant`,
  },
  {
    label: 'Visitors Today',
    value: mockVisitors.length,
    icon: UserCheck,
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
    change: '2 currently on premises',
  },
  {
    label: 'Pending Approvals',
    value: mockUsers.filter((u) => u.status === 'PENDING').length,
    icon: AlertTriangle,
    color: 'from-warning to-amber-600',
    bgLight: 'bg-white/20',
    textColor: 'text-white',
    change: 'Requires action',
    isAlert: true
  },
]

const visitorData = [
  { name: 'Mon', visitors: 12 },
  { name: 'Tue', visitors: 19 },
  { name: 'Wed', visitors: 15 },
  { name: 'Thu', visitors: 22 },
  { name: 'Fri', visitors: 30 },
  { name: 'Sat', visitors: 45 },
  { name: 'Sun', visitors: 38 },
]

const occupancyData = [
  { name: 'Occupied', value: mockUnits.filter((u) => u.status === 'OCCUPIED').length, color: '#722f37' },
  { name: 'Vacant', value: mockUnits.filter((u) => u.status === 'VACANT').length, color: '#e5e7eb' },
]

export default function OverviewPage() {
  const recentVisitors = mockVisitors.slice(0, 5)
  const recentAnnouncements = mockAnnouncements.slice(0, 3)
  const occupancyPercentage = ((mockUnits.filter((u) => u.status === 'OCCUPIED').length / mockUnits.length) * 100).toFixed(0)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-black text-surface-900 tracking-tight">Good afternoon 👋</h1>
          <p className="text-surface-500 mt-1 font-medium">Here's what's happening in Sterling Height today.</p>
        </div>
        <div className="flex gap-2 relative group">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-surface-200 rounded-xl text-sm font-bold text-surface-700 hover:bg-surface-50 transition-colors shadow-sm">
            Download Month Report
            <ChevronDown className="w-4 h-4 text-surface-400" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group
              ${stat.isAlert 
                ? 'bg-gradient-to-br from-danger to-red-700 border-danger/20 text-white shadow-danger/20' 
                : 'bg-white border-surface-100 hover:shadow-surface-200/50'
              }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bgLight} flex items-center justify-center shadow-inner`}>
                <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
              </div>
              <ArrowUpRight className={`w-6 h-6 transition-colors ${stat.isAlert ? 'text-white/50 group-hover:text-white' : 'text-surface-300 group-hover:text-surface-500'}`} />
            </div>
            <p className={`text-4xl font-black tracking-tight ${stat.isAlert ? 'text-white' : 'text-surface-900'}`}>{stat.value}</p>
            <p className={`text-sm font-bold mt-2 ${stat.isAlert ? 'text-white/80' : 'text-surface-500'}`}>{stat.label}</p>
            <div className="flex items-center gap-1.5 mt-4 bg-white/10 w-fit px-2.5 py-1 rounded-lg">
              <TrendingUp className={`w-4 h-4 ${stat.isAlert ? 'text-white' : 'text-success'}`} />
              <span className={`text-xs font-bold ${stat.isAlert ? 'text-white' : 'text-surface-500'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-100 p-8 shadow-sm">
          <h3 className="text-lg font-black text-surface-900 mb-8 tracking-tight">Visitor Trends (Last 7 Days)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#722f37" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#722f37" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }} width={40} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                  itemStyle={{ color: '#722f37', fontWeight: '900', fontSize: '16px' }}
                  labelStyle={{ color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#722f37" strokeWidth={4} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-surface-100 p-8 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-surface-900 mb-6 tracking-tight">Unit Occupancy</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'black', color: '#111827' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label for Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-surface-900 tracking-tighter">{occupancyPercentage}%</span>
              <span className="text-xs font-bold text-surface-400 uppercase tracking-widest mt-1">Occupied</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {occupancyData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-bold text-surface-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Visitors */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-100 overflow-hidden shadow-sm flex flex-col">
          <div className="px-8 py-6 border-b border-surface-100 flex items-center justify-between bg-surface-50/50">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-black text-surface-900 tracking-tight">Recent Visitor Activity</h3>
              <span className="text-xs text-primary-600 font-bold flex items-center gap-1.5 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                <Clock className="w-3.5 h-3.5" /> Live
              </span>
            </div>
            <Link to="/visitors" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-surface-100 flex-1">
            {recentVisitors.map((v) => (
              <div key={v.id} className="px-8 py-5 flex items-center gap-5 hover:bg-surface-50/80 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-base font-black text-surface-900 truncate group-hover:text-primary-700 transition-colors">{v.name}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                      v.status === 'CHECKED_IN' ? 'bg-success/10 text-success border-success/20' :
                      v.status === 'CHECKED_OUT' ? 'bg-surface-100 text-surface-500 border-surface-200' :
                      v.status === 'DENIED' ? 'bg-danger/10 text-danger border-danger/20' :
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {v.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-surface-500 flex items-center gap-2">
                    <span className="text-surface-700 font-semibold">{v.purpose}</span> 
                    <span className="text-surface-300">•</span> 
                    Visiting: <span className="font-semibold">{v.hostName}</span> ({v.hostUnit})
                  </p>
                </div>
                
                {/* Actions for specific statuses */}
                {(v.status === 'DENIED' || v.status === 'EXPECTED') && (
                  <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm
                    ${v.status === 'DENIED' 
                      ? 'bg-danger/10 text-danger hover:bg-danger hover:text-white border border-danger/20' 
                      : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white border border-primary-100'
                    }`}>
                    {v.status === 'DENIED' ? 'Review Case' : 'Check In'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden shadow-sm flex flex-col">
          <div className="px-8 py-6 border-b border-surface-100 bg-surface-50/50 flex items-center justify-between">
            <h3 className="text-lg font-black text-surface-900 tracking-tight">Announcements</h3>
            <Link to="/announcements" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-surface-100 flex-1">
            {recentAnnouncements.map((a) => (
              <div key={a.id} className="p-8 hover:bg-surface-50/80 transition-colors group flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    {a.priority === 'URGENT' && (
                      <span className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-sm shadow-danger/50" />
                    )}
                    <h4 className="text-base font-black text-surface-900 group-hover:text-primary-700 transition-colors leading-tight">{a.title}</h4>
                  </div>
                  <button className="p-1.5 text-surface-300 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-surface-600 line-clamp-2 leading-relaxed font-medium mb-4">{a.body}</p>
                <div className="mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-surface-400 bg-surface-100 px-2.5 py-1 rounded-md">
                    {new Date(a.createdAt).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-primary-600">{a.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

