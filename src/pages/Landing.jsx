import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <>
      <header className="site-header">
        <div className="nav landing-wrap">
          <div className="logo">Rose <em>Mehal</em></div>
          <nav className="nav-links">
            <Link to="/services">Services</Link>
            <a href="#gallery">Gallery</a>
            <a href="#flow">How it works</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn-ghost">Log in</Link>
            <Link to="/login" className="btn-solid">Check availability</Link>
          </div>
        </div>
      </header>

      <section className="hero landing-wrap">
        <div className="hero-copy">
          <span className="eyebrow">Rose Mehal · Event Hall</span>
          <h1>Where your <i>day</i> becomes the story they tell</h1>
          <p>Book your date, choose your food and décor, and pay your advance — all in one place. No phone tag, no double-bookings.</p>
          <div className="hero-actions">
            <Link to="/login" className="btn-primary">Check your date</Link>
            <a href="#gallery" className="btn-secondary">View the hall</a>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1746739802530-b490abdfc8e6?fm=jpg&q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lavish banquet hall decorated for an event"
          />
          <span className="frame-tag">Rose Mehal — main hall</span>
        </div>
      </section>

      <div className="stats">
        <div className="landing-wrap">
          <div className="stat"><div className="num">1</div><div className="label">Booking confirmed per date — no clashes</div></div>
          <div className="stat"><div className="num">6</div><div className="label">Curated food packages to choose from</div></div>
          <div className="stat"><div className="num">4</div><div className="label">Décor themes, from classic to modern</div></div>
          <div className="stat"><div className="num">24/7</div><div className="label">See live availability, any time</div></div>
        </div>
      </div>

      <section className="services landing-wrap" id="services">
        <div className="section-head">
          <span className="eyebrow">What you can arrange</span>
          <h2>Everything for the day, in one booking</h2>
        </div>

        <div className="service-row">
          <div className="service-copy">
            <span className="tag">Booking</span>
            <h3>Pick your date, see it's really free</h3>
            <p>Select an event date and type — wedding, mehndi, corporate, or other — and the hall checks availability in real time. No two bookings ever land on the same date.</p>
          </div>
          <div className="service-visual">
            <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="160" height="120" rx="4" fill="none" stroke="#7A2E3B" strokeWidth="2"/>
              <line x1="20" y1="52" x2="180" y2="52" stroke="#7A2E3B" strokeWidth="2"/>
              <circle cx="100" cy="96" r="20" fill="#E3B7B0"/>
              <path d="M92 96 l6 6 12 -12" stroke="#5C2029" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="service-row reverse">
          <div className="service-copy">
            <span className="tag">Food</span>
            <h3>Menus built for the number of guests you're feeding</h3>
            <p>Browse curated food packages priced per head — starters, mains, desserts — and see exactly what's included before you commit.</p>
          </div>
          <div className="service-visual">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?fm=jpg&q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Buffet spread with chafing dishes"
            />
          </div>
        </div>

        <div className="service-row">
          <div className="service-copy">
            <span className="tag">Décor</span>
            <h3>A theme that matches the occasion</h3>
            <p>Classic, modern, mehndi, or corporate — each décor theme comes with its own stage, lighting, and floral treatment, with real photos and prices upfront.</p>
          </div>
          <div className="service-visual">
            <img
              src="https://images.unsplash.com/photo-1745573673416-66e829644ae9?fm=jpg&q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beautifully decorated stage with floral arrangements"
            />
          </div>
        </div>
      </section>

      <section className="flow" id="flow">
        <div className="landing-wrap">
          <div className="section-head">
            <span className="eyebrow">Three steps</span>
            <h2>From date to confirmed booking</h2>
          </div>
          <div className="flow-steps">
            <div className="flow-step">
              <div className="num">01</div>
              <h3>Choose your date &amp; services</h3>
              <p>Pick your event date, guest count, food package, and décor theme in one form.</p>
            </div>
            <div className="flow-step">
              <div className="num">02</div>
              <h3>Pay your advance</h3>
              <p>Secure the date with an online advance payment — confirmed instantly, no waiting on a callback.</p>
            </div>
            <div className="flow-step">
              <div className="num">03</div>
              <h3>Get confirmed, stay updated</h3>
              <p>Receive a confirmation notification, then track your booking and payment status anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band landing-wrap" id="contact">
        <h2>Your date is one form away from being <i>yours</i></h2>
        <Link to="/login" className="btn-primary">Check your date</Link>
      </section>

      <footer className="site-footer landing-wrap">
        <div>Rose Mehal Marquee — a Callrolin venue</div>
        <div>hello@rosemehal.com</div>
      </footer>
    </>
  )
}
