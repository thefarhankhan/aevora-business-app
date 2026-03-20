"use client"

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Plus, Minus, ShoppingBag, Check, ArrowLeft, Truck, Shield, RotateCcw, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  
  if (!product) {
    notFound()
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { addToCart } = useCart()

  // Generate mock gallery images (in real app, these would come from product data)
  const galleryImages = [
    product.image,
    product.image, // In real app: different angle
    product.image, // In real app: nutrition label
    product.image, // In real app: lifestyle shot
  ]

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setTimeout(() => setIsAdding(false), 1500)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  // Related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.nav>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image with Zoom */}
            <div 
              className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-secondary"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={product.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-200",
                      isZoomed && "scale-150"
                    )}
                    style={isZoomed ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    } : undefined}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" />
                Hover to zoom
              </div>

              {/* Badge */}
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors",
                    selectedImage === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-muted-foreground/50"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              {product.category.replace('-', ' ')}
            </span>

            {/* Name */}
            <h1 className="mt-2 text-3xl font-black text-foreground md:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-4xl font-black text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.weight && (
                <span className="ml-2 text-lg text-muted-foreground">
                  / {product.weight}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Flavor/Weight Info */}
            {(product.flavor || product.weight) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {product.flavor && (
                  <div className="rounded-lg bg-secondary px-4 py-2">
                    <span className="text-xs text-muted-foreground">Flavor</span>
                    <p className="font-semibold text-foreground">{product.flavor}</p>
                  </div>
                )}
                {product.weight && (
                  <div className="rounded-lg bg-secondary px-4 py-2">
                    <span className="text-xs text-muted-foreground">Size</span>
                    <p className="font-semibold text-foreground">{product.weight}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 rounded-full bg-secondary p-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
                >
                  <Minus className="h-5 w-5" />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-8 text-center text-lg font-bold text-foreground"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  size="lg"
                  className={cn(
                    "w-full gap-3 py-7 text-lg font-bold transition-all duration-300",
                    isAdding 
                      ? "bg-green-500 text-white hover:bg-green-500" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-6 w-6" />
                        Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="h-6 w-6" />
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 rounded-lg bg-secondary/50 p-4 text-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Free Shipping $50+</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg bg-secondary/50 p-4 text-center">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg bg-secondary/50 p-4 text-center">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  )
}
