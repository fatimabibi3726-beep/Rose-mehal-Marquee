import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell.jsx'
import './CreateBooking.css'

// TODO: replace with real data from Supabase (food + decorations tables)
const EVENT_TYPES = ['Wedding', 'Mehndi', 'Corporate', 'Other']

const FOOD_PACKAGES = [
  { id: 1, name: 'Classic Menu', pricePerHead: 1200 },
  { id: 2, name: 'Royal Feast', pricePerHead: 1800 },
  { id: 3, name: 'Light Bites', pricePerHead: 700 },
]

const DECOR_THEMES = [
  { id: 1, name: 'Classic', price: 900 },
  { id: 2, name: 'Modern', price: 1100 },
  { id: 3, name: 'Mehndi Vibrant', price: 950 },
]

// TODO: replace with a real availability check against the bookings table (SRS-24)
const BOOKED_DATES = ['2026-03-14', '2026-03-21']

export default function CreateBooking() {
  const navigate = useNavigate()

  const [eventDate, setEventDate] = useState('')
  const [eventType, setEventType] = useState(EVENT_TYPES[0])
  const [guestCount, setGuestCount] = useState(100)
  const [foodId, setFoodId] = useState(FOOD_PACKAGES[0].id)
  const [decorId, setDecorId] = useState(DECOR_THEMES[0].id)
  const [step, setStep] = useState(1)

  const isDateTaken = eventDate && BOOKED_DATES.includes(eventDate)

  const food = FOOD_PACKAGES.find((f) => f.id === foodId)
  const decor = DECOR_THEMES.find((d) => d.id === decorId)

  const total = useMemo(() => {
    const foodTotal = (food?.pricePerHead || 0) * Number(guestCount || 0)
    const decorTotal = decor?.price || 0
    return foodTotal + decorTotal
  }, [food, decor, guestCount])

  const advance = Math.round(total * 0.3)

  function handleNext(e) {
    e.preventDefault()
    if (!eventDate || isDateTaken) return
    setStep(2)
  }

  function handlePay(e) {
    e.preventDefault()
    // TODO: replace with POST /api/bookings then /api/payments/initiate once backend is ready
    navigate(`/payment?amount=${advance}`)
  }

  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="logo">Rose <em>Mehal</em></div>
        <nav>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <span className="link active">New Booking</span>
          <Link to="/bookings" className="link" style={{ color: 'rgba(255,253,249,0.75)' }}>My Bookings</Link>
          <Link to="/payments" className="link" style={{ color: 'rgba(255,253,249,0.75)' }}>Payments</Link>
          <Link to="/notifications" className="link" style={{ color: 'rgba(255,253,249,0.75)' }}>Notifications</Link>
          <span className="link" style={{ marginTop: 20, color: 'rgba(255,253,249,0.5)' }}>Log out</span>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>Create a booking</h1>
            <div className="subtitle">Pick your date, choose your services, and confirm with an advance payment.</div>
          </div>
          <NotificationBell />
        </div>

        <div className="booking-steps">
          <span className={`step-pill ${step === 1 ? 'active' : 'done'}`}>1. Date &amp; services</span>
          <span className={`step-pill ${step === 2 ? 'active' : ''}`}>2. Summary &amp; pay</span>
        </div>

        {step === 1 && (
          <form className="cb-card" onSubmit={handleNext}>
            <div className="cb-grid">
              <div className="field">
                <label>Event date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
                {isDateTaken && (
                  <div className="field-error">This date is already booked — please pick another.</div>
                )}
              </div>

              <div className="field">
                <label>Event type</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Guest count</label>
                <input
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="section-title" style={{ marginTop: 8 }}>Food package</div>
            <div className="option-row">
              {FOOD_PACKAGES.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  className={`option-card ${foodId === f.id ? 'selected' : ''}`}
                  onClick={() => setFoodId(f.id)}
                >
                  <div className="option-name">{f.name}</div>
                  <div className="option-price">Rs. {f.pricePerHead.toLocaleString()} / head</div>
                </button>
              ))}
            </div>

            <div className="section-title">Décor theme</div>
            <div className="option-row">
              {DECOR_THEMES.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  className={`option-card ${decorId === d.id ? 'selected' : ''}`}
                  onClick={() => setDecorId(d.id)}
                >
                  <div className="option-name">{d.name}</div>
                  <div className="option-price">Rs. {d.price.toLocaleString()}</div>
                </button>
              ))}
            </div>

            <button type="submit" className="btn-new" style={{ marginTop: 8 }}>
              Continue to summary
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="cb-card" onSubmit={handlePay}>
            <div className="section-title" style={{ marginTop: 0 }}>Booking summary</div>

            <div className="summary-row"><span>Event date</span><span>{eventDate}</span></div>
            <div className="summary-row"><span>Event type</span><span>{eventType}</span></div>
            <div className="summary-row"><span>Guests</span><span>{guestCount}</span></div>
            <div className="summary-row"><span>Food package</span><span>{food?.name} (Rs. {food?.pricePerHead}/head)</span></div>
            <div className="summary-row"><span>Décor theme</span><span>{decor?.name}</span></div>
            <div className="summary-row total"><span>Total cost</span><span>Rs. {total.toLocaleString()}</span></div>
            <div className="summary-row advance"><span>Advance due now (30%)</span><span>Rs. {advance.toLocaleString()}</span></div>

            <div className="cb-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="btn-new">Pay advance &amp; confirm</button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
