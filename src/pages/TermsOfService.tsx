import MainLayout from '../layouts/MainLayout'
import '../styles/pages/legal.css'

export default function TermsOfService() {
  return (
    <MainLayout>
      <main className="legal-page legal-page--no-hero">
        <div className="container">
          
          {/* Slim Editorial Header */}
          <div className="editorial-header-slim fade-in-up">
            <span className="editorial-header-slim__subtitle">Boutique Rules</span>
            <h1 className="editorial-header-slim__title">Terms of Service</h1>
            <p className="editorial-header-slim__desc">Last Updated: May 26, 2026</p>
          </div>

          <div className="legal-content fade-in-up stagger-1">
            
            <section className="legal-section">
              <h2 className="legal-section__title">1. Operational Mandates</h2>
              <p className="legal-section__text">
                Welcome to Golden Bouquet. These terms define the operational agreements for utilizing our digital portal, reserving design materials, booking pastry studio commissions, or placing flagship retail orders at Al Mamoura Plaza, Doha, Qatar.
              </p>
              <p className="legal-section__text">
                By purchasing our premium products, you agree to these legal conditions. You must be at least 18 years old or under parental guidance to finalize purchases.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">2. Order Placement, Customizations, & Booking</h2>
              <p className="legal-section__text">
                Since our creations utilize live botanical materials and perishable baking ingredients, specific policies apply:
              </p>
              <ul className="legal-section__list">
                <li><strong>Seasonal Variations:</strong> Floral arrangements are subject to seasonal availability. We reserve the right to substitute flowers of equivalent luxury status and value while matching the color palette.</li>
                <li><strong>Cakes & Delights Reservations:</strong> Custom cakes and specialty baking commissions require a minimum booking window. Changes to designs or cake sizes are not permitted once production begins.</li>
                <li><strong>Accuracy of Information:</strong> You agree to provide exact delivery directions and recipient details. Golden Bouquet is not responsible for logistical delays caused by incorrect coordinates.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">3. Pricing, Payments, & Cancellations</h2>
              <p className="legal-section__text">
                All prices are displayed in Qatari Riyals (QAR) or equivalent denominations and are subject to change based on market rates or seasonal demands (e.g. Valentine's Day or National Holiday events).
              </p>
              <p className="legal-section__text">
                Cancellations or alterations of custom floral arrangements or cake packages must be requested before order preparation begins. Refund credits are issued as store credit vouchers or direct banking reversals at our discretion.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">4. Deliveries, Liability, & Acceptance</h2>
              <p className="legal-section__text">
                We handle shipping through a temperature-controlled logistics network to ensure absolute freshness. Upon handover of flowers or cakes to the recipient, all ownership and liability shift to the purchaser.
              </p>
              <p className="legal-section__text">
                Because of the organic and perishable nature of custom bouquets and gourmet pastries, claims regarding condition or discrepancies must be made within 4 hours of delivery.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">5. Governing Law</h2>
              <p className="legal-section__text">
                These terms, conditions, and operations are governed by the commercial laws of the State of Qatar. Any legal disputes arising from transactions or orders will fall under the exclusive jurisdiction of the courts of Doha, Qatar.
              </p>
            </section>

          </div>

        </div>
      </main>
    </MainLayout>
  )
}
