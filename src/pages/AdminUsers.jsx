import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (users, user_contacts, user_emails tables)
const SEED_USERS = [
  { id: 1, fullName: 'Ayesha Raza', username: 'ayesha.raza', email: 'ayesha@example.com', phone: '0301-1234567', role: 'customer', status: 'active' },
  { id: 2, fullName: 'Bilal Ahmed', username: 'bilal.a', email: 'bilal@example.com', phone: '0322-9876543', role: 'customer', status: 'active' },
  { id: 3, fullName: 'Sara Khan', username: 'sara.khan', email: 'sara@example.com', phone: '0345-1122334', role: 'staff', status: 'active' },
  { id: 4, fullName: 'Imran Malik', username: 'imran.m', email: 'imran@example.com', phone: '0333-5566778', role: 'customer', status: 'blocked' },
]

const emptyForm = { fullName: '', username: '', email: '', phone: '', role: 'customer', password: '' }

export default function AdminUsers() {
  const [users, setUsers] = useState(SEED_USERS)
  const [search, setSearch] = useState('')
  const [modalMode, setModalMode] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter((u) => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }, [users, search])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openAdd() {
    setForm(emptyForm)
    setErrors({})
    setModalMode('add')
  }

  function openEdit(user) {
    setForm({ ...user, password: '' })
    setEditingId(user.id)
    setErrors({})
    setModalMode('edit')
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.username.trim()) e.username = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (modalMode === 'add' && !form.password.trim()) e.password = 'Required'

    // SRS-03: username & email must be unique
    const clash = users.find(
      (u) =>
        u.id !== editingId &&
        (u.username.toLowerCase() === form.username.trim().toLowerCase() ||
          u.email.toLowerCase() === form.email.trim().toLowerCase())
    )
    if (clash) e.username = e.email = 'Username or email already in use'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave(e) {
    e.preventDefault()
    if (!validate()) return

    if (modalMode === 'add') {
      // TODO: POST /api/users once backend is ready
      const newUser = { ...form, id: Date.now(), status: 'active' }
      delete newUser.password
      setUsers((prev) => [newUser, ...prev])
      showToast('User added successfully.')
    } else {
      // SRS-08: updated data must differ from existing record
      const original = users.find((u) => u.id === editingId)
      const unchanged =
        original.fullName === form.fullName &&
        original.role === form.role &&
        original.phone === form.phone &&
        original.email === form.email
      if (unchanged) {
        setErrors({ fullName: 'Change at least one field before saving.' })
        return
      }
      // TODO: PUT /api/users/:id once backend is ready
      setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)))
      showToast('User updated successfully.')
    }

    setModalMode(null)
  }

  function toggleBlock(user) {
    // TODO: PATCH /api/users/:id/block once backend is ready
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u))
    )
    showToast(user.status === 'active' ? 'User blocked.' : 'User unblocked.')
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <div className="role-tag">ADMIN DASHBOARD</div>
        <nav>
          <Link to="/admin" className="link">Overview</Link>
          <div className="group-label">Manage</div>
          <span className="link active">Users</span>
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
            <h1>User Management</h1>
            <div className="subtitle">{users.length} total users</div>
          </div>
          <button className="btn-new" onClick={openAdd}>+ Add user</button>
        </div>

        <input
          className="search-input"
          placeholder="Search by username or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="booking-table" style={{ marginTop: 18 }}>
          <thead>
            <tr><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-confirmed' : 'badge-cancelled'}`}>
                    {u.status === 'active' ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="row-actions">
                  <button className="link-btn" onClick={() => openEdit(u)}>Edit</button>
                  <button className="link-btn" onClick={() => toggleBlock(u)}>
                    {u.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="7" className="empty-row">No users match "{search}".</td></tr>
            )}
          </tbody>
        </table>

        {modalMode && (
          <div className="modal-backdrop" onClick={() => setModalMode(null)}>
            <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSave}>
              <div className="modal-head">
                <h2>{modalMode === 'add' ? 'Add new user' : 'Edit user'}</h2>
                <button type="button" className="modal-close" onClick={() => setModalMode(null)}>×</button>
              </div>

              <div className="field">
                <label>Full name</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                {errors.fullName && <div className="field-error">{errors.fullName}</div>}
              </div>
              <div className="field">
                <label>Username</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                {errors.username && <div className="field-error">{errors.username}</div>}
              </div>
              <div className="field">
                <label>Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>
              <div className="field">
                <label>Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                {errors.phone && <div className="field-error">{errors.phone}</div>}
              </div>
              <div className="field">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="customer">Customer</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {modalMode === 'add' && (
                <div className="field">
                  <label>Password</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  {errors.password && <div className="field-error">{errors.password}</div>}
                </div>
              )}

              <div className="cb-actions">
                <button type="button" className="btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                <button type="submit" className="btn-new">{modalMode === 'add' ? 'Add user' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
