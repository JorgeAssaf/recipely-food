'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { catchClerkError } from '@/lib/utils'
import { verifyEmailSchema } from '@/lib/validations/auth'
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

type Inputs = z.infer<typeof verifyEmailSchema>

const VerifyEmailForm = () => {
  const { isLoaded, setActive, signUp } = useSignUp()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.code,
        })
        if (completeSignUp.status !== 'complete') {
          /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
          return
        }
        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId })

          router.push(`${window.location.origin}/`)
        }
      } catch (err) {
        catchClerkError(err)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder='169420'
                    {...field}
                    onChange={(e) => {
                      e.target.value = e.target.value.trim()
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-5 w-full' disabled={isPending}>
            Verify Email
          </Button>
        </form>
      </Form>
    </>
  )
}
export default VerifyEmailForm
