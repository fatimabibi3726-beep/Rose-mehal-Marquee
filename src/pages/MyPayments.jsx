import { Link } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell.jsx'
import './MyBookings.css'

// TODO: replace with real data from Supabase (payments table, filtered by logged-in user)
const MY_PAYMENTS = [
  { id: 1, event: 'Wedding Reception', method: 'jazzcash', paid: 80000, total: 522000, status: 'partial', date: '10 Mar 2026' },
  { id: 2, event: 'Mehndi Night', method: 'stripe', paid: 180950, total: 180950, status: 'paid', date: '01 Mar 2026' },
  { id: 3, event: 'Corporate Dinner', method: 'jazzcash', paid: 0, total: 64100, status: 'pending', date: '—' },
]

function StatusBadge({ status }) {
  const cls = status === 'paid' ? 'badge-confirmed' : status === 'cancelled' ? 'badge-cancelled' : 'badge-partial'
  return <span className={`badge ${cls}`}>{status[0].toUpperCase() + status.slice(1)}</span>
}

export default function MyPayments() {
  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/bookings" className="link">My Bookings</Link>
          <span className="link active">Payments</span>
          <Link to="/notifications" className="link">Notifications</Link>
          <Link to="/settings" className="link">Settings</Link>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>My Payments</h1>
            <div className="subtitle">A record of everything you've paid so far.</div>
          </div>
          <NotificationBell />
        </div>

        <table className="booking-table">
          <thead>
            <tr><th>Event</th><th>Method</th><th>Paid / Total</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {MY_PAYMENTS.map((p) => (
              <tr key={p.id}>
                <td>{p.event}</td>
                <td className="capitalize">{p.method}</td>
                <td>Rs. {p.paid.toLocaleString()} / {p.total.toLocaleString()}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
