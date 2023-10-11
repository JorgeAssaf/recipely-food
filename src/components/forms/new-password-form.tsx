'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { catchClerkError } from '@/lib/utils'
import { NewPasswordSchema } from '@/lib/validations/auth'

import { PasswordInput } from '../password-input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Inputs = z.infer<typeof NewPasswordSchema>

const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const { isLoaded, setActive, signIn } = useSignIn()
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      code: '',
      password: '',
      confirm_password: '',
    },
  })
  function onSubmit(data: Inputs) {
    if (!isLoaded) return
    if (data.password !== data.confirm_password) {
      toast.error('Passwords must match')
      return
    }
    startTransition(async () => {
      try {
        const attemptFirstFactor = await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.code,
          password: data.password,
        })
        if (attemptFirstFactor.status === 'needs_second_factor') {
          // TODO: implement 2FA (requires clerk pro plan)
        } else if (attemptFirstFactor.status === 'complete') {
          await setActive({
            session: attemptFirstFactor.createdSessionId,
          })

          toast.success('Password changed successfully')

          router.push(`${window.location.origin}/`)
        }
      } catch (error) {
        catchClerkError(error)
      }
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Label>Code</Label>
                  <FormControl>
                    <Input
                      type='text'
                      inputMode='numeric'
                      placeholder='169420'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <PasswordInput {...field} placeholder='********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <PasswordInput {...field} placeholder='********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='mt-5 w-full' disabled={isPending}>
            Change password
          </Button>
        </form>
      </Form>
    </>
  )
}
export default NewPasswordForm
