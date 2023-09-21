import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
})

export const signinSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  // .email({
  //   message: 'Invalid email address',
  // }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters and symbol.',
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

export const ResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
})

export const NewPasswordSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters and symbol.',
    }),
  confirm_password: z
    .string({
      required_error: 'Confirm Password is required',
    })
    .min(8, {
      message: 'Confirm Password must be at least 8 characters.',
    }),
  code: z
    .string()
    .min(6, {
      message: 'Code must be at least 6 characters.',
    })
    .max(6, {
      message: 'Code must be at most 6 characters.',
    }),
})
