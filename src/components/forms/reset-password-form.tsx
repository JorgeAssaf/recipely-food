'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { catchClerkError } from '@/lib/utils'
import { ResetPasswordSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Inputs = z.infer<typeof ResetPasswordSchema>
const ResetPasswordForm = () => {
  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: data.email,
        })

        toast.success('Check your email for the reset link')

        router.push('/signin/reset-password/new-password')
      } catch (error) {
        catchClerkError(error)
      }
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='jondoe@gmail.com' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-5 w-full' disabled={isPending}>
            Send link
          </Button>
        </form>
      </Form>
    </>
  )
}
export default ResetPasswordForm
