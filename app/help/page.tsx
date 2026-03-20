"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Package, CreditCard, Truck, RotateCcw, 
  Shield, Users, MessageCircle, ChevronDown, ChevronRight,
  HelpCircle, FileText, Headphones
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const categories = [
  {
    icon: Package,
    title: 'Orders & Shipping',
    description: 'Track orders, shipping info, delivery times',
    articles: [
      'How do I track my order?',
      'What are the shipping options?',
      'International shipping availability',
      'Order processing times',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payments & Billing',
    description: 'Payment methods, invoices, promo codes',
    articles: [
      'Accepted payment methods',
      'How to apply a promo code',
      'Request an invoice',
      'Payment security information',
    ],
  },
  {
    icon: RotateCcw,
    title: 'Returns & Refunds',
    description: 'Return policy, how to return, refund status',
    articles: [
      'Return policy overview',
      'How to initiate a return',
      'Refund processing times',
      'Exchange policy',
    ],
  },
  {
    icon: Shield,
    title: 'Product Information',
    description: 'Ingredients, certifications, usage',
    articles: [
      'Ingredient lists and allergens',
      'Third-party testing certificates',
      'Recommended usage and dosage',
      'Product expiration dates',
    ],
  },
  {
    icon: Users,
    title: 'Account & Subscriptions',
    description: 'Manage account, subscriptions, preferences',
    articles: [
      'Create or update your account',
      'Manage subscription orders',
      'Update payment information',
      'Email preferences',
    ],
  },
  {
    icon: MessageCircle,
    title: 'Contact Support',
    description: 'Get in touch with our team',
    articles: [
      'Chat with support',
      'Email support',
      'Phone support hours',
      'Social media support',
    ],
  },
]

const popularArticles = [
  { title: 'How do I track my order?', category: 'Orders' },
  { title: 'What is your return policy?', category: 'Returns' },
  { title: 'Are your products third-party tested?', category: 'Products' },
  { title: 'How do I cancel or modify my order?', category: 'Orders' },
  { title: 'Shipping costs and delivery times', category: 'Shipping' },
]

const faqData = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within the continental US. Express shipping (1-2 days) and international shipping are also available. Orders placed before 2 PM EST ship the same day.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all unopened products. If you\'re not satisfied with your purchase, contact our support team to initiate a return. Opened products may be eligible for a partial refund on a case-by-case basis.',
  },
  {
    question: 'Are your products safe and tested?',
    answer: 'Absolutely! All Aevora products undergo rigorous third-party testing for purity, potency, and safety. We test for heavy metals, microbes, and verify ingredient accuracy. Certificates of analysis are available upon request.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'You can cancel or modify your order within 1 hour of placing it by contacting our support team. After this window, orders enter processing and cannot be changed. For subscription orders, you can modify them up to 24 hours before the next charge date.',
  },
  {
    question: 'Do you offer subscriptions?',
    answer: 'Yes! Subscribe & Save offers 15% off every order plus free shipping. You can customize delivery frequency (monthly, bi-monthly, or quarterly), skip deliveries, or cancel anytime from your account dashboard.',
  },
  {
    question: 'How should I store my supplements?',
    answer: 'Store products in a cool, dry place away from direct sunlight. Keep containers tightly sealed after each use. Most products have a shelf life of 2 years from the manufacturing date. Check the expiration date on your product packaging.',
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      {/* Hero with Search */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-6 text-4xl font-black text-foreground md:text-5xl">
              How Can We Help?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularArticles.slice(0, 4).map((article) => (
              <button
                key={article.title}
                className="rounded-full bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {article.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-2xl font-bold text-foreground"
          >
            Browse by Category
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer rounded-xl bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <category.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {category.articles.slice(0, 3).map((article) => (
                    <button
                      key={article}
                      className="flex w-full items-center gap-2 text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ChevronRight className="h-4 w-4" />
                      {article}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <FileText className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-xl bg-background"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-6 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-primary p-8 md:p-12"
          >
            <Headphones className="mx-auto h-12 w-12 text-primary-foreground" />
            <h2 className="mt-4 text-2xl font-bold text-primary-foreground md:text-3xl">
              Still Need Help?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Our support team is available Monday - Friday, 9AM - 6PM EST
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-2 bg-background text-foreground hover:bg-background/90">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
