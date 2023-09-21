import type { Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ResetPasswordForm from '@/components/forms/reset-password-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset your password',
}

const ResetPasswordPage = () => {
  return (
    <Shell className='max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
export default ResetPasswordPage
