import MainLayout from '../layouts/MainLayout'
import Hero from '../components/sections/Hero'
import FeaturedArrangements from '../components/sections/FeaturedArrangements'
import OccasionsCarousel from '../components/sections/OccasionsCarousel'
import GiftIdeasSlider from '../components/sections/GiftIdeasSlider'
import SocialProof from '../components/sections/SocialProof'
import Products from '../components/sections/Products'
import Lifestyle from '../components/sections/Lifestyle'
import Newsletter from '../components/sections/Newsletter'
import Trending from '../components/sections/Trending'
import Blog from '../components/sections/Blog'
import FAQ from '../components/sections/FAQ'
import TrustBadges from '../components/sections/TrustBadges'

export default function HomePage() {
  return (
    <MainLayout>
      <main>
        <Hero />
        <FeaturedArrangements />
        <OccasionsCarousel />
        <GiftIdeasSlider />
        <SocialProof />
        <Products />
        <Lifestyle />
        <Newsletter />
        <Trending />
        <Blog />
        <FAQ />
        <TrustBadges />
      </main>
    </MainLayout>
  )
}
