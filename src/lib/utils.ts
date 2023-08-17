import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
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

