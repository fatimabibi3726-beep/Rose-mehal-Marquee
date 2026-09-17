import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NOTIFICATIONS } from '../data/notifications.js'
import './Notifications.css'

export default function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS)
  const unreadCount = items.filter((n) => !n.read).length

  function markRead(id) {
    // TODO: PATCH /api/notifications/:id/read once backend is ready
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/bookings" className="link">My Bookings</Link>
          <Link to="/payments" className="link">Payments</Link>
          <span className="link active">Notifications</span>
          <Link to="/settings" className="link">Settings</Link>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>Notifications</h1>
            <div className="subtitle">{unreadCount > 0 ? `${unreadCount} unread` : 'You\'re all caught up'}</div>
          </div>
          {unreadCount > 0 && (
            <button className="btn-secondary" onClick={markAllRead}>Mark all as read</button>
          )}
        </div>

        <div className="notif-list">
          {items.map((n) => (
            <button
              key={n.id}
              className={`notif-row ${n.read ? '' : 'unread'}`}
              onClick={() => markRead(n.id)}
            >
              <span className={`dot dot-${n.type}`} />
              <div className="notif-body">
                <div className="notif-msg">{n.message}</div>
                <div className="notif-date">{n.date}</div>
              </div>
              {!n.read && <span className="notif-new">New</span>}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
