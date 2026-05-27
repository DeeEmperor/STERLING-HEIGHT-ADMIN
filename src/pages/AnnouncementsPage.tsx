import { useState } from 'react'
import { Plus, Send, X, AlertTriangle, Info, Bell } from 'lucide-react'
import { mockAnnouncements, type Announcement } from '../data/mockData'

const priorityConfig: Record<string, { icon: typeof Info; color: string; badge: string }> = {
  LOW: { icon: Info, color: 'text-surface-500', badge: 'bg-surface-100 text-surface-600 border border-surface-200' },
  NORMAL: { icon: Bell, color: 'text-primary-600', badge: 'bg-primary-50 text-primary-700 border border-primary-100' },
  URGENT: { icon: AlertTriangle, color: 'text-danger', badge: 'bg-danger/10 text-danger border border-danger/20' },
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState<'LOW' | 'NORMAL' | 'URGENT'>('NORMAL')

  const handleCreate = () => {
    if (!title.trim() || !body.trim()) return
    const newAnnouncement: Announcement = {
      id: String(Date.now()),
      title: title.trim(),
      body: body.trim(),
      priority,
      createdAt: new Date().toISOString(),
      author: 'Estate Admin',
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setTitle('')
    setBody('')
    setPriority('NORMAL')
    setShowForm(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-surface-900 tracking-tight">Announcements</h1>
          <p className="text-surface-500 text-sm mt-1 font-medium">{announcements.length} announcements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-surface-100 p-6 space-y-4 animate-fade-in shadow-lg">
          <h3 className="font-bold text-surface-900">Create Announcement</h3>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title..."
              className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-sm font-medium focus-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-sm font-medium focus-ring resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-surface-700 mb-1.5">Priority</label>
            <div className="flex gap-2">
              {(['LOW', 'NORMAL', 'URGENT'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    priority === p
                      ? p === 'URGENT'
                        ? 'bg-danger text-white shadow-sm ring-2 ring-danger/20 ring-offset-1'
                        : p === 'NORMAL'
                        ? 'bg-primary-900 text-white shadow-sm ring-2 ring-primary-900/20 ring-offset-1'
                        : 'bg-surface-800 text-white shadow-sm ring-2 ring-surface-800/20 ring-offset-1'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !body.trim()}
            className="flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <Send className="w-4 h-4" />
            Broadcast Announcement
          </button>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((a) => {
          const cfg = priorityConfig[a.priority]
          const Icon = cfg.icon
          return (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-surface-100 p-6 hover:shadow-lg hover:border-surface-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 ${cfg.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-surface-900 group-hover:text-primary-800 transition-colors">{a.title}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
                      {a.priority}
                    </span>
                  </div>
                  <p className="text-sm text-surface-600 leading-relaxed font-medium">{a.body}</p>
                  <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                    <span>{a.author}</span>
                    <span>·</span>
                    <span>
                      {new Date(a.createdAt).toLocaleDateString('en-NG', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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
