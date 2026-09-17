import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    // TODO: wire up to POST /api/auth/reset-password (with the token from the email link) once backend is ready
    navigate('/login')
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
          <h1>Set a new password</h1>
          <p className="subtitle">Choose a strong password you haven't used before.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>New password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Confirm new password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {error && <div className="field-error">{error}</div>}
            <button type="submit" className="btn-submit">Reset password</button>
          </form>

          <p className="switch-line">
            <Link to="/login">Back to log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
