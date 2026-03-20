"use client"

import Image from 'next/image'
import { Star, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, type Product } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const badgeColors: Record<string, string> = {
    'Best Seller': 'bg-primary text-primary-foreground',
    'New': 'bg-accent text-accent-foreground',
    'Top Rated': 'bg-primary text-primary-foreground',
    'Best Value': 'bg-accent text-accent-foreground',
    'Vegan': 'bg-green-500 text-white',
    'Premium': 'bg-amber-500 text-black',
    'New Formula': 'bg-accent text-accent-foreground',
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Badge */}
        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
              badgeColors[product.badge] || 'bg-primary text-primary-foreground'
            )}
          >
            {product.badge}
          </span>
        )}

        {/* Quick Add Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            onClick={() => addToCart(product)}
            size="lg"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category Tag */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category.replace('-', ' ')}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold leading-tight text-foreground">
          {product.name}
        </h3>

        {/* Flavor/Weight */}
        {(product.flavor || product.weight) && (
          <p className="text-sm text-muted-foreground">
            {product.flavor}{product.flavor && product.weight && ' • '}{product.weight}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* Price and Add Button */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
