import type { Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import VerifyEmailForm from '@/components/forms/verify-email-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Verify email',
  description: 'Verify your email address',
}

const VerifyEmailPage = () => {
  return (
    <Shell className='max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
export default VerifyEmailPage
