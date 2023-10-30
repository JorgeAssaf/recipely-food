import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import { siteConfig } from '@/config/site'
import { satoshi } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

import '@/styles/globals.css'

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
    'Next.js',
    'React',
    'Tailwind CSS',
    'TypeScript',
    'Shadcn',
    'Radix UI',
    'Jorge Assaf',
    'Recipes',
    'Cooking',
    'Food',
    'Food Blog',
    'Web Development',
    'Frontend Development',
    'Fullstack Development',
  ],
  authors: [
    {
      name: 'Jorge Assaf',
      url: 'https://github.com/JorgeAssaf',
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
  icons: {
    icon: '/favicon.ico',
  },
}
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <ClerkProvider>
        <html lang='en' suppressHydrationWarning>
          <head />
          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              satoshi.variable,
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
    </>
  )
}
