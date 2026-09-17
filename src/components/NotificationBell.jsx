import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NOTIFICATIONS } from '../data/notifications.js'
import './NotificationBell.css'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(NOTIFICATIONS)
  const unreadCount = items.filter((n) => !n.read).length

  function markRead(id) {
    // TODO: PATCH /api/notifications/:id/read once backend is ready
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="bell-wrap">
      <button className="bell-btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a6 6 0 0 0-6 6v3.2c0 .6-.2 1.2-.6 1.7L4 16.5c-.6.8 0 2 1 2h14c1 0 1.6-1.2 1-2l-1.4-2.6c-.4-.5-.6-1.1-.6-1.7V9a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M9.5 21a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {open && (
        <>
          <div className="bell-backdrop" onClick={() => setOpen(false)} />
          <div className="bell-dropdown">
            <div className="bell-header">Notifications</div>
            {items.slice(0, 4).map((n) => (
              <button
                key={n.id}
                className={`bell-item ${n.read ? '' : 'unread'}`}
                onClick={() => markRead(n.id)}
              >
                <span className={`dot dot-${n.type}`} />
                <div>
                  <div className="bell-msg">{n.message}</div>
                  <div className="bell-date">{n.date}</div>
                </div>
              </button>
            ))}
            <Link to="/notifications" className="bell-viewall" onClick={() => setOpen(false)}>
              View all notifications
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
