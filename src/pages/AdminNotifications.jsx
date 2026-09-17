import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (notifications table)
const SEED_SENT = [
  { id: 1, to: 'Ayesha Raza', message: 'Advance payment of Rs. 80,000 received for Wedding Reception.', date: '2 hours ago', type: 'payment' },
  { id: 2, to: 'Sara Khan', message: 'Your Mehndi Night booking on 12 Mar 2026 has been confirmed.', date: '1 day ago', type: 'booking' },
  { id: 3, to: 'All customers', message: 'Rose Mehal will be closed for maintenance on 20 Mar 2026.', date: '3 days ago', type: 'general' },
]

// TODO: replace with real user list from Supabase (users table)
const RECIPIENTS = ['All customers', 'Ayesha Raza', 'Bilal Ahmed', 'Sara Khan', 'Imran Malik']

export default function AdminNotifications() {
  const [sent, setSent] = useState(SEED_SENT)
  const [to, setTo] = useState(RECIPIENTS[0])
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function handleSend(e) {
    e.preventDefault()
    if (!message.trim()) return
    // TODO: POST /api/notifications/send once backend is ready
    setSent((prev) => [{ id: Date.now(), to, message, date: 'Just now', type: 'general' }, ...prev])
    setMessage('')
    showToast(`Notification sent to ${to}.`)
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <div className="role-tag">ADMIN DASHBOARD</div>
        <nav>
          <Link to="/admin" className="link">Overview</Link>
          <div className="group-label">Manage</div>
          <Link to="/admin/users" className="link">Users</Link>
          <Link to="/admin/bookings" className="link">Bookings</Link>
          <Link to="/admin/food" className="link">Food Menu</Link>
          <Link to="/admin/decorations" className="link">Decorations</Link>
          <Link to="/admin/payments" className="link">Payments</Link>
          <div className="group-label">Insights</div>
          <Link to="/admin/reports" className="link">Reports</Link>
          <span className="link active">Notifications</span>
          <Link to="/admin/settings" className="link">Settings</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Notifications</h1>
            <div className="subtitle">Send updates to customers and review what's already gone out.</div>
          </div>
        </div>

        <form className="cb-card" style={{ maxWidth: 640 }} onSubmit={handleSend}>
          <div className="section-title" style={{ marginTop: 0 }}>Send a manual notification</div>
          <div className="field">
            <label>Recipient</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {RECIPIENTS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Message</label>
            <textarea rows="3" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message…" required />
          </div>
          <button type="submit" className="btn-new">Send notification</button>
        </form>

        <div className="section-title">Sent notifications</div>
        <table className="booking-table">
          <thead>
            <tr><th>To</th><th>Message</th><th>Date</th></tr>
          </thead>
          <tbody>
            {sent.map((n) => (
              <tr key={n.id}>
                <td>{n.to}</td>
                <td style={{ maxWidth: 360 }}>{n.message}</td>
                <td>{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
