'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import type { OAuthStrategy } from '@clerk/types'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Icons } from '../icons'
import { Button } from '../ui/button'

const oauthProviders = [
  { name: 'Google', strategy: 'oauth_google', icon: 'google' },
  { name: 'GitHub', strategy: 'oauth_github', icon: 'gitHub' },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]
const OauthProviders = () => {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null)

  const { signIn, isLoaded: signInLoaded } = useSignIn()

  const signInWith = async (provider: OAuthStrategy) => {
    if (!signInLoaded) return
    try {
      setIsLoading(provider)
      await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = 'Something went wrong, please try again.'

      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage ?? unknownError)
      } else {
        toast.error(unknownError)
      }
    }
  }

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant='outline'
            className='bg-background w-full sm:w-auto'
            onClick={() => void signInWith(provider.strategy)}
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy ? (
              <Loader2
                className='mr-2 size-4 animate-spin'
                aria-hidden='true'
              />
            ) : (
              <Icon className='mr-2 size-4' aria-hidden='true' />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
export default OauthProviders
