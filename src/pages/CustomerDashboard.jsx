import { Link } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell.jsx'
import './CustomerDashboard.css'

const recentBookings = [
  { event: 'Wedding Reception', date: '14 Mar 2026', guests: 280, status: 'Confirmed', payment: 'Partial' },
  { event: 'Mehndi Night', date: '12 Mar 2026', guests: 150, status: 'Confirmed', payment: 'Paid' },
  { event: 'Corporate Dinner', date: '02 Jan 2026', guests: 90, status: 'Confirmed', payment: 'Paid' },
]

function StatusBadge({ type, label }) {
  const cls = type === 'paid' || type === 'confirmed' ? 'badge-confirmed' : 'badge-partial'
  return <span className={`badge ${cls}`}>{label}</span>
}

export default function CustomerDashboard() {
  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <span className="link active">Dashboard</span>
          <Link to="/bookings" className="link">My Bookings</Link>
          <Link to="/payments" className="link">Payments</Link>
          <Link to="/notifications" className="link">Notifications</Link>
          <Link to="/settings" className="link">Settings</Link>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>Welcome back, Ayesha</h1>
            <div className="subtitle">Here's what's happening with your booking.</div>
          </div>
          <div className="topbar-actions">
            <Link to="/bookings/new" className="btn-new">+ New booking</Link>
            <NotificationBell />
          </div>
        </div>

        <div className="booking-card">
          <div className="info">
            <span className="tag">Upcoming event</span>
            <h2>Wedding Reception</h2>
            <div className="meta">Saturday, 14 March 2026 · 280 guests</div>
          </div>
          <div className="status">
            <StatusBadge type="partial" label="Partially paid" />
            <div className="amount">PKR 80,000 <span className="of">/ 200,000</span></div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">Total bookings</div>
            <div className="value">3</div>
          </div>
          <div className="stat-card">
            <div className="label">Payment status</div>
            <div className="value" style={{ color: 'var(--amber)' }}>Partial</div>
          </div>
          <div className="stat-card">
            <div className="label">Unread notifications</div>
            <div className="value">2</div>
          </div>
        </div>

        <div className="section-title">Recent bookings</div>
        <table className="booking-table">
          <thead>
            <tr><th>Event</th><th>Date</th><th>Guests</th><th>Status</th><th>Payment</th></tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.event + b.date}>
                <td>{b.event}</td>
                <td>{b.date}</td>
                <td>{b.guests}</td>
                <td><StatusBadge type="confirmed" label={b.status} /></td>
                <td><StatusBadge type={b.payment.toLowerCase()} label={b.payment} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
