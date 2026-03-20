"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#shop', label: 'Shop' },
  { href: '#protein-bars', label: 'Protein Bars' },
  { href: '#protein-powder', label: 'Protein Powder' },
  { href: '#creatine', label: 'Creatine' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCart, totalItems } = useCart()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 bg-background/80 backdrop-blur-md">
      {/* Announcement Bar */}
      <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
        <span>Free shipping on orders over $50</span>
        <span className="mx-2">•</span>
        <span>Use code FUEL20 for 20% off</span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-black text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            AEVORA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:flex">
            <Search className="h-5 w-5" />
          </button>
          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:flex">
            <User className="h-5 w-5" />
          </button>
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full overflow-hidden bg-card transition-all duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "max-h-[400px] border-b border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 text-lg font-medium text-foreground transition-colors hover:text-primary"
            >
              {link.label}
              <span className="text-muted-foreground">→</span>
            </Link>
          ))}
        </nav>
        <div className="flex gap-2 border-t border-border px-4 py-4">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-medium text-foreground">
            <Search className="h-5 w-5" />
            Search
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-medium text-foreground">
            <User className="h-5 w-5" />
            Account
          </button>
        </div>
      </div>
    </header>
  )
}
