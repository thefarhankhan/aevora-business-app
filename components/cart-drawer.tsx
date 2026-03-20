"use client"

import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
            {totalItems > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-secondary p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add some products to get started
                </p>
              </div>
              <Button onClick={closeCart} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg bg-secondary/50 p-4"
                >
                  {/* Item Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        {item.flavor && (
                          <p className="text-xs text-muted-foreground">{item.flavor}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-bold text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90"
            >
              Checkout
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free shipping on orders over $50
            </p>
          </div>
        )}
      </div>
    </>
  )
}
