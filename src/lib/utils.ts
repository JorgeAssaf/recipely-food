import { isClerkAPIResponseError } from '@clerk/nextjs'
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .trim()
    .toString()
    .toLowerCase()
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[ñÑ]/g, 'n')
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
}

export const deslugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
    )
}

export const formatPrepTime = (prepTime: number) => {
  const hours = Math.floor(prepTime / 60)
  const minutes = prepTime % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  return `${hours}h ${minutes} min`
}

export const absoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  )
}
export function isMacOs() {
  if (typeof window === 'undefined') return false

  return window.navigator.userAgent.includes('Mac')
}
export function catchClerkError(err: unknown) {
  const unknownErr = 'Something went wrong, please try again later.'

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join('\n'))
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}
export const isArrayOfFile = (val: unknown): val is File[] => {
  const isArray = Array.isArray(val)
  if (!isArray) return false
  return val.every((file) => file instanceof File)
}

export type As<
  DefaultTag extends React.ElementType,
  T1 extends React.ElementType,
  T2 extends React.ElementType = T1,
  T3 extends React.ElementType = T1,
  T4 extends React.ElementType = T1,
  T5 extends React.ElementType = T1,
> =
  | (React.ComponentPropsWithRef<DefaultTag> & {
    as?: DefaultTag
  })
  | (React.ComponentPropsWithRef<T1> & {
    as: T1
  })
  | (React.ComponentPropsWithRef<T2> & {
    as: T2
  })
  | (React.ComponentPropsWithRef<T3> & {
    as: T3
  })
  | (React.ComponentPropsWithRef<T4> & {
    as: T4
  })
  | (React.ComponentPropsWithRef<T5> & {
    as: T5
  })
