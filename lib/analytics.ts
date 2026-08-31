"use client"

import type { CartItem, Product } from "@/lib/cart-context"

type AnalyticsParams = Record<string, unknown>

const itemFromProduct = (product: Product, quantity = 1) => ({
  item_id: product.id,
  item_name: product.name,
  item_category: product.category,
  item_variant: product.flavor || product.weight,
  price: product.price,
  quantity,
})

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return

  const event = { event: name, ...params }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)

}

export function trackProductView(product: Product) {
  trackEvent("view_item", {
    ecommerce: {
      currency: "USD",
      value: product.price,
      items: [itemFromProduct(product)],
    },
  })
}

export function trackAddToCart(product: Product, quantity = 1) {
  trackEvent("add_to_cart", {
    ecommerce: {
      currency: "USD",
      value: product.price * quantity,
      items: [itemFromProduct(product, quantity)],
    },
  })
}

export function trackCheckout(items: CartItem[], total: number) {
  trackEvent("begin_checkout", {
    ecommerce: {
      currency: "USD",
      value: total,
      items: items.map((item) => itemFromProduct(item, item.quantity)),
    },
  })
}

export function trackPurchase(items: CartItem[], total: number) {
  trackEvent("purchase", {
    ecommerce: {
      transaction_id: `order-${Date.now()}`,
      currency: "USD",
      value: total,
      items: items.map((item) => itemFromProduct(item, item.quantity)),
    },
  })
}
