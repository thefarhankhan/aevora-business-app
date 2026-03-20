"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'support@aevoranutition.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri, 9AM-6PM EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Fitness Street',
    description: 'New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Fri: 9AM - 6PM',
    description: 'Sat: 10AM - 4PM',
  },
]

const faqItems = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all unopened products. Simply contact us to initiate a return.',
  },
  {
    question: 'Are your products third-party tested?',
    answer: 'Yes! All our products undergo rigorous third-party testing for purity, potency, and safety.',
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      {/* Hero */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Get In Touch
            </span>
            <h1 className="mt-6 text-4xl font-black text-foreground md:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question about our products? Need help with an order? 
              Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="rounded-xl bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{info.title}</h3>
                <p className="mt-1 font-medium text-foreground">{info.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-card p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500"
                  >
                    <Check className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      required
                      className="mt-2 min-h-[150px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-primary py-6 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="mt-2 text-muted-foreground">
                Find quick answers to common questions
              </p>

              <div className="mt-8 space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={item.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="rounded-xl bg-card p-6"
                  >
                    <h3 className="font-bold text-foreground">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-primary/10 p-6">
                <h3 className="font-bold text-foreground">Need More Help?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check out our comprehensive help center for detailed guides and tutorials.
                </p>
                <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                  Visit Help Center →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
