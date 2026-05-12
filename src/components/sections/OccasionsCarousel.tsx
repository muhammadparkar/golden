import { occasions } from '../../data/homeData'
import '../../styles/sections/occasions-carousel.css'

export default function OccasionsCarousel() {
  return (
    <section className="occasions">
      <div className="container">
        <header className="occasions__header">
          <span className="section-label">Celebrate</span>
          <h2>GIFTS FOR EVERY MOMENT!</h2>
        </header>
        <div className="occasions__carousel-wrapper">
          <div className="occasions__carousel">
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
