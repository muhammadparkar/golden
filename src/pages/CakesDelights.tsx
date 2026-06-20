import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { cakesCategories, cakesItems } from '../data/cakesData'
import '../styles/pages/floral-essentials.css'
import '../styles/pages/contact.css'

const sizeOptions = [
  { value: '0.5 Kg', label: '0.5 Kg' },
  { value: '1 Kg', label: '1 Kg' },
  { value: '1.5 Kg', label: '1.5 Kg' },
  { value: '2 Kg', label: '2 Kg' },
]

const frostingOptions = [
  { value: 'Buttercream', label: 'Classic Buttercream' },
  { value: 'Whipped Cream', label: 'Light Whipped Cream' },
  { value: 'Fondant', label: 'Smooth Fondant' },
  { value: 'Ganache', label: 'Rich Ganache Glaze' },
]

interface CakeItem {
  id: number
  name: string
  category: string
  desc: string
  image: string
}

export default function CakesDelights() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<CakeItem | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'size' | 'frosting' | null>(null)

  // Custom order form state inside product modal
  const [bookingState, setBookingState] = useState({
    size: '1 Kg',
    frosting: 'Buttercream',
    message: '',
    submitted: false,
    reference: ''
  })

  const filteredItems = cakesItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Open modal and reset modal order state
  const handleOpenItem = (item: CakeItem) => {
    setSelectedItem(item)
    setOpenDropdown(null)
    setBookingState({
      size: '1 Kg',
      frosting: 'Buttercream',
      message: '',
      submitted: false,
      reference: ''
    })
  }

  // Handle modal order form submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomRef = `GLD-CAKE-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Bespoke Cakes & Delights Inquiry: ${selectedItem?.name} (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I would like to inquire about ordering the following custom cake:\n` +
      `- Cake Name: ${selectedItem?.name}\n` +
      `- Size: ${bookingState.size}\n` +
      `- Frosting: ${bookingState.frosting}\n` +
      `- Inquiry Reference: ${randomRef}\n\n` +
      `Cake Topper Message:\n` +
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
              <span className="editorial-header-slim__subtitle">Artisanal Baking Studio</span>
              <h1 className="editorial-header-slim__title">Cakes & Delights</h1>
              <p className="editorial-header-slim__desc">Decadent, masterfully layered pastries and gourmet cakes baked for milestone celebrations.</p>
            </div>

            {/* Combined Controls Panel in a Single Horizontal Row */}
            <div className="floral-controls-panel">
              {/* Category filters on the left as square rectangular buttons */}
              <div className="floral-categories-flat">
                {cakesCategories.map(category => {
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

              {/* Right side: Search input only */}
              <div className="floral-actions-right">
                <div className="floral-search-wrapper">
                  <input
                    type="text"
                    className="floral-search-input"
                    placeholder="Search delights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search delights"
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
                      Inquire Details
                      <span className="editorial-card__btn-arrow">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* Quick View Drawer / Modal */}
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

                {/* Right Side: Details and Order Form */}
                <div className="floral-modal__right">
                  <span className="floral-modal__category">{selectedItem.category}</span>
                  <h2 className="floral-modal__title">{selectedItem.name}</h2>
                  <p className="floral-modal__desc">{selectedItem.desc}</p>

                  {/* Custom order form */}
                  <div className="floral-booking-panel">
                    <h3 className="floral-booking-title">Inquire for Custom Order</h3>

                    {!bookingState.submitted ? (
                      <form className="floral-booking-form" onSubmit={handleBookingSubmit}>
                        <div className="floral-form-group contact-custom-dropdown-container">
                          <label className="floral-form-label">Cake Size</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'size' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'size' ? null : 'size')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {sizeOptions.find(opt => opt.value === bookingState.size)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'size' && (
                            <ul className="contact-custom-dropdown-list">
                              {sizeOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.size === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, size: option.value }))
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
                          <label className="floral-form-label">Frosting Style</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'frosting' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'frosting' ? null : 'frosting')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {frostingOptions.find(opt => opt.value === bookingState.frosting)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'frosting' && (
                            <ul className="contact-custom-dropdown-list">
                              {frostingOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.frosting === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, frosting: option.value }))
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
                          <label className="floral-form-label" htmlFor="note-text">Cake Topper Message</label>
                          <input
                            id="note-text"
                            type="text"
                            className="floral-form-input"
                            placeholder="Add your message (e.g. Happy Birthday Sarah!)"
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
                          Thank you for choosing Golden. Our baking concierge has logged your custom order request for the <strong>{selectedItem.name}</strong>.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
                          Order details:<br />
                          Size: <strong>{bookingState.size}</strong> | Frosting: <strong>{bookingState.frosting}</strong>
                          {bookingState.message && (
                            <>
                              <br />Topper Message: <em>"{bookingState.message}"</em>
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
