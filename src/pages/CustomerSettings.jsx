import { useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell.jsx'
import './MyBookings.css'

// TODO: replace with real data from Supabase (users, user_contacts, user_emails tables)
const INITIAL_PROFILE = {
  fullName: 'Ayesha Raza',
  email: 'ayesha@example.com',
  phone: '0301-1234567',
}

export default function CustomerSettings() {
  const [form, setForm] = useState(INITIAL_PROFILE)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function saveProfile(e) {
    e.preventDefault()
    // TODO: PUT /api/users/:id once backend is ready
    showToast('Profile updated.')
  }

  function changePassword(e) {
    e.preventDefault()
    if (pw.next.length < 8) return showToast('New password must be at least 8 characters.')
    if (pw.next !== pw.confirm) return showToast('New passwords do not match.')
    // TODO: PUT /api/auth/change-password once backend is ready
    setPw({ current: '', next: '', confirm: '' })
    showToast('Password changed.')
  }

  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/bookings" className="link">My Bookings</Link>
          <Link to="/payments" className="link">Payments</Link>
          <Link to="/notifications" className="link">Notifications</Link>
          <span className="link active">Settings</span>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>Settings</h1>
            <div className="subtitle">Update your profile and password.</div>
          </div>
          <NotificationBell />
        </div>

        <form className="cb-card" style={{ maxWidth: 480, marginBottom: 24 }} onSubmit={saveProfile}>
          <div className="section-title" style={{ marginTop: 0 }}>Profile</div>
          <div className="field">
            <label>Full name</label>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <button type="submit" className="btn-new">Save profile</button>
        </form>

        <form className="cb-card" style={{ maxWidth: 480 }} onSubmit={changePassword}>
          <div className="section-title" style={{ marginTop: 0 }}>Change password</div>
          <div className="field">
            <label>Current password</label>
            <input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required />
          </div>
          <div className="field">
            <label>New password</label>
            <input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required />
          </div>
          <div className="field">
            <label>Confirm new password</label>
            <input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
          </div>
          <button type="submit" className="btn-new">Change password</button>
        </form>

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
