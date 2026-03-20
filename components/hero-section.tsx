"use client"

import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-20 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Premium Quality Supplements
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              FUEL YOUR{' '}
              <span className="text-primary">POTENTIAL</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0 lg:text-xl">
              Premium protein bars, powders, and creatine crafted for athletes who demand results. 
              No fillers. No compromises. Just pure performance fuel.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 py-4 lg:justify-start">
              <div>
                <p className="text-3xl font-black text-primary">25g+</p>
                <p className="text-sm text-muted-foreground">Protein per serving</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">1g</p>
                <p className="text-sm text-muted-foreground">Sugar per bar</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Happy customers</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="gap-2 bg-primary px-8 text-lg font-bold text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href="#shop">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border px-8 text-lg font-bold text-foreground hover:bg-secondary"
                asChild
              >
                <a href="#about">Learn More</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-1">
                ✓ Free Shipping Over $50
              </span>
              <span className="flex items-center gap-1">
                ✓ 30-Day Guarantee
              </span>
              <span className="flex items-center gap-1">
                ✓ Lab Tested
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square">
              {/* Main Product Image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20" />
              <Image
                src="/products/hero-products.jpg"
                alt="Aevora Nutrition Products"
                fill
                className="rounded-3xl object-cover"
                priority
              />
              
              {/* Floating Cards */}
              <div className="absolute -left-4 bottom-8 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    ★
                  </div>
                  <div>
                    <p className="font-bold text-foreground">4.9/5 Rating</p>
                    <p className="text-sm text-muted-foreground">15,000+ reviews</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-8 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm sm:-right-8">
                <p className="text-sm font-medium text-muted-foreground">Best Seller</p>
                <p className="font-bold text-foreground">Chocolate Fudge Bar</p>
                <p className="text-lg font-black text-primary">$29.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
