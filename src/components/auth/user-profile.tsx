'use client'

import { UserProfile as ClerkUserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { type Theme } from '@clerk/types'
import { useTheme } from 'next-themes'

const appearance: Theme = {
  baseTheme: undefined,
  variables: {
    borderRadius: '0.25rem',
  },
}

export function UserProfile() {
  const { theme } = useTheme()

  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme:
          theme === 'system' || theme === 'dark' ? dark : appearance.baseTheme,
        variables: {
          ...appearance.variables,
          colorBackground: theme === 'light' ? '#fafafa' : '#1a1a1a',
        },
      }}
    />
  )
}
