import {
  Users,
  Home,
  AlertTriangle,
  Shield,
  Calendar,
  Download,
  Filter,
  Zap,
  UserCheck,
  Megaphone,
  UserPlus,
  ChevronRight,
  TrendingUp
} from 'lucide-react'

const stats = [
  {
    label: 'Total Active Residents',
    value: '1,284',
    Icon: Users,
    pillText: '+ 2.4%',
    pillBg: 'rgba(114,47,55,0.1)',
    pillColor: '#722f37',
    pillIcon: true,
    iconBg: '#f5e6e8',
    iconColor: '#8b3d47',
  },
  {
    label: "Today's Expected Visitors",
    value: '42',
    Icon: Home,
    pillText: '+ 12%',
    pillBg: 'rgba(114,47,55,0.1)',
    pillColor: '#722f37',
    pillIcon: true,
    iconBg: '#f5e6e8',
    iconColor: '#8b3d47',
  },
  {
    label: 'Pending Approvals / Alerts',
    value: '12',
    Icon: AlertTriangle,
    pillText: 'Requires Action',
    pillBg: 'rgba(239,68,68,0.1)',
    pillColor: '#ef4444',
    pillIcon: false,
    iconBg: 'rgba(239,68,68,0.08)',
    iconColor: '#ef4444',
  },
  {
    label: 'On-Duty Security Guards',
    value: '8',
    Icon: Shield,
    pillText: 'Shift 1 (Day)',
    pillBg: '#f1f5f9',
    pillColor: '#64748b',
    pillIcon: false,
    iconBg: '#f1f5f9',
    iconColor: '#475569',
  },
]

const activityFeed = [
  {
    id: 1,
    initials: 'JD',
    avatarBg: '#dbeafe',
    avatarColor: '#1d4ed8',
    name: 'John Doe',
    role: 'Resident • Unit 402',
    roleBg: '#f1f5f9',
    roleColor: '#64748b',
    activity: 'Approved visitor Sarah Smith',
    time: '2 mins ago',
    status: 'Completed',
    statusBg: 'rgba(114,47,55,0.1)',
    statusColor: '#8b3d47',
  },
  {
    id: 2,
    initials: 'MG',
    avatarBg: '#e2e8f0',
    avatarColor: '#475569',
    name: 'Marcus Garvey',
    role: 'Security • Gate A',
    roleBg: '#2d1216',
    roleColor: '#ffffff',
    activity: 'Logged delivery truck arrival (FedEx)',
    time: '15 mins ago',
    status: 'Logged',
    statusBg: '#e2e8f0',
    statusColor: '#475569',
  },
  {
    id: 3,
    initials: 'AL',
    avatarBg: '#f3e8ff',
    avatarColor: '#7c3aed',
    name: 'Alice Lee',
    role: 'Resident • Unit 12B',
    roleBg: '#f1f5f9',
    roleColor: '#64748b',
    activity: 'Raised maintenance ticket #4092 (Plumbing)',
    time: '1 hr ago',
    status: 'Pending',
    statusBg: '#fef2f2',
    statusColor: '#dc2626',
  },
  {
    id: 4,
    initials: 'RJ',
    avatarBg: '#e0e7ff',
    avatarColor: '#4338ca',
    name: 'Robert Jones',
    role: 'Resident • Unit 701',
    roleBg: '#f1f5f9',
    roleColor: '#64748b',
    activity: 'Booked Amenities (Tennis Court)',
    time: '3 hrs ago',
    status: 'Confirmed',
    statusBg: 'rgba(114,47,55,0.1)',
    statusColor: '#8b3d47',
  },
  {
    id: 5,
    initials: 'SYS',
    avatarBg: '#f1f5f9',
    avatarColor: '#64748b',
    name: 'System Alert',
    role: 'Automated',
    roleBg: 'rgba(239,68,68,0.1)',
    roleColor: '#dc2626',
    activity: 'Unrecognized vehicle at South Gate',
    time: '3.5 hrs ago',
    status: 'Alert',
    statusBg: '#ef4444',
    statusColor: '#ffffff',
  },
]

const quickActions = [
  { Icon: UserCheck, label: 'Pre-Approve Visitor', desc: 'Generate gate pass' },
  { Icon: Megaphone, label: 'Broadcast Announcement', desc: 'Send to all residents' },
  { Icon: UserPlus, label: 'Register New Unit', desc: 'Onboard resident/tenant' },
]

export default function OverviewPage() {
  return (
    <div style={{ maxWidth: 1360, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', lineHeight: 1.1 }}>Overview Dashboard</h1>
          <p style={{ marginTop: 6, fontSize: 15, color: '#64748b', fontWeight: 500 }}>Good morning. Here's what's happening at Sterling Height today.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
            <Calendar style={{ width: 18, height: 18 }} /> Today
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', backgroundColor: '#722f37', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(114,47,55,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8b3d47')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#722f37')}
          >
            <Download style={{ width: 18, height: 18 }} /> Export Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
        {stats.map((s, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.Icon style={{ width: 22, height: 22, color: s.iconColor }} />
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, backgroundColor: s.pillBg, color: s.pillColor, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {s.pillIcon && <TrendingUp style={{ width: 11, height: 11 }} />}
                {s.pillText}
              </span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</p>
            <h3 style={{ fontSize: 34, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }} className="max-lg:grid-cols-1">

        {/* Left: Global Activity Feed */}
        <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>Global Activity Feed</h2>
            <button style={{ padding: 6, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
              <Filter style={{ width: 18, height: 18 }} />
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {['USER', 'ACTIVITY', 'TIMESTAMP', 'STATUS'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', textAlign: h === 'STATUS' ? 'right' : 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activityFeed.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafcff')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: row.avatarBg, color: row.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {row.initials}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{row.name}</p>
                          <span style={{ display: 'inline-block', marginTop: 2, fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 600, backgroundColor: row.roleBg, color: row.roleColor }}>
                            {row.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: 14, color: '#475569', fontWeight: 500, verticalAlign: 'middle' }}>{row.activity}</td>
                    <td style={{ padding: '14px 24px', fontSize: 13, color: '#94a3b8', fontWeight: 500, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{row.time}</td>
                    <td style={{ padding: '14px 24px', verticalAlign: 'middle', textAlign: 'right' }}>
                      <span style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, backgroundColor: row.statusBg, color: row.statusColor }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <button style={{ fontSize: 13, fontWeight: 700, color: '#722f37', background: 'none', border: 'none', cursor: 'pointer' }}>View All Activity</button>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick Actions */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Zap style={{ width: 20, height: 20, color: '#722f37' }} />
              <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a' }}>Quick Actions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickActions.map(({ Icon, label, desc }, i) => (
                <button key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(114,47,55,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: 18, height: 18, color: '#8b3d47' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{label}</p>
                      <p style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8', marginTop: 1 }}>{desc}</p>
                    </div>
                  </div>
                  <ChevronRight style={{ width: 16, height: 16, color: '#cbd5e1', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div style={{ backgroundColor: '#2d1216', borderRadius: 16, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -30, top: -30, width: 130, height: 130, borderRadius: '50%', backgroundColor: 'rgba(114,47,55,0.08)', filter: 'blur(30px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Status</h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, backgroundColor: 'rgba(114,47,55,0.12)', border: '1px solid rgba(114,47,55,0.2)', fontSize: 11, fontWeight: 700, color: '#722f37' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#722f37', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Online
              </div>
            </div>
            {[
              { label: 'Gates & Scanners', value: '100% Ops', color: 'white' },
              { label: 'CCTV Network', value: '98% Ops', color: 'white' },
              { label: 'Server Load', value: 'Low (24%)', color: '#d197a1' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, marginBottom: i < 2 ? 14 : 0, position: 'relative' }}>
                <span style={{ color: '#94a3b8', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
