import { useState } from 'react'
import type { FormEvent } from 'react'
import '../../styles/sections/newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__content">
          <span className="section-label">Stay Connected</span>
          <h2>Join Our World</h2>
          <p>Be the first to discover new collections, exclusive offers, and styling inspiration.</p>
          {submitted ? (
            <p className="newsletter__success">Thank you for subscribing.</p>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
