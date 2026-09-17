import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ServiceCatalogue.css'

// TODO: replace with real data from Supabase (food + decorations tables)
const FOOD_PACKAGES = [
  {
    id: 1,
    name: 'Classic Menu',
    category: 'Starter · Main · Dessert',
    price: 1200,
    description: 'A crowd-pleasing spread with mixed appetizers, two mains, and a dessert table.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 2,
    name: 'Royal Feast',
    category: 'Starter · Main · Dessert',
    price: 1800,
    description: 'Premium multi-course menu with live counters and a curated dessert selection.',
    image: 'https://images.unsplash.com/photo-1576842546422-60562b9242ae?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 3,
    name: 'Light Bites',
    category: 'Starter · Dessert',
    price: 700,
    description: 'A lighter package for smaller gatherings — finger foods and desserts only.',
    image: 'https://images.unsplash.com/photo-1633424411431-5eb8d0e96488?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
]

const DECOR_THEMES = [
  {
    id: 1,
    name: 'Classic',
    type: 'Wedding',
    price: 900,
    description: 'Warm ivory drapes, soft floral centerpieces, and a traditional stage backdrop.',
    image: 'https://images.unsplash.com/photo-1745573673416-66e829644ae9?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 2,
    name: 'Modern',
    type: 'Corporate',
    price: 1100,
    description: 'Clean lines, ambient lighting, and minimal greenery for a contemporary look.',
    image: 'https://images.unsplash.com/photo-1641996250159-9d2bbfb483fa?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 3,
    name: 'Mehndi Vibrant',
    type: 'Mehndi',
    price: 950,
    description: 'Bold marigold, mirror work, and colorful drapery for a lively mehndi night.',
    image: 'https://images.unsplash.com/photo-1723200810513-971e2d809283?fm=jpg&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
]

export default function ServiceCatalogue() {
  const [tab, setTab] = useState('food') // 'food' | 'decor'
  const items = tab === 'food' ? FOOD_PACKAGES : DECOR_THEMES

  return (
    <>
      <header className="site-header">
        <div className="nav landing-wrap">
          <Link to="/" className="logo">Rose <em>Mehal</em></Link>
          <nav className="nav-links">
            <Link to="/#services">Services</Link>
            <Link to="/#gallery">Gallery</Link>
            <Link to="/#flow">How it works</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn-ghost">Log in</Link>
            <Link to="/login" className="btn-solid">Check availability</Link>
          </div>
        </div>
      </header>

      <section className="catalogue-hero landing-wrap">
        <span className="eyebrow">Browse before you book</span>
        <h1>Food &amp; décor, priced upfront</h1>
        <p>Explore our packages and themes below. Pick your favorites when you create a booking.</p>
      </section>

      <div className="catalogue-tabs landing-wrap">
        <button
          className={`cat-tab ${tab === 'food' ? 'active' : ''}`}
          onClick={() => setTab('food')}
        >
          Food packages
        </button>
        <button
          className={`cat-tab ${tab === 'decor' ? 'active' : ''}`}
          onClick={() => setTab('decor')}
        >
          Décor themes
        </button>
      </div>

      <section className="catalogue-grid landing-wrap">
        {items.map((item) => (
          <article className="cat-card" key={item.id}>
            <div className="cat-card-img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cat-card-body">
              <span className="tag">{tab === 'food' ? item.category : item.type}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="cat-card-foot">
                <span className="price">
                  Rs. {item.price.toLocaleString()}{tab === 'food' ? ' / head' : ''}
                </span>
                <Link to="/login" className="btn-secondary small">Select</Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="site-footer landing-wrap">
        <div>Rose Mehal Marquee — a Callrolin venue</div>
        <div>hello@rosemehal.com</div>
      </footer>
    </>
  )
}
