"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/shop', label: 'Shop All' },
  { 
    href: '/shop?category=protein-bars', 
    label: 'Protein Bars',
    dropdown: [
      { href: '/shop?category=protein-bars', label: 'All Protein Bars' },
      { href: '/shop?category=protein-bars&flavor=chocolate', label: 'Chocolate' },
      { href: '/shop?category=protein-bars&flavor=caramel', label: 'Caramel' },
      { href: '/shop?category=protein-bars&flavor=peanut', label: 'Peanut Butter' },
    ]
  },
  { 
    href: '/shop?category=protein-powder', 
    label: 'Protein Powder',
    dropdown: [
      { href: '/shop?category=protein-powder', label: 'All Protein Powder' },
      { href: '/shop?category=protein-powder&flavor=vanilla', label: 'Vanilla' },
      { href: '/shop?category=protein-powder&flavor=chocolate', label: 'Chocolate' },
    ]
  },
  { href: '/shop?category=creatine', label: 'Creatine' },
  { href: '/about', label: 'About Us' },
]

const mobileNavLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=protein-bars', label: 'Protein Bars' },
  { href: '/shop?category=protein-powder', label: 'Protein Powder' },
  { href: '/shop?category=creatine', label: 'Creatine' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/help', label: 'Help & FAQ' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { openCart, totalItems } = useCart()
  const pathname = usePathname()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 bg-background/80 backdrop-blur-md">
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
      >
        <span>Free shipping on orders over $50</span>
        <span className="mx-2">•</span>
        <span>Use code FUEL20 for 20% off</span>
      </motion.div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-black text-primary-foreground">A</span>
          </motion.div>
          <span className="text-xl font-black tracking-tight text-foreground">
            AEVORA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href.split('?')[0])
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
              
              {/* Dropdown */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-2"
                  >
                    <div className="min-w-[200px] rounded-xl bg-card p-2 shadow-xl">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:flex"
          >
            <Search className="h-5 w-5" />
          </motion.button>
          <Link href="/account">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <User className="h-5 w-5" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-card lg:hidden"
          >
            <nav className="flex flex-col px-4 py-4">
              {mobileNavLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 border-t border-border px-4 py-4"
            >
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-medium text-foreground">
                <Search className="h-5 w-5" />
                Search
              </button>
              <Link href="/account" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-medium text-foreground">
                  <User className="h-5 w-5" />
                  Account
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
