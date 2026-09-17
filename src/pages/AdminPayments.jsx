import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (payments table, joined with bookings/users)
const SEED_PAYMENTS = [
  { id: 1, customer: 'Ayesha Raza', event: 'Wedding Reception', method: 'jazzcash', transactionId: 'JC-88213471', paid: 80000, total: 522000, status: 'partial', date: '10 Mar 2026' },
  { id: 2, customer: 'Sara Khan', event: 'Mehndi Night', method: 'stripe', transactionId: 'pi_3Nx8Kq2eZv', paid: 180950, total: 180950, status: 'paid', date: '01 Mar 2026' },
  { id: 3, customer: 'Bilal Ahmed', event: 'Corporate Dinner', method: 'jazzcash', transactionId: 'JC-77120093', paid: 0, total: 64100, status: 'pending', date: '—' },
  { id: 4, customer: 'Zara Iqbal', event: 'Anniversary Dinner', method: 'easypaisa', transactionId: 'EP-55201188', paid: 0, total: 43100, status: 'failed', date: '28 Feb 2026' },
]

const STATUS_OPTIONS = ['pending', 'partial', 'paid', 'failed']

function StatusBadge({ status }) {
  const cls = status === 'paid' ? 'badge-confirmed' : status === 'failed' ? 'badge-cancelled' : 'badge-pending'
  return <span className={`badge ${cls}`}>{status[0].toUpperCase() + status.slice(1)}</span>
}

export default function AdminPayments() {
  const [payments, setPayments] = useState(SEED_PAYMENTS)
  const [selectedId, setSelectedId] = useState(null)
  const [draftStatus, setDraftStatus] = useState('')
  const [toast, setToast] = useState('')

  const selected = payments.find((p) => p.id === selectedId)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openDetail(p) {
    setSelectedId(p.id)
    setDraftStatus(p.status)
  }

  function saveStatus() {
    // TODO: PATCH /api/payments/:id/status once backend is ready
    setPayments((prev) => prev.map((p) => (p.id === selectedId ? { ...p, status: draftStatus } : p)))
    showToast('Payment status updated.')
    setSelectedId(null)
  }

  function verify(p) {
    // TODO: cross-check against the gateway's own record / webhook log once backend is ready
    showToast(`Transaction ${p.transactionId} looks valid with ${p.method}.`)
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
          <span className="link active">Payments</span>
          <div className="group-label">Insights</div>
          <Link to="/admin/reports" className="link">Reports</Link>
          <Link to="/admin/notifications" className="link">Notifications</Link>
          <Link to="/admin/settings" className="link">Settings</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Payment Management</h1>
            <div className="subtitle">{payments.length} transactions</div>
          </div>
        </div>

        <table className="booking-table">
          <thead>
            <tr><th>Customer</th><th>Event</th><th>Method</th><th>Paid / Total</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.customer}</td>
                <td>{p.event}</td>
                <td className="capitalize">{p.method}</td>
                <td>Rs. {p.paid.toLocaleString()} / {p.total.toLocaleString()}</td>
                <td><StatusBadge status={p.status} /></td>
                <td className="row-actions">
                  <button className="link-btn" onClick={() => verify(p)}>Verify</button>
                  <button className="link-btn" onClick={() => openDetail(p)}>View / Edit</button>
                </td>
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

              <div className="summary-row"><span>Customer</span><span>{selected.customer}</span></div>
              <div className="summary-row"><span>Payment method</span><span className="capitalize">{selected.method}</span></div>
              <div className="summary-row"><span>Transaction ID</span><span>{selected.transactionId}</span></div>
              <div className="summary-row"><span>Date</span><span>{selected.date}</span></div>
              <div className="summary-row"><span>Amount paid</span><span>Rs. {selected.paid.toLocaleString()}</span></div>
              <div className="summary-row total"><span>Booking total</span><span>Rs. {selected.total.toLocaleString()}</span></div>

              <div className="field" style={{ marginTop: 18 }}>
                <label>Payment status</label>
                <select value={draftStatus} onChange={(e) => setDraftStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                  ))}
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
