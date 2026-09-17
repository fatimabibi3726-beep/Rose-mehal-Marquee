import { useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell.jsx'
import './MyBookings.css'

// TODO: replace with real data from Supabase (bookings table, filtered by logged-in user)
const BOOKINGS = [
  {
    id: 1,
    event: 'Wedding Reception',
    date: '14 Mar 2026',
    type: 'Wedding',
    guests: 280,
    food: 'Royal Feast',
    decor: 'Classic',
    total: 522000,
    status: 'confirmed',
    payment: 'partial',
    paid: 80000,
  },
  {
    id: 2,
    event: 'Mehndi Night',
    date: '12 Mar 2026',
    type: 'Mehndi',
    guests: 150,
    food: 'Classic Menu',
    decor: 'Mehndi Vibrant',
    total: 180950,
    status: 'confirmed',
    payment: 'paid',
    paid: 180950,
  },
  {
    id: 3,
    event: 'Corporate Dinner',
    date: '02 Jan 2026',
    type: 'Corporate',
    guests: 90,
    food: 'Light Bites',
    decor: 'Modern',
    total: 64100,
    status: 'cancelled',
    payment: 'paid',
    paid: 64100,
  },
]

function StatusBadge({ type, label }) {
  const cls = type === 'paid' || type === 'confirmed' ? 'badge-confirmed'
    : type === 'cancelled' ? 'badge-cancelled'
    : 'badge-partial'
  return <span className={`badge ${cls}`}>{label}</span>
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(BOOKINGS)
  const [selectedId, setSelectedId] = useState(null)
  const [cancelId, setCancelId] = useState(null)

  const selected = bookings.find((b) => b.id === selectedId)

  function confirmCancel() {
    // TODO: PATCH /api/bookings/:id/cancel once backend is ready
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelId ? { ...b, status: 'cancelled' } : b))
    )
    setCancelId(null)
    setSelectedId(null)
  }

  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/bookings/new" className="link">New Booking</Link>
          <span className="link active">My Bookings</span>
          <Link to="/payments" className="link">Payments</Link>
          <Link to="/notifications" className="link">Notifications</Link>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>My Bookings</h1>
            <div className="subtitle">All your events in one place — tap a row for details.</div>
          </div>
          <div className="topbar-actions">
            <Link to="/bookings/new" className="btn-new">+ New booking</Link>
            <NotificationBell />
          </div>
        </div>

        <table className="booking-table">
          <thead>
            <tr><th>Event</th><th>Date</th><th>Guests</th><th>Total</th><th>Status</th><th>Payment</th></tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="clickable-row"
                onClick={() => setSelectedId(b.id)}
              >
                <td>{b.event}</td>
                <td>{b.date}</td>
                <td>{b.guests}</td>
                <td>Rs. {b.total.toLocaleString()}</td>
                <td><StatusBadge type={b.status} label={b.status[0].toUpperCase() + b.status.slice(1)} /></td>
                <td><StatusBadge type={b.payment} label={b.payment[0].toUpperCase() + b.payment.slice(1)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {selected && (
          <div className="modal-backdrop" onClick={() => setSelectedId(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h2>{selected.event}</h2>
                <button className="modal-close" onClick={() => setSelectedId(null)}>×</button>
              </div>

              <div className="summary-row"><span>Date</span><span>{selected.date}</span></div>
              <div className="summary-row"><span>Event type</span><span>{selected.type}</span></div>
              <div className="summary-row"><span>Guests</span><span>{selected.guests}</span></div>
              <div className="summary-row"><span>Food package</span><span>{selected.food}</span></div>
              <div className="summary-row"><span>Décor theme</span><span>{selected.decor}</span></div>
              <div className="summary-row"><span>Status</span><StatusBadge type={selected.status} label={selected.status[0].toUpperCase() + selected.status.slice(1)} /></div>
              <div className="summary-row"><span>Amount paid</span><span>Rs. {selected.paid.toLocaleString()}</span></div>
              <div className="summary-row total"><span>Total cost</span><span>Rs. {selected.total.toLocaleString()}</span></div>

              {selected.status !== 'cancelled' && (
                <button
                  className="btn-danger"
                  onClick={() => setCancelId(selected.id)}
                >
                  Cancel this booking
                </button>
              )}
            </div>
          </div>
        )}

        {cancelId && (
          <div className="modal-backdrop" onClick={() => setCancelId(null)}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Cancel this booking?</h2>
              <p>This can't be undone. Your date will be released for other customers.</p>
              <div className="cb-actions">
                <button className="btn-secondary" onClick={() => setCancelId(null)}>Keep booking</button>
                <button className="btn-danger" onClick={confirmCancel}>Yes, cancel it</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
