"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, X, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { ProductGridSkeleton } from '@/components/product-skeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { products } from '@/lib/products'
import { staggerContainer, fadeUp } from '@/components/page-transition'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'protein-bars', label: 'Protein Bars' },
  { id: 'protein-powder', label: 'Protein Powder' },
  { id: 'creatine', label: 'Creatine' },
]

const flavors = [
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'vanilla', label: 'Vanilla' },
  { id: 'caramel', label: 'Caramel' },
  { id: 'peanut', label: 'Peanut Butter' },
  { id: 'cookie', label: 'Cookie' },
  { id: 'berry', label: 'Berry' },
]

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Flavor filter
      if (selectedFlavors.length > 0) {
        const productFlavor = product.flavor?.toLowerCase() || ''
        const hasMatchingFlavor = selectedFlavors.some((flavor) =>
          productFlavor.includes(flavor.toLowerCase())
        )
        if (!hasMatchingFlavor) {
          return false
        }
      }

      return true
    })
  }, [selectedCategories, selectedFlavors, priceRange])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavorId)
        ? prev.filter((id) => id !== flavorId)
        : [...prev, flavorId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedFlavors([])
    setPriceRange([0, 100])
  }

  const activeFiltersCount = selectedCategories.length + selectedFlavors.length + (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0)

  const FilterSidebar = () => (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      {/* Flavors */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">Flavors</h3>
        <div className="flex flex-col gap-3">
          {flavors.map((flavor) => (
            <label
              key={flavor.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Checkbox
                checked={selectedFlavors.includes(flavor.id)}
                onCheckedChange={() => toggleFlavor(flavor.id)}
                className="border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              {flavor.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            min={0}
            step={5}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-border text-foreground hover:bg-secondary"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-background pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-foreground md:text-5xl">
            Shop All Products
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Premium supplements to fuel your fitness journey
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden w-64 flex-shrink-0 lg:block"
          >
            <div className="sticky top-32 rounded-xl bg-card p-6">
              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </motion.aside>

          {/* Mobile Filter Button */}
          <div className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 lg:hidden">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsMobileFilterOpen(true)}
                className="gap-2 rounded-full bg-primary px-6 py-6 text-primary-foreground shadow-lg"
              >
                <Filter className="h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6 lg:hidden"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Filters</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <FilterSidebar />
                <div className="mt-6">
                  <Button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-primary text-primary-foreground"
                  >
                    Show {filteredProducts.length} Results
                  </Button>
                </div>
              </motion.div>
            </>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </motion.div>

            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-4 rounded-full bg-secondary p-6">
                  <Filter className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No products found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters to find what you&apos;re looking for
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-6 bg-primary text-primary-foreground"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
