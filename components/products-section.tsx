"use client"

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { products, categories } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)

  return (
    <section id="shop" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-primary">
            Our Products
          </span>
          <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            PERFORMANCE FUEL
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Premium supplements engineered for athletes who want real results
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>
    </section>
  )
}
