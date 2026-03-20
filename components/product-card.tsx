"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Plus, Check, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, type Product } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 1000)
  }

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
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      style={{
        boxShadow: isHovered 
          ? '0 20px 40px -15px rgba(132, 204, 22, 0.15)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>
        
        {/* Badge */}
        {product.badge && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
              badgeColors[product.badge] || 'bg-primary text-primary-foreground'
            )}
          >
            {product.badge}
          </motion.span>
        )}

        {/* Hover overlay with actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 }}
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  size="lg"
                  className={cn(
                    "gap-2 transition-all duration-300",
                    isAdding 
                      ? "bg-green-500 text-white hover:bg-green-500" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5" />
                        Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-5 w-5" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 }}
              >
                <Link href={`/product/${product.id}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    <Eye className="h-5 w-5" />
                    Quick View
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category Tag */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category.replace('-', ' ')}
        </span>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold leading-tight text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

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
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              size="sm"
              className={cn(
                "gap-1 transition-all duration-300",
                isAdding 
                  ? "bg-green-500 text-white hover:bg-green-500" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isAdding ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isAdding ? 'Added' : 'Add'}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
