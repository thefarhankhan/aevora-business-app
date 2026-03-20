import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { FeaturesSection } from '@/components/features-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
