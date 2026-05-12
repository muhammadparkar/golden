import { useEffect, useState } from 'react'
import { trustBadges } from '../../data/homeData'
import '../../styles/sections/trust-badges.css'

export default function TrustBadges() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    const el = document.getElementById('trust-badges')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="trust-badges" className={`trust-badges ${visible ? 'visible' : ''}`}>
      <div className="container">
        <div className="trust-badges__grid">
          {trustBadges.map((badge, i) => (
            <div key={i} className={`trust-badge fade-in-up stagger-${i + 1}`}>
              <div className="trust-badge__icon-container">{badge.icon}</div>
              <span className="trust-badge__text">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
