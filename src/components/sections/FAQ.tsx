import { useEffect, useState } from 'react'
import { faqs } from '../../data/homeData'
import '../../styles/sections/faq.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    const el = document.getElementById('faq')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className={`faq ${visible ? 'visible' : ''}`}>
      <div className="container">
        <header className="faq__header">
          <span className="section-label">Help</span>
          <h2>Frequently Asked Questions</h2>
        </header>
        <div className="faq__list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}>
              <button className="faq__question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {item.q}
                <span className="faq__icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div className="faq__answer">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
