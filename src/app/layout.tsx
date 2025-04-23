import type { Metadata, Viewport } from 'next'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'

import { Analytics } from '@/components/analytics'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'next.js',
    'react',
    'tailwindcss',
    'typeScript',
    'shadcn',
    'radix ui',
    'jorge assaf',
    'recipes',
    'cooking',
    'food',
    'food blog',
    'Web development',
  ],
  authors: [
    {
      name: 'Jorge Assaf',
      url: 'https://jorgeassaf.vercel.app',
    },
  ],
  creator: 'Jorge Assaf',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: '@AssafEnrique',
  },
}
export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
