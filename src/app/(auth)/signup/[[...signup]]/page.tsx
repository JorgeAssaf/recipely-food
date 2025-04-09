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
import SignupForm from '@/components/forms/signup-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up for an account',
}

export default async function SignupPage() {
  const user = await currentUser()
  if (user) {
    redirect('/')
  }
  return (
    <Shell className='max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>
            Create an account to get started!
          </CardTitle>
          <CardDescription>Sign up to create your own recipes</CardDescription>
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

          <SignupForm />
        </CardContent>
        <CardFooter className='flex items-center justify-between text-sm'>
          <div>
            <span className='text-muted-foreground'>
              Already have an account? &nbsp;
            </span>
            <Link href='/signin' className='font-medium text-primary'>
              Sign in
            </Link>
          </div>
          <div></div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
