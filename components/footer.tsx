import Link from 'next/link'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'Protein Bars', href: '#protein-bars' },
    { label: 'Protein Powder', href: '#protein-powder' },
    { label: 'Creatine', href: '#creatine' },
    { label: 'Bundles', href: '#bundles' },
    { label: 'New Arrivals', href: '#new' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Story', href: '#story' },
    { label: 'Athletes', href: '#athletes' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Shipping', href: '#shipping' },
    { label: 'Returns', href: '#returns' },
    { label: 'Track Order', href: '#track' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-black text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">
                AEVORA
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Premium supplements engineered for athletes who demand results. 
              Fuel your potential with Aevora Nutrition.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-bold text-foreground">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aevora Nutrition. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#privacy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
