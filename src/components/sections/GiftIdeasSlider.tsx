import { giftIdeas } from '../../data/homeData'
import '../../styles/sections/gift-ideas-slider.css'

export default function GiftIdeasSlider() {
  return (
    <section className="gift-ideas">
      <div className="container">
        <header className="gift-ideas__header">
          <span className="section-label">Selected for you</span>
          <h2>Explore Unique Gift Ideas</h2>
        </header>

        <div className="gift-ideas__stacked-container">
          <div className="gift-ideas__row">
            {giftIdeas.slice(0, 3).map((item) => (
              <div key={item.name} className="gift-card gift-card--stacked">
                <div className="gift-card__inner">
                  <div className="gift-card__image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="gift-card__info">
                    <h3>{item.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gift-ideas__row">
            {giftIdeas.slice(3, 6).map((item) => (
              <div key={item.name} className="gift-card gift-card--stacked">
                <div className="gift-card__inner">
                  <div className="gift-card__image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="gift-card__info">
                    <h3>{item.name}</h3>
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
