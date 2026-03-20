"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Leaf, Users, Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, fadeUp } from '@/components/page-transition'

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'Every product is rigorously tested for purity, potency, and performance. We never compromise on quality.',
  },
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: 'No artificial fillers, no harmful additives. Just pure, effective nutrition from the best sources.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by athletes, for athletes. Our community shapes everything we create.',
  },
  {
    icon: Award,
    title: 'Science Backed',
    description: 'Every formula is developed with leading nutritionists and backed by clinical research.',
  },
]

const stats = [
  { value: '500K+', label: 'Happy Customers' },
  { value: '50+', label: 'Countries Shipped' },
  { value: '4.9', label: 'Average Rating' },
  { value: '100%', label: 'Satisfaction Rate' },
]

const team = [
  { name: 'Sarah Chen', role: 'CEO & Founder', image: '/products/hero-products.jpg' },
  { name: 'Marcus Johnson', role: 'Head of R&D', image: '/products/hero-products.jpg' },
  { name: 'Emma Williams', role: 'Lead Nutritionist', image: '/products/hero-products.jpg' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Story
            </span>
            <h1 className="mt-6 text-4xl font-black text-foreground md:text-5xl lg:text-6xl">
              Fueling the
              <span className="text-primary"> Future </span>
              of Fitness
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Aevora Nutrition was born from a simple belief: everyone deserves access to 
              premium, clean, and effective supplements without breaking the bank. We&apos;re 
              here to fuel your journey, one scoop at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <span className="text-4xl font-black text-primary md:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Our Mission
              </span>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Making Premium Nutrition Accessible to Everyone
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We believe that achieving your fitness goals shouldn&apos;t require a premium 
                price tag. That&apos;s why we&apos;ve committed to creating supplements that 
                deliver exceptional quality at prices that make sense.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                From our state-of-the-art manufacturing facilities to our rigorous 
                third-party testing, every step of our process is designed to bring 
                you the best possible products.
              </p>
              <Link href="/shop">
                <Button className="mt-8 gap-2 bg-primary text-primary-foreground">
                  Shop Our Products
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src="/products/hero-products.jpg"
                alt="Aevora products"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              Our Core Values
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-xl bg-background p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Meet The Team
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              The People Behind Aevora
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="group overflow-hidden rounded-xl bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join over 500,000 athletes who trust Aevora for their nutrition needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/shop">
                <Button size="lg" className="gap-2 bg-background text-foreground hover:bg-background/90">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
