import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (decorations + decoration_themes tables)
const SEED_DECOR = [
  { id: 1, name: 'Classic', type: 'Wedding', price: 900, description: 'Warm ivory drapes, soft floral centerpieces, and a traditional stage backdrop.', available: true },
  { id: 2, name: 'Modern', type: 'Corporate', price: 1100, description: 'Clean lines, ambient lighting, and minimal greenery for a contemporary look.', available: true },
  { id: 3, name: 'Mehndi Vibrant', type: 'Mehndi', price: 950, description: 'Bold marigold, mirror work, and colorful drapery for a lively mehndi night.', available: true },
]

const emptyForm = { name: '', type: 'Wedding', price: '', description: '' }

export default function AdminDecorations() {
  const [items, setItems] = useState(SEED_DECOR)
  const [modalMode, setModalMode] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openAdd() {
    setForm(emptyForm)
    setModalMode('add')
  }

  function openEdit(item) {
    setForm({ name: item.name, type: item.type, price: item.price, description: item.description })
    setEditingId(item.id)
    setModalMode('edit')
  }

  function handleSave(e) {
    e.preventDefault()
    if (modalMode === 'add') {
      // TODO: POST /api/decorations once backend is ready
      setItems((prev) => [{ id: Date.now(), ...form, price: Number(form.price), available: true }, ...prev])
      showToast('Decoration added.')
    } else {
      // TODO: PUT /api/decorations/:id once backend is ready
      setItems((prev) => prev.map((i) => (i.id === editingId ? { ...i, ...form, price: Number(form.price) } : i)))
      showToast('Decoration updated.')
    }
    setModalMode(null)
  }

  function toggleAvailable(item) {
    // TODO: PUT /api/decorations/:id once backend is ready
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, available: !i.available } : i)))
  }

  function confirmDelete() {
    // TODO: DELETE /api/decorations/:id once backend is ready
    setItems((prev) => prev.filter((i) => i.id !== deleteId))
    setDeleteId(null)
    showToast('Decoration deleted.')
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
          <span className="link active">Decorations</span>
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
            <h1>Decoration Management</h1>
            <div className="subtitle">{items.length} themes</div>
          </div>
          <button className="btn-new" onClick={openAdd}>+ Add decoration</button>
        </div>

        <table className="booking-table">
          <thead>
            <tr><th>Theme</th><th>Type</th><th>Price</th><th>Availability</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.type}</td>
                <td>Rs. {i.price.toLocaleString()}</td>
                <td>
                  <button
                    className={`badge ${i.available ? 'badge-confirmed' : 'badge-cancelled'}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                    onClick={() => toggleAvailable(i)}
                  >
                    {i.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="row-actions">
                  <button className="link-btn" onClick={() => openEdit(i)}>Edit</button>
                  <button className="link-btn" onClick={() => setDeleteId(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalMode && (
          <div className="modal-backdrop" onClick={() => setModalMode(null)}>
            <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSave}>
              <div className="modal-head">
                <h2>{modalMode === 'add' ? 'Add decoration' : 'Edit decoration'}</h2>
                <button type="button" className="modal-close" onClick={() => setModalMode(null)}>×</button>
              </div>

              <div className="field">
                <label>Theme name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="field">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="Wedding">Wedding</option>
                  <option value="Mehndi">Mehndi</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="field">
                <label>Price (Rs.)</label>
                <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="cb-actions">
                <button type="button" className="btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                <button type="submit" className="btn-new">{modalMode === 'add' ? 'Add decoration' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        )}

        {deleteId && (
          <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Delete this decoration?</h2>
              <p>This can't be undone.</p>
              <div className="cb-actions">
                <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn-danger" onClick={confirmDelete}>Yes, delete it</button>
              </div>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  )
}
