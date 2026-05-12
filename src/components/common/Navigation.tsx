import { useEffect, useState } from 'react'
import goldenLogo from '../../assets/golden-logo.png'
import { navLinks } from '../../data/siteData'
import '../../styles/components/navigation.css'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__container container">
        <ul className={`nav__links nav__links--left ${menuOpen ? 'nav__links--open' : ''}`}>
          {navLinks.slice(0, 3).map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#" className="nav__logo">
          <img src={goldenLogo} alt="Golden Bouquet" className="nav__logo-img" />
        </a>

        <ul className={`nav__links nav__links--right ${menuOpen ? 'nav__links--open' : ''}`}>
          {navLinks.slice(3).map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className={`nav__links nav__links--mobile ${menuOpen ? 'nav__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
