"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -left-20 top-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute -right-20 bottom-20 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Premium Quality Supplements
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-balance text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              FUEL YOUR{' '}
              <span className="text-primary">POTENTIAL</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0 lg:text-xl"
            >
              Premium protein bars, powders, and creatine crafted for athletes who demand results. 
              No fillers. No compromises. Just pure performance fuel.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 py-4 lg:justify-start"
            >
              {[
                { value: '25g+', label: 'Protein per serving' },
                { value: '1g', label: 'Sugar per bar' },
                { value: '50K+', label: 'Happy customers' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="gap-2 bg-primary px-8 text-lg font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-border px-8 text-lg font-bold text-foreground hover:bg-secondary"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start"
            >
              <span className="flex items-center gap-1">
                ✓ Free Shipping Over $50
              </span>
              <span className="flex items-center gap-1">
                ✓ 30-Day Guarantee
              </span>
              <span className="flex items-center gap-1">
                ✓ Lab Tested
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
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
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 100 }}
                className="absolute -left-4 bottom-8 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm sm:-left-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    ★
                  </div>
                  <div>
                    <p className="font-bold text-foreground">4.9/5 Rating</p>
                    <p className="text-sm text-muted-foreground">15,000+ reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.6, type: 'spring', stiffness: 100 }}
                className="absolute -right-4 top-8 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm sm:-right-8"
              >
                <p className="text-sm font-medium text-muted-foreground">Best Seller</p>
                <p className="font-bold text-foreground">Chocolate Fudge Bar</p>
                <p className="text-lg font-black text-primary">$29.99</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
