import { useEffect, useState } from 'react'
import { blogPosts } from '../../data/homeData'
import '../../styles/sections/blog.css'

export default function Blog() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    const el = document.getElementById('blog')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="blog" className={`blog ${visible ? 'visible' : ''}`}>
      <div className="container">
        <header className="blog__header">
          <span className="section-label">Stories</span>
          <h2>Petals & Press</h2>
        </header>
        <div className="blog__grid">
          {blogPosts.map((post, i) => (
            <article key={post.title} className={`blog__post fade-in-up stagger-${i + 1}`}>
              <img src={post.image} alt={post.title} loading="lazy" />
              <span className="blog__date">{post.date}</span>
              <h4>{post.title}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
