import { useEffect, useState } from 'react'
import { heroSlides } from '../../data/homeData'
import '../../styles/sections/hero.css'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [offset, setOffset] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    const handleScroll = () => setOffset(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__slider">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}>
            <img
              src={slide.image}
              alt={slide.title}
              className="hero__bg"
              style={{ transform: `scale(1.1) translateY(${offset * 0.4}px)` }}
            />
            <div className="hero__overlay"></div>
            <div className="hero__content">
              <div className="container">
                <div className="hero__content-inner">
                  <span className="section-label hero__label fade-in-up stagger-1">Signature Collection</span>
                  <h1 className="fade-in-up stagger-2">{slide.title}</h1>
                  <p className="fade-in-up stagger-3">{slide.subtitle}</p>
                  <a href="#products" className="hero__cta fade-in-up stagger-4">
                    <span className="hero__cta-text">Explore Collection</span>
                    <span className="hero__cta-shimmer"></span>
                  </a>

                  <div className="hero__usps fade-in-up stagger-5">
                    <div className="hero__usp">
                      <span className="hero__usp-dot"></span>
                      <span>Ecuadorian Premium</span>
                    </div>
                    <div className="hero__usp">
                      <span className="hero__usp-dot"></span>
                      <span>Real Infinite Roses</span>
                    </div>
                    <div className="hero__usp">
                      <span className="hero__usp-dot"></span>
                      <span>Concierge Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero__petals">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`hero__petal hero__petal--${i + 1}`}
            style={{
              transform: `translate(${mousePos.x * (i + 1) * 0.2}px, ${mousePos.y * (i + 1) * 0.2}px) rotate(${mousePos.x * 2}deg)`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C12,2 4,10 4,16C4,20.42 7.58,24 12,24C16.42,24 20,20.42 20,16C20,10 12,2 12,2Z" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  )
}
