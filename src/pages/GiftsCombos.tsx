import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { giftsCategories, giftsItems } from '../data/giftsData'
import '../styles/pages/inner-page.css'
import '../styles/pages/floral-essentials.css'
import '../styles/pages/contact.css'

const ribbonOptions = [
  { value: 'Champagne Gold', label: 'Champagne Gold Satin' },
  { value: 'Sage Green', label: 'Sage Green Velvet' },
  { value: 'Velvet Pink', label: 'Velvet Rose Pink' },
  { value: 'Classic Silk', label: 'Classic Silk Ivory' },
]

const boxOptions = [
  { value: 'Gold Hat Box', label: 'Signature Gold Embossed Hat Box' },
  { value: 'Premium Wooden Crate', label: 'Artisanal Cedarwood Crate' },
  { value: 'Eco Matte Box', label: 'Eco-Friendly Luxury Matte Box' },
]

interface GiftsItem {
  id: number
  name: string
  category: string
  desc: string
  image: string
}

export default function GiftsCombos() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<GiftsItem | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'ribbon' | 'box' | null>(null)

  const [bookingState, setBookingState] = useState({
    ribbon: 'Champagne Gold',
    box: 'Gold Hat Box',
    message: '',
    submitted: false,
    reference: ''
  })

  const getCategoryCount = (category: string) => {
    if (category === 'All') return giftsItems.length
    return giftsItems.filter(item => item.category === category).length
  }

  const filteredItems = giftsItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleOpenItem = (item: GiftsItem) => {
    setSelectedItem(item)
    setOpenDropdown(null)
    setBookingState({
      ribbon: 'Champagne Gold',
      box: 'Gold Hat Box',
      message: '',
      submitted: false,
      reference: ''
    })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomRef = `GLD-GFT-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Bespoke Gift Combo Inquiry: ${selectedItem?.name} (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I would like to inquire about booking the following gift combo:\n` +
      `- Combo Name: ${selectedItem?.name}\n` +
      `- Ribbon Customization: ${bookingState.ribbon}\n` +
      `- Box Presentation: ${bookingState.box}\n` +
      `- Inquiry Reference: ${randomRef}\n\n` +
      `Greeting Card Calligraphy:\n` +
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
              <span className="editorial-header-slim__subtitle">Curated Gift Sets</span>
              <h1 className="editorial-header-slim__title">Gifts & Combos</h1>
              <p className="editorial-header-slim__desc">Perfect pairings of fresh flowers, luxury treats, and custom hampers curated for timeless gifting.</p>
            </div>
            
            {/* Combined Controls Panel in a Single Horizontal Row */}
            <div className="floral-controls-panel">
              {/* Category filters on the left as square rectangular buttons */}
              <div className="floral-categories-flat">
                {giftsCategories.map(category => {
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
                    placeholder="Search combos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search combos"
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

                {/* Right Side: Details and Booking Form */}
                <div className="floral-modal__right">
                  <span className="floral-modal__category">{selectedItem.category}</span>
                  <h2 className="floral-modal__title">{selectedItem.name}</h2>
                  <p className="floral-modal__desc">{selectedItem.desc}</p>

                  {/* Botanical Care Tips summary */}
                  <div className="floral-care-mini">
                    <h4 className="floral-care-mini__title">Gift Presentation & Care</h4>
                    <ul className="floral-care-mini__list">
                      <li>Luxury gold embossed packaging included</li>
                      <li>Includes standard handwritten calligraphy card</li>
                      <li>Store in a cool, dry place out of direct sunlight</li>
                    </ul>
                  </div>

                  {/* Bespoke commission form */}
                  <div className="floral-booking-panel">
                    <h3 className="floral-booking-title">Inquire for Custom Gift</h3>
                    
                    {!bookingState.submitted ? (
                      <form className="floral-booking-form" onSubmit={handleBookingSubmit}>
                        <div className="floral-form-group contact-custom-dropdown-container">
                          <label className="floral-form-label">Luxury Ribbon Wrapping</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'ribbon' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'ribbon' ? null : 'ribbon')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {ribbonOptions.find(opt => opt.value === bookingState.ribbon)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'ribbon' && (
                            <ul className="contact-custom-dropdown-list">
                              {ribbonOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.ribbon === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, ribbon: option.value }))
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
                          <label className="floral-form-label">Presentation Box Style</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'box' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'box' ? null : 'box')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {boxOptions.find(opt => opt.value === bookingState.box)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'box' && (
                            <ul className="contact-custom-dropdown-list">
                              {boxOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.box === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, box: option.value }))
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
                          <label className="floral-form-label" htmlFor="note-text">Handwritten Calligraphy Card Message</label>
                          <input 
                            id="note-text"
                            type="text" 
                            className="floral-form-input" 
                            placeholder="Add your greeting (e.g. Happy Birthday, celebrate in style!)" 
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
                          Thank you for choosing Golden. Our gifting concierge has logged your custom request for the <strong>{selectedItem.name}</strong>.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
                          Customization details:<br />
                          Ribbon: <strong>{bookingState.ribbon}</strong> | Box: <strong>{bookingState.box}</strong>
                          {bookingState.message && (
                            <>
                              <br />Greeting: <em>"{bookingState.message}"</em>
                            </>
                          )}
                        </p>
                        <p style={{ marginTop: '12px', fontWeight: 600, fontSize: '0.8125rem' }}>
                          Inquiry Reference: {bookingState.reference}
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
