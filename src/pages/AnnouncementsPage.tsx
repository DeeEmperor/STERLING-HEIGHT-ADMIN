import { useState } from 'react'
import { Plus, Send, X, AlertTriangle, Info, Bell } from 'lucide-react'
import { mockAnnouncements, type Announcement } from '../data/mockData'

type Priority = 'LOW' | 'NORMAL' | 'URGENT'

const priorityConfig: Record<Priority, { Icon: typeof Info; iconColor: string; bg: string; color: string }> = {
  LOW: { Icon: Info, iconColor: '#64748b', bg: '#f1f5f9', color: '#475569' },
  NORMAL: { Icon: Bell, iconColor: '#8b3d47', bg: '#f5e6e8', color: '#8b3d47' },
  URGENT: { Icon: AlertTriangle, iconColor: '#dc2626', bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', backgroundColor: 'white',
  border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14,
  fontWeight: 500, color: '#0f172a', outline: 'none',
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState<Priority>('NORMAL')

  const handleCreate = () => {
    if (!title.trim() || !body.trim()) return
    setAnnouncements([{
      id: String(Date.now()), title: title.trim(), body: body.trim(),
      priority, createdAt: new Date().toISOString(), author: 'Estate Admin',
    }, ...announcements])
    setTitle(''); setBody(''); setPriority('NORMAL'); setShowForm(false)
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>Announcements</h1>
          <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, marginTop: 6 }}>{announcements.length} announcements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', backgroundColor: showForm ? '#ef4444' : '#722f37', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `0 4px 12px ${showForm ? 'rgba(239,68,68,0.3)' : 'rgba(114,47,55,0.3)'}` }}
        >
          {showForm ? <X style={{ width: 18, height: 18 }} /> : <Plus style={{ width: 18, height: 18 }} />}
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #f1f5f9', padding: 28, marginBottom: 24, boxShadow: '0 8px 30px rgba(15,23,42,0.08)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>Create Announcement</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Title</label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Announcement title..." style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Message</label>
            <textarea
              value={body} onChange={e => setBody(e.target.value)}
              placeholder="Write your announcement..." rows={4}
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
              onFocus={e => { e.currentTarget.style.borderColor = '#722f37'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(114,47,55,0.1)' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Priority</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['LOW', 'NORMAL', 'URGENT'] as Priority[]).map(p => {
                const isSelected = priority === p
                const colors = { LOW: { bg: '#334155', shadow: '#334155' }, NORMAL: '#8b3d47', URGENT: '#dc2626' }
                const color = typeof colors[p] === 'string' ? colors[p] as string : '#334155'
                return (
                  <button key={p} onClick={() => setPriority(p)}
                    style={{
                      padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                      border: isSelected ? 'none' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? color : 'white',
                      color: isSelected ? 'white' : '#475569',
                      cursor: 'pointer', transition: 'all 0.15s',
                      boxShadow: isSelected ? `0 4px 10px ${color}40` : 'none',
                    }}
                  >
                    {p}
                  </button>
                )
              })}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !body.trim()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '13px 24px', backgroundColor: '#722f37',
              color: 'white', borderRadius: 10, fontSize: 15, fontWeight: 700,
              border: 'none', cursor: title.trim() && body.trim() ? 'pointer' : 'not-allowed',
              opacity: title.trim() && body.trim() ? 1 : 0.5,
              boxShadow: '0 4px 12px rgba(114,47,55,0.3)',
            }}
          >
            <Send style={{ width: 18, height: 18 }} /> Broadcast Announcement
          </button>
        </div>
      )}

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {announcements.map(a => {
          const cfg = priorityConfig[a.priority as Priority]
          const Icon = cfg.Icon
          return (
            <div key={a.id}
              style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #f1f5f9', padding: 24, boxShadow: '0 4px 20px rgba(15,23,42,0.04)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(15,23,42,0.08)'; e.currentTarget.style.borderColor = '#e2e8f0' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,23,42,0.04)'; e.currentTarget.style.borderColor = '#f1f5f9' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  <Icon style={{ width: 20, height: 20, color: cfg.iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{a.title}</h3>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, backgroundColor: cfg.bg, color: cfg.color }}>
                      {a.priority}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, fontWeight: 500 }}>{a.body}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    <span>{a.author}</span>
                    <span>·</span>
                    <span>
                      {new Date(a.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
