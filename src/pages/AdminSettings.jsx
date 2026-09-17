import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (a settings table, or config store)
const INITIAL_SETTINGS = {
  siteName: 'Rose Mehal Marquee',
  contactEmail: 'hello@rosemehal.com',
  contactPhone: '051-1234567',
  address: 'Main GT Road, Islamabad, Pakistan',
}

export default function AdminSettings() {
  const [form, setForm] = useState(INITIAL_SETTINGS)
  const [toast, setToast] = useState('')

  function handleSave(e) {
    e.preventDefault()
    // TODO: PUT settings once a backend endpoint exists for this
    setToast('Settings saved.')
    setTimeout(() => setToast(''), 2500)
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
          <Link to="/admin/notifications" className="link">Notifications</Link>
          <span className="link active">Settings</span>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Settings</h1>
            <div className="subtitle">Site info and contact details shown to customers.</div>
          </div>
        </div>

        <form className="cb-card" style={{ maxWidth: 560 }} onSubmit={handleSave}>
          <div className="field">
            <label>Site name</label>
            <input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} required />
          </div>
          <div className="field">
            <label>Contact email</label>
            <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
          </div>
          <div className="field">
            <label>Contact phone</label>
            <input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} required />
          </div>
          <div className="field">
            <label>Address</label>
            <textarea rows="2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <button type="submit" className="btn-new">Save settings</button>
        </form>

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
