import MainLayout from '../layouts/MainLayout'
import '../styles/pages/legal.css'

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <main className="legal-page legal-page--no-hero">
        <div className="container">
          
          {/* Slim Editorial Header */}
          <div className="editorial-header-slim fade-in-up">
            <span className="editorial-header-slim__subtitle">Legal Protection</span>
            <h1 className="editorial-header-slim__title">Privacy Policy</h1>
            <p className="editorial-header-slim__desc">Last Updated: May 26, 2026</p>
          </div>

          <div className="legal-content fade-in-up stagger-1">
            
            <section className="legal-section">
              <h2 className="legal-section__title">1. Introduction & Overview</h2>
              <p className="legal-section__text">
                At Golden Bouquet, we appreciate your trust and are fully committed to protecting your privacy. This policy details how we handle the personal information you share with us when placing floral orders, commissioning event designs, purchasing artisanal celebration cakes, or browsing our digital concierge services.
              </p>
              <p className="legal-section__text">
                By accessing our showroom products or engaging our concierge, you agree to the data collection and application guidelines specified in this privacy agreement.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">2. Information We Collect</h2>
              <p className="legal-section__text">
                To complete luxury commissions and secure delivery coordinates, we collect specific details:
              </p>
              <ul className="legal-section__list">
                <li><strong>Identity Details:</strong> Full name, company affiliation, and delivery recipient designations.</li>
                <li><strong>Contact Information:</strong> Phone numbers, primary email addresses, and geo-delivery directions.</li>
                <li><strong>Inquiry Records:</strong> Floral preferences, event design specifications, date details, and custom messages.</li>
                <li><strong>Payment Transaction Data:</strong> Transaction tokens, invoice details, and billing coordinates (processed through secure payment gates).</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">3. How Your Information is Utilized</h2>
              <p className="legal-section__text">
                Your personal details are processed exclusively for providing premium bespoke designs and smooth logistics:
              </p>
              <ul className="legal-section__list">
                <li>Handcrafting customized rose bouquets, specialized pastry orders, and corporate installations.</li>
                <li>Executing precise delivery coordinates with our premium shipping couriers.</li>
                <li>Sharing order progress updates, reservation changes, and direct concierge notifications.</li>
                <li>Enhancing the luxury layout of our digital platform and analyzing overall usage statistics.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">4. Third-Party Sharing & Secure Protection</h2>
              <p className="legal-section__text">
                We strictly protect your database. Golden Bouquet does not lease, sell, or disclose your personal records to third parties for independent marketing. We share data solely with highly trusted technical partners assisting our operations (e.g. payment processors and premium logistical shipping networks) under secure confidentiality agreements.
              </p>
              <p className="legal-section__text">
                Our digital infrastructure implements SSL encryption and robust database safeguards to keep your sensitive billing and contact info safe.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section__title">5. Your Legal Rights & Choices</h2>
              <p className="legal-section__text">
                You retain absolute control over your digital footprint. You have the right to request access, correction, or permanent removal of the contact details stored in our databases. To exercise these rights, please email us directly at <a href="mailto:info@golden-bouquet.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>info@golden-bouquet.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>
    </MainLayout>
  )
}
