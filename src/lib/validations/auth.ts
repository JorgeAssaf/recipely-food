import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

export const signinSchema = z.object({
  email: z.string(),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Code must be at least 6 characters.',
    })
    .max(6, {
      message: 'Code must be at most 6 characters.',
    }),
})
