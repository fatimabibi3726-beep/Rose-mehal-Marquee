import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (bookings table, joined with users/food/decorations)
const SEED_BOOKINGS = [
  { id: 1, customer: 'Ayesha Raza', event: 'Wedding Reception', date: '14 Mar 2026', type: 'Wedding', guests: 280, food: 'Royal Feast', decor: 'Classic', total: 522000, status: 'confirmed' },
  { id: 2, customer: 'Bilal Ahmed', event: 'Corporate Dinner', date: '20 Mar 2026', type: 'Corporate', guests: 90, food: 'Light Bites', decor: 'Modern', total: 64100, status: 'pending' },
  { id: 3, customer: 'Sara Khan', event: 'Mehndi Night', date: '22 Mar 2026', type: 'Mehndi', guests: 150, food: 'Classic Menu', decor: 'Mehndi Vibrant', total: 180950, status: 'confirmed' },
  { id: 4, customer: 'Imran Malik', event: 'Walima', date: '28 Mar 2026', type: 'Wedding', guests: 320, food: 'Royal Feast', decor: 'Classic', total: 577700, status: 'pending' },
  { id: 5, customer: 'Zara Iqbal', event: 'Anniversary Dinner', date: '02 Jan 2026', type: 'Other', guests: 60, food: 'Light Bites', decor: 'Modern', total: 43100, status: 'cancelled' },
]

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'cancelled']

function StatusBadge({ status }) {
  const cls = status === 'confirmed' ? 'badge-confirmed' : status === 'cancelled' ? 'badge-cancelled' : 'badge-pending'
  return <span className={`badge ${cls}`}>{status[0].toUpperCase() + status.slice(1)}</span>
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState(SEED_BOOKINGS)
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [draftStatus, setDraftStatus] = useState('')
  const [toast, setToast] = useState('')

  const filtered = useMemo(
    () => (filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  )

  const selected = bookings.find((b) => b.id === selectedId)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openDetail(b) {
    setSelectedId(b.id)
    setDraftStatus(b.status)
  }

  function saveStatus() {
    // TODO: PUT /api/bookings/:id once backend is ready
    setBookings((prev) => prev.map((b) => (b.id === selectedId ? { ...b, status: draftStatus } : b)))
    showToast('Booking updated.')
    setSelectedId(null)
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
          <span className="link active">Bookings</span>
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
            <h1>Booking Management</h1>
            <div className="subtitle">{bookings.length} total bookings</div>
          </div>
        </div>

        <div className="filter-tabs">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <table className="booking-table" style={{ marginTop: 18 }}>
          <thead>
            <tr><th>Customer</th><th>Event</th><th>Date</th><th>Guests</th><th>Total</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>{b.customer}</td>
                <td>{b.event}</td>
                <td>{b.date}</td>
                <td>{b.guests}</td>
                <td>Rs. {b.total.toLocaleString()}</td>
                <td><StatusBadge status={b.status} /></td>
                <td><button className="link-btn" onClick={() => openDetail(b)}>View / Edit</button></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="7" className="empty-row">No bookings with this status.</td></tr>
            )}
          </tbody>
        </table>

        {selected && (
          <div className="modal-backdrop" onClick={() => setSelectedId(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h2>{selected.event}</h2>
                <button className="modal-close" onClick={() => setSelectedId(null)}>×</button>
              </div>

              <div className="summary-row"><span>Customer</span><span>{selected.customer}</span></div>
              <div className="summary-row"><span>Date</span><span>{selected.date}</span></div>
              <div className="summary-row"><span>Event type</span><span>{selected.type}</span></div>
              <div className="summary-row"><span>Guests</span><span>{selected.guests}</span></div>
              <div className="summary-row"><span>Food package</span><span>{selected.food}</span></div>
              <div className="summary-row"><span>Décor theme</span><span>{selected.decor}</span></div>
              <div className="summary-row total"><span>Total cost</span><span>Rs. {selected.total.toLocaleString()}</span></div>

              <div className="field" style={{ marginTop: 18 }}>
                <label>Status</label>
                <select value={draftStatus} onChange={(e) => setDraftStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="cb-actions">
                <button className="btn-secondary" onClick={() => setSelectedId(null)}>Close</button>
                <button className="btn-new" onClick={saveStatus}>Save changes</button>
              </div>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
