import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { floralCategories, floralItems } from '../data/floralData'
import '../styles/pages/inner-page.css'
import '../styles/pages/floral-essentials.css'
import '../styles/pages/contact.css'

const ribbonOptions = [
  { value: 'Champagne Gold', label: 'Champagne Gold Satin' },
  { value: 'Sage Green', label: 'Sage Green Velvet' },
  { value: 'Velvet Pink', label: 'Velvet Rose Pink' },
  { value: 'Classic Silk', label: 'Classic Silk Ivory' },
]

const baseOptions = [
  { value: 'Crystal Vase', label: 'Classic Hand-Blown Crystal Vase' },
  { value: 'Signature Cloche', label: 'Exclusive Preserved Glass Cloche' },
  { value: 'Premium Box', label: 'Elegant Gold Embossed Hat Box' },
]

// Custom Care Guides Data
const careGuides = [
  {
    id: 'roses',
    title: 'Signature Roses Preservation Guide',
    icon: '🌹',
    content: 'To maximize the beauty of our premium luxury roses, trim the stems diagonally at a 45-degree angle before placing them in a clean vase. Use lukewarm water mixed with the provided flower food. Keep them away from direct sunlight, air currents, and ripening fruits which produce ethylene. Re-trim stems and change water every 1-2 days.'
  },
  {
    id: 'orchids',
    title: 'Exotic Orchids Care & Longevity Secrets',
    icon: '🌸',
    content: 'Orchids thrive in indirect bright light and high humidity. Water them sparingly—typically once a week—allowing the potting medium to dry slightly between waterings. Avoid letting water gather in the leaf joints. Mist the aerial roots regularly and maintain a ambient temperature between 18°C and 25°C for optimal petal display.'
  },
  {
    id: 'lilies-tulips',
    title: 'Spring Blooms (Lilies & Tulips) Freshness Guide',
    icon: '💐',
    content: 'Lilies and Tulips love cold water. Fill your vase with cold tap water and remove any leaves that will sit below the waterline to prevent bacterial growth. As lilies bloom, gently pinch off the pollen-bearing anthers to prevent staining and extend the vase life. Keep tulips in a tall vase as their stems can continue growing towards light.'
  }
]

interface FloralItem {
  id: number
  name: string
  category: string
  desc: string
  image: string
}

export default function FloralEssentials() {
  // State variables for search, sort, filter, and modals
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<FloralItem | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'ribbon' | 'base' | null>(null)

  // Custom commission form state inside product modal
  const [bookingState, setBookingState] = useState({
    ribbon: 'Champagne Gold',
    base: 'Crystal Vase',
    message: '',
    submitted: false,
    reference: ''
  })

  // Bespoke Bouquet Studio Customizer state
  const [studioState, setStudioState] = useState({
    flowerBase: 'Red Roses',
    wrapStyle: 'Velvet Wrap',
    accents: 'Dried Eucalyptus',
    submitted: false,
    reference: ''
  })

  // State for Care Accordion
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  // Dynamic counts for category buttons
  const getCategoryCount = (category: string) => {
    if (category === 'All') return floralItems.length
    return floralItems.filter(item => item.category === category).length
  }

  // Handle Search & Filter logic
  const filteredItems = floralItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Open modal and reset modal commission state
  const handleOpenItem = (item: FloralItem) => {
    setSelectedItem(item)
    setOpenDropdown(null)
    setBookingState({
      ribbon: 'Champagne Gold',
      base: 'Crystal Vase',
      message: '',
      submitted: false,
      reference: ''
    })
  }

  // Handle modal bespoke form submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomRef = `GLD-FLR-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Bespoke Order Inquiry: ${selectedItem?.name} (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I would like to place a bespoke order inquiry for:\n` +
      `- Item Name: ${selectedItem?.name}\n` +
      `- Ribbon Customization: ${bookingState.ribbon}\n` +
      `- Presentation Base: ${bookingState.base}\n` +
      `- Inquiry Reference: ${randomRef}\n\n` +
      `Calligraphy Message:\n` +
      `"${bookingState.message || 'None provided'}"\n\n` +
      `--- Additional Customer Notes ---\n` +
      `[Write your additional comments here]\n\n` +
      `Thank you.`
    )

    setTimeout(() => {
      window.location.href = `mailto:info@golden-bouquet.com?subject=${subject}&body=${body}`
    }, 800)
  }

  // Handle Bouquet Studio form submit
  const handleStudioSubmit = () => {
    const randomRef = `GLD-STUDIO-${Math.floor(1000 + Math.random() * 9000)}`
    setStudioState(prev => ({
      ...prev,
      submitted: true,
      reference: randomRef
    }))

    const subject = encodeURIComponent(`Bespoke Studio Customizer: Bouquet Design (${randomRef})`)
    const body = encodeURIComponent(
      `Hello Golden Bouquet Concierge,\n\n` +
      `I have customized a signature bouquet layout in the Bouquet Studio:\n` +
      `- Flower Base: ${studioState.flowerBase}\n` +
      `- Wrap Style: ${studioState.wrapStyle}\n` +
      `- Premium Accent: ${studioState.accents}\n` +
      `- Design Reference: ${randomRef}\n\n` +
      `--- Additional Customer Notes ---\n` +
      `[Write your additional comments here]\n\n` +
      `Thank you.`
    )

    setTimeout(() => {
      window.location.href = `mailto:info@golden-bouquet.com?subject=${subject}&body=${body}`
    }, 800)
  }

  // Get elegant exclusive badges for items
  const getItemBadge = (name: string) => {
    const featuredBadges: Record<string, string> = {
      'White Roses': 'Best Seller',
      'Classic Red Roses': 'Collector\'s Choice',
      'Mixed Spring Bouquet': 'Signature Style',
    }

    return featuredBadges[name] ?? null
  }

  return (
    <MainLayout>
      <main className="floral-essentials-page floral-page--no-hero">
        {/* Filters and Controls */}
        <section className="floral-controls-container">
          <div className="container">
            
            {/* Slim Editorial Header */}
            <div className="editorial-header-slim">
              <span className="editorial-header-slim__subtitle">Signature Botanical Designs</span>
              <h1 className="editorial-header-slim__title">Floral Essentials</h1>
              <p className="editorial-header-slim__desc">Fresh, hand-curated floral arrangements crafted by master artisans to elevate your space.</p>
            </div>
            
            {/* Combined Controls Panel in a Single Horizontal Row */}
            <div className="floral-controls-panel">
              {/* Category filters on the left as square rectangular buttons */}
              <div className="floral-categories-flat">
                {floralCategories.map(category => {
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

              {/* Right side: Search and Sort controls */}
              <div className="floral-actions-right">
                {/* Search field */}
                <div className="floral-search-wrapper">
                  <input 
                    type="text" 
                    className="floral-search-input" 
                    placeholder="Search arrangements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search arrangements"
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
              {filteredItems.map((item) => {
                const badge = getItemBadge(item.name)
                return (
                  <article 
                    key={item.id} 
                    className="editorial-card"
                    onClick={() => handleOpenItem(item)}
                  >
                    {/* Image container */}
                    <div className="editorial-card__image-container">
                      {badge && (
                        <span className="editorial-card__badge">{badge}</span>
                      )}
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
                )
              })}
            </div>
          </div>
        </section>

        {/* Interactive Full-Width "Bespoke Arrangement Studio" Customizer */}
        <section className="bespoke-studio-section">
          <div className="container">
            <div className="bespoke-studio__header">
              <span className="bespoke-studio__tag">Creative Botanical Studio</span>
              <h2 className="bespoke-studio__title">Bespoke Arrangement Customizer</h2>
              <p className="bespoke-studio__desc">
                Design your own signature bouquet by selecting high-end base elements, luxury wraps, and artistic botanical accents. Our master florists will craft it to perfection.
              </p>
            </div>

              {!studioState.submitted ? (
                <div className="bespoke-studio__grid">
                  <div className="bespoke-studio__steps">
                    {/* Step 1: Base Flower */}
                    <div className="bespoke-step">
                      <h3 className="bespoke-step__title">
                        <span className="bespoke-step__num">1</span>
                        Select Flower Base
                      </h3>
                      <div className="bespoke-options">
                        {[
                          { name: 'Red Roses', emoji: '🌹' },
                          { name: 'White Orchids', emoji: '🌸' },
                          { name: 'Spring Lilies', emoji: '💐' }
                        ].map(opt => (
                          <div 
                            key={opt.name}
                            className={`bespoke-option-card ${studioState.flowerBase === opt.name ? 'active' : ''}`}
                            onClick={() => setStudioState(prev => ({ ...prev, flowerBase: opt.name }))}
                          >
                            <span className="bespoke-option-card__emoji">{opt.emoji}</span>
                            <span className="bespoke-option-card__name">{opt.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Wrap wrapping */}
                    <div className="bespoke-step">
                      <h3 className="bespoke-step__title">
                        <span className="bespoke-step__num">2</span>
                        Select Luxury Wrap
                      </h3>
                      <div className="bespoke-options">
                        {[
                          { name: 'Velvet Wrap', emoji: '🎀' },
                          { name: 'Vintage Kraft', emoji: '📜' },
                          { name: 'Glass Cloche', emoji: '🔮' }
                        ].map(opt => (
                          <div 
                            key={opt.name}
                            className={`bespoke-option-card ${studioState.wrapStyle === opt.name ? 'active' : ''}`}
                            onClick={() => setStudioState(prev => ({ ...prev, wrapStyle: opt.name }))}
                          >
                            <span className="bespoke-option-card__emoji">{opt.emoji}</span>
                            <span className="bespoke-option-card__name">{opt.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Accents */}
                    <div className="bespoke-step">
                      <h3 className="bespoke-step__title">
                        <span className="bespoke-step__num">3</span>
                        Select Premium Accent
                      </h3>
                      <div className="bespoke-options">
                        {[
                          { name: 'Gold Leaf Flakes', emoji: '✨' },
                          { name: 'Dried Eucalyptus', emoji: '🍃' },
                          { name: 'Cotton Stems', emoji: '🌾' }
                        ].map(opt => (
                          <div 
                            key={opt.name}
                            className={`bespoke-option-card ${studioState.accents === opt.name ? 'active' : ''}`}
                            onClick={() => setStudioState(prev => ({ ...prev, accents: opt.name }))}
                          >
                            <span className="bespoke-option-card__emoji">{opt.emoji}</span>
                            <span className="bespoke-option-card__name">{opt.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bespoke-studio__summary-card">
                    <h3 className="bespoke-summary__title">Your Custom Arrangement</h3>
                    <div className="bespoke-summary__specs">
                      <div className="bespoke-spec-item">
                        <span className="bespoke-spec-item__label">Botanical Base:</span>
                        <span className="bespoke-spec-item__val">{studioState.flowerBase}</span>
                      </div>
                      <div className="bespoke-spec-item">
                        <span className="bespoke-spec-item__label">Luxury Presentation:</span>
                        <span className="bespoke-spec-item__val">{studioState.wrapStyle}</span>
                      </div>
                      <div className="bespoke-spec-item">
                        <span className="bespoke-spec-item__label">Artistic Accent:</span>
                        <span className="bespoke-spec-item__val">{studioState.accents}</span>
                      </div>
                      <div className="bespoke-spec-item" style={{ borderTop: '1px solid rgba(181, 154, 93, 0.2)', paddingTop: '12px', marginTop: '4px' }}>
                        <span className="bespoke-spec-item__label" style={{ color: 'var(--white)' }}>Commission Level:</span>
                        <span className="bespoke-spec-item__val" style={{ color: 'var(--gold)', fontWeight: 600 }}>Masterpiece</span>
                      </div>
                    </div>
                    <button 
                      className="bespoke-studio__submit-btn"
                      onClick={handleStudioSubmit}
                    >
                      Inquire Custom Design
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="bespoke-studio__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4>Arrangement Design Submitted</h4>
                  <p>
                    Thank you! Your custom configuration featuring <strong>{studioState.flowerBase}</strong> wrapped in <strong>{studioState.wrapStyle}</strong> with <strong>{studioState.accents}</strong> has been transmitted to our master florist concierge.
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--white)', opacity: 0.8, marginBottom: '24px' }}>
                    Reference ID: <strong>{studioState.reference}</strong>
                  </p>
                  <button 
                    className="floral-submit-btn" 
                    onClick={() => setStudioState(prev => ({ ...prev, submitted: false }))}
                    style={{ borderColor: 'var(--gold)', color: 'var(--white)', background: 'transparent' }}
                  >
                    Design Another Arrangement
                  </button>
                </motion.div>
              )}
            </div>
          </section>

        {/* Botanical Care Accordions FAQ */}
        <section className="care-accordion-section">
          <div className="container">
            <h2 className="care-section-title">The Art of Floral Care</h2>
            <p className="care-section-subtitle">
              Preserve the majesty and longevity of your hand-gathered arrangements with our professional care guidelines.
            </p>

            <div className="care-accordion">
              {careGuides.map(guide => {
                const isOpen = openAccordion === guide.id
                return (
                  <div 
                    key={guide.id} 
                    className={`care-accordion-item ${isOpen ? 'open' : ''}`}
                  >
                    <button 
                      className="care-accordion-trigger"
                      onClick={() => setOpenAccordion(isOpen ? null : guide.id)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="care-accordion-title">
                        <span className="care-accordion-title-icon">{guide.icon}</span>
                        {guide.title}
                      </h3>
                      <span className="care-accordion-arrow">
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          className="care-accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{guide.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
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

                  {/* Botanical Care Tips summary */}
                  <div className="floral-care-mini">
                    <h4 className="floral-care-mini__title">Botanical Care Notes</h4>
                    <ul className="floral-care-mini__list">
                      <li>Keep in temperate conditions (18°C–22°C)</li>
                      <li>Trim stem end diagonally every 2 days</li>
                      <li>Replenish with cold, clean water regularly</li>
                    </ul>
                  </div>

                  {/* Bespoke commission form */}
                  <div className="floral-booking-panel">
                    <h3 className="floral-booking-title">Inquire for Bespoke Order</h3>
                    
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
                          <label className="floral-form-label">Presentation Base</label>
                          <div
                            className={`contact-custom-dropdown-trigger has-value ${openDropdown === 'base' ? 'is-active' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'base' ? null : 'base')}
                          >
                            <span className="contact-custom-dropdown-selected">
                              {baseOptions.find(opt => opt.value === bookingState.base)?.label}
                            </span>
                            <span className="contact-custom-dropdown-chevron">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </div>
                          {openDropdown === 'base' && (
                            <ul className="contact-custom-dropdown-list">
                              {baseOptions.map(option => (
                                <li
                                  key={option.value}
                                  className={`contact-custom-dropdown-option ${bookingState.base === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    setBookingState(prev => ({ ...prev, base: option.value }))
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
                            placeholder="Add your greeting (e.g. Happy Anniversary my love...)" 
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
                          Thank you for choosing Golden. Our botanical concierge has logged your bespoke customization request for the <strong>{selectedItem.name}</strong>.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
                          Customization details:<br />
                          Ribbon: <strong>{bookingState.ribbon}</strong> | Base: <strong>{bookingState.base}</strong>
                          {bookingState.message && (
                            <>
                              <br />Greeting: <em>"{bookingState.message}"</em>
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
