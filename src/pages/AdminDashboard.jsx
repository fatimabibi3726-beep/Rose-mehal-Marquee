import { Link } from 'react-router-dom'
import './AdminDashboard.css'

const bookings = [
  { name: 'Ayesha Raza — Wedding Reception', date: '14 Mar 2026 · 280 guests', status: 'Confirmed' },
  { name: 'Bilal Ahmed — Corporate Dinner', date: '20 Mar 2026 · 90 guests', status: 'Pending' },
  { name: 'Sara Khan — Mehndi Night', date: '22 Mar 2026 · 150 guests', status: 'Confirmed' },
  { name: 'Imran Malik — Walima', date: '28 Mar 2026 · 320 guests', status: 'Pending' },
]

const alerts = [
  '6 bookings have a pending payment older than 3 days.',
  '2 users are awaiting approval to be unblocked.',
  '1 decoration item is marked unavailable but has upcoming bookings.',
]

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <div className="role-tag">ADMIN DASHBOARD</div>
        <nav>
          <span className="link active">Overview</span>
          <div className="group-label">Manage</div>
          <Link to="/admin/users" className="link">Users</Link>
          <Link to="/admin/bookings" className="link">Bookings</Link>
          <Link to="/admin/food" className="link">Food Menu</Link>
          <Link to="/admin/decorations" className="link">Decorations</Link>
          <Link to="/admin/payments" className="link">Payments</Link>
          <div className="group-label">Insights</div>
          <Link to="/admin/reports" className="link">Reports</Link>
          <Link to="/admin/notifications" className="link">Notifications</Link>
          <Link to="/admin/settings" className="link">Settings</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Overview</h1>
            <div className="subtitle">Wednesday, 16 September 2026</div>
          </div>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="label">Bookings today</div>
            <div className="value">4</div>
            <div className="delta delta-up">↑ 2 vs yesterday</div>
          </div>
          <div className="kpi-card">
            <div className="label">Revenue this month</div>
            <div className="value">PKR 2.4M</div>
            <div className="delta delta-up">↑ 12%</div>
          </div>
          <div className="kpi-card">
            <div className="label">Pending payments</div>
            <div className="value">6</div>
            <div className="delta delta-down">↑ 1 from last week</div>
          </div>
          <div className="kpi-card">
            <div className="label">Occupancy this month</div>
            <div className="value">78%</div>
            <div className="delta delta-up">↑ 5%</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="panel">
            <div className="panel-title">Recent bookings</div>
            {bookings.map((b) => (
              <div className="booking-row" key={b.name}>
                <div><div className="name">{b.name}</div><div className="date">{b.date}</div></div>
                <span className={`badge ${b.status === 'Confirmed' ? 'badge-confirmed' : 'badge-pending'}`}>{b.status}</span>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title">Needs attention</div>
            {alerts.map((a) => (
              <div className="alert-row" key={a}>
                <div className="alert-dot"></div>
                <div>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
