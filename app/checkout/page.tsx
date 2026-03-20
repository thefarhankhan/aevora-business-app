"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, Truck, ShoppingBag, Lock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const shipping = totalPrice >= 50 ? 0 : 5.99
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsProcessing(true)
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsProcessing(false)
      setIsComplete(true)
      clearCart()
    }
  }

  if (items.length === 0 && !isComplete) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add some products before checking out</p>
          <Link href="/shop">
            <Button className="mt-6 bg-primary text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
    )
  }

  if (isComplete) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500"
          >
            <Check className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Thank you for your purchase. Your order is on its way!
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Order confirmation sent to your email
          </p>
          <Link href="/shop">
            <Button className="mt-8 bg-primary text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Back link */}
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

            {/* Progress Steps */}
            <div className="mb-8 flex items-center gap-4">
              {[
                { num: 1, label: 'Shipping' },
                { num: 2, label: 'Payment' },
                { num: 3, label: 'Review' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      backgroundColor: step >= s.num ? 'var(--primary)' : 'var(--secondary)',
                      color: step >= s.num ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                  >
                    {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                  </motion.div>
                  <span className={step >= s.num ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                    {s.label}
                  </span>
                  {i < 2 && <div className="h-px w-8 bg-border" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="rounded-xl bg-card p-6">
                      <div className="mb-6 flex items-center gap-3">
                        <Truck className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Shipping Information</h2>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required className="mt-2" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required className="mt-2" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Main St" required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="10001" required className="mt-2" />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary py-6 text-lg text-primary-foreground">
                      Continue to Payment
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="rounded-xl bg-card p-6">
                      <div className="mb-6 flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Payment Details</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="4242 4242 4242 4242" required className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required className="mt-2" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required className="mt-2" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        Your payment information is encrypted and secure
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 py-6"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-primary py-6 text-lg text-primary-foreground">
                        Review Order
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="rounded-xl bg-card p-6">
                      <h2 className="mb-6 text-xl font-bold text-foreground">Review Your Order</h2>
                      
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-secondary">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1 py-6"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-primary py-6 text-lg text-primary-foreground"
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                            />
                            Processing...
                          </span>
                        ) : (
                          `Pay $${total.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-32 rounded-xl bg-card p-6">
              <h2 className="mb-6 text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-border" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : 'text-foreground'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="my-6 border-t border-border" />

              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>

              {totalPrice < 50 && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
