import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OauthProviders from '@/components/auth/oauth-signin'
import SigninForm from '@/components/forms/signin-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your account',
}

export default async function SigninPage() {
  const user = await currentUser()
  if (user) {
    redirect('/')
  }
  return (
    <Shell className='max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Welcome back to recipely!</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <OauthProviders />
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <SigninForm />
        </CardContent>
        <CardFooter className='flex flex-col items-center justify-between gap-y-1 text-sm sm:flex-row'>
          <div>
            <span className='text-muted-foreground'>
              Don&apos;t have an account? &nbsp;
            </span>
            <Link href='/signup' className='font-medium text-primary'>
              Sign up
            </Link>
          </div>
          <div>
            <Link
              href='/signin/reset-password'
              className='font-medium text-primary'
            >
              Reset password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
