import '../../styles/sections/social-proof.css'

export default function SocialProof() {
  return (
    <section className="social-proof">
      <div className="social-proof__container container">
        <div className="social-proof__stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="social-proof__star">
              ★
            </span>
          ))}
          <span className="social-proof__rating">5.0</span>
        </div>
        <p className="social-proof__text">Trusted by discerning clients worldwide</p>
      </div>
    </section>
  )
}
