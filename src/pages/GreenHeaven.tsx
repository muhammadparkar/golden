import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { greenCategories, greenItems } from '../data/greenHeavenData'
import '../styles/pages/floral-essentials.css'
import '../styles/pages/contact.css'

const potSizeOptions = [
  { value: 'Small', label: 'Small (4")' },
  { value: 'Medium', label: 'Medium (6")' },
  { value: 'Large', label: 'Large (8")' },
  { value: 'Extra Large', label: 'Extra Large (10"+)' },
]

const potTypeOptions = [
  { value: 'Ceramic White', label: 'Classic Ceramic White' },
  { value: 'Terracotta', label: 'Natural Terracotta' },
  { value: 'Gold Accent', label: 'Luxury Gold Accent' },
  { value: 'Woven Basket', label: 'Handwoven Basket' },
]

interface GreenItem {
  id: number
  name: string
  category: string
  desc: string
  image: string
}

export default function GreenHeaven() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<GreenItem | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'potSize' | 'potType' | null>(null)

  const [bookingState, setBookingState] = useState({
    potSize: 'Medium',
    potType: 'Ceramic White',
    message: '',
    submitted: false,
    reference: ''
  })

  const filteredItems = greenItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleOpenItem = (item: GreenItem) => {
    setSelectedItem(item)
    setOpenDropdown(null)
    setBookingState({
      potSize: 'Medium',
      potType: 'Ceramic White',
      message: '',
      submitted: false,
      reference: ''
    })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomRef = `GLD-GREEN-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Green Heaven Plant Inquiry: ${selectedItem?.name} (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I would like to inquire about ordering the following botanical/plant item:\n` +
      `- Plant Name: ${selectedItem?.name}\n` +
      `- Pot Size Selection: ${bookingState.potSize}\n` +
      `- Pot Style Selection: ${bookingState.potType}\n` +
      `- Inquiry Reference: ${randomRef}\n\n` +
      `Special Requests or Placement Notes:\n` +
      `"${bookingState.message || 'None provided'}"\n\n` +
      `--- Additional Customer Notes ---\n` +
      `[Write your additional comments here]\n\n` +
      `Thank you.`
    )

    setTimeout(() => {
      window.location.href = `mailto:info@golden-bouquet.com?subject=${subject}&body=${body}`
    }, 800)
  }

  return (
    <MainLayout>
      <main className="floral-essentials-page floral-page--no-hero">
        <section className="floral-controls-container">
          <div className="container">

            {/* Slim Editorial Header */}
            <div className="editorial-header-slim">
              <span className="editorial-header-slim__subtitle">Lush Living Botanicals</span>
              <h1 className="editorial-header-slim__title">Green Heaven</h1>
              <p className="editorial-header-slim__desc">Premium indoor plants, fresh succulents, and architectural greenery to breathe life into your home.</p>
            </div>

            {/* Combined Controls Panel in a Single Horizontal Row */}
            <div className="floral-controls-panel">
              <div className="floral-categories-flat">
                {greenCategories.map(category => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      className={`floral-category-square ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      <span>{category}</span>
                    </button>
                  )
                })}
              </div>

              <div className="floral-actions-right">
                <div className="floral-search-wrapper">
                  <input
                    type="text"
                    className="floral-search-input"
                    placeholder="Search plants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search plants"
                  />
                  <svg className="floral-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* Editorial Product Grid */}
            <div key={activeCategory} className="editorial-grid">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="editorial-card"
                  onClick={() => handleOpenItem(item)}
                >
                  <div className="editorial-card__image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="editorial-card__image"
                      loading="lazy"
                    />
                    <div className="editorial-card__frame" />
                  </div>

                  {/* Content details */}
                  <h3 className="editorial-card__title">{item.name}</h3>
                  <p className="editorial-card__desc">{item.desc}</p>

                  <div className="editorial-card__footer">
                    <button className="editorial-card__btn">
                      Inquire Details
                      <span className="editorial-card__btn-arrow">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="floral-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="floral-modal"
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="floral-modal__close-btn"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="floral-modal__left">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="floral-modal__image"
                  />
                </div>

                <div className="floral-modal__right">
                  <h2 className="floral-modal__title">{selectedItem.name}</h2>
                  <p className="floral-modal__desc">{selectedItem.desc}</p>

                  <div className="floral-booking-panel">
                    <h3 className="floral-booking-title">Inquire for Custom Order</h3>

                    {!bookingState.submitted ? (
                      <form className="floral-booking-form" onSubmit={handleBookingSubmit}>
                        <div className="floral-form-group contact-custom-dropdown-container">
                          <label className="floral-form-label">Pot Size</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'potSize' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'potSize' ? null : 'potSize')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {potSizeOptions.find(opt => opt.value === bookingState.potSize)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'potSize' && (
                            <ul className="contact-custom-dropdown-list">
                              {potSizeOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.potSize === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, potSize: option.value }))
                                    setOpenDropdown(null)
                                  }}
                                >
                                  {option.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="floral-form-group contact-custom-dropdown-container">
                          <label className="floral-form-label">Pot Style</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'potType' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'potType' ? null : 'potType')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {potTypeOptions.find(opt => opt.value === bookingState.potType)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'potType' && (
                            <ul className="contact-custom-dropdown-list">
                              {potTypeOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.potType === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, potType: option.value }))
                                    setOpenDropdown(null)
                                  }}
                                >
                                  {option.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="floral-form-group">
                          <label className="floral-form-label" htmlFor="green-note">Special Request</label>
                          <input
                            id="green-note"
                            type="text"
                            className="floral-form-input"
                            placeholder="Any special requests or placement notes..."
                            value={bookingState.message}
                            onChange={(e) => setBookingState(prev => ({ ...prev, message: e.target.value }))}
                          />
                        </div>

                        <button type="submit" className="floral-submit-btn">
                          Submit Concierge Inquiry
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        className="floral-booking-success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <h4>Inquiry Received</h4>
                        <p>
                          Thank you for choosing Golden. Our botanist concierge has logged your order request for the <strong>{selectedItem.name}</strong>.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
                          Order details:<br />
                          Pot Size: <strong>{bookingState.potSize}</strong> | Style: <strong>{bookingState.potType}</strong>
                          {bookingState.message && (
                            <>
                              <br />Special Request: <em>"{bookingState.message}"</em>
                            </>
                          )}
                        </p>
                        <p style={{ marginTop: '12px', fontWeight: 600, fontSize: '0.8125rem' }}>
                          Booking Reference: {bookingState.reference}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MainLayout>
  )
}
