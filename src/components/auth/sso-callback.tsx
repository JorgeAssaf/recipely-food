'use client'

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

import { type SSOCallbackPageProps } from '@/app/(auth)/sso-callback/page'

export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()
  useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      role='status'
      aria-label='Loading'
      aria-describedby='loading-description'
      className='flex items-center justify-center'
    >
      <Loader2 className='size-16 animate-spin' aria-hidden='true' />
    </div>
  )
}
