'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { catchClerkError } from '@/lib/utils'
import { signinSchema } from '@/lib/validations/auth'
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

import PasswordInput from '../password-input'

type Inputs = z.infer<typeof signinSchema>

const SigninForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<Inputs>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          password: data.password,
          identifier: data.email,
        })
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId })
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder='********' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-5 w-full' disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
    </>
  )
}
export default SigninForm
