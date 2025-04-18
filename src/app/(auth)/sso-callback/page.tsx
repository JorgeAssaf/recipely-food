import { type HandleOAuthCallbackParams } from '@clerk/types'

import SSOCallback from '@/components/auth/sso-callback'
import { Shell } from '@/components/shell'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export interface SSOCallbackPageProps {
  searchParams: Promise<HandleOAuthCallbackParams>
}

export default async function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  const searchParamsResolve = await searchParams
  return (
    <Shell className='max-w-lg'>
      <SSOCallback searchParams={searchParamsResolve} />
    </Shell>
  )
}
