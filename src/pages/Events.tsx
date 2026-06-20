import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { eventsCategories, eventsItems } from '../data/eventsData'
import '../styles/pages/inner-page.css'
import '../styles/pages/floral-essentials.css'
import '../styles/pages/contact.css'

const themeOptions = [
  { value: 'Grand Imperial Gold', label: 'Grand Imperial Gold' },
  { value: 'Enchanted Sage Green', label: 'Enchanted Sage Green' },
  { value: 'Classic Silk Ivory', label: 'Classic Silk Ivory' },
  { value: 'Romantic Velvet Crimson', label: 'Romantic Velvet Crimson' },
]

const venueScaleOptions = [
  { value: 'Intimate', label: 'Intimate (under 50 guests)' },
  { value: 'Grand Reception', label: 'Grand Reception (50-200 guests)' },
  { value: 'Gala / Ballroom', label: 'Gala / Ballroom (200+ guests)' },
]

interface EventItem {
  id: number
  name: string
  category: string
  desc: string
  image: string
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'theme' | 'scale' | null>(null)

  const [bookingState, setBookingState] = useState({
    theme: 'Grand Imperial Gold',
    scale: 'Intimate',
    message: '',
    submitted: false,
    reference: ''
  })

  const getCategoryCount = (category: string) => {
    if (category === 'All') return eventsItems.length
    return eventsItems.filter(item => item.category === category).length
  }

  const filteredItems = eventsItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleOpenItem = (item: EventItem) => {
    setSelectedItem(item)
    setOpenDropdown(null)
    setBookingState({
      theme: 'Grand Imperial Gold',
      scale: 'Intimate',
      message: '',
      submitted: false,
      reference: ''
    })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomRef = `GLD-EVT-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Event Inquiry: ${selectedItem?.name} (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I would like to inquire about booking the following event styling:\n` +
      `- Event Name: ${selectedItem?.name}\n` +
      `- Theme Selection: ${bookingState.theme}\n` +
      `- Venue Scale: ${bookingState.scale}\n` +
      `- Inquiry Reference: ${randomRef}\n\n` +
      `Special Design Requests & Details:\n` +
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
              <span className="editorial-header-slim__subtitle">Artistic Atmospheres</span>
              <h1 className="editorial-header-slim__title">Events & Styling</h1>
              <p className="editorial-header-slim__desc">Bespoke event planning, grand installations, and floral transformations for unforgettable celebrations.</p>
            </div>
            
            {/* Combined Controls Panel in a Single Horizontal Row */}
            <div className="floral-controls-panel">
              {/* Category filters on the left as square rectangular buttons */}
              <div className="floral-categories-flat">
                {eventsCategories.map(category => {
                  const isActive = activeCategory === category
                  return (
                    <button 
                      key={category}
                      className={`floral-category-square ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      <span>{category}</span>
                      <span className="floral-category-square__badge">{getCategoryCount(category)}</span>
                    </button>
                  )
                })}
              </div>

              {/* Right side: Search input only */}
              <div className="floral-actions-right">
                <div className="floral-search-wrapper">
                  <input 
                    type="text" 
                    className="floral-search-input" 
                    placeholder="Search portfolio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search portfolio"
                  />
                  <svg className="floral-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* Editorial Product Grid (Stable Key-Based CSS Animating) */}
            <div key={activeCategory} className="editorial-grid">
              {filteredItems.map((item) => (
                <article 
                  key={item.id} 
                  className="editorial-card"
                  onClick={() => handleOpenItem(item)}
                >
                  {/* Image container with 4:3 landscape aspect ratio */}
                  <div className="editorial-card__image-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="editorial-card__image" 
                      loading="lazy" 
                    />
                    {/* Elegant double gold border visible on hover */}
                    <div className="editorial-card__frame" />
                  </div>

                  {/* Content details */}
                  <span className="editorial-card__category">{item.category}</span>
                  <h3 className="editorial-card__title">{item.name}</h3>
                  <p className="editorial-card__desc">{item.desc}</p>
                  
                  <div className="editorial-card__footer">
                    <button className="editorial-card__btn">
                      View Details
                      <span className="editorial-card__btn-arrow">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* Quick View Drawer / Modal Modal */}
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
                {/* Close Button */}
                <button 
                  className="floral-modal__close-btn"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Left Side: Photo */}
                <div className="floral-modal__left">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="floral-modal__image" 
                  />
                </div>

                {/* Right Side: Details and Booking Form */}
                <div className="floral-modal__right">
                  <span className="floral-modal__category">{selectedItem.category}</span>
                  <h2 className="floral-modal__title">{selectedItem.name}</h2>
                  <p className="floral-modal__desc">{selectedItem.desc}</p>

                  {/* Bespoke Event Styling Notes */}
                  <div className="floral-care-mini">
                    <h4 className="floral-care-mini__title">Bespoke Styling Care</h4>
                    <ul className="floral-care-mini__list">
                      <li>Includes complete site survey & spatial modeling</li>
                      <li>Fresh florals sourced and conditioned 24h prior</li>
                      <li>On-site setup and post-event teardown included</li>
                    </ul>
                  </div>

                  {/* Inquiry Form */}
                  <div className="floral-booking-panel">
                    <h3 className="floral-booking-title">Inquire for Bespoke Event</h3>
                    
                    {!bookingState.submitted ? (
                      <form className="floral-booking-form" onSubmit={handleBookingSubmit}>
                        <div className="floral-form-group contact-custom-dropdown-container">
                          <label className="floral-form-label">Theme Options</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'theme' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'theme' ? null : 'theme')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {themeOptions.find(opt => opt.value === bookingState.theme)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'theme' && (
                            <ul className="contact-custom-dropdown-list">
                              {themeOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.theme === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, theme: option.value }))
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
                          <label className="floral-form-label">Venue Scale</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'scale' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'scale' ? null : 'scale')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {venueScaleOptions.find(opt => opt.value === bookingState.scale)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'scale' && (
                            <ul className="contact-custom-dropdown-list">
                              {venueScaleOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.scale === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, scale: option.value }))
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
                          <label className="floral-form-label" htmlFor="note-text">Special Design Requests & Details</label>
                          <input 
                            id="note-text"
                            type="text" 
                            className="floral-form-input" 
                            placeholder="Add styling details (e.g. Prefer white hydrangeas, outdoor stage...)" 
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
                          Thank you for choosing Golden. Our event concierge has logged your bespoke customization request for the <strong>{selectedItem.name}</strong>.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
                          Customization details:<br />
                          Theme: <strong>{bookingState.theme}</strong> | Scale: <strong>{bookingState.scale}</strong>
                          {bookingState.message && (
                            <>
                              <br />Requests: <em>"{bookingState.message}"</em>
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
