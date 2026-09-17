import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire up to POST /api/auth/forgot-password once backend is ready
    setSent(true)
  }

  return (
    <div className="login-page">
      <div className="visual-panel">
        <img
          src="https://images.unsplash.com/photo-1745573673416-66e829644ae9?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Decorated event stage"
        />
        <div className="overlay">
          <div className="logo">Rose <em>Mehal</em></div>
          <blockquote>"Every booking, confirmed the moment you pay — no calls, no waiting."</blockquote>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-box">
          {!sent ? (
            <>
              <h1>Forgot your password?</h1>
              <p className="subtitle">Enter your registered email and we'll send you a reset link.</p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" required />
                </div>
                <button type="submit" className="btn-submit">Send reset link</button>
              </form>
            </>
          ) : (
            <>
              <h1>Check your email</h1>
              <p className="subtitle">
                If an account exists for that email, we've sent a link to reset your password.
              </p>
            </>
          )}

          <p className="switch-line">
            Remembered it? <Link to="/login">Back to log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
