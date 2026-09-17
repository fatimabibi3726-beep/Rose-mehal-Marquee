import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminUsers.css'

// TODO: replace with real data from Supabase (food table)
const SEED_FOOD = [
  { id: 1, name: 'Classic Menu', category: 'Starter · Main · Dessert', price: 1200, description: 'A crowd-pleasing spread with mixed appetizers, two mains, and a dessert table.', available: true },
  { id: 2, name: 'Royal Feast', category: 'Starter · Main · Dessert', price: 1800, description: 'Premium multi-course menu with live counters and a curated dessert selection.', available: true },
  { id: 3, name: 'Light Bites', category: 'Starter · Dessert', price: 700, description: 'A lighter package for smaller gatherings — finger foods and desserts only.', available: false },
]

const emptyForm = { name: '', category: '', price: '', description: '' }

export default function AdminFood() {
  const [items, setItems] = useState(SEED_FOOD)
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
    setForm({ name: item.name, category: item.category, price: item.price, description: item.description })
    setEditingId(item.id)
    setModalMode('edit')
  }

  function handleSave(e) {
    e.preventDefault()
    if (modalMode === 'add') {
      // TODO: POST /api/food once backend is ready
      setItems((prev) => [{ id: Date.now(), ...form, price: Number(form.price), available: true }, ...prev])
      showToast('Food item added.')
    } else {
      // TODO: PUT /api/food/:id once backend is ready
      setItems((prev) => prev.map((i) => (i.id === editingId ? { ...i, ...form, price: Number(form.price) } : i)))
      showToast('Food item updated.')
    }
    setModalMode(null)
  }

  function toggleAvailable(item) {
    // TODO: PUT /api/food/:id once backend is ready (toggle availability_status)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, available: !i.available } : i)))
  }

  function confirmDelete() {
    // TODO: DELETE /api/food/:id once backend is ready
    setItems((prev) => prev.filter((i) => i.id !== deleteId))
    setDeleteId(null)
    showToast('Food item deleted.')
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
          <span className="link active">Food Menu</span>
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
            <h1>Food Menu Management</h1>
            <div className="subtitle">{items.length} menu items</div>
          </div>
          <button className="btn-new" onClick={openAdd}>+ Add food item</button>
        </div>

        <table className="booking-table">
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price / head</th><th>Availability</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.category}</td>
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
                <h2>{modalMode === 'add' ? 'Add food item' : 'Edit food item'}</h2>
                <button type="button" className="modal-close" onClick={() => setModalMode(null)}>×</button>
              </div>

              <div className="field">
                <label>Menu name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="field">
                <label>Category</label>
                <input
                  value={form.category}
                  placeholder="e.g. Starter · Main · Dessert"
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>
              <div className="field">
                <label>Price per head (Rs.)</label>
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
                <button type="submit" className="btn-new">{modalMode === 'add' ? 'Add item' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        )}

        {deleteId && (
          <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Delete this food item?</h2>
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
