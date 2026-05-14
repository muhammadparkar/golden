import { useEffect, useRef } from 'react'
import { occasions } from '../../data/homeData'
import '../../styles/sections/occasions-carousel.css'

export default function OccasionsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let intervalId: ReturnType<typeof setInterval>

    const scroll = () => {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Move by half the width to ensure smooth progression in the snap carousel
        carousel.scrollBy({ left: carousel.clientWidth / 2, behavior: 'smooth' })
      }
    }

    const startScroll = () => {
      intervalId = setInterval(scroll, 4000)
    }

    const stopScroll = () => {
      if (intervalId) clearInterval(intervalId)
    }

    startScroll()

    carousel.addEventListener('mouseenter', stopScroll)
    carousel.addEventListener('mouseleave', startScroll)

    return () => {
      stopScroll()
      carousel.removeEventListener('mouseenter', stopScroll)
      carousel.removeEventListener('mouseleave', startScroll)
    }
  }, [])

  return (
    <section className="occasions">
      <div className="container">
        <header className="occasions__header">
          <span className="section-label">Celebrate</span>
          <h2>GIFTS FOR EVERY MOMENT!</h2>
        </header>
        <div className="occasions__carousel-wrapper">
          <div className="occasions__carousel" ref={carouselRef}>
            {occasions.map((occasion) => (
              <div key={occasion.name} className="occasion-card">
                <div className="occasion-card__image">
                  <img src={occasion.image} alt={occasion.name} loading="lazy" />
                  <div className="occasion-card__overlay">
                    <h3>{occasion.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
