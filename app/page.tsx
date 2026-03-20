import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { FeaturesSection } from '@/components/features-section'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <CTASection />
    </main>
  )
}
