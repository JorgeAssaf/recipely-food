import type { Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import NewPasswordForm from '@/components/forms/new-password-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Change your password',
}

const ResetPasswordPage = () => {
  return (
    <Shell className='max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Create a new password</CardTitle>
          <CardDescription>
            Enter the code you received in your email and input your new
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
export default ResetPasswordPage
