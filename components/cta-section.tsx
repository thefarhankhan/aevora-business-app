import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/30 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-card p-8 text-center lg:p-16">
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Limited Time Offer
          </span>

          {/* Headline */}
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            GET 20% OFF YOUR FIRST ORDER
          </h2>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Join 50,000+ athletes who fuel their workouts with Aevora. 
            Use code <span className="font-bold text-primary">FUEL20</span> at checkout.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 bg-primary px-10 text-lg font-bold text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#shop">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">✓</span>
              Free Shipping
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">✓</span>
              30-Day Money Back
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">✓</span>
              Secure Checkout
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
