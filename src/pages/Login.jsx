import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire up to real auth API once backend is ready
    navigate('/dashboard')
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
          <div className="tabs">
            <button
              type="button"
              className={`tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={`tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <>
              <h1>Welcome back</h1>
              <p className="subtitle">Log in to manage your bookings and payments.</p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div className="row-between">
                  <label className="checkbox-row"><input type="checkbox" /> Remember me</label>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <button type="submit" className="btn-submit">Log in</button>
              </form>
            </>
          ) : (
            <>
              <h1>Create your account</h1>
              <p className="subtitle">Register to start booking your event.</p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Full name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <button type="submit" className="btn-submit">Create account</button>
              </form>
            </>
          )}

          <div className="divider">or</div>
          <button className="btn-google">Continue with Google</button>

          <p className="switch-line">
            {mode === 'login' ? (
              <>Don't have an account? <a onClick={() => setMode('register')} href="#">Register</a></>
            ) : (
              <>Already have an account? <a onClick={() => setMode('login')} href="#">Log in</a></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
