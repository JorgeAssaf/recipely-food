import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.className,
          )}
        >
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

