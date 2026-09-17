import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './Payment.css'

// TODO: replace this whole flow with a real redirect to Stripe/JazzCash
// checkout (POST /api/payments/initiate), then rely on the webhook
// (POST /api/payments/webhook) to confirm — never trust this client-side
// "success" the way the demo below does.

export default function Payment() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const amount = Number(params.get('amount') || 0)

  const [phase, setPhase] = useState('redirecting') // 'redirecting' | 'paid' | 'failed'

  useEffect(() => {
    const timer = setTimeout(() => setPhase('paid'), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="payment-page">
      <div className="payment-card">
        {phase === 'redirecting' && (
          <>
            <div className="spinner" />
            <h2>Redirecting you to the payment gateway…</h2>
            <p>Please don't close this window.</p>
          </>
        )}

        {phase === 'paid' && (
          <>
            <div className="result-icon success">✓</div>
            <h2>Advance payment received</h2>
            <p>Rs. {amount.toLocaleString()} has been paid. Your booking is now confirmed.</p>
            <span className="badge badge-confirmed">Paid</span>
            <div className="payment-actions">
              <Link to="/bookings" className="btn-new">View my bookings</Link>
              <Link to="/dashboard" className="btn-secondary">Go to dashboard</Link>
            </div>
          </>
        )}

        {phase === 'failed' && (
          <>
            <div className="result-icon failed">✕</div>
            <h2>Payment couldn't be completed</h2>
            <p>Nothing was charged. You can try again from your booking.</p>
            <div className="payment-actions">
              <button className="btn-new" onClick={() => setPhase('redirecting')}>Try again</button>
              <Link to="/bookings" className="btn-secondary">Back to bookings</Link>
            </div>
          </>
        )}

        {/* Demo-only toggle so the failed state can be reviewed — remove once real gateway is wired up */}
        {phase === 'paid' && (
          <button className="demo-link" onClick={() => setPhase('failed')}>
            (demo) show failed state instead
          </button>
        )}
      </div>
    </div>
  )
}
