import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Aevora Nutrition | Premium Protein & Supplements',
  description: 'Fuel your fitness with Aevora Nutrition. Premium protein bars, protein powder, and creatine designed for peak performance.',
  keywords: ['protein bars', 'protein powder', 'creatine', 'supplements', 'nutrition', 'fitness'],
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
              {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
